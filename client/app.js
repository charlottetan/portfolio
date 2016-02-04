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
    projects: function() {
      return Projects.find();
    }
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