const getResourcesEffect$ = rxjs.fetch.fromFetch('./api.json').pipe(
  rxjs.operators.switchMap(res => res.json()),
  rxjs.operators.take(1),
  rxjs.operators.tap(s => {
    store.next(s)
  })
)

const storeLoggerEffect$ = store.pipe(
  rxjs.operators.tap(s => console.log('Next from store:', s))
)

const effects = [storeLoggerEffect$, getResourcesEffect$]

effects.forEach(effect => effect.subscribe())