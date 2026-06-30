import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

console.log('[bootstrap] starting...');
bootstrapApplication(AppComponent, appConfig)
  .then(() => console.log('[bootstrap] success'))
  .catch(err => { console.error('[bootstrap] FAILED', err); });
