Glossy.Views.ArticlesForm = Backbone.View.extend({
  template: JST['articles/form'],

  tagName: 'article',

  events: {
    'click button': 'submit',
    'click #hide_article_title': 'toggleTitle',
    'click #hide_article_body': 'toggleBody',
    'sortstop': 'reorderSections'
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
    this.listenTo(this.model.get('sections'), 'add', this.renderSections);

    this.$el.html(this.template({
      article: this.model
    }));

    this.$sectionsList = this.$('ul.sections-list');
    this.renderSections();

    return this;
  },

  submit: function(event) {
    event.preventDefault();

    this.collect();

    var view = this;
    Glossy.article.save({}, {
      success: function() {
        console.log('successful save.');
      }
    });
  },

  addSection: function(event, ui) {
    //var $draggedEl = $($('.ui-draggable')[1]);

    var section = new Glossy.Models.Section({
      ord: 10//(Math.floor($draggedEl.position()['top']) - 1),
    });

    //$draggedEl.remove();

    this.model.get('sections').add(section);
  },

  createDummySection: function() {
    var section = new Glossy.Models.Section;
    var sectionView = new Glossy.Views.SectionsForm({
      model: section 
    });
    return sectionView.render().$el;
  },

  reorderSections: function(event, ui) {
    var view = this;

    this.sectionViews.forEach(function(view) {
      view.model.set({
        ord: Math.floor(view.$el.position()['top'])
      });
    });
  },

  renderSections: function() {
    this.$sectionsList.empty();
    this.sectionViews = []
    this.collect(); // make sure we don't obliterate data on re-render

    var view = this;
    this.model.get('sections').each(function(section) {
      var sectionView = new Glossy.Views.SectionsForm({
        model: section
      });

      view.$sectionsList.append(sectionView.render().$el);

      view.sectionViews.push(sectionView);
    });

    this.$('.sections-list').sortable({
      axis: 'y',
      toleranceElement: '> section',
    });
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
      hide_title: this.$('#hide_article_title').hasClass('fa-eye-slash'),
      hide_body:  this.$('#hide_article_body').hasClass('fa-eye-slash')
    });

    this.sectionViews.forEach(function(view) {
      view.collect();
    });
  }
});
