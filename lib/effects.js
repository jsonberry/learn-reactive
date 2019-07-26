const windowLoadEffect$ = rxjs.fromEvent(window, 'load').pipe(
  rxjs.operators.tap(s => console.log('window loaded!', s)),
  rxjs.operators.mapTo({ type: 'window loaded' }),
);

const loadResourcesEffect$ = actions$.pipe(
  rxjs.operators.filter(s => s.type === 'window loaded'),
  rxjs.operators.switchMapTo(rxjs.fetch.fromFetch('./api.json')),
  rxjs.operators.switchMap(res => res.json()),
  rxjs.operators.map(({ resources, tags }) => ({
    resources,
    tags,
    type: 'resources loaded',
  })),
);

const breakpointEffect$ = actions$.pipe(
  rxjs.operators.filter(s => s.type === 'window loaded'),
  rxjs.operators.switchMapTo(
    rxjs.fromEventPattern(handler =>
      window
        .matchMedia('(min-width: 840px)')
        .addEventListener('change', handler),
    ),
  ),
  rxjs.operators.startWith(window.matchMedia('(min-width: 840px)')),
  rxjs.operators.map(({ matches: isDesktop }) => ({
    isDesktop,
    type: 'breakpoint',
  })),
);

const actionLoggerEffect$ = actions$.pipe(
  rxjs.operators.tap(s => console.log('Action:', s)),
  rxjs.operators.filter(() => false),
);

const storeLoggerEffect$ = store$.pipe(
  rxjs.operators.tap(s => console.log('Store:', s)),
  rxjs.operators.filter(() => false),
);

const effects = [
  windowLoadEffect$,
  loadResourcesEffect$,
  breakpointEffect$,
  actionLoggerEffect$,
  storeLoggerEffect$,
];

effects.forEach(effect => effect.subscribe(s => actions$.next(s)));
