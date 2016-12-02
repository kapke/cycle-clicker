import {State, state} from "./State";


export function cookieClick (previousState: State): State {
    return state(previousState.cookiesCount + 1, previousState.cursors);
}
