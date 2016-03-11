<?php
ini_set('display_errors', 1);
require_once ("job_fun.php");

$postdata = file_get_contents("php://input");
$val_stdobj =  json_decode($postdata);
$newval = (array)$val_stdobj;

$conndb = connect_db();
if(mysqli_connect_errno($conndb)) {
	$msg = "database_connect error";
	json_print($msg, 'error');
	exit();
}

$val = extract_job($conndb,$newval);
if (! insert_jobs($conndb,$val)){
		$msg = "insert_job_error";
		json_print($msg, 'error');
		exit();
}

json_print("successfully created job", "success");


?>
