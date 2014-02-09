Glossy.Models.Row = Backbone.Model.extend({
  urlRoot: '/api/rows',

  toJSON: function() {
    var json = _.clone(this.attributes);

    if (this.has('widgetTexts') && this.get('widgetTexts').length !== 0) {
      json.widget_texts_attributes = this.get('widgetTexts').toJSON();
    }
    delete json.widgetTexts;

    if (this.has('widgetImages') && this.get('widgetImages').length !== 0) {
      json.widget_images_attributes = this.get('widgetImages').toJSON();
    }
    delete json.widgetImages;

    return json;
  }
});
