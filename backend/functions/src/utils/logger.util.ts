// CONTEXT: Provider-agnostic logger. Works with any cloud provider.
// Uses console.log by default, can be configured for provider-specific logging.

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export class Logger {
  private context?: string;

  constructor(context?: string) {
    this.context = context;
  }

  private log(level: LogLevel, message: string, metadata?: any) {
    const prefix = this.context ? `[${this.context}]` : '';
    const logMessage = `${prefix} ${message}`;

    switch (level) {
      case 'debug':
        console.debug(logMessage, metadata);
        break;
      case 'info':
        console.info(logMessage, metadata);
        break;
      case 'warn':
        console.warn(logMessage, metadata);
        break;
      case 'error':
        console.error(logMessage, metadata);
        break;
    }
  }

  debug(message: string, metadata?: any) {
    this.log('debug', message, metadata);
  }

  info(message: string, metadata?: any) {
    this.log('info', message, metadata);
  }

  warn(message: string, metadata?: any) {
    this.log('warn', message, metadata);
  }

  error(message: string, metadata?: any) {
    this.log('error', message, metadata);
  }
}

// Default logger instance
export const logger = new Logger();
