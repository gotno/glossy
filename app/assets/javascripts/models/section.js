Glossy.Models.Section = Backbone.Model.extend({
  urlRoot: '/api/sections',

  toJSON: function() {
    var json = _.clone(this.attributes);

    if (this.has('rows') && this.get('rows').length !== 0) {
      json.rows_attributes = this.get('rows').toJSON();
    }
    delete json.rows;
    
    return json;
  }
});
