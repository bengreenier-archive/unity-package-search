module.exports = class UnitySearchResult {
    constructor(resultObj, moneyFormat) {
        moneyFormat = moneyFormat || "USD"
        
        this._id = resultObj.id
        this._title = resultObj.title
        this._version = resultObj.version
        this._publishedDate = new Date(resultObj.pubdate_iso)
        this._publisherId = resultObj.publisher.id
        this._publisherLabel = resultObj.publisher.label
        this._categoryId = resultObj.category.id
        this._categoryLabel = resultObj.category.label
        this._hotness = resultObj.hotness
        this._iconUrl = resultObj.icon
        this._ratingAverage = resultObj.rating.average
        this._ratingCount = resultObj.rating.count
        this._price = (resultObj.price) ? resultObj.price[moneyFormat] : "0.00"
    }

    get id() {
        return this._id
    }
    get title() {
        return this._title
    }
    get version() {
        return this._version
    }
    get publishedDate() {
        return this._publishedDate
    }
    get publisherId() {
        return this._publisherId
    }
    get publisherLabel() {
        return this._publisherLabel
    }
    get categoryId() {
        return this._categoryId
    }
    get categoryLabel() {
        return this._categoryLabel
    }
    get hotness() {
        return this._hotness
    }
    get iconUrl() {
        return this._iconUrl
    }
    get ratingAverage() {
        return this._ratingAverage
    }
    get ratingCount() {
        return this._ratingCount
    }
    get price() {
        return this._price
    }
}