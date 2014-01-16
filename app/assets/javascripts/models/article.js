Glossy.Models.Article = Backbone.Model.extend({
  urlRoot: '/api/articles',

  parse: function (data) {
    if (data.sections) {
      var sections = data.sections;
      data.sections = new Glossy.Collections.Sections(sections, {
        article_id: data.id
      });
    }
    return data;
  }
});
