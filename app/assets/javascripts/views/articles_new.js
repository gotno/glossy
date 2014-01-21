Glossy.Views.ArticlesNew = Backbone.View.extend({
  template: JST['articles/new'],

  events: {
    'submit': 'submit',
    'click a.add-section': 'addSection'
  },

  initialize: function() {
    this.sectionOrder = 0;
    this.sectionViews = [];

    Glossy.article.set('sections', new Glossy.Collections.Sections());

    this.listenTo(Glossy.article.get('sections'), 'add', this.renderSection);
  },

  render: function() {
    this.$el.html(this.template());
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
    
    var newSectionView = new Glossy.Views.SectionsNew({
      model: Glossy.article.get('sections').last()
    });

    this.sectionViews.push(newSectionView);

    $submit.before(newSectionView.render().$el);
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
