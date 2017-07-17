import { PomosyncPage } from './app.po';

describe('pomosync App', () => {
  let page: PomosyncPage;

  beforeEach(() => {
    page = new PomosyncPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
