Glossy.Models.Article = Backbone.Model.extend({
  urlRoot: '/api/articles',

  parse: function (data) {
    if (data.sections) {
      var sections = data.sections;
      data.sections = new Glossy.Collections.Sections(sections, {
        article_id: data.id
      });

      data.sections.each(function(section) {
        if (section.get('text_widgets')) {
          var textWidgets = section.get('text_widgets');

          section.set('text_widgets', 
                      new Glossy.Collections.TextWidgets(textWidgets));
        }

        if (section.get('image_widgets')) {
          var imageWidgets = section.get('image_widgets');

          section.set('image_widgets',
                      new Glossy.Collections.ImageWidgets(imageWidgets));
        }
      });
    }
    return data;
  },

  toJSON: function() {
    var json = _.clone(this.attributes);

    json.sections_attributes = this.get('sections').toJSON();
    
    return json;
  }
});
