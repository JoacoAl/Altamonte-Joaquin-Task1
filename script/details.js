const allEvents = dataCards.events;
const articleDetails = document.getElementById("article-details");

const parametros = new URLSearchParams(location.search);
let paramterosId = parametros.get("id");
const eventoQueCoincidePorID = allEvents.find((e) => e._id == paramterosId);

articleDetails.innerHTML = `<div class="d-flex justify-content-center div-details">
<img
  class="image-details"
  src="${eventoQueCoincidePorID.image}"
  alt="Books"
/>
</div>
<div class="flip-card">
<div class="flip-card-inner p-2">
  <div class="flip-card-front">
    <p class="title">${eventoQueCoincidePorID.name}</p>
  </div>
  <div class="flip-card-back">
    <p class="title">DETAILS</p>
    <p class="textDetail">${eventoQueCoincidePorID.description}</p>
    <p class="textDetail"><span class="spanDetails">Date</span>: ${
      eventoQueCoincidePorID.date
    }</p>
    <p class="textDetail"><span class="spanDetails">Category</span> : ${
      eventoQueCoincidePorID.category
    }</p>
    <p class="textDetail"><span class="spanDetails">Place</span> : ${
      eventoQueCoincidePorID.place
    }</p>
    <p class="textDetail"><span class="spanDetails">Capacity</span> : ${
      eventoQueCoincidePorID.capacity
    }</p>
    <p class="textDetail">${
      eventoQueCoincidePorID.assistance
        ? `<span class="spanDetails">Assistance</span> :  ${eventoQueCoincidePorID.assistance}`
        : `<span class="spanDetails">Estimate</span> : ${eventoQueCoincidePorID.estimate}`
    } </p>
    <p class="textDetail"><span class="spanDetails">Price</span>: $${
      eventoQueCoincidePorID.price
    }</p>
</div> 
  </div>
</div>
</div>`;
