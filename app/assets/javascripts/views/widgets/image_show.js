Glossy.Views.WidgetImageShow = Backbone.View.extend({
  template: JST['widgets/image_show'],

  tagName: 'div',

  initialize: function(options) {
    this.familySize = options.familySize;
  },

  render: function() {
    this.$el.html(this.template({
      widget: this.model,
      familySize: this.familySize
    }));

    return this;
  }
});
