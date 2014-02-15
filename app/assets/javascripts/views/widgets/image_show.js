Glossy.Views.WidgetImageShow = Backbone.View.extend({
  template: JST['widgets/image_show'],

  tagName: 'div',

  render: function() {
    this.$el.html(this.template({
      widget: this.model
    }));

    return this;
  }
});
