$(document).ready(function () {

  $('.sidenav').sidenav();

  $.controlador.init(panel_inicio);

  $('#desktopButton').click(function () {
    $('.sidenav').sidenav('open');
  });
  
});