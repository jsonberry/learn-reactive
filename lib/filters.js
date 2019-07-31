store$
  .pipe(
    rxjs.operators.filter(s => !!s.tags.length),
    rxjs.operators.take(1),
    rxjs.operators.map(
      s =>
        `
      <form class="hidden" onchange="filtersChanged(event)">
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
        <button onclick="filtersCleared(event)">
          Clear All
        </button>
      </form>
      <button
        class="filter-entry"
        onclick="toggleFilters()"
      >
        <i class="material-icons">filter_list</i>
        Filters
      </button>
    `,
    ),
  )
  .subscribe(s => (document.getElementById('filters').innerHTML = s));

function toggleFilters() {
  const filters = document.querySelector('#filters form');
  const filterButton = document.querySelector('#filters button.filter-entry')

  filters.classList.toggle('visible');
  filters.classList.toggle('hidden');
  filterButton.classList.toggle('open');
  setTimeout(() => {
    filters.style.display = {
      none: 'block',
      block: 'none',
    }[window.getComputedStyle(filters).display];
  }, 180);
}

function filtersCleared(event) {
  event.preventDefault();
  document.querySelector('#filters form').reset()
  actions$.next({type: 'filters cleared'})
}

function filtersChanged(event) {
  const obj = event.target.value.split('-');
  actions$.next({
    type: 'resources filtered',
    payload: {
      category: obj[0],
      type: obj[1],
      checked: event.target.checked,
    },
  });
}
