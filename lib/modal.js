actions$
  .pipe(
    rxjs.operators.filter(s => s.type === 'resource selected' || s.type === 'modal closed'),
    rxjs.operators.mergeMap(action => {
      if (action.type === 'modal closed') {
        return rxjs.of(action).pipe(rxjs.operators.delay(360))
      }

      return rxjs.of(action);
    }),
    rxjs.operators.withLatestFrom(store$),
    rxjs.operators.map(([action, store]) => {
      console.log({ action, store });

      if (action.type === 'modal closed') {
        return '<div id="modal-content"></div>';
      }

      return `
        <div id="modal-content">${store.resources[action.id].content}</div>
      `;
    }),
  )
  .subscribe(s => (document.getElementById('modal').innerHTML = s));



  rxjs.fromEvent(window, 'keydown').subscribe(s => console.log(s))