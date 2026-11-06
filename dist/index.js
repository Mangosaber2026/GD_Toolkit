import { checkPython, getInfoGD } from "./utilities.js";
import { ConsoleToolkit } from "./console_toolkit.js";
async function main() {
    ConsoleToolkit.information("GD_Toolkit started!");
    const compatible = await checkPython();
    if (!compatible) {
        ConsoleToolkit.error("GD environment check failed!");
        return;
    }
    await getInfoGD();
    ConsoleToolkit.success("GD environment check passed!");
}
main();
//# sourceMappingURL=index.js.map