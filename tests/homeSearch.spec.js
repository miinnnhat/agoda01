import {test} from '../fixture/fixture.js';
import { expect } from '@playwright/test';
import testData from '../data/testData.json';
import {HomePage} from '../pages/homePage.pom.js';
import { time } from 'node:console';
import {getDate} from '../utils/dateFunction.js';
import { getBookingDates } from '../utils/dateFunction.js';
import { SearchPage } from '../pages/resultPage.pom.js';
import { HotelDetailPage } from '../pages/hotelPage.pom.js';


test.describe("Home Search", ()=>{
    
    // test('Search for a first hotel has price', async ({agodaPage, context }) =>{
        
        
    //     const data = testData[0];

    //     console.log("1. Fill in search input...");
    //     await agodaPage.searchHotel(data.hotelName);
    //     console.log("   Search input filled with: " + data.hotelName);

    //     console.log("2. Calculate dates and select on calendar...");

    //             const targetDates = getBookingDates(data.checkInDate, data.checkOutDate);

        
    //     await agodaPage.selectDates(
    //         targetDates.checkInDate,    
    //         targetDates.checkOutDate,   
    //         targetDates.monthToSearch
    //     );

    //     console.log(`Check-in: ${targetDates.checkInDate}, Check-out: ${targetDates.checkOutDate} selected!`);


    //     console.log("3. Select occupancy options (Rooms, Adults, Children)");
    //     await agodaPage.setOccupancy(data.rooms, data.adults, data.children);


    //     console.log("4. Click search button...");
    //     await agodaPage.searchButton.click();
    //     console.log(" Search button clicked!");



    //     console.log("5.1 Waiting for result loaded and hotel list to be visible");
        
    //     const searchPage = new SearchPage(agodaPage.page);
    //     const newTabPage = await searchPage.selectFirstHotel();
    //     await newTabPage.waitForLoadState('domcontentloaded');

    //     console.log("6. Verifying price on Hotel Detail Page ");
        
        
    //     const detailPage = new HotelDetailPage(newTabPage);
    //     await newTabPage.waitForLoadState('domcontentloaded');
    //     // await newTabPage.waitForLoadState('networkidle');
    //     await newTabPage.evaluate(() => window.scrollBy(0, 500));
        
    //     const isDisplayed = await detailPage.isPriceVisible();
    //     expect(isDisplayed).toBeTruthy();
    //     const price = await detailPage.getPriceText();
    //     console.log(`\n[SUCCESS] Price is ${price}\n`);
    // });

     test('Search for a first hotel ', async ({agodaPage, context }) =>{
        
        
        const data = testData[0];

        console.log("1. Fill in search input...");
        await agodaPage.searchHotel(data.hotelName);
        console.log("   Search input filled with: " + data.hotelName);

        console.log("2. Calculate dates and select on calendar...");

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



        console.log("5.1 Waiting for result loaded and hotel list to be visible");
        
        const searchPage = new SearchPage(agodaPage.page);
        const newTabPage = await searchPage.chooseFirstHotel();
        // await newTabPage.waitForLoadState('domcontentloaded');

        console.log("6. Verifying price on Hotel Detail Page ");
        
        
        const detailPage = new HotelDetailPage(newTabPage);
        // await newTabPage.waitForLoadState('domcontentloaded');
        // await newTabPage.waitForLoadState('networkidle');
        await newTabPage.evaluate(() => window.scrollBy(0, 500));
        
        const isDisplayed = await detailPage.isPriceVisible();
         await expect(isDisplayed).toBeTruthy();
        const price = await detailPage.getPriceText();
        console.log(`\n[SUCCESS] Price is ${price}\n`);
        
    });

});