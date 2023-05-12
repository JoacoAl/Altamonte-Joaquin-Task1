let sectionCards = document.getElementById("section-cards-dom");
/* task3 */
let inputSearchBar = document.getElementById("buscarPorTexto");
let allEvents = dataCards.events;
let divContenedorChecks = document.getElementById("contenedorCheckbox");
let checkboxInput = document.querySelectorAll("input[type='checkbox']");

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

function bucleCards(infoEvents, cardPlace) {
  let template = "";
  for (let cardinfo of infoEvents) {
    template += maquetaDeCards(cardinfo);
  }
  cardPlace.innerHTML += template;
}

bucleCards(allEvents, sectionCards);

/* task3 */
//evento, searchbar( filtro cruzado dentro)
inputSearchBar.addEventListener("input", (e) => {
  const checkboxActivados = Array.from(
    document.querySelectorAll("input[type='checkbox']:checked")
  ).map((check) => check.value);
  let cardsFiltradas = filtrarCards(allEvents, checkboxActivados);
  sectionCards.innerHTML = "";
  let aux = filtrarTitulo(cardsFiltradas, inputSearchBar.value);
  /*   bucleCards(aux, sectionCards); */
  imprimirCardsFiltradas(aux, sectionCards);
});

//filtro por titulo
function filtrarTitulo(arrayData, busquedaDelUsuario) {
  return arrayData.filter((e) =>
    e.name.toLowerCase().includes(busquedaDelUsuario.toLowerCase())
  );
}

//imprimir las cards, con el filtro por titulo
function imprimirCardsFiltradas(arrayFiltradoPorTexto, lugarCards) {
  if (arrayFiltradoPorTexto.length === 0) {
    lugarCards.innerHTML = `<h3>No se encuentra un resultado a tu busqueda</h3>`;
  } else {
    const mostrarEnPantalla = arrayFiltradoPorTexto
      .map((e) => maquetaDeCards(e))
      .join("");
    lugarCards.innerHTML = mostrarEnPantalla;
  }
}

//maqueta de las checkbox
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

//imprimir las checkbox
function imprimirCheckbox(arrayCategorias, dondeImprimirChecks) {
  let template = "";
  for (const objetoCategorias of arrayCategorias) {
    template += maquetaDeCheckbox(objetoCategorias);
  }
  dondeImprimirChecks.innerHTML += template;
}

//las categorias las filtro y saco el duplicado
let categorias = allEvents.map((e) => e.category);
console.log(categorias);
let categoriasSinDuplicar = [...new Set(categorias)]; //... (spread) rompe el set y crea un nuevo array, el set no permite elementos duplicados. Entonces las categorias quedan sin duplicar.
console.log(categoriasSinDuplicar);

imprimirCheckbox(categoriasSinDuplicar, divContenedorChecks);

//evento de checkbox(con filtro cruzado incluido)
divContenedorChecks.addEventListener("change", () => {
  const checkboxActivados = Array.from(
    document.querySelectorAll("input[type='checkbox']:checked")
  ).map((check) => check.value);
  let cardsFiltradas = filtrarCards(allEvents, checkboxActivados);
  sectionCards.innerHTML = "";
  let aux = filtrarTitulo(cardsFiltradas, inputSearchBar.value);
  /*   bucleCards(aux, sectionCards); */
  imprimirCardsFiltradas(aux, sectionCards);
});

//filtro de las cards
function filtrarCards(arrayData, categorias) {
  if (categorias.length == 0) {
    return arrayData;
  } else {
    return arrayData.filter((e) => {
      return categorias.includes(e.category); // me retorna los checksbox activados con sus respectivas categorias
    });
  }
}
