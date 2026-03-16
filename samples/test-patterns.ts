/**
 * Sample TypeScript file to test all Clippy pattern detection
 * This file covers regex patterns and symbol-based patterns
 */

// TODO: This tests the TODO pattern
// FIXME: This tests the FIXME pattern

// Logging pattern
console.log('Testing logging pattern');
console.warn('Warning message');
console.error('Error message');

// Debugger pattern
debugger;

// Function patterns
function regularFunction() {
    console.log('Inside regular function');
}

const arrowFunction = () => {
    console.log('Inside arrow function');
};

const asyncArrowFunction = async () => {
    await Promise.resolve();
};

// Class pattern
class TestClass {
    private name: string;
    private age: number;
    private email: string;
    private phone: string;
    private address: string;

    constructor(name: string) {
        this.name = name;
        this.age = 0;
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    // Method pattern
    public greet(): void {
        console.log(`Hello, ${this.name}`);
    }

    // Property getter
    public getName(): string {
        return this.name;
    }

    // Static method
    public static create(name: string): TestClass {
        return new TestClass(name);
    }
}

// Interface pattern
interface UserInterface {
    id: number;
    username: string;
    email: string;
    isActive: boolean;
    getData(): object;
    setData(data: object): void;
}

// Enum pattern
enum Status {
    Active = 'ACTIVE',
    Inactive = 'INACTIVE',
    Pending = 'PENDING',
    Deleted = 'DELETED',
}

// Type parameter pattern
function identity<T>(value: T): T {
    return value;
}

class GenericContainer<TItem> {
    private items: TItem[] = [];

    add(item: TItem): void {
        this.items.push(item);
    }
}

// Variable patterns
let mutableVariable = 'test';
const immutableConstant = 42;

// Async/await pattern
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com');
        return await response.json();
    } catch (error) {
        console.error('Error fetching data');
    }
}

// Try/catch pattern (error handling)
try {
    const result = riskyOperation();
    console.log(result);
} catch (error) {
    console.error('Operation failed');
}

function riskyOperation() {
    return 'success';
}

// Magic number pattern
const timeout = 5000;
const maxRetries = 3;
const bufferSize = 1024;

// Namespace pattern
namespace Utils {
    export function helper() {
        return 'helper function';
    }
}

// Module pattern - this file itself is a module

// Field pattern (in class)
class DataModel {
    public id: number = 0;
    public name: string = '';
    private createdAt: Date = new Date();
    protected updatedAt: Date = new Date();
}

// Property pattern
const config = {
    apiUrl: 'https://api.example.com',
    timeout: 3000,
    retries: 3,
};

// Constant with enum member
const currentStatus = Status.Active;

// Constructor pattern tested in classes above

// Event pattern (if supported)
class EventEmitter {
    private handlers: Map<string, Function[]> = new Map();

    on(event: string, handler: Function): void {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, []);
        }
        this.handlers.get(event)?.push(handler);
    }

    emit(event: string, data: any): void {
        this.handlers.get(event)?.forEach(h => h(data));
    }
}
