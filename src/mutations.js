import Vue from 'vue';

const SET_ITEMS = (state, items) => {
    for (const key in items) {
        Vue.set(state.items, key, items[key]);
    }    
};

const SET_SORT = (state, sortId) => {   
    state.sortId = sortId;
};

const DEL_ITEM = (state, id) => {
    Vue.set(state.items, id, null);
    if (state.sortId) {
        state.sortId = state.sortId.filter(sortId => sortId !== id);
    }
};

const SET_ITEM = (state, item) => {
    if (state.items[item.id] === undefined) {
        Vue.set(state.items, item.id, item);
    } else {
        for (const key in item) {
            state.items[item.id][key] = item[key];
        }
    }    
};

const SET_COUNT = (state, count) => {
    state.count = count;
};

const SET_LOADING = (state, loading) => {
    state.loading = loading;
};

const SET_FILTER = (state, filter) => {
    for (const key in filter) {
        Vue.set(state.filter, key, filter[key]);
    }
};

const RESET_FILTER = (state) => {
    state.filter = state.FILTER.create();
};

const SET_ORDER = (state, order) => {
    state.orderBy = order;
};

const SET_PAGE = (state, number) => {
    state.pageNumber = number;
};

const SET_PAGE_SIZE = (state, size) => {
    state.pageSize = size;
};

const SET_GETTING = (state, {id, value}) => {
    state.getting[id] = value;
};

export {
    SET_ITEM,
    SET_ITEMS,
    SET_SORT,
    DEL_ITEM,
    SET_COUNT,
    SET_LOADING,
    SET_FILTER,
    RESET_FILTER,
    SET_ORDER,
    SET_PAGE,
    SET_PAGE_SIZE,
    SET_GETTING
};
