Glossy.Views.ArticlesForm = Backbone.View.extend({
  template: JST['articles/form'],

  events: {
    'submit': 'submit',
    'click a.add-section': 'addSection',
    'click #show_article_title': 'toggleTitle',
    'click #show_article_body': 'toggleBody',
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
    this.listenTo(this.model.get('sections'), 'add', this.renderSection);
    this.listenTo(this.model.get('sections'), 'add', this.reorderSections);

    this.sectionOrder = 0;
    this.sectionViews = [];

    var view = this;

    this.$el.html(this.template({
      article: this.model
    }));

    this.$sectionsList = this.$('ul.sections-list');
    this.setupUI();

    this.model.get('sections').each(function(section) {
      var sectionView = new Glossy.Views.SectionsForm({
        model: section
      });

      var $listEl = $('<li>');
      $listEl.html(sectionView.render().$el);
      view.$sectionsList.append($listEl);

      view.sectionOrder++;
      view.sectionViews.push(sectionView);
    });

    return this;
  },

  setupUI: function() {
    this.$sectionsList.sortable({
      scroll: true,
      scrollSensitivity: 100,
      scrollSpeed: 50
    });

    var view = this;
    this.$('div.create-section').draggable({

      helper: function() {
        return view.createDummySection();
      },

      connectToSortable: this.$sectionsList,
      containment: $('#content'),
      axis: 'y',
      revert: 'invalid',
      snap: true,
      snapMode: 'outer',
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

  addSection: function(event) {
    if (event) {
      event.preventDefault();
    }

    var section = new Glossy.Models.Section({
      ord: this.sectionOrder
    });

    this.model.get('sections').add(section);

    this.sectionOrder++;
  },

  createDummySection: function() {
    var section = new Glossy.Models.Section;
    var sectionView = new Glossy.Views.SectionsForm({
      model: section 
    });
    return sectionView.render().$el;
  },

  reorderSections: function(event, ui) {
    console.log('reordering');
    this.sectionViews.forEach(function(view) {
      view.model.set({
        ord: Math.floor(view.$el.offset()['top'])
      });
    });
  },

  renderSection: function() {
    var sectionView = new Glossy.Views.SectionsForm({
      model: this.model.get('sections').last()
    });

    this.sectionViews.push(sectionView);

    var $listEl = $('<li>');
    $listEl.html(sectionView.render().$el);
    this.$sectionsList.append($listEl);
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
