Package.describe({
  name: 'universe:dynamic-components',
  version: '0.0.1',
  summary: 'React components controller. You can register component and change it when You want.',
  git: 'git@bitbucket.org:mprzodala/universe-dynamic-components.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.4.1');
  api.use('ecmascript@0.4.5');
  api.mainModule('dynamic-components.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('universe:dynamic-components');
  api.mainModule('dynamic-components-tests.js');
});
