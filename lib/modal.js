actions$
  .pipe(
    rxjs.operators.filter(
      s => s.type === 'resource selected' || s.type === 'modal closed',
    ),
    rxjs.operators.switchMap(action => {
      if (action.type === 'modal closed') {
        return rxjs.of(action).pipe(rxjs.operators.delay(360));
      }

      return rxjs.of(action);
    }),
    rxjs.operators.withLatestFrom(store$),
    rxjs.operators.map(([action, store]) => {
      if (action.type === 'modal closed') {
        return '<div class="modal-container"><div id="modal-content"></div></div>';
      }

      const resource = store.resources[action.id];

      return `
        <div class="modal-container">
          <article id="modal-content">
            <h1>${resource.title}</h1>
            <div class="keyline-container">
              <div class="keyline"></div>
              <div class="keyline-divider"></div>
            </div>

            <section class="meta">
              <p>
                ${resource.author}
              </p>
              <p>/</p>
              <p>
                ${resource.difficulty} 
              </p>
              <p>/</p>
              <p>
                ${resource.format} 
              </p>
            </section>

            <section>
              ${resource.content}
            </section>

            <section class="source">
              <button onclick="modalClosed()">
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
            </section>
          </article>
        </div>
      `;
    }),
  )
  .subscribe(s => (document.getElementById('modal').innerHTML = s));

function modalClosed() {
  actions$.next({ type: 'modal close button clicked' });
}
