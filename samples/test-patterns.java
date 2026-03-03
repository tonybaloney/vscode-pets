/**
 * Java sample file to test Clippy symbol-based patterns
 */

package com.example.samples;

import java.util.*;
import java.util.concurrent.CompletableFuture;

// TODO: Test TODO pattern in Java
// FIXME: Test FIXME pattern in Java

// Enum pattern
public enum Status {
    ACTIVE("active"),
    INACTIVE("inactive"),
    PENDING("pending"),
    DELETED("deleted");

    private final String value;

    Status(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

// Interface pattern
interface UserRepository {
    User findById(int id);
    List<User> findAll();
    void save(User user);
    void delete(int id);
}

// Class pattern
class DatabaseUserRepository implements UserRepository {
    // Field patterns
    private final Database database;
    private final Map<Integer, User> cache;
    private final List<String> listeners;
    private int retryCount;
    private static final int MAX_RETRIES = 5;

    // Constructor pattern
    public DatabaseUserRepository(Database database) {
        this.database = database;
        this.cache = new HashMap<>();
        this.listeners = new ArrayList<>();
        this.retryCount = 0;
    }

    // Method pattern
    @Override
    public User findById(int id) {
        if (cache.containsKey(id)) {
            return cache.get(id);
        }

        User user = database.query("SELECT * FROM users WHERE id = ?", id);
        cache.put(id, user);
        return user;
    }

    @Override
    public List<User> findAll() {
        return database.queryAll("SELECT * FROM users");
    }

    @Override
    public void save(User user) {
        database.execute("INSERT INTO users VALUES (?)", user);
        cache.put(user.getId(), user);
    }

    @Override
    public void delete(int id) {
        database.execute("DELETE FROM users WHERE id = ?", id);
        cache.remove(id);
    }

    // Static method
    public static DatabaseUserRepository create(Database db) {
        return new DatabaseUserRepository(db);
    }

    // Property (getter/setter)
    public int getCacheSize() {
        return cache.size();
    }
}

// Generic class (TypeParameter pattern)
class Container<T> {
    private List<T> items;

    public Container() {
        this.items = new ArrayList<>();
    }

    public void add(T item) {
        items.add(item);
    }

    public List<T> getAll() {
        return new ArrayList<>(items);
    }
}

// Class with multiple members
class User {
    private int id;
    private String name;
    private String email;
    private Status status;
    private Date createdAt;

    public User(int id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.status = Status.ACTIVE;
        this.createdAt = new Date();
    }

    // Getters and setters
    public int getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
}

// Try/catch pattern (error handling)
class JsonParser {
    public static Map<String, Object> parse(String json) {
        try {
            // Simulated JSON parsing
            return parseJson(json);
        } catch (Exception error) {
            System.err.println("Failed to parse JSON: " + error.getMessage());
            throw error;
        }
    }

    private static Map<String, Object> parseJson(String json) {
        return new HashMap<>();
    }
}

// Async pattern (CompletableFuture)
class AsyncDataFetcher {
    public CompletableFuture<User> fetchUserAsync(int userId) {
        return CompletableFuture.supplyAsync(() -> {
            // Simulated async operation
            return new User(userId, "Test User", "test@example.com");
        });
    }
}

// Constants
class Constants {
    public static final int TIMEOUT_MS = 30000;
    public static final int MAX_CONNECTIONS = 100;
    public static final int BUFFER_SIZE = 8192;
}

// Stub classes
class Database {
    public User query(String sql, Object... params) { return null; }
    public List<User> queryAll(String sql) { return new ArrayList<>(); }
    public void execute(String sql, Object... params) {}
}
