/**
 * JavaScript sample file to test Clippy patterns
 */

// TODO: Test TODO pattern in JavaScript
// FIXME: Test FIXME pattern in JavaScript

// Logging pattern
console.log('Testing console.log in JS');
console.warn('Warning in JS');
console.error('Error in JS');

// Debugger statement
debugger;

// Regular function
function calculateSum(a, b) {
    return a + b;
}

// Arrow function
const multiply = (a, b) => a * b;

// Async arrow function
const fetchUserData = async (userId) => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
};

// Class
class UserRepository {
    constructor(database) {
        this.database = database;
        this.cache = new Map();
        this.listeners = [];
    }

    async findById(id) {
        if (this.cache.has(id)) {
            return this.cache.get(id);
        }
        const user = await this.database.query('SELECT * FROM users WHERE id = ?', [id]);
        this.cache.set(id, user);
        return user;
    }

    static create(db) {
        return new UserRepository(db);
    }
}

// Try/catch error handling
try {
    const data = JSON.parse('invalid json');
    console.log(data);
} catch (error) {
    console.error('Failed to parse JSON:', error.message);
}

// Async/await pattern
async function processData() {
    try {
        const data = await fetchData();
        const processed = await transform(data);
        return processed;
    } catch (err) {
        console.error('Processing failed');
        throw err;
    }
}

function fetchData() {
    return Promise.resolve({ items: [] });
}

function transform(data) {
    return Promise.resolve(data);
}

// Magic numbers
const MAX_RETRIES = 5;
const TIMEOUT_MS = 30000;
const BUFFER_SIZE = 8192;

// Variables and constants
let counter = 0;
const API_KEY = 'secret-key-12345';

// Object with properties
const config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    maxConnections: 100,
};

// Module exports
module.exports = {
    calculateSum,
    multiply,
    UserRepository,
};
