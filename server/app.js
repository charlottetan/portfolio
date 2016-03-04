if (Meteor.isServer) {

    Meteor.startup(function () {

        if (Projects.find().count() === 0) {

            // these would be better in a json file
            // but I wanted to play around with mongo

            // possible fields:
            // title, url, src, img, tech, desc
            let bootstrapData = [{
                title: 'Portfolio',
                url  : 'https://charlottetan.herokuapp.com',
                src  : 'https://github.com/charlottetan/portfolio',
                tech : ['Meteor', 'MongoDB', 'Semantic UI', 'Prerender', 'Heroku'],
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

    setupPrerender();

    function setupPrerender() {
        if (Meteor.settings.PrerenderIO === undefined) {
            console.warn("prerender settings are missing!");
            return;
        }

        // npm modules
        let PrerenderNode = Meteor.npmRequire('prerender-node');
        let PrerenderNodeMongo;

        // environment specific settings
        if (process.env.NODE_ENV === "development") {
            console.log("setting up localhost properties");

            PrerenderNode.set('prerenderServiceUrl', Meteor.settings.PrerenderIO.localhostPrerenderServiceUrl);
            // for prerender node mongo
            process.env.MONGOLAB_URI = Meteor.settings.localhostMongoUri;
        } else {
            PrerenderNode.set('protocol', 'https');
        }

        PrerenderNode.set('prerenderToken', Meteor.settings.PrerenderIO.token);

        // has to be after env props
        PrerenderNodeMongo = Meteor.npmRequire('prerender-node-mongo');

        // wrappers to fix npm module
        PrerenderNode.set('beforeRender', PrerenderNodeMongo.beforeRender);
        PrerenderNode.set('afterRender', PrerenderNodeMongo.afterRender);

        // use the modules
        WebApp.connectHandlers.use(PrerenderNodeMongo);
        WebApp.connectHandlers.use(PrerenderNode);
    }
}


