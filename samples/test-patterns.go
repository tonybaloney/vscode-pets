// Go sample file to test Clippy symbol-based patterns
package samples

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"time"
)

// TODO: Test TODO pattern in Go
// FIXME: Test FIXME pattern in Go

// Constants
const (
	MaxRetries   = 5
	TimeoutMS    = 30000
	BufferSize   = 8192
	APIEndpoint  = "https://api.example.com"
)

// Enum-like pattern using iota
type Status int

const (
	StatusActive Status = iota
	StatusInactive
	StatusPending
	StatusDeleted
)

// Struct pattern (similar to class)
type User struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Status    Status    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
}

// Interface pattern
type UserRepository interface {
	FindByID(id int) (*User, error)
	FindAll() ([]*User, error)
	Save(user *User) error
	Delete(id int) error
}

// Struct implementing interface (class-like)
type DatabaseUserRepository struct {
	database Database
	cache    map[int]*User
	retries  int
}

// Constructor pattern (factory function)
func NewDatabaseUserRepository(db Database) *DatabaseUserRepository {
	return &DatabaseUserRepository{
		database: db,
		cache:    make(map[int]*User),
		retries:  0,
	}
}

// Method pattern
func (r *DatabaseUserRepository) FindByID(id int) (*User, error) {
	// Check cache
	if user, ok := r.cache[id]; ok {
		return user, nil
	}

	// Query database
	user, err := r.database.Query("SELECT * FROM users WHERE id = ?", id)
	if err != nil {
		return nil, err
	}

	// Cache result
	r.cache[id] = user
	return user, nil
}

func (r *DatabaseUserRepository) FindAll() ([]*User, error) {
	return r.database.QueryAll("SELECT * FROM users")
}

func (r *DatabaseUserRepository) Save(user *User) error {
	err := r.database.Execute("INSERT INTO users VALUES (?)", user)
	if err != nil {
		return err
	}

	r.cache[user.ID] = user
	return nil
}

func (r *DatabaseUserRepository) Delete(id int) error {
	err := r.database.Execute("DELETE FROM users WHERE id = ?", id)
	if err != nil {
		return err
	}

	delete(r.cache, id)
	return nil
}

// Function pattern
func CalculateSum(a, b int) int {
	return a + b
}

// Async pattern (goroutine with channel)
func FetchUserDataAsync(userID int) <-chan *User {
	result := make(chan *User, 1)

	go func() {
		// Simulated async operation
		user := &User{
			ID:        userID,
			Name:      "Test User",
			Email:     "test@example.com",
			Status:    StatusActive,
			CreatedAt: time.Now(),
		}
		result <- user
	}()

	return result
}

// Context-based async pattern
func FetchUserWithContext(ctx context.Context, userID int) (*User, error) {
	// Simulated async operation with context
	select {
	case <-ctx.Done():
		return nil, ctx.Err()
	case <-time.After(100 * time.Millisecond):
		return &User{ID: userID, Name: "Test"}, nil
	}
}

// Error handling pattern
func ParseJSON(data []byte) (map[string]interface{}, error) {
	var result map[string]interface{}

	// Try/catch equivalent in Go
	err := json.Unmarshal(data, &result)
	if err != nil {
		fmt.Printf("Failed to parse JSON: %v\n", err)
		return nil, err
	}

	return result, nil
}

// Generic function pattern (Go 1.18+)
func Identity[T any](value T) T {
	return value
}

// Generic struct pattern
type Container[T any] struct {
	items []T
}

func NewContainer[T any]() *Container[T] {
	return &Container[T]{
		items: make([]T, 0),
	}
}

func (c *Container[T]) Add(item T) {
	c.items = append(c.items, item)
}

func (c *Container[T]) GetAll() []T {
	return c.items
}

// Variable patterns
var (
	globalCounter int
	apiKey        string = "secret-key-12345"
)

// Stub types
type Database interface {
	Query(sql string, args ...interface{}) (*User, error)
	QueryAll(sql string) ([]*User, error)
	Execute(sql string, args ...interface{}) error
}

// Custom error
var (
	ErrUserNotFound = errors.New("user not found")
	ErrInvalidInput = errors.New("invalid input")
)
