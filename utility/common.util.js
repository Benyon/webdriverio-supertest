const APIRequest = require('../helpers/apiRequest.helper');
const config = require('../helpers/config.json');

class CommonUtil {

    logInViaAPI = async () => {
        let apiLogIn = new APIRequest(
            config.URL.baseURL, 
            config.URL.authEndpoint, 
            config.data.loginPayload, 
            '/home'
        );
        await apiLogIn.postAuthentication();
        await apiLogIn.syncCookies();
    }
    
    signUpViaAPI = async (username, password) => {
        let payload = config.data.signUpPayload

        if (username!=null) {
            payload.username = username;
        }
        if (password!=null) {
            payload.password = password;
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

}

module.exports = new CommonUtil();