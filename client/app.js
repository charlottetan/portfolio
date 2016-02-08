if (Meteor.isClient) {
  Meteor.subscribe("projects");

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
    let lastId = null;
    let topMenu = $("nav .container .menu");
    // All list items
    let menuItems = topMenu.find("a");
    // Anchors corresponding to menu items
    let scrollItems = menuItems.map(function(){
      // look for the element with the id in the menu's href e.g. #portfolio
      let item = $($(this).attr("href") + "-section");
      if (item.length) { return item; }
    });


    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e){
      let href = $(this).attr("href");
      let offsetTop = href === "#home" ? 0 : $(href + "-section").offset().top-45;
      $('html, body').stop().animate({ 
          scrollTop: offsetTop
      }, 300);
      e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function(){
       // Get container scroll position
       let fromTop = $(this).scrollTop();
       
       // Get id of current scroll item
       let cur = scrollItems.map(function(){
         if ($(this).offset().top < fromTop+46)
           return this;
       });
       // Get the id of the current element
       cur = cur[cur.length-1];
       let id = cur && cur.length ? cur[0].id : "home-section";
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