import { componentRendered, ofType } from '../utils.js';
import * as events from '../events.js';
const {
  map,
  mapTo,
  scan,
  switchMap,
  tap,
} = rxjs.operators;
const { fromEvent, merge } = rxjs;

export default function(sources) {
  return {
    toggled: componentRendered('filters-entry').pipe(
      switchMap(() =>
        fromEvent(sources.document.getElementById('filters-toggle'), 'click'),
      ),
      scan(acc => !acc, false),
      tap(open => {
        document.getElementById('filters-toggle').classList.toggle('open');
        sources.events$.next(new events.FiltersToggled(open));
      }),
    ),

    /**
     * This is just a temporary solution so that
     * the filter button isn't hideous when the
     * modal is open, not going to care about this
     * as a long lasting solution
     */
    display: merge(
      sources.events$.pipe(
        ofType(events.ResourceSelected),
        mapTo('none'),
      ),
      sources.events$.pipe(
        ofType(events.ModalClosed),
        mapTo('flex'),
      ),
    ).pipe(
      tap(
        display =>
          (document.getElementById('filters-toggle').style.display = display),
      ),
    ),

    render: sources.events$.pipe(
      ofType(events.WindowLoaded),
      map(
        () => `
          <button id="filters-toggle">
            <i class="material-icons">filter_list</i>
            Filters
          </button>
        `,
      ),
      tap(html => (document.getElementById('filters-entry').innerHTML = html)),
    ),
  };
}
