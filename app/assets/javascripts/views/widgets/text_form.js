Glossy.Views.TextWidgetForm = Backbone.View.extend({
  template: JST['widgets/text_form'],

  events: {
    'click #tw_show_title': 'toggleTitle',
    'click #tw_show_body': 'toggleBody',
    'click a.text-widget-remove': 'destroyTextWidget'
  },

  render: function() {
    this.$el.html(this.template({
      widget: this.model
    }));

    return this;
  },

  toggleTitle: function(event) {
    var $input = this.$('input[type=text]#tw_title');
    $input.prop('disabled', (!$input.prop('disabled')));
  },

  toggleBody: function(event) {
    var $input = this.$('textarea#tw_body');
    $input.prop('disabled', (!$input.prop('disabled')));
  },

  destroyTextWidget: function(event) {
    event.preventDefault();

    var view = this;
    this.model.destroy({
      success: function() {
        view.remove();
      }
    });
  },

  collect: function() {
    var ord = this.model.get('ord');
    this.model.set({ 
      title:      this.$('#tw_title').val(),
      show_title: this.$('#tw_show_title').prop('checked'),
      body:       this.$('#tw_body').val(),
      show_body:  this.$('#tw_show_title').prop('checked')
    });
  }
});
