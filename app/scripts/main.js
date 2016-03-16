var Codevomit = {};
Codevomit.Blog = {};
Codevomit.Blog.App = {};
Codevomit.Blog.App.init = function(){

  window.onpopstate = function(event){
    console.log(JSON.stringify(event.state.url));
    Codevomit.Blog.App.showPostByRelativeUrl(event.state.url, false);
  };

  // TODO replace this unacceptable greeting with a cool ascii art
  console.log('Here we go');

  $(document).ready(function () {
    $('[data-toggle="offcanvas"]').click(function () {
      $('.row-offcanvas').toggleClass('active');
    });
  });

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

  Codevomit.Blog.App.initConfiguration();
  Codevomit.Blog.App.initNavBarPages();

}; /* end init */

Codevomit.Blog.App.checkIfPostSpecified = function(){
  var currentURL = window.location.href;
  var isBookmarkPresent = currentURL.indexOf("#") > 0;
  if(isBookmarkPresent){
    var lastSeparator = currentURL.lastIndexOf("/");
    var postRelativeURL = currentURL.substring(lastSeparator);
    Codevomit.Blog.App.showPostByRelativeUrl(postRelativeURL);
    return true;
  }
  return false;
};

Codevomit.Blog.App.initConfiguration = function(){
  /* gets the configuration and sets the post links up*/
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
        Codevomit.Blog.App.showPost(post); //prefix + post.url);
      });
      jQAnchor.html(post.indexTitle);
      container.append(newItem)
    });
    Codevomit.Blog.App.checkHostAndPossiblyRedirect();
    if(!Codevomit.Blog.App.checkIfPostSpecified()){
      /* no post specified in the URL, so we load the default one*/
      // console.log("default post:");
      // console.log(JSON.stringify(data.posts[0]));
      Codevomit.Blog.App.showPost(data.posts[0]); //Codevomit.Blog.App.Configuration.postsSiteUrl + data.posts[0].url);
    }
  });
  /* end configuration */
};

Codevomit.Blog.App.initNavBarPages = function(){
  var navBarLinksContainer = $("#navBarLinksContainer");
  var anchors = navBarLinksContainer.find("li a");
  anchors.each(function(element){
    // console.log("hi, i'm " + element);
  });
};

Codevomit.Blog.App.checkHostAndPossiblyRedirect = function(){
  // console.log("Codevomit.Blog.App.Configuration.preferredHost = " + Codevomit.Blog.App.Configuration.preferredHost);
  if(!window.location.host.startsWith(Codevomit.Blog.App.Configuration.preferredHost))
  {
    var currentHost = window.location.host;
    // console.log("currentHost = " + currentHost);
    var preferredHref = window.location.href.replace(currentHost, Codevomit.Blog.App.Configuration.preferredHost);
    // console.log("preferredHref = " + preferredHref);
    window.location.href = preferredHref;
  }
};

Codevomit.Blog.App.showPost = function(post){
  Codevomit.Blog.App.showPostByRelativeUrl(post.url);
};

Codevomit.Blog.App.showPostByRelativeUrl = function(postRelativeUrl, mustPushState){
  if(mustPushState === undefined){
    mustPushState = true;
  }

  var container = $("#postContainer");

  // builds the post's URL
  var completePostUrl = Codevomit.Blog.App.Configuration.postsSiteUrl + postRelativeUrl

  $.get(completePostUrl, function(data){
    container.html( marked(data) );
    Codevomit.Blog.App.pageDisqusId = postRelativeUrl;
    Codevomit.Blog.App.resetDisqus(Codevomit.Blog.App.pageDisqusId, postRelativeUrl);
    // activates Highlight.js on the code blocks of the post
    var codeBlocks = container.find("pre code");
    codeBlocks.each(function(i, block){
      hljs.highlightBlock(block);
    });

    if(mustPushState){
      /* let's update the history and the url bar appropriately */
      var stateObject = {url:  postRelativeUrl};
      window.history.pushState(stateObject, {}, "#" + postRelativeUrl);
    }
  });
};

Codevomit.Blog.App.resetDisqus = function (newIdentifier, pageUrl) {
  if(typeof DISQUS !== 'undefined'){
    DISQUS.reset({
      reload: true,
      config: function () {
        // console.log("resetDisqus: identifier = " + newIdentifier);
        this.page.identifier = newIdentifier;
        // console.log("resetDisqus: pageUrl = " + pageUrl);
        this.page.url = "http://codevomit.xyz/blog" + pageUrl;
        // console.log("resetDisqus: page.url = " + this.page.url);
      }
    });
  }
};

Codevomit.Blog.App.postCompare = function(firstPost, secondPost){
  return secondPost.index - firstPost.index;
};

Codevomit.Blog.App.Configuration = {};

Codevomit.Blog.App.init();
