# Code Examples

Ok, let's try to render some Markdown code fragments.

## JavaScript

This is JavaScript, in all its glory:

    Codevomit.Blog.App.showPost = function(postUrl){
      /*  gets the container element */
      var container = $("#postContainer");
      $.get(postUrl, function(data){
        container.html( marked(data) );
      });
      console.log("Done!");
    };

## HTML
And this is no less than HTML

    <div class="header">
      <ul class="nav nav-pills pull-right">
        <li class="active"><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <h3 class="text-muted">MiBECoM</h3>
    </div>
