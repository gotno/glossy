window.Glossy = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function(options) {
    Glossy.article = new Glossy.Models.Article(options.article);

    Glossy.router = new Glossy.Routers.ArticlesRouter;
    Backbone.history.start();

    $("i.show-hide").click(function(){
      if($(this).hasClass('fa-eye')){
        $(this).removeClass('fa-eye').addClass('fa-eye-slash');
      }
      else {
        $(this).removeClass('fa-eye-slash').addClass('fa-eye');
      }
    });
  }
}
