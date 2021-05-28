const express=require('express');
const bodyParser = require('body-parser');
const request= require('request');
const ejs = require('ejs');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
require("dotenv").config()

app.get("/", function(req, res){
    res.render("index");
});
//console.log(process.env)
app.post("/",function(err,res){
   //res.render("index1");
   request("http://hubblesite.org/api/v3/news_release/last",function(error,request,body){
       let datta=JSON.parse(body);
       if(error){
        console.log(error);
    }
    else{
        res.render("index1",{
            name:datta.name,
            abstract:datta.abstract
        });
    }

   })
    
})
app.get("/index1",function(req,res){
    res.render("index1"); 
})
const posts=[];
app.post("/index1",function(err,res){
    const k=process.env.API_KEY
    const url="https://api.nasa.gov/planetary/apod?api_key="+k
    request(url,function(error,response,body){
        let data=JSON.parse(body);
        if(error){
            console.log(error);
        }
        else{
            res.render("second",{
                title:data.title,
                image:data.url,
                explanation:data.explanation
            });
        }
    });
});
app.post("/quiz",function(req, res){
    res.render("quiz");
})
app.post("/search",function(req,res,err){
    
    let d = new Date();
    let date = d.getFullYear();

    const url="https://images-api.nasa.gov/search?q="+req.body.topic+"&page=1&media_type=image,video&year_start=1920&year_end="+date;
    request(url,function(error,response,body){
        
            var data=JSON.parse(body);
            var p=data.collection.items[0].href;
            request(p, function(error,response,body){
                let pp=JSON.parse(body);
                var ind;
                for(var i=0;i<pp.length;i++){
                    var l=pp[i].length;
                    var x=pp[i][l-3];
                    var y=pp[i][l-2];
                    var z=pp[i][l-1];
                    //console.log(x,y,z);
                    if(x==="m" && y=== "p" && z==="4" ){
                        ind=i;
                        
                        break;
                    }
                }
                const m=pp[ind];
                res.render("info",{
                    x:data.collection,
                    m:m
                   
                });

                //console.log(m);
            })
            //console.log(m);
        //console.log(title1,title2);
        
    })
    //console.log(posts);
    //res.render("info",{posts:posts});
})

app.get("/link1",function(req,res){
    res.render("link1");
})
app.get("/link2",function(req,res){
    res.render("link2");
})
app.get("/link3",function(req,res){
    res.render("link3");
})
app.get("/link4",function(req,res){
    res.render("link4");
})
app.get("/link5",function(req,res){
    res.render("link5");
})
app.get("/link6",function(req,res){
    res.render("link6");
})
app.get("/link7",function(req,res){
    res.render("link7");
})

app.post("/iss",function(req, res){
    res.render("iss");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("Server started at port 3000");
})