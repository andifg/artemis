image_registry = ${ARTEMIS_IMAGE_REGISTRY}
backend_image_name = artemis-backend
frontend_image_name = artemis-frontend

image_tag =$(shell date +"%Y-%m-%d-%H-%M")-$(shell git rev-parse --short HEAD)

local-devservice:
	echo "Starting lokal-dev"
	cd backend/devservice && docker-compose up -d

local-backend:
	cd backend && ~/go/bin/air .

local-frontend:
	cd frontend && npm run dev

local-dev:
	${MAKE} -j local-devservice local-frontend local-backend
	echo "Started local dev with frontend, backend and services"

format-backend:
	echo "Formatting backend"
	go fmt ./backend/...
	echo "Formatting frontend"
	cd frontend && npm run format

test:
	go test ./... -v

build-backend:
	echo "Building backend image"
	echo "${image_registry}/${backend_image_name}:${image_tag}"
	cd backend && podman build -t ${image_registry}/${backend_image_name}:${image_tag} .

build-frontend:
	echo "Building frontend image"
	echo "${image_registry}/${frontend_image_name}:${image_tag}"
	cd frontend && podman build --arch x86_64 -t ${image_registry}/${frontend_image_name}:${image_tag} .