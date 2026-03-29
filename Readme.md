# Playwright Amaris Test Automation - Dang Minh Nhat

This repository contains an automated test project built with **Playwright** using **JavaScript**, created as part of a technical test for the **QA Automation** position at **Amaris Consulting**.

The main purpose of this project is to automate the end-to-end flow of searching for a hotel on [Agoda](https://www.agoda.com/), applying dynamic data and selecting the first available option to verify its price.

##  Key Features Demonstrated
- **Page Object Model (POM):** Clean separation of UI locators/actions and test scripts.
- **BDD-Style Approach:** Tests are structured clearly with Given/When/Then logical steps.
- **Data-Driven Testing:** Test data (hotel name, dates, occupancy) is extracted into JSON files for scalability.
- **Dynamic Elements Handling:** Handled complex UI scenarios like auto-adjusting occupancies, hidden sticky navigation bars, and cross-tab web interactions.

---

## Tech Stack

- **Engine:** [Node.js](https://nodejs.org/)
- **Framework:** [Playwright](https://playwright.dev/)
- **Language:** JavaScript
- **CI/CD:** GitHub Actions (ready setup)

---

## Project Structure

```text
📦 agoda01
 ┣ 📂 data           # Contains JSON files for Data-Driven Testing
 ┣ 📂 feature        # Contains BDD feature descriptions (if any)
 ┣ 📂 fixture        # Custom Playwright fixtures for page initialization
 ┣ 📂 pages          # Page Object Models (HomePage, SearchPage, HotelDetailPage)
 ┣ 📂 tests          # Main execution test scripts (spec.js files)
 ┣ 📂 utils          # Helper functions (e.g., dynamic date calculator)
 ┣ 📜 playwright.config.js # Global Playwright configuration
 ┗ 📜 package.json   # Project dependencies and script
```
---
## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)

---

#  Installation & Setup

1. **Clone the repository:**
```bash
   git clone [https://github.com/miinnnhat/agoda01.git](https://github.com/miinnnhat/agoda01.git)
   
```
```bash
cd agoda01
```
2. **Install project dependencies:

```bash
npm install
```

3. Install Playwright Browsers:
```bash
npx playwright install
```
---
# Running Tests
You can execute the automated tests using the commands below.

Run all tests in headless mode (default):

```Bash
npx playwright test
```
Run tests in headed mode (opens the browser UI):

```Bash
npx playwright test --headed
```
Run tests using the Playwright UI mode (highly recommended for debugging):

```Bash
npx playwright test --ui
```
Run a specific test file:

```Bash
npx playwright test tests/homeSearch.spec.js
```

# Viewing Reports
After execution, Playwright automatically generates an HTML report. To view this report in your browser, run:

```Bash
npx playwright show-report
```

# Test Scenario Coverage
**The current project covers the following core workflow:**

1. Navigate to the Agoda homepage.

2. Input the target hotel name (data driven via JSON).

3. Calculate and select Check-in / Check-out dates dynamically (Current Date + offset defined in JSON).

4. Configure the number of Rooms, Adults, and Children.

5. Execute the search and select the first valid result that displays a price.

6. Verify that the price value is successfully displayed on the new hotel detail tab.