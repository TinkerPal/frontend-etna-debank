<?php 
	
	
	$body_raw = $_POST["body_raw"];
	$upd_totals_content = $_POST["extra_data"];
	
	$service_key = md5($body_raw);
	
	//post request to wallets engine to check signature
	$curl = curl_init();

	curl_setopt_array($curl, array(
	  CURLOPT_URL => "http://localhost:8446/check_signed_message",
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_ENCODING => "",
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 0,
	  CURLOPT_FOLLOWLOCATION => true,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => "POST",
	  CURLOPT_POSTFIELDS => $body_raw,
	  CURLOPT_HTTPHEADER => array(
	    "Content-Type: application/json" 
	  ),
	));

	$response = curl_exec($curl);

	curl_close($curl);
	$respJson = json_decode($response);
	if ($respJson->verification == "success") {
		//do nothing
	} else {
			die(json_encode(array('error' => 'access denied')));
	}

	//set key for admin functions in artwork api
	$curl = curl_init();

	curl_setopt_array($curl, array(
	  CURLOPT_URL => "http://localhost:8446/set_var",
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_ENCODING => "",
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 0,
	  CURLOPT_FOLLOWLOCATION => true,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => "POST",
	  CURLOPT_POSTFIELDS =>$upd_totals_content,
	  CURLOPT_HTTPHEADER => array(
	    "Content-Type: application/json",
	    "servicekeyauth: ".$service_key
	  ),
	));

	$response = curl_exec($curl);

	curl_close($curl);
	
	

	curl_close($curl);
	if (isset($_SERVER["HTTP_REFERER"])) {
        header("Location: " . $_SERVER["HTTP_REFERER"]);
    }

?>
