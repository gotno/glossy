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
  + paperclip-uploader
  + sql cleanup and optimization
  + switch auth from hand-rolled to devise
  + nuke article/section headings
    + create seperate heading/body widgets
  + widget weight and centerability
    + use placeholder widget for now
  + more widget types
    + audio
    + video
    + blockquote
    + map
  + comments
  + sortable list placeholders
  + resize widgets on sortStart/Stop
  + change id to name[whatev] on forms
+ Design
  + front/landing page
  + sign in
    + demo button
  + dummy content
    + demo article
