import { execFile } from "node:child_process";
import * as node_util from "node:util";
import * as csl_tool from "./console_toolkit.js";
const execFileAsync = node_util.promisify(execFile);
export async function checkPython() {
    try {
        const { stdout, stderr } = await execFileAsync("py", ["-3.15", "--version"]);
        const versionText = (stdout || stderr).trim().replace("Python ", "");
        const [major = 0, minor = 0, patch = 0] = versionText.split(".").map(Number);
        csl_tool.ConsoleToolkit.information(`Detected Python ${versionText}`);
        const compatible = major >= 4 || (major === 3 && minor >= 15);
        if (compatible) {
            csl_tool.ConsoleToolkit.information("Python version is compatible with GD!");
        }
        else {
            csl_tool.ConsoleToolkit.error("Python version is too old for GD.");
        }
        return compatible;
    }
    catch {
        csl_tool.ConsoleToolkit.error("Python 3.15 is not available.");
        return false;
    }
}
export async function getInfoGD() {
    try {
        const { stdout } = await execFileAsync("py", ["-3.15", "-m", "pip", "show", "GeometricalDomination"]);
        const fields = new Map();
        for (const line of stdout.trim().split(/\r?\n/)) {
            const separator = line.indexOf(":");
            if (separator === -1)
                continue;
            const key = line.slice(0, separator);
            const value = line.slice(separator + 1).trim();
            fields.set(key, value);
        }
        const name = fields.get("Name");
        const version = fields.get("Version");
        const summary = fields.get("Summary");
        const location = fields.get("Location");
        if (name === undefined ||
            version === undefined ||
            location === undefined) {
            throw new Error("Incomplete GD package information.");
        }
        const requires = (fields.get("Requires") ?? "")
            .split(",")
            .map(dependency => dependency.trim())
            .filter(dependency => dependency.length > 0);
        const info = {
            name,
            version,
            summary: summary ?? "",
            location,
            requires
        };
        return info;
    }
    catch {
        csl_tool.ConsoleToolkit.information("Could not retrieve GD package information.");
        return null;
    }
}
//# sourceMappingURL=utilities.js.map