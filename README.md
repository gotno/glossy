# Glossy

## An experimental blogging platform

Glossy was born out of my desire for more control in a CMS. In all the major brands I've tried, a person has very limited control over the way individual pages display. You can customize a post, and you can customize the number of posts shown on a page, but beyond that you have very little to say over the layout. Basically, in addition to being a web developer, I'm also a photographer and a writer. I wanted a platform that would let me build magazine-like articles, one page at a time. And so, Glossy.

### Features
+ Rich and interactive blog post editor utilizing Backbone.js over a RESTful Rails API.
+ Complex, drag-and-drop editable layout with nested views (in progress).
+ Nested form creates multiple model types in a single transaction.
+ Bootstrapped data and customized JSON serialization to reduce transaction overhead.

#### TODO
+ ##### Logic
  + add row logic
    + rework everything to incorporate rows
      + models
      + collections
      + views
      + templates
  + change id to name[whatev] on forms
  + drag-and-dropability
    + sections collapse on drag
    + drag row to row, section to section
  + add wysihtml5
  + paperclip
    + preview during upload
    + progress for uploads
    + image saving without full reload
  + sql cleanup and optimization
  + switch auth from hand-rolled to devise

+ ##### Design
  + front/landing page
  + sign in
    + demo button
  + dummy content
    + demo article
  + clear up edit layout
  + color scheme
  + show/hide labels
