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

    data.posts.sort(Codevomit.Blog.App.postCompare);

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

    Codevomit.Blog.App.showPost(Codevomit.Blog.App.Configuration.postsSiteUrl + data.posts[0].url);

  });
};

Codevomit.Blog.App.showPost = function(postUrl){
  var container = $("#postContainer");
  $.get(postUrl, function(data){
    container.html( marked(data) );
    var codeBlocks = container.find("pre code");
    codeBlocks.each(function(i, block){
      hljs.highlightBlock(block);
    });
  });
};

Codevomit.Blog.App.postCompare = function(firstPost, secondPost){
  return secondPost.index - firstPost.index;
};

Codevomit.Blog.App.Configuration = {};

Codevomit.Blog.App.init();
