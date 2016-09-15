var express = require('express');
var os = require("os");
var async = require('async');
var exec = require('child_process').exec;
var child;
// Constants
const PORT = 8080;
var healthy = true;
// App
const app = express();

var rules =[
 {usecase:"usecase1",cmd:"oc get dc --all-namespaces=true | grep {name} | wc -l | awk '{print $1}' | tr -d '\n'",value:1},
  {usecase:"usecase1",cmd:"oc get pods --all-namespaces=true -o json | jq -r '.items[] | select(.status.phase==\"Running\") | .metadata.name' | grep {name} |  wc -l | awk '{print $1}' | tr -d '\n'",value:2}
];

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    res.send('Hello world v1 ' + os.hostname() + '\n');
});


app.get('/getuserscore', function(req, res) {
    child = exec("oc get users -o json  | jq -r '.items[].metadata.name' | awk '{print $1}'| jq -R . | jq -s . | jq 'to_entries | map({name:.value, index:.key})'", function(error, stdout, stderr) {
        stdout = JSON.parse(stdout);
        async.each(stdout, function(item, cb) {
            if (undefined == item['score'])
                        item['score'] = 0;

            async.each(rules,function(rule,cb1){
                //console.log(rule);
                var cmd = rule.cmd.replace('{name}',item.name);
                exec(cmd, function(err, out, stderr) {
                    item['score'] += (parseInt(out)*rule.value);
                    cb1();
                });
            },function(err) {
                cb();
            });


        }, function(err) {
            stdout.sort(function(a,b) {
              if (a.score < b.score)
                return 1;
              if (a.score > b.score)
                return -1;
              return 0;
            });            
            res.json(stdout);
        });

    });
});

app.get('/getusers', function(req, res) {
    child = exec("oc get users -o json  | jq -r '.items[].metadata.name' | awk '{print $1}'| jq -R . | jq -s . | jq 'to_entries | map({name:.value, index:.key})'",
        function(error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }

            res.json(JSON.parse(stdout));
        });
});

app.get('/healthz', function(req, res) {
    console.log('health enquiry')
    if (healthy)
        res.send('OK');
    else
        res.status(404).send('NOT OK');
});

app.get('/cancer', function(req, res) {
    healthy = false;
    res.send('DONE');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
