$.controlador = {};

$.controlador.panel_nuevo;
$.controlador.panel_activo;

$.controlador.init = function (panel) {

    $.controlador.panel_activo = panel;

    $('[id^="panel_"]').each(function () {
        $(this).hide();
    });

    $.controlador.mostrar($.controlador.panel_activo);

    $('[id^="menu_"]').each(function () {
        let id = $(this).attr('id').substring(5);

        $("#menu_" + id).click(function () {
            console.log("#panel_" + id);
            $.controlador.mostrar("#panel_" + id);
        });
    });

}


$.controlador.mostrar = function (panel) {

    $($.controlador.panel_activo).hide();
    $($.controlador.panel_nuevo).hide();
    $.controlador.panel_activo = panel;
    console.log("test");
    $(panel).show();
    

};


