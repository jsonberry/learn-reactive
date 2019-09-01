import * as events from '../events.js';
import { ofType } from '../utils.js';
const { fromEvent } = rxjs;
const {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  switchMapTo,
  tap,
  withLatestFrom,
} = rxjs.operators;

export default function(sources) {
  return {
    data: sources.data$.pipe(
      withLatestFrom(sources.store$),
      tap(([{ resources }, state]) =>
        sources.store$.next({ ...state, resources }),
      ),
    ),

    selected: fromEvent(sources.document.getElementById('list'), 'click').pipe(
      map(event => {
        const el = event.path.find(
          el => el && el.dataset && el.dataset.resourceId,
        );
        return el && el.dataset.resourceId;
      }),
      filter(s => !!s),
      tap(id => sources.events$.next(new events.ResourceSelected(id))),
    ),

    render: sources.store$.pipe(
      filter(s => !!s.resources),
      map(s => {
        const predicates = [
          s.bestof ? resource => resource.bestOf : null,
          s.cost ? resource => !resource.cost : null,
          s.difficulty.length
            ? (resource, store) =>
                store.difficulty.includes(resource.difficulty)
            : null,
          s.format.length
            ? (resource, store) => store.format.includes(resource.format)
            : null,
          s.tagged.length
            ? (resource, store) =>
                !!resource.tags.find(tag =>
                  store.tagged.includes(tag.replace(' ', '_').toLowerCase()),
                )
            : null,
        ].filter(Boolean);

        return Object.keys(s.resources).reduce((acc, id) => {
          const resource = {
            id,
            title: s.resources[id].title,
            difficulty: s.resources[id].difficulty,
            format: s.resources[id].format,
            cost: s.resources[id].cost,
            tags: s.resources[id].tags,
            bestOf: s.resources[id].bestOf,
          };

          return predicates.every(fn => fn(s.resources[id], s))
            ? [...acc, resource]
            : acc;
        }, []);
      }),
      map(
        s =>
          `
        ${s.reduce(
          (acc, { id, title, difficulty, format, cost, tags, bestOf }) =>
            acc.concat(`
              <button 
                data-resource-id=${id}
              >
                ${
                  cost
                    ? ''
                    : `<p class="cost">
                  <span>
                    Free
                  </span>
                </p>`
                }
                <div class="container">
                  <div class="tags">
                    ${tags.map(tag => `<p>${tag}</p>`).join('')}
                  </div>
                  <h1 class="card-title">${title}</h1>
                </div>
                <div class="meta">
                  <div>
                    <p style="background-color: #009688;">${difficulty}</p>
                    <p style="background-color: #212121;">${format}</p>
                  </div>
                  ${
                    bestOf
                      ? `<i class="material-icons" title="Best Of">star</i>`
                      : ''
                  }
                </div>
              </button>
            `),
          '',
        )}
      `,
      ),
      distinctUntilChanged(),
      tap(html => (document.getElementById('list').innerHTML = html)),
    ),
  };
}
