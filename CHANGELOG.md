# Changelog

## [0.4.3](https://github.com/shufo/html-attribute-sorter/compare/v0.4.2...v0.4.3) (2022-12-25)


### Miscellaneous

* **deps:** update dependency esbuild to ^0.15.0 ([86bf865](https://github.com/shufo/html-attribute-sorter/commit/86bf865d1cfcf460c59a98417779b315ccf232b9))
* **deps:** update pozil/auto-assign-issue action to v1.10.0 ([577a966](https://github.com/shufo/html-attribute-sorter/commit/577a96642b452783edb41d5cad85c5ed351c5dfb))
* **deps:** update pozil/auto-assign-issue action to v1.11.0 ([635d4ff](https://github.com/shufo/html-attribute-sorter/commit/635d4ffd81b336994095282aea2009913578c581))
* **deps:** update thollander/actions-comment-pull-request action to v2 ([bb16552](https://github.com/shufo/html-attribute-sorter/commit/bb16552037307d710bb8764ec72c6aad477b2705))


### Fixes

* 🐛 fix: attribute doubles when v-else-if exists ([441c815](https://github.com/shufo/html-attribute-sorter/commit/441c8150697487e0f9de918d9a10a44ffca3d00b))

## [0.4.2](https://github.com/shufo/html-attribute-sorter/compare/v0.4.1...v0.4.2) (2022-08-09)


### Fixes

* 🐛 unexpected reordering in eattributes with no space ([b83fe6d](https://github.com/shufo/html-attribute-sorter/commit/b83fe6daaf16f6cc91ecb613aeca4420be997242))

## [0.4.1](https://github.com/shufo/html-attribute-sorter/compare/v0.4.0...v0.4.1) (2022-08-08)


### Fixes

* 🐛 does not capture when quotations are not present ([2ca7ec8](https://github.com/shufo/html-attribute-sorter/commit/2ca7ec8d53db113aa6e58a6d45e4017fd2ab0e05))
* 🐛 not captured if there is a space around equal ([0c7c52e](https://github.com/shufo/html-attribute-sorter/commit/0c7c52ec78779c40c2e858ae29727b1760dbd4ff))

## [0.4.0](https://github.com/shufo/html-attribute-sorter/compare/v0.3.2...v0.4.0) (2022-08-07)


### Features

* 🎸 add custom order strategy ([64e5639](https://github.com/shufo/html-attribute-sorter/commit/64e563912ad71a1a06c4551bab5c8930d9335942))

## [0.3.2](https://github.com/shufo/html-attribute-sorter/compare/v0.3.1...v0.3.2) (2022-08-06)


### Fixes

* 🐛 do not sort remaining attributes other than spec ([d46daa1](https://github.com/shufo/html-attribute-sorter/commit/d46daa19ef44f0dc7e690d8d7ea4583e32a44b17))


### Miscellaneous

* **deps:** update peter-evans/commit-comment action to v2 ([5a00b31](https://github.com/shufo/html-attribute-sorter/commit/5a00b31fe87d6d6fe7fc2829e4a3b7187e246a17))

## [0.3.1](https://github.com/shufo/html-attribute-sorter/compare/v0.3.0...v0.3.1) (2022-08-06)


### Fixes

* 🐛 change parameter value from code_guide to code-guide ([f2b49ad](https://github.com/shufo/html-attribute-sorter/commit/f2b49ad5b320da206f239d7a0a86f8d6b8a06650))


### Miscellaneous

* **deps:** update googlecloudplatform/release-please-action action to v3 ([e0a6b9a](https://github.com/shufo/html-attribute-sorter/commit/e0a6b9a8b333add204c7b5530598344cd75e997c))
* **deps:** update jest monorepo to v28 ([8d1a01b](https://github.com/shufo/html-attribute-sorter/commit/8d1a01b99795df41bfc935156c346dd0f1721721))

## [0.3.0](https://www.github.com/shufo/html-attribute-sorter/compare/v0.2.1...v0.3.0) (2022-08-06)


### Features

* 🎸 add vuejs sorting strategy ([3d4219f](https://www.github.com/shufo/html-attribute-sorter/commit/3d4219f9ae26b83714b4ac43ad6c24eed7b8e412))


### Fixes

* 🐛 unexpected custom directive position for vuejs order ([c40d0ad](https://www.github.com/shufo/html-attribute-sorter/commit/c40d0ad1c9ffe9d21886406727fd2edd7e5e2c68))

### [0.2.1](https://www.github.com/shufo/html-attribute-sorter/compare/v0.2.0...v0.2.1) (2022-08-06)


### Fixes

* 🐛 regex does not match specific tag ([6d94431](https://www.github.com/shufo/html-attribute-sorter/commit/6d944314fb2c68950527ed8a7992c15e98b0dfc5))


### Miscellaneous

* **deps:** update actions/cache action to v3 ([094a395](https://www.github.com/shufo/html-attribute-sorter/commit/094a395bcdf5137efed4971449aac3973c688fb0))
* **deps:** update actions/checkout action to v3 ([b109c93](https://www.github.com/shufo/html-attribute-sorter/commit/b109c93259e443f8bb916418b3488f5096d73c86))
* **deps:** update actions/setup-node action to v3 ([0ca780e](https://www.github.com/shufo/html-attribute-sorter/commit/0ca780ecd9c04d7f78673d95f01d6d49c08ae275))
* **deps:** update codecov/codecov-action action to v3 ([38b87de](https://www.github.com/shufo/html-attribute-sorter/commit/38b87deb8630302fedbeb5e384cdf22b3a97e730))

## [0.2.0](https://www.github.com/shufo/html-attribute-sorter/compare/v0.1.0...v0.2.0) (2022-08-05)


### Features

* 🎸 change name of option parameter ([5b5951b](https://www.github.com/shufo/html-attribute-sorter/commit/5b5951bb3b0c8e761fd5de2a7e898e6cc480711b))

## 0.1.0 (2022-08-05)


### Miscellaneous

* 🤖 require min node engine version as 12.0.0 ([6526bbc](https://www.github.com/shufo/html-attribute-sorter/commit/6526bbc55baa16c2b908d59c904ffa3c8346e012))
* **deps:** update pozil/auto-assign-issue action to v1.9.0 ([fc1aa07](https://www.github.com/shufo/html-attribute-sorter/commit/fc1aa07fe5bcf536c6be3caa02f37d1ebc8beee1))
* Initialized ([5fb24cf](https://www.github.com/shufo/html-attribute-sorter/commit/5fb24cfdc1ccf8b46a938fe3018b3fda02c2893c))
