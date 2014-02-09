Glossy.Collections.WidgetTexts = Backbone.Collection.extend({
  model: Glossy.Models.WidgetText,

  url: '/api/widget_texts',

  comparator: 'ord'
});
