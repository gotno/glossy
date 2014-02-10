Glossy.Views.WidgetImageForm = Backbone.View.extend({
  template: JST['widgets/image_form'],

  tagName: 'li',

  events: {
    'change input[type=file]': 'encodeFile',
    'click #iw_hide_title': 'toggleTitle',
    'click #iw_hide_date': 'toggleBody',
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

  destroyWidgetImage: function(event) {
    event.preventDefault();

    this.$('a.image-widget-remove').prop('disabled', true);
    this.$('a.image-widget-remove').text('deleting image...');

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
      hide_title: this.$('#iw_hide_title').hasClass('fa-eye-slash'),
      date:  this.$('#iw_date').val(),
      hide_date: this.$('#iw_hide_date').hasClass('fa-eye-slash')
    });
  }
});
