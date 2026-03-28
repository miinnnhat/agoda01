import {test, expect} from '@playwright/test';
import testData from '../data/testData.json';
import {HomePage} from '../pages/homePage.pom.js';
import { time } from 'node:console';
import {getDate} from '../utils/dateFunction.js';


test.describe("Home Search", ()=>{
    
    test(' 01 Search functionality', async ({page}) =>{
        
        await page.goto("https://www.agoda.com/");
        //fill input
        await page.locator('[data-selenium="textInput"]').pressSequentially(testData[0].hotelName, {delay: 100});

        //handle popup auto complelte
        await page.waitForSelector('[data-selenium="autoCompleteItem"]', {state: 'visible'})
        await page.click('[data-selenium="autoCompleteItem"]') //click first item

        //click fist options
                

    
    });
   
    test(' 02 Date picker ', async ({page}) =>{
        await page.goto("https://www.agoda.com/");

        //opening date check in picker
        await page.click('[data-selenium="checkInBox"]')
        
        await page.waitForTimeout(3000)
        
        //Validate check in date is true
        const today = new Date();
        const todayMonthYear = today.toLocaleString('default', { month: 'long', year: 'numeric' });
        const todayDate = today.getDate();
        while(true){
            
            const currentMonthYear = (await page.locator('div.DayPicker-Caption').first().textContent())?.trim();
            // const currentMonthYear = await page.locator('DayPicker-Caption').textContent();
            if(currentMonthYear == todayMonthYear){
                break;
            }

            //Verify last month first
            await page.getByRole('button', { name: 'Previous Month' }).click()  //last month button
            await page.waitForTimeout(3000)

            // Bạn định nghĩa ngày muốn chọn theo đúng format của thuộc tính
            const startDate = '2026-03-29';
            const endDate = '2026-03-30';

            // Playwright sẽ tìm thẳng thẻ span có chứa data-selenium-date tương ứng và click
            await page.locator(`[data-selenium-date="${startDate}"]`).click();
            await page.locator(`[data-selenium-date="${endDate}"]`).click();

            await page.mouse.click(10, 10);

            await page.waitForTimeout(2000)

            //Verify next month
            await page.getByRole('button', { name: 'Next Month' }).click()  //next month button
            await page.waitForTimeout(3000)

            await page.mouse.click(10, 10);

        }



        //opening date check out picker
        await page.click('[data-selenium="checkOutBox"]')

        await page.waitForTimeout(2000)


    });

    test('03 Occupancy selector', async ({page}) =>{
        await page.goto("https://www.agoda.com/");

        //Opening occupancy selector
        await page.click('[data-selenium="occupancy-box"]') //if needed 
    })

})