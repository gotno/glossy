Glossy.Views.ArticlesForm = Backbone.View.extend({
  template: JST['articles/form'],

  events: {
    'submit': 'submit',
    'click a.add-section': 'addSection'
  },

  initialize: function() {
    this.sectionOrder = 0;
    this.sectionViews = [];

    if (!Glossy.article.get('sections')) {
      Glossy.article.set('sections', new Glossy.Collections.Sections());
    }

    this.listenTo(Glossy.article.get('sections'), 'add', this.renderSection);
  },

  render: function() {
    var view = this;

    this.$el.html(this.template({
      article: this.model
    }));

    this.model.get('sections').each(function(section) {
      var editSectionView = new Glossy.Views.SectionsEdit({
        model: section
      });

      view.$el.find(':submit').before(editSectionView.render().$el);
      view.sectionOrder++;
      view.sectionViews.push(editSectionView);
    });

    return this;
  },

  submit: function(event) {
    event.preventDefault();

    this.collect();

    Glossy.article.save({}, {
      success: function() {
        console.log('successfully saved');
      }
    });
  },

  addSection: function(event) {
    event.preventDefault();

    var section = new Glossy.Models.Section({
      ord: this.sectionOrder
    });
    Glossy.article.get('sections').add(section);

    this.sectionOrder++;
  },

  renderSection: function() {
    var $submit = this.$el.find(':submit');
    
    var editSectionView = new Glossy.Views.SectionsNew({
      model: Glossy.article.get('sections').last()
    });

    this.sectionViews.push(newSectionView);

    $submit.before(editSectionView.render().$el);
  },

  collect: function() {
    this.model.set('title', this.$('#article_title').val());
    this.model.set('body', this.$('#article_body').val());
    this.model.set('show_title', this.$('#show_title').val());
    this.model.set('show_body', this.$('#show_body').val());

    this.sectionViews.forEach(function(view) {
      view.collect();
    });
  }
});
