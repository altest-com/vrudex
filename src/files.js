import {mutTypes} from './types';
import FileSaver from 'file-saver';

function fetchFile(context, params) {
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
        api.download(params).then((response) => {
            const fileNameHeader = 'filename';
            let fileName = response.headers[fileNameHeader];
            if (!fileName) {
                const date = new Date().toISOString().slice(0, 16);
                fileName = `activos-${date}.xls`;
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
