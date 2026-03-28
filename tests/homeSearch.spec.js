import {test, expect} from '../fixture/fixture.js';
import testData from '../data/testData.json';
import {HomePage} from '../pages/homePage.pom.js';
import { time } from 'node:console';
import {getDate} from '../utils/dateFunction.js';


test.describe("Home Search", ()=>{
    
    test(' 01 Search functionality', async ({agodaPage}) =>{
        
             //fill input
        await agodaPage.locator('[data-selenium="textInput"]').pressSequentially(testData[0].hotelName, {delay: 100});

        //handle popup auto complelte
        await agodaPage.waitForSelector('[data-selenium="autoCompleteItem"]', {state: 'visible'})
        await agodaPage.click('[data-selenium="autoCompleteItem"]') //click first item

        //click fist options
                

    
    });
   
    test(' 02 Date picker ', async ({agodaPage}) =>{
        // await agodaPage.goto("https://www.agoda.com/");

        //opening date check in picker
        await agodaPage.click('[data-selenium="checkInBox"]')
        
                //await agodaPage.waitForTimeout(2000)
        
        //Validate check in date is true
        const today = new Date();
        const todayMonthYear = today.toLocaleString('default', { month: 'long', year: 'numeric' });
        const todayDate = today.getDate();
        while(true){
            
            const currentMonthYear = (await agodaPage.locator('div.DayPicker-Caption').first().textContent())?.trim();
            // const currentMonthYear = await agodaPage.locator('DayPicker-Caption').textContent();
            if(currentMonthYear == todayMonthYear){
                break;
            }

            //Verify last month first
            await agodaPage.getByRole('button', { name: 'Previous Month' }).click()  //last month button
                        //await agodaPage.waitForTimeout(2000)

            // Bạn định nghĩa ngày muốn chọn theo đúng format của thuộc tính
            const startDate = '2026-03-29';
            const endDate = '2026-03-30';

            // Playwright sẽ tìm thẳng thẻ span có chứa data-selenium-date tương ứng và click
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
        // await agodaPage.goto("https://www.agoda.com/");

        //Opening occupancy selector
        await page.click('[data-selenium="occupancy-box"]') //if needed 
    })

})