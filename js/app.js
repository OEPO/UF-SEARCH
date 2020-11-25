$('#consulta').on('click', function() {

    $("#modal-date").modal();

})

$('.js-date').datepicker({});

$.getJSON('https://mindicador.cl/api', function(data) {
    var dailyIndicators = data;
    $("<h1/>", {
        html: 'El valor actual de la UF es $' + dailyIndicators.uf.valor
    }).appendTo("#uf-actual");
}).fail(function() {
    console.log('Error al consumir la API!');
});


$('#mes').on('click', function() {

    $.getJSON("https://mindicador.cl/api/uf/" + new Date().getFullYear(), function(data) {
        var ufvalor = data;
        var cont = 0;
        var tabla = "";
        var mes = new Date().getMonth() + 1;


        tabla += "<table class='table table-bordered'>";
        tabla += "<td>FECHA</td><td>VALOR UF</td>";

        for (var i = 1; i <= mes; i++) {

            tabla += "<tr>";

            for (var x = 0; x <= 1; x++) {

                if (x == 0) {
                    tabla += "<td>2020-" + i + "</td>";
                } else {
                    s = true;
                    while (s) {
                        console.log(i)

                        if (cont > 365) {
                            break;
                        }

                        if (i <= 9) {

                            if ((ufvalor.serie[String(cont)].fecha == "2020-0" + i + "-01T03:00:00.000Z") || (ufvalor.serie[String(cont)].fecha == "2020-0" + i + "-01T04:00:00.000Z")) {

                                tabla += "<td>" + ufvalor.serie[String(cont)].valor + "</td>";
                                cont = 0;
                                s = false;
                            }

                        } else {

                            if ((ufvalor.serie[String(cont)].fecha == "2020-" + i + "-01T03:00:00.000Z") || (ufvalor.serie[String(cont)].fecha == "2020-" + i + "-01T04:00:00.000Z")) {
                                tabla += "<td>" + ufvalor.serie[String(cont)].valor + "</td>";
                                cont = 0;
                                s = false;
                            }

                        }
                        cont += 1;
                    }
                }

            }
            tabla += "</tr>";
            $("#tabla").html(tabla);

        }
    });
});





$("#FechaBoton").on("click", function() {


    var fecha = $("#FechaSeleccionada").val();
    var fecha = fecha.split("/");
    fecha = String(fecha[1] + "-" + +fecha[0] + "-" + fecha[2]);

    $.getJSON("https://mindicador.cl/api/uf/" + fecha, function(data) {
        var ufvalor = data;
        console.log(ufvalor.serie[0].valor)
        var cont = 0;

        tabla2 += "<table class='table table-bordered'>";
        tabla2 += "<td>FECHA</td><td>VALOR UF</td>";

        tabla2 += "<tr>";

        for (var x = 0; x <= 1; x++) {

            if (x == 0) {
                tabla2 += "<td>" + fecha + "</td>";
            } else {

                tabla2 += "<td>" + ufvalor.serie[0].valor + "</td>";
            }

        }

        tabla2 += "</tr>";
        $("#tabla2").html(tabla2);
    })
});