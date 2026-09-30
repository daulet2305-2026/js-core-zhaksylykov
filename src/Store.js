export class Store {
    #items = []; // Приватное поле

    add(item) {
        if (item && typeof item === 'object') {
            this.#items.push(item);
        }
    }

    remove(name) {
        this.#items = this.#items.filter(item => item.name !== name);
    }

    find(name) {
        return this.#items.find(item => item.name === name) || null;
    }

    get total() { // Геттер для общей суммы price * qty
        return this.#items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    }

    get items() {
        return [...this.#items];
    }

    static validateItem(item) {
        return item && typeof item.name === 'string' && typeof item.price === 'number' && typeof item.qty === 'number';
    }
}

export class SortedStore extends Store {
    // Переопределение метода add с использованием super
    add(item) {
        super.add(item);
        // Дополнительная логика, например, сортировка по имени
        // (в данном примере просто вызываем родительский метод)
    }
}