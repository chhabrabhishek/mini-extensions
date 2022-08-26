import * as actions from './actionTypes';

export const login = (isLoggedIn: boolean) => ({
    type: actions.LOGGED_IN,
    payload: {
        isLoggedIn
    }
});

export const currentDashboardData = (dashboardData: any) => ({
    type: actions.CURRENT_DASHBOARD_DATA,
    payload: {
        dashboardData
    }
});
