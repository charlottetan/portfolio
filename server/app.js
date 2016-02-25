if (Meteor.isServer) {
    Meteor.startup(function () {

        if (Projects.find().count() === 0) {

            // these would be better in a json file
            // but I wanted to play around with mongo

            // possible fields:
            // title, url, src, img, tech, desc
            let bootstrapData = [{
                title: 'Portfolio', 
                url  : 'http://charlottetan.herokuapp.com',
                src  : 'https://github.com/charlottetan/portfolio',
                tech : ['Meteor', 'Semantic UI', 'Heroku'],
                desc : 'This site! Simple single page app to experiment with new frameworks.'
            }];

            _.each(bootstrapData, function(doc) { 
                Projects.insert(doc);
            });
        }
    });

    Meteor.publish("projects", function() {
        return Projects.find();
    });
}
