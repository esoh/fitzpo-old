import { SHOW_MODAL, HIDE_MODAL } from '../../constants/actionTypes'

const initialState = {
    modalType: null,
    modalProps: {},
    modalOpen: false,
}

export default function modalReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return Object.assign({}, state, {
                modalType: action.modalType,
                modalProps: action.modalProps,
                modalOpen: true,
            })
        case HIDE_MODAL:
            return Object.assign({}, state, {
                modalOpen: false,
            })
        default:
            return state
    }
}
