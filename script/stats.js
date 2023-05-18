let tabla = document.getElementById("tabla");

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((data) => data.json())
  .then((res) => {
    const arrayEventos = res;
    const eventos = arrayEventos.events;
    console.log(arrayEventos);
    const eventosPasados = eventos.filter(
      (e) => e.date < arrayEventos.currentDate
    );
    const eventosFuturos = eventos.filter(
      (e) => e.date > arrayEventos.currentDate
    );
    let arrayAsistenciaOrdenado = [...eventosPasados].sort(
      (a, b) =>
        porcentaje(a.capacity, a.assistance) -
        porcentaje(b.capacity, b.assistance)
    );
    let arrayAsistenciaOrdenado2 = [...eventosPasados].sort(
      (a, b) =>
        porcentaje(a.assistance, a.capacity) -
        porcentaje(b.assistance, b.capacity)
    );
    function porcentaje(asistencia, capacidad) {
      return asistencia / (capacidad / 100);
    }
    function porcenMAYOR() {
      let eventoMayorPorcentaje = arrayAsistenciaOrdenado[0];
      let porcentajeMayor = porcentaje(
        eventoMayorPorcentaje.assistance,
        eventoMayorPorcentaje.capacity
      ).toFixed(2);
      return `${eventoMayorPorcentaje.name} ${porcentajeMayor}%`;
    }
    function porcenMENOR() {
      let eventoMenorPorcentaje = arrayAsistenciaOrdenado2[0];
      let porcentajeMenor = porcentaje(
        eventoMenorPorcentaje.assistance,
        eventoMenorPorcentaje.capacity
      ).toFixed(2);
      return `${eventoMenorPorcentaje.name} ${porcentajeMenor}%`;
    }
    function capacidadMAYOR() {
      let arrayCapacidadOrdenado = [...eventos].sort(
        (a, b) => b.capacity - a.capacity
      );
      let eventoMayorCapacidad = arrayCapacidadOrdenado[0];
      return `${eventoMayorCapacidad.name} ${eventoMayorCapacidad.capacity}`;
    }
    function estadisticasTablaPast() {
      let categorias = eventosPasados.map((e) => e.category);
      let categoriasPast = [...new Set(categorias)];
      // objeto donde va a estar guardado la categoria, el ingreso, y el %asistencia
      let estadisticasObjeto = {};
      let template = "";
      //bucle de bucle para poder sacar
      for (let categoria of categoriasPast) {
        let ingresos = 0;
        let asistencia = 0;
        let capacidad = 0;
        for (let evento of eventosPasados) {
          if (evento.category == categoria) {
            ingresos += evento.assistance * evento.price;
            asistencia += evento.assistance;
            capacidad += evento.capacity;
          }
        }
        let porcentajeTotalAsistencia = asistencia / (capacidad / 100);

        estadisticasObjeto[categoria] = {
          ingresos: ingresos,
          porcentajeTotalAsistencia: porcentajeTotalAsistencia.toFixed(2),
        };
      }
      for (const categoria of categoriasPast) {
        template += `<tr>
        <td>${categoria}</td>
        <td>$${estadisticasObjeto[categoria].ingresos.toLocaleString()}</td>
        <td>${estadisticasObjeto[categoria].porcentajeTotalAsistencia}%</td>
      </tr>`;
      }
      return template;
    }
    function estadisticasTablaUpcoming() {
      let categorias = eventosFuturos.map((e) => e.category);
      let categoriasUpco = [...new Set(categorias)];
      let estadisticasObjeto = {};
      let template = "";

      for (let categoria of categoriasUpco) {
        let ingresos = 0;
        let asistencia = 0;
        let capacidad = 0;
        for (let evento of eventosFuturos) {
          if (evento.category == categoria) {
            ingresos += evento.estimate * evento.price;
            asistencia += evento.estimate;
            capacidad += evento.capacity;
          }
        }
        let porcentajeTotalAsistencia = asistencia / (capacidad / 100);

        // objeto nuevo con la info que quiero imprimir
        estadisticasObjeto[categoria] = {
          ingresos: ingresos,
          porcentajeTotalAsistencia: porcentajeTotalAsistencia.toFixed(2),
        };
      }
      console.log(estadisticasObjeto);
      for (const categoria of categoriasUpco) {
        template += `<tr>
        <td>${categoria}</td>
        <td>$${estadisticasObjeto[categoria].ingresos.toLocaleString()}</td>
        <td>${estadisticasObjeto[categoria].porcentajeTotalAsistencia}%</td>
      </tr>`;
      }
      return template;
    }
    function imprimirTabla() {
      return `
      <h2 class="h2-stats">Events Statics</h2>
      <table id="tabla-stats" class="col-12">
      
      <thead>
      <tr>
        <th>Events with the highest percentage of attendance</th>
        <th>Events with the lowest percentage of attendance</th>
        <th>Events with larger capacity</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td id="mayor-porcentaje">${porcenMAYOR()}</td>
        <td id="menor-porcentaje">${porcenMENOR()}</td>
        <td id="mayor-capacidad">${capacidadMAYOR()}</td>
      </tr>
    </tbody>
    </table>
    <h2 class="h2-stats">Upcoming events statistics by category</h2>
    <table id="tabla-stats1" class="col-12">
    <thead>
      <tr>
        <th>Categories</th>
        <th>Revenues</th>
        <th>Percentage of attendance</th>
      </tr>
    </thead>
    <tbody>
    ${estadisticasTablaUpcoming()}
    </tbody>
    </table>
    <h2 class="h2-stats">Past events statistics by category</h2>
    <table id="tabla-stats2" class="col-12">
    <thead>
      <tr>
        <th>Categories</th>
        <th>Revenues</th>
        <th>Percentage of attendance</th>
      </tr>
    </thead>
    <tbody>${estadisticasTablaPast()}</tbody>
    </table>
    `;
    }
    tabla.innerHTML += imprimirTabla();
  })
  .catch((err) => console.log(err));
