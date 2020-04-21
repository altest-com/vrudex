export const timeReader = function(time) {
    if (!time) {
        return time;
    }
    const d = new Date('1970-01-01T' + time);
    return isNaN(d) ? time : d;
};

export const dateReader = function(date) {
    if (!date) {
        return date;
    }
    const d = new Date(date + 'T00:00:00');
    return isNaN(d) ? date : d;
};

export const yearReader = function(year) {
    if (!year) {
        return year;
    }
    const date_ = new Date(`${year}-01-01T00:00:00`);
    return isNaN(date_) ? year : date_;
};

export const numberReader = function(val) {
    if (val === null) {
        return undefined;
    }
    return val;
};
