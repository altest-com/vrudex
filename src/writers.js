export const timeWriter = function(date) {
    if (!date) {
        return date;
    }
    const d = new Date(date);
    return isNaN(d) ? date : d.toISOString().substring(11, 19);
};

export const dateWriter = function(date) {
    if (!date) {
        return date;
    }
    const d = new Date(date);
    return isNaN(d) ? date : d.toISOString().substring(0, 10);
};

export const yearWriter = function(date) {
    if (!date) {
        return date;
    }
    const date_ = new Date(date);
    return isNaN(date_) ? date_ : date_.getFullYear();
};

export const numberWriter = function(val) {
    if (val === undefined) {
        return null;
    }
    return val;
};
