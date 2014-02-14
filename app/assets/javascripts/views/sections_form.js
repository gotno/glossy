Glossy.Views.SectionsForm = Backbone.View.extend({
  template: JST['sections/form'],

  tagName: 'li',
  className: 'section-edit',

  events: {
    'sortstop': 'sortStop',
    'sortstart': 'sortStart',
    'click #hide_section_title': 'toggleTitle',
    //* these should go away for d+d
    'click button.section-add-text':  'addTextWidget',
    'click button.section-add-image': 'addImageWidget',
    'click button.destroy-section':   'destroySection'
    // */
  },

  render: function() {
    this.$el.empty();
    this.$el.html(this.template({
      section: this.model
    }));

    this.$el.attr('data-ord', this.model.get('ord'));
    
    this.rowViews = [];
    this.$rowsList = this.$('ul.rows-list')
    this.renderRows();

    return this;
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
    if (this.model.has('rows')) {
      this.collect();
      this.$rowsList.empty();

      var view = this;
      this.model.get('rows').each(function(row) {
        var rowView = new Glossy.Views.RowsForm({
          model: row
        });

        view.$rowsList.append(rowView.render().$el);
        view.rowViews.push(rowView);
      });

      this.$rowsList.sortable({
        axis: 'y',
        //connectWith: '.rows-list'
      });
    }
  },

  reorderRows: function() {
    this.rowViews.forEach(function(view) {
      view.model.set({
        ord: Math.floor(view.$el.position()['top'])
      });
    });
  },

  rollUp: function() {
    this.$el.toggleClass('rolled-up');
    this.rowViews.forEach(function(view) {
      view.$el.toggleClass('hidden');
    });
  },

  rollDown: function() {
    this.$el.toggleClass('rolled-up');
    this.rowViews.forEach(function(view) {
      view.$el.toggleClass('hidden');
    });
  },

  sortStart: function(event, ui) {
  },

  sortStop: function(event, ui) {
    this.reorderRows();
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
