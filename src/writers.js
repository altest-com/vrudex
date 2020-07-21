export const timeWriter = function(date) {
    if (date) {
        let date_ = new Date(date);
        if (!isNaN(date_)) {
            date_ = new Date(date_ - date_.getTimezoneOffset() * 60000);
            return date_.toISOString().substring(11, 19);
        }
    }
    return null;
};

export const dateWriter = function(date) {
    if (date) {
        let date_ = new Date(date);
        if (!isNaN(date_)) {
            date_ = new Date(date_ - date_.getTimezoneOffset() * 60000);
            return date_.toISOString().substring(0, 10);
        }
    }
    return null;
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
