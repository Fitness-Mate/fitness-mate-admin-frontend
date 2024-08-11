import {createAction, handleActions} from "redux-actions";

const SET_MACHINE_LIST = 'machine/SET_MACHINE_LIST';
const SET_MACHINE = 'machine/SET_MACHINE';
export const setMachineList = createAction(SET_MACHINE_LIST);
export const setMachine = createAction(SET_MACHINE);

const SET_PAGE = 'machine/SET_PAGE';
const SET_SIZE = 'machine/SET_SIZE';
const SET_TOTAL = 'machine/SET_TOTAL';
export const setPage = createAction(SET_PAGE);
export const setSize = createAction(SET_SIZE);
export const setTotal = createAction(SET_TOTAL);

const initialState = {
    machineList: [],
    machine: null,

    page: 1,
    size: 10,
    total: 0
}

export default handleActions({
    [SET_MACHINE_LIST]: (state, action) => ({...state, machineList: action.payload}),
    [SET_MACHINE]: (state, action) => ({...state, machine: action.payload}),

    [SET_PAGE]: (state, action) => ({...state, page: action.payload}),
    [SET_SIZE]: (state, action) => ({...state, size: action.payload}),
    [SET_TOTAL]: (state, action) => ({...state, total: action.payload}),
}, initialState);
