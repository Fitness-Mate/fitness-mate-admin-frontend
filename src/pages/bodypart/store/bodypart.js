import {createAction, handleActions} from "redux-actions";

const SET_PAGE = 'bodypart/SET_PAGE';
const SET_SIZE = 'bodypart/SET_SIZE';
const SET_TOTAL = 'bodypart/SET_TOTAL';

export const setPage = createAction(SET_PAGE);
export const setSize = createAction(SET_SIZE);
export const setTotal = createAction(SET_TOTAL);

const initialState = {
    page: 1,
    size: 10,
    total: 0
}

export default handleActions({
    [SET_PAGE]: (state, action) => ({...state, page: action.payload}),
    [SET_SIZE]: (state, action) => ({...state, size: action.payload}),
    [SET_TOTAL]: (state, action) => ({...state, total: action.payload}),
}, initialState);
