const assert = require('assert')
const UnityAuthenticationClient = require('unity-package-authentication').UnityAuthenticationClient
const UnitySearchClient = require('../').UnitySearchClient

const testCreds = require('unity-package-authentication/test/constants')

describe('UnityDownloadClient', () => {
    it('should construct', () => {
        new UnitySearchClient('')
        new UnitySearchClient(new UnityAuthenticationClient())
        new UnitySearchClient('', '')
        new UnitySearchClient('', '', '')
    })

    it('should reformat apiRoot if needed', () => {
        const client = new UnitySearchClient('', '', 'pie/')

        assert.equal(client.apiRoot, 'pie')
    })

    it('should search anonymously', (done) => {
        new UnitySearchClient()
            .search('32351')
            .then((results) => {
                assert.ok(results.length > 0)
                done()
            }, done)
    }).timeout(5000)

    it('should search authenticated', (done) => {
        new UnityAuthenticationClient()
            // see https://github.com/bengreenier/unity-package-authentication/blob/master/test/basic.js#L22
            .authenticate(testCreds.testUsername, testCreds.testPassword)
            .then((sessionId) => {
                return new UnitySearchClient(sessionId)
            }).then((client) => {
                // this only works so long as this package exists
                // see https://www.assetstore.unity3d.com/en/#!/content/32351
                return client.search('32351')
            }).then((results) => {
                assert.ok(results.length > 0)
                done()
            }, done)
    }).timeout(5000)

    it('should do lookups', (done) => {
        new UnitySearchClient()
            .lookup(32351)
            .then((data) => {
                assert.ok(data.id != null)
                done()
            }, done)
    }).timeout(5000)
})