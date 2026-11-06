export class ConsoleToolkit {
    static success(message: string): void {
        console.log(`\x1b[32m✅ ${message}\x1b[0m`);
    }

    static warning(message: string): void {
        console.warn(`\x1b[33m⚠️ ${message}\x1b[0m`);
    }

    static error(message: string): void {
        console.error(`\x1b[31m❌ ${message}\x1b[0m`);
    }

    static information(message: string): void {
        console.info(`\x1b[36mℹ️ ${message}\x1b[0m`);
    }
}