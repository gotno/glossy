Glossy.Views.SidebarBack = Backbone.View.extend({
  template: JST['sidebar/back'],
  tagName: 'div',
  className: 'sidebar-wrapper sidebar-wrapper-back',

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
