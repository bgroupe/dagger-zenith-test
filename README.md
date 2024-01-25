# dagger-zenith-test
built w/ dagger v0.9.7 (registry.dagger.io/engine) darwin/arm64

## [Traditional Pipeline](./ci)
Catch block works as expected

* `npm install && npm run test`


## [Zenith Module](.)
Implemented catch block appears to call function recursively, does not eval catch code

* `dagger call test`