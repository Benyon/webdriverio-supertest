const Button = require("../../helpers/types/button.type");
const TextField = require("../../helpers/types/textfield.type");

class RegisterPage {

    firstName = new TextField(`input[name=firstname]`);
    lastName = new TextField(`input[name=lastname]`);
    mobileNumber = new TextField(`input[name=phone]`);
    emailField = new TextField(`input[name=email]`);
    passwordField = new TextField(`input[name=password]`);
    confirmPassword = new TextField(`input[name=confirmpassword]`);

    signUpButton = new Button('.btn.signupbtn');

    async fillFields(username=false, password=false) {
        let _username = username ? username : 'john.johnson2@doe.com';
        let _password = password ? password : 'superSecret10';

        await this.firstName.type('firstName');
        await this.lastName.type('lastName');
        await this.mobileNumber.type('07500000000');
        await this.emailField.type(_username);
        await this.passwordField.type(_password);
        await this.confirmPassword.type(_password);
    }

    async submitFields() {
        await this.signUpButton.click();
    }
}

module.exports = new RegisterPage();
