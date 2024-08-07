import {createAction, handleActions} from "redux-actions";

const SET_WORKOUT_LIST = 'workout/SET_WORKOUT_LIST';

const SET_PAGE = 'workout/SET_PAGE';
const SET_SIZE = 'workout/SET_SIZE';
const SET_TOTAL = 'workout/SET_TOTAL';

export const setWorkoutList = createAction(SET_WORKOUT_LIST);

export const setPage = createAction(SET_PAGE);
export const setSize = createAction(SET_SIZE);
export const setTotal = createAction(SET_TOTAL);

const initialState = {
    workoutList: [],

    page: 1,
    size: 10,
    total: 0
}

export default handleActions({
    [SET_WORKOUT_LIST]: (state, action) => ({...state, workoutList: action.payload}),

    [SET_PAGE]: (state, action) => ({...state, page: action.payload}),
    [SET_SIZE]: (state, action) => ({...state, size: action.payload}),
    [SET_TOTAL]: (state, action) => ({...state, total: action.payload}),
}, initialState);
