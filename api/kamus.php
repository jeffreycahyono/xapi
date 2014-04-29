<?php

require "db.php";


function errorEuy($desc, $judul="Bad Request", $code=
    400){
  header("HTTP/1.1 $code $judul");
  echo( json_encode($desc));
  exit();
}

function ambilSemuaData(){
    $allData = readXData();
    echo json_encode($allData);
}

function ambilItemData($kata){
    $data = getX($kata);
    echo json_encode($data);
}

/*
function ambilData () {
  if(isset($_GET["kata"])){
    $kata = $_GET["kata"];
    $data = getX($kata);
    echo json_encode($data);
  }
  else {
    $allData = readXData();
    echo json_encode($allData);
  }
}
*/

function buatData () {
  $input=file_get_contents("php://input");
  $data = json_decode($input, TRUE);
  //print_r($data);
  $kata = $data['kata'];
  if(isExistsX($kata))
    errorEuy("Kata $kata sudah ada");
  else
    storeX($data['kata'],$data);
  echo json_encode($data);
}

function editData ($kata) {
  $input=file_get_contents("php://input");
  $data = json_decode($input, TRUE);
  //$kata = $data['kata'];
  if(!isExistsX($kata))
    errorEuy("Kata $kata belum ada");
  else
    storeX($data['kata'],$data);
  echo json_encode($data);
}

function hapusData ($kata) {
  //$kata = $_GET['kata'];
  if(!isExistsX($kata))
    errorEuy("Kata $kata tidak ada");
  delX($kata);
  echo json_encode(TRUE);
}

/*
switch($verb){
    case 'GET' : ambilData (); break;
    case 'POST' : buatData (); break;
    case 'PUT' : editData (); break;
    case 'DELETE' : hapusData (); break;
    default:
        errorEuy("Operasi tidak dikenal");
}
*/
