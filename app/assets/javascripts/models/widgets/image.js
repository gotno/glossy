Glossy.Models.ImageWidget = Backbone.Model.extend({
  urlRoot: '/api/image_widgets',

  toJSON: function() {
    var json = _.clone(this.attributes);
    
    delete json.image_url_original;
    delete json.image_url_big;
    delete json.image_url_med;
    delete json.image_url_small;
    delete json.image_url_smallest;
    delete json.image_url_thumb;

    return json;
  }
});
