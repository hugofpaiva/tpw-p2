import {Injectable} from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}
// Based on: https://medium.com/better-programming/angular-load-external-javascript-file-dynamically-3d14dde815cb
export const ScriptStore: Scripts[] = [
  { name: 'jquery', src: '../../../assets/js/jquery-3.3.1.min.js' },
  { name: 'bootstrap', src: '../../../assets/js/bootstrap.min.js' },
  { name: 'jquery-nice-select', src: '../../../assets/js/jquery.nice-select.min.js' },
  { name: 'jquery-nice-scroll', src: '../../../assets/js/jquery.nicescroll.min.js' },
  { name: 'jquery-magnific-popup', src: '../../../assets/js/jquery.magnific-popup.min.js' },
  { name: 'jquery-countdown', src: '../../../assets/js/jquery.countdown.min.js' },
  { name: 'jquery-slicknav', src: '../../../assets/js/jquery.slicknav.js' },
  { name: 'mixitup', src: '../../../assets/js/mixitup.min.js' },
  { name: 'owl-carousel', src: '../../../assets/js/owl.carousel.min.js' },
  { name: 'main', src: '../../../assets/js/main.js' },
];

declare var document: any;

@Injectable()
export class DynamicScriptLoaderService {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadAll() {
    const promises: any[] = [];
    ScriptStore.forEach((script) => promises.push(this.loadScript(script.name)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        // load script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  // IE
          script.onreadystatechange = () => {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              resolve({script: name, loaded: true, status: 'Loaded'});
            }
          };
        } else {  // Others
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({script: name, loaded: true, status: 'Loaded'});
          };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }

}
