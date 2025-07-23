import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular
} from '@ionic/angular/standalone';
import {
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { routes } from './app/app.routes';

declare var window: any;

// ⚠️ Boot dell'app solo dopo che il dispositivo è pronto
/*document.addEventListener('deviceready', () => {
  console.log('✅ Device ready');

  const oneSignal = window?.plugins?.OneSignal;

  if (!oneSignal) {
    console.error('❌ OneSignal non disponibile. Controlla che il plugin sia installato correttamente.');
  } else {
    // ⚙️ CONFIGURA ONESIGNAL
    oneSignal.setAppId('e9c960e6-8268-4f00-a58c-1c1ee131ee6c');

    oneSignal.setNotificationOpenedHandler((notification: any) => {
      console.log('🔔 Notifica aperta:', notification);
    });

    oneSignal.promptForPushNotificationsWithUserResponse((accepted: boolean) => {
      console.log('🔔 Notifiche accettate:', accepted);
    });

    console.log('✅ OneSignal configurato');
  }

  // 🔧 Bootstrap Angular solo dopo OneSignal (per evitare schermate bianche)
  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(withInterceptorsFromDi()),
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      provideIonicAngular(),
      provideRouter(routes, withPreloading(PreloadAllModules)),
    ],
  }).catch(err => console.error('❌ Errore bootstrap:', err));
});*/

// 🔧 Bootstrap Angular solo dopo OneSignal (per evitare schermate bianche)
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
}).catch(err => console.error('❌ Errore bootstrap:', err));
