$(document).ready(function () {

    var tabloEgitmenDogrulamaKodlari = $('#lstEgitmenDogrulamaKodlari').DataTable({
        "pagingType": "simple",
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
        },
        "bPaginate": true,
        "bLengthChange": false,
        "bFilter": false,
        "bInfo": false,
        "bSort": false
    });
    $('.btnKodSil').click(function () {

        var kodID = $(this).attr('data-KodID');
        var row = tabloEgitmenDogrulamaKodlari.row($(this).parents('tr'));

       
        $.ajax({
            type: 'POST',
            url: '/Ajax/Admin/KodSil',
            data: "KodID=" + kodID,
            success: function (msg) {
                row.remove().draw();

            },
            error: function (msg) {
                HataMesaji("Hata ! Kod Silinemedi");
            }
        });
        
    });

    $('#btnKodEkle').click(function () {

       
        $.ajax({
            type: 'POST',
            url: '/Ajax/Admin/KodOlustur',
            data: "UyelikID=" + $('#cmbUyelikID').val(),
            success: function (msg) {
                
                tabloEgitmenDogrulamaKodlari.row.add([
                             msg,
                            '',
                            $("#cmbUyelikID option:selected").text(),
                            ''
                        ]).draw();

            },
            error: function (msg) {
                
                HataMesaji("Hata ! Kod Olusturulamadi");
            }
        });
        
    });


});