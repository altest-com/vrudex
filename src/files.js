import { mutTypes } from './types';
import FileSaver from 'file-saver';
import { delEmpty } from './utils';

function fetchFile(context, {params = {}, path = '', name = ''}) {
    const state = context.state;
    const filter = state.FILTER;
    const api = state.API;
    const filterData = filter ? filter.apiPost(state.filter, false) : {};

    params = Object.assign({}, filterData, {
        limit: state.pageSize,
        offset: state.pageNumber * state.pageSize
    }, delEmpty(params));

    params = Object.assign({}, params, filterData);

    context.commit(mutTypes.SET_LOADING, true);

    return new Promise((resolve, reject) => {
        api.download(path, params).then((response) => {
            const fileNameHeader = 'filename';
            let fileName = response.headers[fileNameHeader] || name;
            if (!fileName) {
                fileName = String(new Date().getTime()).slice(-8);
            }
            // Let the user save the file.
            FileSaver.saveAs(response.data, fileName);
            context.commit(mutTypes.SET_LOADING, false);
            resolve();
        }).catch(error => {
            context.commit(mutTypes.SET_LOADING, false);
            reject(error);
        });
    });
}

export {
    fetchFile
};
