<?php 

	if(!$_POST) exit;
	

	$to 		= "support@cyclops.game";
	$name 		= preg_replace("([\r\n])", "", $_POST['name']);
	$email 		= preg_replace("([\r\n])", "", $_POST['email']);
	$phone 		= preg_replace("([\r\n])", "", $_POST['phone']);
	$location 	= preg_replace("([\r\n])", "", $_POST['location']);
	$interested = preg_replace("([\r\n])", "", $_POST['interested']);
	$company 	= preg_replace("([\r\n])", "", $_POST['company']);
	$website 	= preg_replace("([\r\n])", "", $_POST['website']);
	$message	= preg_replace("([\r\n])", "", $_POST['message']);

	$match = "/(bcc:|cc:|content\-type:)/i";
	if (preg_match($match, $name) ||
	    preg_match($match, $email) ||
	    preg_match($match, $phone) ||
	    preg_match($match, $location) ||
	    preg_match($match, $interested) ||
	    preg_match($match, $company) ||
	    preg_match($match, $website) ||
	    preg_match($match, $message)) {
	  exit; //header injection detected
	}
	
	$subject 	= "Cyclops main landing: you've been contacted by $name";
	
	$content 	= "$name sent you a message from Cyclops main landing contact form:\r\n\n";
	$content   .= "Email: $email \n\n";
	$content   .= "Phone: $phone \n\n";
	$content   .= "Location: $location \n\n";
	$content   .= "Interested: $interested \n\n";
	$content   .= "Company: $company \n\n";
	$content   .= "Website: $website \n\n";

	$content   .= "Message: \n\n$message";
	
	if (@mail($to, $subject, $content, "From: ".$email."\r\nReply-To: ".$email."\r\n")) {
		echo "<h5 class='success' style='color: white;'>Message Sent</h5>";
        echo "<br/><h5 class='success' style='color:white;'>Thank you <strong>$name</strong>, your message has been submitted and someone will contact you shortly.</h5>";
	}else{
		echo "<h5 class='failure' style='color: white;'>Someting went wrong, try again Later.</h5>";
	}?>