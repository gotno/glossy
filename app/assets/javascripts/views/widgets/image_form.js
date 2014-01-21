Glossy.Views.ImageWidgetForm = Backbone.View.extend({
  template: JST['widgets/image_form'],

  render: function() {
    this.$el.html(this.template({
      iw: this.model
    }));

    return this;
  }
});
