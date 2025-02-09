# Artemis Backend

## Devservices

Devservices fulfill the purpose to have a full functioning local setup with all
functionailities to conduct user tests.

### Overview

| Dev Service Name | Purpose                                               |
| ---------------- | ----------------------------------------------------- |
| DB               | Postgres Database for artemis backend service         |
| Keycloak         | Keycloak server used as central authentication server |
| Kc-db            | Postgres database for keycloak server                 |

### Export realm from keycloak devservice

```bash
docker exec -it devservice-keycloak-1 bash
/opt/keycloak/bin/kc.sh export --file /tmp/artemis.json --realm artemis
exit
docker cp devservice-keycloak-1:/tmp/artemis.json .
```