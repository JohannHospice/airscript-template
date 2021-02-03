import { logName } from "../../src/utils/logger";

describe("log", () => {
  it("should log name", () => {
    logName("name");
    expect(output.text.mock.calls.length).toBe(1);
  });
});
