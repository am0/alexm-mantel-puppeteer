const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function getScreenshot(url, type, quality, fullPage) {
	const browser = await puppeteer.launch({
		args: chrome.args,
		executablePath: await chrome.executablePath,
		headless: chrome.headless,
	});

	const page = await browser.newPage();
	await page.setViewport({
		width: 1440,
		height: 0
	});
	await page.goto(url, {
		waitUntil: [
			'domcontentloaded',
			'load',
		  ],
	});
	const file = await page.screenshot({ type, quality, fullPage });
	await browser.close();
	return file;
}

module.exports = { getScreenshot };
