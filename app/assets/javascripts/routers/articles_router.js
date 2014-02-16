Glossy.Routers.ArticlesRouter = Backbone.Router.extend({
  routes: {
    '': 'show',
    'preview': 'show',
    'edit': 'form'
  },

  form: function() {
    console.log('form');
    $('#sidebar-wrapper').show();
    var articleView = Glossy.articleView = new Glossy.Views.ArticlesForm({
      model: Glossy.article
    });
    this._swapViews(articleView);
  },

  show: function() {
    console.log('show');
    $('#sidebar-wrapper').hide();
    var articleView = Glossy.articleView = new Glossy.Views.ArticlesShow({
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
