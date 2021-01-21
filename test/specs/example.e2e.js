const HomePage = require('../pageobjects/home.page')
const RegisterPage = require('../pageobjects/register.page');
const AccountPage = require('../pageobjects/account.page');
const CommonUtil = require('../../utility/common.util');
const accountPage = require('../pageobjects/account.page');

describe('API assisted sign up', async () => {
    
    it('signs up via the usual user flow', async () => {
        await HomePage.open();
        await HomePage.myAccountDropdown.click();
        await HomePage.signUpButton.click();

        await RegisterPage.fillFields();
        await RegisterPage.submitFields();

        await AccountPage.profileMenuOption.isDisplayed();

        await browser.pause(2000);
    });

    it('signs up successfully with the assistance of an API', async () => {

        await CommonUtil.signUpViaAPI();
        await AccountPage.open();

        expect(AccountPage.profileMenuOption).toBeDisplayed()

        await browser.pause(2000);
    });

});


describe('API assisted login', async () => {

    // it('logs in via the usual user flow', async () => {

            
    // });

    // it('logs in successfully with the assistance of an API', async () => {
    //     await CommonUtil.logInViaAPI();
    //     await AccountPage.open();
    //     expect(AccountPage.profileMenuOption).toBeDisplayed()
    //     await browser.pause(2000);
    // });



});