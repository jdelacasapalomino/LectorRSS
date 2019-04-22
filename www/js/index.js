$(document).ready(function () {

  $.controlador.init(panel_inicio);


  $('.sidenav').sidenav();


  $('#desktopButton').click(function () {
    $('.sidenav').sidenav('open');
  });


  $('[id^="menu_"]').each(function () {
    $(this).click(function () {
      $('.sidenav').sidenav('close');
    });
  });


  $('#botonGuardar').click(function () {
    console.log("nombre canal: " + $('#nombreCanal').val() + "; url: " + $('#url').val())
    canal = { nombre: $('#nombreCanal').val(), url: $('#url').val() }
    $.canales.add(canal);
  });


  $('#menu_listado').click(function () {
    $.canales.mostrarCanales();
    // esta parte no se ejecuta si se extrae fuera ¿Por qué?
    $('[id^="canal_"]').click(function () {
      let idCanal = $(this).attr('value');
      $.canales.mostrarCanal(idCanal);
    });
  });





});
