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

        // 3. Occupancy Locators 
        this.occupancyBox = page.locator('#occupancy-box');
        
        this.roomsValue = page.locator('[data-selenium="desktop-occ-room-value"]'); 
        this.addRoomsBtn = page.locator('[data-element-name="occupancy-selector-panel-rooms"][data-selenium="plus"]');
        this.minusRoomsBtn = page.locator('[data-element-name="occupancy-selector-panel-rooms"][data-selenium="minus"]');

        this.adultsValue = page.locator('[data-selenium="desktop-occ-adult-value"]');
        this.addAdultsBtn = page.locator('[data-element-name="occupancy-selector-panel-adult"][data-selenium="plus"]');
        this.minusAdultsBtn = page.locator('[data-element-name="occupancy-selector-panel-adult"][data-selenium="minus"]');

        this.childrenValue = page.locator('[data-selenium="desktop-occ-children-value"]');
        this.addChildrenBtn = page.locator('[data-element-name="occupancy-selector-panel-children"][data-selenium="plus"]');
        this.minusChildrenBtn = page.locator('[data-element-name="occupancy-selector-panel-children"][data-selenium="minus"]');



    }



    async searchHotel(hotelName) {
        
        console.log(`Typeing hotel name: ${hotelName}`);
        await this.searchBox.pressSequentially(hotelName, { delay: 100 });
        
        console.log("Waiting for suggestions to appear");
        await this.firstSuggestion.waitFor({ state: 'visible' });
        await this.firstSuggestion.click();
    }
      
    
    
    async selectDates(checkInStr, checkOutStr, targetMonthText) {
    
    //await this.checkInBox.click();
        
        let isMonthFound = false;
        await this.monthCaptions.first().waitFor({ state: 'visible', timeout: 5000 });
        let currentMonthYear = (await this.monthCaptions.first().innerText()).trim();

        if (currentMonthYear == targetMonthText) {
            isMonthFound = true;
            console.log(`Founded: ${currentMonthYear}`);
        } else {
            // CLick Button Previous Month 
            const isLastMonthDisabled = await this.lastMonthBtn.isDisabled();
            if (!isLastMonthDisabled) {
                await this.lastMonthBtn.click();
                currentMonthYear = (await this.monthCaptions.first().innerText()).trim();
                if (currentMonthYear === targetMonthText) {
                    isMonthFound = true;
                }
            }

            
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

        if (!isMonthFound) throw new Error(`Error: Cannot find month ${targetMonthText}!`);

        // Click check in - check out date
        await this.page.locator(`[data-selenium-date="${checkInStr}"]`).click();
        await this.page.waitForTimeout(500);
        await this.page.locator(`[data-selenium-date="${checkOutStr}"]`).click();
        await this.page.waitForTimeout(500);

        // Click outside to close date picker
        await this.page.keyboard.press('Escape');


    }

    
    async _adjustValue(valueLocator, plusBtn, minusBtn, targetValue) {
        
        let currentValue = parseInt(await valueLocator.innerText(), 10);

        while (currentValue !== targetValue) {
            if (currentValue < targetValue) {
                await plusBtn.click();
            } else {
                await minusBtn.click();
            }
            
            
            await this.page.waitForTimeout(300);
            
            
            currentValue = parseInt(await valueLocator.innerText(), 10);
        }

    }

    async setOccupancy(targetRooms, targetAdults, targetChildren) {
        
        
        if (targetRooms < 1 || targetRooms > 30) {
            throw new Error(`[Error] Rooms Must be between 1 and 30. Value provided: ${targetRooms}`);
        }
        if (targetAdults < 1 || targetAdults > 30) {
            throw new Error(`[Error] Adults Must be between 1 and 30. Value provided: ${targetAdults}`);
        }
        if (targetChildren < 0 || targetChildren > 9) {
            throw new Error(`[Error] Children Must be between 0 and 9. Value provided: ${targetChildren}`);
        }

        
        if (targetAdults < targetRooms) {
            throw new Error(`[Error]  (${targetAdults})  (${targetRooms}). Adults must be greater than or equal to Rooms.`);
        }
        // 1. popup occupancy
        //await this.occupancyBox.click();

        // 2. Force adjust Rooms 
        console.log(`[Log] Adjusting Rooms to: ${targetRooms}`);
        await this._adjustValue(this.roomsValue, this.addRoomsBtn, this.minusRoomsBtn, targetRooms);

        // 3.  Then Adult
        console.log(`[Log] Adjusting Adults to: ${targetAdults}`);
        await this._adjustValue(this.adultsValue, this.addAdultsBtn, this.minusAdultsBtn, targetAdults);

        // 4. Last Children 
        console.log(`[Log] Adjusting Children to: ${targetChildren}`);
        await this._adjustValue(this.childrenValue, this.addChildrenBtn, this.minusChildrenBtn, targetChildren);
        
        
    }
}