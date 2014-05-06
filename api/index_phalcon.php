<?php

require "kamus.php";

$noun = $_GET['_url'];
$noun = rtrim($noun, '/');
$verb = $_SERVER['REQUEST_METHOD'];

header("Content-type: application/json");

$app = new \Phalcon\Mvc\Micro();

$app->get('/kamus', function(){
    ambilSemuaData();
    //echo json_encode(array(1,2,3));
});

$app->get('/kamus/{kata}', function($kata){
    ambilItemData($kata);
});

$app->put('/kamus/{kata}', function($kata){
    editData($kata);
});

$app->delete('/kamus/{kata}', function($kata){
    hapusData($kata);
});

$app->notFound(function () use ($app) {
    errorEuy('Operasi tidak dikenal');
});

$app->handle();


/*
//melihat semua kata
if($noun=='/kamus' && $verb=='GET'){
    ambilSemuaData();
}
//membuat data baru
else if($noun=='/kamus' && $verb=='POST'){
    buatData();
}
//mengambil satu kata saja
else if( preg_match('/^\/kamus\/([A-Za-z0-9\- ]+)/', $noun, $matches)>0
    && $verb=='GET' ){
    //print_r($matches);
    $kata = $matches[1];
    ambilItemData($kata);
}
//edit data
else if( preg_match('/^\/kamus\/([A-Za-z0-9\- ]+)/', $noun, $matches)>0
    && $verb=='PUT' ){
    $kata = $matches[1];
    editData($kata);
}
//delete data
else if( preg_match('/^\/kamus\/([A-Za-z0-9\- ]+)/', $noun, $matches)>0
    && $verb=='DELETE' ){
    $kata = $matches[1];
    hapusData($kata);
}
else {
    errorEuy('Operasi tidak dikenal');
}

*/