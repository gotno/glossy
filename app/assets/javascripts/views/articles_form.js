Glossy.Views.ArticlesForm = Backbone.View.extend({
  template: JST['articles/form'],

  tagName: 'article',

  events: {
    'click button': 'submit',
    'click #hide_article_title': 'toggleTitle',
    'click #hide_article_body': 'toggleBody',
    'sortstart': 'sortStart',
    'sortbeforestop': 'sortBeforeStop',
    'sortstop': 'sortStop',
    'sortreceive': 'sortReceive'
  },

  initialize: function() {
    if (!Glossy.article.get('sections')) {
      Glossy.article.set('sections', new Glossy.Collections.Sections());
    }

    this.listenTo(this.model, 'sync', this.render);
    //this.listenTo(this.model.get('sections'), 'add', this.renderSections);

    this.sectionViews = [];

    // ugly beforeStart hack
    var oldMouseStart = $.ui.sortable.prototype._mouseStart;
    $.ui.sortable.prototype._mouseStart = function(event, overrideHandle, noActivation) {
       this._trigger("beforeStart", event, this._uiHash());
       oldMouseStart.apply(this, [event, overrideHandle, noActivation]);
    };
  },

  render: function() {
    this.$el.empty();


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

  addSection: function(ord) {
    var section = new Glossy.Models.Section({
      ord: ord
    });

    this.model.get('sections').add(section);

    var view = new Glossy.Views.SectionsForm({ model: section });
    this.sectionViews.push(view);

    if (this.model.get('sections').length === 1) {
      this.$sectionsList.append(view.render().$el);
    } else {
      this.$('li.section-edit').each(function(idx, li) {
        var $li = $(li);

        if ($li.attr('data-ord') > section.get('ord')) {
          $li.before(view.render().$el);
          return false;
        } else if (idx == $('li.section-edit').length - 1) {
          $li.after(view.render().$el);
          return false;
        }
      });
    }

    this.reorderSections();
  },

  reorderSections: function() {
    this.sectionViews.forEach(function(view) {
      var newOrd = Math.floor(view.$el.position()['top']);
      view.model.set('ord', newOrd);
      view.$el.attr('data-ord', newOrd);
    });
  },

  renderSections: function() {
    this.collect(); // make sure we don't obliterate data on re-render
    this.$sectionsList.empty();
    this.sectionViews = []

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
      cursorAt: { top: 8 },

      beforeStart: function(event, ui) {
        view.sectionViews.forEach(function(sview) {
          sview.rollUp();
        });
      }
    });
  },

  sortReceive: function(event, ui) {
    var ord = $(ui.item[0]).position()['top'] - 20;
    $(ui.item[0]).remove();

    this.addSection(ord);

    var $el = $('<li id="sidebar-section-item">')
    $el.append($('<a href="#">SECTION</a>'));
    $('#sidebar-section').append($el);
  },

  sortStart: function(event, ui) {
  },

  sortBeforeStop: function(event, ui) {
    if ($(ui.helper[0]).hasClass('section-edit')) {
      this.sectionViews.forEach(function(view) {
        view.rollDown();
      });

      $(window).scrollTop($(ui.helper[0]).position()['top'] - 50);
    }
  },

  sortStop: function(event, ui) {
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
      hide_title: this.$('#hide_article_title').hasClass('fa-eye-slash'),
      hide_body:  this.$('#hide_article_body').hasClass('fa-eye-slash')
    });

    this.sectionViews.forEach(function(view) {
      view.collect();
    });
  }
});
