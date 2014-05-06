var apiUrl = '/xapi/api/kamus';
var tplItemKata = _.template($('#itemKata').html());
var tplListFrame = _.template($('#listFrame').html());
var tplItemDetail = _.template($('#itemDetail').html());

var listKata = null;


function htmlRedrawList(data){
    var html = "";
    _.each(data, function(item){
        if( item && !_.isEmpty(item.kata) && !_.isEmpty(item.arti))
            html = html + tplItemKata(item);
    });
    html = tplListFrame({content: html});
    console.log(html);
    $('#mainbox').html(html);
}

function redrawList(){
    $.getJSON(apiUrl)
        .done(function(data ){
            listKata = data;
            htmlRedrawList(data);
        });
}

function fetchDetail(kata, callback){
    $.getJSON(apiUrl + '/' + encodeURIComponent(kata))
        .done(function(data){
            callback(data);
        });
}

function drawDetail(kata){
    var draw  = function(data){
        $('#mainbox').html( tplItemDetail(data) );
    };

    fetchDetail(kata, draw);
}


$(".menuitem").click(function(){
    $(".menuitem").removeClass('active');
    $(this).addClass('active');
});

function showFrm(judul,kata, arti) {
    var isCreate = _.isEmpty(kata);

    kata = kata || '';
    arti = arti || '';
    $('.judul').html(judul);
    $('[name="kata"]').val(kata);
    $('[name="arti"]').val(arti);
    $('#savebtn').data('isCreate', isCreate);
    $('#frm').modal('show');
}

$('#savebtn').click(function(){
    var data = {
        kata : $('[name="kata"]').val(),
        arti : $('[name="arti"]').val()
    };
    var isCreate = $('#savebtn').data('isCreate');

    var options = {
        data :  JSON.stringify(data),
        processData : false,
        type : (isCreate) ? 'POST' : 'PUT',
    };
    var url = apiUrl;
    if(!isCreate)
        url = url + '/' + data.kata;
    $.ajax(url, options)
        .done(function(data){
            alert('Berhasil menambah kata '+ data.kata);
            redrawList();
        })
        .fail(function(xhr){
            alert('Gagal menambah kata : ' + xhr.responseText);
        });
    $('#frm').modal('hide');
});

function delKata(kata){
    var url = apiUrl + '/' + kata;
    options = {
        type : 'DELETE',
    };

    $.ajax(url, options)
        .done(function(data){
            alert('Berhasil menghapus kata '+ kata);
            redrawList();
        })
        .fail(function(xhr){
            alert('Gagal menghapus kata : ' +
                xhr.responseText);
        });
}

$('body').on('click', '[data-action]', function(){
    var data = $(this).data(),
        action  = data.action,
        kata = data.kata || '';
    if(action == 'list'){
        redrawList();
    }
    else if (action == 'view'){
        drawDetail(kata);

    }
    else if( action  == 'tambah'){
        showFrm('Tambah Kata');
    }
    else if(action  == 'edit'){
        var objedit = _.find(listKata,function(obj, key){
            if(key==kata)
                return obj;
        });
        showFrm('Edit Kata',objedit.kata, objedit.arti);
        //console.log(objedit);
    }
    else if(action == 'del'){
        if( confirm('Yakin menghapus kata ' + kata)){
            delKata(kata);
        }
    }
    //alert("Action adalah "+  data.action);
});

$(function(){
    redrawList();
});



