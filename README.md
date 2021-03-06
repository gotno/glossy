# Glossy

## An experimental blogging platform

Glossy was born out of my desire for more control in a CMS. In all the major brands I've tried, a person has very limited control over the way individual pages display. You can customize a post, and you can customize the number of posts shown on a page, but beyond that you have very little to say over the layout. Basically, in addition to being a web developer, I'm also a photographer and a writer. I wanted a platform that would let me build magazine-like articles, one page at a time. And so, Glossy.

### Features
+ Rich interactive blog post editor. Backbone app consuming a RESTful Rails API.
+ Drag-and-drop layout editing with views nested four levels deep.
+ Nested forms create multiple model types in a single transaction.
+ Bootstrapped data and customized JSON serialization to reduce AJAX overhead.

#### TODO
+ Logic
  + drag-and-dropability
    + drag rows from section to section
    + drag widgets from row to row
  + add wysihtml5
  + add paperclip-uploader for image preview/upload progress
  + sql cleanup and optimization
  + switch auth from hand-rolled to devise
  + nuke article/section headings
    + create seperate heading/body widgets
  + widget weight and centerability
    + use placeholder widget for now
    + which needs to be added
  + more widget types
    + audio
    + video
    + blockquote
    + map
  + comments
  + widget sortable placeholder
    + possible to resize widgets on sortStart/Stop?
  + change id to name[whatev] on forms
  + something is eating widgets when they aren't dropped properly from the panel
  + add image gallery functionality
+ Design
  + un-uglify the entire design
    + yes, the layout colors are hilarious, but they are also kind of hideous.
