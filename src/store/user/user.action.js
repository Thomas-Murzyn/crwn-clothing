import { USER_ACTION_TYPES } from "./user.type";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setCurrentUser = (user) => {
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
};

export const googleSignInSTart = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const checkUserSessions = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const emailSignInStart = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

export const signOut = () => createAction(USER_ACTION_TYPES.SIGN_OUT);

export const signUp = (email, password, name) =>
  createAction(USER_ACTION_TYPES.SIGN_UP, {
    email,
    password,
    displayName: name,
  });
