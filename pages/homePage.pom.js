export class HomePage {
    
    
    constructor(page){
        this.page = page;
        // Locators

        // 1. Search Box Locators
        this.searchBox = page.locator('[data-selenium="textInput"]');
        // this.searchBox = page.getByRole('combobox');
        this.firstSuggestion = page.locator('[data-testid="topDestinationListItem"]').first();
        this.searchButton = page.getByRole('button', { name: 'SEARCH' });
        

        // 2. Calendar, Date Picker Locators
        this.checkInBox = page.locator('[data-selenium="checkInBox"]');
        this.checkOutBox = page.locator('[data-selenium="checkOutBox"]');

        this.monthCaptions = page.locator('div.DayPicker-Caption.DayPicker-Caption-Wide:visible');
        
        
        this.nextMonthBtn = page.getByRole('button', { name: 'Next Month' });
        this.lastMonthBtn = page.getByRole('button', { name: 'Previous Month' });

        //startDate and endDate in Calendar


        // 3. Occupancy Locators 
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
    async searchHotel(hotelName) {
        
        console.log(`[Log] Tìm tháng: `);

   

        await this.searchBox.pressSequentially(hotelName, { delay: 100 });
        // Chờ suggestion xuất hiện và click
        await this.firstSuggestion.waitFor({ state: 'visible' });
        await this.firstSuggestion.click();
    }
      
    
    
    async selectDates(checkInStr, checkOutStr, targetMonthText) {
    
    //await this.checkInBox.click();
        
        let isMonthFound = false;
        
        // Ép Playwright ĐỢI cái caption đầu tiên thực sự hiện lên màn hình
        await this.monthCaptions.first().waitFor({ state: 'visible', timeout: 5000 });
        let currentMonthYear = (await this.monthCaptions.first().innerText()).trim();

        if (currentMonthYear == targetMonthText) {
            isMonthFound = true;
            console.log(`[Log] Đúng tháng ngay từ đầu: ${currentMonthYear}`);
        } else {
            // Logic Lùi 1 lần
            const isLastMonthDisabled = await this.lastMonthBtn.isDisabled();
            if (!isLastMonthDisabled) {
                await this.lastMonthBtn.click();
                currentMonthYear = (await this.monthCaptions.first().innerText()).trim();
                if (currentMonthYear === targetMonthText) {
                    isMonthFound = true;
                }
            }

            // Logic Tiến tối đa 3 lần
            if (!isMonthFound) {
                for (let i = 0; i < 3; i++) {
                    await this.nextMonthBtn.click();
                    await this.page.waitForTimeout(500);
                    currentMonthYear = (await this.monthCaptions.first().innerText()).trim();
                    if (currentMonthYear === targetMonthText) {
                        isMonthFound = true;
                        break;
                    }
                }
            }
        }

        if (!isMonthFound) throw new Error(`Error: Không tìm thấy tháng ${targetMonthText}!`);

        // Click ngày
        await this.page.locator(`[data-selenium-date="${checkInStr}"]`).click();
        await this.page.waitForTimeout(500);
        await this.page.locator(`[data-selenium-date="${checkOutStr}"]`).click();
        await this.page.waitForTimeout(500);

        // Bấm phím Esc để đóng lịch
        await this.page.keyboard.press('Escape');


}
}