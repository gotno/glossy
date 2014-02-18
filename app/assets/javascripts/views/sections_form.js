Glossy.Views.SectionsForm = Backbone.View.extend({
  template: JST['sections/form'],

  tagName: 'li',
  className: 'section-edit',

  events: {
    'sortstop': 'sortStop',
    'sortstart': 'sortStart',
    'sortreceive': 'sortReceive',
    'click #hide_section_title': 'toggleTitle'
  },

  initialize: function() {
  },

  render: function() {
    this.$el.empty();
    this.$el.html(this.template({
      section: this.model
    }));

    this.$el.attr('data-ord', this.model.get('ord'));
    
    this.rowViews = [];
    this.$rowsList = this.$('ul.rows-list')
    this.$rowsList.sortable({
      axis: 'y',
      //connectWith: '.rows-list'
    });

    this.renderRows();

    if (this.model.has('rows')) {
      this.stopListening(this.model.get('rows'));
      this.listenTo(this.model.get('rows'), 'add', this.appendRow);
    } else {
      this.model.set('rows', new Glossy.Collections.Rows);
      this.listenTo(this.model.get('rows'), 'add', this.appendRow);
    }
    
    return this;
  },

  toggleTitle: function(event) {
    var $input = this.$('input[type=text]').first();
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
    if (this.model.has('rows') && this.model.get('rows').length !== 0) {
      this.collect();
      this.$rowsList.empty();

      var view = this;
      this.model.get('rows').each(function(row) {
        var rowView = new Glossy.Views.RowsForm({
          model: row
        });

        var el = rowView.render().$el;
        el.attr('data-ord', row.get('ord'));
        view.$rowsList.append(el);
        view.rowViews.push(rowView);
      });
    }
  },

  appendRow: function(row) {
    this.$('#rows-list-placeholder').remove();
    this.reorderRows();

    var view = new Glossy.Views.RowsForm({ model: row });
    this.rowViews.push(view);

    if (this.model.get('rows').length === 1) {
      this.$rowsList.append(view.render().$el);
    } else {
      var listItems = this.$rowsList.find('li.row-edit');

      listItems.each(function(idx, li) {
        var $li = $(li);

        if ($li.attr('data-ord') > row.get('ord')) {
          $li.parent().before(view.render().$el);
          return false;
        } else if (idx == listItems.length - 1) {
          $li.parent().after(view.render().$el);
          return false;
        }
      });
    }
  },

  reorderRows: function() {
    this.$rowsList.find('li.row-edit').each(function(idx, li) {
      var $li = $(li);
      var newOrd = Math.floor($li.position()['top']);
      $li.attr('data-ord', newOrd);
    });

    this.rowViews.forEach(function(view) {
      view.model.set('ord', view.$el.position()['top']);
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

  sortReceive: function(event, ui) {
    if ($(ui.item[0]).attr('id') == 'sidebar-row-item') {
      var row = new Glossy.Models.Row({
        ord: $(ui.item[0]).position()['top'] - 20
      });
      this.model.get('rows').add(row);

      $(ui.item[0]).remove();

      var $el = $('<li id="sidebar-row-item">')
      $el.append($('<a href="#">ROW</a>'));
      $('#sidebar-row').append($el);
    }
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
