```sh
oc create serviceaccount bot -n default
oc adm policy add-cluster-role-to-user cluster-reader system:serviceaccount:default:bot
oc sa get-token bot -n default
```

```sh
oc rsync ./ui/ ui-2-8rvan:/opt/app-root/src/. --watch  --no-perms=true
oc rsync ./api/ api-1-hry9u:/opt/app-root/src/. --watch --no-perms=true
```
