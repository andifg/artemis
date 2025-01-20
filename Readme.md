# Artemis

# Deploy


## Login to registry
```bash
podman login -u `oc whoami` -p ${TOKEN} ${REGISTRY}
```


## Deploy dev:

- Dev namespace is selected automatically

```
make deploy-dev
```