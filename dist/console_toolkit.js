export class ConsoleToolkit {
    static success(message) {
        console.log(`\x1b[32m✅ ${message}\x1b[0m`);
    }
    static warning(message) {
        console.warn(`\x1b[33m⚠️ ${message}\x1b[0m`);
    }
    static error(message) {
        console.error(`\x1b[31m❌ ${message}\x1b[0m`);
    }
    static information(message) {
        console.info(`\x1b[36mℹ️ ${message}\x1b[0m`);
    }
}
//# sourceMappingURL=console_toolkit.js.map