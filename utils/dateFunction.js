export function getBookingDates( startDate, endDate ) {
    //milestone 2: Validate input

    //Interger Gateway
    if (!Number.isInteger(startDate) || !Number.isInteger(endDate)) {
        throw new Error("Validation Error: startDate and endDate MUST BE Integer");
    }

    // Negative Gateway
    if (startDate < 0 || endDate < 0) {
        throw new Error("Validation Error: startDate and endDate MUST BE Non-negative");
    }

    // Logical Gateway
    if (startDate >= endDate) {
        throw new Error(`Validation Error: startDate (${startDate}) MUST BE Less Than endDate (${endDate})`);
    }


    //milestone 2: Get all type of date
    const  today = new Date();

    //Get Check-in date (current date + startDate(2))
    const checkIn = new Date(today);
    checkIn.setDate(today.getDate() + startDate);

    //Get Check-out date (current date + endDate(3))
    const checkOut = new Date(today);
    checkOut.setDate(today.getDate() + endDate);

    // Get format Date 'YYYY-MM-DD'
    const formatDate = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    //Get Target Month Year
    const targetMonthYear = checkIn.toLocaleString('default', { month: 'long', year: 'numeric' });

    return {
        checkInDate: formatDate(checkIn),       // VD: "2026-03-30"
        checkOutDate: formatDate(checkOut),     // VD: "2026-03-31"
        monthToSearch: targetMonthYear          // VD: "March 2026"
    };
}

export async function selectDate(page, checkInDateStr, checkOutDateStr, targetMonthYear) {
    if (!page) throw new Error('selectDate requires a playwright Page instance');
    if (!checkInDateStr || !checkOutDateStr || !targetMonthYear) {
        throw new Error('selectDate requires checkInDateStr, checkOutDateStr and targetMonthYear');
    }

    const checkInBox = page.locator('[data-selenium="checkInBox"]');
    const monthCaptions = page.locator('.DayPicker-Caption');
    const nextMonthBtn = page.getByRole('button', { name: 'Next Month' });
    const lastMonthBtn = page.getByRole('button', { name: 'Previous Month' });

    await checkInBox.click();

    let maxRetries = 12;
    let isFound = false;

    const targetDateObj = new Date(`1 ${targetMonthYear}`);

    while (maxRetries > 0) {
        const visibleMonths = await monthCaptions.allTextContents();
        const cleanMonths = visibleMonths.map(m => m.trim());

        if (cleanMonths.includes(targetMonthYear)) {
            isFound = true;
            break;
        }

        const firstVisibleMonthObj = new Date(`1 ${cleanMonths[0]}`);

        if (targetDateObj < firstVisibleMonthObj) {
            if (await lastMonthBtn.isDisabled()) {
                throw new Error(`Cannot click Previous Month to reach ${targetMonthYear}.`);
            }
            await lastMonthBtn.click();
        } else {
            await nextMonthBtn.click();
        }

        await page.waitForTimeout(400);
        maxRetries -= 1;
    }

    if (!isFound) {
        throw new Error(`Cannot find calendar month ${targetMonthYear} after ${maxRetries} attempts`);
    }

    await page.locator(`[data-selenium-date="${checkInDateStr}"]`).click();
    await page.locator(`[data-selenium-date="${checkOutDateStr}"]`).click();

    await page.mouse.click(10, 10);
}

export default { getBookingDates, selectDate };