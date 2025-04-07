package repository

import (
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

func SetExistingPortionsToMeat(db *gorm.DB) {
	result := db.Exec(`
        UPDATE servings
        SET category = 'meat'
        WHERE category IS NULL;
    `)

	if result.Error != nil {
		log.Fatalf("failed to update servings: %v", result.Error)
	}

	log.Printf("Updated %d servings to category = 'Meat'", result.RowsAffected)

}
