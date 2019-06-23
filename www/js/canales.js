$.canales = {}

$.canales.listaCanales = [];
if ((JSON.parse(localStorage.getItem(0)) != undefined)) {
  $.canales.listaCanales = JSON.parse(localStorage.getItem(0))
} else {
  canalPorDefecto2 = { nombre: "Eurogamer (canal por defecto)", url: "https://www.eurogamer.es/?format=rss&platform=PC"}
  canalPorDefecto3 = { nombre: "ABC (canal por defecto)", url: "https://www.abc.es/rss/feeds/abc_EspanaEspana.xml"}
  $.canales.listaCanales.push(canalPorDefecto2)
  $.canales.listaCanales.push(canalPorDefecto3)
  localStorage.setItem(0, JSON.stringify($.canales.listaCanales));
}


$.canales.add = function (canal) {
  //FALTA COMPROBAR RSS O ATOM
  $.canales.listaCanales.push(canal);
  console.log($.canales.listaCanales);
  localStorage.setItem(0, JSON.stringify($.canales.listaCanales));
}


$.canales.borrarCanal = function (arrayIdCanales) {
  for (let index = 0; index < arrayIdCanales.length; index++) {
    const element = arrayIdCanales[index];
    $.canales.listaCanales[element] = 'borrar';
    console.log('Borrando: ' + element);
  }
  let listaCanalesTemporal = []
  for (let index = 0; index < $.canales.listaCanales.length; index++) {
    const element = $.canales.listaCanales[index];
    if (element != 'borrar') {
      listaCanalesTemporal.push(element);
    }

  }
  $.canales.listaCanales = listaCanalesTemporal;
  console.log($.canales.listaCanales)
  localStorage.setItem(0, JSON.stringify($.canales.listaCanales));
}


$.canales.mostrarListaCanales = function (divName) {
  //CUIDADO CON $.CANALES.LISTACANALES == NULL y CON IDS IGUALES (NOMBRE DE CANALES IGUALES)
  $('#' + divName).empty();
  $('#' + divName).addClass('hide');
  $('#' + divName).addClass('truncate');

  for (let index = 0; index < $.canales.listaCanales.length; index++) {
    let nombre_canal = "canal_" + $.canales.listaCanales[index]["nombre"];

    $('#' + divName).append('<a href="#!" id="' + nombre_canal + '" value="' + index + '"class="collection-item">' + $.canales.listaCanales[index]["nombre"] + '</a>');
    console.log("Canal: " + $.canales.listaCanales[index]["nombre"]);
    $('#' + divName).removeClass("hide");
  }
};



$.canales.mostrarListaBorrar = function (divName) {
  let canalesSeleccionadosBorrar = [];
  $('#' + divName).empty();
  $('#' + divName).addClass('hide');

  for (let index = 0; index < $.canales.listaCanales.length; index++) {
    let nombre_canal = $.canales.listaCanales[index]["nombre"];
    $('#' + divName).append('<div id="' + index + '" class="valign-wrapper"><div style="width: 100%"><div class="row"><div class="col s12"><label class="truncate"><input id="' + index + '" type="checkbox" class="filled-in channel" /><span>' + nombre_canal + '</span></label></div></div></div></div>');
    $('#' + divName).removeClass("hide");
  }

  $('.channel').click(function () {
    if ($(this).prop('checked') == true) {
      canalesSeleccionadosBorrar.push($(this).attr('id'));
      console.log(canalesSeleccionadosBorrar)
    } else {
      canalesSeleccionadosBorrar.splice($.inArray($(this).attr('id'), canalesSeleccionadosBorrar), 1);
    }
  });

  $('#botonBorrado').click(function () {
    console.log(canalesSeleccionadosBorrar);
    $.canales.borrarCanal(canalesSeleccionadosBorrar)
    canalesSeleccionadosBorrar = [];
    $.canales.mostrarListaCanales('divListaCanales');
    $('[id^="canal_"]').click(function () {
      let idCanal = [$(this).attr('value')];
      $.canales.mostrarCanal("panel_canal", idCanal);
      $.controlador.mostrar("#panel_canal");
    });
    $.controlador.mostrar("#panel_listado")
  });
}


$.canales.mostrarCanal = function (divName, listaIdCanales) {
  $("#" + divName).empty();
  var table = "<table><tr><th style='padding-top: 0px'>Noticia</th><th style='padding-top: 0px'>Descripción</th></tr>";
  for (let index = 0; index < listaIdCanales.length; index++) {
    const element = listaIdCanales[index];
    let canal = $.canales.listaCanales[element];
    console.log("test:" + $.canales.listaCanales[element])
    let cors = "https://cors-anywhere.herokuapp.com/"
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let i;
        let xmlDoc = xhttp.responseXML;
        let x = xmlDoc.getElementsByTagName("item");
        if (x[0] != undefined) { //rss
          for (i = 0; i < x.length; i++) {
            table += '<tr><td><a href="' + x[i].getElementsByTagName("link")[0].childNodes[0].nodeValue + '">' +
              x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue +
              "</a></td><td>" +
              x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue +
              "</td></tr>";
          }
        } else { //atom
          x = xmlDoc.getElementsByTagName("entry");
          for (i = 0; i < x.length; i++) {
            table += '<tr><td><a href="' + x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue + '">' +
              x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue +
              "</a></td><td>" +
              x[i].getElementsByTagName("summary")[0].childNodes[0].nodeValue +
              "</td></tr>";
          }
        }
        if (element == listaIdCanales[listaIdCanales.length - 1]) {
          table += "</table>"
          $("#" + divName).append(table);
        }
      }
    };
    xhttp.open("GET", cors + canal["url"], true);
    xhttp.send();
  };
}


$.canales.cargarCanalesInicio = function () {
  console.log("cargando canales inicio")
  let arrayIdCanales = []
  for (let index = 0; index < $.canales.listaCanales.length; index++) {
    arrayIdCanales.push(index);
  }
  $.canales.mostrarCanal("canalesInicio", arrayIdCanales);
}

