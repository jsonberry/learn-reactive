document.getElementById('title').innerHTML = `
<h1>Learn Reactive</h1> 
<div>
 ${[
   'Theory',
   'ᕕ( ᐛ )ᕗ',
   'Programming',
   'ʕ◕ᴥ◕ʔ',
   'Techniques',
   '(งಠ_ಠ)ง',
   'Frameworks',
 ]
   .map(attr => `<p>${attr}</p>`)
   .join('')}
</div>
`;

styles: {
  const styles = document.createElement('style');
  document.querySelector('head').appendChild(styles);
  styles.innerText = `
    #title h1 {
      font-size: 4rem;
      text-align: center;
      margin-bottom: 0;
    }

    #title div {
      text-align: center;
    }

    #title p {
      color: #757575;
      display: inline-block;
      margin-right: 1rem;
    }

    #title p:nth-of-type(even) {
      color: #212121;
    }
  `;
}
