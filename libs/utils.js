const { filter } = rxjs.operators;

export const componentRendered = id =>
  new rxjs.Observable(subscriber => {
    new MutationObserver((ml, observer) => {
      observer.disconnect();
      subscriber.next();
      subscriber.complete();
    }).observe(document.getElementById(id), {
      childList: true,
    });
  });

export const ofType = (...actions) => source$ =>
  source$.pipe(filter(signal => actions.some(action => signal instanceof action)));
