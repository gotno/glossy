Glossy.Views.ArticlesForm = Backbone.View.extend({
  template: JST['articles/form'],

  events: {
    'submit': 'submit',
    'click a.add-section': 'addSection',
    'click #show_article_title': 'toggleTitle',
    'click #show_article_body': 'toggleBody'
  },

  initialize: function() {
    if (!Glossy.article.get('sections')) {
      Glossy.article.set('sections', new Glossy.Collections.Sections());
    }

    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    this.$el.empty();
    this.stopListening(this.model.get('sections'));
    this.listenTo(this.model.get('sections'), 'add', this.renderSection);

    this.sectionOrder = 0;
    this.sectionViews = [];

    var view = this;

    this.$el.html(this.template({
      article: this.model
    }));

    this.model.get('sections').each(function(section) {
      var sectionView = new Glossy.Views.SectionsForm({
        model: section
      });

      var $submit = view.$el.find(':submit');
      var $parent = $($submit.parents()[1]);

      $parent.before(sectionView.render().$el);

      view.sectionOrder++;
      view.sectionViews.push(sectionView);
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
    var $parent = $($submit.parents()[1]);
    
    var sectionView = new Glossy.Views.SectionsForm({
      model: this.model.get('sections').last()
    });

    this.sectionViews.push(sectionView);

    $parent.before(sectionView.render().$el);
  },

  toggleTitle: function(event) {
    var $input = this.$('input[type=text]#article_title');
    $input.prop('disabled', (!$input.prop('disabled')));
  },

  toggleBody: function(event) {
    var $input = this.$('textarea#article_body');
    $input.prop('disabled', (!$input.prop('disabled')));
  },

  collect: function() {
    this.model.set({
      title:      this.$('#article_title').val(),
      body:       this.$('#article_body').val(),
      show_title: this.$('#show_article_title').prop('checked'),
      show_body:  this.$('#show_article_body').prop('checked')
    });

    this.sectionViews.forEach(function(view) {
      view.collect();
    });
  }
});
