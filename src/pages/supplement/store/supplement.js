import {createAction, handleActions} from "redux-actions";

const SET_SUPPLEMENT_LIST = 'supplement/SET_SUPPLEMENT_LIST';
export const setSupplementList = createAction(SET_SUPPLEMENT_LIST);

const SET_PAGE = 'supplement/SET_PAGE';
const SET_SIZE = 'supplement/SET_SIZE';
const SET_TOTAL = 'supplement/SET_TOTAL';
export const setPage = createAction(SET_PAGE);
export const setSize = createAction(SET_SIZE);
export const setTotal = createAction(SET_TOTAL);

const initialState = {
    supplementList: [],

    page: 1,
    size: 10,
    total: 0
}

export default handleActions({
    [SET_SUPPLEMENT_LIST]: (state, action) => ({...state, supplementList: action.payload}),
    [SET_PAGE]: (state, action) => ({...state, page: action.payload}),
    [SET_SIZE]: (state, action) => ({...state, size: action.payload}),
    [SET_TOTAL]: (state, action) => ({...state, total: action.payload}),
}, initialState);
