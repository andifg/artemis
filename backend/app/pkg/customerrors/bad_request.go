package customerrors

type BadRequestError struct {
	Message string
}

func (b BadRequestError) Error() string {
	return b.Message
}

func NewBadRequestError(message string) error {
	return &BadRequestError{Message: message}
}
