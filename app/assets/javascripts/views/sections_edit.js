Glossy.Views.SectionsEdit = Backbone.View.extend({
  template: JST['sections/edit'],

  tagName: 'section',

  render: function() {
    this.$el.html(this.template({
      section: this.model
    }));
    return this;
  }
});
