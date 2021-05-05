<?php 

	if(!$_POST) exit;
	
	
	$to 		= "support@cyclops.game";
	$name 		= preg_replace("([\r\n])", "", $_POST['cv_name']);
	$email 		= preg_replace("([\r\n])", "", $_POST['cv_email']);
	
	$interested = preg_replace("([\r\n])", "", $_POST['cv_interested']);
	
	$link 		= preg_replace("([\r\n])", "", $_POST['cv_link']);
	$message	= preg_replace("([\r\n])", "", $_POST['cv_message']);

	$match = "/(bcc:|cc:|content\-type:)/i";
	if (preg_match($match, $name) ||
	    preg_match($match, $email) ||	  
	    preg_match($match, $interested) ||	   
	    preg_match($match, $link) ||
	    preg_match($match, $message)) {
	  exit; //header injection detected
	}
	
	$subject 	= "Cyclops main landing: job application by $name";
	
	$content 	= "$name sent you a message from Cyclops main job application form:\r\n\n";
	$content   .= "Email: $email \n\n";
	$content   .= "Interested in job: $interested \n\n";
	
	$content   .= "Link to CV: $link  \n\n";

	$content   .= "Cover letter: \n\n$message";
	
	if (@mail($to, $subject, $content, "From: ".$email."\r\nReply-To: ".$email."\r\n")) {
		echo "<h5 class='success' style='color: white;'>Application Sent</h5>";
        echo "<br/><h5 class='success' style='color:white;'>Thank you <strong>$name</strong>, your application has been submitted and someone will contact you shortly in case of interest in your profile.</h5>";
	}else{
		echo "<h5 class='failure' style='color: white;'>Someting went wrong, try again Later.</h5>";
	}?>