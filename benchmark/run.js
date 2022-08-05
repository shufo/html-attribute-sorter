const b = require("benny");
const { sortAttributes } = require("../");

b.suite(
  "sort benchmark",

  b.add("sort 1 tag", () => {
    sortAttributes(`<img src="foo" alt="branch_arrow" title="bar">`);
  }),

  b.add("sort 10 tags", () => {
    const template = `<img src="foo" alt="branch_arrow" title="bar">
    <img src="foo" alt="branch_arrow" title="bar" class="img b-30" width="300" id="img_10">
    <img src="foo" alt="branch_arrow" title="bar" class="img b-30" width="300" id="img_10">
    <img src="foo" alt="branch_arrow" title="bar" class="img b-30" width="300" id="img_10">
    <img src="foo" alt="branch_arrow" title="bar" class="img b-30" width="300" id="img_10">
    <img src="foo" alt="branch_arrow" title="bar" class="img b-30" width="300" id="img_10">
    <img src="foo" alt="branch_arrow" title="bar" class="img b-30" width="300" id="img_10">
    <img src="foo" alt="branch_arrow" title="bar" class="img b-30" width="300" id="img_10">
    <img src="foo" alt="branch_arrow" title="bar" class="img b-30" width="300" id="img_10">
    <img src="foo" alt="branch_arrow" title="bar" class="img b-30" width="300" id="img_10">
    `;
    sortAttributes(template);
  }),

  b.cycle(),
  b.complete(),
  b.save({ file: "reduce", version: "1.0.0" }),
  b.save({ file: "reduce", format: "chart.html" })
);
