import nodeProcess from "node:process";
const commands = {
    validate_system: async () => {
        console.log("System validation has not been implemented yet.");
    }
};
function displayHelp() {
    console.log(`
GD_Toolkit Publishing CLI

Usage:
    gd-publish <command> [options]

Commands:
    validate_system    Validate publishing prerequisites

Options:
    --help, -h         Display this help message
`);
}
async function main() {
    const [command, ...args] = nodeProcess.argv.slice(2);
    if (!command || command === "--help" || command === "-h") {
        displayHelp();
        return;
    }
    const handler = commands[command];
    if (!handler) {
        console.error(`Unknown command: ${command}`);
        displayHelp();
        nodeProcess.exitCode = 1;
        return;
    }
    await handler(args);
}
main().catch((error) => {
    const message = error instanceof Error
        ? error.message
        : String(error);
    console.error(`Publishing CLI error: ${message}`);
    nodeProcess.exitCode = 1;
});
