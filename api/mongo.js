const mongo = require("mongodb")
 
function connection (){
  const url_db = `mongodb://${process.env.user_db}:${process.env.pw_db}@ds227325.mlab.com:27325/x-fc`
  console.log(url_db)
   return mongo.connect(url_db)
}
    
//params array of documents {title,q,html,title...}
//params callback cb function(data){  ....}
// add date to all documents and save  [{q, date}]
function save(documents,cb){
  let db ;
   connection()
  .then(function(base){
     db = base
     const latest = db.collection("latest")
     return latest.insert( setDoc(documents)   )                 
  .then(function(result){
     cb(result)
     db.close()})
})
        }
//  
let setDoc = documents => Object.assign({q :documents[0].q ,count : documents.length} , {"date" : new Date() })
 



//return the more recent query string
//params n number documents 
//cb callback function(data){...}
function latest(n , cb){
  let db ;
  connection().then(function(base ){
    db = base 
    const latest = db.collection("latest")
    latest.find({}, {'_id' : 0 ,count : 1 ,date :1 ,q : 1}).sort({date : 1}).limit(n).toArray(function(err,result){
      cb(result)
      db.close()
    })
  })
}
  
module.exports = { save , latest }