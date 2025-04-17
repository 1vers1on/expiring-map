# expiring-map

A lightweight TypeScript library providing data structures with automatic expiration functionality.

## Installation

```bash
npm install expiring-map
```

## Features

- [`ExpiringMap`](src/index.ts) - A Map-like data structure where entries expire after a specified time
- [`ExpiringSet`](src/index.ts) - A Set-like data structure where elements expire after a specified time
- Fully typed with TypeScript
- No dependencies
- Implements standard collection methods and iterators

## Usage

### ExpiringMap

```typescript
import { ExpiringMap } from 'expiring-map';

// Create a map with entries that expire after 5000ms (5 seconds)
const cache = new ExpiringMap<string, any>(5000);

// Add items to the map
cache.set('user1', { name: 'John', age: 30 });
cache.set('user2', { name: 'Jane', age: 25 });

// Get an item
const user = cache.get('user1'); // Returns the user object

// Check if an item exists
if (cache.has('user1')) {
  console.log('User exists in cache');
}

// After 5 seconds, the entries will be automatically removed
setTimeout(() => {
  console.log(cache.has('user1')); // false
  console.log(cache.size); // 0
}, 6000);

// Manually delete an entry
cache.delete('user1');

// Clear all entries
cache.clear();
```

### ExpiringSet

```typescript
import { ExpiringSet } from 'expiring-map';

// Create a set with elements that expire after 10000ms (10 seconds)
const recentUsers = new ExpiringSet<string>(10000);

// Add items to the set
recentUsers.add('user123');
recentUsers.add('user456');

// Check if an element exists
if (recentUsers.has('user123')) {
  console.log('User recently active');
}

// After 10 seconds, the elements will be automatically removed
setTimeout(() => {
  console.log(recentUsers.has('user123')); // false
  console.log(recentUsers.size); // 0
}, 11000);

// Iterate over the set
for (const user of recentUsers) {
  console.log(user);
}

// Manually delete an element
recentUsers.delete('user123');

// Clear all elements
recentUsers.clear();
```

## API Reference

### ExpiringMap<K, V>

A Map-like collection where each entry expires after a specified time.

#### Constructor

- `constructor(ttl: number)` - Creates a new ExpiringMap with the specified time-to-live in milliseconds

#### Methods

- `set(key: K, value: V): this` - Adds or updates an entry
- `get(key: K): V | undefined` - Retrieves an entry's value
- `has(key: K): boolean` - Checks if an entry exists
- `delete(key: K): boolean` - Removes an entry
- `clear(): void` - Removes all entries
- `keys(): IterableIterator<K>` - Returns an iterator of all keys
- `values(): IterableIterator<V>` - Returns an iterator of all values
- `entries(): IterableIterator<[K, V]>` - Returns an iterator of all [key, value] pairs

#### Properties

- `size: number` - The number of entries in the map

### ExpiringSet<T>

A Set-like collection where each element expires after a specified time.

#### Constructor

- `constructor(ttl: number)` - Creates a new ExpiringSet with the specified time-to-live in milliseconds

#### Methods

- `add(value: T): this` - Adds an element
- `has(value: T): boolean` - Checks if an element exists
- `delete(value: T): boolean` - Removes an element
- `clear(): void` - Removes all elements
- `values(): IterableIterator<T>` - Returns an iterator of all values
- `keys(): IterableIterator<T>` - Returns an iterator of all values
- `entries(): IterableIterator<[T, T]>` - Returns an iterator of all [value, value] pairs

#### Properties

- `size: number` - The number of elements in the set

## License

MIT
