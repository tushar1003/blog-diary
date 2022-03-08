//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const homeStartingContent =
  "Whether you’re looking for a tool to record your daily emotions and activities in a reflective journal, keep track of milestones in a food diary or pregnancy journal, or even record your dreams in a dream journal, Blog-Diary  has you covered.Blog-Diary  gives you all the tools you need to focus on the ideas you want to preserve, rather than the process of writing itself.Even when carefully kept, paper journals can be read by anyone who happens upon them. Blog-Diary keeps your journals safe with double password protection and military strength encryption so you can rest easy knowing that your entries are secure in the Blog-Diary Vault.Take your journals wherever you go with the Blog-Diary  mobile apps for iPhone, iPad, and Android phones and tablets.  ";
const aboutContent ="Once there was a guy named Bill who wanted a horse. On Craigslist, Bill saw a Christian horse so he went to check it out. When Bill got to the ranch, the horse's owner said .It's easy to ride him. Just say 'praise the Lord' to make him go, and 'amen' to make him stop. Bill got on the horse and said praise the Lord. the horse started to walk. Praise the Lord, praise the Lord, praise the Lord and the horse is running. Now Bill sees the cliff and says: AMEN. The horse stops and Bill says: Whew! Praise the lord!"
const contactContent =
"A man came through my lane at the grocery store with a jug of wine and a bouquet of roses. But before paying, he set the two items aside and said, “I’ll be right back.” He ran off, only to ­return a minute later with a second jug of wine and another bouquet of roses. “Two girlfriends?” I asked.“No,” he said. “Just one really angry one.”"
const port=process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let arr = [{
  title:"Day0",
  content:"Hey Buddy!!!! Don't worry everything is secret with me"
}];

app.get("/", function (req, res) {
  res.render("home", { content: homeStartingContent, posts: arr });
});
app.get("/about", function (req, res) {
  res.render("about", { content: aboutContent });
});
app.get("/contact", function (req, res) {
  res.render("contact", { content: contactContent });
});
app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  arr.push(post);
  res.redirect("/");
});

app.get("/post/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);
  arr.forEach(function (post) {
    const title = post.title;
    const storedTitle = _.lowerCase(post.title);
    if (requestedTitle === storedTitle) {
      res.render("post", { title: post.title, content: post.content });
    }
  });
});

app.listen(port, function () {
  console.log("Server started on port 3000");
});
