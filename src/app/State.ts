import {Observable} from "rxjs";


interface State {
    cookiesCount: number;
    cursors: number;
}

type Reducer = (state: State) => State;

interface SourceWithState {
    state: Observable<State>;
}

function state (cookiesCount: number, cursors: number): State {
    return {
        cookiesCount,
        cursors,
    };
}

function makeStateDriver (initialState: State) {
    return (input$: Observable<Reducer>) => {
        return input$
            .scan((state, changeState) => changeState(state), initialState)
            .startWith(initialState);
    };
}

export { State, Reducer, SourceWithState, state, makeStateDriver };
