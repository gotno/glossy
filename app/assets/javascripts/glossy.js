window.Glossy = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function() {
    new Glossy.Routers.ArticlesRouter;
    Backbone.history.start();
  }
}

