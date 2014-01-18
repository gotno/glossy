window.Glossy = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  initialize: function(options) {
    new Glossy.Routers.ArticlesRouter;
    Backbone.history.start();

    if (options.article_id) {
      Glossy.article = new Glossy.Models.Article();
      Glossy.article.set('id', options.article_id);
      Glossy.article.fetch({
        success: function() {
          Backbone.history.navigate('edit', { trigger: true });
        }
      });
    } else {
      Glossy.article = new Glossy.Models.Article();
      Backbone.history.navigate('', { trigger: true });
    }
  }
}
