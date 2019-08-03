actions$
  .pipe(
    rxjs.operators.filter(
      s => s.type === 'resource selected' || s.type === 'modal closed',
    ),
    rxjs.operators.concatMap(action => {
      if (action.type === 'modal closed') {
        return rxjs.of(action).pipe(rxjs.operators.delay(360));
      }

      return rxjs.of(action);
    }),
    rxjs.operators.withLatestFrom(store$),
    rxjs.operators.map(([action, store]) => {
      if (action.type === 'modal closed') {
        return '<div id="modal-content"></div>';
      }

      const { title, content } = store.resources[action.id];

      return `
        <article id="modal-content">
          <h1>${title}</h1>
          <div class="keyline-container">
            <div class="keyline"></div>
            <div class="keyline-divider"></div>
          </div>
          <section>
            ${content}
          </section>
        </article>
      `;
    }),
  )
  .subscribe(s => (document.getElementById('modal').innerHTML = s));
