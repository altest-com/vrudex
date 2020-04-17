function sortedItems(state) {
    const sortedItems = [];
    state.sortId.forEach(id => {
        sortedItems.push(state.items[id]);
    });
    return sortedItems;
}

export {
    sortedItems
};

