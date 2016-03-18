<?php
ini_set('display_errors', 1);
require_once ("job_fun.php");
require_once ("email_function.php");
$jobid = $_GET['jobid'];
$key  = create_unique_key();
$link = job_edit_link($key);
$email = "regmi.shila@gmail.com";
//$email_body = edit_job($link);

$conn = connect_db();
if(mysqli_connect_errno($conn)) {
	$msg = "database_connect error";
	json_print($msg, 'error');
	exit();
}
// $email_status = queue_job_email($conn, $email, $email_body); 

// 	if ( ! $email_status ) {
// 		$msg = "edit_job_error";
// 		json_print($msg, 'error');
// 		exit();
// 	}

$jobid = sanitize_fieldname($conn, $jobid);
$result = job_details($conn,$jobid);
if(count($result) <1 ){
	$msg = "job_empty_error";
	json_print($msg, 'error');
	exit();
}
json_print($result,"success");


?>