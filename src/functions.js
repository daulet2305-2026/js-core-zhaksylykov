// 1. Уникальные элементы массива
export function unique(arr) {
    if (!Array.isArray(arr)) return [];
    return [...new Set(arr)];
}

// 2. Группировка объектов по ключу/функции
export function groupBy(arr, keyFn) {
    if (!Array.isArray(arr)) return {};
    return arr.reduce((acc, item) => {
        const key = typeof keyFn === 'function' ? keyFn(item) : item[keyFn];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {});
}

// 3. Разбиение массива на чанки заданного размера
export function chunk(arr, size) {
    if (!Array.isArray(arr) || size <= 0) return [];
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

// 4. Глубокое клонирование (объекты, массивы, Date)
export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    if (Array.isArray(obj)) {
        return obj.reduce((acc, item, index) => {
            acc[index] = deepClone(item);
            return acc;
        }, []);
    }
    const cloneObj = Object.create(Object.getPrototypeOf(obj));
    return Object.keys(obj).reduce((acc, key) => {
        acc[key] = deepClone(obj[key]);
        return acc;
    }, cloneObj);
}

// 5. Мемоизация на замыкании
export function memoize(fn) {
    const cache = new Map();
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

// 6. Фабрика счетчика на замыкании
export function counter(initialValue = 0) {
    let count = initialValue;
    return {
        inc: () => ++count,
        dec: () => --count,
        get value() {
            return count;
        }
    };
}