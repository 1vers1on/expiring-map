type TimeoutEntry = ReturnType<typeof setTimeout>;

type Entry<V> = {
	value: V;
	timeout: TimeoutEntry;
};

class ExpiringMap<K, V> {
	private map = new Map<K, Entry<V>>();
	private ttl: number;

	constructor(ttl: number) {
		this.ttl = ttl;
	}

	set(key: K, value: V): this {
		if (this.map.has(key)) {
			clearTimeout(this.map.get(key)!.timeout);
		}

		const timeout = setTimeout(() => {
			this.map.delete(key);
		}, this.ttl);

		this.map.set(key, { value, timeout });
		return this;
	}

	get(key: K): V | undefined {
		return this.map.get(key)?.value;
	}

	has(key: K): boolean {
		return this.map.has(key);
	}

	delete(key: K): boolean {
		const entry = this.map.get(key);
		if (entry) {
			clearTimeout(entry.timeout);
			this.map.delete(key);
			return true;
		}
		return false;
	}

	clear(): void {
		for (const { timeout } of this.map.values()) {
			clearTimeout(timeout);
		}
		this.map.clear();
	}

	keys(): IterableIterator<K> {
		return this.map.keys();
	}

	values(): IterableIterator<V> {
		return Array.from(this.map.values()).map(e => e.value).values();
	}

	entries(): IterableIterator<[K, V]> {
		return Array.from(this.map.entries()).map(([k, e]) => [k, e.value] as [K, V]).values();
	}

	[Symbol.iterator](): IterableIterator<[K, V]> {
		return this.entries();
	}

	get size(): number {
		return this.map.size;
	}
}

class ExpiringSet<T> {
	private set = new Set<T>();
	private timers = new Map<T, TimeoutEntry>();
	private ttl: number;

	constructor(ttl: number) {
		this.ttl = ttl;
	}

	add(value: T): this {
		if (this.set.has(value)) {
			clearTimeout(this.timers.get(value)!);
		}

		this.set.add(value);
		const timeout = setTimeout(() => {
			this.set.delete(value);
			this.timers.delete(value);
		}, this.ttl);

		this.timers.set(value, timeout);
		return this;
	}

	has(value: T): boolean {
		return this.set.has(value);
	}

	delete(value: T): boolean {
		const existed = this.set.delete(value);
		if (existed) {
			clearTimeout(this.timers.get(value)!);
			this.timers.delete(value);
		}
		return existed;
	}

	clear(): void {
		for (const timeout of this.timers.values()) {
			clearTimeout(timeout);
		}
		this.set.clear();
		this.timers.clear();
	}

	values(): IterableIterator<T> {
		return this.set.values();
	}

	entries(): IterableIterator<[T, T]> {
		return this.set.entries();
	}

	keys(): IterableIterator<T> {
		return this.set.keys();
	}

	[Symbol.iterator](): IterableIterator<T> {
		return this.set[Symbol.iterator]();
	}

	get size(): number {
		return this.set.size;
	}
}

export { ExpiringMap, ExpiringSet };
