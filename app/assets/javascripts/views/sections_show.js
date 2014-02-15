Glossy.Views.SectionsShow = Backbone.View.extend({
  template: JST['sections/show'],

  tagName: 'section',

  render: function() {
    this.$el.empty();
    this.$el.html(this.template({
      section: this.model
    }));

    this.$el.attr('data-ord', this.model.get('ord'));
    
    this.rowViews = [];
    this.$rowsContainer = this.$('.rows-container')

    this.renderRows();
    
    return this;
  },

  renderRows: function() {
    if (this.model.has('rows')) {
      var view = this;

      this.model.get('rows').each(function(row) {
        var rowView = new Glossy.Views.RowsShow({
          model: row
        });

        var el = rowView.render().$el;
        view.$rowsContainer.append(el);
        view.rowViews.push(rowView);
      });
    }
  }
});
