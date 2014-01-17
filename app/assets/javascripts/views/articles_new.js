Glossy.Views.ArticlesNew = Backbone.View.extend({
  template: JST['articles/form'],

  events: {
    'submit': 'submit',
    'click a.add-section': 'addSection'
  },

  initialize: function() {
    this.sectionOrder = 0;
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var formData = $(event.target).serializeJSON();
    var newArticle = new Glossy.Models.Article(formData);
    newArticle.save({}, {
      success: function(model) {
        Glossy.articles.add(model);
        Backbone.history.navigate('', { trigger: true });
      }
    });
  },

  addSection: function(event) {
    event.preventDefault();
    console.log("in addSection");

    var newSectionView = new Glossy.Views.SectionsNew;
    var $submit = this.$el.find(':submit');
    $submit.before(newSectionView.render(this.sectionOrder).$el);
    this.sectionOrder++;
  }
});
