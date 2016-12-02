import {Observable} from "rxjs";
import {run} from "@cycle/rxjs-run";
import {makeDOMDriver, div, VNode} from "@cycle/dom";

import {SourceWithDOM} from "./declarations";
import {Cookie} from "./Cookie";
import {state, makeStateDriver, State, SourceWithState} from "./State";


const initialState = state(0, 0);

function renderPage (state: State, cookie: VNode): VNode {
    return div([
        cookie,
        div('.cursor', 'cursor 1/s 5')
    ]);
}

function main (sources: SourceWithDOM & SourceWithState) {
    const cookie = Cookie(sources);

    const stateChanges$ = cookie.clickedCookies;

    const dom$ = Observable.combineLatest(sources.state, cookie.DOM)
            .map(([state, cookieDOM]) => renderPage(state, cookieDOM));

    return {
        DOM: dom$,
        state: stateChanges$
    };
}

const drivers = {
    DOM: makeDOMDriver('#app'),
    state: makeStateDriver(initialState)
};

run(main, drivers);
