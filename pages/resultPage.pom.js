export class SearchPage {
    constructor(page) {
        
        this.page = page;
        
        this.hotelListContainer = page.locator('li[data-selenium="hotel-item"]'); 
        this.priceLocator = page.locator('[data-selenium="display-price"]');

        //backup
        this.firstHotelLocator = page.locator('.a7de9-box.a7de9-fill-inherit.a7de9-text-inherit.a7de9-h-full.a7de9-items-end');
    }

    async selectFirstHotel() {
        
        await this.hotelListContainer.first().waitFor({ state: 'visible', timeout: 30000 });

        console.log("5.2 Filtering for the first available hotel (has price)");
        const availableHotels = this.hotelListContainer.filter({ has: this.priceLocator }).first();
        await this.page.waitForTimeout(2000);
        const firstAvailableHotel = availableHotels.first();
        
        await firstAvailableHotel.waitFor({ state: 'visible' });

        console.log("5.3 Click at the first hotel and wait for the new tab to open...");
        const [newTabPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            firstAvailableHotel.click()
        ]);
        
        return newTabPage; 
    }
    
    async chooseFirstHotel(){
         await this.page.locator('.SearchboxBackdrop').click();
        const firstHotelCard = this.hotelListContainer.first();
        await firstHotelCard.waitFor({ state: 'visible', timeout: 30000 });
        
        console.log("5.2 Click exactly at the hotel name .");

       const firstHotelLink = firstHotelCard.locator('[data-testid="property-name-link"]');

  
        const [newTabPage] = await Promise.all([
            this.page.context().waitForEvent('page'), 
            firstHotelLink.click()                 
        ]);
        
      
        return newTabPage;
    }

}