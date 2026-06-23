# PlaywrightPlayground

A comprehensive end-to-end testing automation framework built with Playwright using the Page Object Model (POM) pattern. This project demonstrates modern testing best practices, including structured logging, configuration management, and reusable test utilities.

**Application Under Test:** [Sauce Demo](https://www.saucedemo.com/)

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Architecture](#architecture)
- [Page Object Model](#page-object-model)
- [Test Data Management](#test-data-management)
- [Utilities](#utilities)
- [Logging](#logging)
- [Best Practices](#best-practices)
- [CI/CD Integration](#cicd-integration)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all tests
npm run test

# Run tests in specific browser
npm run test:firefox

# Run specific test file
npx playwright test tests/login.spec.ts

# Run tests in headed mode (see browser)
npx playwright test --headed

# Open test report
npx playwright show-report
```

---

## 📁 Project Structure

```
PlaywrightPlayground/
├── config/                      # Configuration management
│   └── testConfig.ts           # Environment-specific configs
├── data/                        # Test data
│   ├── testData.ts             # Test user credentials
│   └── builders/               # Data builders
│       └── userBuilder.ts      # User builder pattern
├── fixtures/                    # Playwright fixtures
│   └── testFixtures.ts         # Custom test fixtures
├── pages/                       # Page Object Models
│   ├── basePage.ts             # Base page class
│   ├── loginPage.ts            # Login page object
│   ├── catalogPage.ts          # Catalog page object
│   ├── productDescriptionPage/ # Product description page
│   └── components/             # Reusable components
│       ├── baseComponent.ts    # Base component class
│       ├── header.ts           # Header component
│       └── productCard.ts      # Product card component
├── tests/                       # Test specifications
│   ├── login.spec.ts           # Login tests
│   └── catalog.spec.ts         # Catalog tests
├── utils/                       # Utility functions
│   ├── logger.ts               # Structured logging
│   ├── waitUtils.ts            # Wait strategies
│   ├── env.ts                  # Environment utilities
│   ├── commonActions.ts        # Common action helpers
│   └── performanceMonitor.ts   # Performance tracking
├── playwright.config.ts        # Playwright configuration
└── package.json                # Dependencies

```

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd PlaywrightPlayground

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# (Optional) Install specific browsers
npx playwright install chromium firefox
```

### Environment Variables

Create a `.env` file in the root directory:

```env
TEST_ENV=local
BASE_URL=https://www.saucedemo.com/
STAGING_URL=https://staging.saucedemo.com/
PROD_URL=https://www.saucedemo.com/
```

---

## 🧪 Running Tests

### Basic Commands

```bash
# Run all tests on all browsers
npm run test

# Run tests on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox

# Run specific test file
npx playwright test tests/login.spec.ts

# Run specific test by name
npx playwright test -g "logs in successfully"

# Run tests in headed mode (see the browser)
npx playwright test --headed

# Run tests in debug mode (step through)
npx playwright test --debug

# Run single test in debug mode
npx playwright test tests/login.spec.ts -g "specific test" --debug
```

### Test Filtering

```bash
# Run only login tests
npx playwright test tests/login.spec.ts

# Run tests matching pattern
npx playwright test -g "login"

# Run only failing tests
npx playwright test --only-changed
```

### Reporting

```bash
# Generate and open HTML report
npx playwright show-report

# View test results as JSON
cat test-results/results.json | jq
```

---

## ⚙️ Configuration

### Environment-Specific Config

Configure different behaviors for `local`, `staging`, and `production` environments in `config/testConfig.ts`:

```typescript
const config = getConfig(); // Returns environment-specific config

// Available configurations:
// - baseURL: Base URL for the application
// - environment: Current environment name
// - timeouts: Wait timeouts (short, medium, long, explicit)
// - retries: Retry counts for UI and API tests
// - reporting: Screenshot, video, and trace capture settings
```

### Changing Environment

```bash
# Run tests on staging
TEST_ENV=staging npx playwright test

# Run tests on production
TEST_ENV=production npx playwright test
```

### Browser Configuration

Edit `playwright.config.ts` to add/remove browsers:

```typescript
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
]
```

---

## 🏗️ Architecture

### Page Object Model (POM)

The project follows the Page Object Model pattern for maintainability and reusability:

- **BasePage**: Base class for all pages with common functionality
- **Page Classes**: `LoginPage`, `CatalogPage` - specific page logic
- **Components**: Reusable UI components like `Header`, `ProductCard`

### Fixtures

Custom Playwright fixtures provide setup/teardown and dependency injection:

```typescript
test('test with fixtures', async ({ loginPage, catalogPage }) => {
  // Fixtures are automatically instantiated
  await loginPage.open();
});
```

### Utilities

Reusable utility classes for common operations:

- **Logger**: Structured logging with levels (DEBUG, INFO, WARN, ERROR)
- **WaitUtils**: Custom wait strategies with logging
- **PerformanceMonitor**: Track operation durations

---

## 📄 Page Object Model

### LoginPage Example

```typescript
// Navigate and login
await loginPage.open();
await loginPage.login({
  userName: 'standard_user',
  password: 'secret_sauce'
});

// Check for errors
const errorMessage = await loginPage.getErrorMessage();
const hasErrorIcon = await loginPage.isErrorIconVisibleForInput('username');
```

### CatalogPage Example

```typescript
// Check page loaded
await catalogPage.waitForPageToLoad();

// Get product count
const count = await catalogPage.getProductCount();

// Get all products
const products = await catalogPage.products();

// Interact with header
const cartBadgeVisible = await catalogPage.header.isCartBadgeVisible();
```

### ProductCard Example

```typescript
const product = await catalogPage.products()
  .then(products => products[0]);

// Get product info
const name = await product.getProductName();
const price = await product.getProductPrice();

// Manage cart
await product.addToCart();
await product.removeFromCart();
```

---

## 🗂️ Test Data Management

### Using Test Data

```typescript
import { testUsers } from '../data/testData';

// Use predefined users
await loginPage.login(testUsers.standard);
await loginPage.login(testUsers.lockedOut);
```

### Using Data Builders

```typescript
import { UserBuilder } from '../data/builders/userBuilder';

// Build custom test data
const customUser = new UserBuilder()
  .withUserName('custom@test.com')
  .withPassword('myPassword123')
  .build();

await loginPage.login(customUser);

// Build locked user variant
const lockedUser = new UserBuilder().locked().build();
```

---

## 🔧 Utilities

### Logger

Structured logging for debugging and test analysis:

```typescript
import { logger } from '../utils/logger';

logger.debug('Starting test', { userId: 123 });
logger.info('User logged in successfully', { timestamp: Date.now() });
logger.error('Login failed', error, { userName: 'test@example.com' });

// Get all logs
const logs = logger.getLogs();
```

### WaitUtils

Custom wait strategies with timeout management:

```typescript
import { WaitUtils } from '../utils/waitUtils';

// Wait for element to be visible
await WaitUtils.waitForElement(locator, {
  message: 'Add to cart button',
  timeout: 5000
});

// Wait for condition
await WaitUtils.waitForCondition(
  async () => await header.isCartBadgeVisible(),
  { message: 'Cart badge appears', timeout: 10000 }
);

// Wait for element state
await WaitUtils.waitForElementState(element, 'hidden', {
  message: 'Modal closes',
  timeout: 3000
});
```

### PerformanceMonitor

Track operation performance:

```typescript
import { performanceMonitor } from '../utils/performanceMonitor';

performanceMonitor.startTimer('login');
// ... perform login
performanceMonitor.endTimer('login', { user: 'standard_user' });

// Get average time
const avgTime = performanceMonitor.getAverageTime('login');
console.log(`Average login time: ${avgTime}ms`);
```

---

## 📝 Logging

### Log Levels

- **DEBUG**: Detailed information for diagnosing problems
- **INFO**: Confirmation that things are working as expected
- **WARN**: Warning about potential issues
- **ERROR**: Serious problem occurred

### Example Log Output

```
[2026-06-23T10:00:00.000Z] DEBUG: Starting wait for element: Add to cart button | { timeout: 5000 }
[2026-06-23T10:00:00.500Z] INFO: Successfully waited for element: Add to cart button | { timeout: 5000 }
[2026-06-23T10:00:05.000Z] ERROR: Add to cart button did not appear within 5000ms | { timeout: 5000, message: 'Add to cart button' }
```

---

## ✅ Best Practices

### Writing Tests

✅ **DO:**
- Use descriptive test names
- Keep tests focused on one behavior
- Use fixtures for common setup
- Log important operations
- Clean up resources after tests

❌ **DON'T:**
- Hardcode wait times (use WaitUtils)
- Share state between tests
- Use random delays or sleeps
- Test multiple features in one test
- Ignore error messages

### Page Objects

✅ **DO:**
- Keep business logic in page objects
- Use private getters for locators
- Return page objects or typed results
- Add JSDoc comments

❌ **DON'T:**
- Put test logic in page objects
- Expose locators directly
- Create one page per element
- Skip error handling

### Test Data

✅ **DO:**
- Use builders for flexible data creation
- Centralize test data in `/data`
- Use meaningful test user names
- Document test data usage

❌ **DON'T:**
- Hardcode data in tests
- Create data during tests
- Share test data modifications between tests
- Use production data

---

## 🔄 CI/CD Integration

### GitHub Actions Example

Tests run automatically on push and pull requests:

```bash
# Runs on: push to main/develop, PRs to main/develop
# Tests on: Chromium and Firefox
# Environments: local and staging
```

### Local Pre-commit Hook

Run tests before committing:

```bash
# Add to .git/hooks/pre-commit
#!/bin/bash
npm run test -- tests/login.spec.ts
```

---

## 📊 Test Results

After running tests, view results:

```bash
# Open interactive HTML report
npx playwright show-report

# View report in GitHub Actions
# Artifact: playwright-report
```

Report includes:
- Pass/fail status
- Screenshots on failure
- Videos of test execution
- Execution timeline
- Browser details

---

## 🐛 Troubleshooting

### Tests failing locally but passing in CI

- **Cause**: Environment differences
- **Solution**: Check `TEST_ENV` variable and base URL

### Timeouts occurring

- **Cause**: Application is slow or unresponsive
- **Solution**: Increase timeout in `config/testConfig.ts`

### Elements not found

- **Cause**: Selectors changed or element not rendered
- **Solution**: Check element in browser DevTools, verify selector

### Browser not installed

```bash
# Install all browsers
npx playwright install

# Install specific browser
npx playwright install firefox
```

---

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Testing Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-page)
- [Debugging Guide](https://playwright.dev/docs/debug)

---

## 📦 Dependencies

- **@playwright/test**: ^1.58.2 - End-to-end testing framework
- **@types/node**: ^25.3.0 - TypeScript node types

---

## 👤 Author

Grigore Stefan