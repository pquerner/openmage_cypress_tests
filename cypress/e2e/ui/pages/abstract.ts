import ViewportPreset = Cypress.ViewportPreset;

export default class AbstractPageClass {
  private _linkCache = [];

  private _humanReadableSize: string;

  get humanReadableSize(): string {
    return this._humanReadableSize;
  }

  set humanReadableSize(value: string) {
    this._humanReadableSize = value;
  }

  private _currentSize: Array<number> | ViewportPreset = null;
  get currentSize(): any {
    return this._currentSize;
  }

  set currentSize(value: Array<number> | ViewportPreset) {
    this._currentSize = value;
  }

  public readonly DESKTOP_VIEWPORT = [1920, 1080];
  public readonly MOBILE_VIEWPORT = [390, 844];
  public sizes = [
    this.DESKTOP_VIEWPORT, // Default
    this.MOBILE_VIEWPORT,
  ];

  public setViewPort(size: Array<number> | ViewportPreset) {
    this.currentSize = size;
    if (Cypress._.isArray(size)) {
      this.humanReadableSize = size.join('_');
      cy.viewport(size[0], size[1]);
    } else {
      this.humanReadableSize = size;
      cy.viewport(size);
    }
  }

  public assertUrlHttp200(url: string) {
    return;
    const me = this;
    if (typeof this._linkCache[url] === 'boolean') {
      return;
    }
    cy.request({
      url: url,
      failOnStatusCode: false,
    }).as('link');
    cy.get('@link').should((response) => {
      // @ts-ignore
      expect(response.status).to.eq(200);
      me._linkCache[url] = true;
    });
  }

  public checkAllLinks() {
    //TODO this runs always, in different tests, even if it was tested already. save state in memcache?
    return;
    const me = this;
    cy.get('a[href]:not([href^="mailto\\:"]:not([href^="tel\\:"]):not([href^="#"])').each((link) => {
      if (link.prop('href')) {
        // @ts-ignore
        cy.log(link);
        me.assertUrlHttp200(link.prop('href'));
      }
    });
  }
}
