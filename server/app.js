if (Meteor.isServer) {
  Meteor.startup(function () {
    
    if (Projects.find().count() === 0) {

        var bootstrapData = [
          {
            title: 'Portfolio', 
            url  : 'https://wwww.google.com',
            src  : 'https://github.com/charlottetan/portfolio',
            tech : ['Meteor', 'Semantic UI'],
            desc : 'This site! Simple single page app to experiment with new frameworks.'
          }, {
            title: 'Portfolio', 
            url  : 'https://wwww.google.com',
            src  : 'https://wwww.google.com',
            img  : '/images/ssplaceholder.png',
            tech : ['Meteor', 'Semantic UI'],
            desc : 'This site! ent with new frameworks.'
          }, {
            title: 'Portfolio', 
            src  : 'https://wwww.google.com',
            tech : ['Meteor', 'Semantic UI'],
            desc : 'This site! Simple single page app to experiment with new frameworks and a bit longer.'
          }, {
            title: 'Portfolio', 
            url  : 'https://wwww.google.com',
            tech : ['Meteor', 'Semantic UI'],
            desc : 'This site! Simple single paget with new frameworks.'
          }, {
            title: 'Portfolio', 
            url  : 'https://wwww.google.com',
            src  : 'https://wwww.google.com',
            tech : ['Meteor', 'Semantic UI'],
            desc : 'This site! Simple single page app to eith lorem ipsum new frameworks.'
          }, {
            title: 'Portfolio', 
            url  : 'https://wwww.google.com',
            src  : 'https://wwww.google.com',
            tech : ['Meteor', 'Semantic UI'],
            desc : 'This site! Simple single page app to experiment with new frameworks. more ipsum bacon is tasty.'
          }
        ];

        _.each(bootstrapData, function(doc) { 
            Projects.insert(doc);
        })
    }
  });
}