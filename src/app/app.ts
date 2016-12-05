import {makeDOMDriver} from "@cycle/dom";
import {run} from "@cycle/rxjs-run";

import {App} from "./components/App";
import {SourceWithDOM} from "./declarations";
import {makeStateDriver, SourceWithState, state} from "./State";

import "./styles/styles.scss";


const initialState = state(0, [
    {name: 'Cursor', initialCost: 20, productionPerSecond: 1, boughtCount: 0, id: 'cursor', currentCost: 20, costIncreaseFactor: 1.25},
    {name: 'Grandma', initialCost: 100, productionPerSecond: 5, boughtCount: 0, id: 'grandma', currentCost: 100, costIncreaseFactor: 1.15},
]);

function main (sources: SourceWithDOM & SourceWithState) {
    return App(sources);
}

const drivers = {
    DOM: makeDOMDriver('#app'),
    state: makeStateDriver(initialState),
};

run(main, drivers);
