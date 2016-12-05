import isolate from "@cycle/isolate";


export function log (...args: any[]): void {
    const first = args.shift();
    return console.log(first, ...args); // tslint:disable-line:no-console
}

export type ComponentFunction<TSources, TSinks> = (sources: TSources) => TSinks;

export function Component<TSources, TSinks> (component: ComponentFunction<TSources, TSinks>): ComponentFunction<TSources, TSinks> {
    return function ComponentWrapper(sources: TSources) {
        return isolate(component)(sources);
    };
}

export function replaceItem<T> (arr: T[], newItem: T, index: number): T[] {
    return arr.map((elem, i) => i == index ? newItem : elem);
}

export function sum (a: number, b: number): number {
    return a + b;
}
