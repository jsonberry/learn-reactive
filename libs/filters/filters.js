import * as events from '../events.js';
import { componentRendered, ofType } from '../utils.js';
const {
  filter,
  map,
  pluck,
  shareReplay,
  switchMap,
  take,
  tap,
  withLatestFrom,
  switchMapTo,
} = rxjs.operators;
const { fromEvent } = rxjs;

export default function(sources) {
  const componentReady$ = componentRendered('filters').pipe(shareReplay());

  return {
    data: sources.data$().pipe(
      withLatestFrom(sources.store$),
      tap(([{ tags }, state]) =>
        sources.store$.next({ ...state, tags }),
      ),
    ),

    visibility: sources.events$.pipe(
      ofType(events.FiltersToggled),
      tap(() => {
        const form = document.getElementById('filters-form');
        form.classList.toggle('visible');
        form.classList.toggle('hidden');
        form.style.display = {
          none: 'block',
          block: 'none',
        }[window.getComputedStyle(form).display];
      }),
    ),

    filtered: componentReady$.pipe(
      switchMap(() =>
        fromEvent(document.getElementById('filters-form'), 'change'),
      ),
      tap(event => {
        const [category, type] = event.target.value.split('-');
        sources.events$.next(
          new events.ResourcesFiltered(category, type, event.target.checked),
        );
      }),
    ),

    bestOf: sources.events$.pipe(
      ofType(events.ResourcesFiltered),
      filter(s => s.category === 'bestof'),
      withLatestFrom(sources.store$),
      tap(([action, state]) =>
        sources.store$.next({
          ...state,
          bestof: action.checked,
        }),
      ),
    ),

    free: sources.events$.pipe(
      ofType(events.ResourcesFiltered),
      filter(s => s.category === 'free'),
      withLatestFrom(sources.store$),
      tap(([action, state]) =>
        sources.store$.next({
          ...state,
          free: action.checked,
        }),
      ),
    ),

    difficulty: sources.events$.pipe(
      ofType(events.ResourcesFiltered),
      filter(s => s.category === 'difficulty'),
      withLatestFrom(sources.store$),
      tap(([action, state]) =>
        sources.store$.next({
          ...state,
          difficulty: action.checked
            ? [...state.difficulty, action.type]
            : state.difficulty.filter(d => d !== action.type),
        }),
      ),
    ),

    format: sources.events$.pipe(
      ofType(events.ResourcesFiltered),
      filter(s => s.category === 'format'),
      withLatestFrom(sources.store$),
      tap(([action, state]) =>
        sources.store$.next({
          ...state,
          format: action.checked
            ? [...state.format, action.type]
            : state.format.filter(d => d !== action.type),
        }),
      ),
    ),

    tagged: sources.events$.pipe(
      ofType(events.ResourcesFiltered),
      filter(s => s.category === 'tagged'),
      withLatestFrom(sources.store$),
      tap(([action, state]) =>
        sources.store$.next({
          ...state,
          tagged: action.checked
            ? [...state.tagged, action.type]
            : state.tagged.filter(d => d !== action.type),
        }),
      ),
    ),

    reset: componentReady$.pipe(
      switchMap(() =>
        fromEvent(document.getElementById('filters-form'), 'reset'),
      ),
      withLatestFrom(sources.store$),
      tap(([action, state]) =>
        sources.store$.next({
          ...state,
          tags: [],
          bestof: false,
          free: false,
          difficulty: [],
          format: [],
          tagged: [],
        }),
      ),
    ),

    render: sources.store$.pipe(
      filter(s => !!s.tags.length),
      pluck('tags'),
      take(1),
      map(
        tags =>
          `
        <form class="hidden" id="filters-form">
          <label> 
            <input type="checkbox" value="bestof">
            Best Of
          </label>
          <label>
            <input type="checkbox" value="free">
            Free
          </label>
          <p>
          Difficulty
          </p>
          <label>
            <input type="checkbox" value="difficulty-introductory">
            Introductory
          </label>
          <label>
            <input type="checkbox" value="difficulty-beginner">
            Beginner
          </label>
          <label>
            <input type="checkbox" value="difficulty-intermediate">
            Intermediate
          </label>
          <label>
            <input type="checkbox" value="difficulty-advanced">
            Advanced
          </label>
          <p>
          Format
          </p>
          <label>
            <input type="checkbox" value="format-video">
            Video
          </label>
          <label>
            <input type="checkbox" value="format-article">
            Article
          </label>
          <label>
            <input type="checkbox" value="format-podcast">
            Podcast
          </label>
          <label>
            <input type="checkbox" value="format-paper">
            Paper
          </label>
          <label>
            <input type="checkbox" value="format-course">
            Course
          </label>
          <p>Tags</p>
          ${tags
            .map(
              tag => `
              <label>
                <input type="checkbox" value="tagged-${tag
                  .replace(' ', '_')
                  .toLowerCase()}">
                ${tag}
              </label>
            `,
            )
            .join('')}
          <button class="clear" type="reset">
            Clear All
          </button>
        </form>
      `,
      ),
      tap(html => (document.getElementById('filters').innerHTML = html)),
    ),
  };
}
