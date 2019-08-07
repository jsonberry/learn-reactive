document.getElementById('title').innerHTML = `
  <h1>Learn Reactive</h1> 
  <div>
  ${['Theory', 'Programming', 'Techniques', 'Frameworks']
    .map(attr => `<p>${attr}</p>`)
    .join('')}
  </div>
`;
