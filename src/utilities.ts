import { execFile } from "node:child_process";
import * as node_util from "node:util";
import type * as types from "./types.js";
import * as csl_tool from "./console_toolkit.js";

const execFileAsync = node_util.promisify(execFile);

export async function getPythonVersions(): Promise<string[]> {
    const { stdout } = await execFileAsync(
        "py",
        ["list", "--format=exe"]
    );

    const executablePaths = stdout
        .split(/\r?\n/)
        .map(path => path.trim())
        .filter(Boolean);

    const versions = await Promise.all(
    executablePaths.map(async executable => {
        try {
            const { stdout, stderr } = await execFileAsync(
                executable,
                ["--version"]
            );

            const output = `${stdout}\n${stderr}`;
            const match = output.match(/Python\s+(\d+\.\d+(?:\.\d+)?)/);

            return match?.[1] ?? null;
        } catch {
            return null;
        }
    })
    );

    return versions.filter(
        (version): version is string => version !== null
    );
}


export function isCompatiblePythonVersion(
    versionText: string
): boolean {
    const [major = 0, minor = 0] =
        versionText.split(".").map(Number);

    return major > 3 || (major === 3 && minor >= 15);
}


export async function checkPython(): Promise<boolean> {
    try {
        const versions = await getPythonVersions();

        const compatibleVersions = versions.filter(
            isCompatiblePythonVersion
        );

        if (compatibleVersions.length === 0) {
            csl_tool.ConsoleToolkit.error(
                "No compatible Python installation was found."
            );
            return false;
        }

        csl_tool.ConsoleToolkit.information(
            `Compatible Python installations: ${compatibleVersions.join(", ")}`
        );

        return true;
    } catch {
        csl_tool.ConsoleToolkit.error(
            "Could not discover installed Python versions."
        );
        return false;
    }
}


export async function getInfoGD(): Promise<types.GDInfo | null> {
    try {
        const { stdout } = await execFileAsync(
            "py",
            ["-3.15", "-m", "pip", "show", "GeometricalDomination"]
        );

        const fields = new Map<string, string>();

        for (const line of stdout.trim().split(/\r?\n/)) {
            const separator = line.indexOf(":");

            if (separator === -1) continue;

            const key = line.slice(0, separator);
            const value = line.slice(separator + 1).trim();

            fields.set(key, value);
        }

        const name = fields.get("Name");
        const version = fields.get("Version");
        const summary = fields.get("Summary");
        const location = fields.get("Location");

        if (
            name === undefined ||
            version === undefined ||
            location === undefined
        ) {
            throw new Error("Incomplete GD package information.");
        }

        const requires = (fields.get("Requires") ?? "")
            .split(",")
            .map(dependency => dependency.trim())
            .filter(dependency => dependency.length > 0);

        const info: types.GDInfo = {
            name,
            version,
            summary: summary ?? "",
            location,
            requires
        };

        return info;

    } catch {
        csl_tool.ConsoleToolkit.information(
            "Could not retrieve GD package information."
        );
        return null;
    }
}