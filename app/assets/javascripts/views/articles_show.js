Glossy.Views.ArticlesShow = Backbone.View.extend({
  template: JST['articles/show'],

  tagName: 'article',

  //events: {
    //'click button': 'edit'
  //},

  initialize: function() {
    if (!Glossy.article.get('sections')) {
      Glossy.article.set('sections', new Glossy.Collections.Sections());
    }
  },

  render: function() {
    this.$el.empty();

    this.$el.html(this.template({
      article: this.model
    }));

    this.$sectionsContainer = this.$('.sections-container');
    this.renderSections();

    return this;
  },

  edit: function(event) {
    event.preventDefault();

    this.collect();

    var view = this;
    Glossy.article.save({}, {
      success: function() {
        console.log('successful save.');
      }
    });
  },

  renderSections: function() {
    this.sectionViews = []

    var view = this;
    this.model.get('sections').each(function(section) {
      var sectionView = new Glossy.Views.SectionsShow({
        model: section
      });

      view.$sectionsContainer.append(sectionView.render().$el);

      view.sectionViews.push(sectionView);
    });
  },
});
