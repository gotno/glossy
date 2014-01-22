Glossy.Views.ImageWidgetForm = Backbone.View.extend({
  template: JST['widgets/image_form'],

  events: {
    'change input[type=file]': 'encodeFile'
  },

  render: function() {
    this.$el.html(this.template({
      widget: this.model
    }));

    return this;
  },

  encodeFile: function(event) {
    var view = this;
    var file = event.currentTarget.files[0];

    var reader = new FileReader();
    reader.onload = function(e) {
      view.model.set('img', e.target.result);

      Glossy.article.save(null, {
        success: function() {
          console.log('image saved');
        }
      });
    };

    reader.onerror = function(err) {
      console.log('error', err);
      console.log(err.getMessage());
    };

    reader.readAsDataURL(file);
  },

  collect: function() {
    var ord = this.model.get('ord');
    this.model.set({
      title: this.$('#iw_title' + ord).val(),
      show_title: this.$('#iw_show_title' + ord).prop('checked'),
      date:  this.$('#iw_date' + ord).val(),
      show_date: this.$('#iw_show_date' + ord).prop('checked')
    });
  }
});
