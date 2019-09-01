import * as events from './events.js';
import { ofType } from './utils.js';
const { merge, fromEvent, fromEventPattern, combineLatest } = rxjs;
const { mapTo, startWith, switchMapTo, pluck, tap } = rxjs.operators;

export default function(sources) {
  return {
    windowLoaded: fromEvent(sources.window, 'load').pipe(
      tap(() => sources.events$.next(new events.WindowLoaded())),
    ),

    breakpoint: sources.events$.pipe(
      ofType(events.WindowLoaded),
      switchMapTo(
        fromEventPattern(handler =>
          window.matchMedia('(min-width: 840px)').addListener(handler),
        ),
      ),
      startWith(window.matchMedia('(min-width: 840px)')),
      tap(({ matches }) =>
        sources.events$.next(new events.Breakpoint(matches)),
      ),
    ),

    lockBodyScroll: combineLatest(
      merge(
        sources.events$.pipe(
          ofType(events.ResourceSelected),
          mapTo(true),
        ),
        sources.events$.pipe(
          ofType(events.ModalClosed),
          mapTo(false),
        ),
      ),
      sources.events$.pipe(
        ofType(events.Breakpoint),
        startWith({
          isDesktop: sources.window.matchMedia('(min-width: 840px)').matches,
        }),
        pluck('isDesktop'),
      ),
    ).pipe(
      tap(([open, isDesktop]) => {
        const oldScrollPosition = !open
          ? Math.abs(parseInt(document.body.style.top))
          : null;

        const overflow = (open && 'hidden') || 'auto';
        const height = (open && !isDesktop && '100vh') || 'auto';
        const position = (open && !isDesktop && 'fixed') || 'static';
        const top = open && `-${window.scrollY}px`;

        document.body.style.overflow = overflow; // javascript is a funky business
        document.body.style.height = height; // storing the values in variables
        document.body.style.position = position; // allows these to work
        document.body.style.top = top; // who woulda thunk it

        if (!open) {
          sources.window.scrollTo(0, oldScrollPosition);
        }
      }),
    ),

    eventLogger: sources.events$.pipe(tap(s => console.log('Event:', s))),

    storeLogger: sources.store$.pipe(tap(s => console.log('Store:', s))),
  };
}
