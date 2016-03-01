# Portfolio

## Goal

Experiment with new frameworks.

## Technologies

* [Meteor](https://www.meteor.com) - Full stack JavaScript framework

  Generated a lot of excitement and advertises itself as being easy to use and great for building websites quickly.

* [MongoDB](https://www.mongodb.org) - NoSQL database that comes for free with Meteor

* [Semantic UI](http://semantic-ui.com) - Front end framework

  Wanted to use something other than [Bootstrap](http://getbootstrap.com/) and liked that it focused on semantics and natural language.

* [Prerender](https://prerender.io) - [Node](https://nodejs.org) server that uses [phantomjs](http://phantomjs.org) to render a javascript-rendered page as HTML

  Allows JS apps to be crawled and indexed by search engines and social media websites. Added caching with MongoDB using [mLab](https://mlab.com)

* [Heroku](https://www.heroku.com) - Cloud platform for deployment

## Notes

### Meteor
* **Everything is rendered using JavaScript.** This impacts SEO, and presents some challenges if your visitor disables JS. Server side rendering is used to work around this.
* The templating engine is straightforward and easy to use.
* There is a great ecosystem of plugins and community.
* The built-in aggregation and minification of CSS and JS files is awesome.
* Fast reloads? Yes, please!

### Semantic UI

* You have to play within the rules. CSS conflicts happen really easily.
* There is a **huge** number of theming variables which is really helpful for customization.
* The documentation could really use some work. It was confusing and there wasn't enough examples.
* I really liked the number and wide variety of components that was available.
* It generates *a lot* of files. It can get cumbersome to keep track of what was modified and where, but is worth it for the flexibility it gives.
* I started off having a `.gitignore` for Semantic-UI to avoid checking in generated files, but it caused issues with Heroku's buildpacks and had to be removed.

### Deployment
* The site was initially deployed on [charlottetan.meteor.com](http://charlottetan.meteor.com). Deployment was super easy and pain-free but the site takes awhile to spin up after it goes to sleep.
* Heroku has no official support for Meteor at this time but has a number of Meteor buildpacks. I use [jordansissel's](https://elements.heroku.com/buildpacks/jordansissel/heroku-buildpack-meteor).

### General
* Fixed backgrounds can cause browsers to lag because the entire div (or page) gets redrawn during the scroll. [Remy Sharp](https://remysharp.com/2013/06/07/insights-into-rendering-performance) provides an elegant solution to this issue.
* Some background images from [Subtle Patterns](http://subtlepatterns.com/).
* Design is hard.
