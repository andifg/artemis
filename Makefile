local-compose:
	echo "Starting lokal-dev"
	cd devservice && docker-compose up -d

local-reload:
	~/go/bin/air .

local-frontend:
	cd frontend && npm run start

local-dev: local-compose local-reload
	echo "Starting lokal-dev"


format:
	go fmt ./...

test:
	go test ./... -v

build:
	go build -o .out/bin/
	dock
