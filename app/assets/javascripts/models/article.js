Glossy.Models.Article = Backbone.Model.extend({
  urlRoot: '/api/articles',

  parse: function (data) {
    if (data.sections) {
      var sections = data.sections;
      data.sections = new Glossy.Collections.Sections(sections);

      data.sections.each(function(section) {
        if (section.get('text_widgets')) {
          var textWidgets = section.get('text_widgets');

          section.set('textWidgets', 
                      new Glossy.Collections.TextWidgets(textWidgets));

          section.unset('text_widgets');
        }

        if (section.get('image_widgets')) {
          var imageWidgets = section.get('image_widgets');

          section.set('imageWidgets',
                      new Glossy.Collections.ImageWidgets(imageWidgets));
          section.unset('image_widgets');
        }
      });
    }

    return data;
  },

  toJSON: function() {
    var json = _.clone(this.attributes);

    if (this.get('sections').length !== 0) {
      json.sections_attributes = this.get('sections').toJSON();
    }
    delete json.sections;
    
    return json;
  }
});
