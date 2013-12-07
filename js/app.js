App = Ember.Application.create();

App.Router.map(function() {
  this.resource("about");
  this.resource("projects",function(){
    this.resource("project",{path:":post_id"});
  });
});


App.ProjectsRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON('db.json').then(function(data) {
      return data.map(function(folder){
        return folder.replace(/.*?([^\/]+)$/,"$1")
      });
    });
  }
});

App.ProjectRoute = Em.Route.extend({
  model: function(params) {
    return $.get("content/"+params.post_id+"/index.md").then(function(data){
      return {
        title: params.post_id,
        body: data
      };
    });
  }
});

// Markdown helper
var showdown = new Showdown.converter(); // instatiate only one!
Ember.Handlebars.helper('markdown', function(input,project) {
  html = showdown.makeHtml(input);
  if (project) {
      html = html.replace(
        /<img([^>]*)\ssrc=(['"])(?:[^\2\/]*\/)*([^\2]+)\2/gi,
        "<img$1 src=$2content/"+project.title+"/$3$2"
      );
  }
  return new Handlebars.SafeString(html);
});
