import {Observable, Subject, Observer, BehaviorSubject} from 'rxjs';
import {run} from '@cycle/rxjs-run';
import {makeDOMDriver, div} from '@cycle/dom';

function log (...args) {
    return console.log(...args);
}

function main (sources) {
    const DOM = sources.DOM;
    const props$ = sources.props;

    const cookiesCountProxy$ = new BehaviorSubject();
    cookiesCountProxy$.next(0);

    const cookieClicks$ = DOM.select('.cookie').events('click');
    const cursorClicks$ = DOM.select('.cursor').events('click');
    const zero$ = Observable.of(0);

    const cursorBoughts$ = cookiesCountProxy$
        .sample(cursorClicks$)
        .filter(cookiesCount => {
            return cookiesCount >= 5
        })
        .mapTo(1);

    const realCursorBoughts$ = zero$
        .concat(cursorBoughts$)
        .scan((acc, val) => {
            return acc+val;
        }, 0);

    const cursorsCount$ = realCursorBoughts$
        .scan((acc) => {
            return acc + 1;
        }, -1);

    const cookiesFromCursors$ = Observable.combineLatest(Observable.interval(1000), cursorsCount$)
        .map(([_ ,cursors]) => {
            return cursors
        })
        .scan((acc, cursors) => {
            return acc+cursors;
        });

    const cookiesFromClicks$ = zero$
        .concat(cookieClicks$.mapTo(1))
        .scan((acc, val) => {
            return acc+val
        }, 0);

    const cookiesCount$ = Observable.combineLatest(cookiesFromCursors$, cookiesFromClicks$)
        .scan((acc, [cursors, clicks]) => {
            return cursors+clicks;
        }, 0);

    cookiesCount$.subscribe(cookiesCountProxy$);


    return {
        DOM: cookiesCount$
            .map((cookiesCount) => {
                return div([
                    div('.cookie', cookiesCount.toString()),
                    div('.cursor', 'cursor 1/s 5')
                ])
            })
    }
}

const drivers = {
    DOM: makeDOMDriver('#app'),
    props () {
        return Observable.of({
            cookiesCount: 0,
            cursors: 0
        })
    }
};

run(main, drivers);