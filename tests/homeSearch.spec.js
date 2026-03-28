import {test} from '../fixture/fixture.js';
import { expect } from '@playwright/test';
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

    test('04 Occupancy selector', async ({agodaPage}) =>{
       
    console.log("BƯỚC 1: Click mở cái khung Occupancy Box...");
    await agodaPage.locator('#occupancy-box').click();

    console.log("BƯỚC 2: Chờ cái Popup thực sự nhảy ra...");
    // Dùng waitForSelector để ép Playwright phải thấy cái popup rồi mới đi tiếp
    await agodaPage.waitForSelector('[data-element-name="occupancy-selector-panel"]', { state: 'visible', timeout: 5000 });
    console.log("-> Popup ĐÃ MỞ!");

    console.log("BƯỚC 3: Bắt đầu đi tìm nút Cộng (Thêm) Phòng...");
    // Đổi data-selenium="minus" thành "plus"
    const plusBtn = agodaPage.locator('[data-element-name="occupancy-selector-panel-rooms"][data-selenium="plus"]').first();

    // Kiểm tra sức khỏe của cái nút trước khi bấm
    const isVisible = await plusBtn.isVisible();
    const isDisabled = await plusBtn.isDisabled();
    
    console.log(`-> Nút cộng đang hiển thị (Visible)? : ${isVisible}`);
    console.log(`-> Nút cộng bị khóa (Disabled)? : ${isDisabled}`);

    console.log("BƯỚC 4: Bắt đầu Click...");
    if (!isDisabled && isVisible) {
        // Thêm { force: true } để bỏ qua các lớp overlay cản trở (nếu có)
        await plusBtn.click({ force: true }); 
        console.log("✅ ĐÃ CLICK CỘNG PHÒNG THÀNH CÔNG!");
    } else {
        console.log("❌ NÚT ĐANG BỊ LỖI HIỂN THỊ HOẶC BỊ KHÓA (Có thể đã đạt số phòng tối đa), KHÔNG THỂ CLICK!");
    }
    })

})