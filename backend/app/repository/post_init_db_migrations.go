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

	log.Debugf("Updated %d servings to category = 'Meat'", result.RowsAffected)

}

func RenameWeeklyMeatToWeeklyMeatLimit(db *gorm.DB) {

	var exists bool
	err := db.Raw(`
	SELECT EXISTS (
		SELECT 1
		FROM information_schema.columns
		WHERE table_name='users' AND column_name='meattarget'
	)
`).Scan(&exists).Error

	if err != nil {
		log.Error("Error checking column existence:", err)
		return
	}

	if exists {
		result := db.Exec(`ALTER TABLE users RENAME COLUMN meattarget TO meatlimit;`)
		if result.Error != nil {
			log.Error("Error renaming column:", result.Error)
		} else {
			log.Info("Column renamed successfully.")
		}
	} else {
		log.Info("Column 'meatlimit' does not exist, skipping rename.")
	}
}
