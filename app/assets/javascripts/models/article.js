Glossy.Models.Article = Backbone.Model.extend({
  urlRoot: '/api/articles',

  initialize: function() {
    this.parseSections();
  },

  parseSections: function () {
    if (this.has('sections')) {
      this.set('sections', new Glossy.Collections.Sections(this.get('sections')));

      this.get('sections').each(function(section) {
        if (section.has('text_widgets')) {
          var textWidgets = section.get('text_widgets');

          section.set('textWidgets', 
                      new Glossy.Collections.TextWidgets(textWidgets));

          section.unset('text_widgets');
        }

        if (section.has('image_widgets')) {
          var imageWidgets = section.get('image_widgets');

          section.set('imageWidgets',
                      new Glossy.Collections.ImageWidgets(imageWidgets));
          section.unset('image_widgets');
        }
      });
    } else {
      this.set('sections', new Glossy.Collections.Sections());
    }
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
