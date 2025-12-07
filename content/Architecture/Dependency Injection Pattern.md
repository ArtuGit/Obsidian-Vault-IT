**Dependency Injection (DI)** is a design pattern where an object receives its dependencies from an external source rather than creating them itself. It improves modularity and makes code easier to test and maintain.

Here are some **TypeScript examples** demonstrating the **Constructor Injection**, **Property Injection**, and **Method Injection** styles.

1. **Constructor Injection**
```Typescript
interface ILogger {
  log(message: string): void;
}

class ConsoleLogger implements ILogger {
  log(message: string) {
    console.log(`ConsoleLogger: ${message}`);
  }
}

class AppService {
  constructor(private logger: ILogger) {}

  doWork() {
    this.logger.log('Doing some important work...');
  }
}

// Usage
const logger = new ConsoleLogger();
const service = new AppService(logger);
service.doWork();
```
2. **Property Injection**
```TypeScript
interface ILogger {
  log(message: string): void;
}

class FileLogger implements ILogger {
  log(message: string) {
    console.log(`FileLogger: ${message}`);
  }
}

class Worker {
  logger!: ILogger; // Will be injected later

  runTask() {
    if (!this.logger) throw new Error('Logger not injected');
    this.logger.log('Running a task...');
  }
}

// Usage
const worker = new Worker();
worker.logger = new FileLogger(); // Property Injection
worker.runTask();

```
3. **Method Injection**
```Typescript
interface ILogger {
  log(message: string): void;
}

class RemoteLogger implements ILogger {
  log(message: string) {
    console.log(`RemoteLogger: ${message}`);
  }
}

class TaskRunner {
  run(logger: ILogger) {
    logger.log('Executing task using method injection...');
  }
}

// Usage
const taskRunner = new TaskRunner();
const logger = new RemoteLogger();
taskRunner.run(logger);

```
