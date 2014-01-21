Glossy.Collections.ImageWidgets = Backbone.Collection.extend({
  model: Glossy.Models.ImageWidget,

  url: '/api/image_widgets',

  comparator: 'ord'
});
