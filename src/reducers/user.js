import {
    SET_LOOKING_FOR, 
    DISPLAY_ALL_USERS,
    SET_SELECTED_USER,
    SET_SELECTED_USER_MATCH, 
    SET_REDIRECT_DISPLAY_FALSE
} from '../actions/user';

const initialState = {
    looking_for: null,
    profileMatches: [], 
    selectedUser: null,
    selectedUserMatch: null, 
    redirectDisplayed: false
};

export default function reducer(state = initialState, action) {
    if (action.type === SET_LOOKING_FOR) {
        return Object.assign({}, state, {
            looking_for: action.looking_for
        });
    } else if (action.type === DISPLAY_ALL_USERS) {
        return Object.assign({}, state, {
            profileMatches: action.users
        }); 
    } else if (action.type === SET_SELECTED_USER) {
        return Object.assign({}, state, {
            selectedUser: action.user, 
            redirectDisplayed: true
        })
    } else if (action.type === SET_SELECTED_USER_MATCH) {
        return Object.assign({}, state, {
            selectedUserMatch: action.match, 
    })
  } else if (action.type === SET_REDIRECT_DISPLAY_FALSE) {
        return Object.assign({}, state, {
            redirectDisplayed: false
        })
  }
  return state;
}
