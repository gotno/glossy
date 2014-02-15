Glossy.Views.WidgetTextShow = Backbone.View.extend({
  template: JST['widgets/text_show'],

  tagName: 'div',

  render: function() {
    this.$el.html(this.template({
      widget: this.model
    }));

    return this;
  }
});
