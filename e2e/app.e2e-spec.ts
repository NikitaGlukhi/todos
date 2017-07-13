import { NgRXPage } from './app.po';

describe('ng-rx App', () => {
  let page: NgRXPage;

  beforeEach(() => {
    page = new NgRXPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
