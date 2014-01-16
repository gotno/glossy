Glossy.Collections.Sections = Backbone.Collection.extend({
  model: Glossy.Models.Section,

  initialize: function(options) {
    this.article_id = options.article_id;
  },

  url: function() {
    return '/api/sections/' + this.article_id + '/sections';
  },

  comparator: 'ord'
});
