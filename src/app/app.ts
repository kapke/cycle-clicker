import {run} from "@cycle/rxjs-run";
import {makeDOMDriver} from "@cycle/dom";

import {SourceWithDOM} from "./declarations";
import {state, makeStateDriver, SourceWithState} from "./State";
import {App} from "./components/App";


const initialState = state(0, 0);

function main (sources: SourceWithDOM & SourceWithState) {
    return App(sources);
}

const drivers = {
    DOM: makeDOMDriver('#app'),
    state: makeStateDriver(initialState)
};

run(main, drivers);
