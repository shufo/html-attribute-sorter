import path from "path";
import fs from "fs";
import { sortAttributes } from "../src/main";
import util from "./support/util";

describe("sorter test", () => {
    const fixturesDir = path.resolve(__dirname, "fixtures");
    const fixtureDirEntries = fs.readdirSync(fixturesDir, {
        withFileTypes: true,
    });

    const fixtures = fixtureDirEntries
        .filter((entry) => entry.isFile())
        .map((entry) => entry.name);

    fixtures.forEach((fixture) => {
        test.concurrent(`can sort ${fixture}`, function () {
            const content = fs
                .readFileSync(path.resolve(fixturesDir, fixture))
                .toString("utf-8");

            const unformatted = util.unformattedContent(content);
            const result = sortAttributes(unformatted, {
                strategy: "alphabetical",
            });
            const expected = util.formattedContent(content);

            expect(result).toEqual(expected);
        });
    });
});
