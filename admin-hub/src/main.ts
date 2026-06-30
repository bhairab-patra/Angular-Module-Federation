import { initFederation } from '@angular-architects/native-federation';

initFederation({
  'experience-hub': 'http://localhost:4201/remoteEntry.json',
  'e-invoice': 'http://localhost:4202/remoteEntry.json',
  'tntmg-hub': 'http://localhost:8766/remoteEntry.json',
})
  .catch(err => console.error(err))
  .then(() => import('./bootstrap'))
  .catch(err => console.error(err));
