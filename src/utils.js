function isEmpty(value) {
    return [undefined, null, '', NaN].includes(value);
}

function delEmpty(data) {
    const _data = {};
    Object.keys(data).forEach(key => {
        if (!isEmpty(data[key])) {
            _data[key] = data[key];
        }
    });
    return _data;
}

export {
    isEmpty,
    delEmpty
};
