"""
Python sample file to test Clippy symbol-based patterns
"""

# TODO: Test TODO in Python
# FIXME: Test FIXME in Python

from typing import List, Optional, Generic, TypeVar
from enum import Enum


# Class pattern
class UserRepository:
    """Repository for managing users"""

    def __init__(self, database):
        self.database = database
        self.cache = {}
        self.listeners = []
        self.retry_count = 0
        self.max_retries = 3

    # Method pattern
    def find_by_id(self, user_id: int) -> Optional[dict]:
        """Find user by ID"""
        if user_id in self.cache:
            return self.cache[user_id]

        user = self.database.query(f"SELECT * FROM users WHERE id = {user_id}")
        self.cache[user_id] = user
        return user

    # Static method
    @staticmethod
    def create(database):
        """Factory method to create repository"""
        return UserRepository(database)

    # Property
    @property
    def cache_size(self) -> int:
        """Get current cache size"""
        return len(self.cache)


# Enum pattern
class Status(Enum):
    """User status enumeration"""
    ACTIVE = "active"
    INACTIVE = "inactive"
    PENDING = "pending"
    DELETED = "deleted"


# Function pattern
def calculate_sum(a: int, b: int) -> int:
    """Calculate sum of two numbers"""
    return a + b


async def fetch_user_data(user_id: int) -> dict:
    """Async function to fetch user data"""
    # Simulated async operation
    return {"id": user_id, "name": "User"}


# Try/except pattern (error handling)
def parse_json(data: str):
    """Parse JSON with error handling"""
    try:
        import json
        result = json.loads(data)
        return result
    except ValueError as error:
        print(f"Failed to parse JSON: {error}")
        raise


# Generic class (TypeVar pattern)
T = TypeVar('T')

class Container(Generic[T]):
    """Generic container class"""

    def __init__(self):
        self.items: List[T] = []

    def add(self, item: T) -> None:
        """Add item to container"""
        self.items.append(item)

    def get_all(self) -> List[T]:
        """Get all items"""
        return self.items


# Interface pattern (Protocol in Python)
from typing import Protocol

class Drawable(Protocol):
    """Interface for drawable objects"""

    def draw(self) -> None:
        """Draw the object"""
        ...

    def get_bounds(self) -> tuple:
        """Get object bounds"""
        ...


# Constants
MAX_RETRIES = 5
TIMEOUT_SECONDS = 30
BUFFER_SIZE = 8192


# Variables
counter = 0
api_key = "secret-key-12345"


# Namespace pattern (module level)
class Utils:
    """Utility namespace"""

    @staticmethod
    def helper_function():
        """Helper function"""
        return "helper"


# Constructor pattern is in __init__ methods above


if __name__ == "__main__":
    repo = UserRepository.create(None)
    user = repo.find_by_id(1)
    print(f"Found user: {user}")
