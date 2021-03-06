import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { destroyPlatform } from '@angular/core';
import { AppModule } from './app/app.module';

describe('hybrid bootstrap test', () => {
  let element;
  beforeEach(() => {
    destroyPlatform();

    element = document.createElement('app-root'); // TODO change it to match the root component of the AngularJS application
    const content = document.createElement('content');
    element.appendChild(content);
    document.body.appendChild(element);
  });

  afterEach(() => {
    destroyPlatform();
    document.body.removeChild(element);
  });

  it('should work', async done => {
    await platformBrowserDynamic().bootstrapModule(AppModule);
    expect(element.innerText).toContain('Expected Value');
    done();
  });
});
