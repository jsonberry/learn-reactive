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

const modalOpenedEffect$ = actions$.pipe(
  rxjs.operators.filter(s => s.type === 'resource selected'),
  rxjs.operators.tap(() => {
    document.getElementById('modal').classList.add('open');
  }),
  rxjs.operators.filter(() => false), // dispatch: false
);

const modalClosedEffect$ = rxjs
  .merge(
    rxjs
      .fromEvent(window, 'click')
      .pipe(rxjs.operators.filter(s => s.target.id === 'modal')),
    rxjs
      .fromEvent(window, 'keyup')
      .pipe(rxjs.operators.filter(s => s.key === 'Escape')),
  )
  .pipe(
    rxjs.operators.tap(() => {
      document.getElementById('modal').classList.add('closed');
      document.getElementById('modal').classList.remove('open');
    }),
    rxjs.operators.mapTo({ type: 'modal closed' }),
  );

const breakpointEffect$ = actions$.pipe(
  rxjs.operators.filter(s => s.type === 'window loaded'),
  rxjs.operators.switchMapTo(
    rxjs.fromEventPattern(handler =>
      window.matchMedia('(min-width: 840px)').addListener(handler),
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
  rxjs.operators.filter(() => false), // dispatch: false
);

const storeLoggerEffect$ = store$.pipe(
  rxjs.operators.tap(s => console.log('Store:', s)),
  rxjs.operators.filter(() => false), // dispatch: false
);

const effects = [
  windowLoadEffect$,
  loadResourcesEffect$,
  modalOpenedEffect$,
  modalClosedEffect$,
  breakpointEffect$,
  actionLoggerEffect$,
  storeLoggerEffect$,
];

effects.forEach(effect => effect.subscribe(s => actions$.next(s)));
