store$
  .pipe(
    rxjs.operators.filter(s => !!s.resources),
    rxjs.operators.map(s => {
      const predicates = [
        s.bestof ? resource => resource.bestOf : null,
        s.cost ? resource => !resource.cost : null,
        s.difficulty.length
          ? (resource, store) => store.difficulty.includes(resource.difficulty)
          : null,
        s.format.length
          ? (resource, store) => store.format.includes(resource.format)
          : null,
        s.tagged.length
          ? (resource, store) =>
              !!resource.tags.find(tag =>
                store.tagged.includes(tag.replace(' ', '_').toLowerCase()),
              )
          : null,
      ].filter(Boolean);

      return Object.keys(s.resources).reduce((acc, id) => {
        const resource = {
          id,
          title: s.resources[id].title,
          difficulty: s.resources[id].difficulty,
          format: s.resources[id].format,
          cost: s.resources[id].cost,
          tags: s.resources[id].tags,
          bestOf: s.resources[id].bestOf,
        };

        return predicates.every(fn => fn(s.resources[id], s))
          ? [...acc, resource]
          : acc;
      }, []);
    }),
    rxjs.operators.map(
      s =>
        `
        ${s.reduce(
          (acc, { id, title, difficulty, format, cost, tags, bestOf }) =>
            acc.concat(`
              <button 
                onclick="resourceSelected('${id}')"
              >
                ${
                  cost
                    ? ''
                    : `<p class="cost">
                  <span>
                    Free
                  </span>
                </p>`
                }
                <div class="container">
                  <div class="tags">
                    ${tags.map(tag => `<p>${tag}</p>`).join('')}
                  </div>
                  <h1 class="card-title">${title}</h1>
                </div>
                <div class="meta">
                  <div>
                    <p style="background-color: #009688;">${difficulty}</p>
                    <p style="background-color: #212121;">${format}</p>
                  </div>
                  ${
                    bestOf
                      ? `<i class="material-icons" title="Best Of">star</i>`
                      : ''
                  }
                </div>
              </button>
            `),
          '',
        )}
      `,
    ),
    rxjs.operators.distinctUntilChanged(),
  )
  .subscribe(s => (document.getElementById('list').innerHTML = s));

  function resourceSelected(id) {
    actions$.next({type: 'resource selected', id})
  }