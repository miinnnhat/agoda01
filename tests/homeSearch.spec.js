import {test} from '../fixture/fixture.js';
import { expect } from '@playwright/test';
import testData from '../data/testData.json';
import {HomePage} from '../pages/homePage.pom.js';
import { time } from 'node:console';
import {getDate} from '../utils/dateFunction.js';
import { getBookingDates } from '../utils/dateFunction.js';


test.describe("Home Search", ()=>{
    
    test(' 01 Search functionality', async ({agodaPage}) =>{
        
             //fill input
        await agodaPage.locator('[data-selenium="textInput"]').pressSequentially(testData[0].hotelName, {delay: 100});

        //handle popup auto complelte
        // await agodaPage.waitForSelector('[data-selenium="autoCompleteItem"]', {state: 'visible'})
        await agodaPage.locator('[data-testid="topDestinationListItem"]').first().click(); //click first item
        
        // const searchInput = agodaPage.locator('[data-selenium="textInput"]');
        // await searchInput.click();
        
        
        console.log(" done click outside to close the autocomplete popup");
        
        //search
        await agodaPage.locator('[data-selenium="search-button"]').click();

        

    
    });
   
    test(' 02 Date picker ', async ({agodaPage}) =>{
        
        //opening date check in picker
        await agodaPage.checkInBox.click()
        
                        
        //Validate check in date is true
        const today = new Date();
        const todayMonthYear = today.toLocaleString('default', { month: 'long', year: 'numeric' });
        const todayDate = today.getDate();
        while(true){
            
            const currentMonthYear = (await agodaPage.locator('div.DayPicker-Caption').first().textContent())?.trim();
            if(currentMonthYear == todayMonthYear){
                break;
            }

            //Verify last month first
            await agodaPage.getByRole('button', { name: 'Previous Month' }).click()  //last month button
                    
            
            const startDate = '2026-03-29';
            const endDate = '2026-03-30';
            await agodaPage.locator(`[data-selenium-date="${startDate}"]`).click();
            await agodaPage.locator(`[data-selenium-date="${endDate}"]`).click();

            await agodaPage.mouse.click(10, 10);

            await agodaPage.waitForTimeout(2000)

            //Verify next month
            await agodaPage.getByRole('button', { name: 'Next Month' }).click()  //next month button
            await agodaPage.waitForTimeout(3000)

            await agodaPage.mouse.click(10, 10);

        }



        //opening date check out picker
        await agodaPage.click('[data-selenium="checkOutBox"]')

        await agodaPage.waitForTimeout(2000)


    });

    test('03 Occupancy selector', async ({agodaPage}) =>{
       
        //Opening occupancy box
        await agodaPage.locator('#occupancy-box').click() //if needed
        // await agodaPage.waitForTimeout(3000)
        console.log("1.  Popup opened!");

        //const occupancyPopup = agodaPage.locator('[data-selenium="occupancyPicker"]');
        //await expect (occupancyPopup).toBeVisible() 

        //Rooms selection
        console.log("2. Test Rooms Button (Rooms)...");
        await agodaPage.locator('[data-element-name="occupancy-selector-panel-rooms"][data-selenium="plus"]').click();
        await agodaPage.waitForTimeout(3000)
        await agodaPage.locator('[data-element-name="occupancy-selector-panel-rooms"][data-selenium="minus"]').click();


        //Adults selection
        console.log("4. Test nút Người lớn (Adults)...");
        await agodaPage.locator('[data-element-name="occupancy-selector-panel-adult"][data-selenium="plus"]').click();
        await agodaPage.waitForTimeout(3000)
        await agodaPage.locator('[data-element-name="occupancy-selector-panel-adult"][data-selenium="minus"]').click();   

        //Children selection 
        console.log("5. Test nút Trẻ em (Children)...");   
        await agodaPage.locator('[data-element-name="occupancy-selector-panel-children"][data-selenium="plus"]').click();
        await agodaPage.waitForTimeout(3000)
        await agodaPage.locator('[data-element-name="occupancy-selector-panel-children"][data-selenium="minus"]').click();

    })

    test('04 Connect all feature', async ({agodaPage, context}) =>{
        
        
        const data = testData[0];

        console.log("1. Fill in search input...");
        await agodaPage.searchHotel(data.hotelName);
        console.log("   Search input filled with: " + data.hotelName);

        console.log("2. Calculate dates and select on calendar...");

        // Lấy data từ Utils
        const targetDates = getBookingDates(data.checkInDate, data.checkOutDate);

        
        await agodaPage.selectDates(
            targetDates.checkInDate,    
            targetDates.checkOutDate,   
            targetDates.monthToSearch
        );

        console.log(`Check-in: ${targetDates.checkInDate}, Check-out: ${targetDates.checkOutDate} selected!`);


        console.log("3. Select occupancy options (Rooms, Adults, Children)");
        await agodaPage.setOccupancy(data.rooms, data.adults, data.children);


        console.log("4. Click search button...");
        await agodaPage.searchButton.click();
        console.log(" Search button clicked!");



        console.log("5. Waiting for search results ");
        
        

    })

});