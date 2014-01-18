Glossy.Views.ArticlesIndex = Backbone.View.extend({
  template: JST['articles/index'],

  events: {
    'click a.new-article': 'newArticle'
  },

  initialize: function() {
    this.listenTo(this.collection, 'add', this.editArticle);
  },

  render: function() {
    this.$el.html(this.template({
      articles: this.collection
    }));
    return this;
  },

  newArticle: function(event) {
    event.preventDefault();
    //var article = new Glossy.Models.Article;
    //article.set('draft', true);
    //article.save({}, {
    //  success: function() {
    //    Glossy.articles.add(this);
    //  }
    //});

    Backbone.history.navigate('/new', { trigger: true });
  },

  editArticle: function() {
    console.log('in edit article');
  }
});
