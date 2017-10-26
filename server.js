
var express = require('express');
var path = require("path")
var search = require("./api/search.js")
var mongo = require("./api/mongo.js")
var app = express();

app.use(express.static('public'));
app.use("/css",express.static(path.join(__dirname,'node_modules/bootstrap/dist/css')))

 
app.get("/api/search/:query",function(req,res){
   
  let  handler = (data) =>  {
    mongo.save(data,result  => console.log(result));
    res.set('Content-Type','application/json')
    res.send(JSON.stringify(data)) ;
    res.end();
  }
  
  const offset = req.query.offset
  const q = req.params.query
  search({q : q, num : offset , start : 1} , handler ) 
 })
 

app.get("/api/latest",function(req,res){
  mongo.latest(5, data => {
     
    res.send( data)
    res.end()
    
  })
               
})


 
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
