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

func DropOldForeignKeyConstraint(db *gorm.DB) {
	result := db.Exec(`
		ALTER TABLE servings
		DROP CONSTRAINT IF EXISTS fk_users_servings;
	`)

	if result.Error != nil {
		log.Fatalf("failed to drop foreign key constraint: %v", result.Error)
	}

	log.Debugf("Dropped old foreign key constraint from servings table")
}

func AddDefaultCategoryRanksOnce(db *gorm.DB) {
	// Check if the category_ranks table is empty

	query := `
  WITH default_ranks AS (
	SELECT 'meat' AS category, 1 AS rank, true AS active
	UNION ALL
	SELECT 'vegetarian' AS category, 2 AS rank, true AS active
	UNION ALL
	SELECT 'alcohol' AS category, 3 AS rank, true AS active
	UNION ALL
	SELECT 'candy' AS category, 4 AS rank, true AS active
  )
  INSERT INTO category_ranks (category, rank, user_id, active)
  SELECT
  	dr.category::serving_category,
	dr.rank,
	u.id AS user_id,
	dr.active
  From users u
  Cross JOIN default_ranks dr
  where u.id not in (SELECT user_id FROM category_ranks)
  `

	result := db.Exec(query)
	if result.Error != nil {
		log.Fatalf("failed to insert default category ranks: %v", result.Error)
	}
	log.Debugf("Inserted default category ranks for %d users", result.RowsAffected)

}
