package customerrors

import "fmt"

type NotFoundError struct {
	Key string
}

func (n NotFoundError) Error() string {
	return fmt.Sprintf("No data found for key %s", n.Key)
}

func NewNotFoundError(key string) error {
	return &NotFoundError{Key: key}
}
