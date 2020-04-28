const hasOwnProperty = Object.prototype.hasOwnProperty;

const isEmpty = function(val) {
    return val === undefined || val === null || val === '';
};

class Model {
    constructor() {
        this.props = {};
    }    

    create() {
        const data = {};
        Object.keys(this.props).forEach(key => {            
            data[key] = this.propValue(key);
        });
        return data;
    }

    propValue(key) {
        const prop = this.props[key]; 
        let val = null;
        if (hasOwnProperty.call(prop, 'default')) {
            val = typeof prop.default === 'function' ? 
                prop.default() : prop.default;            
        } else if (prop.many === true) {
            val = [];
        } else if (prop.choices !== undefined && prop.choices.length) {
            val = prop.choices[0];
        } else if (prop.model !== undefined) {
            val = prop.model.create();
        } else if (prop.type !== undefined) {
            const type = prop.type;
            switch (type) {
                case Number:
                    val = undefined;
                    break;
                case Date:
                    val = null;
                    break;
                case String:
                    val = '';
                    break;
                case Object:
                    val = {};
                    break;
                case Boolean:
                    val = null;
                    break;
                default:
                    console.warn(`Unknown prop type "${type}".`);
                    break;
            }
        }
        return val;
    }

    apiGet(apiData = {}) {
        const data = {};
        const model = this.constructor.name;

        Object.keys(this.props).forEach(key => {
            const prop = this.props[key];
            if (prop.api) { 
                if (hasOwnProperty.call(apiData, prop.api)) {
                    const value = apiData[prop.api];
                    if (prop.model) {
                        if (prop.many === true) {
                            data[key] = [];
                            value.forEach(apiProp => {
                                data[key].push(prop.model.apiGet(apiProp));
                            });
                        } else {
                            data[key] = prop.model.apiGet(value);
                        }
                    } else {
                        if (prop.many === true) {
                            data[key] = [];
                            if (Array.isArray(value)) {
                                value.forEach(apiProp => {
                                    if (prop.reader) {
                                        data[key].push(prop.reader(apiProp));
                                    } else {
                                        data[key].push(apiProp);
                                    }                                    
                                });
                            } else {
                                console.warn(
                                    `Data for API key ${prop.api} is not an array for model ${model}.`);
                            }                            
                        } else {
                            if (prop.reader) {
                                data[key] = prop.reader(value);
                            } else {
                                data[key] = value;
                            }                            
                        }
                    }
                } else {
                    if (prop.fill) {
                        data[key] = this.propValue(key);
                    } else if (!prop.optional) {
                        console.warn(
                            `Missed API key ${prop.api} for model ${model}.`
                        );
                    }  
                }
            } else {
                data[key] = this.propValue(key);
            }            
            this.checkChoice(data[key], prop, prop.api);
        });
        return data;
    }

    apiPost(data = {}, empty = true) {
        const apiData = {};

        Object.keys(data).forEach(key => {
            const prop = this.props[key];
            if (hasOwnProperty.call(this.props, key) && prop.writable) {
                const value = data[key];
                var valid = this.checkChoice(value, prop, prop.api);
                if (valid && (empty || !isEmpty(value))) {
                    const apiProp = prop.api;
                    if (prop.writer) {
                        apiData[apiProp] = prop.writer(value);
                    } else if (prop.model) {
                        apiData[apiProp] = prop.model.apiPost(value);
                    } else {
                        apiData[apiProp] = value;
                    }                    
                }
            }            
        });
        return apiData;
    }

    checkChoice(value, prop, key) {
        const model = this.constructor.name;

        if (prop.choices && prop.choices.length) {
            if (prop.many) {
                for (let i = 0; i < value.length; i++) {
                    if (prop.choices.indexOf(value[i]) === -1) {
                        console.warn(`Value "${value[i]}" for key "${key}" not in choices for model ${model}.`);
                        return false;
                    }                
                }
            } else {
                if (prop.choices.indexOf(value) === -1) {
                    console.warn(`Value "${value}" for key "${key}" not in choices for model ${model}.`);
                    return false;
                }
            }
        }        
        return true;
    }
}

export default Model;

