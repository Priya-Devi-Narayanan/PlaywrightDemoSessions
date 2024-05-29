const base = require('@playwright/test')
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';

exports.test = base.test.extend(
    {
loginPage: async ({page}, use) =>
    {
        await use(new LoginPage(page));
    },
productPage: async ({page}, use) =>
    {
        await use(new ProductPage(page));
     },
    }
);
exports.expect = base.expect;