import appEffects from './effects.js';
import * as events from './events.js';
import filtersEntrySinks from './filters-entry/filters-entry.js';
import filtersSinks from './filters/filters.js';
import modalSinks from './modal/modal.js';
import resourceListSinks from './resource-list/resource-list.js';
import { events$, store$ } from './store.js';
import { ofType } from './utils.js';
const { fromFetch } = rxjs.fetch;
const { switchMapTo, switchMap, shareReplay } = rxjs.operators;

const sources = {
  events$,
  store$,
  document,
  window,
  data$: events$.pipe(
    ofType(events.WindowLoaded),
    switchMapTo(fromFetch('./api.json')),
    switchMap(res => res.json()),
    shareReplay(),
  ),
};

const sinks = [
  resourceListSinks,
  filtersSinks,
  filtersEntrySinks,
  modalSinks,
  appEffects,
];

sinks.forEach(_sinks => {
  const __sinks = _sinks(sources);
  for (const sink in __sinks) {
    __sinks[sink].subscribe();
  }
});
