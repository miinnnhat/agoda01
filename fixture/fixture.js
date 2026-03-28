const base = require('@playwright/test');
import {HomePage} from '../pages/homePage.pom.js';

const test = base.test.extend({
    agodaUrl: ['https://www.agoda.com/', { option: true }],

    agodaPage: async ({ page, agodaUrl }, use) => {
        console.log(`Open Agoda: ${agodaUrl}`);
        await page.goto(agodaUrl);
    
        const homePage = new HomePage(page);


    // await page.waitForLoadState('networkidle');
    await use(homePage);
        
    }
});

export { test, base };

