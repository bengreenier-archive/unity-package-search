const UnityAuthenticationClient = require('unity-package-authentication').UnityAuthenticationClient
const req = require('request-promise')

const UnitySearchResult = require('./models/unity-search-result')

module.exports = class UnitySearchClient {
    constructor(sessionIdOrAuthenticator, langId, apiRoot) {
        this._sessionIdOrAuthenticator = sessionIdOrAuthenticator || new UnityAuthenticationClient()
        this._langId = langId || 'en-US'
        this._apiRoot = apiRoot || 'https://www.assetstore.unity3d.com'

        if (this._apiRoot.endsWith('/')) {
            this._apiRoot = this._apiRoot.substr(0, this._apiRoot.length - 1)
        }
    }

    search(query, maxResults, resultSorter) {
        maxResults = maxResults || 10
        resultSorter = resultSorter || ((a, b) => {
            return b.publishedDate - a.publishedDate
        })

        let sessionPromise;

        if (typeof this._sessionIdOrAuthenticator === 'string') {
            sessionPromise = Promise.resolve(this._sessionIdOrAuthenticator)
        } else {
            sessionPromise = this._sessionIdOrAuthenticator.authenticate()
        }

        return sessionPromise.then((sessionId) => {
            return req.get({
                json: true,
                url: `${this._apiRoot}/api/${this._langId}/search/results.json?q=${encodeURI(query)}&order_by=relevance`,
                headers: {
                    'X-Requested-With': 'UnityAssetStore',
                    'X-Unity-Session': sessionId
                }
            }).then((res) => {
                if (res.total == 0) {
                    return []
                }

                let topN = res.results.slice(0, maxResults)

                topN.map((result) => {
                    return new UnitySearchResult(result)
                }).sort(resultSorter)

                return topN
            })
        })
    }

    get langId() {
        return this._langId
    }

    get apiRoot() {
        return this._apiRoot
    }
}