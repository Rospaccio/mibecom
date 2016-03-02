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

    // container.html( marked(data) );

    console.log(data);
    console.log(data.posts);
    data.posts.forEach(function(post){
      var newItem = document.createElement("li");

      var newItem = document.createElement("li");
      var anchorToPost = newItem.appendChild( document.createElement("a") );
      var jQAnchor = $(anchorToPost);
      jQAnchor.click(function(){
        Codevomit.Blog.App.showPost(post.url);
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
  });
};

Codevomit.Blog.App.init();
