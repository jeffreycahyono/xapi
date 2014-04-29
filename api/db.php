<?php
define('FDATA', sys_get_temp_dir() . '/xsys.txt');


function readXData(){
    if(is_readable(FDATA)){
        $x = file_get_contents(FDATA);
        if($x)
            return json_decode($x,TRUE);
    }
    return array();
}

function getX($key){
    $data = readXData();
    if(isset($data[$key]))
        return $data[$key];
    else
        return NULL;
}

function isExistsX($key){
    return getX($key) !== NULL;
}

function storeX($key, $data){
    $x = readXData();
    $x[$key] = $data;
    file_put_contents(FDATA, json_encode($x));
}

function delX($key){
    $x = readXData();
    if(isset($x[$key])){
        unset($x[$key]);
        file_put_contents(FDATA, json_encode($x));
    }
}
