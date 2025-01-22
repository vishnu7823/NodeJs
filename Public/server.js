var http = require('http')
var fs = require('fs')
var server = http.createServer(function(req,res){
    const file = fs.readFileSync("./static/index.html","utf-8")
    console.log(file)
        if(req.url==="/")
        {
            res.end(file)
        }else if(req.url==='/about'){
            res.end("<h1>about page</h1>")
        }else if(req.url==='/contact'){
            res.end("<h1>contact page</h1>")
        }else{
            res.end("Error page")
        }







    // res.write('welcome to the dog page')
    // res.write("<h1>welcome to dogs kennal</h1>")
    // res.end();

})

server.listen(4000,function(){
    console.log("sever listening on port 4000")
})

