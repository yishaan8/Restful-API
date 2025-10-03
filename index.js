const express = require('express');
const path = require('path');
const { v4 : uuidv4 } = require('uuid');
const app = express();
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 3000;

let posts=[
    {
        id:uuidv4(),
        username:"ishaan",
        description:"this is my first post"
    },
    {
        id:uuidv4(),
        username:"john",
        description:"this is my second post"
    },
    {
        id:uuidv4(),
        username:"doe",
        description:"this is my third post"
    }

]
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((post)=>post.id===id);
    if(!post){
        return res.send("Post not found");
    }
    res.render("show.ejs",{post})
})
app.post("/posts",(req,res)=>{
    let {username,description}=req.body;
    let id=uuidv4();
    posts.push({id,username,description});
    res.redirect("/posts");
});
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newDescription=req.body.description;
    let post=posts.find((post)=>post.id===id);
    post.description=newDescription;
    console.log(post)
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((post)=>post.id===id);
    res.render("edit.ejs",{post})
})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((post)=>post.id!==id);
    res.redirect("/posts");
})   
app.get('/', (req, res) => {
  res.send("Server is working well!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});