export class SearchPage {
    constructor(page) {
        
        this.page = page;
        
        this.hotelListContainer = page.locator('li[data-selenium="hotel-item"]'); 
        this.priceLocator = page.locator('[data-selenium="display-price"]');
    }

    async selectFirstHotel() {
        console.log("5.1 Waiting for result loaded and hotel list to be visible");
        await this.hotelListContainer.first().waitFor({ state: 'visible', timeout: 30000 });

        console.log("5.2 Filtering for the first available hotel (has price)");
        const availableHotels = this.hotelListContainer.filter({ has: this.priceLocator });
        const firstAvailableHotel = availableHotels.first();
        
        await firstAvailableHotel.waitFor({ state: 'visible' });

        console.log("5.3 Click at the first hotel and wait for the new tab to open...");
        const [newTabPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            firstAvailableHotel.click()
        ]);
        
        return newTabPage; 
    }

}