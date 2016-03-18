<?php
function get_email_text1($text) {
	$x = '<span style="font-size:14px;color:#333333;letter-spacing:1.5px;line-height:180%;font-weight:normal;font-family:Helvetica,Arial,sans-serif">' . $text . '</span>';
	return $x;
}

function get_email_button1($link, $text) {
	$x = '<a href=' . $link . '><button style="width:150px;line-height:30px;font-family:Helvetica,Arial,sans-serif;background-color:#428bca;font-size:16px;color:#ffffff;letter-spacing:1.5px;font-weight:bold;border-radius:10px;">' . $text . '</button></a>';
	return $x;
}
function get_link($link) {
	$x = '<a href=' . $link . ' style="width:150px;line-height:30px;font-family:Helvetica,Arial,sans-serif;font-size:16px;color:#428bca;letter-spacing:1.5px;font-weight:bold;">'. $link .'</a>';
	return $x;
}
function get_email_button2($link, $text) {
	$x = '<a href=' . $link . '><button style="width:200px;line-height:30px;font-family:Helvetica,Arial,sans-serif;background-color:#428bca;font-size:16px;color:#ffffff;letter-spacing:1.5px;font-weight:bold;border-radius:10px;">' . $text . '</button></a>';
	return $x;
}

function get_email_header1() {
	$x = '<html>
		<body leftmargin="0" marginwidth="0" topmargin="0" offset="0">
		<table width="100%" bgcolor="#ffffff" cellpadding="10" cellspacing="0">
		   <tr valign="top" align="center">
			<td>
			   <table width="500" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="padding-bottom:50px;padding-top:50px;padding-left:20px;padding-right:50px">
			   	<tr>
				    <td style="vertical-align:middle;text-align:left">
				    <span class="link" style="font-size:24px;letter-spacing:2.0px;color:purple;font-weight:bold;font-family:Helvetica,Arial,sans-serif;">AstroTalks</span>
				    </td>
				</tr>
				<tr>
				    <td>
				    <br><br>';
	return $x;
}

function get_email_footer1() {
	$x = '<br><br>
	      <span style="font-size:14px;color:#333333;letter-spacing:1.5px;line-height:180%;font-weight:normal;font-family:Helvetica,Arial,sans-serif;">Sincerely</span>
	      <br>
	       <span style="font-size:14px;color:#333333;letter-spacing:1.5px;line-height:180%;font-weight:normal;font-family:Helvetica,Arial,sans-serif;">AstroTalks Team</span>
	       <br>
	       <span style="font-size:14px;color:#333333;letter-spacing:1.5px;line-height:180%;font-weight:normal;font-family:Helvetica,Arial,sans-serif;">astrotalks.org</span>
	       <br>
					</td>
				   </tr> 
				</table>
			    </td>
			</tr>
		    </table>
		</body>
	   </html> ';
	return $x;
}

function edit_job($link) {
	$email_body = array();
	$header = get_email_header1();
	$footer = get_email_footer1();
	$text1 = "Thank you for posting your job. To edit your job either press the edit button or copy the link below and paste it in your browser" ;
	$text2 = "If you have any problems, feel free to email us at support@astrotalks.org";
	$span_text1 = get_email_text1($text1);
	$span_text2 = get_email_text1($text2);
	$link_button1 = get_email_button1($link, "Edit Job");
	$span_text3 = get_link($link);
	$email_body['html_body'] = $header . $span_text1 . "<br><br>" . $link_button1 . "<br><br>" .$span_text3 . "<br><br>" . $span_text2 . "<br><br>"  .  $footer;
	$email_body['text_body'] = "Thank you for posting your job. To edit your job please copy the link below and paste it in your browser.\n\n" . $link . "\n\nIf you have any problems, feel free to email us at support@astrotalks.org\n\nSincerely\nAstroTalks Team\nastrotalks.org";
	$email_body['subject'] = "Link to edit your job post";
	return $email_body;
}

?>
