const http=require("http")
const fs=require("fs")
const url=require("url")
const path=require("path")
const queryString=require("querystring")
const PORT=3001
const {MongoClient}=require("mongodb")
// const { error } = require("console")
const client=new MongoClient("mongodb://127.0.0.1:27017/")

const app=http.createServer((req,res)=>{
    const db=client.db("blood");
    const collection=db.collection("donors")
    const {pathname}=url.parse(req.url);
    console.log(pathname);

    if(pathname=="/"){
        res.writeHead(200,{"content-Type":"text/html"})
        res.end(fs.readFileSync("../frontend/index.html"))
    }
    else if(pathname=="/css/index.css"){
        res.writeHead(200,{"content-Type":"text/css"})
        res.end(fs.readFileSync("../frontend/css/index.css"))
    }else if(pathname=="/js/index.js"){
        res.writeHead(200,{"content-Type":"text/js"})
        res.end(fs.readFileSync("../frontend/js/index.js"))
    }
    else if(pathname=="/pages/add.html"){
        res.writeHead(200,{"content-Type":"text/html"})
        res.end(fs.readFileSync("../frontend/pages/add.html"))
    }
    else if(pathname=="/css/add.css"){
        res.writeHead(200,{"content-Type":"text/css"})
        res.end(fs.readFileSync("../frontend/css/add.css"))
    }
    else if(pathname=="/asset/d.png"){
        res.writeHead(200,{"content-Type":"png"})
        res.end(fs.readFileSync("../frontend/asset/d.png"))
    }
    else if(pathname=="/js/add.js"){
        res.writeHead(200,{"content-Type":"text/html"})
        res.end(fs.readFileSync("../frontend/js/add.js"))
    }else{
        console.log("missing");
        
    }


    if(pathname=="/submit"&&req.method=="POST"){
        let body="";
        req.on("data",(chunks)=>{
            body+=chunks.toString();
            console.log(body);
            
        })
        req.on("end",async()=>{
            const fromData=queryString.parse(body)
            console.log(fromData); 
            collection.insertOne(fromData).then(()=>{
                console.log("successfully inserted");

                
            })
            .catch((error)=>{
                console.log(error);
                
            })
        })
    }
})

client.connect().then((msg)=>{
    console.log("data base connected");
    app.listen(PORT,()=>{
        console.log("server created");

    })
}).catch((error)=>{
    console.log(error);
    
})

