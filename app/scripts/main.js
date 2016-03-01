var Codevomit = {};
Codevomit.Blog = {};
(Codevomit.Blog.App = function(){

  console.log('Here we go');

  var container = $("#mdContainer");
  $.get("README.md", function(data){
    console.log(data);
    container.html( marked(data) );
  });

})();
