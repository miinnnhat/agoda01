export class HotelDetailPage {
    constructor(page) {
        
        this.page = page; 
        
        this.priceDisplay = page.locator('.StickyNavPrice__priceDetail').first();
    }

    async isPriceVisible() {
        console.log("6.1 Waiting for price to be visible on the new tab");
       
        await this.page.mouse.wheel(0, 1000);
        await this.page.waitForTimeout(1000);

        await this.priceDisplay.waitFor({ state: 'visible', timeout: 30000 });
        return await this.priceDisplay.isVisible();
    }

    async getPriceText() {
        return await this.priceDisplay.innerText();
    }
}
