
var DosyaSecDialog = (function () {
    var secilenDosyaID = -1;
    var dosyaYuklemeDugmesi = false;
    var gosterilenKonum = -1;
    var modalHtml = '' +
    '<div class="modal" id="modalDosyaSecDialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel4" aria-hidden="true">' +
          '<div class="modal-dialog">' +
            '<div class="modal-content">' +
              '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                '<h4 class="modal-title" id="myModalLabel4">Dosya Seç</h4>' +
              '</div>' +
              '<div class="modal-body" style="height:300px;overflow: auto;">' +
                '<i class="fa fa-spinner fa-spin fa-2x hide" id="spinnerIconDers"></i>' +
                '<table class="table table-hover" id="tableDosyaListesi">' +


                '</table>' +
              '</div>' +
              '<div class="modal-footer">' +
                  '<button type="button" class="btn btn-primary" id="btnDosyaSecDialogTamam">Tamam</button>' +
                  '<button type="button" class="btn btn-default" data-dismiss="modal">Iptal</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
    '</div>';


    var Goster = function () {
        $('body').append(modalHtml);
        $('#modalDosyaSecDialog').modal();

      
        $('#modalDosyaSecDialog').on('hidden.bs.modal', function (e) {

            $('#modalDosyaSecDialog').remove();
            DosyaSecDialog.dispatchEvent(olay);
        });
    };

    var Gizle = function () {

    };

   


    return {
        Goster: Goster,
        Gizle: Gizle,
        DosyaYuklemeDugmesi: dosyaYuklemeDugmesi,
        SecilenDosyaID: secilenDosyaID
    };
})();
 
feature.publicThing; // "not secret"
 
// Logs "secret" and changes the value of privateThing
feature.sayPrivateThing();