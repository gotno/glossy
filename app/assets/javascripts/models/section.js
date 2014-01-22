Glossy.Models.Section = Backbone.Model.extend({
  urlRoot: '/api/sections',

  toJSON: function() {
    var json = _.clone(this.attributes);

    if (this.get('textWidgets') && this.get('textWidgets').length !== 0) {
      json.text_widgets_attributes = this.get('textWidgets').toJSON();
    }
    delete json.textWidgets;

    if (this.get('imageWidgets') && this.get('imageWidgets').length !== 0) {
      json.image_widgets_attributes = this.get('imageWidgets').toJSON();
    }
    delete json.imageWidgets;

    return json;
  }
});
