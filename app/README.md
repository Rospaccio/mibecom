# Sample!
---------------------
This is a sample Markdown fragment, it should be rendered as **HTML**

This is a random piece of this site's code:

    var container = $("#mdContainer");
    $.get("README.md", function(data){
      console.log(data);
      container.html( marked(data) );
    });

and an ordered list:

1. this is the first item
2. here's the second
3. and the third

and a Github Flavor Table **[apparently it does not work]**:

first | second | third
-|-|-
value | another value | and this one
in the second line | we write some useless | stuff

*You are welcome*
