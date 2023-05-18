/* task2 */
let sectionCards = document.getElementById("section-cards-dom");
/* task3 */
let inputSearchBar = document.getElementById("buscarPorTexto");
let divContenedorChecks = document.getElementById("contenedorCheckbox");
let checkboxInput = document.querySelectorAll("input[type='checkbox']");
/* task4 */
let arrayEventos;
let eventos;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((data) => data.json())
  .then((res) => {
    arrayEventos = res;
    eventos = arrayEventos.events;
    let categorias = eventos.map((e) => e.category);
    let categoriasSinDuplicar = [...new Set(categorias)];
    imprimirCheckbox(categoriasSinDuplicar, divContenedorChecks);
    bucleCards(eventos, sectionCards);
    imprimirCardsFiltradas(aux, sectionCards);
  })
  .catch((err) => console.log(err));

/* task2 */

function maquetaDeCards(objeto) {
  return `<div class="card" style="width: 18rem">
  <img
    src="${objeto.image}"
    class="card-img-top img-cards"
    alt="cine"
  />
  <div class="card-body">
    <h5 class="card-title">${objeto.name}</h5>
    <p class="card-text">
      ${objeto.description}
    </p>
  </div>
  <div class=" divPrice card-body d-flex justify-content-between text-center align-items-center ">
    <p class="my-2">Price: $${objeto.price}</p>
    <a href="./pages/details.html?id=${objeto._id}" class="card-link">
      <button
        type="button"
        class="btn seeMore"
        style="background-color: #ddc2ff"
      >
        Show More
      </button>
    </a>
  </div>
  </div>`;
}

function bucleCards(infoEvento, lugarDondeImprimoCards) {
  let template = "";
  for (let cardinfo of infoEvento) {
    template += maquetaDeCards(cardinfo);
  }
  lugarDondeImprimoCards.innerHTML += template;
}

/* task3 */

inputSearchBar.addEventListener("input", (e) => {
  const checkboxActivados = Array.from(
    document.querySelectorAll("input[type='checkbox']:checked")
  ).map((check) => check.value); //el map me retorna un array nuevo con los value indicados
  let cardsFiltradas = filtrarCards(eventos, checkboxActivados);
  sectionCards.innerHTML = "";
  let aux = filtrarTitulo(cardsFiltradas, inputSearchBar.value);
  imprimirCardsFiltradas(aux, sectionCards);
});

divContenedorChecks.addEventListener("change", () => {
  const checkboxActivados = Array.from(
    document.querySelectorAll("input[type='checkbox']:checked")
  ).map((check) => check.value);
  let cardsFiltradas = filtrarCards(eventos, checkboxActivados);
  sectionCards.innerHTML = "";
  let aux = filtrarTitulo(cardsFiltradas, inputSearchBar.value);
  imprimirCardsFiltradas(aux, sectionCards);
});

function maquetaDeCheckbox(categoriasSinDuplicar) {
  return `<div class="form-check d-flex align-items-start mx-1">
  <input
    class="form-check-input"
    type="checkbox"
    value="${categoriasSinDuplicar}"
    id="${categoriasSinDuplicar}-id"
  />
  <label class="form-check-label text-light label-checks" for="${categoriasSinDuplicar}-id">
    ${categoriasSinDuplicar}
  </label>
</div>
`;
}

function imprimirCheckbox(arrayCategorias, dondeImprimirChecks) {
  let template = "";
  for (const objetoCategorias of arrayCategorias) {
    template += maquetaDeCheckbox(objetoCategorias);
  }
  dondeImprimirChecks.innerHTML += template;
}

function filtrarTitulo(arrayData, busquedaDelUsuario) {
  return arrayData.filter((e) =>
    e.name.toLowerCase().includes(busquedaDelUsuario.toLowerCase())
  );
}
function filtrarCards(arrayData, categorias) {
  if (categorias.length == 0) {
    return arrayData;
  } else {
    return arrayData.filter((e) => {
      return categorias.includes(e.category); // categorias = checkboxActivado
    });
  }
}
function imprimirCardsFiltradas(arrayFiltradoPorTexto, lugarCards) {
  if (arrayFiltradoPorTexto.length === 0) {
    lugarCards.innerHTML = `<h3 class="h3-noresults">
    No result found for your search</h3>`;
  } else {
    const mostrarEnPantalla = arrayFiltradoPorTexto
      .map((e) => maquetaDeCards(e)) // recorre el array y lo lleva a la maqueta de la card, para imprimirlas
      .join("");
    lugarCards.innerHTML = mostrarEnPantalla;
  }
}
