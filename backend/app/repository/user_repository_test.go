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

var db *gorm.DB

func initTestcontainer() func() {
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
		log.Error(fmt.Sprintf("failed to start container: %s", err))
		panic(fmt.Sprintf("failed to start container: %s", err))
	}

	connectionString, err := postgresContainer.ConnectionString(ctx)

	if err != nil {
		log.Error(fmt.Sprintf("failed to get connection string: %s", err))
		panic(fmt.Sprintf("failed to get connection string: %s", err))
	}

	db, err = gorm.Open(postgres.Open(connectionString), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database!")
	}

	teardown := func() {
		fmt.Println("Teardown testcontainer")
		if err := testcontainers.TerminateContainer(postgresContainer); err != nil {
			log.Printf("failed to terminate container: %s", err)
		}
	}

	return teardown
}

func cleanupDB(db *gorm.DB) {
	fmt.Println("Cleaning up database table users")
	db.Exec("DELETE FROM users")
}

func DummyUsers() []dao.User {
	var users []dao.User

	createdAt, err := time.Parse(time.RFC3339, "2024-01-01T00:00:00+01:00")

	if err != nil {
		log.Printf("Error: %s", err)
	}

	updatedAt, err := time.Parse(time.RFC3339, "2024-01-01T00:00:00+01:00")

	if err != nil {
		log.Printf("Error: %s", err)
	}

	user_one := dao.User{
		BaseModel: dao.BaseModel{
			CreatedAt: createdAt,
			UpdatedAt: updatedAt,
		},
		ID:       uuid.New(),
		Username: "test",
	}

	user_2 := dao.User{
		BaseModel: dao.BaseModel{
			CreatedAt: createdAt,
			UpdatedAt: updatedAt,
		},
		ID:       uuid.New(),
		Username: "test",
	}

	users = append(users, user_one)
	users = append(users, user_2)

	return users

}

func TestUserRepositoryInit(t *testing.T) {
	teardown := initTestcontainer()
	defer teardown()

	t.Run("TestOne", testOne)
	t.Run("TestTwo", testTwo)

}

func testOne(t *testing.T) {

	userRepo := UserRepositoryInit(db)

	t.Cleanup(func() {
		cleanupDB(db)
	})

	user_one := DummyUsers()[0]
	userRepo.CreateUser(user_one)

	var resultUser dao.User

	tx := db.Raw("Select * from users;").Scan(&resultUser)

	if tx.Error != nil {
		log.Printf("Error: %s", tx.Error)
	}

	fmt.Printf("User: %v\n", resultUser)

	assert.Equal(t, user_one.Username, resultUser.Username)
	assert.Equal(t, user_one.ID, resultUser.ID)
	assert.Equal(t, user_one.CreatedAt, resultUser.CreatedAt)
	assert.Equal(t, user_one.UpdatedAt, resultUser.UpdatedAt)

}

func testTwo(t *testing.T) {
	userRepo := UserRepositoryInit(db)

	t.Cleanup(func() {
		cleanupDB(db)
	})

	users := DummyUsers()

	userRepo.CreateUser(users[0])
	userRepo.CreateUser(users[1])

	var resultUser []dao.User

	tx := db.Raw("Select * from users;").Scan(&resultUser)

	if tx.Error != nil {
		log.Printf("Error: %s", tx.Error)
	}

	assert.Equal(t, users[0].Username, resultUser[0].Username)
	assert.Equal(t, users[0].ID, resultUser[0].ID)
	assert.Equal(t, users[0].CreatedAt, resultUser[0].CreatedAt)
	assert.Equal(t, users[0].UpdatedAt, resultUser[0].UpdatedAt)

	assert.Equal(t, users[1].Username, resultUser[1].Username)
	assert.Equal(t, users[1].ID, resultUser[1].ID)
	assert.Equal(t, users[1].CreatedAt, resultUser[1].CreatedAt)
	assert.Equal(t, users[1].UpdatedAt, resultUser[1].UpdatedAt)

}
