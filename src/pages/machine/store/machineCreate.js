import {createAction, handleActions} from "redux-actions";

const SET_KOR_NAME = 'machineCreate/SET_KOR_NAME';
const SET_ENG_NAME = 'machineCreate/SET_ENG_NAME';
const PUSH_SELECTED_BODY_PART = 'machineCreate/PUSH_SELECTED_BODY_PART';
const POP_SELECTED_BODY_PART = 'machineCreate/POP_SELECTED_BODY_PART';
export const setKorName = createAction(SET_KOR_NAME);
export const setEngName = createAction(SET_ENG_NAME);
export const pushSelectedBodyPart = createAction(PUSH_SELECTED_BODY_PART);
export const popSelectedBodyPart = createAction(POP_SELECTED_BODY_PART);

const initialState = {
    korName: '',
    engName: '',
    selectedBodyPartList: [],
}

export default handleActions({
    [SET_KOR_NAME]: (state, action) => ({...state, korName: action.payload}),
    [SET_ENG_NAME]: (state, action) => ({...state, engName: action.payload}),
    [PUSH_SELECTED_BODY_PART]: (state, action) => ({...state, selectedBodyPartList: state.selectedBodyPartList.concat(action.payload)}),
    [POP_SELECTED_BODY_PART]: (state, action) => ({...state, selectedBodyPartList: state.selectedBodyPartList.filter(bodyPart => bodyPart.id !== action.payload)}),
}, initialState);
