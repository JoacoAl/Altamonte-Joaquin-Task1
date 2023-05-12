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
<div class="divPrice card-body d-flex justify-content-between text-center align-items-center">
  <p class="my-2">Price: $${objeto.price}</p>
  <a href="../pages/details.html?id=${objeto._id}" class="card-link">
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

function filtroPorFecha(arrayEventos, fecha) {
  const eventosFiltro = [];
  for (let objetoEvento of arrayEventos) {
    if (objetoEvento.date < fecha) {
      eventosFiltro.push(objetoEvento);
    }
  }
  return eventosFiltro;
}
filtroPorFecha(dataCards.events, dataCards.currentDate);
//Guardar el array que esta dentro de la funcio, en una variable fuera de la funcion
let arrayFiltroEventos = filtroPorFecha(
  dataCards.events,
  dataCards.currentDate
);

function bucleCards(infoEvents, cardPlace) {
  let template = "";
  for (let cardinfo of infoEvents) {
    template += maquetaDeCards(cardinfo);
  }
  cardPlace.innerHTML += template;
}

bucleCards(arrayFiltroEventos, sectionCards);

/* task3 */
inputSearchBar.addEventListener("input", (e) => {
  const checkboxActivados = Array.from(
    document.querySelectorAll("input[type='checkbox']:checked")
  ).map((check) => check.value);
  let cardsFiltradas = filtrarCards(arrayFiltroEventos, checkboxActivados);
  sectionCards.innerHTML = "";
  let aux = filtrarTitulo(cardsFiltradas, inputSearchBar.value);
  /*   bucleCards(aux, sectionCards); */
  imprimirCardsFiltradas(aux, sectionCards);
});

function filtrarTitulo(arrayData, busquedaDelUsuario) {
  return arrayData.filter((e) =>
    e.name.toLowerCase().includes(busquedaDelUsuario.toLowerCase())
  );
}
function imprimirCardsFiltradas(arrayFiltradoPorTexto, lugarCards) {
  if (arrayFiltradoPorTexto.length === 0) {
    lugarCards.innerHTML = `<h3 class="h3-noresults">No results found for your search</h3>`;
  } else {
    const mostrarEnPantalla = arrayFiltradoPorTexto
      .map((e) => maquetaDeCards(e))
      .join("");
    lugarCards.innerHTML = mostrarEnPantalla;
  }
}

function maquetaDeCheckbox(categoriasSinDuplicar) {
  return `<div class="form-check d-flex align-items-start mx-1">
  <input
    class="form-check-input"
    type="checkbox"
    value="${categoriasSinDuplicar}"
    id="${categoriasSinDuplicar}-id"
  />
  <label class="form-check-label label-checks text-light" for="${categoriasSinDuplicar}-id">
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

let categorias = allEvents.map((e) => e.category);
console.log(categorias);
let categoriasSinDuplicar = [...new Set(categorias)]; //... (spread) rompe el set y crea un nuevo array, el set no permite elementos duplicados. Entonces las categorias quedan sin duplicar.
console.log(categoriasSinDuplicar);

imprimirCheckbox(categoriasSinDuplicar, divContenedorChecks);

divContenedorChecks.addEventListener("change", () => {
  const checkboxActivados = Array.from(
    document.querySelectorAll("input[type='checkbox']:checked")
  ).map((check) => check.value);
  let cardsFiltradas = filtrarCards(arrayFiltroEventos, checkboxActivados);
  sectionCards.innerHTML = "";
  let aux = filtrarTitulo(cardsFiltradas, inputSearchBar.value);
  /* bucleCards(aux, sectionCards); */
  imprimirCardsFiltradas(aux, sectionCards);
});

function filtrarCards(arrayData, categorias) {
  if (categorias.length == 0) {
    return arrayData;
  } else {
    return arrayData.filter((e) => {
      return categorias.includes(e.category);
    });
  }
}
