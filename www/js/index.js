$(document).ready(function () {

  $('.sidenav').sidenav();

  $.controlador.init(panel_inicio);

  $('#desktopButton').click(function () {
    $('.sidenav').sidenav('open');
  });


  $('[id^="menu_"]').each(function () {
    $(this).click(function () {
      $('.sidenav').sidenav('close');
    });
  });

  $('#boton_guardar').click(function() {
      console.log( "nombre canal: " + $('#nombre').val()  +  "url: " + $('#url').val() )
    });



});