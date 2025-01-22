var http = require('http')
var fs = require('fs')
var path = require('path')


const server = http.createServer((req,res)=>{
  let filepath = path.join(__dirname,'static',req.url==='/'?'index.html':req.url)
  let contentype = "text/html"
  fs.readFile(filepath,function(err,content){
    if(err){
        fs.readFile(path.join(__dirname,'static','error.html'),function(){
            res.end(content)
        })
    }else{
        res.end(content)
    }

  })
})

server.listen(3000,function(){
    console.log("server is running on port 3000")
})