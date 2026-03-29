export class HotelDetailPage {
    constructor(page) {
        
        this.page = page; 
        
        this.priceDisplay = page.locator('.StickyNavPrice__priceDetail').first();
    }

    async isPriceVisible() {
        console.log("Waiting for price to be visible on the new tab");
        
        await this.page.bringToFront();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
        await this.page.evaluate(() => window.scrollBy(0, 1500));
        await this.page.waitForTimeout(1500);

        await this.page.evaluate(() => window.scrollBy(0, 1500));
        //await this.page.waitForTimeout(3000);

        await this.priceDisplay.waitFor({ state: 'visible', timeout: 30000 });
        return await this.priceDisplay.isVisible();
    }

    async getPriceText() {
        return await this.priceDisplay.innerText();
    }
}


