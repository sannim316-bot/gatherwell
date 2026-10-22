import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';

if (Capacitor.isNativePlatform()) {
  App.addListener('backButton', () => {
    const dialog = document.querySelector('dialog[open]');
    if (dialog) dialog.close();
    else if (location.hash && location.hash !== '#home') location.hash = 'home';
    else App.exitApp();
  });
  App.addListener('appStateChange', ({isActive}) => {
    if (isActive) window.dispatchEvent(new Event('focus'));
  });
  document.addEventListener('click', async event => {
    const anchor = event.target.closest('a[target="_blank"]');
    if (!anchor || !anchor.href.startsWith('https://')) return;
    event.preventDefault();
    try { await Browser.open({url: anchor.href}); }
    catch { window.alert('Unable to open this link. Check your connection and try again.'); }
  });
}
