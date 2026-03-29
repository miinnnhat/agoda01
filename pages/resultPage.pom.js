export class SearchPage {
    constructor(page) {
        
        this.page = page;
        
        //Grid/List view
        this.hotelListContainer = page.locator('li[data-selenium="hotel-item"]'); 
        this.firstAvailableHotel = page.locator('[data-element-name="property-card-content"][data-element-index="0"]').first();
    }

    async selectFirstHotel() {
        
        //wait for result loaded and hotel list to be visible
        await this.hotelListContainer.waitFor({ state: 'visible' });

        // Click at the first hotel and wait for the new tab to open
        const [newTabPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.firstAvailableHotel.click()
        ]);
        
        
        return newTabPage; 
    }
}