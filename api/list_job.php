<?php
ini_set('display_errors', 1);

require_once ("job_fun.php");
$conn = connect_db();
if(mysqli_connect_errno($conn)) {
	$msg = "database_connect error";
	json_print($msg, 'error');
	exit();
}
$result = job_list($conn);
// for ($i = 0 ; $i < count($result); $i++){
// 	$result[$i]['position']= job_positions($result[$i]['position']);
// }
if (count($result) < 1) {
	$msg = "job_list_empty_error";
	json_print($msg, 'error');
	exit();
}
json_print($result,"success");


?>
