```sh
# Ignore my personal notes 

oc get users -o json  | jq -r '.items[].metadata.name'   #print usernames
oc get pods --all-namespaces=true -o json | jq -r '.items[] | select(.status.phase=="Running") | .metadata.name' #print pods

oc get dc --all-namespaces=true -o json | jq -r '.items[] | select(.status.phase=="Running") | .metadata.name'


oc get dc --all-namespaces=true -o json | jq -r '.items[] | .metadata.name' | jq -R -s -f csv2json


oc get users --all-namespaces=true -o json | jq -r '.items[] | select(.status.phase=="Running") | .metadata.name' | awk '{print $1}'| jq -R . | jq -s .


oc get users -o json  | jq -r '.items[].metadata.name' | awk '{print $1}'| jq -R . | jq -s .

to_entries | map({name:.value, index:.key})

oc get projects | grep mycliproject | awk '{gsub("mycliproject-","",$1);print $1}'

```
