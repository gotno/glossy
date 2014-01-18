Glossy.Views.ArticlesEdit = Backbone.View.extend({
  template: JST['articles/edit'],

  events: {
    'submit': 'submit',
    'click a.add-section': 'addSection'
  },

  initialize: function() {
    this.sectionOrder = 0;
  },

  render: function() {
    var view = this;

    this.$el.html(this.template({
      article: this.model
    }));

    this.model.get('sections').each(function(section) {
      var sectView = new Glossy.Views.SectionsEdit({
        model: section
      });

      view.$el.find(':submit').before(sectView.render().$el);
      view.sectionOrder++;
    });
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

    var newSectionView = new Glossy.Views.SectionsNew;
    var $submit = this.$el.find(':submit');
    $submit.before(newSectionView.render(this.sectionOrder).$el);
    this.sectionOrder++;
  }
});
