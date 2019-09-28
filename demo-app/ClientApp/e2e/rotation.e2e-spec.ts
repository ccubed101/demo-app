import { browser, by, element } from 'protractor';
import { RotationPage } from './rotation.po';

describe('Rotation page', () => {
	let page: RotationPage;

	beforeEach(() => {
		page = new RotationPage();
	});

	it('should rotate from pane1 1 to panel 2.', () => {
		page.navigateTo();

		element(by.id('panel1Bttn'));
		element(by.id('panel2Bttn'));
		element(by.id('panel3Bttn'));
		
		//expect(page.getPanel2().isDisplayed().then((displayed) => { if (displayed) { console.log('Panel 2 is displayed.'); } });
		//page.getPanel1().isDisplayed().then((displayed) => { if (displayed) { console.log('Panel 1 is displayed.'); } });
		//page.getPanel3().isDisplayed().then((displayed) => { if (displayed) { console.log('Panel 3 is displayed.'); } });



		browser.sleep(2000);
		page.getPanel1Button().click();
		browser.sleep(2000);
		page.getPanel3Button().click();
		browser.sleep(2000);
		page.getPanel2Button().click();
		expect(page.getPanel2()).not.toBe(null);
		browser.sleep(2000);
	});
});
