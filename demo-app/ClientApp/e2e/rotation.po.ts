import { browser, by, element } from 'protractor';

export class RotationPage {
	navigateTo() {
		return browser.get('/Animations/Rotation');
	}

	getPanel1Button() {
		return element(by.id('panel1Bttn'));
	}

	getPanel2Button() {
		return element(by.id('panel2Bttn'));
	}

	getPanel3Button() {
		return element(by.id('panel3Bttn'));
	}

	getPanel1() {
		return element(by.id('panel1'));
	}

	getPanel2() {
		return element(by.id('panel2'));
	}

	getPanel3() {
		return element(by.id('panel3'));
	}
}
