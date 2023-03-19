export default function onOneCoutryMarkup(data) {
  return data.map(({ name, capital, population, flags, languages }) => {
    return `
    <div class="container">
      <img src="${flags.svg}" alt="${flags.alt}" width="100" height="60">
      <h1>${name.official}</h1>
    </div>
      <h3>Capital: ${capital} </h3>
      <h3>Population: ${population} </h3>
      <h3>Languages: ${Object.values(languages)} </h3>
  `;
  }).join('');  
  };