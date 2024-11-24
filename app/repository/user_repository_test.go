package repository

import (
	"context"
	"fmt"
	"testing"
	"time"

	"github.com/andifg/artemis_backend/app/constant"
	"github.com/andifg/artemis_backend/app/domain/dao"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
	"github.com/stretchr/testify/assert"
	"github.com/testcontainers/testcontainers-go"
	testcontainerPostgres "github.com/testcontainers/testcontainers-go/modules/postgres"
	"github.com/testcontainers/testcontainers-go/wait"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func initTestcontainer() (*gorm.DB, func(t *testing.T)) {
	ctx := context.Background()

	appConfig := constant.AppConfigInit()

	postgresContainer, err := testcontainerPostgres.Run(ctx,
		"postgres:16-alpine",
		testcontainerPostgres.WithDatabase(appConfig.DatabaseName),
		testcontainerPostgres.WithUsername(appConfig.DatabaseUser),
		testcontainerPostgres.WithPassword(appConfig.DatabasePassword),
		testcontainers.WithWaitStrategy(
			wait.ForLog("database system is ready to accept connections").
				WithOccurrence(2).
				WithStartupTimeout(5*time.Second)),
	)

	if err != nil {
		log.Printf("failed to start container: %s", err)
		panic(fmt.Sprintf("failed to start container: %s", err))
	}


	connectionString, err := postgresContainer.ConnectionString(ctx)

	if err != nil {
		log.Printf("failed to get connection string: %s", err)
		panic(fmt.Sprintf("failed to get connection string: %s", err))
	}

	log.Printf("Connection string: %s", connectionString)

	db, err := gorm.Open(postgres.Open(connectionString), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database!")
	}


    // Clean up database before each test
    db.Exec("DELETE FROM users")


	teardown := func(t *testing.T) {
		fmt.Println("Teardown testcontainer")
		if err := testcontainers.TerminateContainer(postgresContainer); err != nil {
			log.Printf("failed to terminate container: %s", err)
		}
	}

	return db, teardown
}

func TestUserRepositoryCreateUser(t *testing.T) {
	db, teardown := initTestcontainer()
	defer teardown(t)

	userRepo := UserRepositoryInit(db)

	createdAt, err := time.Parse(time.RFC3339, "2024-01-01T00:00:00+01:00")

	if err != nil {
		log.Printf("Error: %s", err)
	}

	updatedAt, err := time.Parse(time.RFC3339, "2024-01-01T00:00:00+01:00")

	if err != nil {
		log.Printf("Error: %s", err)
	}

	user := dao.User{
		BaseModel: dao.BaseModel{
			CreatedAt: createdAt,
			UpdatedAt: updatedAt,
		},
		ID: uuid.New(),
		Username: "test",
	}

	userRepo.CreateUser(user)

	var resultUser dao.User

	tx := db.Raw("Select * from users;").Scan(&resultUser)

	if tx.Error != nil {
		log.Printf("Error: %s", tx.Error)
	}

	fmt.Printf("User: %v\n", resultUser)


	assert.Equal(t, user.Username, resultUser.Username)
	assert.Equal(t, user.ID, resultUser.ID)
	assert.Equal(t, user.CreatedAt, resultUser.CreatedAt)
	assert.Equal(t, user.UpdatedAt, resultUser.UpdatedAt)

}


func TestUserRepositoryCreateUser2(t *testing.T){

	db, teardown := initTestcontainer()
	defer teardown(t)

	UserRepositoryInit(db)


	var resultUser dao.User

	tx := db.Raw("Select * from users;").Scan(&resultUser)

	if tx.Error != nil {
		log.Printf("Error: %s", tx.Error)
	}

	fmt.Printf("User: %v\n", resultUser)


	assert.Equal(t, 0, len(resultUser.Username))


}