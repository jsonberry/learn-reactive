import appEffects from './effects.js';
import * as events from './events.js';
import filtersEntrySinks from './filters-entry/filters-entry.js';
import filtersSinks from './filters/filters.js';
import modalSinks from './modal/modal.js';
import resourceListSinks from './resource-list/resource-list.js';
import titleSinks from './title/title.js';
import { componentRendered, ofType } from './utils.js';
const { BehaviorSubject, from, Subject } = rxjs;
const { fromFetch } = rxjs.fetch;
const { switchMapTo, switchMap, shareReplay } = rxjs.operators;

const sources = {
  document,
  window,
  events$: new Subject(),
  store$: new BehaviorSubject({
    resources: null,
    tags: [],
    bestof: false,
    free: false,
    difficulty: [],
    format: [],
    tagged: [],
  }),
  dom: {
    getAll: (component, selector) =>
      componentRendered(component).pipe(
        switchMap(() => from(document.querySelectorAll(selector))),
      ),
  },
  data$() {
    return this.events$.pipe(
      ofType(events.WindowLoaded),
      switchMapTo(fromFetch('./api.json')),
      switchMap(res => res.json()),
      shareReplay(),
    );
  },
};

const sinks = [
  appEffects,
  filtersEntrySinks,
  filtersSinks,
  modalSinks,
  resourceListSinks,
  titleSinks,
];

sinks.forEach(_sinks => {
  const __sinks = _sinks(sources);
  for (const sink in __sinks) {
    __sinks[sink].subscribe();
  }
});