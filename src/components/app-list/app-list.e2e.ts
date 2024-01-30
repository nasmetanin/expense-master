import { newE2EPage } from '@stencil/core/testing';

describe('app-list', () => {
  it('should be visible', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-list></app-list>');

    const element = await page.find('app-list');
    expect(element).not.toBeNull();
  });
});
