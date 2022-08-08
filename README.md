[![npm](https://img.shields.io/npm/v/html-attribute-sorter)](https://www.npmjs.com/package/html-attribute-sorter)
[![CI](https://github.com/shufo/html-attribute-sorter/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/shufo/html-attribute-sorter/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/shufo/html-attribute-sorter/branch/main/graph/badge.svg?token=U7YzstHupS)](https://codecov.io/gh/shufo/html-attribute-sorter)

# html-attribute-sorter

An html attribute sorter.

You can sort attributes by alphabetical, [code guide](https://codeguide.co/#attribute-order), [vue/attributes-order](https://eslint.vuejs.org/rules/attributes-order.html), [idiomatic](https://github.com/necolas/idiomatic-html#attribute-order) or any custom order using regex.

## Installation

```bash
$ npm install html-attribute-sorter
# yarn
$ yarn add html-attribute-sorter
```

## Usage

```typescript
const { sortAttributes } = require("html-attribute-sorter");

// pass html tags that includes attributes
// default: code guide order
const sorted = sortAttributes(`<img src="foo" class="img b-30" id="img_10">`);
console.log(sorted);
// => <img class="img b-30" id="img_10" src="foo">

// alphabetical order
const sorted = sortAttributes(
  `<img src="foo" alt="title" class="img b-30" id="img_10">`,
  {
    order: "alphabetical",
  }
);
console.log(sorted);
// => <img alt="title" class="img b-30" id="img_10" src="foo">

// idiomatic order
const sorted = sortAttributes(
  `<img src="foo" alt="title" class="img b-30" id="img_10">`,
  {
    order: "idiomatic",
  }
);
console.log(sorted);
// => <img class="img b-30" id="img_10" alt="title" src="foo">

// code guide order
const sorted = sortAttributes(
  `<img src="foo" alt="title" class="img b-30" id="img_10">`,
  {
    order: "code-guide",
  }
);
console.log(sorted);
// => <img class="img b-30" id="img_10" src="foo">

// custom order
const sorted = sortAttributes(
  `<img src="foo" alt="title" class="img b-30" id="img_10">`,
  {
    order: "custom",
    customRegexes: ["id", "class", "sr.+", "alt"], // you can use regex for attritube names
  }
);
console.log(sorted);
// => <img id="img_10" class="img b-30" src="foo" alt="title" >
```

## API

### functions

#### sortAttributes(body: string, options: ISortOption)

`body`: html tag string e.g. `<img src="..." alt="title" class="pg-10">`

### Interfaces

#### ISortOption

```typescript
export interface ISortOption {
  order: string;
  customRegexes?: string[];
}
```

| key           | value                                                                                                                                                             | required | default      |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------ |
| order         | An order to sort attributes. You can specify `alphabetical`, `code-guide`, `idiomatic`, `vuejs` or `custom`.                                                      | yes      | `code-guide` |
| customRegexes | When `order` is specified to `custom`, html attributes set here will be used as order. You can use regex for attribute names. e.g. `["data-.+", "class", "src"]`. | no       | `[]`         |

## Testing

```bash
$ yarn install
$ yarn run test
```

## Benchmarking

```bash
$ yarn run benchmark
```

![image](https://user-images.githubusercontent.com/1641039/182972283-3d7e48bf-3f8b-40b1-92c0-334a1e2fba3e.png)

## Contributing

1.  Fork it
2.  Create your feature branch (`git checkout -b my-new-feature`)
3.  Commit your changes (`git commit -am 'Add some feature'`)
4.  Push to the branch (`git push origin my-new-feature`)
5.  Create new Pull Request

## LICENSE

MIT
