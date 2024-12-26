package customerrors

import (
	"fmt"
)

type DuplicateKeyError struct {
	Key string
}

func (d DuplicateKeyError) Error() string {
	return fmt.Sprintf("Database duplicate key error for key %s", d.Key)
}

func NewDuplicateKeyError(key string) error {
	return &DuplicateKeyError{Key: key}
}
