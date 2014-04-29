var apiUrl = '/xapi/api/kamus';
var tplItemKata = _.template($('#itemKata').html());
var tplListFrame = _.template($('#listFrame').html());



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




$(".menuitem").click(function(){
    $(".menuitem").removeClass('active');
    $(this).addClass('active');
});

$('body').on('click', '[data-action]', function(){
    var data = $(this).data(),
        action  = data.action;
    if(action == 'list'){
        redrawList();
    }
    //alert("Action adalah "+  data.action);
});
