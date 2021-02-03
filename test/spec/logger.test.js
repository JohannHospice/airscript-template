import { logName } from "../utils/logger";

describe("log", () => {
  it("should log name", () => {
    logName("name");
    expect(output.mock.calls.length).toBe(2);
  });
});
