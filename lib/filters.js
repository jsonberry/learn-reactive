document.getElementById('filters').innerHTML = `
  <form class="hidden" onchange="filtersChanged(event)">
    <label>
      <input type="checkbox" value="bestof">
      Best Of
    </label>
    <p>
      Cost
    </p>
    <label>
      <input type="checkbox" value="cost-free">
      Free
    </label>
    <p>
    Difficulty
    </p>
    <label>
      <input type="checkbox" value="difficulty-Introductory">
      Introductory
    </label>
    <label>
      <input type="checkbox" value="difficulty-Beginner">
      Beginner
    </label>
    <label>
      <input type="checkbox" value="difficulty-Intermediate">
      Intermediate
    </label>
    <label>
      <input type="checkbox" value="difficulty-Advanced">
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
  </form>
  <button
    onclick="toggleFilters()"
  >filters</button>
`;

function toggleFilters() {
  const filters = document.querySelector('#filters form');
  filters.classList.toggle('visible');
  filters.classList.toggle('hidden');
  setTimeout(() => {
    filters.style.display = {
      none: 'block',
      block: 'none',
    }[window.getComputedStyle(filters).display];
  }, 250);
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
