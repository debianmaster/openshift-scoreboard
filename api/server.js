var express = require('express')
    ,cors = require('cors')
    ,app = express();
var os = require("os");
var async = require('async');
var axios = require('axios');
var http = require('http');
var child;
const PORT = 8080;
var healthy = true;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; 
axios.defaults.baseURL = 'https://'+process.env.base_url+":8443";
axios.defaults.responseType = 'json';
axios.defaults.headers.common['Authorization'] = "Bearer "+ process.env.token;
console.log(axios.defaults.baseURL);

var labs =[
 {usecase:"lab1",url:"http://welcome-mycliproject-{{username}}."+process.env.base_url,value:1},
 {usecase:"lab2",url:"http://welcome.mycliproject-{{username}}.svc.cluster.local:8080",value:2}
];

app.use(cors());
var router = express.Router();  
app.use('/api', router);

router.get('/', function(req, res) {
    res.send('');
});


router.get('/getuserscore', function(req, res) {
    axios.get("/oapi/v1/identities")
        .then((response) => {
           async.each(response.data.items, function(item, cb) {
               item.score=0;
               async.each(labs,function(itm,cb2){
                    http.get(itm.url.replace('{{username}}',item.providerUserName), (resp) => {
                        if(resp.statusCode==200)
                        item.score+=itm.value;
                        cb2();
                    }).on('error', (e) => {
                        console.log(e);
                        cb2();
                    });
               },function(){
                   cb();
               });
           },function(){
               res.json(response.data.items);
           });
        })
        .catch((err) => {
           res.json({error:err}); 
    });
});

router.get('/healthz', function(req, res) {
    console.log('health enquiry')
    if (healthy)
        res.send('OK');
    else
        res.status(404).send('NOT OK');
});

router.get('/cancer', function(req, res) {
    healthy = false;
    res.send('DONE');
});

app.listen(PORT);
console.log('Running at http://localhost:' + PORT);
