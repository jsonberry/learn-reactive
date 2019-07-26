const resourcesReudcer$ = actions$.pipe(
  rxjs.operators.filter(s => s.type === 'resources loaded'),
  rxjs.operators.withLatestFrom(store$),
  rxjs.operators.map(([{resources}, state]) => ({
    ...state,
    resources,
  })),
);

const tagsReudcer$ = actions$.pipe(
  rxjs.operators.filter(s => s.type === 'resources loaded'),
  rxjs.operators.withLatestFrom(store$),
  rxjs.operators.map(([{tags}, state]) => ({
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

const costReducer$ = actions$.pipe(
  rxjs.operators.filter(
    s => s.type === 'resources filtered' && s.payload.category === 'cost',
  ),
  rxjs.operators.withLatestFrom(store$),
  rxjs.operators.map(([action, state]) => ({
    ...state,
    cost: action.payload.checked
      ? [...state.cost, action.payload.type]
      : state.cost.filter(d => d !== action.payload.type),
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

const reducers = [
  resourcesReudcer$,
  tagsReudcer$,
  bestOfReducer$,
  costReducer$,
  difficultyReducer$,
  formatReducer$,
];

reducers.forEach(reducer => reducer.subscribe(state => store$.next(state)));
