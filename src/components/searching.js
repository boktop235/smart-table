import {rules, createComparison} from "../lib/compare.js";

export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    const searchRules = [
        rules.skipEmptyTargetValues, // пропускаем пустые значения в цели сравнения
        rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false) // поиск по нескольким полям
    ];
    const compare = createComparison(searchRules);

    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        return data.filter(row => compare(row, state));
    }
}