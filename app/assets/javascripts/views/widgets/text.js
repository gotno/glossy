Glossy.Views.TextWidget = Backbone.View.extend({
  template: JST['widgets/text'],

  render: function() {
    this.$el.html(this.template({
      tw: this.model
    }));

    return this;
  }
});
