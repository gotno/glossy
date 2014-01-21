Glossy.Routers.ArticlesRouter = Backbone.Router.extend({
  routes: {
    'new': 'new',
    'edit': 'edit'
  },

  new: function() {
    Glossy.article = new Glossy.Models.Article();

    var newArticleView = new Glossy.Views.ArticlesNew({
      model: Glossy.article
    });
    this._swapViews(newArticleView);
  },

  edit: function() {
    var editArticleView = new Glossy.Views.ArticlesEdit({
      model: Glossy.article
    });
    this._swapViews(editArticleView);
  },

  _swapViews: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    $('#content').html(view.render().$el);
  }
});
