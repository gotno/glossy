Glossy.Views.ArticlesIndex = Backbone.View.extend({
  template: JST['articles/index'],

  events: {
    'click a.new-article': 'newArticle'
  },

  render: function() {
    this.$el.html(this.template({
      articles: this.collection
    }));
    return this;
  },

  newArticle: function(event) {
    event.preventDefault();
    Backbone.history.navigate('/new', { trigger: true });
  }
});
