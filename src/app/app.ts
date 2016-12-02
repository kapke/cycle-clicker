import {makeDOMDriver} from "@cycle/dom";
import {run} from "@cycle/rxjs-run";

import {App} from "./components/App";
import {SourceWithDOM} from "./declarations";
import {makeStateDriver, SourceWithState, state} from "./State";


const initialState = state(0, 0);

function main (sources: SourceWithDOM & SourceWithState) {
    return App(sources);
}

const drivers = {
    DOM: makeDOMDriver('#app'),
    state: makeStateDriver(initialState),
};

run(main, drivers);
