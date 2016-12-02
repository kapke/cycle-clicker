import { div, img, span, VNode } from '@cycle/dom';
import isolate from '@cycle/isolate';

import { SourceWithDOM } from '../declarations';
import {cookieClick} from "../reducers";
import {SourceWithState, State} from "../State";


export function CookieComponent (sources: SourceWithDOM & SourceWithState) {
    const cookieClicks$ = sources.DOM.select('.cookie').events('click');
    const clickedCookies$ = cookieClicks$.map(() => cookieClick);

    function renderCookie (state: State): VNode {
        return div('.cookie', [
            img({props: {src: 'img/cookie.png'}}),
            span(state.cookiesCount.toString()),
        ]);
    }

    return {
        DOM: sources.state.map(renderCookie),
        clickedCookies: clickedCookies$,
    };
}

export function Cookie (sources: SourceWithDOM & SourceWithState) {
    return isolate(CookieComponent)(sources);
}
