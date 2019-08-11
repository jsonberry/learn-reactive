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
    actions$.pipe(
      rxjs.operators.filter(s => s.type === 'modal close button clicked'),
    ),
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

const bodyNoScrollEffect$ = rxjs
  .combineLatest(
    rxjs.merge(
      actions$.pipe(
        rxjs.operators.filter(s => s.type === 'resource selected'),
        rxjs.operators.mapTo(true),
      ),
      actions$.pipe(
        rxjs.operators.filter(s => s.type === 'modal closed'),
        rxjs.operators.mapTo(false),
      ),
    ),
    actions$.pipe(
      rxjs.operators.filter(s => s.type === 'breakpoint'),
      rxjs.operators.startWith({
        isDesktop: window.matchMedia('(min-width: 840px)').matches,
      }),
      rxjs.operators.pluck('isDesktop'),
    ),
  )
  .pipe(
    rxjs.operators.tap(([open, isDesktop]) => {
      const oldScrollPosition = !open
        ? Math.abs(parseInt(document.body.style.top))
        : null;

      const overflow = (open && 'hidden') || 'auto';
      const height = (open && !isDesktop && '100vh') || 'auto';
      const position = (open && !isDesktop && 'fixed') || 'static';
      const top = open && !isDesktop && `-${window.scrollY}px`;

      document.body.style.overflow = overflow; // javascript is a funky business
      document.body.style.height = height; // storing the values in variables
      document.body.style.position = position; // allows these to work
      document.body.style.top = top; // who woulda thunk it

      if (!open) {
        window.scrollTo(0, oldScrollPosition);
      }
    }),
    rxjs.operators.filter(() => false),
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
  bodyNoScrollEffect$,
  actionLoggerEffect$,
  storeLoggerEffect$,
];

effects.forEach(effect => effect.subscribe(s => actions$.next(s)));
