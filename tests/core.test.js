import { describe, it, expect } from 'vitest';
import { unique, groupBy, chunk, deepClone, memoize, counter } from '../src/functions.js';
import { Store, SortedStore } from '../src/Store.js';

describe('Functions Tests', () => {
    // 1
    it('unique: removes duplicates from regular array', () => {
        expect(unique([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
    });

    // 2
    it('unique: handles empty array and invalid input (edge cases)', () => {
        expect(unique([])).toEqual([]);
        expect(unique(null)).toEqual([]);
    });

    // 3
    it('groupBy: groups elements by key or function', () => {
        const arr = [{category: 'A', val: 1}, {category: 'B', val: 2}, {category: 'A', val: 3}];
        const res = groupBy(arr, 'category');
        expect(res.A.length).toBe(2);
        expect(res.B.length).toBe(1);
    });

    // 4
    it('groupBy: handles non-array input (edge case)', () => {
        expect(groupBy(null, 'key')).toEqual({});
    });

    // 5
    it('chunk: splits array into chunks of specified size', () => {
        expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    // 6
    it('chunk: handles empty array and invalid size (edge cases)', () => {
        expect(chunk([], 3)).toEqual([]);
        expect(chunk([1, 2, 3], 0)).toEqual([]);
    });

    // 7
    it('deepClone: clones objects, arrays and dates deeply', () => {
        const date = new Date('2026-01-01');
        const obj = { a: 1, arr: [1, 2], d: date };
        const clone = deepClone(obj);
        expect(clone).toEqual(obj);
        expect(clone.d).not.toBe(date);
    });

    // 8
    it('deepClone: handles primitives (edge case)', () => {
        expect(deepClone(123)).toBe(123);
        expect(deepClone(null)).toBeNull();
    });

    // 9
    it('memoize: caches results and works with closures', () => {
        let calls = 0;
        const fn = memoize((x) => { calls++; return x * 2; });
        expect(fn(2)).toBe(4);
        expect(fn(2)).toBe(4);
        expect(calls).toBe(1);
    });

    // 10
    it('counter: increments, decrements and tracks value via closure', () => {
        const c = counter(5);
        expect(c.value).toBe(5);
        expect(c.inc()).toBe(6);
        expect(c.dec()).toBe(5);
        expect(c.dec()).toBe(4);
    });
});

describe('Store Classes Tests', () => {
    // 11
    it('Store: adds, finds, removes items and calculates total price * qty', () => {
        const store = new Store();
        store.add({ name: 'Apple', price: 100, qty: 2 });
        store.add({ name: 'Banana', price: 50, qty: 4 });
        
        expect(store.total).toBe(400);
        expect(store.find('Apple').price).toBe(100);
        
        store.remove('Apple');
        expect(store.find('Apple')).toBeNull();
        expect(store.total).toBe(200);
    });

    // 12
    it('Store static method validation and SortedStore inheritance', () => {
        const validItem = { name: 'Orange', price: 80, qty: 3 };
        const invalidItem = { name: 'Bad' };
        
        expect(Store.validateItem(validItem)).toBe(true);
        expect(Store.validateItem(invalidItem)).toBe(false);
        
        const sortedStore = new SortedStore();
        sortedStore.add(validItem);
        expect(sortedStore.total).toBe(240);
    });
});