if (Meteor.isClient) {
  Meteor.subscribe("projects");

  Template.body.helpers({
    contact: {
      linkedIn: 'https://www.linkedin.com/in/charlottetan',
      stackOverflow: 'http://stackoverflow.com/users/1498192/charlotte-tan',
      github: 'https://github.com/charlottetan'
    }
  });

  Template.body.rendered = function() {
    var bg = $(".bg");
    $(window).resize("resizeBackground");

    function resizeBackground() {
        bg.height($(window).height());
    }
    
    resizeBackground();

    analytics.page('root');
  };

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

       let windowHeight = $(this).height();
       let docHeight = $(document).height();
       let bottomTolerance = 100;
       
       // Get id of current scroll item
       let candidates = scrollItems.map(function(){
         if ($(this).offset().top < fromTop+46) {
           return this;
         }
       });

       // Get the last item in the list
       let cur = candidates[candidates.length-1];

       // check if we're near the bottom
       if (fromTop + windowHeight > docHeight - bottomTolerance) {
        // then actually it's the last item, because it never reaches the nav bar's height
        cur = $(scrollItems[scrollItems.length-1]);
       }

       // Get the id of the current element
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