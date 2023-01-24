import { signInSuccess, signInFailed } from "./user.action";
import { USER_ACTION_TYPES } from "./user.type";
import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithPasswordAndEmail,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from "../../utils/firebase.utils";

export function* getSnapShotFromUserAuth(userAuth, other) {
  try {
    const userSnapShot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      other
    );

    yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// User sign out

export function* userSignOut() {
  try {
    yield call(signOutUser);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onUserSignOut() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT, userSignOut);
}

// Check user session

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapShotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

// User sign up

export function* signUpWithEmail({
  payload: { email, password, displayName },
}) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (!user) return;
    yield call(getSnapShotFromUserAuth, user, { displayName });
  } catch (error) {
    yield call(signInFailed(error));
  }
}

export function* onSignUpWithEmail() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP, signUpWithEmail);
}

// User sign in

export function* isUserSIgnInWithEmailAndPassword({
  payload: { email, password },
}) {
  try {
    const { user } = yield call(signInWithPasswordAndEmail, email, password);

    if (!user) return;
    yield call(getSnapShotFromUserAuth, user);
  } catch (error) {
    yield call(signInFailed(error));
  }
}

export function* onSignInWithEmailAndPassword() {
  yield takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    isUserSIgnInWithEmailAndPassword
  );
}

export function* isUserSIgnInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    if (!user) return;
    yield call(getSnapShotFromUserAuth, user);
  } catch (error) {
    yield call(signInFailed(error));
  }
}

export function* onSignInWithGoogle() {
  yield takeLatest(
    USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
    isUserSIgnInWithGoogle
  );
}

// User sagas

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onSignInWithGoogle),
    call(onSignInWithEmailAndPassword),
    call(onSignUpWithEmail),
  ]);
}
