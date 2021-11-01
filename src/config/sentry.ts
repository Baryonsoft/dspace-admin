import * as Sentry from '@sentry/angular';
import {Integrations} from '@sentry/tracing';
import {environment} from '../environments/environment';
import {getVersion} from './version';

const sentryEnvironment = environment.production ? 'production' : 'development';
console.info(`Sentry environment: ${sentryEnvironment}`);

// get sentry release version
let sentryRelease: string | undefined;
if (sentryEnvironment === 'production') {
  // v0.2.3, v0.2.3-beta.1
  sentryRelease = `baryonics-dashboard@${getVersion()}`;
  if (sentryRelease.includes('beta') && sentryEnvironment === 'production') {
    sentryRelease = undefined;
  }
}
console.info(`Sentry release: ${sentryRelease}`);

export const setupSentry = () => Sentry.init({
  dsn: environment.production ? 'https://e1133bfb187c45cd8b08c3099dd491ed@o468147.ingest.sentry.io/5989101' : null,
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.routingInstrumentation,
      tracingOrigins: ['localhost']
    })
  ],
  tracesSampleRate: environment.production ? 0.01 : 1.0,
  environment: sentryEnvironment,
  release: sentryRelease
});
