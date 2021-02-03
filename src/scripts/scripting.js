import { logName } from "../utils/logger";

output.markdown("# Hello, world!");

let name = await input.textAsync("What is your name?");
logName(name);
