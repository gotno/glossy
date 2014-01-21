Glossy.Views.TextWidget = Backbone.View.extend({
  template: JST['widgets/image'],

  render: function() {
    this.$el.html(this.template({
      iw: this.model
    }));

    return this;
  }
});
