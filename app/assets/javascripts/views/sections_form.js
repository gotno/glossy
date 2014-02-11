Glossy.Views.SectionsForm = Backbone.View.extend({
  template: JST['sections/form'],

  tagName: 'li',

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

  render: function() {
    this.$el.empty();
    this.$el.html(this.template({
      section: this.model
    }));
    
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
      verticle: true,
      nested: false,
      group: 'rows',

      onDragStart: function ($item, container, _super) {
        var offset = $item.offset(),
            pointer = container.rootGroup.pointer

        adjustment = {
          left: pointer.left - offset.left,
          top: pointer.top - offset.top
        };
        
        _super($item, container);
      },

      onDrag: function ($item, position) {
        $item.css({
          left: position.left - adjustment.left,
          top: position.top - adjustment.top
        })
      }
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
