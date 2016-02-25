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
    // calculations and storing of vars
    let largestMobileScreen = 767; // from semantic-ui
    let bg = $(".bg");
    let sections = $('main section')
    let viewportHeight = document.documentElement.clientHeight;
    let viewportHeightTolerance = 100;
    let segmentMinHeight = 0;
    let orientation = window.orientation;

    function resizeHeights() {
      bg.height(viewportHeight);
      sections.css('min-height', segmentMinHeight);
    }

    function calcMinHeight() {
      if ((document.documentElement.clientWidth < largestMobileScreen) && orientation === 0) {
        segmentMinHeight = 0.5 * viewportHeight;
      } else {
        segmentMinHeight = 0.7 * viewportHeight;
      }
    }

    function resizeCheck(event) {
      let newViewportHeight = document.documentElement.clientHeight;
      let orientationChanged = false;

      // we changed orientation
      if (orientation !== window.orientation) {
        orientationChanged = true;
        orientation = window.orientation;
      }

      if (orientationChanged ||
          Math.abs(newViewportHeight - viewportHeight) > viewportHeightTolerance) {

        viewportHeight = newViewportHeight;
        calcMinHeight();
        resizeHeights();
      }
    }

    // event listeners
    $(window).resize(resizeCheck);
    window.addEventListener("orientationchange", resizeCheck);
    
    // run these on load
    calcMinHeight()
    resizeHeights();
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
    let currId = null;
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

    // arguments are (index, element) because this is used for the
    // jQuery collection filter, not the JS array filter
    let isInView = function(index, element) {
      // "screen top". element's top - what has been scrolled
      let elementTop = $(element).offset().top - $(window).scrollTop();

      if (viewportTopTolerance <= elementTop && elementTop <= viewportBottomTolerance) {
        return true;
      }
    };

    let updateCurrId = function(newId) {
      if (currId !== newId) {
        currId = newId;
        // Set/remove active class
        menuItems
          .removeClass("active")
          .filter("[href=#"+newId+"]").addClass("active");
      }
    }

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e){
      let href = $(this).attr("href");
      let offsetTop = href === "#home" ? 0 : $(href + "-section").offset().top-navMenuHeight;
      
      updateCurrId(href.slice(1, href.length));
      
      $('html, body').stop().animate({ 
          scrollTop: offsetTop
      }, 300);
      e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function() {
      // scroll was triggered by <nav>
      // <nav> will take care of updating the selected link
      if ($('html, body').is(':animated')) {
        return;
      }

      // Get id of current scroll item
      let sectionId = sections.filter(isInView).attr("id");

      // if none, means no section top is in viewport
      // so don't change the id
      if (sectionId) {
        let navId = sectionId.slice(0, sectionId.indexOf('-'));

        updateCurrId(navId);
      }
    }); // end bind to scroll
  };
}
