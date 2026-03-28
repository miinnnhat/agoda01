export class HomePage {
    
    
    constructor(page){
        this.page = page;
        // Locators

        // 1. Search Box Locators
        this.searchBox = page.locator('[data-selenium="textInput"]');
        // this.searchBox = page.getByRole('combobox');
        this.firstSuggestion = page.locator('[data-testid="topDestinationListItem"]').first();
        this.searchButton = page.locator('[data-selenium="search-button"]');

        // 2. Calendar, Date Picker Locators
        this.checkInBox = page.locator('[data-selenium="checkInBox"]');
        this.checkOutBox = page.locator('[data-selenium="checkOutBox"]');

        this.monthCaptions = page.locator('.DayPicker-Caption');
        
        this.nextMonthBtn = page.getByRole('button', { name: 'Next Month' });
        this.lastMonthBtn = page.getByRole('button', { name: 'Previous Month' });

        //startDate and endDate in Calendar


        // 3. Occupancy Locators (Dùng data-element-name từ spec của bạn, rất chắc chắn!)
        this.occupancyBox = page.locator('#occupancy-box');
        
        this.roomsValue = page.locator('[data-selenium="desktop-occ-room-value"] .value'); // Cần update selector .value theo thực tế
        this.addRoomsBtn = page.locator('[data-element-name="occupancy-selector-panel-rooms"][data-selenium="plus"]');
        this.minusRoomsBtn = page.locator('[data-element-name="occupancy-selector-panel-rooms"][data-selenium="minus"]');

        this.adultsValue = page.locator('[data-selenium="desktop-occ-adult-value"] .value');
        this.addAdultsBtn = page.locator('[data-element-name="occupancy-selector-panel-adult"][data-selenium="plus"]');
        this.minusAdultsBtn = page.locator('[data-element-name="occupancy-selector-panel-adult"][data-selenium="minus"]');

        this.childrenValue = page.locator('[data-selenium="desktop-occ-children-value"] .value');
        this.addChildrenBtn = page.locator('[data-element-name="occupancy-selector-panel-children"][data-selenium="plus"]');
        this.minusChildrenBtn = page.locator('[data-element-name="occupancy-selector-panel-children"][data-selenium="minus"]');



    }
}