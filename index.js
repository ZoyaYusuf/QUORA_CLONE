const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4 : uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({extended:true})); //data parse
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
{
  id: uuidv4(), username :"apnaclg", content : "ilovecoding"
},
{
  id: uuidv4(), username :"zoya", content : "sleep"
},
{
  id: uuidv4(), username :"zayyan", content : "cricket"
}
];

app.get("/posts", (req,res)=>{
  res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res) =>{
  res.render("new.ejs");
})

app.post("/posts", (req,res) =>{
  let{username, content} = req.body;
  let id = uuidv4();
  posts.push({id, username, content});
  res.redirect("/posts");
})

app.get("/posts/:id", (req,res) => {
  let {id} = req.params;
  let post =posts.find((p) => id === p.id);
  console.log(post);
  res.render("show.ejs", {post});
})

app.patch("/posts/:id", (req,res) => {  //error : editing only latest content 
  let {id} = req.params;
  let newcontent =  req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newcontent;
  console.log(post);
  res.redirect("/posts");
})

app.get("/posts/:id/edit", (req,res) => {
  let{id} = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs" , {post});
  console.log(post);
})

app.delete("/posts/:id" , (req,res) => {
  let{id} = req.params;
 // let post = posts.find((p) => id === p.id);
    posts = posts.filter((p) => id !== p.id);
 //res.send("deleted");
 res.redirect("/posts");

})

app.listen(port, ()=>{
  console.log("lsitening to port : 8080" );
});