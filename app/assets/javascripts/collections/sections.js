Glossy.Collections.Sections = Backbone.Collection.extend({
  model: Glossy.Models.Section,

  url: '/api/sections',

  comparator: 'ord'
});
