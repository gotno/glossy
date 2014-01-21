Glossy.Collections.TextWidgets = Backbone.Collection.extend({
  model: Glossy.Models.TextWidget,

  url: '/api/text_widgets',

  comparator: 'ord'
});
