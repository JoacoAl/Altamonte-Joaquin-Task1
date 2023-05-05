let sectionCards = document.getElementById("section-cards-dom");

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
  <div class="card-body d-flex justify-content-between text-center">
    <p class="my-2">Price: $${objeto.price}</p>
    <a href="../pages/details.html" class="card-link">
      <button
        type="button"
        class="btn"
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
    if (objetoEvento.date >= fecha) {
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
