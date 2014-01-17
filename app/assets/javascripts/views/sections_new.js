Glossy.Views.SectionsNew = Backbone.View.extend({
  template: JST['sections/form'],

  render: function(ord) {
    this.$el.html(this.template({
      idx: ord
    }));
    return this;
  }
});
