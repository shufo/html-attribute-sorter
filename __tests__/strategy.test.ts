import path from "path";
import fs from "fs";
import { sortAttributes } from "../src/main";
import util from "./support/util";

describe("strategy test", () => {
    test("code guide", () => {
        const fixturesDir = path.resolve(__dirname, "fixtures", "code_guide");
        const fixtureDirEntries = fs.readdirSync(fixturesDir, {
            withFileTypes: true,
        });
        const fixtures = fixtureDirEntries
            .filter((entry) => entry.isFile())
            .map((entry) => entry.name);

        fixtures.forEach((fixture) => {
            const content = fs
                .readFileSync(path.resolve(fixturesDir, fixture))
                .toString("utf-8");

            const unformatted = util.unformattedContent(content);
            const result = sortAttributes(unformatted, {
                strategy: "code_guide",
            });

            const expected = util.formattedContent(content);

            expect(result).toEqual(expected);
        });
    });

    test("idiomatic", () => {
        const fixturesDir = path.resolve(__dirname, "fixtures", "idiomatic");
        const fixtureDirEntries = fs.readdirSync(fixturesDir, {
            withFileTypes: true,
        });
        const fixtures = fixtureDirEntries
            .filter((entry) => entry.isFile())
            .map((entry) => entry.name);

        fixtures.forEach((fixture) => {
            const content = fs
                .readFileSync(path.resolve(fixturesDir, fixture))
                .toString("utf-8");

            const unformatted = util.unformattedContent(content);
            const result = sortAttributes(unformatted, {
                strategy: "idiomatic",
            });
            console.log(result);

            const expected = util.formattedContent(content);

            expect(result).toEqual(expected);
        });
    });
});
