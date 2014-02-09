window.Glossy = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function(options) {
    Glossy.article = new Glossy.Models.Article(options.article);

    Glossy.router = new Glossy.Routers.ArticlesRouter;
    Backbone.history.start();
  }
}
