//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const mongoose= require("mongoose");
// let POSTS=[];

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Email : soumyajitdawn@gmail or github.com/SoumyajitD";

const app = express();

app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect('mongodb+srv://soumya:12@blogdb.6zgiw.mongodb.net/blogDB', {useNewUrlParser: true});

const postSchema={
  title: String,
  content: String
};

const Post=mongoose.model("Post",postSchema);

app.get("/", function (req,res) {

Post.find({},function (err,posts) {


  res.render("home",{
     homeStartingContent:homeStartingContent,
     posts:posts
  });

});
});
app.get("/about", function (req,res) {

  return res.render("about",{ aboutContent:aboutContent});
})
app.get("/contact", function (req,res) {

  return res.render("contact",{ contactContent:contactContent});
})

app.get("/compose", function (req,res) {

  return res.render("compose");
})

app.get("/posts/:postId",function (req,res) {
  const requestedPostId=req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, post){

   res.render("post", {

     PageTitle: post.title,

     PagePost: post.content

   });

 });

  // const reqTitle=_.lowerCase(req.params.postName);
  //
  // posts.forEach(function(post){
  //   const storedTitle = _.lowerCase(post.title);
  //
  //   if (storedTitle === requestedTitle) {
  //     res.render("post", {
  //       title: post.title,
  //       content: post.content
  //     });
  //   }
  // });

});






app.post("/compose",function (req,res) {

  const post=new Post({
    title:req.body.titleInput,
    content:req.body.postInput
  });
  // // const newPost={
  // //   heading:req.body.titleInput,
  // //   Content:req.body.postInput
  // // }
  // POSTS.push(newPost);
  post.save();
  return res.redirect("/");

})







app.get('/github.com/SoumyajitD',(req,res)=>res.redirect('https://github.com/SoumyajitD'))


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
