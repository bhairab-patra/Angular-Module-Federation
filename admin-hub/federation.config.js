const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'admin-hub',

  remotes: {
    'experience-hub': 'http://localhost:4201/remoteEntry.json',
    'e-invoice':      'http://localhost:4202/remoteEntry.json',
    'tntmg-hub':      'http://localhost:8766/remoteEntry.json',
    'user-management':'http://localhost:4203/remoteEntry.json',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

  skip: ['rxjs/ajax', 'rxjs/fetch', 'rxjs/testing', 'rxjs/webSocket', '@bhairab-patra/platform-ui'],
});
