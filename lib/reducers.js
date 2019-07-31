const resourcesReudcer$ = actions$.pipe(
  rxjs.operators.filter(s => s.type === 'resources loaded'),
  rxjs.operators.withLatestFrom(store$),
  rxjs.operators.map(([{ resources }, state]) => ({
    ...state,
    resources,
  })),
);

const tagsReudcer$ = actions$.pipe(
  rxjs.operators.filter(s => s.type === 'resources loaded'),
  rxjs.operators.withLatestFrom(store$),
  rxjs.operators.map(([{ tags }, state]) => ({
    ...state,
    tags,
  })),
);

const bestOfReducer$ = actions$.pipe(
  rxjs.operators.filter(
    s => s.type === 'resources filtered' && s.payload.category === 'bestof',
  ),
  rxjs.operators.withLatestFrom(store$),
  rxjs.operators.map(([action, state]) => ({
    ...state,
    bestof: action.payload.checked,
  })),
);

const freeReducer$ = actions$.pipe(
  rxjs.operators.filter(
    s => s.type === 'resources filtered' && s.payload.category === 'free',
  ),
  rxjs.operators.withLatestFrom(store$),
  rxjs.operators.map(([action, state]) => ({
    ...state,
    free: action.payload.checked,
  })),
);

const difficultyReducer$ = actions$.pipe(
  rxjs.operators.filter(
    s => s.type === 'resources filtered' && s.payload.category === 'difficulty',
  ),
  rxjs.operators.withLatestFrom(store$),
  rxjs.operators.map(([action, state]) => ({
    ...state,
    difficulty: action.payload.checked
      ? [...state.difficulty, action.payload.type]
      : state.difficulty.filter(d => d !== action.payload.type),
  })),
);

const formatReducer$ = actions$.pipe(
  rxjs.operators.filter(
    s => s.type === 'resources filtered' && s.payload.category === 'format',
  ),
  rxjs.operators.withLatestFrom(store$),
  rxjs.operators.map(([action, state]) => ({
    ...state,
    format: action.payload.checked
      ? [...state.format, action.payload.type]
      : state.format.filter(d => d !== action.payload.type),
  })),
);

const taggedReducer$ = actions$.pipe(
  rxjs.operators.filter(
    s => s.type === 'resources filtered' && s.payload.category === 'tagged',
  ),
  rxjs.operators.withLatestFrom(store$),
  rxjs.operators.map(([action, state]) => ({
    ...state,
    tagged: action.payload.checked
      ? [...state.tagged, action.payload.type]
      : state.tagged.filter(d => d !== action.payload.type),
  })),
);

const filtersClearedReducer$ = actions$.pipe(
  rxjs.operators.filter(s => s.type === 'filters cleared'),
  rxjs.operators.withLatestFrom(store$),
  rxjs.operators.map(([action, state]) => ({
    ...state,
    tags: [],
    bestof: false,
    free: false,
    difficulty: [],
    format: [],
    tagged: [],
  }))
)

const reducers = [
  resourcesReudcer$,
  tagsReudcer$,
  bestOfReducer$,
  freeReducer$,
  difficultyReducer$,
  formatReducer$,
  taggedReducer$,
  filtersClearedReducer$,
];

reducers.forEach(reducer => reducer.subscribe(state => store$.next(state)));
