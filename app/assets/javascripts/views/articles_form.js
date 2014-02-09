Glossy.Views.ArticlesForm = Backbone.View.extend({
  template: JST['articles/form'],

  events: {
    'submit': 'submit',
    'click #show_article_title': 'toggleTitle',
    'click #show_article_body': 'toggleBody',
    'sortstop': 'reorderSections',
    'dragstop': 'addSection'
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

    this.sectionViews = [];

    this.$el.html(this.template({
      article: this.model
    }));

    this.$sectionsList = this.$('ul.sections-list');
    this.renderSections();
    this.setupUI();

    return this;
  },

  setupUI: function() {
    this.$sectionsList.sortable({
      scroll: true,
      scrollSensitivity: 100,
      scrollSpeed: 50,
      axis: 'y'
    });

    this.$('div.create-section').draggable({

      helper: 'clone',
      connectToSortable: this.$sectionsList,
      appendTo: $('div.create-section'),
      axis: 'y',
      revert: 'invalid',
      snap: false,
      zIndex: 100
    });
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

  addSection: function(event, ui) {
    var $draggedEl = $($('.ui-draggable')[1]);

    var section = new Glossy.Models.Section({
      ord: (Math.floor($draggedEl.position()['top']) - 1),
      show_title: true
    });

    $draggedEl.remove();

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
    this.sectionViews.forEach(function(view) {
      view.model.set({
        ord: Math.floor(view.$el.position()['top'])
      });
    });
  },

  renderSections: function() {
    this.collect(); // make sure we don't obliterate data on re-render
    this.$sectionsList.empty();

    var view = this;
    this.model.get('sections').each(function(section) {
      var sectionView = new Glossy.Views.SectionsForm({
        model: section
      });

      var $listEl = $('<li>');
      $listEl.html(sectionView.render().$el);
      view.$sectionsList.append($listEl);

      view.sectionViews.push(sectionView);
    });

    this.reorderSections();
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
      hide_title: this.$('#show_article_title').prop('checked'),
      hide_body:  this.$('#show_article_body').prop('checked')
    });

    this.sectionViews.forEach(function(view) {
      view.collect();
    });
  }
});
