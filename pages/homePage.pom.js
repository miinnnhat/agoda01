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

        this.monthCaptions = page.locator('.DayPicker-Caption');
        
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
        
        await this.searchBox.pressSequentially(hotelName, { delay: 100 });
        // Chờ suggestion xuất hiện và click
        await this.firstSuggestion.waitFor({ state: 'visible' });
        await this.firstSuggestion.click();
    }
      
    
    async selectDates(startDays, endDays) {
        // --- Step 1: Validate input ---
        if (!Number.isInteger(startDays) || !Number.isInteger(endDays)) {
            throw new Error("Error: Input must be integers!");
        }
        if (startDays < 0 || endDays < 0) {
            throw new Error("Error: Days cannot be negative!");
        }
        if (startDays >= endDays) {
            throw new Error(`Error: Check-in date (${startDays}) must be before check-out date (${endDays})!`);
        }

        // --- Step 2: Calculate Dates ---
        const today = new Date();

    // Format date to 'YYYY-MM-DD'
    const formatDate = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    //Get Check-in date (current date + startDays)
    const checkInDate = new Date(today);
    checkInDate.setDate(today.getDate() + startDays);
    const checkInStr = formatDate(checkInDate); 
    
    // Get Target Month Year 
    const targetMonthText = checkInDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });

    // Get Check-out date (current date + endDays)
    const checkOutDate = new Date(today);
    checkOutDate.setDate(today.getDate() + endDays);
    const checkOutStr = formatDate(checkOutDate); 

    console.log(`[Log] Target (Fixxed): Check-in ${checkInStr}, Check-out ${checkOutStr}, Value: ${targetMonthText}`);

        // --- Step 3: Open Calendar Popup ---
        await this.checkInBox.click();
        await this.page.waitForTimeout(1000);

        // --- Step 4: Loop to Find the Month 
        let retries = 12; 
        while (retries > 0) {
            
            const currentMonthYear = (await this.monthCaptions.first().textContent())?.trim();
            
            if (currentMonthYear == targetMonthText) {
                console.log(`Correct  ${currentMonthYear}`);
                break; 
            }

            
            await this.lastMonthBtn.click();
            await this.page.waitForTimeout(500);
            retries--;
        }

        if (retries == 0) throw new Error("Error: Could not find the target month in calendar!");

        // --- Step 5: Select Check-in and Check-out Dates ---
        await this.page.locator(`[data-selenium-date="${checkInStr}"]`).click();
        await this.page.waitForTimeout(500);
        
        await this.page.locator(`[data-selenium-date="${checkOutStr}"]`).click();
        await this.page.waitForTimeout(500);

        // Click outside to close calendar popup
        await this.page.mouse.click(10, 10);
        console.log(`[Log] Dates selected: Check-in ${checkInStr}, Check-out ${checkOutStr}`);
    }
}