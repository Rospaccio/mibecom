var Codevomit = {};
Codevomit.Blog = {};
(Codevomit.Blog.App = function(){

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

  hljs.initHighlightingOnLoad();

  var container = $("#mdContainer");
  $.get("README.md", function(data){
    container.html( marked(data) );

    /* */
    $("code").each(function(i, block){
      hljs.highlightBlock(block);
    });
    /* */

  });

})();
