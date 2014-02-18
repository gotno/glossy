Glossy.Views.SidebarControls = Backbone.View.extend({
  template: JST['sidebar/controls'],
  tagName: 'div',
  className: 'sidebar-wrapper',

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
