var Codevomit = {};
Codevomit.Blog = {};
Codevomit.Blog.App = {};
Codevomit.Blog.App.init = function(){

  console.log('Here we go');

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  });

  var container = $("#postsIndex");

  $.get("conf.json", function(data){

    Codevomit.Blog.App.Configuration = data;

    data.posts.forEach(function(post){
      var newItem = document.createElement("li");

      var newItem = document.createElement("li");
      var anchorToPost = newItem.appendChild( document.createElement("a") );
      var jQAnchor = $(anchorToPost);
      jQAnchor.click(function(){
        var prefix = Codevomit.Blog.App.Configuration.postsSiteUrl;
        Codevomit.Blog.App.showPost(prefix + post.url);
      });
      jQAnchor.html(post.indexTitle);

      container.append(newItem)
    });

  });
};

Codevomit.Blog.App.showPost = function(postUrl){
  var container = $("#postContainer");
  $.get(postUrl, function(data){
    container.html( marked(data) );
    hljs.in
  });
};

Codevomit.Blog.App.Configuration = {};

Codevomit.Blog.App.init();
