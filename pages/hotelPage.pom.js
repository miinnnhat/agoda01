export class HotelPage {
    
    constructor(page) {
        this.page = page;
        // Locator price display
        this.priceDisplay = page.locator('[data-selenium="price-label"]').first();
    }

    async getPriceLocator() {
        return this.priceDisplay;
    }
}
