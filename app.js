const express=require('express');
const bodyParser = require('body-parser');
const request= require('request');
const ejs = require('ejs');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("index");
});
app.post("/",function(err,res){
   res.render("index1");
    
})
app.get("/index1",function(req,res){
    res.render("index1");
})
const posts=[];
app.post("/index1",function(err,res){
    request("https://api.nasa.gov/planetary/apod?api_key=nh5GD3P3PtipnDlz9aFHGJfuk0LDfrQKlOrdCesj",function(error,response,body){
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
app.get("/quiz",function(req, res){
    res.render("quiz");
})
app.post("/search",function(req,res,err){
    //console.log(req.body.btnn,req.body.topic);
    const url="https://images-api.nasa.gov/search?q="+req.body.topic;
    request(url,function(error,response,body){
        
            var data=JSON.parse(body);
            var title1=data.collection.items[0].data[0].title;
            var title2=data.collection.items[1].data[0].title;
            var title3=data.collection.items[2].data[0].title;
            var title4=data.collection.items[3].data[0].title;
            var title5=data.collection.items[4].data[0].title;
            var img1=data.collection.items[0].links[0].href;
            var img2=data.collection.items[1].links[0].href;
            var img3=data.collection.items[2].links[0].href;
            var img4=data.collection.items[3].links[0].href;
            var img5=data.collection.items[4].links[0].href;
            var des1=data.collection.items[0].data[0].description;
            var des2=data.collection.items[1].data[0].description;
            var des3=data.collection.items[2].data[0].description;
            var des4=data.collection.items[3].data[0].description;
            var des5=data.collection.items[4].data[0].description;
           
        //console.log(title1,title2);
        res.render("info",{
            title1:title1,
            title2:title2,
            title3:title3,
            title4:title4,
            title5:title5,
            img1: img1,
            img2: img2,
            img3:img3,
            img4:img4,
            img5:img5,
            des1: des1,
            des2: des2,
            des3: des3,
            des4:des4,
            des5:des5
        });
    })
    //console.log(posts);
    //res.render("info",{posts:posts});
})

app.post("/notfound",function(req,res){
    res.redirect("/index1");
})
app.post("/btnn",function(req, res){

})
app.listen(3000,function(){
    console.log("Server started at port 3000");
})