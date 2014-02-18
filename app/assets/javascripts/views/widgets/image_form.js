Glossy.Views.WidgetImageForm = Backbone.View.extend({
  template: JST['widgets/image_form'],

  tagName: 'li',
  className: 'widget-edit',

  events: {
    'change input[type=file]': 'encodeFile',
    'click #iw_hide_title': 'toggleTitle',
    'click #iw_hide_date': 'toggleBody',
  },

  render: function() {
    console.log('rendering image');
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
  
  encodeFile: function(event) {
    this.$('.image-widget-uploading').text('uploading...');
    this.$('.image-widget-uploading').css('margin-bottom', '2em');

    var view = this;
    var file = event.currentTarget.files[0];

    var reader = new FileReader();
    reader.onload = function(e) {
      view.model.set('img', e.target.result);

      //view.model.save(null, {
      Glossy.articleView.collect();
      Glossy.article.save(null, {
        success: function() {
          //view.render();
          console.log('article saved');
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
