$(document).ready(function () {

    $('#lstKullanicilar').DataTable({
                tableTools: {
            "aButtons": [
                "copy",
                "csv",
                "xls",
                {
                    "sExtends": "pdf",
                    "sPdfOrientation": "landscape",
                    "sPdfMessage": "Your custom message would go here."
                },
                "print"
            ]
        },

        "pagingType": "simple",
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
        },
         "bFilter": true,
        "bInfo": true,
        "bSort": true
    });

    $('#cmbUniversiteler').selectize();

    $('#btnKullaniciEkle').click(function () {

        var ad = $('#txtAd').val();
        var soyad = $('#txtSoyad').val();
        var ePosta = $('#txtEPosta').val();

        if (ad == '') {
            $('#txtAd').focus();
            HataMesaji('Kullanıcının adını girmedin.');
            return false;
        }

        if (soyad == '') {
            $('#txtSoyad').focus();
            HataMesaji('Kullanıcının soyadını girmedin.');
            return false;
        }
        if (ePosta == '') {
            $('#txtEPosta').focus();
            HataMesaji('E posta adresini girmedin.');
            return false;
        }
        $('#modalKullaniciEkle').modal('hide');

       
        $("#frmKullaniciEkle").ajaxSubmit({
            url: '/Ajax/Admin/KullaniciEkle',
            type: 'post',
            success: function (msg) {
                $('#txtAd').val('');
                $('#txtSoyad').val('');
                $('#txtEPosta').val('');
                 
                alert('Kullanıcı Hesabı Başarıyla Oluşturuldu. Geçici Parola: ' + msg);

            },

            error: function () {
                 
                HataMesaji('Kullanıcı eklenirken bir hata oluştu. Bu eposta daha önce sisteme kayıt edilmiş');
            }

        });
       

    });

     $('.cmbOnayli').change(function () {
        var deger = $(this).val();
        var userID = $(this).attr('data-UserID');
        
        $.ajax({
            type: 'POST',
            url: '/Ajax/Admin/KullaniciAyarKaydet',
            data: "pk=" + userID + '&name=Onayli&value=' + deger,
            success: function (msg) {
                 
                MesajKutusu("İşlem Tamam", "Kullanıcı ayarları başarıyla kaydedildi");
            },
            error: function (msg) {
                 
                HataMesaji("Kullanıcı ayarları kaydedilirken bir hata meydana geldi !");
            }
        });
       
    });

    $('.btnGeciciParolaOlustur').click(function () {

        var userID = $(this).attr('data-UserID');
        
        $.ajax({
            type: 'POST',
            url: '/Ajax/Admin/SifreSifirla',
            data: "UserID=" + userID,
            success: function (msg) {
                 
                alert('Geçici Parola Başarıyla Oluşturuldu. Geçici Parola:' + msg);
                
            },
            error: function (msg) {
                 
                HataMesaji("Parola değiştirilmedi. İşlem Sırasında bir hata meydana geldi !");
            }
        });
       
    });

    $('.cmbRol').change(function () {
        var rol = $(this).val();
        var userID = $(this).attr('data-UserID');
       
        $.ajax({
            type: 'POST',
            url: '/Ajax/Admin/KullaniciRolDegistir',
            data: "UserID=" + userID + '&Rol=' + rol,
            success: function (msg) {
                
                MesajKutusu("İşlem Tamam", "Kullanıcı ayarları başarıyla kaydedildi");
            },
            error: function (msg) {
                
                HataMesaji("Kullanıcı ayarları kaydedilirken bir hata meydana geldi !");
            }
        });
        
    });

    $('.cmbAktif').change(function () {
        var deger = $(this).val();
        var userID = $(this).attr('data-UserID');
        
        $.ajax({
            type: 'POST',
            url: '/Ajax/Admin/KullaniciAyarKaydet',
            data: "pk=" + userID + '&name=Aktif&value=' + deger,
            success: function (msg) {
                 
                MesajKutusu("İşlem Tamam", "Kullanıcı ayarları başarıyla kaydedildi");
            },
            error: function (msg) {
                 
                HataMesaji("Kullanıcı ayarları kaydedilirken bir hata meydana geldi !");
            }
        });
       
    });


});