import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
// si problème avec createStore utiliser :  legacy_createStore as createStore
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

const middleWares = [logger];
const composeEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composeEnhancers);
