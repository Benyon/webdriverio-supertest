const supertest = require('supertest');

module.exports = class APIRequest {

    #baseURL
    #endpoint
    #payload
    #getEndpoint

    #server
    #get
    sessionCookie;

    constructor(baseURL, endpoint, payload, getEndpoint) {
        this.#baseURL = baseURL;
        this.#endpoint = endpoint;
        this.#payload = payload;
        this.#getEndpoint = getEndpoint;

        this.#server = supertest.agent(baseURL);
        this.#get = null;
        this.sessionCookie = null
    }

    async getInitialCookie() {
        this.#get = await this.#server.get(this.#getEndpoint);
        let verboseCookie = this.#get.res.rawHeaders[13];
        let cookie = verboseCookie.substr("0", verboseCookie.indexOf(';'));
        this.sessionCookie = cookie.split('=');
    }

    async postAuthentication() {
        if (this.sessionCookie==null) {
            console.warn("Requesting cookie from main domain, this may want to be requested manually");
            await this.getInitialCookie();
        }

        await this.#server
            .post(this.#endpoint)
            .set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
            .set('X-Requested-With','XMLHttpRequest')
            .set('Cookie', `${this.sessionCookie[0]}=${this.sessionCookie[1]}`)
            .send(this.#payload);
    }

    async syncCookies() {
        await browser.url(this.#baseURL);
        await browser.setCookies({
            name: this.sessionCookie[0],
            value: this.sessionCookie[1],
            httpOnly: true
        });
    }
}
