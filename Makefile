image_registry = ${ARTEMIS_IMAGE_REGISTRY}
backend_image_name = artemis-backend
frontend_image_name = artemis-frontend
deploy-dev: NAMESPACE = meat-meater-dev
deploy-dev: PWA_ICON_GENERATE_COMMAND = generate-pwa-assets-dev
deploy-prod: NAMESPACE = meat-meater
deploy-prod: PWA_ICON_GENERATE_COMMAND = generate-pwa-assets

image_tag := $(shell date +"%Y-%m-%d--%H-%M")--$(shell git rev-parse --short HEAD)

local-devservice:
	echo "Starting lokal-dev"
	cd backend/devservice && podman compose up -d

local-backend:
	cd backend && ~/go/bin/air .

local-frontend:
	cd frontend && npm run dev

local-dev: local-devservice
	${MAKE} -j local-frontend local-backend
	echo "Started local dev with frontend, backend and services"

format-backend:
	echo "Formatting backend"
	cd ./backend && go fmt ./...

format-frontend:
	echo "Formatting frontend"
	cd frontend && npm run format-fix

test:
	go test ./... -v

build-backend:
	echo "Building backend image"
	echo "${image_registry}/${NAMESPACE}/${backend_image_name}:${image_tag}"
	cd backend && podman build --arch x86_64 -t ${image_registry}/${NAMESPACE}/${backend_image_name}:${image_tag} .

build-frontend:
	echo "Building frontend image"
	echo "${image_registry}/${NAMESPACE}/${frontend_image_name}:${image_tag}"
	cd frontend && podman build --build-arg PWA_ICON_GENERATE_COMMAND=${PWA_ICON_GENERATE_COMMAND} --arch x86_64 -t ${image_registry}/${NAMESPACE}/${frontend_image_name}:${image_tag} .

push-frontend: build-frontend
	# ${MAKE} build-frontend
	echo "Pushing frontend image"
	podman push ${image_registry}/${NAMESPACE}/${frontend_image_name}:${image_tag}

push-backend: build-backend
	# ${MAKE} build-backend
	echo "Pushing backend image"
	podman push ${image_registry}/${NAMESPACE}/${backend_image_name}:${image_tag}


deploy-chart:
	cd helm && helm upgrade --install artemis ./artemis --set backend.image.name=${image_registry}/${NAMESPACE}/${backend_image_name}:${image_tag} \
	--namespace ${NAMESPACE} --set frontend.image.name=${image_registry}/${NAMESPACE}/${frontend_image_name}:${image_tag}

deploy: push-backend push-frontend deploy-chart
	@echo "PWA: ${PWA_ICON_GENERATE_COMMAND}"
	@echo "Deploying to namespace ${NAMESPACE}"

deploy-dev: deploy

deploy-prod: deploy