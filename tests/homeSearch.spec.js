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
        await agodaPage.click('[data-selenium="checkInBox"]')
        
                        
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

    test('04 Connect all feature', async ({agodaPage}) =>{
        
        console.log("1. Fill in search input...");
        // await agodaPage.searchBox.pressSequentially(testData[0].hotelName, {delay: 100});
        await agodaPage.searchHotel(testData[0].hotelName);
        console.log("   Search input filled with: " + testData[0].hotelName);
        console.log("   First suggestion clicked: " + testData[0].hotelName);



        console.log("2. Select check-in and check-out dates ");

        await agodaPage.checkInBox.click();
        const data = testData[0];
        await agodaPage.selectDates(data.checkInDate, data.checkOutDate, data.targetMonthYear);
        console.log(`   Check-in date: ${data.checkInDate} and Check-out date: ${data.checkOutDate} selected!`);







        console.log("3. Select occupancy options");




        console.log("4. Click search button ");
        await agodaPage.searchButton.click();

        

    // --- BƯỚC 5: BẮT LẤY KHÁCH SẠN ĐẦU TIÊN TRONG LIST ---
    console.log("5. Đang chờ danh sách kết quả hiển thị...");
    
    // Locator bắt toàn bộ list khách sạn, và dùng .first() để chỉ lấy thằng trên cùng
    const firstHotel = agodaPage.page.locator('[data-selenium="hotel-item"]').first();
    
    // Chờ cho khách sạn đầu tiên thực sự hiện lên màn hình (Auto-wait 15s)
    await firstHotel.waitFor({ state: 'visible', timeout: 15000 });


    // --- BƯỚC 6: EXPECT GIÁ TIỀN CỦA THẰNG ĐẦU TIÊN ---
    console.log("6. Đang kiểm tra giá tiền của khách sạn này...");

    // Thêm .first() vào cuối để bảo Playwright: "Nếu thấy nhiều giá, cứ lấy cái đầu tiên cho tôi"
    const priceElement = firstHotel.locator('span[data-selenium="display-price"]').first();

    // 1. Xác nhận (Expect) cục giá tiền phải xuất hiện trên giao diện
    await expect(priceElement).toBeVisible();

    // 2. Lấy text ra, xoá hết chữ, chỉ giữ lại số để kiểm tra nó lớn hơn 0
    const priceText = await priceElement.textContent();
    const priceNumber = parseInt(priceText.replace(/[^0-9]/g, ''), 10);
    
    expect(priceNumber).toBeGreaterThan(0);
    console.log(`[Thành công] Khách sạn đầu tiên có giá hiển thị là: ${priceText}`);

    // --- BƯỚC 7: CLICK CHỌN (ĐỂ ĐÁP ỨNG ĐÚNG ĐỀ BÀI) ---
    // Đề bài có câu "choose the first available option", nên mình click vào nó 1 cái cho đúng thủ tục
    console.log("7. Click chọn khách sạn đầu tiên...");
    await firstHotel.click();
        

        console.log("   Search button clicked!");

        console.log("5. Verify search results ");

        console.log("   Search results verified!");
        


     

    
    
    });

});