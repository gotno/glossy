Glossy.Models.Article = Backbone.Model.extend({
  urlRoot: '/api/articles',

  initialize: function() {
    this.parse();
  },

  parse: function (response, options) {
    if (response && response.sections) {
      this.set('sections',
               new Glossy.Collections.Sections(response.sections));
    } else if (this.has('sections')) {
      this.set('sections',
               new Glossy.Collections.Sections(this.get('sections')));
    } else {
      this.set('sections', new Glossy.Collections.Sections());
    }
    
    this.get('sections').each(function(section) {
      if (section.has('rows')) {
        section.set('rows',
                 new Glossy.Collections.Rows(section.get('rows')));

        section.get('rows').each(function(row) {
          if (row.has('widget_texts')) {
            var widgetTexts = row.get('widget_texts');

            row.set('widgetTexts', 
                        new Glossy.Collections.WidgetTexts(widgetTexts));

            row.unset('widget_texts');
          }

          if (row.has('widget_images')) {
            var widgetImages = row.get('widget_images');

            row.set('widgetImages',
                        new Glossy.Collections.WidgetImages(widgetImages));
            row.unset('widget_images');
          }
        });
      }
    });
  },

  toJSON: function() {
    var json = _.clone(this.attributes);

    if (this.has('sections') && this.get('sections').length !== 0) {
      json.sections_attributes = this.get('sections').toJSON();
    }
    delete json.sections;
    
    return json;
  }
});
