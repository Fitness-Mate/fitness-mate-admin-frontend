import {createAction, handleActions} from "redux-actions";

const SET_KOR_NAME = 'workoutCreate/SET_KOR_NAME';
const SET_ENG_NAME = 'workoutCreate/SET_ENG_NAME';
const SET_IMAGE = 'workoutCreate/SET_IMAGE';
const SET_DESCRIPTION = 'workoutCreate/SET_DESCRIPTION';
const SET_VIDEO_LINK = 'workoutCreate/SET_VIDEO_LINK';
const PUSH_SELECTED_BODY_PART = 'workoutCreate/PUSH_SELECTED_BODY_PART';
const POP_SELECTED_BODY_PART = 'workoutCreate/POP_SELECTED_BODY_PART';
const PUSH_SELECTED_MACHINE = 'workoutCreate/PUSH_SELECTED_MACHINE';
const POP_SELECTED_MACHINE = 'workoutCreate/POP_SELECTED_MACHINE';

export const setKorName = createAction(SET_KOR_NAME);
export const setEngName = createAction(SET_ENG_NAME);
export const setImage = createAction(SET_IMAGE);
export const setDescription = createAction(SET_DESCRIPTION);
export const setVideoLink = createAction(SET_VIDEO_LINK);
export const pushSelectedBodyPart = createAction(PUSH_SELECTED_BODY_PART);
export const popSelectedBodyPart = createAction(POP_SELECTED_BODY_PART);
export const pushSelectedMachine = createAction(PUSH_SELECTED_MACHINE);
export const popSelectedMachine = createAction(POP_SELECTED_MACHINE);

const initialState = {
    korName: '',
    engName: '',
    image: null,
    description: '',
    videoLink: '',
    selectedBodyPartList: [],
    selectedMachineList: []
}

export default handleActions({
    [SET_KOR_NAME]: (state, action) => ({...state, korName: action.payload}),
    [SET_ENG_NAME]: (state, action) => ({...state, engName: action.payload}),
    [SET_IMAGE]: (state, action) => ({...state, image: action.payload}),
    [SET_DESCRIPTION]: (state, action) => ({...state, description: action.payload}),
    [SET_VIDEO_LINK]: (state, action) => ({...state, videoLink: action.payload}),
    [PUSH_SELECTED_BODY_PART]: (state, action) => ({...state, selectedBodyPartList: state.selectedBodyPartList.concat(action.payload)}),
    [POP_SELECTED_BODY_PART]: (state, action) => ({...state, selectedBodyPartList: state.selectedBodyPartList.filter(id => id !== action.payload)}),
    [PUSH_SELECTED_MACHINE]: (state, action) => ({...state, selectedMachineList: state.selectedMachineList.concat(action.payload)}),
    [POP_SELECTED_MACHINE]: (state, action) => ({...state, selectedMachineList: state.selectedMachineList.filter(id => id !== action.payload)}),
}, initialState);
