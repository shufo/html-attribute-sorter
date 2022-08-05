[![npm](https://img.shields.io/npm/v/html-attribute-sorter)](https://www.npmjs.com/package/html-attribute-sorter)
[![CI](https://github.com/shufo/html-attribute-sorter/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/shufo/html-attribute-sorter/actions/workflows/test.yml)

# html-attribute-sorter

An html attribute sorter.

You can sort attributes by alphabetical, [code guide](https://codeguide.co/#attribute-order) or [idiomatic](https://github.com/necolas/idiomatic-html#attribute-order) order.

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
sortAttributes(`<img src="foo" class="img b-30" id="img_10">`);
// => <img class="img b-30" id="img_10" src="foo">

// alphabetical order
sortAttributes(`<img src="foo" alt="title" class="img b-30" id="img_10">`, {
  strategy: "alphabetical",
});
// => <img alt="title" class="img b-30" id="img_10" src="foo">

// idiomatic order
sortAttributes(`<img src="foo" alt="title" class="img b-30" id="img_10">`, {
  strategy: "idiomatic",
});
// => <img class="img b-30" id="img_10" alt="title" src="foo">
```

## API

### functions

#### sortAttributes(body: string, options: ISortOption)

`body`: html tag string e.g. `<img src="..." alt="title" class="pg-10">`

### Interfaces

#### ISortOption

```typescript
export interface ISortOption {
  strategy: string;
}
```

| key      | value                                                                                                             |
| -------- | ----------------------------------------------------------------------------------------------------------------- |
| strategy | A strategy to sort attributes. You can specify `alphabetical`, `code_guide` or `idiomatic`. default: `code_guide` |

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
