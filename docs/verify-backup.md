# Verify backup (restore to another namespace)

Restore from **`artemis-prod`** into **`artemis-check`** via namespace mapping, then confirm the expected PVCs are present.

## List backups

```bash
velero backup get -n velero
velero backup describe <BACKUP_NAME> -n velero
```


## 1. Create the verify namespace

```bash
oc create namespace artemis-check
```

## 2. Restore with namespace mapping

Restore **only volumes** into the target namespace so you do not start duplicate Deployments or Ingresses in the cluster.

```bash
BACKUP_NAME=<BACKUP_NAME>

oc apply -f - <<EOF
apiVersion: velero.io/v1
kind: Restore
metadata:
  name: test-restore
  namespace: velero
spec:
  backupName: ${BACKUP_NAME}
  restorePVs: true
  namespaceMapping:
    artemis-prod: artemis-check
  includedResources:
    - persistentvolumeclaims
    - persistentvolumes
EOF

velero restore describe test-restore -n velero --details
velero restore logs test-restore -n velero
```

Wait until the restore phase is `Completed`.

## 3. Check PVCs in artemis-check

```bash
oc get pvc -n artemis-check
oc get pv | grep artemis-check
```

## 4. Clean up

```bash
# restore name is test-restore (step 2)
oc delete namespace artemis-check
oc delete restore test-restore -n velero
```
