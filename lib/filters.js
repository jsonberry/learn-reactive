const filters = store$
  .pipe(
    rxjs.operators.filter(s => !!s.tags.length),
    rxjs.operators.take(1),
    rxjs.operators.map(
      s =>
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
        <p>Tags</p>
        ${s.tags
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
      <button class="filter-entry" id="filters-toggle">
        <i class="material-icons">filter_list</i>
        Filters
      </button>
    `,
    ),
  )
  .subscribe(html => (document.getElementById('filters').innerHTML = html));

const filterRendered$ = componentRendered('filters').pipe(
  rxjs.operators.shareReplay(),
);

const sources = {
  formChanged: filterRendered$.pipe(
    rxjs.operators.switchMap(() =>
      rxjs.fromEvent(document.getElementById('filters-form'), 'change'),
    ),
    rxjs.operators.shareReplay(),
  ),
  formReset: filterRendered$.pipe(
    rxjs.operators.switchMap(() =>
      rxjs.fromEvent(document.getElementById('filters-form'), 'reset'),
    ),
    rxjs.operators.shareReplay(),
  ),
  filterVisibilityToggled: filterRendered$.pipe(
    rxjs.operators.switchMap(() =>
      rxjs.fromEvent(document.getElementById('filters-toggle'), 'click'),
    ),
    rxjs.operators.shareReplay(),
  ),
};

sources.formChanged.subscribe(event => {
  const obj = event.target.value.split('-');
  actions$.next({
    type: 'resources filtered',
    payload: {
      category: obj[0],
      type: obj[1],
      checked: event.target.checked,
    },
  });
});

sources.filterVisibilityToggled.subscribe(() => {
  const form = document.getElementById('filters-form');
  const openButton = document.getElementById('filters-toggle');
  form.classList.toggle('visible');
  form.classList.toggle('hidden');
  openButton.classList.toggle('open');
});

sources.filterVisibilityToggled
  .pipe(rxjs.operators.delay(180))
  .subscribe(() => {
    const form = document.getElementById('filters-form');
    form.style.display = {
      none: 'block',
      block: 'none',
    }[window.getComputedStyle(form).display];
  });

sources.formReset.subscribe(() => actions$.next({ type: 'filters cleared' }));
