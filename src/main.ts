import { bootstrapApplication } from '@angular/platform-browser';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { appConfig } from './app/app.config';
import { App } from './app/app';


const configWithCharts = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideCharts(withDefaultRegisterables()) 
  ]
};

bootstrapApplication(App, configWithCharts)
  .catch((err) => console.error(err));
