const componentRendered = id =>
  new rxjs.Observable(subscriber => {
    new MutationObserver((ml, observer) => {
      observer.disconnect();
      subscriber.next();
      subscriber.complete();
    }).observe(document.getElementById(id), {
      childList: true,
    });
  });