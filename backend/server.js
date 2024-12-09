const http=require("http")
const fs=require("fs")
const url=require("url")
const path=require("path")
const queryString=require("querystring")
const PORT=3001
const {MongoClient,ObjectId}=require("mongodb")
const { error } = require("console")
// const { error } = require("console")
const client=new MongoClient("mongodb://127.0.0.1:27017/")

const app=http.createServer(async(req,res)=>{
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
    }
    else if(pathname=="/asset/blood-donation.png"){
        res.writeHead(200,{"content-Type":"png"})
        res.end(fs.readFileSync("../frontend/asset/blood-donation.png"))
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
        res.writeHead(200,{"content-Type":"text/html"})
        res.end(fs.readFileSync("../frontend/index.html"))
        
    }
    if(pathname=="/getdoners"&&req.method=="GET"){
        const data=await collection.find().toArray()
        console.log(data);
        const jsondata=JSON.stringify(data)
        res.writeHead(200,{"Content-Type":"text/json"});
        res.end(jsondata)    
    }
    if (pathname=="/delete"&& req.method=="DELETE") {
        let body=""
        req.on("data",(chunks)=>{
            body+=chunks.toString();
            console.log(body);
        })
        req.on("end",async()=>{
            let _id=new ObjectId(body);
            console.log(body);
            await collection.deleteOne({_id}).then(()=>{
                res.writeHead(200,{"Content-Type":"text/plain"});
                res.end("succesfully deleted")
            }).catch((error)=>{
                res.writeHead(200,{"Content-Type":"text/plain"});
                res.end("failed")
            })
        })
    }
    if(pathname=="/update"&&req.method=="PUT"){
        console.log("HHH");
        let body=""
        req.on("data",(chunks)=>{
            body+=chunks.toString();
        })
        req.on("end",async()=>{
            let data=JSON.parse(body)
            let _id=new ObjectId(data._id)
            let updateData={name:data.name,gender:data.gender,blood:data.blood,addres:data.address,phone:data.phone}
        await collection.updateOne({_id},{$set:updateData}).then((msg)=>{
            res.writeHead(201,{"Content-Type":"text/json"});
            res.end("successfully updated")
        }).catch(()=>{
            res.writeHead(400,{"Content-Type":"text/json"});
            res.end("failed")
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

