<?php
ini_set('display_errors', 1);
require_once("job_fun.php");

$jobid = $_GET['jobid'];
$conn = connect_db();
if(mysqli_connect_errno($conn)) {
	$msg = "database_connect error";
	json_print($msg, 'error');
	exit();
}

$jobid = sanitize_fieldname($conn, $jobid);
$result = job_details($conn,$jobid);
if(count($result) <1 ){
	$msg = "job_empty_error";
	json_print($msg, 'error');
	exit();
}
json_print($result,"success");
	


?>
