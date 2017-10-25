const mongo = require("mongodb")
 
function connection (){
  const url_db = `mongodb://${process.env.user_db}:${process.env.pw_db}@ds227325.mlab.com:27325/x-fc`
  console.log(url_db)
   return mongo.connect(url_db)
}
    

function save(documents,cb){
  let db ;
   connection()
  .then(function(base){
     db = base
     const latest = db.collection("latest")
    
     return latest.insertMany( documents.map(item => { 
       return Object.assign(item , {"date" : new Date() })}))
                              
  .then(function(result){
     cb(result)
     db.close()})
})
        }
        

  
function latest(n , cb){
  let db ;
  connection().then(function(base ){
    db = base 
    const latest = db.collection("latest")
    latest.find().sort({date : 1}).limit(n).toArray(function(err,result){
      cb(result.map(({date,q})=> {return {date,q} }))
      db.close()
    })
  })
}
  
module.exports = { save , latest }