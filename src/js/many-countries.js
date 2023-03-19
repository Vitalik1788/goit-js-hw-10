export default function onManyCountryMarkup(data) {
  return data
    .map(({ name, flags }) => {
      return `
      <li class='country-item'>
      <img src="${flags.svg}" alt="${flags.alt}" width="100" height="60">
      <h1> ${name.official} </h1>
      </li>    
    `;
    })
    .join('');    
}
