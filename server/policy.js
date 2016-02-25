BrowserPolicy.framing.disallow();
BrowserPolicy.content.disallowEval();

let trusted = [
  '*.google-analytics.com',
  '*.prerender.io'
];

_.each(trusted, function(origin) {
  BrowserPolicy.content.allowOriginForAll(origin);
});
