# Portfolio


## Goal

Experiment with new frameworks.

## Frameworks used

* [Meteor](https://www.meteor.com/) - Full stack JavaScript framework

  Generated a lot of excitement and advertises itself as being easy to use and great for building websites quickly.

* [Semantic UI](http://semantic-ui.com/) - Front end framework

  Wanted to use something other than [Bootstrap](http://getbootstrap.com/) and liked that it focused on semantics and natural language.

## Learning points

### Meteor
* **Everything is rendered using JavaScript.** Even if your app has only HTML. This means that if your user disables JS, you're dead in the water. It's also not great for SEO and requires you to use server-side rendering to get around this, which seems *really* unnecessary and over-complicated.
* The templating engine is really cool and easy to pick up.
* It has a great ecosystem of plugins. 

### Semantic UI

* You have to play within the rules. CSS conflicts happen really easily otherwise.
* There is a **huge** number of theming variables which are really helpful for customization.
* The documentation could really use some work. It was really confusing and there wasn't enough examples.

### General
* Fixed backgrounds can cause your browser to lag because the entire div (or page) gets redrawn when you scroll. [Remy Sharp](https://remysharp.com/2013/06/07/insights-into-rendering-performance) provides an elegant solution to this issue.
* I spend **so** much time designing and trying to get everything to look *just* right.

