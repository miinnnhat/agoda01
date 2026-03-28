const base = require('@playwright/test');

const test = base.test.extend({

    agodaUrl: ['https://www.agoda.com/', { option: true }],

    agodaPage: async ({ page, agodaUrl }, use) => {
    
    console.log(`Open Agoda: ${agodaUrl}`);
    await page.goto(agodaUrl);
    
    // await page.waitForLoadState('networkidle');
    await use(page);
        
    }
});

export { test, base };

