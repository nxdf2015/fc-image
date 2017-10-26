
var axios= require("axios")



function compile(){
  let  init_search ={ 
      cx : process.env.key_cs,
      key : process.env.key_api,
      searchType:'image',
      fileType : 'png' }
  let url ="https://www.googleapis.com/customsearch/v1?"
  
  return function ({    q ,num  , start = 1}){
    num = num > 10 ? 10 : num
   
    let options = {num : 10, q : q , start : 1} 
    
    let search = Object.assign({},init_search,options)
      
  return {
    host : url,
    path : Object.getOwnPropertyNames(search).map( key => `${key}=${search[key]}`).join("&")
    
    }
}
}

 

const  joinPath = obj => Object.values(obj).join("")

const search_path= compile()

 

module.exports =function(option_search  , cb ){
  console.log(joinPath(search_path(option_search)))
  axios.get( joinPath(search_path(option_search))).then(function({data}){
   let q = option_search.q
   console.log(data.items);
   let images = data.items.map(({title,htmlTitle,link,displayLink,image})=> {
       return {q, title,htmlTitle,link,displayLink,image : image['thumbnailLink']}
     })
     cb(images)})
  }
