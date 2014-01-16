Glossy.Routers.ArticlesRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'new': 'new'
  },

  index: function() {
    var router = this;

    Glossy.articles = new Glossy.Collections.Articles;

    Glossy.articles.fetch({
      success: function() {
        var articlesView = new Glossy.Views.ArticlesIndex({
          collection: Glossy.articles
        });

        router._swapViews(articlesView);
      }
    });
  },

  new: function() {
    var newArticleView = new Glossy.Views.ArticlesNew;
    this._swapViews(newArticleView);
  },

  _swapViews: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    $('#content').html(view.render().$el);
  }
});
