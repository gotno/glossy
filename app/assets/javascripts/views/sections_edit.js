Glossy.Views.SectionsEdit = Backbone.View.extend({
  template: JST['sections/edit'],

  tagName: 'section',

  render: function() {
    this.$el.html(this.template({
      section: this.model
    }));
    return this;
  } ,

  collect: function() {
    var ord = this.model.get('ord');
    this.model.set('title', this.$('#section_title' + ord).val());
    this.model.set('show_title', this.$('#show_title' + ord).val());
  }
});
