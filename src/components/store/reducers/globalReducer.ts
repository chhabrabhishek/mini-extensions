import * as actions from '../actionTypes';

const globalReducer = (state: {isLoggedIn: boolean, dashboardData: any} = {isLoggedIn: false, dashboardData: {}}, action: {type: String, payload: any}) => {
    switch(action.type) {
        case actions.LOGGED_IN:
            if(!action.payload.isLoggedIn) {
                return {
                    ...state,
                    isLoggedIn: action.payload.isLoggedIn,
                    dashboardData: {}
                }
            }
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn
            }
        case actions.CURRENT_DASHBOARD_DATA:
            return {
                ...state,
                dashboardData: action.payload.dashboardData
            }
        default:
            return state
    }
}

export default globalReducer;