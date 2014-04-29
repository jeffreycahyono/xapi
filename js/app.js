var apiUrl = '/xapi/api/kamus';
var tplItemKata = _.template($('#itemKata').html());
var tplListFrame = _.template($('#listFrame').html());
var tplItemDetail = _.template($('#itemDetail').html());



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
    //alert("Action adalah "+  data.action);
});








