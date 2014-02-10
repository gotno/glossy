Glossy.Views.SectionsForm = Backbone.View.extend({
  template: JST['sections/form'],

  tagName: 'section',
  attributes: {
    class: 'section-edit'
  },

  events: {
    'click #hide_section_title': 'toggleTitle',
    //* these should go away for d+d
    'click button.section-add-text':  'addTextWidget',
    'click button.section-add-image': 'addImageWidget',
    'click button.destroy-section':   'destroySection'
    // */
  },
  
  /*
  initialize: function() {
    this.setupWidgets();
  },
  */

  render: function() {
    this.$el.empty();
    this.$el.html(this.template({
      section: this.model
    }));
    
    this.rowViews = [];
    this.$rowsList = this.$('ul.rows-list')
    this.renderRows();

    return this;

    /*
    this.widgetOrder = 0;
    this.widgetViews = [];

    this.$widgetsList = this.$('.widgets-list');

    var view = this;
    this.getSortedWidgets().forEach(function(widget) {
      view.renderWidget(widget.get('widget_type'), widget);
    });
    */
  },

  toggleTitle: function(event) {
    var $input = this.$('input[type=text]');
    $input.prop('disabled', (!$input.prop('disabled')));
  },

  destroySection: function(event) {
    event.preventDefault();

    var view = this;
    this.model.destroy({
      success: function() {
        view.remove();
      }
    });
  },

  renderRows: function() {
    this.collect();
    this.$rowsList.empty();

    var view = this;
    this.model.get('rows').each(function(row) {
      var rowView = new Glossy.Views.Row({
        model: row
      });

      var $listEl = $('<li>');
      $listEl.html(rowView.render().$el);
      view.$rowsList.append($listEl);
      view.rowViews.push(rowView);
    });
  },

  reorderRows: function() {
    this.rowViews.forEach(function(view) {
      view.model.set({
        ord: Math.floor(view.$el.position()['top'])
      });
    });
  },

  collect: function() {
    this.model.set({
      title:      this.$('#section_title').val(),
      hide_title: this.$('#hide_section_title').hasClass('fa-eye-slash')
    });

    this.rowViews.forEach(function(view) {
      view.collect();
    });
  }
});
