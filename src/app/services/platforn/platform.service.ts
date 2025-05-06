import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private platform: Platform) {}

  isMobileNative(): boolean {
    return Capacitor.isNativePlatform();
  }

  isWeb(): boolean {
    return !this.isMobileNative();
  }

  getPlatformType(): 'native' | 'web' {
    return this.isMobileNative() ? 'native' : 'web';
  }
}
