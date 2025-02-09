# Artemis

## Development

### Prerequesites

- (make)[https://www.gnu.org/software/make/manual/make.html]
- (direnv)[https://direnv.net/]
- (docker-compose)[https://docs.docker.com/compose/] or (podman-compose)[https://docs.podman.io/en/v5.1.1/markdown/podman-compose.1.html]
- (go)[https://go.dev/] & (go air)[https://github.com/air-verse/air]
- (npm)[https://www.npmjs.com/]
- (pre-commit)[https://pre-commit.com/]
- Local dns resolution to resolve keycloak to 127.0.0.1

### Local development

Start devservices, backend and frontend all together with relaod funcitonality:

```bash
make local-dev
```

Locally running services:

| URL                    | Description          |
| ---------------------- | -------------------- |
| http://localhost:5173/ | Frontend application |
| http://keycloak:8080/  | Keycloak application |
| http://keycloak:8000/  | Backend api          |


## Deployment

### Define variables

Create .envrc from skeleton and fill with correct values

´´´bash
cp .envrc.skeleton .envrc
```

### Login to registry


```bash
podman login -u `oc whoami` -p ${TOKEN} ${REGISTRY}
```

### Deploy dev:

- Dev namespace is selected automatically
- Dev icons are automatically created during build

```
make deploy-dev
```

### Deploy prod

- Prod namespace is selected automatically
- Prod icons are automatically created during build

```bash
make deploy-prod
```