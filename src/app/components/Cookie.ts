import { div, img, span, VNode } from '@cycle/dom';

import { SourceWithDOM } from '../declarations';
import {Component} from "../helpers";
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

export const Cookie = Component(CookieComponent);
