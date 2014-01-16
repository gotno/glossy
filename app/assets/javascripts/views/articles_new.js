Glossy.Views.ArticlesNew = Backbone.View.extend({
  template: JST['articles/form'],

  events: {
    'submit': 'submit'
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var newArticle = new Glossy.Models.Article($(event.target).serializeJSON());
    newArticle.save({}, {
      success: function(model) {
        Glossy.articles.add(model);
        Backbone.history.navigate('', { trigger: true });
      }
    });
  }
});
