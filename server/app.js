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

    // Prerender mongo
    if (process.env.MONGOLAB_URI === undefined) {
        process.env.MONGOLAB_URI = 'mongodb://127.0.0.1:3001/meteor';
    }

    let PrerenderMongo = Meteor.npmRequire('prerender-mongo');

    // Prerender settings
    let PrerenderNode = Meteor.npmRequire('prerender-node');
    let prerenderSettings = Meteor.settings.PrerenderIO;

    if (prerenderSettings !== undefined) {
        // localhost
        PrerenderNode.set('prerenderToken', Meteor.settings.PrerenderIO.token);
        PrerenderNode.set('prerenderServiceUrl', Meteor.settings.PrerenderIO.prerenderServiceUrl);
    } else {
        PrerenderNode.set('protocol', 'https');
    }

    // wrappers to fix npm module
    PrerenderNode.set('beforeRender', function(req, done) {
        console.log('beforeRender');

        // set up req
        if (req.prerender === undefined) {
            req.prerender = {
                url: req.url
            };
        }

        // set up res
        let res = {}
        res.send = function(statusCode, value) {
            return done(null, {body: value, status: statusCode});
        };

        // finally call prerenderMongo with our new vars
        PrerenderMongo.beforePhantomRequest(req, res, done);
    });

    PrerenderNode.set('afterRender', function(err, req, prerender_res) {
        console.log('afterRender');

        req.prerender.statusCode = prerender_res.statusCode;
        req.prerender.documentHTML = prerender_res.body;

        // pass empty res since it's not used in prerenderMongo's after
        let res = {};

        // empty next function
        let next = function() {};

        PrerenderMongo.afterPhantomRequest(req, res, next);
    });


    // use the modules
    WebApp.connectHandlers.use(PrerenderMongo);
    WebApp.connectHandlers.use(PrerenderNode);
}
