import {createAction, handleActions} from "redux-actions";

const SET_KOR_NAME = 'machineCreate/SET_KOR_NAME';
const SET_ENG_NAME = 'machineCreate/SET_ENG_NAME';
export const setKorName = createAction(SET_KOR_NAME);
export const setEngName = createAction(SET_ENG_NAME);

const initialState = {
    korName: '',
    engName: ''
}

export default handleActions({
    [SET_KOR_NAME]: (state, action) => ({...state, korName: action.payload}),
    [SET_ENG_NAME]: (state, action) => ({...state, engName: action.payload}),
}, initialState);
