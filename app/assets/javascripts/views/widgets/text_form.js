Glossy.Views.TextWidgetForm = Backbone.View.extend({
  template: JST['widgets/text_form'],

  render: function() {
    this.$el.html(this.template({
      tw: this.model
    }));

    return this;
  },

  collect: function() {
    var ord = this.model.get('ord');
    this.model.set('title',      this.$('#tw_title' + ord).val());
    this.model.set('show_title', this.$('#tw_show_title' + ord).val());
    this.model.set('body',       this.$('#tw_body' + ord).val());
    this.model.set('show_body',  this.$('#tw_show_title' + ord).val());
  }
});
