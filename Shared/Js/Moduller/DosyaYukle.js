       var maxBlockSize = 1 * 1024 * 1024;
       var numberOfBlocks = 1;
       var selectedFile = null;
       var currentFilePointer = 0;
       var totalBytesRemaining = 0;
       var blockIds = new Array();
       var blockIdPrefix = "block-";
       var submitUri = null;
       var bytesUploaded = 0;
       var yVarmi = true;
       var azureDosyaAdi = '';

function DegiskenleriSifirla()
{
    selectedFile = null;
    currentFilePointer = 0;
    totalBytesRemaining = 0;
    blockIds = [];
    submitUri = null;
    bytesUploaded = 0;
    yVarmi = true;
    azureDosyaAdi = '';
    $('#uploadProgress').attr('value', 0);
}

function AzureDosyaYukle(file)
{
           if (file == null) {
                //hata
               return false;
           }
           $('.Modal').modal('hide');
           ajaxUIBlock = false;
           handleFileSelect();
           UIBlockProgress();
           $.ajax({
               type: 'GET',
               url: '/Ajax/Dosya/YeniGuid',
               success: function (res) {

                   azureDosyaAdi = res + '.' + selectedFile.name.substr(selectedFile.name.lastIndexOf('.') + 1);


                   $.ajax({
                       type: 'GET',
                       url: '/Ajax/Dosya/AzureSaSOlustur?AzureDosyaAdi=' + azureDosyaAdi,

                       success: function (res) {
                           submitUri = res;
                           uploadFileInBlocks();

                       },
                       error: function (res, status, xhr) {
                           HataMesaji("Microsoft Azure: Can't get the Shared Access Signature");
                       }
                   });

               },
               error: function (res) {
                   HataMesaji(mesajlar.dosyaeklenirkenhata);
                   return false;
               }
           }); 
}   



function handleFileSelect(dosya) {
           maxBlockSize = 1 * 1024 * 1024;
           currentFilePointer = 0;
           totalBytesRemaining = 0;

           //selectedFile = $('#txtDosya')[0].files[0];
           selectedFile = dosya;

           var fileSize = selectedFile.size;
           if (fileSize < maxBlockSize) {
               maxBlockSize = fileSize;

           }
           totalBytesRemaining = fileSize;
           if (fileSize % maxBlockSize == 0) {
               numberOfBlocks = fileSize / maxBlockSize;
           } else {
               numberOfBlocks = parseInt(fileSize / maxBlockSize, 10) + 1;
           }

       }

   var reader = new FileReader();

   reader.onloadend = function (evt) {
           if (evt.target.readyState == FileReader.DONE) {
               var uri = submitUri + '&comp=block&blockid=' + blockIds[blockIds.length - 1];
               var requestData = new Uint8Array(evt.target.result);
               $.ajax({
                   url: uri,
                   type: "PUT",
                   data: requestData,
                   processData: false,
                   beforeSend: function (xhr) {
                       xhr.setRequestHeader('x-ms-blob-type', 'BlockBlob');

                   },
                   success: function (data, status) {
                       bytesUploaded += requestData.length;
                       var percentComplete = ((parseFloat(bytesUploaded) / parseFloat(selectedFile.size)) * 100).toFixed(1);
                       $('#uploadProgress').attr('value', percentComplete);

                       uploadFileInBlocks();
                   },
                   error: function (xhr, desc, err) {
                       
                   }
               });
           }
       };

    function uploadFileInBlocks() {
           if (totalBytesRemaining > 0) {

               var fileContent = selectedFile.slice(currentFilePointer, currentFilePointer + maxBlockSize);
               var blockId = blockIdPrefix + pad(blockIds.length, 6);

               blockIds.push(btoa(blockId));
               reader.readAsArrayBuffer(fileContent);
               currentFilePointer += maxBlockSize;
               totalBytesRemaining -= maxBlockSize;
               if (totalBytesRemaining < maxBlockSize) {
                   maxBlockSize = totalBytesRemaining;
               }
           } else {
               commitBlockList();
           }
       }

    function commitBlockList() {
           var uri = submitUri + '&comp=blocklist';

           var requestBody = '<?xml version="1.0" encoding="utf-8"?><BlockList>';
           for (var i = 0; i < blockIds.length; i++) {
               requestBody += '<Latest>' + blockIds[i] + '</Latest>';
           }
           requestBody += '</BlockList>';

           $.ajax({
               url: uri,
               type: "PUT",
               data: requestBody,
               beforeSend: function (xhr) {
                   xhr.setRequestHeader('x-ms-blob-content-type', selectedFile.type);

               },
               success: function (data, status) {


                   //dosya başarıyla yüklendi
                   return data;

               },
               error: function (xhr, desc, err) {
                   //dosya yuklemede hata
               }
           });

       }
    
    function pad(number, length) {
           var str = '' + number;
           while (str.length < length) {
               str = '0' + str;
           }
           return str;
       }