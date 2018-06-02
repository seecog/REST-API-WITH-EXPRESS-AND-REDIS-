var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
var redis = require('redis');
var route = express.Router();

var r =redis.createClient();

route.get('/',function(req,res){
res.json({message : 'Hello world'})
});

route.delete('/product/:id',function(req,res){
r.del(req.params.id,function(err,data){
if(err){
    console.log('The error is ',err)
}
res.json(data)
})
})

route.get('/product/:id',function(req,res){
    r.hgetall(req.params.id,function(err,data){
        res.json(data)
        })
    })

route.post('/product',function(req,res){
    
r.hmset(req.body.id,[
"product_name", req.body.product_name,
"cost", req.body.cost,
"company", req.body.company

],function(err,data){
    if(err){
        console.log("The error is ",err)
    }
    res.json(data)
});

})

app.use('/api',route)
app.listen(3001,function(){
    console.log('Server starts')
})