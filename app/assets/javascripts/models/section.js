Glossy.Models.Section = Backbone.Model.extend({
  urlRoot: '/api/sections',

  toJSON: function() {
    var json = _.clone(this.attributes);
    if (this.get('textWidgets')) {
      json.text_widgets_attributes = this.get('textWidgets').toJSON();
    }
    if (this.get('imageWidgets')) {
      json.image_widgets_attributes = this.get('imageWidgets').toJSON();
    }

    return json;
  }
});
