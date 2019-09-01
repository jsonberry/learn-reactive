export const events$ = new rxjs.Subject();
export const store$ = new rxjs.BehaviorSubject({
  resources: null,
  tags: [],
  bestof: false,
  free: false,
  difficulty: [],
  format: [],
  tagged: [],
});
