import {test, expect} from '@playwright/test';
import testData from '../data/testData.json';
import {HomePage} from '../pages/homePage.pom.js';


test.describe("Home Search", ()=>{
    
    test(' 01 Search functionality', async ({page}) =>{
        
        await page.goto("https://www.agoda.com/");
        //fill input
        await page.locator('[data-selenium="textInput"]').pressSequentially(testData[0].hotelName);
                

    
    });
   
    test(' 02 Date picker functionality', async ({page}) =>{
        await page.goto("https://www.agoda.com/");

        //opening date picker
        await page.click('[data-selenium="checkInBox"]') 

      
    })

})