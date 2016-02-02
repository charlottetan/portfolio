if (Meteor.isClient) {
  Template.body.helpers({
    contact: {
      linkedIn: 'https://www.linkedin.com/in/charlottetan',
      stackOverflow: 'http://stackoverflow.com/users/1498192/charlotte-tan',
      github: 'https://github.com/charlottetan'
    }
  });


  Template.portfolio.helpers({
    techToString: function (techArr) {
      return techArr.join(', ');
    },
    tasks: [
      {
        title: 'Portfolio', 
        url  : 'https://wwww.google.com',
        src  : 'https://wwww.google.com',
        tech : ['MeteorJS', 'Semantic UI'],
        desc : 'This site! Simple single page app to experiment with new frameworks.'
      }, {
        title: 'Portfolio', 
        url  : 'https://wwww.google.com',
        src  : 'https://wwww.google.com',
        img  : '/images/ssplaceholder.png',
        tech : ['MeteorJS', 'Semantic UI'],
        desc : 'This site! ent with new frameworks.'
      }, {
        title: 'Portfolio', 
        src  : 'https://wwww.google.com',
        tech : ['MeteorJS', 'Semantic UI'],
        desc : 'This site! Simple single page app to experiment with new frameworks and a bit longer.'
      }, {
        title: 'Portfolio', 
        url  : 'https://wwww.google.com',
        tech : ['MeteorJS', 'Semantic UI'],
        desc : 'This site! Simple single paget with new frameworks.'
      }, {
        title: 'Portfolio', 
        url  : 'https://wwww.google.com',
        src  : 'https://wwww.google.com',
        tech : ['MeteorJS', 'Semantic UI'],
        desc : 'This site! Simple single page app to eith lorem ipsum new frameworks.'
      }, {
        title: 'Portfolio', 
        url  : 'https://wwww.google.com',
        src  : 'https://wwww.google.com',
        tech : ['MeteorJS', 'Semantic UI'],
        desc : 'This site! Simple single page app to experiment with new frameworks. more ipsum bacon is tasty.'
      }
    ]
  });

Template.navItems.rendered = function () {
  


  // Cache selectors
  var lastId = null;
  var topMenu = $("#main-nav .container .menu");
  // All list items
  var menuItems = topMenu.find("a");
  // Anchors corresponding to menu items
  var scrollItems = menuItems.map(function(){
    // look for the element with the id in the menu's href e.g. #portfolio
    var item = $($(this).attr("href") + "-section");
    if (item.length) { return item; }
  });


  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function(e){
    var href = $(this).attr("href");
    var offsetTop = href === "#home" ? 0 : $(href + "-section").offset().top-45;
    $('html, body').stop().animate({ 
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
  });

  // Bind to scroll
  $(window).scroll(function(){
     // Get container scroll position
     var fromTop = $(this).scrollTop();
     
     // Get id of current scroll item
     var cur = scrollItems.map(function(){
       if ($(this).offset().top < fromTop+46)
         return this;
     });
     // Get the id of the current element
     cur = cur[cur.length-1];
     var id = cur && cur.length ? cur[0].id : "home-section";
     id = id.slice(0, id.indexOf('-'));
     
     if (lastId !== id) {
         lastId = id;
         // Set/remove active class
         menuItems
           .removeClass("active")
           .filter("[href=#"+id+"]").addClass("active");
     }                   
  });



};













}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
