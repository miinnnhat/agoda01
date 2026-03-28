export class HomePage {
    
    
    constructor(page){
        this.page = page;

        this.searchBox = page.locator('[data-selenium="textInput"]');
        this.searchButton= page.getByRole('button', {name: "/search/i"});

        //Check-in and Check-out date selectors
        this.checkInDateSelector = page.locator('[data-selenium="checkInDate"]');
        this.checkOutDateSelector = page.locator('[data-selenium="checkOutDate"]');


        //Calendar month and year

        //Month Button
        this.nextMonthButton = page.locator('.CalendarMonth_caption');
        this.lastMonthButton = page.locator('.CalendarMonth_caption').nth(-1);

        //Day Button
        this.dayButton = page.locator('.CalendarDay__default');

        //Year Button
        // this.nextYearButton = page.locator('.CalendarMonth_caption');
        // this.lastYearButton = page.locator('.CalendarMonth_caption').nth(-1);


        //Selecting number of guests, rooms, children

        //Adult increase and decrease buttons
        this.adultIncreaseButton = page.getByRole('button', {name: "+"});
        this.adultDecreaseButton = page.getByRole('button', {name: "-"});

        //Room increase and decrease buttons
        this.roomIncreaseButton = page.getByRole('button', {name: "+"}).nth(1);
        this.roomDecreaseButton = page.getByRole('button', {name: "-"}).nth(1);

        //Children increase and decrease buttons
        this.childrenIncreaseButton = page.getByRole('button', {name: "+"}).nth(2);
        this.childrenDecreaseButton = page.getByRole('button', {name: "-"}).nth(2);


    }
}