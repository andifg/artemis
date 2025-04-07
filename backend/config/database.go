package config

import (
	"fmt"
	log "github.com/sirupsen/logrus"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func CreateMeatPortionType(db *gorm.DB) {
	err := db.Exec("CREATE TYPE meat_portion_size as ENUM ('small', 'medium', 'large')")

	if err != nil {
		log.Warningf("failed to create enum type: %v", err)
	}
	log.Println("Created enum type meat_portion_size")
}

func CreateServingCategoryType(db *gorm.DB) {
	err := db.Exec("CREATE TYPE serving_category as ENUM ('meat', 'vegetarian', 'alcohol', 'candy')")
	if err != nil {
		log.Warningf("failed to create enum type: %v", err)
	}
	log.Println("Created enum type serving_category")
}

func RenameMeatPortionsToServings(db *gorm.DB) {
	var exists bool
	err := db.Raw(`
        SELECT EXISTS (
            SELECT FROM information_schema.tables
            WHERE table_schema = 'public' AND table_name = 'meat_portions'
        );
    `).Scan(&exists).Error
	if err != nil {
		log.Fatalf("failed to check table existence: %v", err)
	}

	if exists {
		if err := db.Exec(`ALTER TABLE meat_portions RENAME TO servings;`).Error; err != nil {
			log.Fatalf("failed to rename table: %v", err)
		}
		log.Println("Renamed table meat_portions to servings")
	} else {
		log.Println("Table meat_portions does not exist, skipping rename")
	}

}

func CustomMigrationsPreStart(db *gorm.DB) {

	CreateMeatPortionType(db)
	CreateServingCategoryType(db)

	RenameMeatPortionsToServings(db)
}

func InitDB(
	host string,
	user string,
	password string,
	dbname string,
	port string,
) *gorm.DB {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s", host, user, password, dbname, port)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{TranslateError: true})
	if err != nil {
		panic("Failed to connect to database!")
	}
	CustomMigrationsPreStart(db)
	return db
}
