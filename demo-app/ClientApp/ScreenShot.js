// This JavaScript file is required to get a .png image of the demo-app splash page.
//
// The original approach was to execute the following command in the container:
//   "C:\Program Files (x86)\Google\Chrome\Application\chrome" --headless --disable-gpu --window-size=1200,1000 --screenshot=D:\output.png https://localhost:443/
// But this approach did not work.  The result was a blank white image.  Apparently
// the screen shot was of the web page before Angular was able to render the page.
// (Note that this was the case even thought demo-app implements server side rendering.)
// This script uses Puppeteer to control headless Chrome such that the screen shot is 
// not made until after the <splash> element has been rendered on the page.

const puppeteer = require('puppeteer');

(async () => {

    console.log("Launch Puppeteer.")

    var browser;
    try {
        browser = await puppeteer.launch({
            defaultViewport: {
                width: 1200,
                height: 1000
            },
            // Need this flag to avoid getting the following error when script is executed:
            //   Error: net::ERR_CERT_AUTHORITY_INVALID at https://localhost:443
            // This error occurs even if the certificate used for HTTPS is added to the
            // certificate store in the Windows OS in the Docker container.
            ignoreHTTPSErrors: true
        });
    }
    catch (error) {
        console.log("=> catch");
        console.log(error);
        console.log("<= catch");
    }
    finally {
        console.log("=> finally.");
        console.log(browser);
        console.log("<= finally.");
    }
	
	try {

		// Setup a timeout to manage any unexpected situation where the app does not terminate.
		setTimeout((function() {
			console.log("Max timeout reached for screen shot.  Application is exited.");
			return process.exit(-2);
		}), 60000);

		console.log("await browser.newPage();");
        const page = await browser.newPage();
		
        //console.log("await page.goto('https://foxnews.com');");
		//await page.goto('https://foxnews.com');
		
        console.log("await page.goto('https://localhost:443');");
        await page.goto('https://localhost:443');
	
			
		// Wait for the <splash> element to be rendered.
		console.log("await page.waitForSelector('splash', { timeout: 3000 });");
		await page.waitForSelector('splash', { timeout: 3000 });

		//const body = await page.evaluate(() => {
		//  return document.querySelector('body').innerHTML;
		//});

		// Perform process to get screen shot.
		console.log("await page.screenshot({ path: 'output.png' });");
		await page.screenshot({ path: 'output.png' });

        console.log("await browser.close();");
        await browser.close();

        console.log("return process.exit(0);");
        return process.exit(0);
		
	} catch (error) {

		console.log("In catch block:");
		console.log(error);
		await browser.close();
		
		// Re-throwing the error here does not cause the process to terminate.  The app just hangs.  So instead...
		//throw error;
		
		// ...use the following to terminate the app.
		return process.exit(-1);
	}
	
})();
