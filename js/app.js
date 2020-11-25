$(document).ready(function() {
    // LISTA TODOS LOS DATOS
    GetYear();

    function GetYear() {
        $.ajax({
            url: "/UF-SEARCH/php/listAll.php",
            type: "GET",
            success: function(response) {
                //console.log(response);
                let template = "";
                let uf = JSON.parse(response);
                uf.forEach((element) => {
                    template += `<tr>
                <td>${element.id}</td>
                <td>${element.fecha}</td>
                <td>${element.uf}</td>
                </tr>`;
                });
                $("#TableUF").html(template);
            }
        });
    }
    //ENTREGA EL VALOR ACTUAL DE LA UF
    $.getJSON('https://mindicador.cl/api', function(data) {
        var dailyIndicators = data;
        $("<h1/>", {
            html: 'El valor actual de la UF es $' + dailyIndicators.uf.valor
        }).appendTo("#uf-actual");
    }).fail(function() {
        console.log('Error al consumir la API!');
    });

    //cONFIGURACION PARA FECHAS ESPECIFICAS Y MES.
    $('#consulta').on('click', function() {

        $("#modal-date").modal();
        $('.js-date').datepicker({});
    })

    $('#consultaMes').on('click', function() {

            $("#modal-mes").modal();
            $(".js-dateMes").datepicker({
                format: "mm",
                viewMode: "months",
                minViewMode: "months"
            });
        })
        //CONSULTA POR MES
    $("#FechaMesButton").on('click', function() {
        let search = $("#FechaMes").val();
        $.ajax({
            url: "/UF-SEARCH/php/listMonth.php",
            type: "POST",
            data: { search: search },
            success: function(response) {
                //console.log(response);
                let template = "";
                let month = JSON.parse(response);
                month.forEach((element) => {
                    template += `<tr>
            <td>${element.id}</td>
            <td>${element.fecha}</td>
            <td>${element.uf}</td>
            </tr>`;
                });
                $("#TableUF").html(template);
            }
        });
    });


    //LISTAR UNA UNICA FECHA

    $("#FechaButton").on('click', function() {
        let search = $("#FechaSeleccionada").val();
        $.ajax({
            url: "/UF-SEARCH/php/listOne.php",
            type: "POST",
            data: { search: search },
            success: function(response) {
                //console.log(response);
                let template = "";
                let month = JSON.parse(response);
                month.forEach((element) => {
                    template += `<tr>
            <td>${element.id}</td>
            <td>${element.fecha}</td>
            <td>${element.uf}</td>
            </tr>`;
                });
                $("#TableUF").html(template);
            }
        });
    });
});