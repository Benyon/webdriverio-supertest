const APIRequest = require('../helpers/apiRequest.helper');
const config = require('../helpers/config.json');
const faker = require('faker');

class CommonUtil {

    /**
     * Signs into the config login endpoint with config credentials, unless overrided
     * @param {JSON} testData Test data JSON object recieved via CommonUtil.createRandomTestData().
     * @return {Promise<T>} Returns undefined.
     */
    logInViaAPI = async (testData) => {

        let payload = {
            "username" : testData.email,
            "password" : testData.password
        }

        let apiLogIn = new APIRequest(
            config.URL.baseURL, 
            config.URL.authEndpoint, 
            payload,
            '/home'
        );
        await apiLogIn.postAuthentication();
        await apiLogIn.syncCookies();
    }
    
    /**
     * Signs up a new account via the config sign up endpoint with config credentials, unless overrided
     * @param {JSON} testData Test data JSON object recieved via CommonUtil.createRandomTestData().
     * @return {Promise<T>} Returns undefined.
     */
    signUpViaAPI = async (testData) => {

        let payload =  {
            "firstname": testData.firstname,
            "lastname": testData.lastname,
            "phone": testData.phone,
            "email": testData.email,
            "password": testData.password,
            "confirmpassword": testData.password
        }
        
        let apiSignUp = new APIRequest(
            config.URL.baseURL, 
            config.URL.signUpEndpoint, 
            payload,
            '/home'
        );

        await apiSignUp.postAuthentication();
        await apiSignUp.syncCookies();
    }

    /**
     * Create random test data to be used in a test.
     * @param {null} null No arguments required.
     * @return {JSON} Returns JSON containing, firstName,
     * lastName, phone, email, password and confirmpassword.
     */
    createRandomTestData = () => {

        let data = {
            "firstname": faker.name.firstName(),
            "lastname": faker.name.lastName(),
            "phone": faker.phone.phoneNumber('07#########'),
            "email": faker.internet.email(),
            "password": faker.internet.password()
        }

        return data;
    }

    /**
     * Generates test data on the website using the test data object.
     * Signs up for a new user with this information.
     * @param {JSON} testData JSON object generated by CommonUtil.createRandomTestData();
     * @return {Promise<T>} Returns undefined.
     */
    generateTestData = async (testData) => {

        let payload = {
            "firstname": testData.firstname,
            "lastname": testData.lastname,
            "phone": testData.phone,
            "email": testData.email,
            "password": testData.password,
            "confirmpassword": testData.password
        }

        let apiRandomData = new APIRequest(
            config.URL.baseURL, 
            config.URL.signUpEndpoint, 
            payload,
            '/home'
        );

        await apiRandomData.postAuthentication(true);
    }

}

module.exports = new CommonUtil();