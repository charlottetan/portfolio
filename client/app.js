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
    // Selectors
    let lastId = null;
    let topMenu = $("nav .container .menu");
    // All list items
    let menuItems = topMenu.find("a");
    // Anchors corresponding to menu items
    let sections = $("main section");
    // we will consider the section displayed if the elementTop
    // shows up between these values
    let navMenuHeight = 45;
    let viewportTopTolerance = navMenuHeight;
    let viewportBottomTolerance = $(window).height() * 0.70;

    // Because this is used for the jQuery collection filter,
    // not the JS array filter
    let isInView = function(index, element) {
      let elementTop = $(element).offset().top - $(window).scrollTop();

      if (elementTop >= viewportTopTolerance && elementTop <= viewportBottomTolerance) {
        return true;
      }
    };

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e){
      let href = $(this).attr("href");
      let offsetTop = href === "#home" ? 0 : $(href + "-section").offset().top-navMenuHeight;
      $('html, body').stop().animate({ 
          scrollTop: offsetTop
      }, 300);
      e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function() {
       // Get id of current scroll item
       let sectionId = sections.filter(isInView).attr("id");

       // if none, means no section top is in viewport
       // so don't change the id
       if (sectionId) {
        let navId = sectionId.slice(0, sectionId.indexOf('-'));

         if (lastId !== navId) {
             lastId = navId;
             // Set/remove active class
             menuItems
               .removeClass("active")
               .filter("[href=#"+navId+"]").addClass("active");
         }
       }
    }); // end bind to scroll
  };
}