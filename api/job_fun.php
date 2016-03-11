<?php
require_once ("/var/www/global/astro_constant.php");

function connect_db() {
	return ( mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME,3306) );
}
function sanitize_fieldname($conndb, $fieldname) {
  return trim((mysqli_real_escape_string($conndb, $fieldname)));
}
// function job_positions($x){
// 	$position[1] = "Faculty/Scientific Staff";
// 	$position[2] = "Graduate";
// 	$position[3] = "PostDoc and Fellowship";
// 	$position[4] = "Software and Engineering";
// 	$position[5] = "Management";
// 	$position[6] = "Private Companies";
// 	$position[7] = "Others";
// 	return $position[$x];
// }
function extract_job($conndb,$newval) {
	$job_info = array("title","email","institution","position","country","city","end_date","description");
	for( $x = 0; $x < count($job_info) ; $x++) {  
			$val[$job_info[$x]] = sanitize_fieldname($conndb,$newval[$job_info[$x]]);	
	}
	return $val;
}
function json_print($msg, $status){
	$response['status'] = $status;
	$response['msg'] = $msg;
	print json_encode($response);
	exit();
}

/*   Database Functions   */
function multi_column_query($conn, $sql) {
	$counter = 0;
	$result = array();
	if ($result1 = mysqli_query($conn, $sql)) {
		while ($row = mysqli_fetch_assoc($result1)) {
			$result[$counter] = $row;
			$counter++;
		}
	}
	return ($result);
}

function insert_jobs($conndb,$job_info){
	$sql = sprintf('INSERT INTO jobpost (%s) VALUES ("%s")',
		implode(',',array_keys($job_info)),implode('","',array_values($job_info)));
  return mysqli_query($conndb,$sql);
}

function job_list($conn){
	$sql = "SELECT jobid,email,title,start_date,end_date,institution,position,city,country FROM jobpost ORDER BY job_create_date DESC";
	$result  = multi_column_query($conn, $sql);
	return $result; 
}

function job_details($conn, $jobid){
	$sql = "SELECT * FROM jobpost WHERE jobid='$jobid' LIMIT 1";
	return (mysqli_fetch_assoc(mysqli_query($conn, $sql)));
}

?>