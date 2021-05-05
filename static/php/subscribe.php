<?php 
	
	if(!$_POST) exit;

	
	$to 		= "support@cyclops.game";
	$email 		= preg_replace("([\r\n])", "", $_POST['email_subs']);
	

	$match = "/(bcc:|cc:|content\-type:)/i";
	if (
	    preg_match($match, $email) ) {
	  exit; //header injection detected
	}
	
	$subject 	= "Cyclops main landing: subscribe request by $email";
	
	$content 	= "Setup subscribtion for:\r\n\n";
	$content   .= "Email: $email \n\n";
	
	
	if (@mail($to, $subject, $content, "From: ".$email."\r\nReply-To: ".$email."\r\n")) {
		echo "<h5 class='success' style='color: white;'>Subscribtion request sent</h5>";
        echo "<br/><h5 class='success' style='color:white;'>Thank you, your message has been submitted and subscribtion will be established for you.</h5>";
	}else{
		echo "<h5 class='failure' style='color: white;'>Someting went wrong, try again Later.</h5>";
	}?>