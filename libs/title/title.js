import * as events from '../events.js';
import { ofType } from '../utils.js';
const { tap } = rxjs.operators;

export default function(sources) {
  return {
    render: sources.events$.pipe(
      ofType(events.WindowLoaded),
      tap(
        () =>
          (sources.document.getElementById('title').innerHTML = `
            <h1>Learn Reactive</h1> 
            <div>
            ${['Programming', 'Frameworks', 'Theory', 'Architecture', 'Techniques']
              .map(attr => `<p>${attr}</p>`)
              .join('')}
            </div>
            <section>
            <a 
              href="https://github.com/jsonberry/learn-reactive/issues/new?assignees=jsonberry&labels=resources&template=new_resource.md&title=New+Resource+Request" 
              target="_blank"
            >
              <i class="material-icons">add_circle</i>
              Submit New Resource
            </a>
            </section>
          `),
      ),
    ),
  };
}
