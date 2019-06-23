$(document).ready(function () {

  $.controlador.init(panel_inicio);
  $('.modal').modal();
  $('.sidenav').sidenav();

  $('#desktopButton').click(function () {
    $('.sidenav').sidenav('open');
  });

  $('[id^="menu_"]').each(function () {
    $(this).click(function () {
      $('.sidenav').sidenav('close');
    });
  });
  
  $('#menu_listado').click(function () {
    cargarMenuListado();
  });
  
  $('#menu_borrado').click(function borrar() {
    cargarMenuBorrado();
  });

  $('#botonGuardar').click(function () {
    //console.log("nombre canal: " + $('#nombreCanal').val() + "; url: " + $('#url').val())
    canal = { nombre: $('#nombreCanal').val(), url: $('#url').val() }
    $.canales.add(canal);
    $.controlador.mostrar("#panel_listado")
    cargarMenuListado();

  });

  $('#menu_inicio').click(function() {
    $.canales.cargarCanalesInicio();
  });

  $.canales.cargarCanalesInicio();

});


cargarMenuListado = function(){
  $.canales.mostrarListaCanales('divListaCanales');
  $('[id^="canal_"]').click(function () {
    let idCanal = [$(this).attr('value')];
    $.canales.mostrarCanal("panel_canal", idCanal);
    $.controlador.mostrar("#panel_canal");
  });
}

cargarMenuBorrado = function(){
  $.canales.mostrarListaBorrar('divListaCanalesBorrado');
    if($.canales.listaCanales.length == 0){
      $('#botonBorrado').hide();
    } else {
      $('#botonBorrado').show();
  }
}