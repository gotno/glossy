Glossy.Views.ArticlesForm = Backbone.View.extend({
  template: JST['articles/form'],

  events: {
    'submit': 'submit',
    'click a.add-section': 'addSection'
  },

  initialize: function() {
    if (!Glossy.article.get('sections')) {
      Glossy.article.set('sections', new Glossy.Collections.Sections());
    }

    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    this.$el.empty();
    this.listenTo(this.model.get('sections'), 'add', this.renderSection);

    this.sectionOrder = 0;
    this.sectionViews = [];

    var view = this;

    this.$el.html(this.template({
      article: this.model
    }));

    this.model.get('sections').each(function(section) {
      var editSectionView = new Glossy.Views.SectionsForm({
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
        console.log('successful save.');
      }
    });
  },

  addSection: function(event) {
    event.preventDefault();

    var section = new Glossy.Models.Section({
      ord: this.sectionOrder
    });
    this.model.get('sections').add(section);

    this.sectionOrder++;
  },

  renderSection: function() {
    var $submit = this.$el.find(':submit');
    
    var sectionView = new Glossy.Views.SectionsForm({
      model: this.model.get('sections').last()
    });

    this.sectionViews.push(sectionView);

    $submit.before(sectionView.render().$el);
  },

  collect: function() {
    this.model.set({
      title:      this.$('#article_title').val(),
      body:       this.$('#article_body').val(),
      show_title: this.$('#show_title').prop('checked'),
      show_body:  this.$('#show_body').prop('checked')
    });

    this.sectionViews.forEach(function(view) {
      view.collect();
    });
  }
});
