Glossy.Collections.Rows = Backbone.Collection.extend({
  model: Glossy.Models.Row,

  url: '/api/rows',

  comparator: 'ord'
});
