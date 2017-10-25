$("#submit").on("click",function(e){
      e.preventDefault();
      $("#result").empty()
      let query = $("#query").val()
      let offset = $("#offset").val()
       
        
      let url = `/api/search/${query}?offset=${offset}`
      $.get(url).done(setResult)
    })
        
    $("#latest").on("click",function(e){
       $("#result").empty()
      $.get("/api/latest").done(setResult)
    })
      
   function setResult (data){
    data.forEach(image => $("#result").append($("<li></li>" ,{ html : JSON.stringify(image)})))
  }
 