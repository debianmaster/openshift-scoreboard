```sh
oc create serviceaccount bot -n default
oc adm policy add-cluster-role-to-user cluster-reader system:serviceaccount:default:bot
export token=$(oc sa get-token bot -n default)
oc new-project workshop
oc new-app docker.io/debianmaster/maya-ui  --name=scoreboard
oc new-app docker.io/debianmaster/maya-api --name=scoreboard-api
oc env dc/maya-api token=$token base_url=ocp.ck.osecloud.com  #subdomain
```


#### ignore
```sh
oc rsync ./ui/ ui-2-8rvan:/opt/app-root/src/. --watch  --no-perms=true
oc rsync ./api/ api-1-hry9u:/opt/app-root/src/. --watch --no-perms=true
```
