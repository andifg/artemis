# Artemis Helm Chart



## Prerequesites

Create prod and dev projects

```bash
oc create project meat-meter-dev
oc create project meat-meter
```

Create database password secret

```bash
oc create secret generic artemis-database-access \
  --from-literal=postgres-password=$ADMIN_PASSWORD
```

Create keycloak realm password (Needs to match imported secret)
```bash
oc create secret generic artemis-keycloak-client \
  --from-literal=secret="3bKwPwaQpSVhhZzdlUFWgajnlllWgVsi"
```