package customerrors

type ForbiddenError struct {
	Message string
}

func (e ForbiddenError) Error() string {
	return e.Message
}

func NewForbiddenError(message string) error {
	return &ForbiddenError{Message: message}
}
