Glossy.Collections.WidgetImages = Backbone.Collection.extend({
  model: Glossy.Models.WidgetImage,

  url: '/api/widget_images',

  comparator: 'ord'
});
