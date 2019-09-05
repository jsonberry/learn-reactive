import { ofType } from '../utils.js';
import * as events from '../events.js';
const {
  delay,
  filter,
  map,
  mapTo,
  switchMap,
  take,
  tap,
  withLatestFrom,
} = rxjs.operators;
const { fromEvent, merge } = rxjs;

export default function(sources) {
  const modal = sources.document.getElementById('modal');

  return {
    opened: sources.events$.pipe(
      ofType(events.ResourceSelected),
      tap(() => {
        modal.classList.toggle('open');
        modal.classList.toggle('closed');
      }),
    ),

    closed: merge(
      fromEvent(window, 'click').pipe(filter(s => s.target.id === 'modal')),
      sources.events$.pipe(
        ofType(events.ResourceSelected),
        switchMap(() =>
          fromEvent(window, 'keyup').pipe(
            filter(s => s.key === 'Escape'),
            take(1),
          ),
        ),
      ),
      fromEvent(modal, 'click').pipe(
        filter(s => s.target.innerText === 'CLOSE'),
      ),
    ).pipe(
      tap(() => {
        modal.classList.toggle('open');
        modal.classList.toggle('closed');
        sources.events$.next(new events.ModalClosed());
      }),
    ),

    render: merge(
      sources.events$.pipe(
        ofType(events.ResourceSelected),
        withLatestFrom(sources.store$),
        map(([action, store]) => {
          const resource = store.resources[action.id];

          return `
            <article id="modal-content">
                <h1>${resource.title}</h1>
                <div class="keyline-container">
                  <div class="keyline"></div>
                  <div class="keyline-divider"></div>
                </div>
      
                <section class="meta">
                  <p>
                    <span>Author</span>
                    <span>${resource.author}</span>
                  </p>
                  <p>
                  <span>Difficulty</span>
                  <span>${resource.difficulty}<span>
                  </p>
                  <p>
                  <span>Format</span>
                  <span>${resource.format}</span>
                  </p>
                  ${
                    resource.bestOf
                      ? `
                    <p>
                      <span>Best of</span>
                      <i class="material-icons" title="Best Of">star</i>
                    </p>
                    `
                      : ''
                  }
                </section>
      
                <section class="content">
                  ${resource.content}
                </section>
      
                <section class="actions">
                  <a href="https://github.com/jsonberry/learn-reactive/edit/next/resources/${resource.id}.md" target="_blank">
                    <i class="material-icons" title="Edit Resource Details">edit</i>
                  </a>
                  <div>
                  <button>
                    close
                  </button>
                  ${
                    resource.source
                      ? `
                        <a href="${resource.source}" target="_blank">
                          go to source
                        </a>
                        `
                      : ''
                  }
                  </div>
                </section>
            </article>
        `;
        }),
      ),
      sources.events$.pipe(
        ofType(events.ModalClosed),
        delay(360),
        mapTo('<div>Loading. . .</div>'),
      ),
    ).pipe(
      tap(
        html => (modal.innerHTML = `<div id="content-container">${html}</div>`),
      ),
    ),
  };
}
