Glossy.Routers.ArticlesRouter = Backbone.Router.extend({
  routes: {
    '': 'form',
  },

  form: function() {
    var articleView = Glossy.articleView = new Glossy.Views.ArticlesForm({
      model: Glossy.article
    });
    this._swapViews(articleView);
  },

  _swapViews: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    $('#content').html(view.render().$el);
  }
});
