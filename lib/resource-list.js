store
  .pipe(
    rxjs.operators.filter(s => !!s),
    rxjs.operators.map(s =>
      Object.keys(s.resources).map(id => ({
        id,
        title: s.resources[id].title,
        difficulty: s.resources[id].difficulty,
        format: s.resources[id].format,
        cost: s.resources[id].cost,
        tags: s.resources[id].tags,
        bestOf: s.resources[id].bestOf,
      })),
    ),
  )
  .subscribe({
    next(s) {
      document.getElementById('list').innerHTML = `
        ${s.reduce(
          (acc, { id, title, difficulty, format, cost, tags, bestOf }) =>
            acc.concat(`
              <button onclick="foo(event, '${id}')">
              <p class="cost"><span>${cost}</span></p>
                <div class="padding-container">
                  <div class="tags">
                    ${tags.map(tag => `<p>${tag}</p>`).join('')}
                  </div>
                  <h1>${title}</h1>
                </div>
                <hr />
                <div class="meta">
                  <div style="display: flex;">
                    <p
                      style="
                        background-color: ${
                          {
                            introductory: '#009688',
                            beginner: '#009688',
                            intermediate: '#00796B',
                            advanced: '#00695C',
                          }[difficulty.toLowerCase()]
                        }
                      "
                    >${difficulty}</p>
                    <p>${format}</p>
                    </div>
                    <i class="material-icons">star</i>
                </div>
              </button>
            `),
          '',
        )}
      `;
    },
  });

styles: {
  const styles = document.createElement('style');
  document.querySelector('head').appendChild(styles);
  styles.innerText = `
    #list {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    #list button {
      border: 0;
      background-color: white;
      display: block;
      margin-bottom: 1rem;
      padding: 0;
      text-align: left;
      box-shadow: 1px 1px 4px 1px #9E9E9E;
      cursor: pointer;
      width: 325px;
      position: relative;
    }

    #list button:hover {
      transition: box-shadow 250ms;
      box-shadow: 1px 1px 6px 2px #9E9E9E;
    }
    
    @media(min-width: 840px) {
      #list button {
        width: 742px;
      }
    }

    #list .cost {
      position: relative;
      margin: 0;
      top: 1rem;
      left: 0;
      width: 4.5rem;
      background-color: #B2DFDB;
      padding: 4px 0;
    }

    #list .cost span {
      color: #000;
      margin-left: 2rem;
      text-transform: uppercase;
      font-weight: 600;
    }

    #list div.tags p {
      font-size: 1rem;
      margin: 0 1rem 0.5rem 0;
      display: inline-block;
      color: #757575;
    }

    #list h1 {
      font-size: 1.5rem;
      margin-bottom: 0;
      color: #212121;
      letter-spacing: 0.5px;
      margin-top: 0;
    }

    @media(min-width: 840px) {
      #list h1 {
        font-size: 2rem;
      }
    }

    #list div.meta {
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
    }

    
    #list div.meta p {
      font-size: .75rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #FFF;
      background-color: black;
      padding: 0.5rem 1rem;
      margin: 0 0.5rem 0.5rem 0;
      font-weight: 600;
    }

    #list div.meta i {
      color: gold;
      font-size: 2rem;
    }

    #list .padding-container {
      padding: 2rem;
      position: relative;
    }
  `;
}
