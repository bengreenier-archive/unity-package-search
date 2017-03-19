# unity-package-search

> Note: uses es6 classes, see [this](http://node.green/#ES2015-functions-class) for node version compatibility

[![Build Status](https://travis-ci.org/bengreenier/unity-package-search.svg?branch=master)](https://travis-ci.org/bengreenier/unity-package-search)

Client for searching the unity package service for packages.

## How

Do I...

### Install

Simple! Just `npm install unity-package-search`

### Use

See the following (or the [tests](./test/basic.js)):

```
const client = new UnitySearchClient()

client.search(query).then(...)
```

Which will return an array of [UnitySearchResult](./lib/models/unity-search-result.js) objects

## License

MIT
