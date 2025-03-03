package customerrors

type DuplicateKeyError struct {
	Message string
}

func (d DuplicateKeyError) Error() string {
	return d.Message
}

func NewDuplicateKeyError(message string) error {
	return &DuplicateKeyError{Message: message}
}
