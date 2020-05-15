import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/files/ReducerRegistry';

import {
    clickReducer,
    globalNavReducer,
    appNavClick,
    navToggleReducer,
    loginReducer,
    clearActive,
    navUpdateReducer,
    onPageAction,
    onPageObjectId,
    onAddNotification,
    onMarkAsReadNotification,
    onLoadStoredNotifications,
    onDeleteNotification,
    onToggleDrawer
} from './reducers';
import {
    CLICK_ACTION,
    GLOBAL_NAV_IDENT,
    APP_NAV_CLICK,
    NAVIGATION_TOGGLE,
    USER_LOGIN,
    CLEAR_ACTIVE,
    CHROME_NAV_UPDATE,
    CHROME_PAGE_ACTION,
    CHROME_PAGE_OBJECT,
    ADD_NEW_NOTIFICATION,
    MARK_AS_READ_NOTIFICATION,
    POPULATE_NOTIFICATIONS,
    REMOVE_NOTIFICATION,
    TOGGLE_DRAWER
} from './action-types';

const reducers = {
    [CLEAR_ACTIVE]: clearActive,
    [CLICK_ACTION]: clickReducer,
    [GLOBAL_NAV_IDENT]: globalNavReducer,
    [APP_NAV_CLICK]: appNavClick,
    [NAVIGATION_TOGGLE]: navToggleReducer,
    [USER_LOGIN]: loginReducer,
    [CHROME_NAV_UPDATE]: navUpdateReducer,
    [CHROME_PAGE_ACTION]: onPageAction,
    [CHROME_PAGE_OBJECT]: onPageObjectId,
    [ADD_NEW_NOTIFICATION]: onAddNotification,
    [MARK_AS_READ_NOTIFICATION]: onMarkAsReadNotification,
    [POPULATE_NOTIFICATIONS]: onLoadStoredNotifications,
    [REMOVE_NOTIFICATION]: onDeleteNotification,
    [TOGGLE_DRAWER]: onToggleDrawer
};

export default function() {
    // const chromeInitialState = JSON.parse(localStorage.getItem('chrome')) || {};

    return { chrome: (state = {}, action) => applyReducerHash(reducers)(state, action) };
}
