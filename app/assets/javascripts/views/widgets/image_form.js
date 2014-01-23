Glossy.Views.ImageWidgetForm = Backbone.View.extend({
  template: JST['widgets/image_form'],

  events: {
    'change input[type=file]': 'encodeFile',
    'click #iw_show_title': 'toggleTitle',
    'click #iw_show_date': 'toggleBody',
    'click a.image-widget-remove': 'destroyImageWidget'
  },

  render: function() {
    this.$el.html(this.template({
      widget: this.model
    }));

    return this;
  },

  toggleTitle: function(event) {
    var $input = this.$('input[type=text]#iw_title');
    $input.prop('disabled', (!$input.prop('disabled')));
  },

  toggleBody: function(event) {
    var $input = this.$('input[type="date"]#iw_date');
    $input.prop('disabled', (!$input.prop('disabled')));
  },

  destroyImageWidget: function(event) {
    event.preventDefault();

    var view = this;
    this.model.destroy({
      success: function() {
        view.remove();
      }
    });
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
    this.model.set({
      title: this.$('#iw_title').val(),
      show_title: this.$('#iw_show_title').prop('checked'),
      date:  this.$('#iw_date').val(),
      show_date: this.$('#iw_show_date').prop('checked')
    });
  }
});
