
(function ($) {

    $.fn.DosyaSecDialog = function (eylem) {

        var defaults = $.extend({


            onImageShow: function () { }



        }, options);

        if (eylem === "Ac") {
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

            $('body').append(modalHtml);
            $('#modalDosyaSecDialog').modal();
        }

        if (eylem === "Kapat") {

        }

    };

} (jQuery));



(function($) {

   // This variable is available only inside this plugin
   var text = "Hello World";

    $.fn.helloWorld = function(options) {

        // Plugin options default values
        var settings = $.extend({
            class: "active",
            id: "hello_world_container",
            onTextAdd: function() {} // Callback function is empty by default
        }, options );

        return this.each( function() {
            $(this).text(text);
            $(this).attr("class", settings.class);
            $(this).attr("id", settings.id);
            settings.onTextAdd.call();
        });

    }

}(jQuery)); 


$("h2").helloWorld({
   onTextAdd: function() {
      alert("The text has been added.");
   }
});
