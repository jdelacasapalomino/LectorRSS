$.canales = {}
$.canales.listaCanales = [];

if ((JSON.parse(localStorage.getItem(0)) != undefined)) {
    $.canales.listaCanales = JSON.parse(localStorage.getItem(0))
}



$.canales.add = function (canal) {

    //FALTA COMPROBAR RSS O ATOM
    $.canales.listaCanales.push(canal)
    console.log($.canales.listaCanales);
    localStorage.setItem(0, JSON.stringify($.canales.listaCanales));

}

//CUIDADO CON $.CANALES.LISTACANALES == NULL y CON IDS IGUALES (NOMBRE DE CANALES IGUALES)

$.canales.mostrarCanales = function () {
    $('#divCanales').empty();
    for (let index = 0; index < $.canales.listaCanales.length ; index++) {
        let nombre_canal = "canal_" + $.canales.listaCanales[index]["nombre"];

        $('#divCanales').append('<a href="#!" id="' + nombre_canal + '" value="' + index + '"class="collection-item">Nombre canal: ' + $.canales.listaCanales[index]["nombre"] + '</a>');
        console.log("Canal: " + $.canales.listaCanales[index]["nombre"]);
        $('#divCanales').removeClass("hide");
    }
}

$.canales.mostrarCanal = function (idCanal) {

    //FALTA COMPROBAR RSS O ATOM

    let canal = $.canales.listaCanales[idCanal];
    let cors = "https://cors-anywhere.herokuapp.com/"
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var i;
            var xmlDoc = xhttp.responseXML;
            var table = "<tr><th>TITLE</th><th>DESCRIPTION</th></tr>";
            var x = xmlDoc.getElementsByTagName("item");
            for (i = 0; i < x.length; i++) {
                table += '<tr><td><a href="' + x[i].getElementsByTagName("link")[0].childNodes[0].nodeValue + '">' +
                    x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue +
                    "</a></td><td>" +
                    x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue +
                    "</td></tr>";
            }
            document.getElementById("contenidoCanal").innerHTML = table;
        }
    };
    xhttp.open("GET", cors + canal["url"], true);
    xhttp.send();
    $.controlador.mostrar("#panel_canal");
};

