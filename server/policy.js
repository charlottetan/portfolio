BrowserPolicy.framing.disallow();
BrowserPolicy.content.disallowEval();
BrowserPolicy.content.allowInlineStyles();
BrowserPolicy.content.allowFontDataUrl();

let trusted = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  '*.google-analytics.com',
  '*.prerender.io'
];

_.each(trusted, function(origin) {
  BrowserPolicy.content.allowOriginForAll(origin);
});
