<?php 
	
	
	$body_raw = $_POST["body_raw"];
	
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
/*
	//set key for admin functions in artwork api
	$curl = curl_init();

	curl_setopt_array($curl, array(
	  CURLOPT_URL => "http://localhost:8445/set_key",
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_ENCODING => "",
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 0,
	  CURLOPT_FOLLOWLOCATION => true,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => "POST",
	  CURLOPT_POSTFIELDS =>"{\"key\":\"".$service_key."\"}",
	  CURLOPT_HTTPHEADER => array(
	    "Content-Type: application/json"
	  ),
	));

	$response = curl_exec($curl);

	curl_close($curl);

	//set key for admin functions in nft-pub api
	$curl = curl_init();

	curl_setopt_array($curl, array(
	  CURLOPT_URL => "http://localhost:8447/set_key",
	  CURLOPT_RETURNTRANSFER => true,
	  CURLOPT_ENCODING => "",
	  CURLOPT_MAXREDIRS => 10,
	  CURLOPT_TIMEOUT => 0,
	  CURLOPT_FOLLOWLOCATION => true,
	  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	  CURLOPT_CUSTOMREQUEST => "POST",
	  CURLOPT_POSTFIELDS =>"{\"key\":\"".$service_key."\"}",
	  CURLOPT_HTTPHEADER => array(
	    "Content-Type: application/json"
	  ),
	));

	$response = curl_exec($curl);

	//set base URLS
	$nft_artwork_api = "https://fame-artwork-api.cyclops.game/";
	$nft_pub_api = "https://fame-pub-api.cyclops.game/";


	curl_close($curl);*/


?>
<!DOCTYPE html>
<!--[if IE 8]><html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]>
<!--><html class="no-js" lang="en"><!--<![endif]-->
<head>

	<!-- Basic Page Needs
	================================================== -->
	<meta charset="utf-8">
	<title>Debank: Admin panel</title>
	<meta name="description"  content="Cyclops Treasure" />
	<meta name="author" content="Cyclops Treasure">
	<meta name="keywords"  content="NFT, tokens, game" />
	<meta property="og:title" content="Cyclops Treasure" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="" />
	<meta property="og:image" content="" />
	<meta property="og:image:width" content="470" />
	<meta property="og:image:height" content="246" />
	<meta property="og:site_name" content="Cyclops Treasure" />
	<meta property="og:description" content="Cyclops Treasure" />
	<meta name="twitter:card" content="" />
	<meta name="twitter:site" content="#" />
	<meta name="twitter:domain" content="#" />
	<meta name="twitter:title" content="" />
	<meta name="twitter:description" content="Cyclops Treasure" />
	<meta name="twitter:image" content="#" />

	<!-- Mobile Specific Metas
	================================================== -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="theme-color" content="#212121"/>
    <meta name="msapplication-navbutton-color" content="#212121"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="#212121"/>

	<!-- Web Fonts 
	================================================== -->
	<link href="https://fonts.googleapis.com/css?family=Muli:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&amp;subset=latin-ext,vietnamese" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&amp;subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese" rel="stylesheet">
	
	<!-- CSS
	================================================== -->
	<link rel="stylesheet" href="admin/css/bootstrap.min.css"/>
	<link rel="stylesheet" href="admin/css/font-awesome.min.css"/>
	<!--<link rel="stylesheet" href="css/animsition.min.css"/>-->
	
	<link rel="stylesheet" href="admin/css/style.css"/>
	<link rel="stylesheet" href="admin/css/shop-style.css"/>
			
	<!-- Favicons
	================================================== -->
	
	
	
</head>
<body style="background-color: purple;">
	<div class="orientation-cover">
		<div class="h-100 row align-items-center">
			<h2 class="rotate-device-header">Please rotate device</h2>				      				  
		</div>
	</div>
	<!-- Page preloader wrap
	================================================== -->

	<div class="animsition">	
		
		<!-- Nav and Logo
		================================================== -->

		<header class="cd-header cursor-show" style="position: fixed; background-color: purple;" >
			<div class="header-wrapper">
				
				<!--<button id="enableEthereumButton">connect wallet</button>
				<button id="adminButton" style="display: none;">admin panel</button>-->
								
			</div>				
		</header>

		
		<!-- Primary Page Layout
		================================================== -->	

	
   

    	<div class="container" style="height: 100%; padding-top: 100px;"> 
    		<!--<div class="row" style="height: 400px;">
    			<div class="col-6">
    				<div class="divTitle">Admin: upload Famer image to database</div>
    				<iframe  src="<?php echo $nft_artwork_api?><?php echo $service_key?>" title="Upload Famer image to database" width="100%" height="400px" style="border: solid;"></iframe>
    			</div>
    			<div class="col-6" style="height: 400px;">
    				<div class="divTitle">Admin: create Famer token</div>
    				<div class="adminSubPanel">
    					<div class="container" style="height: 100%; padding-top: 20px;">
    						<div class="row">
    							<div class="col-6">
    								<select class="" id="NFT_profiles_list" name="NFT_profiles_list" onchange="NFTProfilesListOnchange()"></select>
    							</div>
    							<div class="col-6">
									<div style="float: right;">
										<button class="btn btn-primary" type="submit" onclick="refreshNFTProfilesListUpd()">Refresh list</button> 
									</div>
								</div>
    						</div>
    						<div class="row" style="margin-top: 1vh">
							
								<label for="to_wallet" class="col-3 col-form-label">Send to:</label> 
								<div class="col-9">
									<input type="text" id="to_wallet" class="form-control current-wallet" placeholder="ETH wallet address" value="" name="to_wallet" required> 
								</div>
    							
    						</div>

    						<div class="row" style="margin-top: 1vh">
									<div class="col-12">
										<input type="text" id="token_url" class="form-control"  value="" name="token_url" readonly style="display: none">
									</div>   							
    						</div>

    						<div class="row">
									<div class="col-12">
										<img id="asset_img_pub" src="" alt="" height="100px">
									</div>   							
    						</div>

			    			<div class="row" style="margin-top: 2vh;"> 
								<div class="col-12">
									<div style="float: right;">
										<button class="btn btn-primary" id="pub_nft_collectible"type="submit"  onclick="publishSelectedNFTProfileClick(document.getElementById('to_wallet').value)" disabled>Publish collectible (token)</button> 
									</div>
									
								</div>
							</div> 

							<div class="row" style="margin-top: 2vh;"> 
								<div class="col-12">
									<div class="alert alert-warning" role="alert" id="pub_NFT_alert" style="display: none; word-wrap: break-word;"></div>
								</div>
							</div> 

							<div class="row" style="margin-top: 2vh;"> 
								<div class="col-12">
									<div class="alert alert-info" role="alert" id="pub_NFT_info" style="display: none; word-wrap: break-word;"></div>
								</div>
							</div> 

    					</div>
    				</div>
					
    			</div>
    		</div>
    		<div class="row" style="height: 100%; margin-top: 5vh;">
    			<div class="col-6">
    				<div class="divTitle">Admin: create Famer contract</div>
					<div class="adminSubPanel">
    					
    					<div class="container" style="height: 100%; padding-top: 20px;">
    						<div class="row">
    							<div class="col-6">
    								<select class="" id="NFT_images_list" name="NFT_images_list" onchange="NFTImagesListOnchange()"></select>
    							</div>
								<div class="col-6">
									<div style="float: right;">
										<button class="btn btn-primary" id="pub_nft_collectible"type="submit" onclick="refreshNFTImagesList()">Refresh list</button> 
									</div>
								</div>
    						</div>
    						<div class="row" style="margin-top: 2vh;">
    							
    								<label for="asset_name" class="col-3 col-form-label">NFT name:</label> 
									<div class="col-9">
										<input type="text" id="asset_name" class="form-control" placeholder="Name of NFT asset" value="" name="asset_name" required> 
									</div>
    							
    						</div>
    						<div class="row">
    							
    								<label for="asset_type" class="col-3 col-form-label">NFT type:</label> 
									<div class="col-9">
										<input list="NFT_types" id="asset_type" class="form-control" placeholder="Type NFT asset" value="" name="asset_type" required> 
									</div>
									<datalist id="NFT_types">
										<option value="Character">
									</datalist>
    						</div>
    						<div class="row">
    							
    								<label for="asset_description" class="col-3 col-form-label">NFT description:</label> 
									<div class="col-9">
										<input type="text" id="asset_description" class="form-control" placeholder="Description of NFT asset" value="" name="asset_description" required> 
									</div>
    							
    						</div>
							<div class="row">
    							
    								<label for="asset_html_description" class="col-3 col-form-label">HTML description:</label> 
									<div class="col-9">
										<textarea  id="asset_html_description" class="form-control" placeholder="HTML description of NFT asset" value="" name="asset_html_description"></textarea>  
									</div>
    							
    						</div>
    						<div class="row">
    								
    								<label for="asset_img_url" class="col-3 col-form-label">NFT image url:</label> 
									<div class="col-9">
										<input type="text" id="asset_img_url" class="form-control" placeholder="URL to image" value="" name="asset_img_url" required readonly> 
									</div>
    							
    						</div>
							<div class="row">
    								
    								<label for="asset_video_url" class="col-3 col-form-label">NFT video url:</label> 
									<div class="col-9">
										<input type="text" id="asset_video_url" class="form-control" placeholder="URL to video" value="" name="asset_video_url" > 
									</div>
    							
    						</div>-->

							<!--<div class="row">
    							
    								<label for="asset_price" class="col-3 col-form-label">NFT price:</label> 
									<div class="col-9">
										<input type="number" id="asset_price" class="form-control" placeholder="NFT price" value="" name="asset_price" min="0.001" value="0.001" step=".001" required> 
									</div>
    							
    						</div>

    						<div class="row">
    							
    								<label for="asset_buyback_price" class="col-3 col-form-label">NFT buyback price:</label> 
									<div class="col-9">
										<input type="number" id="asset_buyback_price" class="form-control" placeholder="NFT buyback price" value="" name="asset_buyback_price" min="0.001" value="0.001" step=".001" required> 
									</div>
    							
    						</div>-->

    						<!--
    						<div class="row">		
    								<label for="asset_nft_name" class="col-3 col-form-label">NFT name (contract):</label> 
									<div class="col-9">
										<input type="text" id="asset_nft_name" class="form-control"  value="" name="asset_nft_name" required> 
									</div>   							
    						</div>

    						<div class="row">							
    								<label for="asset_nft_symbol" class="col-3 col-form-label">NFT symbol (contract):</label> 
									<div class="col-9">
										<input type="text" id="asset_nft_symbol" class="form-control"  value="" name="asset_nft_symbol" required> 
									</div>    							
    						</div>
    						
    						<div class="row">
									<div class="col-12">
										<img id="asset_img" src="" alt="" height="100px">
									</div>
    							
    						</div>

   
			    			<div class="row" style="margin-top: 2vh;"> 
								<div class="col-6">
									<div style="float: right;">
										<button class="btn btn-primary" id="del_nft_profile"type="submit" onclick="deleteArtworkClick()">Delete artwork</button> 
									</div>
									
								</div>
								<div class="col-6">
									<div style="float: right;">
										<button class="btn btn-primary" id="pub_nft_collectible"type="submit" onclick="createNFTProfileClick()">Create Famer contract</button> 
									</div>
									
								</div>
							</div> 
							
							<div class="row" style="margin-top: 2vh;"> 
								<div class="col-12">
									<div class="alert alert-warning" role="alert" id="create_NFT_alert" style="display: none; word-wrap: break-word;"></div>
								</div>
							</div> 

							<div class="row" style="margin-top: 2vh;"> 
								<div class="col-12">
									<div class="alert alert-info" role="alert" id="create_NFT_info" style="display: none; word-wrap: break-word;"></div>
								</div>
							</div> 

    					</div>
    				
    				</div>
    			</div>
    			<div class="col-6">
    				<div class="divTitle">Admin: published Famers contracts list</div>
					<div class="adminSubPanel">
    					<div class="container" style="height: 100%; padding-top: 20px;">
    						<div class="row">
    							<div class="col-6">
    								<select class="" id="NFT_profiles_list_upd" name="NFT_profiles_list_upd" onchange="NFTProfilesListUpdOnchange()"></select>
    							</div>

								<div class="col-6">
									<div style="float: right;">
										<button class="btn btn-primary" type="submit" onclick="refreshNFTProfilesListUpd()">Refresh list</button> 
									</div>
								</div>
    						</div>
    						<div class="row" style="margin-top: 1vh">
    							
    								<label for="asset_name_upd" class="col-3 col-form-label">NFT name:</label> 
									<div class="col-9">
										<input type="text" id="asset_name_upd" class="form-control" placeholder="Name of NFT asset" value="" name="asset_name_upd" required readonly> 
									</div>
	    							
							</div>
							<div class="row">
    							
    								<label for="asset_type_upd" class="col-3 col-form-label">NFT type:</label> 
									<div class="col-9">
										<input type="text" id="asset_type_upd" class="form-control" placeholder="Type of NFT asset" value="" name="asset_type_upd" required readonly> 
									</div>
    							
    						</div>
							<div class="row">
								
									<label for="asset_description_upd" class="col-3 col-form-label">NFT description:</label> 
									<div class="col-9">
										<input type="text" id="asset_description_upd" class="form-control" placeholder="Description of NFT asset" value="" name="asset_description_upd" required> 
									</div>
								
							</div>
							<div class="row">
								
									<label for="asset_html_description_upd" class="col-3 col-form-label">HTML description:</label> 
									<div class="col-9">
										<textarea id="asset_html_description_upd" class="form-control" placeholder="HTML description of NFT asset" value="" name="asset_html_description_upd"></textarea>
									</div>
								
							</div>
							<div class="row">
									
									<label for="asset_img_url_upd" class="col-3 col-form-label">NFT image url:</label> 
									<div class="col-9">
										<input type="text" id="asset_img_url_upd" class="form-control" placeholder="URL to image" value="" name="asset_img_url_upd" required readonly> 
									</div>
								
							</div>
							<div class="row">
									
									<label for="asset_video_url_upd" class="col-3 col-form-label">NFT video url:</label> 
									<div class="col-9">
										<input type="text" id="asset_video_url_upd" class="form-control" placeholder="URL to video" value="" name="asset_video_url_upd" > 
									</div>
								
							</div>-->
							<!--<div class="row">
								
									<label for="asset_price_upd" class="col-3 col-form-label">NFT price:</label> 
									<div class="col-9">
										<input type="number" id="asset_price_upd" class="form-control" placeholder="NFT price" value="" name="asset_price_upd" min="0.001" step=".001" required> 
									</div>
								
							</div>
							<div class="row">
    							
    								<label for="asset_buyback_price_upd" class="col-3 col-form-label">NFT buyback price:</label> 
									<div class="col-9">
										<input type="number" id="asset_buyback_price_upd" class="form-control" placeholder="NFT buyback price" value="" name="asset_buyback_price_upd" min="0.001" value="0.001" step=".01" required> 
									</div>
    							
    						</div>-->
    						<!--
    						<div class="row">		
    								<label for="asset_nft_name_upd" class="col-3 col-form-label">NFT name (contract):</label> 
									<div class="col-9">
										<input type="text" id="asset_nft_name_upd" class="form-control"  value="" name="asset_nft_name_upd" readonly> 
									</div>   							
    						</div>

    						<div class="row">							
    								<label for="asset_nft_symbol_upd" class="col-3 col-form-label">NFT symbol (contract):</label> 
									<div class="col-9">
										<input type="text" id="asset_nft_symbol_upd" class="form-control"  value="" name="asset_nft_symbol_upd" readonly> 
									</div>    							
    						</div>

    						<div class="row">
    							
    								<label for="asset_contract_upd" class="col-3 col-form-label">Contract address:</label> 
									<div class="col-9">
										<input type="text" id="asset_contract_upd" class="form-control"  value="" name="asset_contract_upd" readonly> 
									</div>
    							
    						</div>
							
							<div class="row">
									<div class="col-12">
										<img id="asset_img_upd" src="" alt="" height="100px">
									</div>
								
							</div>

							<div class="row" style="margin-top: 2vh;"> 
								<div class="col-6">
									<div style="float: right;">
										<button class="btn btn-primary" id="del_nft_profile"type="submit" onclick="deleteNFTProfileClick()">Delete</button> 
									</div>
									
								</div>
							
								<div class="col-6">
									<div style="float: right;">
										<button class="btn btn-primary" id="upd_nft_profile"type="submit" onclick="updateNFTProfileClick()">Update</button> 
									</div>
									
								</div>
							</div> 

							<div class="row" style="margin-top: 2vh;"> 
								<div class="col-12">
									<div class="alert alert-warning" role="alert" id="upd_NFT_alert" style="display: none; word-wrap: break-word;"></div>
								</div>
							</div> 

							<div class="row" style="margin-top: 2vh;"> 
								<div class="col-12">
									<div class="alert alert-info" role="alert" id="upd_NFT_info" style="display: none; word-wrap: break-word;"></div>
								</div>
							</div> 

	    				</div>
    					

    				</div>
    			</div>
    		</div>-->
    		<!--
    		<div class="row" style="height: 100%; margin-top: 5vh;">
    			<div class="col-6">
    				<div class="divTitle">Admin: check wallet</div>
					<div class="adminSubPanel">
    					<div class="container" style="height: 100%; padding-top: 20px;">
    						<div class="row">
							
								<label for="check_wallet" class="col-3 col-form-label">Wallet:</label> 
								<div class="col-9">
									<input type="text" id="check_wallet" class="form-control current-wallet" placeholder="ETH wallet address" value="" name="check_wallet" required> 
								</div>
    							
    						</div>
			    			<div class="row" style="margin-top: 2vh;"> 
								<div class="col-12">
									<div style="float: right;">
										<button class="btn btn-primary" id="check_wallet_btn"type="submit" onclick="checkWalletClick()">List assets</button> 
									</div>
									
								</div>
							</div> 

							<div class="row" style="margin-top: 2vh;"> 
								<div class="col-12">
									<div class="alert alert-warning" role="alert" id="chw_NFT_alert" style="display: none; word-wrap: break-word;"></div>
								</div>
							</div> 

							<div class="row" style="margin-top: 2vh;"> 
								<div class="col-12">
									<div class="alert alert-info" role="alert" id="chw_NFT_info" style="display: none; word-wrap: break-word;"></div>
								</div>
							</div> 

    					</div>
    				</div>
    			</div>

    			<div class="col-6">
    				<div class="divTitle">Admin: collectibles sales data</div>
					<div class="adminSubPanel">
    					<div class="container" style="height: 100%; padding-top: 20px;">
    						<div class="row">
    							<div class="col-12">
    								<div style="float: right;">
										<button id="get_sales_data_btn" class="btn btn-primary" type="submit" onclick="getSalesData()">Get Sales Data</button> 
									</div>
    							</div>
    						</div>
							<div class="row">
    							<div class="col-12" id="sales_data_table">
    								
    							</div>
    						</div>
    					</div>
    				</div>
    			</div>
    		</div> -->
			<div class="row" style="height: 100%; margin-top: 5vh;">
					<div class="col-12">

    				<div class="divTitle">Admin: manage smartcontracts</div>
					<div class="adminSubPanel">
			
						<div  class="container" id="smartcontract_administration" novalidate style="margin-top: 5vh; margin-bottom: 8vh;"> 
							<!--<div class="row">
								
								<label for="wallet" class="col-2 col-form-label">Your wallet:</label> 
								<div class="col-6">
									<input type="text" class="form-control current-wallet"
											placeholder="your wallet" id="wallet" required
											data-validation-required-message="Please enter your ETH wallet address" readonly  />
								</div>
								<div class="col-2">
									<div style="float: right;">
								  		<button id="balance_details_btn" class="btn btn-primary" onclick="getWalletBalanceDetails()">Balance</button>
								  	</div>
								</div>
			    							
			    			</div>

			    			<div id="balance_details">
				    			<div class="row" style="height: 100%; padding-top: 2vh;">
									
									<label for="balance_eth" class="col-2 col-form-label">ETH balance:</label> 
									<div class="col-2">
										<input type="text" class="form-control"
												placeholder="" id="balance_eth" readonly />
									</div>
								
				    							
				    			</div>

				    			<div class="row" style="height: 100%; padding-top: 1vh;">
									
									<label for="balance_tokens" class="col-2 col-form-label">Tokens balance:</label> 
									<div class="col-2">
										<input type="text" class="form-control"
												placeholder="" id="balance_tokens" readonly />
									</div>
								
				    							
				    			</div>
			    			</div>-->
			    			<div class="row" style="height: 100%; margin-top: 4vh;">
								<div class="col-12" style="text-align: center">
									<h4 style="color:black;">Update UI Lists</h4>
								</div>
							</div>
							<div class="row" style="height: 100%; padding-top: 2vh;">	
							<div class="col-3" style="text-align: center"> 	
								  		<button class="btn btn-primary" onclick="getAndSaveDepositAssetsList( (list)=>{		

														setBackendParameter('DEPPROFILES_UI_LIST',list);
														
												});">Update Deposit<br>Assets List</button>
							</div> 	
							<div class="col-3" style="text-align: center"> 	
								  		<button class="btn btn-primary" onclick="getAndSaveFullAssetsList( (list)=>{		

														setBackendParameter('ASSETS_UI_FULL_LIST',list);
														
												});">Update Full Assets<br>List (with liq.pairs)</button>
							</div> 	
							<div class="col-3" style="text-align: center"> 	
								  		<button class="btn btn-primary" onclick="getAndSaveOnlyLiqPairs( (list)=>{		

														setBackendParameter('ASSETS_UI_LIQ_PAIRS',list);
														
												});">Update Liq Pairs<br>List</button>
							</div> 	
							<div class="col-3" style="text-align: center"> 	
								  		<button class="btn btn-primary" onclick="getAndSaveCreditProfilesList( (list)=>{		

														setBackendParameter('CREDIT_PROFILES_UI_LIST',list);
														
												});">Update Credit <br>Profiles List</button>
							</div> 	
								
							</div>
			    			<div class="row" style="height: 100%; margin-top: 4vh;">
								<div class="col-12" style="text-align: center">
									<h4 style="color:black;">Contracts low-level calls</h4>
								</div>
							</div>
							<div class="row" style="height: 100%; margin-top: 2vh;">
	    							<div class="col-6">
	    								<select class="" id="smartcontracts_list" name="smartcontracts_list" onchange="smartcontractsListOnchange()"></select>
	    							</div>
									
    						</div>

							<div class="row" style="height: 100%; padding-top: 2vh;">
	    							<div class="col-6">
	    								<select class="" id="functions_list" name="functions_list" onchange="functionsListOnchange()"></select>
	    							</div>
									
    						</div>
    						<div id="function_call_panel" style="display: none; overflow-wrap: break-word;"></div>

    						<div class="row" style="height: 100%; margin-top: 4vh;">
								<div class="col-12" style="text-align: center">
									<h4 style="color:black;">Deployment</h4>
								</div>
							</div>
							
							<div class="row" style="height: 100%; padding-top: 2vh;">	
							 	<label class="col-2 col-form-label">Deploy, only once:</label> 
								<div class="col-6">
									<div style="float: left;">
								  		<button class="btn btn-primary" onclick="deployContractClick(staking_contract_abi, staking_contract_bytecode, [], (contract_address)=>{
											setBackendParameter('STAKING_CONTRACT',contract_address);
											safeSetValueById('staking_contract',contract_address);

								});">Deploy deposit contract</button>
								  	</div>
								</div>
								
							</div>

							<div class="row" style="height: 100%; padding-top: 2vh;">	
							 	<label class="col-2 col-form-label">Deploy, only once:</label> 
								<div class="col-6">
									<div style="float: left;">
								  		<button class="btn btn-primary" onclick="deployContractClick(profiles_register_abi, profiles_register_bytecode, [], (contract_address)=>{
											setBackendParameter('DEPPROFILES_REGISTER_CONTRACT',contract_address);
											safeSetValueById('depprofiles_register_contract',contract_address);
												
								});">Deploy deposit profiles register</button>
								  	</div>
								</div>
								
							</div>

							<div class="row" style="height: 100%; padding-top: 2vh;">	
							 	<label class="col-2 col-form-label">Deploy, only once:</label> 
								<div class="col-6">
									<div style="float: left;">
								  		<button class="btn btn-primary" onclick="deployContractClick(famers_register_abi, famers_register_bytecode, [], (contract_address)=>{
											setBackendParameter('FAMERS_REGISTER_CONTRACT',contract_address);
											safeSetValueById('famers_register_contract',contract_address);
								});">Deploy famers register contract</button>
								  	</div>
								</div>
								
							</div>

							<div class="row" style="height: 100%; padding-top: 2vh;">	
							 	<label class="col-2 col-form-label">Deploy, only once:</label> 
								<div class="col-6">
									<div style="float: left;">
								  		<button class="btn btn-primary" onclick="deployContractClick(data_provider_abi, data_provider_bytecode, [], (contract_address)=>{
											setBackendParameter('DATA_PROVIDER_CONTRACT',contract_address);
											safeSetValueById('data_provider_contract',contract_address);
								});">Deploy data provider</button>
								  	</div>
								</div>
								
							</div>

							<div class="row" style="height: 100%; padding-top: 2vh;">	
							 	<label class="col-2 col-form-label">Deploy, only once:</label> 
								<div class="col-6">
									<div style="float: left;">
								  		<button class="btn btn-primary" onclick="deployContractClick(votes_calc_abi, votes_calc_bytecode, [], (contract_address)=>{
											setBackendParameter('VOTES_CALC_CONTRACT',contract_address);
											safeSetValueById('votes_calc_contract',contract_address);
								});">Deploy votes calc contract</button>
								  	</div>
								</div>
								
							</div>

							<div class="row" style="height: 100%; padding-top: 2vh;">	
							 	<label class="col-2 col-form-label">Deploy, only once:</label> 
								<div class="col-6">
									<div style="float: left;">
								  		<button class="btn btn-primary" onclick="deployContractClick(usage_calc_abi, usage_calc_bytecode, [], (contract_address)=>{
											setBackendParameter('USAGE_CALC_CONTRACT',contract_address);
											safeSetValueById('usage_calc_contract',contract_address);
								});">Deploy usage calc contract</button>
								  	</div>
								</div>
								
							</div>

							<div class="row" style="height: 100%; padding-top: 2vh;">	
							 	<label class="col-2 col-form-label">Deploy, only once:</label> 
								<div class="col-6">
									<div style="float: left;">
								  		<button class="btn btn-primary" onclick="deployContractClick(credit_profiles_register_abi, credit_profiles_register_bytecode, [], (contract_address)=>{
											setBackendParameter('CREDIT_PROFILES_REGISTER_CONTRACT',contract_address);
											safeSetValueById('credit_profiles_register_contract',contract_address);
								});">Deploy credit profiles register contract</button>
								  	</div>
								</div>			
							</div>

							<div class="row" style="height: 100%; padding-top: 2vh;">	
							 	<label class="col-2 col-form-label">Deploy, only once:</label> 
								<div class="col-6">
									<div style="float: left;">
								  		<button class="btn btn-primary" onclick="deployContractClick(credit_contract_abi, credit_contract_bytecode, [], (contract_address)=>{
											setBackendParameter('CREDIT_CONTRACT',contract_address);
											safeSetValueById('credit_contract',contract_address);
								});">Deploy credit contract</button>
								  	</div>
								</div>			
							</div>

							<div class="row" style="height: 100%; padding-top: 2vh;">	
							 	<label class="col-2 col-form-label">Deploy, only once:</label> 
								<div class="col-6">
									<div style="float: left;">
								  		<button class="btn btn-primary" onclick="deployContractClick(liqlev_contract_abi, liqlev_bytecode, [], async (contract_address)=>{
								  			
											setBackendParameter('LIQLEV_CONTRACT',contract_address);
											safeSetValueById('liqlev_contract',contract_address);


								});">Deploy leverage & liquidation contract</button>
								  	</div>
								</div>			
							</div>


							<div class="row" style="height: 100%; padding-top: 2vh;">	
							 	<label class="col-2 col-form-label">After contracts upgrade:</label> 
								<div class="col-6">
									<div style="float: left;">
								  		<button class="btn btn-primary" onclick="updateContractsLinks()">Update contracts links</button>
								  	</div>
								</div>			
							</div>


							<div class="row" style="height: 100%; margin-top: 4vh;">
								<div class="col-12" style="text-align: center">
									<h4 style="color:black;">Configuration</h4>
								</div>
							</div>

							<div class="row" style="height: 100%; padding-top: 2vh;">	
							 	<label for="admin_wallets" class="col-2 col-form-label">Admin wallets:</label> 
								<div class="col-6">
									<textarea  class="form-control"
											placeholder="admin wallets" id="admin_wallets" required
											data-validation-required-message="please enter admin wallets delimited by comma"></textarea>
								</div>
								<div class="col-2">
									<div style="float: right;">
								  		<button id="get_admin_wallets_btn" class="btn btn-primary" onclick="getAdminWallets()">Get current</button>
								  	</div>
								</div>
								<div class="col-2">
									<div style="float: right;">
								  		<button id="set_admin_wallets_btn" class="btn btn-primary" onclick="setAdminWallets()">Set new</button>
								  	</div>
								</div>
							</div>


							<div class="row" style="height: 100%; padding-top: 2vh;">	
							 	<label for="end_point" class="col-2 col-form-label">Endpoint (i.e. infura or any other ETH node):</label> 
								<div class="col-6">
									<textarea  class="form-control"
											placeholder="https://..." id="end_point" required
											data-validation-required-message="please enter endpoint URL"></textarea>
								</div>
								<div class="col-2">
									<div style="float: right;">
								  		<button id="get_endpoint_btn" class="btn btn-primary" onclick="getEndpoint()">Get current</button>
								  	</div>
								</div>
								<div class="col-2">
									<div style="float: right;">
								  		<button id="set_endpoint_btn" class="btn btn-primary" onclick="setEndpoint()">Set new</button>
								  	</div>
								</div>
							</div>

							<div class="row" style="height: 100%; padding-top: 2vh;">	
								
								<label for="staking_contract" class="col-2 col-form-label">Current Deposit contract:</label> 
								<div class="col-6">
									<input type="text" class="form-control"
											placeholder="" id="staking_contract" required readonly onclick="copyToClipboardInput('staking_contract')" />
								</div>
								
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="openEtherscanLink(document.getElementById('staking_contract').value)">Etherscan</button>
								  	</div>
								</div>
			    							
			    			</div>

			    			<div class="row" style="height: 100%; padding-top: 2vh;">	
								
								<label for="prev_staking_contract" class="col-2 col-form-label">Previous Deposit contract:</label> 
								<div class="col-6">
									<input type="text" class="form-control"
											placeholder="" id="prev_staking_contract" required  />
								</div>
								
								
			    							
			    			</div>
			    			<div class="row" style="height: 100%; padding-top: 2vh;">	
								
								<div class="col-3">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="stakingContractTransferConfig(document.getElementById('prev_staking_contract').value, document.getElementById('staking_contract').value)">1. => config</button>
								  	</div>
								</div>
								<div class="col-3">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="stakingContractTransferTokens(document.getElementById('prev_staking_contract').value, document.getElementById('staking_contract').value)">2. => tkns </button>
								  	</div>
								</div>

								<div class="col-3">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="stakingContractGiveAccessToTransferDeposits(document.getElementById('prev_staking_contract').value, document.getElementById('staking_contract').value)">3. +access </button>
								  	</div>
								</div>

								<div class="col-3">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="stakingContractTransferDeposits(document.getElementById('prev_staking_contract').value, document.getElementById('staking_contract').value)">4. => depos</button>
								  	</div>
								</div>
			    							
			    			</div>



			    			<div class="row" style="height: 100%; padding-top: 2vh;">	
								
								<label for="depprofiles_register_contract" class="col-2 col-form-label">Current dep. profiles register contract:</label> 
								<div class="col-6">
									<input type="text" class="form-control"
											placeholder="" id="depprofiles_register_contract" required readonly onclick="copyToClipboardInput('depprofiles_register_contract')"/>
								</div>
								
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="openEtherscanLink(document.getElementById('depprofiles_register_contract').value)">Etherscan</button>
								  	</div>
								</div>
			    							
			    			</div>

			    			<div class="row" style="height: 100%; padding-top: 2vh;">	
								
								<label for="credit_profiles_register_contract" class="col-2 col-form-label">Current credit profiles register contract:</label> 
								<div class="col-6">
									<input type="text" class="form-control"
											placeholder="" id="credit_profiles_register_contract" required readonly  onclick="copyToClipboardInput('credit_profiles_register_contract')"/>
								</div>
								
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="openEtherscanLink(document.getElementById('credit_profiles_register_contract').value)">Etherscan</button>
								  	</div>
								</div>
			    							
			    			</div>

			    			<div class="row" style="height: 100%; padding-top: 2vh;">	
								
								<label for="credit_contract" class="col-2 col-form-label">Current credit contract:</label> 
								<div class="col-6">
									<input type="text" class="form-control"
											placeholder="" id="credit_contract" required readonly onclick="copyToClipboardInput()"/>
								</div>
								
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="openEtherscanLink(document.getElementById('credit_contract').value)">Etherscan</button>
								  	</div>
								</div>
			    							
			    			</div>

			    			<div class="row" style="height: 100%; padding-top: 2vh;">	
								
								<label for="prev_credit_contract" class="col-2 col-form-label">Previous Credit contract:</label> 
								<div class="col-6">
									<input type="text" class="form-control"
											placeholder="" id="prev_credit_contract" required  />
								</div>
								
								
			    							
			    			</div>
			    			<div class="row" style="height: 100%; padding-top: 2vh;">	
								
								<div class="col-3">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="creditContractTransferConfig(document.getElementById('prev_credit_contract').value, document.getElementById('credit_contract').value)">1. => config</button>
								  	</div>
								</div>
								

								<div class="col-3">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="creditContractGiveAccessToTransferData(document.getElementById('prev_credit_contract').value, document.getElementById('credit_contract').value)">2. +access </button>
								  	</div>
								</div>

								<div class="col-3">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="creditContractTransferData(document.getElementById('prev_credit_contract').value, document.getElementById('credit_contract').value)">3. => data</button>
								  	</div>
								</div>
			    							
			    			</div>

			    			<div class="row" style="height: 100%; padding-top: 2vh;">	
								
								<label for="liqlev_contract" class="col-2 col-form-label">Current Liq & Lev contract:</label> 
								<div class="col-6">
									<input type="text" class="form-control"
											placeholder="" id="liqlev_contract"  required readonly onclick="copyToClipboardInput()"/>
								</div>
								
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="openEtherscanLink(document.getElementById('liqlev_contract').value)">Etherscan</button>
								  	</div>
								</div>
			    							
			    			</div>

			    			<div class="row" style="height: 100%; padding-top: 2vh;">	
								
								<label for="famers_register_contract" class="col-2 col-form-label">Current Famers register contract:</label> 
								<div class="col-6">
									<input type="text" class="form-control"
											placeholder="" id="famers_register_contract" required readonly onclick="copyToClipboardInput()"/>
								</div>
								
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="openEtherscanLink(document.getElementById('famers_register_contract').value)">Etherscan</button>
								  	</div>
								</div>
			    							
			    			</div>
							

			    			<div class="row" style="height: 100%; padding-top: 2vh;">	
								
								<label for="data_provider_contract" class="col-2 col-form-label">Current data provider contract:</label> 
								<div class="col-6">
									<input type="text" class="form-control"
											placeholder="" id="data_provider_contract" required readonly onclick="copyToClipboardInput()"/>
								</div>
								
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="openEtherscanLink(document.getElementById('data_provider_contract').value)">Etherscan</button>
								  	</div>
								</div>
			    							
			    			</div>

			    			<div class="row" style="height: 100%; padding-top: 2vh;">	
								
								<label for="usage_calc_contract" class="col-2 col-form-label">Current usage calc contract:</label> 
								<div class="col-6">
									<input type="text" class="form-control"
											placeholder="" id="usage_calc_contract" required readonly onclick="copyToClipboardInput()"/>
								</div>
								
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="openEtherscanLink(document.getElementById('usage_calc_contract').value)">Etherscan</button>
								  	</div>
								</div>
			    							
			    			</div>

			    			<div class="row" style="height: 100%; padding-top: 2vh;">	
								
								<label for="votes_calc_contract" class="col-2 col-form-label">Current votes calc contract:</label> 
								<div class="col-6">
									<input type="text" class="form-control"
											placeholder="" id="votes_calc_contract" required readonly onclick="copyToClipboardInput()"/>
								</div>
								
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="openEtherscanLink(document.getElementById('votes_calc_contract').value)">Etherscan</button>
								  	</div>
								</div>
			    							
			    			</div>

		    				<div class="row" style="height: 100%; padding-top: 2vh;">	
							 	<label for="link_data_provider" class="col-2 col-form-label">Link data provider to votes calc:</label> 
								<div class="col-6">
									<textarea  class="form-control" id="link_data_provider" required></textarea>
								</div>
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="getVotesCalcDataProvider((res)=>{
								  			safeSetValueById('link_data_provider',res);
								  		})">Get current</button>
								  	</div>
								</div>
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="setVotesCalcDataProvider(document.getElementById('link_data_provider').value)">Set new</button>
								  	</div>
								</div>
							</div>

			    			<!--<div class="row" style="height: 100%; padding-top: 2vh;">	
							 	<label for="pool_1_contracts" class="col-2 col-form-label">Pool 1:</label> 
								<div class="col-6">
									<textarea  class="form-control" id="pool_1_contracts" required></textarea>
								</div>
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="getBackendParameter('POOL1',(res)=>{
								  			safeSetValueById('pool_1_contracts',res);
								  		})">Get current</button>
								  	</div>
								</div>
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="setBackendParameter('POOL1',document.getElementById('pool_1_contracts').value)">Set new</button>
								  	</div>
								</div>
							</div>

							<div class="row" style="height: 100%; padding-top: 2vh;">	
							 	<label for="pool_2_contracts" class="col-2 col-form-label">Pool 2:</label> 
								<div class="col-6">
									<textarea  class="form-control" id="pool_2_contracts" required></textarea>
								</div>
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="getBackendParameter('POOL2',(res)=>{
								  			safeSetValueById('pool_2_contracts',res);
								  		})">Get current</button>
								  	</div>
								</div>
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="setBackendParameter('POOL2',document.getElementById('pool_2_contracts').value)">Set new</button>
								  	</div>
								</div>
							</div>

							<div class="row" style="height: 100%; padding-top: 2vh;">	
							 	<label for="pool_3_contracts" class="col-2 col-form-label">Pool 3:</label> 
								<div class="col-6">
									<textarea  class="form-control" id="pool_3_contracts" required></textarea>
								</div>
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="getBackendParameter('POOL3',(res)=>{
								  			safeSetValueById('pool_3_contracts',res);
								  		})">Get current</button>
								  	</div>
								</div>
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" onclick="setBackendParameter('POOL3',document.getElementById('pool_3_contracts').value)">Set new</button>
								  	</div>
								</div>
							</div>-->

							

							<div class="row" style="height: 100%; padding-top: 2vh;">
	    							<div class="col-6">
	    								<select class="" id="data_profiles_list" name="data_profiles_list" onchange="dataProfilesListOnchange()"></select>
	    							</div>
									<div class="col-6">
									<div style="float: right;">
										<button class="btn btn-primary" type="submit" onclick="refreshDataProfilesList()">Refresh data profiles list</button> 
									</div>
								</div>
    						</div>

							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<label for="data_profile_name" class="col-2 col-form-label">Data profile name:</label> 
									<div class="col-6">
										<input type="text" id="data_profile_name" class="form-control"  name="data_profile_name" > 
									</div>
								
							</div>

							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<label for="data_profile_contract" class="col-2 col-form-label">Data profile contract:</label> 
									<div class="col-6">
										<input type="text" id="data_profile_contract" class="form-control"  name="data_profile_contract" > 
									</div>
								
							</div>

							<div class="row" style="height: 100%; padding-top: 2vh;">			
								<label for="data_isInternal" class="col-2 col-form-label">Data is internal:</label> 
								<div class="col-6">
									<input list="data_isInternal_list" id="data_isInternal" class="form-control" placeholder="" value="No" name="data_isInternal"> 
								</div>
								   
								<datalist id="data_isInternal_list">
									<option value="Yes">
									<option value="No">
								</datalist>
							</div>

							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<label for="provider_data" class="col-2 col-form-label">Data:</label> 
								<div class="col-6">
									<input type="number" id="provider_data" class="form-control"  name="provider_data" value="0"> 
								</div>
								
							</div>

							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<label for="provider_decimals" class="col-2 col-form-label">Decimals:</label> 
								<div class="col-6">
									<input type="number" id="provider_decimals" class="form-control"  name="provider_decimals" value="8"> 
								</div>
								
							</div>
						
							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" 
										onclick="getSmartContractDataProfile(() => {	
																	return data_profiles_list.selectedIndex;
																}, (json_details) => { 
																	//console.log('prof', json_details);

																	safeSetValueById('data_profile_name',json_details['name']);
																	safeSetValueById('data_profile_contract',json_details['data_provider_contract']);
																	safeSetValueById('data_isInternal',json_details['isInternal']);
																	safeSetValueById('provider_data',json_details['_data']);
																	safeSetValueById('provider_decimals',json_details['_decimals']);						

																})">Get current</button>
								  	</div>
								</div>

								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" 
										onclick="updateSmartContractDataProfile(
																() => {
																	let details = {};
																	details['name'] = document.getElementById('data_profile_name').value;
																	details['data_provider_contract'] = document.getElementById('data_profile_contract').value;
																	details['isInternal'] = document.getElementById('data_isInternal').value;
																	details['_data'] = document.getElementById('provider_data').value;
																	details['_decimals'] = document.getElementById('provider_decimals').value;
																	
																	return details;
																  }
																
																)">Update</button>
								  	</div>
								</div>
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" 
										onclick="addSmartContractDataProfile(	
											
																() => {
																	let details = {};
																	details['name'] = document.getElementById('data_profile_name').value;
																	details['data_provider_contract'] = document.getElementById('data_profile_contract').value;
																	details['isInternal'] = document.getElementById('data_isInternal').value;
																	details['_data'] = document.getElementById('provider_data').value;
																	details['_decimals'] = document.getElementById('provider_decimals').value;
																	
																	
																	return details;
																  }
																
																)">Add</button>
								  	</div>
								</div>
								
							</div>

							<!--
								struct Famer {
							        address famer_token_address;
							        bool sold;
							        uint256 sold_for;
							    }
							-->
							
							<div class="row" style="height: 100%; padding-top: 2vh;">
	    							<div class="col-6">
	    								<select class="" id="famers_list" name="famers_list" onchange="famersListOnchange()"></select>
	    							</div>
									<div class="col-6">
									<div style="float: right;">
										<button class="btn btn-primary" type="submit" onclick="refreshFamersList()">Refresh famers list</button> 
									</div>
								</div>
    						</div>
							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<label for="famer_token_address" class="col-2 col-form-label">Famer token address:</label> 
									<div class="col-6">
										<input type="text" id="famer_token_address" class="form-control"  name="famer_token_address" > 
									</div>
								
							</div>
							<div class="row" style="height: 100%; padding-top: 2vh;">			
								<label for="famer_sold" class="col-2 col-form-label">Famer sold:</label> 
								<div class="col-6">
									<input list="famer_sold_list" id="famer_sold" class="form-control" placeholder="" value="No" name="famer_sold"> 
								</div>
								   
								<datalist id="famer_sold_list">
									<option value="Yes">
									<option value="No">
								</datalist>
							</div>

							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<label for="famer_sold_for" class="col-2 col-form-label">Sold for:</label> 
									<div class="col-6">
										<input type="number" id="famer_sold_for" class="form-control"  name="famer_sold_for" value="0"> 
									</div>
								
							</div>
						
							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" 
										onclick="getSmartContractFamerProfile(() => {	
																	return famers_list.selectedIndex;
																}, (json_details) => { 
																	safeSetValueById('famer_token_address',json_details['famer_token_address']);
																	safeSetValueById('famer_sold',json_details['sold']);
																	safeSetValueById('famer_sold_for',json_details['sold_for']);						

																})">Get current</button>
								  	</div>
								</div>

								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" 
										onclick="updateSmartContractFamerProfile(
																() => {
																	let details = {};
																	details['famer_token_address'] = document.getElementById('famer_token_address').value;
																	details['sold'] = document.getElementById('famer_sold').value;
																	details['sold_for'] = document.getElementById('famer_sold_for').value;
																	
																	return details;
																  }
																
																)">Update</button>
								  	</div>
								</div>
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" 
										onclick="addSmartContractFamerProfile(	
											
																() => {
																	let details = {};
																	details['famer_token_address'] = document.getElementById('famer_token_address').value;
																	details['sold'] = document.getElementById('famer_sold').value;
																	details['sold_for'] = document.getElementById('famer_sold_for').value;
																	
																	return details;
																  }
																
																)">Add</button>
								  	</div>
								</div>
								
							</div>
							<!--
								struct DepositProfile {
							      uint32 id;
							      string name;
							      uint8 deposit_type; 
							      address deposit_token_address; //0x0 if ethereum
							      
							       //in reward token (or ethereum), real amount, for the whole pool, i.e reward for holder per day  = reward_per_day/total pool size for this profile
							      uint256 reward_per_day; 
							     
							      uint256 min_lock_time; //in unix time, i.e. 1 day == 86400
							    }
							-->

							<div class="row" style="height: 100%; padding-top: 2vh;">
	    							<div class="col-6">
	    								<select class="" id="deposit_profiles_list" name="deposit_profiles_list" onchange="depositProfilesListOnchange()"></select>
	    							</div>
									<div class="col-6">
										<div style="float: right;">
											<button class="btn btn-primary" type="submit" onclick="refreshDepositProfilesList()">Refresh list</button> 
										</div>
									</div>
    						</div>
							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<label for="smartcontract_profile_id" class="col-2 col-form-label">Profile id:</label> 
									<div class="col-6">
										<input type="number" id="smartcontract_profile_id" class="form-control"  name="smartcontract_profile_id" > 
									</div>
								
							</div>
							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<label for="smartcontract_profile_name" class="col-2 col-form-label">Profile name:</label> 
									<div class="col-6">
										<input type="text" id="smartcontract_profile_name" class="form-control" placeholder="" value="" name="smartcontract_profile_name" step="1"> 
									</div>
							</div>
							<div class="row" style="height: 100%; padding-top: 2vh;">			
								<label for="smartcontract_deposit_type" class="col-2 col-form-label">Deposit type:</label> 
								<div class="col-6">
									<input list="deposit_types" id="smartcontract_deposit_type" class="form-control" placeholder="" value="" name="smartcontract_deposit_type"> 
								</div>
								    <!--uint8 constant  ERC20_TOKEN = 1;
									    uint8 constant  ERC721_TOKEN = 2;
									    uint8 constant  UNISWAP_PAIR = 3;
									    uint8 constant  NATIVE_ETHEREUM = 4; -->
								<datalist id="deposit_types">
									<option value="ERC20">
									<option value="ERC721">
									<option value="Uniswap pair">
									<option value="Ether">
								</datalist>
							</div>
							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<label for="smartcontract_deposit_token_address" class="col-2 col-form-label">Deposit token address:</label> 
									<div class="col-6">
										<input type="text" id="smartcontract_deposit_token_address" class="form-control" placeholder="" value="" name="smartcontract_deposit_token_address" step="1"> 
									</div>
							</div>
							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<label for="smartcontract_init_apy" class="col-2 col-form-label">Init APY:</label> 
									<div class="col-6">
										<input type="number" id="smartcontract_init_apy" class="form-control"  name="smartcontract_init_apy" > 
									</div>
								
							</div>
							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<label for="smartcontract_rate" class="col-2 col-form-label">Rate:</label> 
									<div class="col-6">
										<input type="number" id="smartcontract_rate" class="form-control"  name="smartcontract_rate" > 
									</div>
								
							</div>
							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<label for="smartcontract_reward_per_day" class="col-2 col-form-label">Reward per day (wei):</label> 
									<div class="col-6">
										<input type="number" id="smartcontract_reward_per_day" class="form-control"  name="smartcontract_reward_per_day" > 
									</div>
								
							</div>
							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<label for="smartcontract_min_lock_time" class="col-2 col-form-label">Lock time, sec. (1 day = 86400):</label> 
									<div class="col-6">
										<input type="number" id="smartcontract_min_lock_time" class="form-control"  name="smartcontract_min_lock_time" > 
									</div>
								
							</div>
							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" 
										onclick="getSmartContractDepositProfile(() => {	
																	var profile_id = 0;
																	if (deposit_profiles_list.selectedIndex > 0){
																		var val = JSON.parse(deposit_profiles_list.value);
																		profile_id = parseInt(val['id']);
																	}
																	return profile_id;
																}, (json_details) => { 
																	safeSetValueById('smartcontract_profile_id',json_details['id']);
																	safeSetValueById('smartcontract_profile_name',json_details['name']);
																	safeSetValueById('smartcontract_deposit_type',json_details['deposit_type']);
																	safeSetValueById('smartcontract_deposit_token_address',json_details['deposit_token_address']); 
																	safeSetValueById('smartcontract_init_apy',json_details['init_apy']); 
																	safeSetValueById('smartcontract_rate',json_details['rate']); 
																	safeSetValueById('smartcontract_reward_per_day',json_details['reward_per_day']);
																	safeSetValueById('smartcontract_min_lock_time',json_details['min_lock_time']);
																		

																})">Get current</button>
								  	</div>
								</div>

								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" 
										onclick="updateSmartContractDepositProfile(() => {	
																	var profile_id = 0;
																	if (deposit_profiles_list.selectedIndex > 0){
																		var val = JSON.parse(deposit_profiles_list.value);
																		profile_id = parseInt(val['id']);
																	}
																	return profile_id;
																}, 
																() => {
																	let details = {};
																	details['id'] = document.getElementById('smartcontract_profile_id').value;
																	details['name'] = document.getElementById('smartcontract_profile_name').value;
																	details['deposit_type'] = document.getElementById('smartcontract_deposit_type').value;
																	details['deposit_token_address'] = document.getElementById('smartcontract_deposit_token_address').value;
																	details['init_apy'] = document.getElementById('smartcontract_init_apy').value;
																	details['rate'] = document.getElementById('smartcontract_rate').value;
																	details['reward_per_day'] = document.getElementById('smartcontract_reward_per_day').value;
																	details['min_lock_time'] = document.getElementById('smartcontract_min_lock_time').value;
																	
																	return details;
																  }
																
																)">Update</button>
								  	</div>
								</div>
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" 
										onclick="addSmartContractDepositProfile(() => {	
																	return document.getElementById('smartcontract_profile_id').value;
																}, 
																() => {
																	let details = {};
																	details['id'] = document.getElementById('smartcontract_profile_id').value;
																	details['name'] = document.getElementById('smartcontract_profile_name').value;
																	details['deposit_type'] = document.getElementById('smartcontract_deposit_type').value;
																	details['deposit_token_address'] = document.getElementById('smartcontract_deposit_token_address').value;
																	details['init_apy'] = document.getElementById('smartcontract_init_apy').value;
																	details['rate'] = document.getElementById('smartcontract_rate').value;
																	details['reward_per_day'] = document.getElementById('smartcontract_reward_per_day').value;
																	details['min_lock_time'] = document.getElementById('smartcontract_min_lock_time').value;
																	
																	return details;
																  }
																
																)">Add</button>
								  	</div>
								</div>
								
							</div>

							<!--
								struct CreditProfile {
							      uint32 id;
							      string name; // == data label for data provider
							      uint8  _type; 
							      address _token_address; //0x0 if ethereum
							      uint256 valuation_percent; //scale = 100000;  i.e. 1% == 1000, 0.1% == 100
							      uint256 init_apy; //APY = Initial APY + Rate * Usage, Usage = ration of borrowed/deposited; scale = 100000; i.e. 1% == 1000, 0.1% == 100
							      uint256 rate;
							    }

							-->

							<div class="row" style="height: 100%; padding-top: 2vh;">
	    							<div class="col-6">
	    								<select class="" id="credit_profiles_list" name="credit_profiles_list" onchange="creditProfilesListOnchange()"></select>
	    							</div>
									<div class="col-6">
										<div style="float: right;">
											<button class="btn btn-primary" type="submit" onclick="refreshCreditProfilesList()">Refresh list</button> 
										</div>
									</div>
    						</div>
							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<label for="credit_profile_id" class="col-2 col-form-label">Profile id:</label> 
									<div class="col-6">
										<input type="number" id="credit_profile_id" class="form-control"  name="credit_profile_id" > 
									</div>
								
							</div>
							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<label for="credit_profile_name" class="col-2 col-form-label">Profile name:</label> 
									<div class="col-6">
										<input type="text" id="credit_profile_name" class="form-control" placeholder="" value="" name="credit_profile_name" step="1"> 
									</div>
							</div>
							<div class="row" style="height: 100%; padding-top: 2vh;">			
								<label for="credit_type" class="col-2 col-form-label">Credit type:</label> 
								<div class="col-6">
									<input list="credit_types" id="credit_type" class="form-control" placeholder="" value="" name="credit_type"> 
								</div>
								    <!--uint8 constant  ERC20_TOKEN = 1;
									    uint8 constant  ERC721_TOKEN = 2;
									    uint8 constant  UNISWAP_PAIR = 3;
									    uint8 constant  NATIVE_ETHEREUM = 4; -->
								<datalist id="credit_types">
									<option value="ERC20">
									<option value="ERC721">
									<option value="Uniswap pair">
									<option value="Ether">
								</datalist>
							</div>
							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<label for="credit_token_address" class="col-2 col-form-label">Token address:</label> 
									<div class="col-6">
										<input type="text" id="credit_token_address" class="form-control" placeholder="" value="" name="credit_token_address" step="1"> 
									</div>
							</div>
							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<label for="credit_val_perc" class="col-2 col-form-label">Valuation %%:</label> 
									<div class="col-6">
										<input type="number" id="credit_val_perc" class="form-control"  name="credit_val_perc" > 
									</div>
								
							</div>
							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<label for="credit_init_apy" class="col-2 col-form-label">Init APY:</label> 
									<div class="col-6">
										<input type="number" id="credit_init_apy" class="form-control"  name="credit_init_apy" > 
									</div>
								
							</div>
							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<label for="credit_rate" class="col-2 col-form-label">Rate:</label> 
									<div class="col-6">
										<input type="number" id="credit_rate" class="form-control"  name="credit_rate" > 
									</div>
								
							</div>
							
							<div class="row" style="height: 100%; padding-top: 2vh;">	
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" 
										onclick="getSmartContractCreditProfile(() => {	
																	var profile_id = 0;
																	if (credit_profiles_list.selectedIndex > 0){
																		var val = JSON.parse(credit_profiles_list.value);
																		profile_id = parseInt(val['id']);
																	}
																	return profile_id;
																}, (json_details) => { 
																	safeSetValueById('credit_profile_id',json_details['id']);
																	safeSetValueById('credit_profile_name',json_details['name']);
																	safeSetValueById('credit_type',json_details['_type']);
																	safeSetValueById('credit_token_address',json_details['_token_address']); 
																	safeSetValueById('credit_val_perc',json_details['valuation_percent']); 
																	safeSetValueById('credit_init_apy',json_details['init_apy']); 
																	safeSetValueById('credit_rate',json_details['rate']); 
																	

																})">Get current</button>
								  	</div>
								</div>

								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" 
										onclick="updateSmartContractCreditProfile(() => {	
																	var profile_id = 0;
																	if (credit_profiles_list.selectedIndex > 0){
																		var val = JSON.parse(credit_profiles_list.value);
																		profile_id = parseInt(val['id']);
																	}
																	return profile_id;
																}, 
																() => {
																	let details = {};
																	details['id'] = document.getElementById('credit_profile_id').value;
																	details['name'] = document.getElementById('credit_profile_name').value;
																	details['_type'] = document.getElementById('credit_type').value;
																	details['_token_address'] = document.getElementById('credit_token_address').value;
																	details['valuation_percent'] = document.getElementById('credit_val_perc').value;
																	details['init_apy'] = document.getElementById('credit_init_apy').value;
																	details['rate'] = document.getElementById('credit_rate').value;
																	
																	
																	return details;
																  }
																
																)">Update</button>
								  	</div>
								</div>
								<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-primary" 
										onclick="addSmartContractCreditProfile(() => {	
																	return document.getElementById('credit_profile_id').value;
																}, 
																() => {
																	let details = {};
																	details['id'] = document.getElementById('credit_profile_id').value;
																	details['name'] = document.getElementById('credit_profile_name').value;
																	details['_type'] = document.getElementById('credit_type').value;
																	details['_token_address'] = document.getElementById('credit_token_address').value;
																	details['valuation_percent'] = document.getElementById('credit_val_perc').value;
																	details['init_apy'] = document.getElementById('credit_init_apy').value;
																	details['rate'] = document.getElementById('credit_rate').value;
																	
																	return details;
																  }
																
																)">Add</button>
								  	</div>
								</div>
								
							</div>

							<div class="row" style="height: 100%; margin-top: 2vh; border-top:  solid; border-color: black"></div>
							<div class="row" style="height: 100%; margin-top: 2vh;">
								<div class="col-2">
									<div style="float: right;">
								  		<button  class="btn btn-primary" onclick="buildPortfolioTable()">Portfolio report</button>
								  	</div>
								</div>
								
								
							</div>
							<div class="row" style="height: 100%; margin-top: 2vh;">
								
								<div style="margin-left: 2vw;" i id="portfolio_table"></div>
							
							</div>

							<div class="row" style="height: 100%; margin-top: 2vh; border-top:  solid; border-color: black"></div>
							<div class="row" style="height: 100%; margin-top: 2vh;">
								<div class="col-2">
									<div style="float: right;">
								  		<button  class="btn btn-primary" onclick="getAnalysisTable()">Analyze liquidity</button>
								  	</div>
								</div>
								<!--<div class="col-2">
									<div style="float: right;">
								  		<button class="btn btn-danger" onclick="adjustLiquidity()">Adjust Liquidity</button>
								  	</div>
								</div>-->
								<div class="col-2">
									<div style="float: right;">
								  		<button id="start_stop_button" class="btn btn-danger" onclick="start_stop_bank()"></button>
								  	</div>
								</div>
								
							</div>
							<div class="row" style="height: 100%; margin-top: 2vh;">
								
								<div style="margin-left: 2vw;" i id="analysis_table"></div>
							
							</div>
							<div class="row" style="height: 100%; margin-top: 2vh;">
								
								<div  style="margin-left: 2vw;" id="cust_analysis_table"></div>
								
							</div>

							<div class="row">
								<div class="col-2"></div>
							  	<div class="col-10">
							  		<div id="success" style="color: red;"></div> <!-- For success/fail messages -->
							  	</div>  
							</div>
						</div>
			
		
    				</div>

    			</div>
			</div>
    	</div>
   		
		<div id="info_pane" onclick="safeSetInnerHTMLById('info_pane','')"></div>
		
	
		<div class="copyr">
			2020 © <a href="#" class="hover-target">Cyclop Games</a>
		</div>
		
		<div class="scroll-to-top hover-target"></div>
		
		<!-- Page cursor
		================================================== -->
		
        <div class='cursor' id="cursor"></div>
        <div class='cursor2' id="cursor2"></div>
        <div class='cursor3' id="cursor3"></div>		
		
	</div>

	
	<!-- JAVASCRIPT
    ================================================== -->
	<!--<script src="admin/js/jquery.min.js"></script>
	<script src="admin/js/popper.min.js"></script>
	<script src="admin/js/bootstrap.min.js"></script>
	<script src="admin/js/plugins_cut.js"></script> -->
	
	<script type="text/javascript" src="https://unpkg.com/web3@1.3.4/dist/web3.min.js"></script>
  	<script type="text/javascript" src="https://unpkg.com/web3modal@1.9.3/dist/index.js"></script>
  	<script type="text/javascript" src="https://unpkg.com/evm-chains@0.2.0/dist/umd/index.min.js"></script>
  	<script type="text/javascript" src="https://unpkg.com/@walletconnect/web3-provider@1.4.1/dist/umd/index.min.js"></script>
	<script src="admin/js/custom.js"></script>


<script type="text/javascript">	

const famer_token_abi = [{"inputs": [{"internalType": "string","name": "nft_name","type": "string"},{"internalType": "string","name": "nft_symbol","type": "string"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "_owner","type": "address"},{"indexed": true,"internalType": "address","name": "_approved","type": "address"},{"indexed": true,"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "Approval","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "_owner","type": "address"},{"indexed": true,"internalType": "address","name": "_operator","type": "address"},{"indexed": false,"internalType": "bool","name": "_approved","type": "bool"}],"name": "ApprovalForAll","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "previousOwner","type": "address"},{"indexed": true,"internalType": "address","name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "_from","type": "address"},{"indexed": true,"internalType": "address","name": "_to","type": "address"},{"indexed": true,"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "Transfer","type": "event"},{"inputs": [],"name": "CANNOT_TRANSFER_TO_ZERO_ADDRESS","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "NOT_CURRENT_OWNER","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_approved","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "approve","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "burn","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "getApproved","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getBankContract","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getContractBalance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getPublisher","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"},{"internalType": "address","name": "_operator","type": "address"}],"name": "isApprovedForAll","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"},{"internalType": "string","name": "_uri","type": "string"}],"name": "mint","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "_name","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "ownerOf","outputs": [{"internalType": "address","name": "_owner","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_tokenId","type": "uint256"},{"internalType": "string","name": "_uri","type": "string"}],"name": "resetTokenUrl","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_from","type": "address"},{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "safeTransferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_from","type": "address"},{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"},{"internalType": "bytes","name": "_data","type": "bytes"}],"name": "safeTransferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_operator","type": "address"},{"internalType": "bool","name": "_approved","type": "bool"}],"name": "setApprovalForAll","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "new_name","type": "string"}],"name": "setNFTName","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "new_symbol","type": "string"}],"name": "setNFTSymbol","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "bytes4","name": "_interfaceID","type": "bytes4"}],"name": "supportsInterface","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "_symbol","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_index","type": "uint256"}],"name": "tokenByIndex","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"},{"internalType": "uint256","name": "_index","type": "uint256"}],"name": "tokenOfOwnerByIndex","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "tokenURI","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "newBankContract","type": "address"}],"name": "transferBankRight","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_from","type": "address"},{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "transferFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "newPublisher","type": "address"}],"name": "transferPublishRight","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "sendTo","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "withdraw","outputs": [],"stateMutability": "nonpayable","type": "function"}];


const credit_contract_bytecode ="0x6080604052600580546001600160a01b031990811690915560068054821690556008805482169055600a805482169055600c805482169055600d8054909116905534801561004c57600080fd5b50600080546001600160a01b0319908116331780835560018054831630178155600255600580549092166001600160a01b03909116179055615c0f9081906200009590396000f3fe6080604052600436106102675760003560e01c80638da5cb5b11610144578063c7f6a508116100b6578063f0329f6b1161007a578063f0329f6b14610bfb578063f2aeff0014610c10578063f2fde38b14610c40578063f3fe3bc314610c73578063fa5019f914610c88578063fb081e7714610c9d57610267565b8063c7f6a50814610add578063d121553914610b1c578063e05d4c7d14610b61578063e4ca83cf14610b76578063edb6c52714610bbb57610267565b8063aa79f9f811610108578063aa79f9f81461098d578063ab94276a146109a2578063ae27c86a146109b7578063af9c2243146109cc578063b7775735146109fc578063c4dbdcbf14610ac857610267565b80638da5cb5b146108745780639377b9b014610889578063967299be146108bc578063986f6574146108f457806399db82651461093457610267565b806355cf38e2116101dd578063658cd21f116101a1578063658cd21f146106865780637237a66d146106b95780637ca0d6ea146106ec5780637d3d311614610724578063860d248a1461076c57806386bb3b63146107f657610267565b806355cf38e2146104f45780635e66aae71461056d5780635f8a0588146105b657806360b9d75b1461061857806362a92b4a1461065057610267565b806338b5fe7d1161022f57806338b5fe7d146103ba5780633caeb75e146103e15780633ea6b5b4146103f657806340c3a7341461040b57806343fb2dc01461045e578063452de525146104c157610267565b80630ec2e8211461026c5780631de98cc8146102a15780631e3f1968146102d2578063272edf7b1461030a5780632f0e1ce01461035d575b600080fd5b34801561027857600080fd5b5061029f6004803603602081101561028f57600080fd5b50356001600160a01b0316610e38565b005b3480156102ad57600080fd5b506102b661102c565b604080516001600160a01b039092168252519081900360200190f35b61029f600480360360608110156102e857600080fd5b506001600160a01b038135169063ffffffff602082013516906040013561103b565b34801561031657600080fd5b5061033a6004803603602081101561032d57600080fd5b503563ffffffff16611541565b604080516001600160a01b03909316835260208301919091528051918290030190f35b34801561036957600080fd5b5061029f600480360360c081101561038057600080fd5b506001600160a01b038135169063ffffffff602082013581169160408101359160608201351690608081013515159060a0013515156115b4565b3480156103c657600080fd5b506103cf61192a565b60408051918252519081900360200190f35b3480156103ed57600080fd5b506102b661193b565b34801561040257600080fd5b506102b661194a565b34801561041757600080fd5b506104436004803603604081101561042e57600080fd5b5063ffffffff81358116916020013516611959565b60408051921515835260208301919091528051918290030190f35b34801561046a57600080fd5b5061049d6004803603604081101561048157600080fd5b5080356001600160a01b0316906020013563ffffffff166119e2565b60408051938452602084019290925263ffffffff1682820152519081900360600190f35b3480156104cd57600080fd5b5061029f600480360360208110156104e457600080fd5b50356001600160a01b0316611a52565b34801561050057600080fd5b5061052c6004803603604081101561051757600080fd5b5063ffffffff81358116916020013516611a7c565b6040805163ffffffff90981688526020880196909652868601949094526060860192909252608085015260a0840152151560c0830152519081900360e00190f35b34801561057957600080fd5b5061059d6004803603602081101561059057600080fd5b503563ffffffff16611c61565b6040805192835260208301919091528051918290030190f35b3480156105c257600080fd5b506105ef600480360360408110156105d957600080fd5b506001600160a01b038135169060200135611d6a565b604051808363ffffffff1681526020018263ffffffff1681526020019250505060405180910390f35b34801561062457600080fd5b506103cf6004803603604081101561063b57600080fd5b5063ffffffff81358116916020013516611e17565b34801561065c57600080fd5b506103cf6004803603604081101561067357600080fd5b5063ffffffff8135169060200135611ea3565b34801561069257600080fd5b5061029f600480360360208110156106a957600080fd5b50356001600160a01b0316611efb565b3480156106c557600080fd5b5061029f600480360360208110156106dc57600080fd5b50356001600160a01b0316611f32565b61029f6004803603606081101561070257600080fd5b506001600160a01b038135169063ffffffff602082013516906040013561226a565b34801561073057600080fd5b5061029f6004803603608081101561074757600080fd5b5063ffffffff81358116916020810135909116906040810135151590606001356127d0565b34801561077857600080fd5b5061078161293c565b6040805160208082528351818301528351919283929083019185019080838360005b838110156107bb5781810151838201526020016107a3565b50505050905090810190601f1680156107e85780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561080257600080fd5b5061082e6004803603604081101561081957600080fd5b5063ffffffff8135811691602001351661295e565b6040805163ffffffff98891681526020810197909752948716868601526060860193909352608085019190915260a084015290921660c082015290519081900360e00190f35b34801561088057600080fd5b506102b6612b56565b34801561089557600080fd5b5061029f600480360360208110156108ac57600080fd5b50356001600160a01b0316612b65565b3480156108c857600080fd5b5061029f600480360360408110156108df57600080fd5b5063ffffffff81358116916020013516612c75565b34801561090057600080fd5b5061029f6004803603606081101561091757600080fd5b5063ffffffff813581169160208101359091169060400135612cc4565b34801561094057600080fd5b5061096d6004803603604081101561095757600080fd5b506001600160a01b038135169060200135612dfa565b6040805163ffffffff909316835260208301919091528051918290030190f35b34801561099957600080fd5b506102b6612e9a565b3480156109ae57600080fd5b506102b6612ea9565b3480156109c357600080fd5b506102b6612eb8565b3480156109d857600080fd5b5061033a600480360360208110156109ef57600080fd5b503563ffffffff16612ec7565b348015610a0857600080fd5b50610a2f60048036036020811015610a1f57600080fd5b50356001600160a01b0316612f39565b604051808060200180602001838103835285818151815260200191508051906020019060200280838360005b83811015610a73578181015183820152602001610a5b565b50505050905001838103825284818151815260200191508051906020019060200280838360005b83811015610ab2578181015183820152602001610a9a565b5050505090500194505050505060405180910390f35b348015610ad457600080fd5b506102b66131b5565b348015610ae957600080fd5b506103cf60048036036040811015610b0057600080fd5b5080356001600160a01b0316906020013563ffffffff166131c4565b348015610b2857600080fd5b5061029f60048036036060811015610b3f57600080fd5b506001600160a01b038135169063ffffffff6020820135169060400135613222565b348015610b6d57600080fd5b506103cf61333e565b348015610b8257600080fd5b5061029f60048036036060811015610b9957600080fd5b506001600160a01b038135169063ffffffff602082013516906040013561334f565b348015610bc757600080fd5b506103cf60048036036060811015610bde57600080fd5b5063ffffffff813581169160208101359091169060400135613367565b348015610c0757600080fd5b506102b66133b7565b348015610c1c57600080fd5b506103cf60048036036020811015610c3357600080fd5b503563ffffffff166133c6565b348015610c4c57600080fd5b5061029f60048036036020811015610c6357600080fd5b50356001600160a01b03166134a1565b348015610c7f57600080fd5b5061078161357b565b348015610c9457600080fd5b506102b661359d565b348015610ca957600080fd5b50610cd060048036036020811015610cc057600080fd5b50356001600160a01b03166135ac565b60405180806020018060200180602001806020018060200186810386528b818151815260200191508051906020019060200280838360005b83811015610d20578181015183820152602001610d08565b5050505090500186810385528a818151815260200191508051906020019060200280838360005b83811015610d5f578181015183820152602001610d47565b50505050905001868103845289818151815260200191508051906020019060200280838360005b83811015610d9e578181015183820152602001610d86565b50505050905001868103835288818151815260200191508051906020019060200280838360005b83811015610ddd578181015183820152602001610dc5565b50505050905001868103825287818151815260200191508051906020019060200280838360005b83811015610e1c578181015183820152602001610e04565b505050509050019a505050505050505050505060405180910390f35b610e40613b51565b600680546001600160a01b038084166001600160a01b031992831617928390556007805490921692811692909217908190556040805163bae0b81560e01b81529051919092169163bae0b815916004808301926020929190829003018186803b158015610eac57600080fd5b505afa158015610ec0573d6000803e3d6000fd5b505050506040513d6020811015610ed657600080fd5b5051600880546001600160a01b039283166001600160a01b0319918216179182905560098054909116918316919091179055600754604080516382d726f960e01b8152905191909216916382d726f9916004808301926020929190829003018186803b158015610f4557600080fd5b505afa158015610f59573d6000803e3d6000fd5b505050506040513d6020811015610f6f57600080fd5b5051600a80546001600160a01b039283166001600160a01b03199182161791829055600b8054909116918316919091179055600754604080516309aa46bb60e31b815290519190921691634d5235d8916004808301926020929190829003018186803b158015610fde57600080fd5b505afa158015610ff2573d6000803e3d6000fd5b505050506040513d602081101561100857600080fd5b5051600c80546001600160a01b0319166001600160a01b0390921691909117905550565b600c546001600160a01b031681565b60028054600101908190556000808061105487876119e2565b925092509250848214611093576040805162461bcd60e51b8152602060048201526002602482015261333160f01b604482015290519081900360640190fd5b82156110cb576040805162461bcd60e51b8152602060048201526002602482015261199960f11b604482015290519081900360640190fd5b60006110dd888863ffffffff16611d6a565b50905063ffffffff81166298967f148015906110fe575063ffffffff811615155b611134576040805162461bcd60e51b8152602060048201526002602482015261031360f41b604482015290519081900360640190fd5b600b546040805163059e086960e51b815263ffffffff841660048201529051600092839283926001600160a01b039092169163b3c10d20916024808201928692909190829003018186803b15801561118b57600080fd5b505afa15801561119f573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526101008110156111c957600080fd5b815160208301805160405192949293830192919084600160201b8211156111ef57600080fd5b90830190602082018581111561120457600080fd5b8251600160201b81118282018810171561121d57600080fd5b82525081516020918201929091019080838360005b8381101561124a578181015183820152602001611232565b50505050905090810190601f1680156112775780820380516001836020036101000a031916815260200191505b5060409081526020820151910151949750955092935050505063ffffffff83166298967f14156112d2576040805162461bcd60e51b81526020600482015260016024820152601960f91b604482015290519081900360640190fd5b60ff8216600114806112e7575060ff82166003145b156113b357600654604080516323b872dd60e01b81523360048201526001600160a01b039283166024820152604481018c9052905183928316916323b872dd9160648083019260209291908290030181600087803b15801561134857600080fd5b505af192505050801561136d57506040513d602081101561136857600080fd5b505160015b6113a2576040805162461bcd60e51b81526020600482015260016024820152603360f81b604482015290519081900360640190fd5b506113ad868c613bcb565b50611492565b60ff821660041415611492578834146113f7576040805162461bcd60e51b81526020600482015260016024820152600d60fa1b604482015290519081900360640190fd5b6006546040516000916001600160a01b0316908b908381818185875af1925050503d8060008114611444576040519150601f19603f3d011682016040523d82523d6000602084013e611449565b606091505b50508091505080611486576040805162461bcd60e51b8152602060048201526002602482015261313560f01b604482015290519081900360640190fd5b611490868c613bcb565b505b61149d8b868c613c86565b604080516001600160a01b038d16815263ffffffff808d1660208301528183018c90528616606082015242608082015290517fcda61144a92479b117f688a12eda02d9fa1f3edade7a1599d7c1667e846483c19181900360a00190a150505050505050600254811461153b576040805162461bcd60e51b8152602060048201526002602482015261191960f11b604482015290519081900360640190fd5b50505050565b60008061154c6140f4565b60048363ffffffff168154811061155f57fe5b600091825260209091206004918202015481546001600160a01b03909116919063ffffffff861690811061158f57fe5b600091825260209091206003600490920201015490925063ffffffff1690505b915091565b60028054600101908190556001600160a01b0387163314611601576040805162461bcd60e51b81526020600482015260026024820152610ccd60f21b604482015290519081900360640190fd5b600760009054906101000a90046001600160a01b03166001600160a01b03166322f3e2d46040518163ffffffff1660e01b815260040160206040518083038186803b15801561164f57600080fd5b505afa158015611663573d6000803e3d6000fd5b505050506040513d602081101561167957600080fd5b50516116b1576040805162461bcd60e51b8152602060048201526002602482015261353160f01b604482015290519081900360640190fd5b60075460408051632576d91360e01b81526001600160a01b038a8116600483015263ffffffff8a16602483015282516000948594921692632576d913926044808301939192829003018186803b15801561170a57600080fd5b505afa15801561171e573d6000803e3d6000fd5b505050506040513d604081101561173457600080fd5b508051602090910151600b546040805163059e086960e51b815263ffffffff8516600482015290519395509193506000926001600160a01b039091169163b3c10d209160248083019286929190829003018186803b15801561179557600080fd5b505afa1580156117a9573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526101008110156117d357600080fd5b815160208301805160405192949293830192919084600160201b8211156117f957600080fd5b90830190602082018581111561180e57600080fd5b8251600160201b81118282018810171561182757600080fd5b82525081516020918201929091019080838360005b8381101561185457818101518382015260200161183c565b50505050905090810190601f1680156118815780820380516001836020036101000a031916815260200191505b5060405260200151945050505060ff82166002141590506118d357856118d3576040805162461bcd60e51b81526020600482015260026024820152611a9960f11b604482015290519081900360640190fd5b6118e38a8a8a8a8a8a898961418e565b5050506002548114611921576040805162461bcd60e51b8152602060048201526002602482015261191960f11b604482015290519081900360640190fd5b50505050505050565b60006119346140f4565b5060035490565b6008546001600160a01b031681565b6006546001600160a01b031681565b60008060048463ffffffff168154811061196f57fe5b6000918252602080832063ffffffff87811685526004938402909101600201909152604090922054815460ff9091169287169081106119aa57fe5b906000526020600020906004020160020160008563ffffffff16815260200190815260200160002060010154915091505b9250929050565b6000806000806119f8868663ffffffff16611d6a565b91505060048163ffffffff1681548110611a0e57fe5b906000526020600020906004020160010160008663ffffffff16815260200190815260200160002060030154611a448287611e17565b909450925090509250925092565b611a5a613b51565b600580546001600160a01b0319166001600160a01b0392909216919091179055565b600080600080600080600060038963ffffffff1681548110611a9a57fe5b6000918252602080832063ffffffff8c8116855260039384029091016001019091526040909220548154908316928c16908110611ad357fe5b906000526020600020906003020160010160008a63ffffffff1681526020019081526020016000206001015460038b63ffffffff1681548110611b1257fe5b906000526020600020906003020160010160008b63ffffffff1681526020019081526020016000206003015460038c63ffffffff1681548110611b5157fe5b906000526020600020906003020160010160008c63ffffffff1681526020019081526020016000206004015460038d63ffffffff1681548110611b9057fe5b906000526020600020906003020160010160008d63ffffffff1681526020019081526020016000206005015460038e63ffffffff1681548110611bcf57fe5b906000526020600020906003020160010160008e63ffffffff1681526020019081526020016000206006015460038f63ffffffff1681548110611c0e57fe5b906000526020600020906003020160010160008f63ffffffff16815260200190815260200160002060070160009054906101000a900460ff16965096509650965096509650965092959891949750929550565b60008060008060005b60045463ffffffff82161015611d5f5760005b60048263ffffffff1681548110611c9057fe5b600091825260209091206003600490920201015463ffffffff9081169082161015611d56578663ffffffff1660048363ffffffff1681548110611ccf57fe5b6000918252602080832063ffffffff8681168552600493909302016001019052604090912054161415611d4e5760048263ffffffff1681548110611d0f57fe5b906000526020600020906004020160010160008263ffffffff1681526020019081526020016000206003015484019350611d498282611e17565b830192505b600101611c7d565b50600101611c6a565b509092509050915091565b60008060005b60045463ffffffff82161015611e0757846001600160a01b031660048263ffffffff1681548110611d9d57fe5b60009182526020909120600490910201546001600160a01b03161415611dff5760048163ffffffff1681548110611dd057fe5b600091825260208083208784526001600490930201919091019052604090205463ffffffff16925090506119db565b600101611d70565b506298967f946000945092505050565b600954604080516360b9d75b60e01b815263ffffffff80861660048301528416602482015290516000926001600160a01b0316916360b9d75b916044808301926020929190829003018186803b158015611e7057600080fd5b505afa158015611e84573d6000803e3d6000fd5b505050506040513d6020811015611e9a57600080fd5b50519392505050565b6009546040805163315495a560e11b815263ffffffff851660048201526024810184905290516000926001600160a01b0316916362a92b4a916044808301926020929190829003018186803b158015611e7057600080fd5b611f03613b51565b600d80546001600160a01b03199081166001600160a01b039384161791829055600e8054929093169116179055565b611f3a613b51565b60008190506000816001600160a01b031663e05d4c7d6040518163ffffffff1660e01b815260040160206040518083038186803b158015611f7a57600080fd5b505afa158015611f8e573d6000803e3d6000fd5b505050506040513d6020811015611fa457600080fd5b5051905060005b818163ffffffff16101561211a57600080846001600160a01b031663272edf7b846040518263ffffffff1660e01b8152600401808263ffffffff168152602001915050604080518083038186803b15801561200557600080fd5b505afa158015612019573d6000803e3d6000fd5b505050506040513d604081101561202f57600080fd5b508051602090910151909250905060005b818163ffffffff16101561210f57612056615b22565b612061878684614794565b60408051631030e9cd60e21b815263ffffffff808916600483015285166024820152815192935060009283926001600160a01b038c16926340c3a7349260448083019392829003018186803b1580156120b957600080fd5b505afa1580156120cd573d6000803e3d6000fd5b505050506040513d60408110156120e357600080fd5b50805160209091015190925090506120ff8684848460006148ae565b5050600190920191506120409050565b505050600101611fab565b506000826001600160a01b03166338b5fe7d6040518163ffffffff1660e01b815260040160206040518083038186803b15801561215657600080fd5b505afa15801561216a573d6000803e3d6000fd5b505050506040513d602081101561218057600080fd5b5051905060005b818163ffffffff16101561226357600080856001600160a01b031663af9c2243846040518263ffffffff1660e01b8152600401808263ffffffff168152602001915050604080518083038186803b1580156121e157600080fd5b505afa1580156121f5573d6000803e3d6000fd5b505050506040513d604081101561220b57600080fd5b508051602090910151909250905060005b818163ffffffff16101561225857612232615b71565b61223d888684614c1c565b905061224e8482878560018d614d33565b505060010161221c565b505050600101612187565b5050505050565b60028054600101908190556001600160a01b03841633148061229657506000546001600160a01b031633145b806122ab57506001546001600160a01b031633145b806122c05750600c546001600160a01b031633145b6122f5576040805162461bcd60e51b81526020600482015260016024820152603960f81b604482015290519081900360640190fd5b600080600061230487876119e2565b92509250925084831015612344576040805162461bcd60e51b8152602060048201526002602482015261333160f01b604482015290519081900360640190fd5b6000612356888863ffffffff16611d6a565b50905063ffffffff81166298967f14801590612377575063ffffffff811615155b6123ad576040805162461bcd60e51b8152602060048201526002602482015261031360f41b604482015290519081900360640190fd5b600b546040805163059e086960e51b815263ffffffff841660048201529051600092839283926001600160a01b039092169163b3c10d20916024808201928692909190829003018186803b15801561240457600080fd5b505afa158015612418573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261010081101561244257600080fd5b815160208301805160405192949293830192919084600160201b82111561246857600080fd5b90830190602082018581111561247d57600080fd5b8251600160201b81118282018810171561249657600080fd5b82525081516020918201929091019080838360005b838110156124c35781810151838201526020016124ab565b50505050905090810190601f1680156124f05780820380516001836020036101000a031916815260200191505b5060409081526020820151910151949750955092935050505063ffffffff83166298967f141561254b576040805162461bcd60e51b81526020600482015260016024820152601960f91b604482015290519081900360640190fd5b60ff821660011480612560575060ff82166003145b1561262d57600654604080516323b872dd60e01b81523360048201526001600160a01b039283166024820152604481018c9052905183928316916323b872dd9160648083019260209291908290030181600087803b1580156125c157600080fd5b505af19250505080156125e657506040513d60208110156125e157600080fd5b505160015b61261b576040805162461bcd60e51b81526020600482015260016024820152603360f81b604482015290519081900360640190fd5b506126278c8c8c6152c0565b5061270d565b60ff82166004141561270d57883414612671576040805162461bcd60e51b81526020600482015260016024820152600d60fa1b604482015290519081900360640190fd5b6006546040516000916001600160a01b0316908b908381818185875af1925050503d80600081146126be576040519150601f19603f3d011682016040523d82523d6000602084013e6126c3565b606091505b50508091505080612700576040805162461bcd60e51b8152602060048201526002602482015261313560f01b604482015290519081900360640190fd5b61270b8c8c8c6152c0565b505b851580156127225750612720878a6153f9565b155b15612732576127328b868c613c86565b604080516001600160a01b038d16815263ffffffff808d1660208301528183018c90528616606082015242608082015290517f5461365a8d832e9f967cfb7ed44f409aff9f3ba79d9ec0b859804b277c016c579181900360a00190a150505050505050600254811461153b576040805162461bcd60e51b8152602060048201526002602482015261191960f11b604482015290519081900360640190fd5b6127d86140f4565b6127e28484611e17565b60048563ffffffff16815481106127f557fe5b906000526020600020906004020160010160008563ffffffff168152602001908152602001600020600501819055508160048563ffffffff168154811061283857fe5b6000918252602080832063ffffffff88168452600492909202909101600201905260409020805460ff191691151591909117905581156128b4578060048563ffffffff168154811061288657fe5b6000918252602080832063ffffffff88168452600260049093020191909101905260409020600101556128f3565b600060048563ffffffff16815481106128c957fe5b6000918252602080832063ffffffff88168452600260049093020191909101905260409020600101555b4260048563ffffffff168154811061290757fe5b906000526020600020906004020160010160008563ffffffff1681526020019081526020016000206004018190555050505050565b6040518060400160405280600681526020016518189c18181960d11b81525081565b600080600080600080600060048963ffffffff168154811061297c57fe5b6000918252602080832063ffffffff8c8116855260049384029091016001019091526040909220548154908316928c169081106129b557fe5b906000526020600020906004020160010160008a63ffffffff1681526020019081526020016000206001015460048b63ffffffff16815481106129f457fe5b906000526020600020906004020160010160008b63ffffffff16815260200190815260200160002060020160009054906101000a900463ffffffff1660048c63ffffffff1681548110612a4357fe5b906000526020600020906004020160010160008c63ffffffff1681526020019081526020016000206003015460048d63ffffffff1681548110612a8257fe5b906000526020600020906004020160010160008d63ffffffff1681526020019081526020016000206004015460048e63ffffffff1681548110612ac157fe5b906000526020600020906004020160010160008e63ffffffff1681526020019081526020016000206005015460048f63ffffffff1681548110612b0057fe5b906000526020600020906004020160010160008f63ffffffff16815260200190815260200160002060060160009054906101000a900463ffffffff16965096509650965096509650965092959891949750929550565b6000546001600160a01b031681565b612b6d613b51565b6000819050612bdf816001600160a01b031663ab94276a6040518163ffffffff1660e01b815260040160206040518083038186803b158015612bae57600080fd5b505afa158015612bc2573d6000803e3d6000fd5b505050506040513d6020811015612bd857600080fd5b5051610e38565b806001600160a01b031663ae27c86a6040518163ffffffff1660e01b815260040160206040518083038186803b158015612c1857600080fd5b505afa158015612c2c573d6000803e3d6000fd5b505050506040513d6020811015612c4257600080fd5b5051600d80546001600160a01b03199081166001600160a01b039384161791829055600e80549290931691161790555050565b612c7d613b51565b8060048363ffffffff1681548110612c9157fe5b906000526020600020906004020160030160006101000a81548163ffffffff021916908363ffffffff1602179055505050565b612ccc6140f4565b612cd68383611e17565b60048463ffffffff1681548110612ce957fe5b906000526020600020906004020160010160008463ffffffff16815260200190815260200160002060050181905550600160048463ffffffff1681548110612d2d57fe5b906000526020600020906004020160020160008463ffffffff16815260200190815260200160002060000160006101000a81548160ff0219169083151502179055508060048463ffffffff1681548110612d8357fe5b906000526020600020906004020160020160008463ffffffff168152602001908152602001600020600101819055504260048463ffffffff1681548110612dc657fe5b906000526020600020906004020160010160008463ffffffff16815260200190815260200160002060040181905550505050565b60008060005b60035463ffffffff82161015611e0757846001600160a01b031660038263ffffffff1681548110612e2d57fe5b60009182526020909120600390910201546001600160a01b03161415612e925760038163ffffffff1681548110612e6057fe5b600091825260208083208784526001600390930201919091019052604090205463ffffffff90811693501690506119db565b600101612e00565b600d546001600160a01b031681565b6006546001600160a01b031690565b600d546001600160a01b031690565b600080612ed26140f4565b60038363ffffffff1681548110612ee557fe5b600091825260209091206003918202015481546001600160a01b03909116919063ffffffff8616908110612f1557fe5b600091825260209091206002600390920201015490925063ffffffff169050915091565b6060806001600160a01b038316331480612f5d57506000546001600160a01b031633145b80612f7257506001546001600160a01b031633145b612fa7576040805162461bcd60e51b81526020600482015260016024820152603960f81b604482015290519081900360640190fd5b600080612fb5856000612dfa565b909250905063ffffffff82166298967f1415612fda5750606092508291506115af9050565b606060038281548110612fe957fe5b600091825260209091206002600390920201015463ffffffff1667ffffffffffffffff8111801561301957600080fd5b50604051908082528060200260200182016040528015613043578160200160208202803683370190505b50905060606003838154811061305557fe5b600091825260209091206002600390920201015463ffffffff1667ffffffffffffffff8111801561308557600080fd5b506040519080825280602002602001820160405280156130af578160200160208202803683370190505b5090506000805b600385815481106130c357fe5b600091825260209091206002600390920201015463ffffffff90811690821610156131a657600385815481106130f557fe5b906000526020600020906003020160010160008263ffffffff16815260200190815260200160002060010154915081848263ffffffff168151811061313657fe5b6020026020010181815250506003858154811061314f57fe5b6000918252602080832063ffffffff8581168086526003949094029091016001019091526040909220548551921691859190811061318957fe5b63ffffffff909216602092830291909101909101526001016130b6565b50909550909350505050915091565b6001546001600160a01b031681565b6000806131d7848463ffffffff16611d6a565b91505060048163ffffffff16815481106131ed57fe5b906000526020600020906004020160010160008463ffffffff1681526020019081526020016000206003015491505092915050565b61322a6140f4565b600061323c848463ffffffff16612dfa565b915050816003828154811061324d57fe5b6000918252602080832063ffffffff881684526001600390930201820190526040909120015410156132ab576040805162461bcd60e51b8152602060048201526002602482015261333960f01b604482015290519081900360640190fd5b60006132f883600384815481106132be57fe5b906000526020600020906003020160010160008763ffffffff168152602001908152602001600020600101546153f990919063ffffffff16565b9050806003838154811061330857fe5b906000526020600020906003020160010160008663ffffffff168152602001908152602001600020600101819055505050505050565b60006133486140f4565b5060045490565b6133576140f4565b6133628383836152c0565b505050565b600060038463ffffffff168154811061337c57fe5b6000918252602080832063ffffffff871684526001600390930201919091018152604080832085845260020190915290205490509392505050565b6005546001600160a01b031681565b600080805b60045481101561349a5760005b600482815481106133e557fe5b600091825260209091206003600490920201015463ffffffff9081169082161015613491578463ffffffff166004838154811061341e57fe5b6000918252602080832063ffffffff8681168552600493909302016001019052604090912054161415613489576004828154811061345857fe5b906000526020600020906004020160010160008263ffffffff16815260200190815260200160002060030154830192505b6001016133d8565b506001016133cb565b5092915050565b6134a9613b51565b60408051808201909152600681526518189c18181960d11b60208201526001600160a01b0382166135585760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561351d578181015183820152602001613505565b50505050905090810190601f16801561354a5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600080546001600160a01b0319166001600160a01b0392909216919091179055565b6040518060400160405280600681526020016530313830303160d01b81525081565b600a546001600160a01b031681565b6060808080806001600160a01b0386163314806135d357506000546001600160a01b031633145b806135e857506001546001600160a01b031633145b61361d576040805162461bcd60e51b81526020600482015260016024820152603960f81b604482015290519081900360640190fd5b60008061362b886000611d6a565b909250905063ffffffff82166298967f1415613659575060609550859450849350839250829150613b489050565b60075460408051631fc5613560e11b815290516000926001600160a01b031691633f8ac26a916004808301926020929190829003018186803b15801561369e57600080fd5b505afa1580156136b2573d6000803e3d6000fd5b505050506040513d60208110156136c857600080fd5b50516004805491925060609163ffffffff85169081106136e457fe5b600091825260209091206003600490920201015463ffffffff1667ffffffffffffffff8111801561371457600080fd5b5060405190808252806020026020018201604052801561373e578160200160208202803683370190505b509050606060048463ffffffff168154811061375657fe5b600091825260209091206003600490920201015463ffffffff1667ffffffffffffffff8111801561378657600080fd5b506040519080825280602002602001820160405280156137b0578160200160208202803683370190505b509050606060048563ffffffff16815481106137c857fe5b600091825260209091206003600490920201015463ffffffff1667ffffffffffffffff811180156137f857600080fd5b50604051908082528060200260200182016040528015613822578160200160208202803683370190505b509050606060048663ffffffff168154811061383a57fe5b600091825260209091206003600490920201015463ffffffff1667ffffffffffffffff8111801561386a57600080fd5b50604051908082528060200260200182016040528015613894578160200160208202803683370190505b509050606060048763ffffffff16815481106138ac57fe5b600091825260209091206003600490920201015463ffffffff1667ffffffffffffffff811180156138dc57600080fd5b50604051908082528060200260200182016040528015613906578160200160208202803683370190505b5090506000806000805b60048b63ffffffff168154811061392357fe5b600091825260209091206003600490920201015463ffffffff9081169082161015613b315760048b63ffffffff168154811061395b57fe5b906000526020600020906004020160010160008263ffffffff1681526020019081526020016000206003015493506139938b82611e17565b92506139f08a6139ea60048e63ffffffff16815481106139af57fe5b906000526020600020906004020160010160008563ffffffff16815260200190815260200160002060040154426153f990919063ffffffff16565b90615471565b915083898263ffffffff1681518110613a0557fe5b60200260200101818152505082888263ffffffff1681518110613a2457fe5b60200260200101818152505081878263ffffffff1681518110613a4357fe5b602002602001019063ffffffff16908163ffffffff168152505060048b63ffffffff1681548110613a7057fe5b6000918252602080832063ffffffff85811680865260049490940290910160010190915260409092205488519216918891908110613aaa57fe5b602002602001019063ffffffff16908163ffffffff168152505060048b63ffffffff1681548110613ad757fe5b6000918252602080832063ffffffff85811680865260049490940290910160010190915260409092206002015487519216918791908110613b1457fe5b63ffffffff90921660209283029190910190910152600101613910565b50939e50959c50939a509198509096505050505050505b91939590929450565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b03163314613bc85760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561351d578181015183820152602001613505565b50565b60048263ffffffff1681548110613bde57fe5b906000526020600020906004020160010160008263ffffffff16815260200190815260200160002060030154600014613c43576040805162461bcd60e51b8152602060048201526002602482015261199960f11b604482015290519081900360640190fd5b600060048363ffffffff1681548110613c5857fe5b6000918252602080832063ffffffff9095168352600160049092029094010190925260409091206005015550565b60048263ffffffff1681548110613c9957fe5b906000526020600020906004020160010160008263ffffffff16815260200190815260200160002060030154600014613cfe576040805162461bcd60e51b8152602060048201526002602482015261199960f11b604482015290519081900360640190fd5b60048263ffffffff1681548110613d1157fe5b906000526020600020906004020160010160008263ffffffff16815260200190815260200160002060050154600014613d76576040805162461bcd60e51b8152602060048201526002602482015261199960f11b604482015290519081900360640190fd5b600060048363ffffffff1681548110613d8b57fe5b6000918252602080832063ffffffff868116855260049384029091016001019091526040808420600601546007548251632576d91360e01b81526001600160a01b038b81169682019690965291909316602482018190528251909650859490931692632576d91392604480840193919291829003018186803b158015613e1057600080fd5b505afa158015613e24573d6000803e3d6000fd5b505050506040513d6040811015613e3a57600080fd5b508051602090910151909250905063ffffffff82166298967f14801590613e66575063ffffffff821615155b613e9c576040805162461bcd60e51b8152602060048201526002602482015261031360f41b604482015290519081900360640190fd5b600060048663ffffffff1681548110613eb157fe5b6000918252602080832063ffffffff89811685526004939093020160010190526040822060020154169150613ee68883612dfa565b600754600380549294506001600160a01b039091169250634585c2a1918691899186908110613f1157fe5b906000526020600020906003020160010160008763ffffffff1681526020019081526020016000206001015460038681548110613f4a57fe5b906000526020600020906003020160010160008863ffffffff168152602001908152602001600020600301544260006040518763ffffffff1660e01b8152600401808781526020018663ffffffff16815260200185815260200184815260200183815260200182151581526020019650505050505050600060405180830381600087803b158015613fda57600080fd5b505af1158015613fee573d6000803e3d6000fd5b5050505060006003828154811061400157fe5b906000526020600020906003020160010160008463ffffffff1681526020019081526020016000206001018190555060006003828154811061403f57fe5b906000526020600020906003020160010160008463ffffffff1681526020019081526020016000206003018190555060006003828154811061407d57fe5b906000526020600020906003020160010160008463ffffffff168152602001908152602001600020600601819055506000600382815481106140bb57fe5b906000526020600020906003020160010160008463ffffffff168152602001908152602001600020600501819055505050505050505050565b6005546001600160a01b031633148061411757506000546001600160a01b031633145b8061412c57506008546001600160a01b031633145b806141415750600c546001600160a01b031633145b8061415657506001546001600160a01b031633145b61418c576040805162461bcd60e51b81526020600482015260026024820152610c8d60f21b604482015290519081900360640190fd5b565b600e546040805163c60fe7a360e01b815263ffffffff88166004820152905160009283926001600160a01b039091169163c60fe7a3916024808201928692909190829003018186803b1580156141e357600080fd5b505afa1580156141f7573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405260e081101561422057600080fd5b815160208301805160405192949293830192919084600160201b82111561424657600080fd5b90830190602082018581111561425b57600080fd5b8251600160201b81118282018810171561427457600080fd5b82525081516020918201929091019080838360005b838110156142a1578181015183820152602001614289565b50505050905090810190601f1680156142ce5780820380516001836020036101000a031916815260200191505b5060409081526020820151910151909650945050505060ff8316606314801591506142fd575060ff8216600214155b614333576040805162461bcd60e51b8152602060048201526002602482015261323760f01b604482015290519081900360640190fd5b63ffffffff84166298967f14801590614351575063ffffffff841615155b614387576040805162461bcd60e51b8152602060048201526002602482015261031360f41b604482015290519081900360640190fd5b8663ffffffff168463ffffffff1614156143cd576040805162461bcd60e51b81526020600482015260026024820152610d0d60f21b604482015290519081900360640190fd5b60006143d98b8b6154f3565b50905060008111614416576040805162461bcd60e51b8152602060048201526002602482015261068760f31b604482015290519081900360640190fd5b600087156144dc57600960009054906101000a90046001600160a01b03166001600160a01b031663da8105878d8d858d6040518563ffffffff1660e01b815260040180856001600160a01b031681526020018463ffffffff1681526020018381526020018263ffffffff168152602001945050505050604080518083038186803b1580156144a357600080fd5b505afa1580156144b7573d6000803e3d6000fd5b505050506040513d60408110156144cd57600080fd5b5060200151995081905061456b565b60095460408051632927567160e21b815263ffffffff808a166004830152602482018e90528c16604482015290516001600160a01b039092169163a49d59c491606480820192602092909190829003018186803b15801561453c57600080fd5b505afa158015614550573d6000803e3d6000fd5b505050506040513d602081101561456657600080fd5b505190505b600081116145a5576040805162461bcd60e51b8152602060048201526002602482015261035360f41b604482015290519081900360640190fd5b808210156145df576040805162461bcd60e51b8152602060048201526002602482015261064760f31b604482015290519081900360640190fd5b60006145ed8d878e85615659565b90506145f7615b22565b6040518060e001604052808c63ffffffff1681526020018963ffffffff1681526020018363ffffffff1681526020018d8152602001428152602001600081526020018e63ffffffff16815250905060006146568f838c600060016148ae565b90506298967f811415614695576040805162461bcd60e51b8152602060048201526002602482015261033360f41b604482015290519081900360640190fd5b6146a18f8f868e6157dc565b6146d6576040805162461bcd60e51b81526020600482015260016024820152603360f81b604482015290519081900360640190fd5b6146e28f8e8989615870565b614717576040805162461bcd60e51b81526020600482015260016024820152603360f81b604482015290519081900360640190fd5b7f7d232362dc5e88226c776bb27a3532c4cf94ae453d35d173a3dd7e54d175af078f8f8f8f4260405180866001600160a01b031681526020018563ffffffff1681526020018481526020018363ffffffff1681526020018281526020019550505050505060405180910390a1505050505050505050505050505050565b61479c615b22565b60008060008060008060008a6001600160a01b03166386bb3b638b8b6040518363ffffffff1660e01b8152600401808363ffffffff1681526020018263ffffffff1681526020019250505060e06040518083038186803b1580156147ff57600080fd5b505afa158015614813573d6000803e3d6000fd5b505050506040513d60e081101561482957600080fd5b508051602082015160408301516060840151608085015160a086015160c090960151949c50929a50909850965094509092509050614865615b22565b506040805160e08101825263ffffffff98891681526020810197909752948716948601949094526060850192909252608084015260a083015290911660c0820152949350505050565b60006298967f81806148c08982611d6a565b909250905063ffffffff82166298967f146149e857600060048263ffffffff16815481106148ea57fe5b6000918252602090912060049182020160030154815463ffffffff918216935090841690811061491657fe5b60009182526020909120600491820201600301805463ffffffff198116600163ffffffff9283160182161790915581548b9291851690811061495457fe5b60009182526020808320858452600492830201600190810182526040938490208551815463ffffffff1990811663ffffffff92831617835593870151928201929092559385015160028501805484169183169190911790556060850151600385015560808501519284019290925560a0840151600584015560c0909301516006909201805490931691161790559250614b3c565b604080518082019091526001600160a01b038a81168252600160208301818152600480549283018155600081905293517f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b92850292830180546001600160a01b031916919094161790925590517f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19e909101805463ffffffff191663ffffffff90921691909117905580548991906000198101908110614aa357fe5b600091825260208083208380526004928302016001908101825260408085208651815463ffffffff1990811663ffffffff92831617835594880151938201939093559086015160028201805485169184169190911790556060860151600382015560808601518185015560a0860151600582015560c0909501516006909501805490921694169390931790925590549093506000190190505b8660048263ffffffff1681548110614b5057fe5b60009182526020808320878452600492909202909101600201905260409020805460ff19169115159190911790558615614c0f578415614bd757614b9c88600001518960200151611ea3565b60048263ffffffff1681548110614baf57fe5b6000918252602080832087845260026004909302019190910190526040902060010155614c0f565b8560048263ffffffff1681548110614beb57fe5b60009182526020808320878452600260049093020191909101905260409020600101555b5090979650505050505050565b614c24615b71565b60008060008060008060008a6001600160a01b03166355cf38e28b8b6040518363ffffffff1660e01b8152600401808363ffffffff1681526020018263ffffffff1681526020019250505060e06040518083038186803b158015614c8757600080fd5b505afa158015614c9b573d6000803e3d6000fd5b505050506040513d60e0811015614cb157600080fd5b508051602082015160408301516060840151608085015160a086015160c090960151949c50929a50909850965094509092509050614ced615b71565b506040805160e08101825263ffffffff90981688526020880196909652948601939093526060850191909152608084015260a0830152151560c082015290509392505050565b6000806298967f90506060876040015167ffffffffffffffff81118015614d5957600080fd5b50604051908082528060200260200182016040528015614d83578160200160208202803683370190505b50905084614e825760005b8860400151811015614e7c576007546040805163fbe41fdb60e01b815263ffffffff808c1660048301528a1660248201526044810184905290516001600160a01b039092169163fbe41fdb91606480820192602092909190829003018186803b158015614dfa57600080fd5b505afa925050508015614e1f57506040513d6020811015614e1a57600080fd5b505160015b614e5a5760405162461bcd60e51b8152600401808060200182810382526023815260200180615bb76023913960400191505060405180910390fd5b80838381518110614e6757fe5b60200260200101818152505050600101614d8e565b50614f48565b60005b8860400151811015614f46576000856001600160a01b031663edb6c5278a8a856040518463ffffffff1660e01b8152600401808463ffffffff1681526020018363ffffffff168152602001828152602001935050505060206040518083038186803b158015614ef357600080fd5b505afa158015614f07573d6000803e3d6000fd5b505050506040513d6020811015614f1d57600080fd5b505183519091508190849084908110614f3257fe5b602090810291909101015250600101614e85565b505b600080614f568b6000612dfa565b909250905063ffffffff82166298967f146150f157600060038281548110614f7a57fe5b906000526020600020906003020160020160009054906101000a900463ffffffff16905060038281548110614fab57fe5b60009182526020909120600391820201600201805463ffffffff198116600163ffffffff9283160190911617905580548c919084908110614fe857fe5b6000918252602080832063ffffffff868116855260039384029091016001908101835260408086208751815463ffffffff1916941693909317835592860151908201559084015191810191909155606083015160048201556080830151600582015560a0830151600682015560c0909201516007909201805460ff1916921515929092179091555b8b604001518163ffffffff1610156150e957848163ffffffff168151811061509457fe5b6020026020010151600384815481106150a957fe5b6000918252602080832063ffffffff8781168552600393909302016001908101825260408085209387168552600290930190915291209190915501615070565b5093506152b1565b604080518082019091526001600160a01b038c81168252600160208301818152600380549283018155600081905293517fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b92850292830180546001600160a01b031916919094161790925590517fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85d909101805463ffffffff191663ffffffff90921691909117905580548b919060001981019081106151ac57fe5b600091825260208083208380526003928302016001908101825260408085208651815463ffffffff191663ffffffff909116178155928601519183019190915584015191810191909155606083015160048201556080830151600582015560a0830151600682015560c0909201516007909201805460ff1916921515929092179091555b8a604001518163ffffffff1610156152ab57838163ffffffff168151811061525457fe5b602002602001015160036001600380549050038154811061527157fe5b60009182526020808320838052600160039093020182018152604080842063ffffffff871685526002019091529091209190915501615230565b50600093505b50919998505050505050505050565b60006152d2848463ffffffff16611d6a565b9150508160048263ffffffff16815481106152e957fe5b906000526020600020906004020160010160008563ffffffff16815260200190815260200160002060030154101561534d576040805162461bcd60e51b8152602060048201526002602482015261333160f01b604482015290519081900360640190fd5b6153578184611e17565b60048263ffffffff168154811061536a57fe5b906000526020600020906004020160010160008563ffffffff168152602001908152602001600020600501819055508160048263ffffffff16815481106153ad57fe5b906000526020600020906004020160010160008563ffffffff168152602001908152602001600020600301600082825403925050819055504260048263ffffffff168154811061290757fe5b6000828211156040518060400160405280600681526020016518181c18181960d11b8152509061546a5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561351d578181015183820152602001613505565b5050900390565b60008082116040518060400160405280600681526020016530303830303360d01b815250906154e15760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561351d578181015183820152602001613505565b508183816154eb57fe5b049392505050565b60075460408051632576d91360e01b81526001600160a01b03858116600483015263ffffffff85166024830152825160009485948594859490921692632576d913926044808201939291829003018186803b15801561555157600080fd5b505afa158015615565573d6000803e3d6000fd5b505050506040513d604081101561557b57600080fd5b508051602090910151909250905063ffffffff82166298967f14806155a4575063ffffffff8216155b156155b7576000809350935050506119db565b60075460408051633e03a0d560e11b81526004810184905263ffffffff88166024820152905160009283926001600160a01b0390911691637c0741aa9160448082019260e092909190829003018186803b15801561561457600080fd5b505afa158015615628573d6000803e3d6000fd5b505050506040513d60e081101561563e57600080fd5b50602081015160409091015190999098509650505050505050565b60075460408051633e03a0d560e11b815263ffffffff80871660048301528516602482015290516000928392839283928392839283926001600160a01b031691637c0741aa9160448083019260e0929190829003018186803b1580156156be57600080fd5b505afa1580156156d2573d6000803e3d6000fd5b505050506040513d60e08110156156e857600080fd5b50805160408201516060830151608084015160a085015160c090950151939a5091985096509450909250905061571c615b71565b6040518060e001604052808863ffffffff1681526020018a81526020018781526020018681526020018581526020018481526020018315158152509050600061576a8d838e8e600080614d33565b905063ffffffff81166298967f14156157ca576040805162461bcd60e51b815260206004820152601760248201527f63616e6f742063726561746520636f6c6c61746572616c000000000000000000604482015290519081900360640190fd5b9750505050505050505b949350505050565b60075460408051630c34e02760e41b81526001600160a01b03878116600483015263ffffffff871660248301526044820186905284151560648301529151600093929092169163c34e027091608480820192869290919082900301818387803b15801561584857600080fd5b505af1925050508015615859575060015b615865575060006157d4565b506001949350505050565b600060ff831660011480615887575060ff83166003145b15615a5657600654604080516370a0823160e01b81526001600160a01b03928316600482015290518492600092908416916370a0823191602480820192602092909190829003018186803b1580156158de57600080fd5b505afa1580156158f2573d6000803e3d6000fd5b505050506040513d602081101561590857600080fd5b5051905085811015615945576040805162461bcd60e51b81526020600482015260016024820152603360f81b604482015290519081900360640190fd5b60408051600080825260208201909252606091509050600760009054906101000a90046001600160a01b03166001600160a01b031663663349f38987898b866040518663ffffffff1660e01b815260040180866001600160a01b03168152602001856001600160a01b031681526020018460ff16815260200183815260200180602001828103825283818151815260200191508051906020019060200280838360005b83811015615a005781810151838201526020016159e8565b505050509050019650505050505050600060405180830381600087803b158015615a2957600080fd5b505af1925050508015615a3a575060015b615a4a57600093505050506157d4565b600193505050506157d4565b60ff8316600414156157d4576006546001600160a01b031631841115615aa8576040805162461bcd60e51b8152602060048201526002602482015261313360f01b604482015290519081900360640190fd5b60075460408051630791e7ad60e31b81526001600160a01b0388811660048301526024820188905291519190921691633c8f3d6891604480830192600092919082900301818387803b158015615afd57600080fd5b505af1925050508015615b0e575060015b615b1a575060006157d4565b5060016157d4565b6040518060e00160405280600063ffffffff16815260200160008152602001600063ffffffff168152602001600081526020016000815260200160008152602001600063ffffffff1681525090565b6040518060e00160405280600063ffffffff1681526020016000815260200160008152602001600081526020016000815260200160008152602001600015158152509056fe76696577437573746f6d65724465706f736974546f6b656e4279496e64657820657272a26469706673582212208b658e7d746525c65b259cde79130e90328736685af728edb8d996d0eb9e959564736f6c634300060c0033";


const credit_profiles_register_bytecode = "0x608060405234801561001057600080fd5b50600080546001600160a01b031916331790556118bb806100326000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80638da5cb5b116100715780638da5cb5b1461038e5780639b2263bc146103b2578063b70daf19146103d8578063c60fe7a314610477578063f2fde38b14610494578063f3fe3bc3146104ba576100b4565b80630ae41c6d146100b95780631054d7931461018a5780633b56cd011461022b5780633c267902146102d457806381e12bc4146102f7578063860d248a14610311575b600080fd5b6100d6600480360360208110156100cf57600080fd5b50356104c2565b604051808863ffffffff168152602001806020018760ff168152602001866001600160a01b03168152602001858152602001848152602001838152602001828103825288818151815260200191508051906020019080838360005b83811015610149578181015183820152602001610131565b50505050905090810190601f1680156101765780820380516001836020036101000a031916815260200191505b509850505050505050505060405180910390f35b610229600480360360e08110156101a057600080fd5b63ffffffff8235169190810190604081016020820135600160201b8111156101c757600080fd5b8201836020820111156101d957600080fd5b803590602001918460018302840111600160201b831117156101fa57600080fd5b919350915060ff813516906001600160a01b0360208201351690604081013590606081013590608001356105af565b005b610229600480360361010081101561024257600080fd5b63ffffffff8235811692602081013590911691810190606081016040820135600160201b81111561027257600080fd5b82018360208201111561028457600080fd5b803590602001918460018302840111600160201b831117156102a557600080fd5b919350915060ff813516906001600160a01b0360208201351690604081013590606081013590608001356107cd565b610229600480360360208110156102ea57600080fd5b503563ffffffff166109bd565b6102ff610a9b565b60408051918252519081900360200190f35b610319610aa1565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561035357818101518382015260200161033b565b50505050905090810190601f1680156103805780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610396610ac3565b604080516001600160a01b039092168252519081900360200190f35b610229600480360360208110156103c857600080fd5b50356001600160a01b0316610ad2565b610229600480360360e08110156103ee57600080fd5b63ffffffff8235169190810190604081016020820135600160201b81111561041557600080fd5b82018360208201111561042757600080fd5b803590602001918460018302840111600160201b8311171561044857600080fd5b919350915060ff813516906001600160a01b036020820135169060408101359060608101359060800135610e95565b6100d66004803603602081101561048d57600080fd5b50356110ca565b610229600480360360208110156104aa57600080fd5b50356001600160a01b03166112eb565b610319611431565b600181815481106104cf57fe5b600091825260209182902060069091020180546001808301805460408051601f600260001996851615610100029690960190931694909404918201879004870284018701905280835263ffffffff90931695509293909291908301828280156105795780601f1061054e57610100808354040283529160200191610579565b820191906000526020600020905b81548152906001019060200180831161055c57829003601f168201915b50505050600283015460038401546004850154600590950154939460ff8316946101009093046001600160a01b03169350909187565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b031633146106635760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610628578181015183820152602001610610565b50505050905090810190601f1680156106555780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060005b6001548110156107c1578863ffffffff166001828154811061068557fe5b600091825260209091206006909102015463ffffffff1614156107b9578787600183815481106106b157fe5b906000526020600020906006020160010191906106cf92919061167c565b5085600182815481106106de57fe5b906000526020600020906006020160020160006101000a81548160ff021916908360ff160217905550846001828154811061071557fe5b906000526020600020906006020160020160016101000a8154816001600160a01b0302191690836001600160a01b03160217905550836001828154811061075857fe5b906000526020600020906006020160030181905550826001828154811061077b57fe5b906000526020600020906006020160040181905550816001828154811061079e57fe5b906000526020600020906006020160050181905550506107c3565b600101610667565b505b5050505050505050565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b031633146108445760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610628578181015183820152602001610610565b508760018a63ffffffff168154811061085957fe5b60009182526020909120600690910201805463ffffffff191663ffffffff928316179055600180548992899291908d1690811061089257fe5b906000526020600020906006020160010191906108b092919061167c565b508460018a63ffffffff16815481106108c557fe5b906000526020600020906006020160020160006101000a81548160ff021916908360ff1602179055508360018a63ffffffff168154811061090257fe5b906000526020600020906006020160020160016101000a8154816001600160a01b0302191690836001600160a01b031602179055508260018a63ffffffff168154811061094b57fe5b9060005260206000209060060201600301819055508160018a63ffffffff168154811061097457fe5b9060005260206000209060060201600401819055508060018a63ffffffff168154811061099d57fe5b906000526020600020906006020160050181905550505050505050505050565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b03163314610a345760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610628578181015183820152602001610610565b5060005b60015463ffffffff82161015610a96578163ffffffff1660018263ffffffff1681548110610a6257fe5b600091825260209091206006909102015463ffffffff161415610a8e57610a8881611453565b50610a98565b600101610a38565b505b50565b60015490565b6040518060400160405280600681526020016518189c18181960d11b81525081565b6000546001600160a01b031681565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b03163314610b495760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610628578181015183820152602001610610565b5060008190506000816001600160a01b03166381e12bc46040518163ffffffff1660e01b815260040160206040518083038186803b158015610b8a57600080fd5b505afa158015610b9e573d6000803e3d6000fd5b505050506040513d6020811015610bb457600080fd5b5051905060005b818163ffffffff161015610e8f57600060606000806000806000896001600160a01b0316630ae41c6d896040518263ffffffff1660e01b8152600401808263ffffffff16815260200191505060006040518083038186803b158015610c1f57600080fd5b505afa158015610c33573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405260e0811015610c5c57600080fd5b815160208301805160405192949293830192919084600160201b821115610c8257600080fd5b908301906020820185811115610c9757600080fd5b8251600160201b811182820188101715610cb057600080fd5b82525081516020918201929091019080838360005b83811015610cdd578181015183820152602001610cc5565b50505050905090810190601f168015610d0a5780820380516001836020036101000a031916815260200191505b5060409081526020820151908201516060830151608084015160a090940151979e50959c50909a509850929650919450919250610d4991506116fa9050565b506040805160e08101825263ffffffff898116825260208083018a815260ff8a16948401949094526001600160a01b03881660608401526080830187905260a0830186905260c0830185905260018054808201825560009190915283517fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf66006909202918201805463ffffffff1916919094161783559351805193948594610e19937fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf79092019290910190611749565b50604082015160028201805460608501516001600160a01b031661010002610100600160a81b031960ff90941660ff1990921691909117929092169190911790556080820151600382015560a0820151600482015560c0909101516005909101555050506001959095019450610bbb9350505050565b50505050565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b03163314610f0c5760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610628578181015183820152602001610610565b50610f1685611643565b610f4c576040805162461bcd60e51b8152602060048201526002602482015261062760f31b604482015290519081900360640190fd5b610f546116fa565b6040518060e001604052808a63ffffffff16815260200189898080601f016020809104026020016040519081016040528093929190818152602001838380828437600092018290525093855250505060ff89166020808401919091526001600160a01b0389166040840152606083018890526080830187905260a0909201859052600180548082018255915282517fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf66006909202918201805463ffffffff191663ffffffff9092169190911781558383015180519495508594919361105e937fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf70192910190611749565b50604082015160028201805460608501516001600160a01b031661010002610100600160a81b031960ff90941660ff1990921691909117929092169190911790556080820151600382015560a0820151600482015560c090910151600590910155505050505050505050565b600060608180808080805b6001548110156112b75788600182815481106110ed57fe5b600091825260209091206006909102015463ffffffff1614156112af576001818154811061111757fe5b60009182526020909120600690910201546001805463ffffffff909216918390811061113f57fe5b90600052602060002090600602016001016001838154811061115d57fe5b906000526020600020906006020160020160009054906101000a900460ff166001848154811061118957fe5b906000526020600020906006020160020160019054906101000a90046001600160a01b0316600185815481106111bb57fe5b906000526020600020906006020160030154600186815481106111da57fe5b906000526020600020906006020160040154600187815481106111f957fe5b600091825260209182902060056006909202010154865460408051601f6002600019610100600187161502019094169390930492830185900485028101850190915281815291928891908301828280156112945780601f1061126957610100808354040283529160200191611294565b820191906000526020600020905b81548152906001019060200180831161127757829003601f168201915b505050505095509750975097509750975097509750506112e0565b6001016110d5565b5050604080516020810190915260008082526298967f9750909550606394509250829150819050805b919395979092949650565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b031633146113625760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610628578181015183820152602001610610565b5060408051808201909152600681526518189c18181960d11b60208201526001600160a01b0382166113d55760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610628578181015183820152602001610610565b50600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6040518060400160405280600681526020016530313830303160d01b81525081565b60015463ffffffff82161061146757610a98565b6001546000190163ffffffff821614156114e457600180548061148657fe5b600082815260208120600660001990930192830201805463ffffffff19168155906114b460018301826117b7565b506002810180546001600160a81b0319169055600060038201819055600482018190556005909101559055610a98565b63ffffffff81165b600154600019018110156115db576001816001018154811061150a57fe5b90600052602060002090600602016001828154811061152557fe5b600091825260209091208254600690920201805463ffffffff191663ffffffff90921691909117815560018083018054611576928085019291600260001992821615610100029290920116046117fb565b5060028281018054918301805460ff191660ff9093169290921780835590546001600160a01b03610100918290041602610100600160a81b031990911617905560038083015490820155600480830154908201556005918201549101556001016114ec565b5060018054806115e757fe5b600082815260208120600660001990930192830201805463ffffffff191681559061161560018301826117b7565b506002810180546001600160a81b031916905560006003820181905560048201819055600590910155905550565b600060ff82166001148061165a575060ff82166002145b80611668575060ff82166003145b80611676575060ff82166004145b92915050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106116bd5782800160ff198235161785556116ea565b828001600101855582156116ea579182015b828111156116ea5782358255916020019190600101906116cf565b506116f6929150611870565b5090565b6040518060e00160405280600063ffffffff16815260200160608152602001600060ff16815260200160006001600160a01b031681526020016000815260200160008152602001600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061178a57805160ff19168380011785556116ea565b828001600101855582156116ea579182015b828111156116ea57825182559160200191906001019061179c565b50805460018160011615610100020316600290046000825580601f106117dd5750610a98565b601f016020900490600052602060002090810190610a989190611870565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061183457805485556116ea565b828001600101855582156116ea57600052602060002091601f016020900482015b828111156116ea578254825591600101919060010190611855565b5b808211156116f6576000815560010161187156fea2646970667358221220bcd13c2464a92ef0c85743ecc13feebf4fa55574fd3236f69ae4f719a35f783364736f6c634300060c0033";

const famer_token_bytecode = "0x6080604052600d80546001600160a01b0319908116909155600e805490911690553480156200002d57600080fd5b5060405162002f3338038062002f33833981810160405260408110156200005357600080fd5b81019080805160405193929190846401000000008211156200007457600080fd5b9083019060208201858111156200008a57600080fd5b8251640100000000811182820188101715620000a557600080fd5b82525081516020918201929091019080838360005b83811015620000d4578181015183820152602001620000ba565b50505050905090810190601f168015620001025780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200012657600080fd5b9083019060208201858111156200013c57600080fd5b82516401000000008111828201881017156200015757600080fd5b82525081516020918201929091019080838360005b83811015620001865781810151838201526020016200016c565b50505050905090810190601f168015620001b45780820380516001836020036101000a031916815260200191505b506040525050600060208181527f67be87c3ff9960ca1e9cfac5cab2ff4747269cf9ed20c9b7306235ac35a491c5805460ff1990811660019081179092557ff7815fccbf112960a73756e185887fedcb9fc64ca0a16cc5923b7960ed78080080548216831790557f77b7bbe0e49b76487c9476b5db3354cf5270619d0037ccb899c2a4c4a75b43188054821683179055635b5e139f60e01b9093527f9562381dfbc2d8b8b66e765249f330164b73e329e5f01670660643571d1974df805490931617909155600c80546001600160a01b0319163317905583516200029f9250600991850190620002e0565b508051620002b590600a906020840190620002e0565b5050600c54600d80546001600160a01b0319166001600160a01b03909216919091179055506200037c565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200032357805160ff191683800117855562000353565b8280016001018555821562000353579182015b828111156200035357825182559160200191906001019062000336565b506200036192915062000365565b5090565b5b8082111562000361576000815560010162000366565b612ba7806200038c6000396000f3fe608060405234801561001057600080fd5b50600436106101e55760003560e01c806370a082311161010f578063b88d4fde116100a2578063e985e9c511610071578063e985e9c514610783578063f2fde38b146107b1578063f3fe3bc3146107d7578063f3fef3a3146107df576101e5565b8063b88d4fde14610649578063c87b56dd146106d9578063d3fc9864146106f6578063dbf4ab4e1461077b576101e5565b80638b0f90e7116100de5780638b0f90e7146106035780638da5cb5b1461060b57806395d89b4114610613578063a22cb4651461061b576101e5565b806370a08231146105895780637bad2b15146105af5780638124bdd2146105d5578063860d248a146105fb576101e5565b80633caa10dc116101875780634f6ccce7116101565780634f6ccce7146104d05780635de0b90a146104ed5780636352211e146105645780636f9fb98a14610581576101e5565b80633caa10dc1461039d5780633fb9337b1461040d57806342842e0e1461047d57806342966c68146104b3576101e5565b8063095ea7b3116101c3578063095ea7b3146102f357806318160ddd1461032157806323b872dd1461033b5780632f745c5914610371576101e5565b806301ffc9a7146101ea57806306fdde031461023d578063081812fc146102ba575b600080fd5b6102296004803603602081101561020057600080fd5b50357fffffffff000000000000000000000000000000000000000000000000000000001661080b565b604080519115158252519081900360200190f35b610245610842565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561027f578181015183820152602001610267565b50505050905090810190601f1680156102ac5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102d7600480360360208110156102d057600080fd5b50356108d8565b604080516001600160a01b039092168252519081900360200190f35b61031f6004803603604081101561030957600080fd5b506001600160a01b0381351690602001356109d3565b005b610329610c5c565b60408051918252519081900360200190f35b61031f6004803603606081101561035157600080fd5b506001600160a01b03813581169160208101359091169060400135610c62565b6103296004803603604081101561038757600080fd5b506001600160a01b038135169060200135610f31565b61031f600480360360208110156103b357600080fd5b8101906020810181356401000000008111156103ce57600080fd5b8201836020820111156103e057600080fd5b8035906020019184600183028401116401000000008311171561040257600080fd5b509092509050611007565b61031f6004803603602081101561042357600080fd5b81019060208101813564010000000081111561043e57600080fd5b82018360208201111561045057600080fd5b8035906020019184600183028401116401000000008311171561047257600080fd5b5090925090506110a7565b61031f6004803603606081101561049357600080fd5b506001600160a01b03813581169160208101359091169060400135611142565b61031f600480360360208110156104c957600080fd5b503561115d565b610329600480360360208110156104e657600080fd5b50356111d6565b61031f6004803603604081101561050357600080fd5b8135919081019060408101602082013564010000000081111561052557600080fd5b82018360208201111561053757600080fd5b8035906020019184600183028401116401000000008311171561055957600080fd5b50909250905061127d565b6102d76004803603602081101561057a57600080fd5b503561132a565b6103296113c7565b6103296004803603602081101561059f57600080fd5b50356001600160a01b03166113cb565b61031f600480360360208110156105c557600080fd5b50356001600160a01b0316611467565b61031f600480360360208110156105eb57600080fd5b50356001600160a01b0316611530565b6102456115f9565b6102d7611632565b6102d7611641565b610245611650565b61031f6004803603604081101561063157600080fd5b506001600160a01b03813516906020013515156116b1565b61031f6004803603608081101561065f57600080fd5b6001600160a01b0382358116926020810135909116916040820135919081019060808101606082013564010000000081111561069a57600080fd5b8201836020820111156106ac57600080fd5b803590602001918460018302840111640100000000831117156106ce57600080fd5b50909250905061173d565b610245600480360360208110156106ef57600080fd5b5035611786565b61031f6004803603606081101561070c57600080fd5b6001600160a01b038235169160208101359181019060608101604082013564010000000081111561073c57600080fd5b82018360208201111561074e57600080fd5b8035906020019184600183028401116401000000008311171561077057600080fd5b5090925090506118c7565b6102d7611984565b6102296004803603604081101561079957600080fd5b506001600160a01b0381358116916020013516611993565b61031f600480360360208110156107c757600080fd5b50356001600160a01b03166119c1565b610245611b4e565b61031f600480360360408110156107f557600080fd5b506001600160a01b038135169060200135611b87565b7fffffffff000000000000000000000000000000000000000000000000000000001660009081526020819052604090205460ff1690565b60098054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156108ce5780601f106108a3576101008083540402835291602001916108ce565b820191906000526020600020905b8154815290600101906020018083116108b157829003601f168201915b5050505050905090565b6000818152600160209081526040808320548151808301909252600682527f30303330303200000000000000000000000000000000000000000000000000009282019290925283916001600160a01b03166109b15760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561097657818101518382015260200161095e565b50505050905090810190601f1680156109a35780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b506000838152600260205260409020546001600160a01b031691505b50919050565b60008181526001602052604090205481906001600160a01b031633811480610a1e57506001600160a01b038116600090815260046020908152604080832033845290915290205460ff165b6040518060400160405280600681526020017f303033303033000000000000000000000000000000000000000000000000000081525090610aa05760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b50600083815260016020908152604091829020548251808401909352600683527f3030333030320000000000000000000000000000000000000000000000000000918301919091528491906001600160a01b0316610b3f5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b50600084815260016020908152604091829020548251808401909352600683527f3030333030380000000000000000000000000000000000000000000000000000918301919091526001600160a01b0390811691908716821415610be45760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b5060008581526002602052604080822080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b038a811691821790925591518893918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050505050565b60055490565b60008181526001602052604090205481906001600160a01b031633811480610ca057506000828152600260205260409020546001600160a01b031633145b80610cce57506001600160a01b038116600090815260046020908152604080832033845290915290205460ff165b6040518060400160405280600681526020017f303033303034000000000000000000000000000000000000000000000000000081525090610d505760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b50600083815260016020908152604091829020548251808401909352600683527f3030333030320000000000000000000000000000000000000000000000000000918301919091528491906001600160a01b0316610def5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b50600084815260016020908152604091829020548251808401909352600683527f3030333030370000000000000000000000000000000000000000000000000000918301919091526001600160a01b03908116919088168214610e935760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b5060408051808201909152600681527f303033303031000000000000000000000000000000000000000000000000000060208201526001600160a01b038716610f1d5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b50610f288686611ca1565b50505050505050565b6001600160a01b0382166000908152600760209081526040808320548151808301909252600682527f303035303037000000000000000000000000000000000000000000000000000092820192909252908310610fcf5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b506001600160a01b0383166000908152600760205260409020805483908110610ff457fe5b9060005260206000200154905092915050565b600c5460408051808201909152600681527f30313830303100000000000000000000000000000000000000000000000000006020820152906001600160a01b031633146110955760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b506110a2600983836129e1565b505050565b600c5460408051808201909152600681527f30313830303100000000000000000000000000000000000000000000000000006020820152906001600160a01b031633146111355760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b506110a2600a83836129e1565b6110a283838360405180602001604052806000815250611d1c565b600d546001600160a01b031633148061118f5750600e546001600160a01b03163314801561118f575061118f336121cd565b6111ca5760405162461bcd60e51b815260040180806020018281038252602d815260200180612b45602d913960400191505060405180910390fd5b6111d3816121d9565b50565b60055460408051808201909152600681527f30303530303700000000000000000000000000000000000000000000000000006020820152600091831061125d5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b506005828154811061126b57fe5b90600052602060002001549050919050565b600d546001600160a01b03163314806112af5750600e546001600160a01b0316331480156112af57506112af336121cd565b6112ea5760405162461bcd60e51b815260040180806020018281038252602d815260200180612b45602d913960400191505060405180910390fd5b6110a28383838080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061222092505050565b600081815260016020908152604091829020548251808401909352600683527f3030333030320000000000000000000000000000000000000000000000000000918301919091526001600160a01b031690816109cd5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b4790565b60408051808201909152600681527f303033303031000000000000000000000000000000000000000000000000000060208201526000906001600160a01b0383166114575760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b50611461826122de565b92915050565b600c5460408051808201909152600681527f30313830303100000000000000000000000000000000000000000000000000006020820152906001600160a01b031633146114f55760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b50600d80547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b600c5460408051808201909152600681527f30313830303100000000000000000000000000000000000000000000000000006020820152906001600160a01b031633146115be5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b50600e80547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b6040518060400160405280600681526020017f303138303032000000000000000000000000000000000000000000000000000081525081565b600e546001600160a01b031690565b600c546001600160a01b031681565b600a8054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156108ce5780601f106108a3576101008083540402835291602001916108ce565b3360008181526004602090815260408083206001600160a01b0387168085529083529281902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016861515908117909155815190815290519293927f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31929181900390910190a35050565b61177f85858585858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611d1c92505050565b5050505050565b600081815260016020908152604091829020548251808401909352600683527f30303330303200000000000000000000000000000000000000000000000000009183019190915260609183916001600160a01b03166118265760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b506000838152600b602090815260409182902080548351601f6002600019610100600186161502019093169290920491820184900484028101840190945280845290918301828280156118ba5780601f1061188f576101008083540402835291602001916118ba565b820191906000526020600020905b81548152906001019060200180831161189d57829003601f168201915b5050505050915050919050565b600d546001600160a01b03163314806118f95750600e546001600160a01b0316331480156118f957506118f9336121cd565b6119345760405162461bcd60e51b815260040180806020018281038252602d815260200180612b45602d913960400191505060405180910390fd5b61193e84846122e9565b61197e8383838080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061222092505050565b50505050565b600d546001600160a01b031690565b6001600160a01b03918216600090815260046020908152604080832093909416825291909152205460ff1690565b600c5460408051808201909152600681527f30313830303100000000000000000000000000000000000000000000000000006020820152906001600160a01b03163314611a4f5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b5060408051808201909152600681527f303138303032000000000000000000000000000000000000000000000000000060208201526001600160a01b038216611ad95760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b50600c546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600c80547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0392909216919091179055565b6040518060400160405280600681526020017f303138303031000000000000000000000000000000000000000000000000000081525081565b600c5460408051808201909152600681527f30313830303100000000000000000000000000000000000000000000000000006020820152906001600160a01b03163314611c155760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b5080471015611c6b576040805162461bcd60e51b815260206004820152601260248201527f756e73756666696369656e742066756e64730000000000000000000000000000604482015290519081900360640190fd5b6040516001600160a01b0383169082156108fc029083906000818181858888f193505050501580156110a2573d6000803e3d6000fd5b6000818152600160205260409020546001600160a01b0316611cc28261233d565b611ccc8183612390565b611cd6838361239e565b81836001600160a01b0316826001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b60008281526001602052604090205482906001600160a01b031633811480611d5a57506000828152600260205260409020546001600160a01b031633145b80611d8857506001600160a01b038116600090815260046020908152604080832033845290915290205460ff165b6040518060400160405280600681526020017f303033303034000000000000000000000000000000000000000000000000000081525090611e0a5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b50600084815260016020908152604091829020548251808401909352600683527f3030333030320000000000000000000000000000000000000000000000000000918301919091528591906001600160a01b0316611ea95760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b50600085815260016020908152604091829020548251808401909352600683527f3030333030370000000000000000000000000000000000000000000000000000918301919091526001600160a01b03908116919089168214611f4d5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b5060408051808201909152600681527f303033303031000000000000000000000000000000000000000000000000000060208201526001600160a01b038816611fd75760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b50611fe28787611ca1565b611ff4876001600160a01b03166123a8565b156121c3576000876001600160a01b031663150b7a02338b8a8a6040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b0316815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561207e578181015183820152602001612066565b50505050905090810190601f1680156120ab5780820380516001836020036101000a031916815260200191505b5095505050505050602060405180830381600087803b1580156120cd57600080fd5b505af11580156120e1573d6000803e3d6000fd5b505050506040513d60208110156120f757600080fd5b505160408051808201909152600681527f303033303035000000000000000000000000000000000000000000000000000060208201529091507fffffffff0000000000000000000000000000000000000000000000000000000082167f150b7a0200000000000000000000000000000000000000000000000000000000146121c05760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b50505b5050505050505050565b3b63ffffffff16151590565b6121e2816123e4565b6000818152600b602052604090205460026000196101006001841615020190911604156111d3576000818152600b602052604081206111d391612a7d565b600082815260016020908152604091829020548251808401909352600683527f3030333030320000000000000000000000000000000000000000000000000000918301919091528391906001600160a01b03166122be5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b506000838152600b60209081526040909120835161197e92850190612ac1565b60006114618261247c565b6122f38282612497565b600580546001810182557f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00182905554600091825260066020526040909120600019909101905550565b6000818152600260205260409020546001600160a01b0316156111d357600090815260026020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b61239a8282612604565b5050565b61239a82826127c3565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a47081158015906123dc5750808214155b949350505050565b6123ed816128da565b6000818152600660205260408120546005805491926000198301929091908390811061241557fe5b90600052602060002001549050806005848154811061243057fe5b600091825260209091200155600580548061244757fe5b600082815260208082208301600019908101839055909201909255918152600690915260408082209390935592835250812055565b6001600160a01b031660009081526007602052604090205490565b60408051808201909152600681527f303033303031000000000000000000000000000000000000000000000000000060208201526001600160a01b0383166125205760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b50600081815260016020908152604091829020548251808401909352600683527f3030333030360000000000000000000000000000000000000000000000000000918301919091526001600160a01b0316156125bd5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b506125c8828261239e565b60405181906001600160a01b038416906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b600081815260016020908152604091829020548251808401909352600683527f3030333030370000000000000000000000000000000000000000000000000000918301919091526001600160a01b038481169116146126a45760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b50600081815260016020908152604080832080547fffffffffffffffffffffffff000000000000000000000000000000000000000016905560088252808320546001600160a01b038616845260079092529091205460001901808214612786576001600160a01b038416600090815260076020526040812080548390811061272857fe5b906000526020600020015490508060076000876001600160a01b03166001600160a01b03168152602001908152602001600020848154811061276657fe5b600091825260208083209091019290925591825260089052604090208290555b6001600160a01b03841660009081526007602052604090208054806127a757fe5b6001900381819060005260206000200160009055905550505050565b600081815260016020908152604091829020548251808401909352600683527f3030333030360000000000000000000000000000000000000000000000000000918301919091526001600160a01b03161561285f5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b50600081815260016020818152604080842080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b039790971696871790559483526007815284832080549283018155808452818420909201849055905492825260089052919091206000199091019055565b600081815260016020908152604091829020548251808401909352600683527f3030333030320000000000000000000000000000000000000000000000000000918301919091528291906001600160a01b03166129785760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561097657818101518382015260200161095e565b506000828152600160205260409020546001600160a01b031661299a8361233d565b6129a48184612390565b60405183906000906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a4505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10612a40578280017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00823516178555612a6d565b82800160010185558215612a6d579182015b82811115612a6d578235825591602001919060010190612a52565b50612a79929150612b2f565b5090565b50805460018160011615610100020316600290046000825580601f10612aa357506111d3565b601f0160209004906000526020600020908101906111d39190612b2f565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10612b0257805160ff1916838001178555612a6d565b82800160010185558215612a6d579182015b82811115612a6d578251825591602001919060010190612b14565b5b80821115612a795760008155600101612b3056fe6f6e6c792062616e6b206f72207075626c69736865722063616e2063616c6c20746869732066756e6374696f6ea26469706673582212208a4eb2b899c5f0989f50cbbbd5623f9811687e8827e853171f42041a7f028a9564736f6c634300060c0033";



const staking_contract_bytecode = "0x608060405261012c600355600680546001600160a01b031990811690915560078054821690556009805482169055600b805482169055600c805482169055600d80549091169055600e805460ff60a01b1916600160a01b17905534801561006557600080fd5b50600080546001600160a01b0319908116331780835560018054831630178155600255600680549092166001600160a01b03909116179055615bde908190620000ae90396000f3fe6080604052600436106102805760003560e01c80637c0741aa1161014f578063a95f2c9d116100c1578063cd1839ca1161007a578063cd1839ca14610d20578063d500958414610d76578063ef9771c014610d8b578063f2fde38b14610da0578063f3fe3bc314610dd3578063fbe41fdb14610de8576102c1565b8063a95f2c9d14610c2e578063b574e69d14610c61578063bae0b81514610c94578063be9a655514610ca9578063c34e027014610cbe578063c4dbdcbf14610d0b576102c1565b806388679fdd1161011357806388679fdd14610b0e5780638a020c3814610b415780638aee812714610b805780638da5cb5b14610bb35780639377b9b014610bc85780639b4acf1614610bfb576102c1565b80637c0741aa1461096057806382d726f9146109d75780638456cb59146109ec578063860d248a14610a0157806387ae54b614610a8b576102c1565b80633de162b4116101f357806361b50f72116101ac57806361b50f72146107d3578063663349f31461080357806366afa893146108d957806368894acf146108ee57806369940d79146109185780636e540d221461092d576102c1565b80633de162b41461068a5780633f8ac26a146106bd5780633fcdfcf1146106d2578063452de5251461071f5780634585c2a1146107525780634d5235d8146107a2576102c1565b8063169ea5af11610245578063169ea5af146104405780631fd2238e1461047957806322f3e2d41461058a5780632576d913146105b35780632c7da21b146106125780633c8f3d6814610651576102c1565b8062703ef0146102c6578063043004be1461030e57806307223d64146103235780630b775fd514610353578063150b7a0214610388576102c1565b366102c1576040805133815234602082015281517f88a5966d370b9919b20f3e2c13ff65706f196a4e32cc2c12bf57088f88525874929181900390910190a1005b600080fd5b3480156102d257600080fd5b506102fc600480360360408110156102e957600080fd5b508035906020013563ffffffff16610e24565b60408051918252519081900360200190f35b34801561031a57600080fd5b506102fc610eaf565b34801561032f57600080fd5b506102fc6004803603602081101561034657600080fd5b503563ffffffff16610ec0565b34801561035f57600080fd5b506103866004803603602081101561037657600080fd5b50356001600160a01b0316610f95565b005b34801561039457600080fd5b50610423600480360360808110156103ab57600080fd5b6001600160a01b03823581169260208101359091169160408201359190810190608081016060820135600160201b8111156103e557600080fd5b8201836020820111156103f757600080fd5b803590602001918460018302840111600160201b8311171561041857600080fd5b5090925090506111e9565b604080516001600160e01b03199092168252519081900360200190f35b34801561044c57600080fd5b506103866004803603604081101561046357600080fd5b506001600160a01b038135169060200135611287565b34801561048557600080fd5b506104ac6004803603602081101561049c57600080fd5b50356001600160a01b0316611507565b60405180806020018060200180602001848103845287818151815260200191508051906020019060200280838360005b838110156104f45781810151838201526020016104dc565b50505050905001848103835286818151815260200191508051906020019060200280838360005b8381101561053357818101518382015260200161051b565b50505050905001848103825285818151815260200191508051906020019060200280838360005b8381101561057257818101518382015260200161055a565b50505050905001965050505050505060405180910390f35b34801561059657600080fd5b5061059f6117ea565b604080519115158252519081900360200190f35b3480156105bf57600080fd5b506105f2600480360360408110156105d657600080fd5b5080356001600160a01b0316906020013563ffffffff166117fa565b6040805163ffffffff909316835260208301919091528051918290030190f35b34801561061e57600080fd5b506103866004803603604081101561063557600080fd5b5080356001600160a01b0316906020013563ffffffff16611899565b34801561065d57600080fd5b506103866004803603604081101561067457600080fd5b506001600160a01b03813516906020013561202a565b34801561069657600080fd5b50610386600480360360208110156106ad57600080fd5b50356001600160a01b031661214d565b3480156106c957600080fd5b506102fc612184565b3480156106de57600080fd5b506106fc600480360360208110156106f557600080fd5b503561218a565b604080516001600160a01b03909316835260208301919091528051918290030190f35b34801561072b57600080fd5b506103866004803603602081101561074257600080fd5b50356001600160a01b03166121e8565b34801561075e57600080fd5b50610386600480360360c081101561077557600080fd5b5080359063ffffffff6020820135169060408101359060608101359060808101359060a001351515612212565b3480156107ae57600080fd5b506107b7612322565b604080516001600160a01b039092168252519081900360200190f35b3480156107df57600080fd5b506102fc600480360360208110156107f657600080fd5b503563ffffffff16612331565b34801561080f57600080fd5b50610386600480360360a081101561082657600080fd5b6001600160a01b03823581169260208101359091169160ff6040830135169160608101359181019060a081016080820135600160201b81111561086857600080fd5b82018360208201111561087a57600080fd5b803590602001918460208302840111600160201b8311171561089b57600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295506123ff945050505050565b3480156108e557600080fd5b506107b76127ef565b3480156108fa57600080fd5b506103866004803603602081101561091157600080fd5b50356127fe565b34801561092457600080fd5b506107b761280b565b34801561093957600080fd5b506103866004803603602081101561095057600080fd5b50356001600160a01b031661281a565b34801561096c57600080fd5b506109966004803603604081101561098357600080fd5b508035906020013563ffffffff16612851565b6040805163ffffffff90981688526020880196909652868601949094526060860192909252608085015260a0840152151560c0830152519081900360e00190f35b3480156109e357600080fd5b506107b7612a22565b3480156109f857600080fd5b50610386612a31565b348015610a0d57600080fd5b50610a16612a48565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610a50578181015183820152602001610a38565b50505050905090810190601f168015610a7d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61038660048036036080811015610aa157600080fd5b81359190810190604081016020820135600160201b811115610ac257600080fd5b820183602082011115610ad457600080fd5b803590602001918460208302840111600160201b83111715610af557600080fd5b919350915063ffffffff81358116916020013516612a6a565b348015610b1a57600080fd5b5061038660048036036020811015610b3157600080fd5b50356001600160a01b03166135ed565b348015610b4d57600080fd5b506102fc60048036036040811015610b6457600080fd5b5080356001600160a01b0316906020013563ffffffff16613624565b348015610b8c57600080fd5b5061038660048036036020811015610ba357600080fd5b50356001600160a01b03166136de565b348015610bbf57600080fd5b506107b7613708565b348015610bd457600080fd5b5061038660048036036020811015610beb57600080fd5b50356001600160a01b0316613717565b348015610c0757600080fd5b5061038660048036036020811015610c1e57600080fd5b50356001600160a01b0316613a6f565b348015610c3a57600080fd5b5061038660048036036020811015610c5157600080fd5b50356001600160a01b0316613a99565b348015610c6d57600080fd5b506104ac60048036036020811015610c8457600080fd5b50356001600160a01b0316613ac3565b348015610ca057600080fd5b506107b7613db9565b348015610cb557600080fd5b50610386613dc8565b348015610cca57600080fd5b5061038660048036036080811015610ce157600080fd5b506001600160a01b038135169063ffffffff60208201351690604081013590606001351515613de5565b348015610d1757600080fd5b506107b7614b78565b348015610d2c57600080fd5b50610d5060048036036020811015610d4357600080fd5b503563ffffffff16614b87565b604080519485526020850193909352838301919091526060830152519081900360800190f35b348015610d8257600080fd5b506107b7614cd7565b348015610d9757600080fd5b506107b7614ce6565b348015610dac57600080fd5b5061038660048036036020811015610dc357600080fd5b50356001600160a01b0316614cf5565b348015610ddf57600080fd5b50610a16614e08565b348015610df457600080fd5b506102fc60048036036060811015610e0b57600080fd5b5080359063ffffffff6020820135169060400135614e2a565b600a5460408051620703ef60e41b81526004810185905263ffffffff8416602482015290516000926001600160a01b03169162703ef0916044808301926020929190829003018186803b158015610e7a57600080fd5b505afa158015610e8e573d6000803e3d6000fd5b505050506040513d6020811015610ea457600080fd5b505190505b92915050565b6000610eb9614e74565b5060055490565b600080805b600554811015610f8e5760005b60058281548110610edf57fe5b9060005260206000209060030201600201548163ffffffff161015610f85578463ffffffff1660058381548110610f1257fe5b6000918252602080832063ffffffff8681168552600393909302016001019052604090912054161415610f7d5760058281548110610f4c57fe5b906000526020600020906003020160010160008263ffffffff16815260200190815260200160002060010154830192505b600101610ed2565b50600101610ec5565b5092915050565b610f9d614ef9565b60008190506000816001600160a01b031663043004be6040518163ffffffff1660e01b815260040160206040518083038186803b158015610fdd57600080fd5b505afa158015610ff1573d6000803e3d6000fd5b505050506040513d602081101561100757600080fd5b5051905060005b818110156111e357600080846001600160a01b0316633fcdfcf1846040518263ffffffff1660e01b815260040180828152602001915050604080518083038186803b15801561105c57600080fd5b505afa158015611070573d6000803e3d6000fd5b505050506040513d604081101561108657600080fd5b508051602090910151909250905060005b818163ffffffff1610156111d8576110ad615b63565b6110b8878684614f73565b90506060816040015167ffffffffffffffff811180156110d757600080fd5b50604051908082528060200260200182016040528015611101578160200160208202803683370190505b50905060005b82604001518110156111c2576000896001600160a01b031663fbe41fdb8987856040518463ffffffff1660e01b8152600401808481526020018363ffffffff168152602001828152602001935050505060206040518083038186803b15801561116f57600080fd5b505afa158015611183573d6000803e3d6000fd5b505050506040513d602081101561119957600080fd5b5051835190915081908490849081106111ae57fe5b602090810291909101015250600101611107565b506111ce858383615084565b5050600101611097565b50505060010161100e565b50505050565b60007fa05d90f300156ad1b545bc5d8197024456f21d22a708f5af04dd293e3d605251868686868660405180866001600160a01b03168152602001856001600160a01b03168152602001848152602001806020018281038252848482818152602001925080828437600083820152604051601f909101601f19169092018290039850909650505050505050a150630a85bd0160e11b95945050505050565b61128f614e74565b60008290506000816001600160a01b031663043004be6040518163ffffffff1660e01b815260040160206040518083038186803b1580156112cf57600080fd5b505afa1580156112e3573d6000803e3d6000fd5b505050506040513d60208110156112f957600080fd5b50519050828111611337576040805162461bcd60e51b815260206004820152600360248201526218d91b60ea1b604482015290519081900360640190fd5b60408051633fcdfcf160e01b8152600481018590528151859260009283926001600160a01b03881692633fcdfcf19260248082019391829003018186803b15801561138157600080fd5b505afa158015611395573d6000803e3d6000fd5b505050506040513d60408110156113ab57600080fd5b508051602090910151909250905060005b818163ffffffff1610156114fd576113d2615b63565b6113dd878684614f73565b90506060816040015167ffffffffffffffff811180156113fc57600080fd5b50604051908082528060200260200182016040528015611426578160200160208202803683370190505b50905060005b82604001518110156114e7576000896001600160a01b031663fbe41fdb8987856040518463ffffffff1660e01b8152600401808481526020018363ffffffff168152602001828152602001935050505060206040518083038186803b15801561149457600080fd5b505afa1580156114a8573d6000803e3d6000fd5b505050506040513d60208110156114be57600080fd5b5051835190915081908490849081106114d357fe5b60209081029190910101525060010161142c565b506114f3858383615084565b50506001016113bc565b5050505050505050565b606080806001600160a01b03841633148061152c57506000546001600160a01b031633145b8061154157506001546001600160a01b031633145b611576576040805162461bcd60e51b81526020600482015260016024820152603960f81b604482015290519081900360640190fd5b6000806115848660006117fa565b909250905063ffffffff82166298967f14156115ac5750606093508392508291506117e39050565b6060600582815481106115bb57fe5b90600052602060002090600302016002015467ffffffffffffffff811180156115e357600080fd5b5060405190808252806020026020018201604052801561160d578160200160208202803683370190505b50905060606005838154811061161f57fe5b90600052602060002090600302016002015467ffffffffffffffff8111801561164757600080fd5b50604051908082528060200260200182016040528015611671578160200160208202803683370190505b50905060606005848154811061168357fe5b90600052602060002090600302016002015467ffffffffffffffff811180156116ab57600080fd5b506040519080825280602002602001820160405280156116d5578160200160208202803683370190505b50905060008060005b600587815481106116eb57fe5b9060005260206000209060030201600201548163ffffffff1610156117d4576117148782610e24565b925061172087826155a3565b1561172d57829150611732565b600091505b81858263ffffffff168151811061174557fe5b60200260200101818152505082868263ffffffff168151811061176457fe5b6020026020010181815250506005878154811061177d57fe5b6000918252602080832063ffffffff858116808652600394909402909101600101909152604090922054865192169186919081106117b757fe5b63ffffffff909216602092830291909101909101526001016116de565b50919850929650909450505050505b9193909250565b600e54600160a01b900460ff1690565b60008060005b60055481101561188657846001600160a01b03166005828154811061182157fe5b60009182526020909120600390910201546001600160a01b0316141561187e576005818154811061184e57fe5b6000918252602080832063ffffffff88811685526003939093020160010190526040909120541692509050611892565b600101611800565b506298967f6000915091505b9250929050565b6002805460010190819055600e54600160a01b900460ff166118e7576040805162461bcd60e51b8152602060048201526002602482015261353160f01b604482015290519081900360640190fd5b6001600160a01b03831633148061190857506000546001600160a01b031633145b8061191d57506001546001600160a01b031633145b611952576040805162461bcd60e51b81526020600482015260016024820152603960f81b604482015290519081900360640190fd5b6000806119608560006117fa565b909250905063ffffffff82166298967f14156119a8576040805162461bcd60e51b8152602060048201526002602482015261031360f41b604482015290519081900360640190fd5b6119b281856155a3565b6119e8576040805162461bcd60e51b8152602060048201526002602482015261343960f01b604482015290519081900360640190fd5b60006119f48286610e24565b905080611a0357505050611fea565b600e546005805460009283926001600160a01b039091169163b3c10d20919087908110611a2c57fe5b6000918252602080832063ffffffff8d81168552600393909302016001019052604080832054815160e086901b6001600160e01b0319168152921660048301525160248083019392829003018186803b158015611a8857600080fd5b505afa158015611a9c573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610100811015611ac657600080fd5b815160208301805160405192949293830192919084600160201b821115611aec57600080fd5b908301906020820185811115611b0157600080fd5b8251600160201b811182820188101715611b1a57600080fd5b82525081516020918201929091019080838360005b83811015611b47578181015183820152602001611b2f565b50505050905090810190601f168015611b745780820380516001836020036101000a031916815260200191505b506040908152602082015191015190965094506000935050505060ff831660011415611ba1575080611bd9565b60ff831660031415611bbf57506004546001600160a01b0316611bd9565b60ff831660021415611bd957506004546001600160a01b03165b60ff8316600414611dee57600154604080516370a0823160e01b81526001600160a01b03928316600482015290516000928416916370a08231916024808301926020929190829003018186803b158015611c3257600080fd5b505afa158015611c46573d6000803e3d6000fd5b505050506040513d6020811015611c5c57600080fd5b5051905084811015611c745750505050505050611fea565b816001600160a01b031663a9059cbb8b876040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050602060405180830381600087803b158015611ccb57600080fd5b505af1925050508015611cf057506040513d6020811015611ceb57600080fd5b505160015b611d26576040805162461bcd60e51b8152602060048201526002602482015261313160f01b604482015290519081900360640190fd5b504260058781548110611d3557fe5b906000526020600020906003020160010160008b63ffffffff16815260200190815260200160002060040181905550600060058781548110611d7357fe5b906000526020600020906003020160010160008b63ffffffff16815260200190815260200160002060050181905550600060058781548110611db157fe5b6000918252602080832063ffffffff8e168452600392909202909101600101905260409020600701805460ff191691151591909117905550611f5d565b6001546001600160a01b031631841115611e0d57505050505050611fea565b6040516000906001600160a01b038b169086908381818185875af1925050503d8060008114611e58576040519150601f19603f3d011682016040523d82523d6000602084013e611e5d565b606091505b50508091505080611e9a576040805162461bcd60e51b8152602060048201526002602482015261313560f01b604482015290519081900360640190fd5b4260058781548110611ea857fe5b906000526020600020906003020160010160008b63ffffffff16815260200190815260200160002060040181905550600060058781548110611ee657fe5b906000526020600020906003020160010160008b63ffffffff16815260200190815260200160002060050181905550600060058781548110611f2457fe5b6000918252602080832063ffffffff8e168452600392909202909101600101905260409020600701805460ff1916911515919091179055505b7fbe6d995fb260f4f430fb691bba225d506a99b7631269805e1ce28bbc095cd1b28960058781548110611f8c57fe5b6000918252602080832063ffffffff808f16808652600160039095029092019390930182526040938490205484516001600160a01b039096168652909216908401528282015260608201879052519081900360800190a15050505050505b6002548114612025576040805162461bcd60e51b8152602060048201526002602482015261191960f11b604482015290519081900360640190fd5b505050565b612032614e74565b6001546001600160a01b031631811115612078576040805162461bcd60e51b8152602060048201526002602482015261313360f01b604482015290519081900360640190fd5b6040516000906001600160a01b0384169083908381818185875af1925050503d80600081146120c3576040519150601f19603f3d011682016040523d82523d6000602084013e6120c8565b606091505b50508091505080612105576040805162461bcd60e51b8152602060048201526002602482015261313560f01b604482015290519081900360640190fd5b604080518381526001600160a01b038516602082015281517f8da35ab21134b5cb934e489c146c2a2a7f04074c2199b88ee18aa2c37ab42ee4929181900390910190a1505050565b612155614ef9565b600d80546001600160a01b03199081166001600160a01b039384161791829055600e8054929093169116179055565b60035490565b600080612195614e74565b600583815481106121a257fe5b6000918252602090912060039091020154600580546001600160a01b0390921691859081106121cd57fe5b90600052602060002090600302016002015491509150915091565b6121f0614ef9565b600680546001600160a01b0319166001600160a01b0392909216919091179055565b61221a614e74565b836005878154811061222857fe5b6000918252602080832063ffffffff8a16845260016003909302018201905260409091200180549091019055600580548491908890811061226557fe5b6000918252602080832063ffffffff8a1684526003928302016001019052604090912001805491909101905560058054839190889081106122a257fe5b906000526020600020906003020160010160008763ffffffff1681526020019081526020016000206004018190555080600587815481106122df57fe5b6000918252602080832063ffffffff909916835260016003909202909801019096526040909520600701805495151560ff19909616959095179094555050505050565b600c546001600160a01b031690565b600080805b600554811015610f8e5760005b6005828154811061235057fe5b9060005260206000209060030201600201548163ffffffff1610156123f6578463ffffffff166005838154811061238357fe5b6000918252602080832063ffffffff86811685526003939093020160010190526040909120541614156123ee57600582815481106123bd57fe5b906000526020600020906003020160010160008263ffffffff16815260200190815260200160002060060154830192505b600101612343565b50600101612336565b612407614e74565b60ff83166001148061241c575060ff83166003145b156125e657600154604080516370a0823160e01b81526001600160a01b03928316600482015290518692600092908416916370a0823191602480820192602092909190829003018186803b15801561247357600080fd5b505afa158015612487573d6000803e3d6000fd5b505050506040513d602081101561249d57600080fd5b50519050836124aa578093505b838110156124e3576040805162461bcd60e51b81526020600482015260016024820152603360f81b604482015290519081900360640190fd5b816001600160a01b031663a9059cbb88866040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050602060405180830381600087803b15801561253a57600080fd5b505af192505050801561255f57506040513d602081101561255a57600080fd5b505160015b612594576040805162461bcd60e51b81526020600482015260016024820152603360f81b604482015290519081900360640190fd5b50604080516001600160a01b0380891682526020820187905289168183015290517f93c359d30f09cff7d950b483afdd058c3389c3f66cfc0542d9697277b84c7dfd9181900360600190a150506127e8565b60ff8316600214156127e857600154604080516370a0823160e01b81526001600160a01b03928316600482015290518692600092908416916370a0823191602480820192602092909190829003018186803b15801561264457600080fd5b505afa158015612658573d6000803e3d6000fd5b505050506040513d602081101561266e57600080fd5b50519050806126a8576040805162461bcd60e51b81526020600482015260016024820152603360f81b604482015290519081900360640190fd5b836126b1578093505b60005b8481101561279a57826001600160a01b03166323b872dd600160009054906101000a90046001600160a01b03168a8785815181106126ee57fe5b60200260200101516040518463ffffffff1660e01b815260040180846001600160a01b03168152602001836001600160a01b031681526020018281526020019350505050600060405180830381600087803b15801561274c57600080fd5b505af192505050801561275d575060015b612792576040805162461bcd60e51b81526020600482015260016024820152600760fb1b604482015290519081900360640190fd5b6001016126b4565b50604080516001600160a01b0380891682526020820184905289168183015290517f34a8ac18d7ded15a3511dc88ddbc5f631208bd4e9657c2a2ffd9601cd2eab2ac9181900360600190a150505b5050505050565b6007546001600160a01b031690565b612806614ef9565b600355565b6004546001600160a01b031690565b612822614ef9565b600980546001600160a01b03199081166001600160a01b039384161791829055600a8054929093169116179055565b60008060008060008060006005898154811061286957fe5b906000526020600020906003020160010160008963ffffffff16815260200190815260200160002060000160009054906101000a900463ffffffff1660058a815481106128b257fe5b906000526020600020906003020160010160008a63ffffffff1681526020019081526020016000206001015460058b815481106128eb57fe5b906000526020600020906003020160010160008b63ffffffff1681526020019081526020016000206003015460058c8154811061292457fe5b906000526020600020906003020160010160008c63ffffffff1681526020019081526020016000206004015460058d8154811061295d57fe5b906000526020600020906003020160010160008d63ffffffff1681526020019081526020016000206005015460058e8154811061299657fe5b906000526020600020906003020160010160008e63ffffffff1681526020019081526020016000206006015460058f815481106129cf57fe5b906000526020600020906003020160010160008f63ffffffff16815260200190815260200160002060070160009054906101000a900460ff16965096509650965096509650965092959891949750929550565b600d546001600160a01b031690565b612a39614ef9565b600e805460ff60a01b19169055565b6040518060400160405280600681526020016518189c18181960d11b81525081565b6002805460010190819055600e54600160a01b900460ff16612ab8576040805162461bcd60e51b8152602060048201526002602482015261353160f01b604482015290519081900360640190fd5b600e546040805163059e086960e51b815263ffffffff861660048201529051600092606092849283926001600160a01b03169163b3c10d209160248083019286929190829003018186803b158015612b0f57600080fd5b505afa158015612b23573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610100811015612b4d57600080fd5b815160208301805160405192949293830192919084600160201b821115612b7357600080fd5b908301906020820185811115612b8857600080fd5b8251600160201b811182820188101715612ba157600080fd5b82525081516020918201929091019080838360005b83811015612bce578181015183820152602001612bb6565b50505050905090810190601f168015612bfb5780820380516001836020036101000a031916815260200191505b5060409081526020820151910151949850929650919450919250505063ffffffff84166298967f1415612c59576040805162461bcd60e51b81526020600482015260016024820152601960f91b604482015290519081900360640190fd5b60ff821660011480612c6e575060ff82166003145b15612f43578715612cab576040805162461bcd60e51b8152602060048201526002602482015261191b60f11b604482015290519081900360640190fd5b600154604080516323b872dd60e01b81523360048201526001600160a01b039283166024820152604481018d9052905183928316916323b872dd9160648083019260209291908290030181600087803b158015612d0757600080fd5b505af1925050508015612d2c57506040513d6020811015612d2757600080fd5b505160015b612d61576040805162461bcd60e51b81526020600482015260016024820152603360f81b604482015290519081900360640190fd5b5063ffffffff87166298967f14612eb4576000600860009054906101000a90046001600160a01b03166001600160a01b031663c1a0c94885878f8f8f6040518663ffffffff1660e01b8152600401808660ff1681526020018060200185815260200180602001838103835287818151815260200191508051906020019080838360005b83811015612dfc578181015183820152602001612de4565b50505050905090810190601f168015612e295780820380516001836020036101000a031916815260200191505b508381038252858582818152602001925060200280828437600081840152601f19601f82011690508083019250505097505050505050505060206040518083038186803b158015612e7957600080fd5b505afa158015612e8d573d6000803e3d6000fd5b505050506040513d6020811015612ea357600080fd5b50519050612eb188826157bf565b50505b612ebc615b63565b6040518060e001604052808763ffffffff1681526020018d8152602001600081526020014281526020016000815260200160008152602001600115158152509050612f3b33828d8d8080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525061508492505050565b505b50613509565b60ff82166004141561316057893414612f87576040805162461bcd60e51b81526020600482015260016024820152600d60fa1b604482015290519081900360640190fd5b63ffffffff86166298967f146130d9576000600860009054906101000a90046001600160a01b03166001600160a01b031663c1a0c94884868e8e8e6040518663ffffffff1660e01b8152600401808660ff1681526020018060200185815260200180602001838103835287818151815260200191508051906020019080838360005b83811015613021578181015183820152602001613009565b50505050905090810190601f16801561304e5780820380516001836020036101000a031916815260200191505b508381038252858582818152602001925060200280828437600081840152601f19601f82011690508083019250505097505050505050505060206040518083038186803b15801561309e57600080fd5b505afa1580156130b2573d6000803e3d6000fd5b505050506040513d60208110156130c857600080fd5b505190506130d687826157bf565b50505b6130e1615b63565b6040518060e001604052808663ffffffff1681526020018c8152602001600081526020014281526020016000815260200160008152602001600115158152509050612f3d33828c8c8080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525061508492505050565b60ff821660021415613509578988146131a4576040805162461bcd60e51b81526020600482015260016024820152603560f81b604482015290519081900360640190fd5b8060005b8981101561327f576001546001600160a01b03808416916342842e0e913391168e8e868181106131d457fe5b905060200201356040518463ffffffff1660e01b815260040180846001600160a01b03168152602001836001600160a01b031681526020018281526020019350505050600060405180830381600087803b15801561323157600080fd5b505af1925050508015613242575060015b613277576040805162461bcd60e51b81526020600482015260016024820152600760fb1b604482015290519081900360640190fd5b6001016131a8565b5063ffffffff87166298967f146133d2576000600860009054906101000a90046001600160a01b03166001600160a01b031663c1a0c94885878f8f8f6040518663ffffffff1660e01b8152600401808660ff1681526020018060200185815260200180602001838103835287818151815260200191508051906020019080838360005b8381101561331a578181015183820152602001613302565b50505050905090810190601f1680156133475780820380516001836020036101000a031916815260200191505b508381038252858582818152602001925060200280828437600081840152601f19601f82011690508083019250505097505050505050505060206040518083038186803b15801561339757600080fd5b505afa1580156133ab573d6000803e3d6000fd5b505050506040513d60208110156133c157600080fd5b505190506133cf88826157bf565b50505b600854604051632f73dd0f60e11b8152602060048201818152602483018d90526000936001600160a01b031692635ee7ba1e928f928f9290918291604401908590850280828437600083820152604051601f909101601f191690920195506020945090925050508083038186803b15801561344c57600080fd5b505afa158015613460573d6000803e3d6000fd5b505050506040513d602081101561347657600080fd5b50519050613482615b63565b6040518060e001604052808863ffffffff1681526020018d8d905081526020018d8d905081526020014281526020016000815260200183815260200160011515815250905061350533828e8e8080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525061508492505050565b5050505b7f6257ea3b4243cdf0d65619d48c8ba440567afcae228c5a3d9324c5cc39d162d73385848d8d8d4260405180886001600160a01b031681526020018763ffffffff1681526020018660ff168152602001858152602001806020018381526020018281038252858582818152602001925060200280828437600083820152604051601f909101601f19169092018290039a509098505050505050505050a15050505060025481146135e5576040805162461bcd60e51b8152602060048201526002602482015261191960f11b604482015290519081900360640190fd5b505050505050565b6135f5614ef9565b600780546001600160a01b03199081166001600160a01b03938416179182905560088054929093169116179055565b6000805b6005548110156136d457836001600160a01b03166005828154811061364957fe5b60009182526020909120600390910201546001600160a01b031614156136cc5760006136c26003546136bc6005858154811061368157fe5b906000526020600020906003020160010160008863ffffffff168152602001908152602001600020600401544261582c90919063ffffffff16565b906158a4565b9250610ea9915050565b600101613628565b5060009392505050565b6136e6614ef9565b600480546001600160a01b0319166001600160a01b0392909216919091179055565b6000546001600160a01b031681565b61371f614ef9565b6000819050806001600160a01b03166382d726f96040518163ffffffff1660e01b815260040160206040518083038186803b15801561375d57600080fd5b505afa158015613771573d6000803e3d6000fd5b505050506040513d602081101561378757600080fd5b5051600d80546001600160a01b039283166001600160a01b03199182161791829055600e8054909116918316919091179055604080516366afa89360e01b81529051918316916366afa89391600480820192602092909190829003018186803b1580156137f357600080fd5b505afa158015613807573d6000803e3d6000fd5b505050506040513d602081101561381d57600080fd5b5051600780546001600160a01b039283166001600160a01b03199182161791829055600880549091169183169190911790556040805163bae0b81560e01b815290519183169163bae0b81591600480820192602092909190829003018186803b15801561388957600080fd5b505afa15801561389d573d6000803e3d6000fd5b505050506040513d60208110156138b357600080fd5b5051600980546001600160a01b039283166001600160a01b03199182161791829055600a8054909116918316919091179055604080516369940d7960e01b81529051918316916369940d7991600480820192602092909190829003018186803b15801561391f57600080fd5b505afa158015613933573d6000803e3d6000fd5b505050506040513d602081101561394957600080fd5b5051600480546001600160a01b0319166001600160a01b03928316178155604080516303be5dc760e61b815290519284169263ef9771c092828101926020929190829003018186803b15801561399e57600080fd5b505afa1580156139b2573d6000803e3d6000fd5b505050506040513d60208110156139c857600080fd5b5051600b80546001600160a01b0319166001600160a01b03928316179055604080516309aa46bb60e31b8152905191831691634d5235d891600480820192602092909190829003018186803b158015613a2057600080fd5b505afa158015613a34573d6000803e3d6000fd5b505050506040513d6020811015613a4a57600080fd5b5051600c80546001600160a01b0319166001600160a01b039092169190911790555050565b613a77614ef9565b600b80546001600160a01b0319166001600160a01b0392909216919091179055565b613aa1614ef9565b600c80546001600160a01b0319166001600160a01b0392909216919091179055565b606080806001600160a01b038416331480613ae857506000546001600160a01b031633145b80613afd57506001546001600160a01b031633145b613b32576040805162461bcd60e51b81526020600482015260016024820152603960f81b604482015290519081900360640190fd5b600080613b408660006117fa565b909250905063ffffffff82166298967f1415613b685750606093508392508291506117e39050565b606060058281548110613b7757fe5b90600052602060002090600302016002015467ffffffffffffffff81118015613b9f57600080fd5b50604051908082528060200260200182016040528015613bc9578160200160208202803683370190505b509050606060058381548110613bdb57fe5b90600052602060002090600302016002015467ffffffffffffffff81118015613c0357600080fd5b50604051908082528060200260200182016040528015613c2d578160200160208202803683370190505b509050606060058481548110613c3f57fe5b90600052602060002090600302016002015467ffffffffffffffff81118015613c6757600080fd5b50604051908082528060200260200182016040528015613c91578160200160208202803683370190505b50905060008060005b60058781548110613ca757fe5b9060005260206000209060030201600201548163ffffffff1610156117d45760058781548110613cd357fe5b6000918252602080832063ffffffff85168452600160039093020182019052604090912001549250613d0587826155a3565b15613d1257829150613d17565b600091505b82868263ffffffff1681518110613d2a57fe5b60200260200101818152505081858263ffffffff1681518110613d4957fe5b60200260200101818152505060058781548110613d6257fe5b6000918252602080832063ffffffff85811680865260039490940290910160010190915260409092205486519216918691908110613d9c57fe5b63ffffffff90921660209283029190910190910152600101613c9a565b6009546001600160a01b031690565b613dd0614ef9565b600e805460ff60a01b1916600160a01b179055565b6002805460010190819055600e54600160a01b900460ff16613e33576040805162461bcd60e51b8152602060048201526002602482015261353160f01b604482015290519081900360640190fd5b6001600160a01b038516331480613e5457506000546001600160a01b031633145b80613e6957506001546001600160a01b031633145b80613e7e5750600b546001600160a01b031633145b80613e935750600c546001600160a01b031633145b613ec8576040805162461bcd60e51b81526020600482015260016024820152603960f81b604482015290519081900360640190fd5b600080613ed68760006117fa565b909250905063ffffffff82166298967f1415613f1e576040805162461bcd60e51b8152602060048201526002602482015261031360f41b604482015290519081900360640190fd5b613f2733615926565b15613f6c57613f3681876155a3565b613f6c576040805162461bcd60e51b8152602060048201526002602482015261343960f01b604482015290519081900360640190fd5b60008415613fae5760058281548110613f8157fe5b6000918252602080832063ffffffff8b168452600160039093020182019052604090912001549050613fb1565b50845b60058281548110613fbe57fe5b6000918252602080832063ffffffff8b1684526001600390930201820190526040909120015481111561401d576040805162461bcd60e51b8152602060048201526002602482015261313360f01b604482015290519081900360640190fd5b600e546005805460009283926001600160a01b039091169163b3c10d2091908790811061404657fe5b906000526020600020906003020160010160008c63ffffffff16815260200190815260200160002060000160009054906101000a900463ffffffff166040518263ffffffff1660e01b8152600401808263ffffffff16815260200191505060006040518083038186803b1580156140bc57600080fd5b505afa1580156140d0573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526101008110156140fa57600080fd5b815160208301805160405192949293830192919084600160201b82111561412057600080fd5b90830190602082018581111561413557600080fd5b8251600160201b81118282018810171561414e57600080fd5b82525081516020918201929091019080838360005b8381101561417b578181015183820152602001614163565b50505050905090810190601f1680156141a85780820380516001836020036101000a031916815260200191505b5060409081526020820151910151600580549298509096506000955061421294508893509150889081106141d857fe5b906000526020600020906003020160010160008d63ffffffff1681526020019081526020016000206001015461582c90919063ffffffff16565b905060ff831660011480614229575060ff83166003145b156145af5761423733615926565b156143ab57600154604080516370a0823160e01b81526001600160a01b03928316600482015290518492600092908416916370a0823191602480820192602092909190829003018186803b15801561428e57600080fd5b505afa1580156142a2573d6000803e3d6000fd5b505050506040513d60208110156142b857600080fd5b50519050858110156142f6576040805162461bcd60e51b8152602060048201526002602482015261313360f01b604482015290519081900360640190fd5b816001600160a01b031663a9059cbb8e886040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050602060405180830381600087803b15801561434d57600080fd5b505af192505050801561437257506040513d602081101561436d57600080fd5b505160015b6143a7576040805162461bcd60e51b81526020600482015260016024820152603360f81b604482015290519081900360640190fd5b5050505b6143b5858b610e24565b600586815481106143c257fe5b906000526020600020906003020160010160008c63ffffffff1681526020019081526020016000206005018190555080600586815481106143ff57fe5b6000918252602080832063ffffffff8f168452600160039093020182019052604090912081019190915581614432575060005b61443d868c83615958565b61444633615926565b156144fc577fcdf1dd58a1120ee3de7cd25160d1d0ada04b9e4a0c0dea398a618171ea0b16038c6005888154811061447a57fe5b906000526020600020906003020160010160008e63ffffffff16815260200190815260200160002060000160009054906101000a900463ffffffff168d8860405180856001600160a01b031681526020018463ffffffff1681526020018363ffffffff16815260200182815260200194505050505060405180910390a16145a9565b7f0be23e24fe9442154b51b577b816b93793f539697ae4a6eb906519e5f43f94248c6005888154811061452b57fe5b906000526020600020906003020160010160008e63ffffffff16815260200190815260200160002060000160009054906101000a900463ffffffff168d8860405180856001600160a01b031681526020018463ffffffff1681526020018363ffffffff16815260200182815260200194505050505060405180910390a15b50614b37565b60ff831660021415614848576145c433615926565b156146115760006145d78c878d866159e3565b90508061460f576040805162461bcd60e51b81526020600482015260016024820152600760fb1b604482015290519081900360640190fd5b505b61461b858b610e24565b6005868154811061462857fe5b906000526020600020906003020160010160008c63ffffffff1681526020019081526020016000206005018190555060006005868154811061466657fe5b6000918252602080832063ffffffff8f168452600160039093020182019052604082200191909155600580548790811061469c57fe5b906000526020600020906003020160010160008c63ffffffff168152602001908152602001600020600301819055506146d7858b6000615958565b6146e033615926565b15614796577fcdf1dd58a1120ee3de7cd25160d1d0ada04b9e4a0c0dea398a618171ea0b16038b6005878154811061471457fe5b906000526020600020906003020160010160008d63ffffffff16815260200190815260200160002060000160009054906101000a900463ffffffff168c8760405180856001600160a01b031681526020018463ffffffff1681526020018363ffffffff16815260200182815260200194505050505060405180910390a1614843565b7f0be23e24fe9442154b51b577b816b93793f539697ae4a6eb906519e5f43f94248b600587815481106147c557fe5b906000526020600020906003020160010160008d63ffffffff16815260200190815260200160002060000160009054906101000a900463ffffffff168c8760405180856001600160a01b031681526020018463ffffffff1681526020018363ffffffff16815260200182815260200194505050505060405180910390a15b614b37565b60ff831660041415614b375761485d33615926565b15614937576001546001600160a01b0316318411156148a8576040805162461bcd60e51b8152602060048201526002602482015261313360f01b604482015290519081900360640190fd5b6040516000906001600160a01b038d169086908381818185875af1925050503d80600081146148f3576040519150601f19603f3d011682016040523d82523d6000602084013e6148f8565b606091505b50508091505080614935576040805162461bcd60e51b8152602060048201526002602482015261313560f01b604482015290519081900360640190fd5b505b614941858b610e24565b6005868154811061494e57fe5b906000526020600020906003020160010160008c63ffffffff16815260200190815260200160002060050181905550806005868154811061498b57fe5b6000918252602080832063ffffffff8f1684526001600390930201820190526040909120810191909155816149be575060005b6149c9868c83615958565b6149d233615926565b15614a88577fcdf1dd58a1120ee3de7cd25160d1d0ada04b9e4a0c0dea398a618171ea0b16038c60058881548110614a0657fe5b906000526020600020906003020160010160008e63ffffffff16815260200190815260200160002060000160009054906101000a900463ffffffff168d8860405180856001600160a01b031681526020018463ffffffff1681526020018363ffffffff16815260200182815260200194505050505060405180910390a1614b35565b7f0be23e24fe9442154b51b577b816b93793f539697ae4a6eb906519e5f43f94248c60058881548110614ab757fe5b906000526020600020906003020160010160008e63ffffffff16815260200190815260200160002060000160009054906101000a900463ffffffff168d8860405180856001600160a01b031681526020018463ffffffff1681526020018363ffffffff16815260200182815260200194505050505060405180910390a15b505b50505050505060025481146127e8576040805162461bcd60e51b8152602060048201526002602482015261191960f11b604482015290519081900360640190fd5b6001546001600160a01b031681565b60008060008060008060008060005b600554811015614cc75760005b60058281548110614bb057fe5b9060005260206000209060030201600201548163ffffffff161015614cbe578a63ffffffff1660058381548110614be357fe5b6000918252602080832063ffffffff8681168552600393909302016001019052604090912054161415614cb65760058281548110614c1d57fe5b906000526020600020906003020160010160008263ffffffff1681526020019081526020016000206001015486019550614c578282610e24565b84019350614c6582826155a3565b15614cb65760058281548110614c7757fe5b906000526020600020906003020160010160008263ffffffff1681526020019081526020016000206001015485019450614cb18282610e24565b830192505b600101614ba3565b50600101614b96565b5092989197509550909350915050565b6006546001600160a01b031690565b600b546001600160a01b031690565b614cfd614ef9565b60408051808201909152600681526518189c18181960d11b60208201526001600160a01b038216614dac5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015614d71578181015183820152602001614d59565b50505050905090810190601f168015614d9e5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6040518060400160405280600681526020016530313830303160d01b81525081565b600060058481548110614e3957fe5b6000918252602080832063ffffffff871684526001600390930201919091018152604080832085845260020190915290205490509392505050565b6006546001600160a01b0316331480614e9757506000546001600160a01b031633145b80614eac5750600b546001600160a01b031633145b80614ec15750600c546001600160a01b031633145b614ef7576040805162461bcd60e51b81526020600482015260026024820152610c8d60f21b604482015290519081900360640190fd5b565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b03163314614f705760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315614d71578181015183820152602001614d59565b50565b614f7b615b63565b60008060008060008060008a6001600160a01b0316637c0741aa8b8b6040518363ffffffff1660e01b8152600401808381526020018263ffffffff1681526020019250505060e06040518083038186803b158015614fd857600080fd5b505afa158015614fec573d6000803e3d6000fd5b505050506040513d60e081101561500257600080fd5b508051602082015160408301516060840151608085015160a086015160c090960151949c50929a5090985096509450909250905061503e615b63565b506040805160e08101825263ffffffff90981688526020880196909652948601939093526060850191909152608084015260a0830152151560c082015290509392505050565b6000806150928560006117fa565b909250905063ffffffff82166298967f14615412576000600582815481106150b657fe5b906000526020600020906003020160020154905060008060005b838163ffffffff16101561513757876000015163ffffffff16600586815481106150f657fe5b6000918252602080832063ffffffff868116855260039390930201600101905260409091205416141561512f5760019250809150615137565b6001016150d0565b5081156152ee57600061514a8583610e24565b9050806005868154811061515a57fe5b906000526020600020906003020160010160008463ffffffff1681526020019081526020016000206005018190555087602001516005868154811061519b57fe5b6000918252602080832063ffffffff871684526001600390930201820190526040909120018054909101905560058054429190879081106151d857fe5b906000526020600020906003020160010160008463ffffffff1681526020019081526020016000206004018190555060006005868154811061521657fe5b906000526020600020906003020160010160008463ffffffff16815260200190815260200160002060030154905087516005878154811061525357fe5b6000918252602080832063ffffffff88168452600392830201600101905260408220018054929092019091555b88518110156152e65788818151811061529557fe5b6020026020010151600588815481106152aa57fe5b6000918252602080832063ffffffff89168452600160039093020182018152604080842086880185526002019091529091209190915501615280565b50505061540a565b600584815481106152fb57fe5b6000918252602090912060026003909202010180546001019055600580548891908690811061532657fe5b600091825260208083208784526003928302016001908101825260408085208651815463ffffffff191663ffffffff909116178155928601519183019190915584015191810191909155606083015160048201556080830151600582015560a0830151600682015560c0909201516007909201805460ff1916921515929092179091555b8651811015615408578681815181106153bf57fe5b6020026020010151600586815481106153d457fe5b60009182526020808320888452600160039093020182018152604080842086855260020190915290912091909155016153aa565b505b5050506127e8565b604080518082019091526001600160a01b038681168252600160208301818152600580549283018155600081905293517f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db0600390930292830180546001600160a01b031916919094161790925590517f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db290910155805485919060001981019081106154b957fe5b600091825260208083208380526003928302016001908101825260408085208651815463ffffffff191663ffffffff909116178155928601519183019190915584015191810191909155606083015160048201556080830151600582015560a0830151600682015560c0909201516007909201805460ff1916921515929092179091555b83518110156135e55783818151811061555257fe5b602002602001015160056001600580549050038154811061556f57fe5b600091825260208083208380526001600390930201820181526040808420868552600201909152909120919091550161553d565b6000600583815481106155b257fe5b6000918252602080832063ffffffff861684526001600390930201919091019052604090206007015460ff166155ea57506001610ea9565b600e54600580546000926001600160a01b03169163b3c10d20918790811061560e57fe5b6000918252602080832063ffffffff8981168552600393909302016001019052604080832054815160e086901b6001600160e01b0319168152921660048301525160248083019392829003018186803b15801561566a57600080fd5b505afa15801561567e573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526101008110156156a857600080fd5b815160208301805160405192949293830192919084600160201b8211156156ce57600080fd5b9083019060208201858111156156e357600080fd5b8251600160201b8111828201881017156156fc57600080fd5b82525081516020918201929091019080838360005b83811015615729578181015183820152602001615711565b50505050905090810190601f1680156157565780820380516001836020036101000a031916815260200191505b5060405260c001516005805491965086955093508892508210905061577757fe5b906000526020600020906003020160010160008563ffffffff16815260200190815260200160002060040154014210156157b5576000915050610ea9565b5060019392505050565b6008546040805163787836eb60e11b815263ffffffff851660048201526024810184905290516000926001600160a01b03169163f0f06dd691604480830192602092919082900301818787803b15801561581857600080fd5b505af1158015610e8e573d6000803e3d6000fd5b6000828211156040518060400160405280600681526020016518181c18181960d11b8152509061589d5760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315614d71578181015183820152602001614d59565b5050900390565b60008082116040518060400160405280600681526020016530303830303360d01b815250906159145760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315614d71578181015183820152602001614d59565b5081838161591e57fe5b049392505050565b600b546000906001600160a01b03838116911614801590610ea9575050600c546001600160a01b039081169116141590565b426005848154811061596657fe5b906000526020600020906003020160010160008463ffffffff1681526020019081526020016000206004018190555080600584815481106159a357fe5b6000918252602080832063ffffffff909616835260016003909202909501019093526040909220600701805492151560ff19909316929092179091555050565b600154604080516370a0823160e01b81526001600160a01b039283166004820152905160009284928492918416916370a0823191602480820192602092909190829003018186803b158015615a3757600080fd5b505afa158015615a4b573d6000803e3d6000fd5b505050506040513d6020811015615a6157600080fd5b5051905080615a7557600092505050615b5b565b600060058781548110615a8457fe5b906000526020600020906003020160010160008763ffffffff168152602001908152602001600020905060005b8160030154811015615b525760015460008281526002840160205260408082205481516323b872dd60e01b81526001600160a01b0394851660048201528d8516602482015260448101919091529051928716926323b872dd9260648084019391929182900301818387803b158015615b2857600080fd5b505af1925050508015615b39575060015b615b4a576000945050505050615b5b565b600101615ab1565b50600193505050505b949350505050565b6040518060e00160405280600063ffffffff1681526020016000815260200160008152602001600081526020016000815260200160008152602001600015158152509056fea264697066735822122050e601e5eec44356e2acd9d060b44ed2008fbd4530ba9a72ad292127802db99464736f6c634300060c0033";


const famers_register_bytecode ="0x6080604052600280546001600160a01b031916905534801561002057600080fd5b50600080546001600160a01b0319163317905560018055611807806100466000396000f3fe608060405234801561001057600080fd5b50600436106101365760003560e01c8063860d248a116100b2578063b1a3982211610081578063d692a5c611610066578063d692a5c61461026f578063f2fde38b14610282578063f3fe3bc31461029557610136565b8063b1a3982214610249578063cbf0b0c01461025c57610136565b8063860d248a146102115780638b0f90e7146102195780638da5cb5b1461022e5780639b2263bc1461023657610136565b806335b7777d116101095780636f9fb98a116100ee5780636f9fb98a146101e35780637d7da89f146101eb5780638124bdd2146101fe57610136565b806335b7777d146101bb5780633c8f3d68146101ce57610136565b806309274cbb1461013b5780631c40928d146101665780631c42c3061461017b5780632dc19ec11461019b575b600080fd5b61014e61014936600461155c565b61029d565b60405161015d939291906115d0565b60405180910390f35b61016e6102fb565b60405161015d9190611609565b61018e610189366004611574565b610301565b60405161015d9190611612565b6101ae6101a93660046113d3565b6103fb565b60405161015d91906115fe565b61018e6101c9366004611574565b610475565b6101e16101dc3660046113f6565b610501565b005b61016e6106af565b6101e16101f9366004611421565b6106b3565b6101e161020c3660046113d3565b610892565b61018e610961565b61022161099a565b60405161015d91906115af565b6102216109b6565b6101e16102443660046113d3565b6109d2565b6101e16102573660046113d3565b610caa565b6101e161026a3660046113d3565b610db2565b6101e161027d366004611421565b610e53565b6101e16102903660046113d3565b610f9a565b61018e611132565b600381815481106102aa57fe5b60009182526020909120600290910201805460019091015473ffffffffffffffffffffffffffffffffffffffff821692507401000000000000000000000000000000000000000090910460ff169083565b60035490565b6060600060038363ffffffff168154811061031857fe5b60009182526020909120600290910201546040517fc87b56dd00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9091169150819063c87b56dd9061038090600190600401611609565b60006040518083038186803b15801561039857600080fd5b505afa1580156103ac573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526103f291908101906114a3565b9150505b919050565b6000805b60035481101561046c578273ffffffffffffffffffffffffffffffffffffffff166003828154811061042d57fe5b600091825260209091206002909102015473ffffffffffffffffffffffffffffffffffffffff1614156104645760019150506103f6565b6001016103ff565b50600092915050565b6060600060038363ffffffff168154811061048c57fe5b60009182526020822060029091020154604080517f06fdde03000000000000000000000000000000000000000000000000000000008152905173ffffffffffffffffffffffffffffffffffffffff909216935083926306fdde0392600480840193829003018186803b15801561039857600080fd5b60005460408051808201909152600681527f303138303031000000000000000000000000000000000000000000000000000060208201529073ffffffffffffffffffffffffffffffffffffffff163314610591576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105889190611612565b60405180910390fd5b50804710156105cc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105889061169a565b60008273ffffffffffffffffffffffffffffffffffffffff16826040516105f2906115ac565b60006040518083038185875af1925050503d806000811461062f576040519150601f19603f3d011682016040523d82523d6000602084013e610634565b606091505b50508091505080610671576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161058890611663565b7f8da35ab21134b5cb934e489c146c2a2a7f04074c2199b88ee18aa2c37ab42ee482846040516106a292919061172e565b60405180910390a1505050565b4790565b60005473ffffffffffffffffffffffffffffffffffffffff163314806106ff575060025473ffffffffffffffffffffffffffffffffffffffff16331480156106ff57506106ff3361116b565b610735576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610588906116d1565b61073e836103fb565b61088d5761074a6113b3565b506040805160608101825273ffffffffffffffffffffffffffffffffffffffff80861682528415156020830190815282840185815260038054600181018255600091909152845160029091027fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b810180549451151574010000000000000000000000000000000000000000027fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff939096167fffffffffffffffffffffffff0000000000000000000000000000000000000000909516949094179190911693909317909155517fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85c9091015590517f71cd41447696029607601e723fb83e2dc6785b9f83678a4bfe73b0680bcc6964906108839086906115af565b60405180910390a1505b505050565b60005460408051808201909152600681527f303138303031000000000000000000000000000000000000000000000000000060208201529073ffffffffffffffffffffffffffffffffffffffff163314610919576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105889190611612565b50600280547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6040518060400160405280600681526020017f303138303032000000000000000000000000000000000000000000000000000081525081565b60025473ffffffffffffffffffffffffffffffffffffffff1690565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60005460408051808201909152600681527f303138303031000000000000000000000000000000000000000000000000000060208201529073ffffffffffffffffffffffffffffffffffffffff163314610a59576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105889190611612565b50600081905060008173ffffffffffffffffffffffffffffffffffffffff16631c40928d6040518163ffffffff1660e01b815260040160206040518083038186803b158015610aa757600080fd5b505afa158015610abb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610adf9190611590565b63ffffffff16905060005b818163ffffffff161015610ca45760008060008573ffffffffffffffffffffffffffffffffffffffff166309274cbb856040518263ffffffff1660e01b8152600401610b369190611752565b60606040518083038186803b158015610b4e57600080fd5b505afa158015610b62573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b869190611461565b925092509250610b946113b3565b506040805160608101825273ffffffffffffffffffffffffffffffffffffffff9485168152921515602084019081529083019182526003805460018181018355600092909252935160029094027fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b810180549351151574010000000000000000000000000000000000000000027fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff969097167fffffffffffffffffffffffff00000000000000000000000000000000000000009094169390931794909416949094179055517fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85c9091015501610aea565b50505050565b60005473ffffffffffffffffffffffffffffffffffffffff16331480610cf6575060025473ffffffffffffffffffffffffffffffffffffffff1633148015610cf65750610cf63361116b565b610d2c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610588906116d1565b60005b60035463ffffffff82161015610dad578173ffffffffffffffffffffffffffffffffffffffff1660038263ffffffff1681548110610d6957fe5b600091825260209091206002909102015473ffffffffffffffffffffffffffffffffffffffff161415610da557610d9f81611177565b50610daf565b600101610d2f565b505b50565b60005460408051808201909152600681527f303138303031000000000000000000000000000000000000000000000000000060208201529073ffffffffffffffffffffffffffffffffffffffff163314610e39576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105889190611612565b508073ffffffffffffffffffffffffffffffffffffffff16ff5b60005473ffffffffffffffffffffffffffffffffffffffff16331480610e9f575060025473ffffffffffffffffffffffffffffffffffffffff1633148015610e9f5750610e9f3361116b565b610ed5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610588906116d1565b60005b600354811015610ca4578373ffffffffffffffffffffffffffffffffffffffff1660038281548110610f0657fe5b600091825260209091206002909102015473ffffffffffffffffffffffffffffffffffffffff161415610f92578260038281548110610f4157fe5b906000526020600020906002020160000160146101000a81548160ff0219169083151502179055508160038281548110610f7757fe5b9060005260206000209060020201600101819055505061088d565b600101610ed8565b60005460408051808201909152600681527f303138303031000000000000000000000000000000000000000000000000000060208201529073ffffffffffffffffffffffffffffffffffffffff163314611021576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105889190611612565b5060408051808201909152600681527f3031383030320000000000000000000000000000000000000000000000000000602082015273ffffffffffffffffffffffffffffffffffffffff82166110a4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105889190611612565b506000805460405173ffffffffffffffffffffffffffffffffffffffff808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6040518060400160405280600681526020017f303138303031000000000000000000000000000000000000000000000000000081525081565b3b63ffffffff16151590565b60035463ffffffff82161061118b57610daf565b6003547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0163ffffffff8216141561122c5760038054806111c857fe5b60008281526020812060027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9093019283020180547fffffffffffffffffffffff000000000000000000000000000000000000000000168155600101559055610daf565b805b6003547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0163ffffffff821610156113455760038160010163ffffffff168154811061127657fe5b906000526020600020906002020160038263ffffffff168154811061129757fe5b60009182526020909120825460029092020180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff90921691909117808255825460ff7401000000000000000000000000000000000000000091829004161515027fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff909116178155600191820154908201550161122e565b50600380548061135157fe5b60008281526020812060027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9093019283020180547fffffffffffffffffffffff00000000000000000000000000000000000000000016815560010155905550565b604080516060810182526000808252602082018190529181019190915290565b6000602082840312156113e4578081fd5b81356113ef8161178f565b9392505050565b60008060408385031215611408578081fd5b82356114138161178f565b946020939093013593505050565b600080600060608486031215611435578081fd5b83356114408161178f565b92506020840135611450816117b1565b929592945050506040919091013590565b600080600060608486031215611475578283fd5b83516114808161178f565b6020850151909350611491816117b1565b80925050604084015190509250925092565b6000602082840312156114b4578081fd5b815167ffffffffffffffff808211156114cb578283fd5b818401915084601f8301126114de578283fd5b8151818111156114ec578384fd5b60405160207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116820101818110848211171561152a578586fd5b604052818152838201602001871015611541578485fd5b611552826020830160208701611763565b9695505050505050565b60006020828403121561156d578081fd5b5035919050565b600060208284031215611585578081fd5b81356113ef816117bf565b6000602082840312156115a1578081fd5b81516113ef816117bf565b90565b73ffffffffffffffffffffffffffffffffffffffff91909116815260200190565b73ffffffffffffffffffffffffffffffffffffffff9390931683529015156020830152604082015260600190565b901515815260200190565b90815260200190565b6000602082528251806020840152611631816040850160208701611763565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b60208082526002908201527f3135000000000000000000000000000000000000000000000000000000000000604082015260600190565b60208082526002908201527f3133000000000000000000000000000000000000000000000000000000000000604082015260600190565b60208082526029908201527f6f6e6c792062616e6b206f72206f776e65722063616e2063616c6c207468697360408201527f2066756e6374696f6e0000000000000000000000000000000000000000000000606082015260800190565b91825273ffffffffffffffffffffffffffffffffffffffff16602082015260400190565b63ffffffff91909116815260200190565b60005b8381101561177e578181015183820152602001611766565b83811115610ca45750506000910152565b73ffffffffffffffffffffffffffffffffffffffff81168114610daf57600080fd5b8015158114610daf57600080fd5b63ffffffff81168114610daf57600080fdfea2646970667358221220673e840552bb699ad247c88f4b4664a07ce46930d33405f21b6342d5904da5ef64736f6c634300060c0033";




const data_provider_bytecode = "0x6080604052600280546001600160a01b031916905534801561002057600080fd5b50600080546001600160a01b03199081163317808355600280549092166001600160a01b03909116179055611d0690819061005b90396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c80639d4df581116100a2578063b4ace4e911610071578063b4ace4e91461055f578063ce42ebcd146105cd578063f2fde38b1461063b578063f3fe3bc314610661578063fbfaba4b146106695761010b565b80639d4df58114610394578063a6a6c7ae146103ae578063ae55c8881461046d578063afd0fd1d146104db5761010b565b8063860d248a116100de578063860d248a1461025b5780638da5cb5b146102d857806395ce99af146102e05780639b2263bc1461036e5761010b565b806318103f2c14610110578063717855ce146101a05780637c811aa91461021157806382c8ffbf14610235575b600080fd5b61019e600480360360a081101561012657600080fd5b810190602081018135600160201b81111561014057600080fd5b82018360208201111561015257600080fd5b803590602001918460018302840111600160201b8311171561017357600080fd5b919350915080356001600160a01b03169060208101351515906040810135906060013560ff166106eb565b005b61019e600480360360408110156101b657600080fd5b810190602081018135600160201b8111156101d057600080fd5b8201836020820111156101e257600080fd5b803590602001918460018302840111600160201b8311171561020357600080fd5b91935091503560ff166108f4565b610219610a91565b604080516001600160a01b039092168252519081900360200190f35b61019e6004803603602081101561024b57600080fd5b50356001600160a01b0316610aa0565b610263610b77565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561029d578181015183820152602001610285565b50505050905090810190601f1680156102ca5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610219610b99565b61019e600480360360a08110156102f657600080fd5b810190602081018135600160201b81111561031057600080fd5b82018360208201111561032257600080fd5b803590602001918460018302840111600160201b8311171561034357600080fd5b919350915080356001600160a01b03169060208101351515906040810135906060013560ff16610ba8565b61019e6004803603602081101561038457600080fd5b50356001600160a01b0316610dd1565b61039c61113c565b60408051918252519081900360200190f35b6103cb600480360360208110156103c457600080fd5b5035611142565b6040518080602001866001600160a01b0316815260200185151581526020018481526020018360ff168152602001828103825287818151815260200191508051906020019080838360005b8381101561042e578181015183820152602001610416565b50505050905090810190601f16801561045b5780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390f35b61039c6004803603602081101561048357600080fd5b810190602081018135600160201b81111561049d57600080fd5b8201836020820111156104af57600080fd5b803590602001918460018302840111600160201b831117156104d057600080fd5b50909250905061121d565b610549600480360360208110156104f157600080fd5b810190602081018135600160201b81111561050b57600080fd5b82018360208201111561051d57600080fd5b803590602001918460018302840111600160201b8311171561053e57600080fd5b509092509050611370565b6040805160ff9092168252519081900360200190f35b61019e6004803603602081101561057557600080fd5b810190602081018135600160201b81111561058f57600080fd5b8201836020820111156105a157600080fd5b803590602001918460018302840111600160201b831117156105c257600080fd5b5090925090506114be565b61019e600480360360408110156105e357600080fd5b810190602081018135600160201b8111156105fd57600080fd5b82018360208201111561060f57600080fd5b803590602001918460018302840111600160201b8311171561063057600080fd5b919350915035611624565b61019e6004803603602081101561065157600080fd5b50356001600160a01b03166116d2565b610263611818565b6106d76004803603602081101561067f57600080fd5b810190602081018135600160201b81111561069957600080fd5b8201836020820111156106ab57600080fd5b803590602001918460018302840111600160201b831117156106cc57600080fd5b50909250905061183a565b604080519115158252519081900360200190f35b6002546001600160a01b031633146107345760405162461bcd60e51b8152600401808060200182810382526028815260200180611ca96028913960400191505060405180910390fd5b61073e868661183a565b6108ec5761074a611b2e565b6040518060a0016040528088888080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201829052509385525050506001600160a01b03881660208084019190915287151560408401526060830187905260ff8616608090930192909252600180548082018255915282518051939450849360049092027fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6019261080792849290910190611b5c565b506020828101516001830180546040808701516001600160a01b03199092166001600160a01b039485161760ff60a01b1916600160a01b921515929092029190911790915560608086015160028601556080958601516003909501805460ff191660ff909616959095179094558051918a1692820192909252871515918101919091528181529081018890527fa41202d85d6e71e17deb80868379e6627cb12f735959b45796ec6fdf4a4d35bf91899189918991899181908101868680828437600083820152604051601f909101601f191690920182900397509095505050505050a1505b505050505050565b6002546001600160a01b0316331461093d5760405162461bcd60e51b8152600401808060200182810382526028815260200180611ca96028913960400191505060405180910390fd5b60005b60015463ffffffff82161015610a8a57610a3a60018263ffffffff168154811061096657fe5b6000918252602091829020600490910201805460408051601f60026000196101006001871615020190941693909304928301859004850281018501909152818152928301828280156109f95780601f106109ce576101008083540402835291602001916109f9565b820191906000526020600020905b8154815290600101906020018083116109dc57829003601f168201915b505050505085858080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061187992505050565b15610a82578160018263ffffffff1681548110610a5357fe5b906000526020600020906004020160030160006101000a81548160ff021916908360ff16021790555050610a8c565b600101610940565b505b505050565b6002546001600160a01b031690565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b03163314610b545760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610b19578181015183820152602001610b01565b50505050905090810190601f168015610b465780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600280546001600160a01b0319166001600160a01b0392909216919091179055565b6040518060400160405280600681526020016518189c18181960d11b81525081565b6000546001600160a01b031681565b6002546001600160a01b03163314610bf15760405162461bcd60e51b8152600401808060200182810382526028815260200180611ca96028913960400191505060405180910390fd5b60005b600154811015610dc857610ce260018281548110610c0e57fe5b6000918252602091829020600490910201805460408051601f6002600019610100600187161502019094169390930492830185900485028101850190915281815292830182828015610ca15780601f10610c7657610100808354040283529160200191610ca1565b820191906000526020600020905b815481529060010190602001808311610c8457829003601f168201915b505050505088888080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061187992505050565b15610dc0578460018281548110610cf557fe5b906000526020600020906004020160010160006101000a8154816001600160a01b0302191690836001600160a01b031602179055508360018281548110610d3857fe5b906000526020600020906004020160010160146101000a81548160ff0219169083151502179055508260018281548110610d6e57fe5b9060005260206000209060040201600201819055508160018281548110610d9157fe5b906000526020600020906004020160030160006101000a81548160ff021916908360ff160217905550506108ec565b600101610bf4565b50505050505050565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b03163314610e485760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610b19578181015183820152602001610b01565b5060008190506000816001600160a01b0316639d4df5816040518163ffffffff1660e01b815260040160206040518083038186803b158015610e8957600080fd5b505afa158015610e9d573d6000803e3d6000fd5b505050506040513d6020811015610eb357600080fd5b505163ffffffff16905060005b818163ffffffff161015610a8a576060600080600080876001600160a01b031663a6a6c7ae876040518263ffffffff1660e01b8152600401808263ffffffff16815260200191505060006040518083038186803b158015610f2057600080fd5b505afa158015610f34573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405260a0811015610f5d57600080fd5b8101908080516040519392919084600160201b821115610f7c57600080fd5b908301906020820185811115610f9157600080fd5b8251600160201b811182820188101715610faa57600080fd5b82525081516020918201929091019080838360005b83811015610fd7578181015183820152602001610fbf565b50505050905090810190601f1680156110045780820380516001836020036101000a031916815260200191505b5060409081526020820151908201516060830151608090930151959a50909850965094509192506110379150611b2e9050565b506040805160a0810182528681526001600160a01b038616602080830191909152851515928201929092526060810184905260ff83166080820152600180548082018255600091909152815180519293849360049093027fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf601926110be9284920190611b5c565b5060208201516001828101805460408601516001600160a01b03199091166001600160a01b039094169390931760ff60a01b1916600160a01b9315159390930292909217909155606083015160028301556080909201516003909101805460ff191660ff909216919091179055969096019550610ec0945050505050565b60015490565b6001818154811061114f57fe5b60009182526020918290206004919091020180546040805160026001841615610100026000190190931692909204601f8101859004850283018501909152808252919350918391908301828280156111e85780601f106111bd576101008083540402835291602001916111e8565b820191906000526020600020905b8154815290600101906020018083116111cb57829003601f168201915b5050506001840154600285015460039095015493946001600160a01b0382169460ff600160a01b909304831694509092501685565b6000805b60015463ffffffff821610156113685761124760018263ffffffff168154811061096657fe5b156113605760018163ffffffff168154811061125f57fe5b906000526020600020906004020160010160149054906101000a900460ff1661133357600060018263ffffffff168154811061129757fe5b906000526020600020906004020160010160009054906101000a90046001600160a01b031690506000816001600160a01b031663feaf968c6040518163ffffffff1660e01b815260040160a06040518083038186803b1580156112f957600080fd5b505afa15801561130d573d6000803e3d6000fd5b505050506040513d60a081101561132357600080fd5b5060200151935061136a92505050565b60018163ffffffff168154811061134657fe5b90600052602060002090600402016002015491505061136a565b600101611221565b505b92915050565b6000805b60015463ffffffff821610156113685761139a60018263ffffffff168154811061096657fe5b156114b65760018163ffffffff16815481106113b257fe5b906000526020600020906004020160010160149054906101000a900460ff1661148357600060018263ffffffff16815481106113ea57fe5b906000526020600020906004020160010160009054906101000a90046001600160a01b031690506000816001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b15801561144c57600080fd5b505afa158015611460573d6000803e3d6000fd5b505050506040513d602081101561147657600080fd5b5051935061136a92505050565b60018163ffffffff168154811061149657fe5b600091825260209091206003600490920201015460ff16915061136a9050565b600101611374565b6002546001600160a01b031633146115075760405162461bcd60e51b8152600401808060200182810382526028815260200180611ca96028913960400191505060405180910390fd5b60005b60015463ffffffff82161015610a8c5761160460018263ffffffff168154811061153057fe5b6000918252602091829020600490910201805460408051601f60026000196101006001871615020190941693909304928301859004850281018501909152818152928301828280156115c35780601f10611598576101008083540402835291602001916115c3565b820191906000526020600020905b8154815290600101906020018083116115a657829003601f168201915b505050505084848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061187992505050565b156116185761161281611960565b50611620565b60010161150a565b5050565b6002546001600160a01b0316331461166d5760405162461bcd60e51b8152600401808060200182810382526028815260200180611ca96028913960400191505060405180910390fd5b60005b60015463ffffffff82161015610a8a5761169660018263ffffffff168154811061096657fe5b156116ca578160018263ffffffff16815481106116af57fe5b90600052602060002090600402016002018190555050610a8c565b600101611670565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b031633146117495760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610b19578181015183820152602001610b01565b5060408051808201909152600681526518189c18181960d11b60208201526001600160a01b0382166117bc5760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610b19578181015183820152602001610b01565b50600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6040518060400160405280600681526020016530313830303160d01b81525081565b6000805b60015481101561186f576118586001828154811061096657fe5b1561186757600191505061136a565b60010161183e565b5060009392505050565b6000816040516020018082805190602001908083835b602083106118ae5780518252601f19909201916020918201910161188f565b6001836020036101000a03801982511681845116808217855250505050505090500191505060405160208183030381529060405280519060200120836040516020018082805190602001908083835b6020831061191c5780518252601f1990920191602091820191016118fd565b6001836020036101000a0380198251168184511680821785525050505050509050019150506040516020818303038152906040528051906020012014905092915050565b60015463ffffffff82161061197457611b2b565b6001546000190163ffffffff821614156119df57600180548061199357fe5b600082815260208120600019909201916004830201906119b38282611bda565b506001810180546001600160a81b031916905560006002820155600301805460ff191690559055611b2b565b805b6001546000190163ffffffff82161015611ad75760018160010163ffffffff1681548110611a0b57fe5b906000526020600020906004020160018263ffffffff1681548110611a2c57fe5b906000526020600020906004020160008201816000019080546001816001161561010002031660029004611a61929190611c1e565b506001828101805483830180546001600160a01b0319166001600160a01b0390921691909117808255915460ff600160a01b918290048116151590910260ff60a01b199093169290921790556002808501549084015560039384015493909201805460ff191693909216929092179055016119e1565b506001805480611ae357fe5b60008281526020812060001990920191600483020190611b038282611bda565b506001810180546001600160a81b031916905560006002820155600301805460ff1916905590555b50565b6040805160a08101825260608082526000602083018190529282018390528101829052608081019190915290565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611b9d57805160ff1916838001178555611bca565b82800160010185558215611bca579182015b82811115611bca578251825591602001919060010190611baf565b50611bd6929150611c93565b5090565b50805460018160011615610100020316600290046000825580601f10611c005750611b2b565b601f016020900490600052602060002090810190611b2b9190611c93565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611c575780548555611bca565b82800160010185558215611bca57600052602060002091601f016020900482015b82811115611bca578254825591600101919060010190611c78565b5b80821115611bd65760008155600101611c9456fe6f6e6c792064617461206d616e616765722063616e2063616c6c20746869732066756e6374696f6ea2646970667358221220fe87bd67061d5e1a75fca77f9bceb41e8d18c60c52e1bbf9273a1e67635ed51364736f6c634300060c0033";





const votes_calc_bytecode = "0x6080604052600180546001600160a01b0319908116909155670de0b6b3a7640000600455600580548216905560078054909116905534801561004057600080fd5b50600080546001600160a01b031916331790556116c2806100626000396000f3fe608060405234801561001057600080fd5b50600436106101425760003560e01c8063860d248a116100b8578063be0b4c071161007c578063be0b4c07146104b2578063c1a0c948146104cf578063e585d5481461059b578063f0f06dd614610609578063f2fde38b14610646578063f3fe3bc31461066c57610142565b8063860d248a146103d95780638da5cb5b146104565780639b2263bc1461045e578063a34ba41c14610484578063ab94276a146104aa57610142565b8063226d4b451161010a578063226d4b451461028d57806326aafd96146102fb5780632e4c697f146103385780633e6223bf1461035b5780635ee7ba1e1461036357806384181c02146103d157610142565b80630bbc98ba146101475780630e5a8c8a1461016b5780630ec2e8211461021057806319aadfe2146102385780631b679e391461025e575b600080fd5b61014f610674565b604080516001600160a01b039092168252519081900360200190f35b6101886004803603602081101561018157600080fd5b5035610683565b6040518080602001836001600160a01b03168152602001828103825284818151815260200191508051906020019080838360005b838110156101d45781810151838201526020016101bc565b50505050905090810190601f1680156102015780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b6102366004803603602081101561022657600080fd5b50356001600160a01b031661073f565b005b6102366004803603602081101561024e57600080fd5b50356001600160a01b0316610816565b61027b6004803603602081101561027457600080fd5b50356108bd565b60408051918252519081900360200190f35b61027b600480360360208110156102a357600080fd5b810190602081018135600160201b8111156102bd57600080fd5b8201836020820111156102cf57600080fd5b803590602001918460208302840111600160201b831117156102f057600080fd5b509092509050610930565b6103186004803603602081101561031157600080fd5b5035610b42565b6040805163ffffffff909316835260208301919091528051918290030190f35b61027b6004803603604081101561034e57600080fd5b5080359060200135610b94565b61014f610bf5565b61027b6004803603602081101561037957600080fd5b810190602081018135600160201b81111561039357600080fd5b8201836020820111156103a557600080fd5b803590602001918460208302840111600160201b831117156103c657600080fd5b509092509050610c04565b61027b610caa565b6103e1610cb0565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561041b578181015183820152602001610403565b50505050905090810190601f1680156104485780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61014f610cd2565b6102366004803603602081101561047457600080fd5b50356001600160a01b0316610ce1565b6102366004803603602081101561049a57600080fd5b50356001600160a01b0316610e8a565b61014f610f31565b61027b600480360360208110156104c857600080fd5b5035610f40565b61027b600480360360808110156104e557600080fd5b60ff8235169190810190604081016020820135600160201b81111561050957600080fd5b82018360208201111561051b57600080fd5b803590602001918460018302840111600160201b8311171561053c57600080fd5b91939092823592604081019060200135600160201b81111561055d57600080fd5b82018360208201111561056f57600080fd5b803590602001918460208302840111600160201b8311171561059057600080fd5b5090925090506110b0565b61027b600480360360408110156105b157600080fd5b810190602081018135600160201b8111156105cb57600080fd5b8201836020820111156105dd57600080fd5b803590602001918460018302840111600160201b831117156105fe57600080fd5b919350915035611109565b6106326004803603604081101561061f57600080fd5b5063ffffffff81351690602001356112a4565b604080519115158252519081900360200190f35b6102366004803603602081101561065c57600080fd5b50356001600160a01b0316611411565b6103e1611557565b6007546001600160a01b031690565b6003818154811061069057fe5b60009182526020918290206002918202018054604080516001831615610100026000190190921693909304601f8101859004850282018501909352828152909350918391908301828280156107265780601f106106fb57610100808354040283529160200191610726565b820191906000526020600020905b81548152906001019060200180831161070957829003601f168201915b505050600190930154919250506001600160a01b031682565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b031633146107f35760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156107b85781810151838201526020016107a0565b50505050905090810190601f1680156107e55780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600180546001600160a01b0319166001600160a01b0392909216919091179055565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b0316331461088d5760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156107b85781810151838201526020016107a0565b50600780546001600160a01b03199081166001600160a01b03938416179182905560088054929093169116179055565b6000805b6002548110156109255782600282815481106108d957fe5b600091825260209091206002909102015463ffffffff16141561091d576002818154811061090357fe5b90600052602060002090600202016001015491505061092b565b6001016108c1565b50600090505b919050565b600080805b838110156109ce576008546001600160a01b031663a8f621ea86868481811061095a57fe5b905060200201356040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b15801561099557600080fd5b505afa1580156109a9573d6000803e3d6000fd5b505050506040513d60208110156109bf57600080fd5b50519190910190600101610935565b506006546040805163afd0fd1d60e01b81526020600482018190526007602483015266115513905554d160ca1b604483015291516000936001600160a01b03169263afd0fd1d9260648082019391829003018186803b158015610a3057600080fd5b505afa158015610a44573d6000803e3d6000fd5b505050506040513d6020811015610a5a57600080fd5b5051600654604080516315cab91160e31b81526020600482018190526007602483015266115513905554d160ca1b6044830152915160ff90941694506000936001600160a01b039093169263ae55c88892606480840193919291829003018186803b158015610ac857600080fd5b505afa158015610adc573d6000803e3d6000fd5b505050506040513d6020811015610af257600080fd5b505190506000610b028483611579565b90506000610b11600a85610b94565b9050610b286004548361160a90919063ffffffff16565b9150610b34828261160a565b955050505050505b92915050565b60008060028381548110610b5257fe5b6000918252602090912060029182020154815463ffffffff909116919085908110610b7957fe5b90600052602060002090600202016001015491509150915091565b600081610ba357506001610b3c565b8160011415610bb3575081610b3c565b82158015610bc057508115155b15610bcd57506000610b3c565b8260015b83811015610bed57610be38286611579565b9150600101610bd1565b509050610b3c565b6005546001600160a01b031690565b600080805b83811015610ca2576008546001600160a01b031663a8f621ea868684818110610c2e57fe5b905060200201356040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b158015610c6957600080fd5b505afa158015610c7d573d6000803e3d6000fd5b505050506040513d6020811015610c9357600080fd5b50519190910190600101610c09565b509392505050565b60025490565b6040518060400160405280600681526020016518189c18181960d11b81525081565b6000546001600160a01b031681565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b03163314610d585760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156107b85781810151838201526020016107a0565b506000819050806001600160a01b0316633e6223bf6040518163ffffffff1660e01b815260040160206040518083038186803b158015610d9757600080fd5b505afa158015610dab573d6000803e3d6000fd5b505050506040513d6020811015610dc157600080fd5b5051600580546001600160a01b039283166001600160a01b0319918216179182905560068054909116918316919091179055604080516305de4c5d60e11b8152905191831691630bbc98ba91600480820192602092909190829003018186803b158015610e2d57600080fd5b505afa158015610e41573d6000803e3d6000fd5b505050506040513d6020811015610e5757600080fd5b5051600780546001600160a01b03199081166001600160a01b039384161791829055600880549290931691161790555050565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b03163314610f015760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156107b85781810151838201526020016107a0565b50600580546001600160a01b03199081166001600160a01b03938416179182905560068054929093169116179055565b6001546001600160a01b031690565b600680546040805163afd0fd1d60e01b81526020600482018190526024820194909452651093909554d160d21b6044820152905160009384936001600160a01b03169263afd0fd1d9260648083019392829003018186803b158015610fa457600080fd5b505afa158015610fb8573d6000803e3d6000fd5b505050506040513d6020811015610fce57600080fd5b505160068054604080516315cab91160e31b81526020600482018190526024820194909452651093909554d160d21b6044820152905160ff90941694506000936001600160a01b039092169263ae55c88892606480840193829003018186803b15801561103a57600080fd5b505afa15801561104e573d6000803e3d6000fd5b505050506040513d602081101561106457600080fd5b5051905060006110748583611579565b90506000611083600a85610b94565b905061109a6004548361160a90919063ffffffff16565b91506110a6828261160a565b9695505050505050565b600060ff8716600114806110c7575060ff87166003145b156110de576110d7868686611109565b90506110a6565b60ff8716600414156110f3576110d784610f40565b60ff8716600214156110a6576110d78383610930565b60065460405163afd0fd1d60e01b81526020600482019081526024820185905260009283926001600160a01b039091169163afd0fd1d91889188918190604401848480828437600083820152604051601f909101601f191690920195506020945090925050508083038186803b15801561118257600080fd5b505afa158015611196573d6000803e3d6000fd5b505050506040513d60208110156111ac57600080fd5b50516006546040516315cab91160e31b81526020600482019081526024820188905260ff90931693506000926001600160a01b039092169163ae55c88891899189918190604401848480828437600083820152604051601f909101601f191690920195506020945090925050508083038186803b15801561122c57600080fd5b505afa158015611240573d6000803e3d6000fd5b505050506040513d602081101561125657600080fd5b5051905060006112668583611579565b90506000611275600a85610b94565b905061128c6004548361160a90919063ffffffff16565b9150611298828261160a565b98975050505050505050565b6001546000906001600160a01b03163314806112ca57506000546001600160a01b031633145b611300576040805162461bcd60e51b81526020600482015260026024820152610c8d60f21b604482015290519081900360640190fd5b60005b60025481101561137c578363ffffffff166002828154811061132157fe5b600091825260209091206002909102015463ffffffff16141561137457826002828154811061134c57fe5b9060005260206000209060020201600101600082825401925050819055506001915050610b3c565b600101611303565b50506040805180820190915263ffffffff808416825260208201838152600280546001810182556000828152945191027f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace810180549290941663ffffffff1990921691909117909255517f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5acf9091015592915050565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b031633146114885760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156107b85781810151838201526020016107a0565b5060408051808201909152600681526518189c18181960d11b60208201526001600160a01b0382166114fb5760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156107b85781810151838201526020016107a0565b50600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6040518060400160405280600681526020016530313830303160d01b81525081565b60008261158857506000610b3c565b508181028183828161159657fe5b04146040518060400160405280600681526020016530303830303160d01b815250906116035760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156107b85781810151838201526020016107a0565b5092915050565b60008082116040518060400160405280600681526020016530303830303360d01b8152509061167a5760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156107b85781810151838201526020016107a0565b5081838161168457fe5b04939250505056fea2646970667358221220f5487a17e576f66bfdbe0d429d4c192fd91cbe63fe6d8526f66b64e81ba3b3bb64736f6c634300060c0033";


const profiles_register_bytecode = "0x608060405234801561001057600080fd5b50600080546001600160a01b031916331790556119c2806100326000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063b3c10d2011610071578063b3c10d2014610323578063ba756ed914610340578063c76b3ab6146103e6578063d35db5871461048c578063f2fde38b146104af578063f3fe3bc3146104d5576100b4565b806324461c61146100b95780636902fc0614610191578063860d248a146101ab57806387ee9957146102285780638da5cb5b146102d95780639b2263bc146102fd575b600080fd5b6100d6600480360360208110156100cf57600080fd5b50356104dd565b604051808963ffffffff168152602001806020018860ff168152602001876001600160a01b03168152602001868152602001858152602001848152602001838152602001828103825289818151815260200191508051906020019080838360005b8381101561014f578181015183820152602001610137565b50505050905090810190601f16801561017c5780820380516001836020036101000a031916815260200191505b50995050505050505050505060405180910390f35b6101996105d2565b60408051918252519081900360200190f35b6101b36105d8565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101ed5781810151838201526020016101d5565b50505050905090810190601f16801561021a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102d7600480360361012081101561023f57600080fd5b63ffffffff8235811692602081013590911691810190606081016040820135600160201b81111561026f57600080fd5b82018360208201111561028157600080fd5b803590602001918460018302840111600160201b831117156102a257600080fd5b919350915060ff813516906001600160a01b036020820135169060408101359060608101359060808101359060a001356105fa565b005b6102e1610851565b604080516001600160a01b039092168252519081900360200190f35b6102d76004803603602081101561031357600080fd5b50356001600160a01b0316610860565b6100d66004803603602081101561033957600080fd5b5035610c5d565b6102d7600480360361010081101561035757600080fd5b63ffffffff8235169190810190604081016020820135600160201b81111561037e57600080fd5b82018360208201111561039057600080fd5b803590602001918460018302840111600160201b831117156103b157600080fd5b919350915060ff813516906001600160a01b036020820135169060408101359060608101359060808101359060a00135610ea7565b6102d760048036036101008110156103fd57600080fd5b63ffffffff8235169190810190604081016020820135600160201b81111561042457600080fd5b82018360208201111561043657600080fd5b803590602001918460018302840111600160201b8311171561045757600080fd5b919350915060ff813516906001600160a01b036020820135169060408101359060608101359060808101359060a001356110ac565b6102d7600480360360208110156104a257600080fd5b503563ffffffff166112f4565b6102d7600480360360208110156104c557600080fd5b50356001600160a01b03166113d2565b6101b3611518565b600181815481106104ea57fe5b600091825260209182902060079091020180546001808301805460408051601f600260001996851615610100029690960190931694909404918201879004870284018701905280835263ffffffff90931695509293909291908301828280156105945780601f1061056957610100808354040283529160200191610594565b820191906000526020600020905b81548152906001019060200180831161057757829003601f168201915b505050506002830154600384015460048501546005860154600690960154949560ff8416956101009094046001600160a01b03169450919290919088565b60015490565b6040518060400160405280600681526020016518189c18181960d11b81525081565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b031633146106ae5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561067357818101518382015260200161065b565b50505050905090810190601f1680156106a05780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b508860018b63ffffffff16815481106106c357fe5b60009182526020909120600790910201805463ffffffff191663ffffffff928316179055600180548a928a9291908e169081106106fc57fe5b9060005260206000209060070201600101919061071a92919061177b565b508560018b63ffffffff168154811061072f57fe5b906000526020600020906007020160020160006101000a81548160ff021916908360ff1602179055508460018b63ffffffff168154811061076c57fe5b906000526020600020906007020160020160016101000a8154816001600160a01b0302191690836001600160a01b031602179055508360018b63ffffffff16815481106107b557fe5b9060005260206000209060070201600301819055508260018b63ffffffff16815481106107de57fe5b9060005260206000209060070201600401819055508160018b63ffffffff168154811061080757fe5b9060005260206000209060070201600501819055508060018b63ffffffff168154811061083057fe5b90600052602060002090600702016006018190555050505050505050505050565b6000546001600160a01b031681565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b031633146108d75760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561067357818101518382015260200161065b565b5060008190506000816001600160a01b0316636902fc066040518163ffffffff1660e01b815260040160206040518083038186803b15801561091857600080fd5b505afa15801561092c573d6000803e3d6000fd5b505050506040513d602081101561094257600080fd5b505163ffffffff16905060005b818163ffffffff161015610c5757600060606000806000806000808a6001600160a01b03166324461c618a6040518263ffffffff1660e01b8152600401808263ffffffff16815260200191505060006040518083038186803b1580156109b457600080fd5b505afa1580156109c8573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526101008110156109f257600080fd5b815160208301805160405192949293830192919084600160201b821115610a1857600080fd5b908301906020820185811115610a2d57600080fd5b8251600160201b811182820188101715610a4657600080fd5b82525081516020918201929091019080838360005b83811015610a73578181015183820152602001610a5b565b50505050905090810190601f168015610aa05780820380516001836020036101000a031916815260200191505b5060405260200180519060200190929190805190602001909291908051906020019092919080519060200190929190805190602001909291908051906020019092919050505097509750975097509750975097509750610afe6117f9565b50604080516101008101825263ffffffff8a8116825260208083018b815260ff8b16948401949094526001600160a01b03891660608401526080830188905260a0830187905260c0830186905260e0830185905260018054808201825560009190915283517fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf66007909202918201805463ffffffff1916919094161783559351805193948594610bd6937fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf79092019290910190611850565b50604082015160028201805460608501516001600160a01b031661010002610100600160a81b031960ff90941660ff1990921691909117929092169190911790556080820151600382015560a0820151600482015560c0820151600582015560e090910151600690910155505050600196909601955061094f945050505050565b50505050565b6000606060008060008060008060005b600154811015610e70578960018281548110610c8557fe5b600091825260209091206007909102015463ffffffff161415610e685760018181548110610caf57fe5b60009182526020909120600790910201546001805463ffffffff9092169183908110610cd757fe5b906000526020600020906007020160010160018381548110610cf557fe5b906000526020600020906007020160020160009054906101000a900460ff1660018481548110610d2157fe5b906000526020600020906007020160020160019054906101000a90046001600160a01b031660018581548110610d5357fe5b90600052602060002090600702016003015460018681548110610d7257fe5b90600052602060002090600702016004015460018781548110610d9157fe5b90600052602060002090600702016005015460018881548110610db057fe5b600091825260209182902060066007909202010154875460408051601f600260001961010060018716150201909416939093049283018590048502810185019091528181529192899190830182828015610e4b5780601f10610e2057610100808354040283529160200191610e4b565b820191906000526020600020905b815481529060010190602001808311610e2e57829003601f168201915b505050505096509850985098509850985098509850985050610e9c565b600101610c6d565b5050604080516020810190915260008082526298967f9850909650606395509350839250829150819050805b919395975091939597565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b03163314610f1e5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561067357818101518382015260200161065b565b5060005b60015481101561109f578963ffffffff1660018281548110610f4057fe5b600091825260209091206007909102015463ffffffff16141561109757888860018381548110610f6c57fe5b90600052602060002090600702016001019190610f8a92919061177b565b508660018281548110610f9957fe5b906000526020600020906007020160020160006101000a81548160ff021916908360ff1602179055508560018281548110610fd057fe5b906000526020600020906007020160020160016101000a8154816001600160a01b0302191690836001600160a01b03160217905550846001828154811061101357fe5b906000526020600020906007020160030181905550836001828154811061103657fe5b906000526020600020906007020160040181905550826001828154811061105957fe5b906000526020600020906007020160050181905550816001828154811061107c57fe5b906000526020600020906007020160060181905550506110a1565b600101610f22565b505b505050505050505050565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b031633146111235760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561067357818101518382015260200161065b565b5061112d8661153a565b611163576040805162461bcd60e51b8152602060048201526002602482015261062760f31b604482015290519081900360640190fd5b61116b6117f9565b6040518061010001604052808b63ffffffff1681526020018a8a8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092018290525093855250505060ff8a166020808401919091526001600160a01b038a166040840152606083018990526080830188905260a0830187905260c0909201859052600180548082018255915282517fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf66007909202918201805463ffffffff191663ffffffff9092169190911781558383015180519495508594919361127d937fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf70192910190611850565b50604082015160028201805460608501516001600160a01b031661010002610100600160a81b031960ff90941660ff1990921691909117929092169190911790556080820151600382015560a0820151600482015560c0820151600582015560e09091015160069091015550505050505050505050565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b0316331461136b5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561067357818101518382015260200161065b565b5060005b60015463ffffffff821610156113cd578163ffffffff1660018263ffffffff168154811061139957fe5b600091825260209091206007909102015463ffffffff1614156113c5576113bf81611573565b506113cf565b60010161136f565b505b50565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b031633146114495760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561067357818101518382015260200161065b565b5060408051808201909152600681526518189c18181960d11b60208201526001600160a01b0382166114bc5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561067357818101518382015260200161065b565b50600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6040518060400160405280600681526020016530313830303160d01b81525081565b600060ff821660011480611551575060ff82166002145b8061155f575060ff82166003145b8061156d575060ff82166004145b92915050565b60015463ffffffff821610611587576113cf565b6001546000190163ffffffff8216141561160b5760018054806115a657fe5b600082815260208120600760001990930192830201805463ffffffff19168155906115d460018301826118be565b506002810180546001600160a81b0319169055600060038201819055600482018190556005820181905560069091015590556113cf565b63ffffffff81165b6001546000190181101561170c576001816001018154811061163157fe5b90600052602060002090600702016001828154811061164c57fe5b600091825260209091208254600790920201805463ffffffff191663ffffffff9092169190911781556001808301805461169d92808501929160026000199282161561010002929092011604611902565b5060028281018054918301805460ff191660ff9093169290921780835590546001600160a01b03610100918290041602610100600160a81b0319909116179055600380830154908201556004808301549082015560058083015490820155600691820154910155600101611613565b50600180548061171857fe5b600082815260208120600760001990930192830201805463ffffffff191681559061174660018301826118be565b506002810180546001600160a81b03191690556000600382018190556004820181905560058201819055600690910155905550565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106117bc5782800160ff198235161785556117e9565b828001600101855582156117e9579182015b828111156117e95782358255916020019190600101906117ce565b506117f5929150611977565b5090565b604051806101000160405280600063ffffffff16815260200160608152602001600060ff16815260200160006001600160a01b03168152602001600081526020016000815260200160008152602001600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061189157805160ff19168380011785556117e9565b828001600101855582156117e9579182015b828111156117e95782518255916020019190600101906118a3565b50805460018160011615610100020316600290046000825580601f106118e457506113cf565b601f0160209004906000526020600020908101906113cf9190611977565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061193b57805485556117e9565b828001600101855582156117e957600052602060002091601f016020900482015b828111156117e957825482559160010191906001019061195c565b5b808211156117f5576000815560010161197856fea2646970667358221220794f00dc6f45c087bf476a59dc595eb931c3c464489fe5bcbc23a43b0be038b964736f6c634300060c0033";




const usage_calc_bytecode = "0x6080604052600280546001600160a01b0319908116909155600480548216905560068054821690556008805482169055600a805482169055600c80549091169055600d805463ffffffff60a01b1916600760a01b17905534801561006257600080fd5b50600080546001600160a01b031990811633179091556001805490911630179055614803806100926000396000f3fe608060405234801561001057600080fd5b506004361061029f5760003560e01c8063860d248a11610167578063c4dbdcbf116100ce578063ef56af7211610087578063ef56af72146109e1578063f2fde38b14610a04578063f3fe3bc314610a2a578063f519194314610a32578063fa5019f914610a61578063ffe0ffc214610a695761029f565b8063c4dbdcbf146108cb578063ca1f5062146108d3578063cc5888e9146108fc578063da81058714610934578063e4a9f3681461098b578063eec26e81146109ae5761029f565b8063a49d59c411610120578063a49d59c414610825578063a8789d051461084e578063aa79f9f814610871578063ab94276a14610879578063aeac19e214610881578063be2148a1146108895761029f565b8063860d248a1461072b57806388679fdd146107a85780638da5cb5b146107ce578063950fc602146107d6578063982aaa1f146107de578063a196ea95146107e65761029f565b806362a92b4a1161020b57806374389b6d116101c457806374389b6d146106055780637701230c146106385780637789ce44146106615780637a4936fd146106845780637c0741aa146106a757806384512c06146107025761029f565b806362a92b4a146104e25780636569726f1461050b57806366afa893146105635780636de681f21461056b5780636e671934146105a05780637237a66d146105df5761029f565b80633501efb01161025d5780633501efb0146103ab578063354ac6fd146103ce57806338491e79146103f15780633ea6b5b414610470578063442059d21461049457806360b9d75b146104b75761029f565b8062703ef0146102a4578063026e73ae146102df5780630ec2e8211461030457806313f40a831461032a5780631604a69614610367578063343f9e481461038a575b600080fd5b6102cd600480360360408110156102ba57600080fd5b508035906020013563ffffffff16610a94565b60408051918252519081900360200190f35b610302600480360360208110156102f557600080fd5b503563ffffffff16610b8f565b005b6103026004803603602081101561031a57600080fd5b50356001600160a01b0316610c6a565b6102cd600480360360a081101561034057600080fd5b5063ffffffff81351690602081013590604081013590606081013515159060800135611008565b6102cd6004803603602081101561037d57600080fd5b503563ffffffff1661107e565b61039261109a565b6040805163ffffffff9092168252519081900360200190f35b6102cd600480360360408110156103c157600080fd5b50803590602001356110ad565b6102cd600480360360208110156103e457600080fd5b503563ffffffff1661123c565b6104206004803603606081101561040757600080fd5b5080359063ffffffff6020820135169060400135611254565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561045c578181015183820152602001610444565b505050509050019250505060405180910390f35b610478611370565b604080516001600160a01b039092168252519081900360200190f35b6102cd600480360360408110156104aa57600080fd5b508035906020013561137f565b6102cd600480360360408110156104cd57600080fd5b5063ffffffff8135811691602001351661151f565b6102cd600480360360408110156104f857600080fd5b5063ffffffff81351690602001356117bb565b6105436004803603606081101561052157600080fd5b506001600160a01b038135169063ffffffff602082013516906040013561182a565b6040805163ffffffff909316835260208301919091528051918290030190f35b61047861198c565b6103026004803603606081101561058157600080fd5b5063ffffffff813581169160208101359091169060400135151561199b565b6102cd600480360360a08110156105b657600080fd5b5063ffffffff813581169160208101359160408201351690606081013590608001351515611a2b565b610302600480360360208110156105f557600080fd5b50356001600160a01b0316611aa0565b6102cd6004803603606081101561061b57600080fd5b5063ffffffff8135811691602081013590911690604001356122e0565b6103026004803603604081101561064e57600080fd5b5063ffffffff8135169060200135612590565b6102cd6004803603602081101561067757600080fd5b503563ffffffff16612602565b6102cd6004803603604081101561069a57600080fd5b5080359060200135612795565b6106d0600480360360408110156106bd57600080fd5b508035906020013563ffffffff16612a8b565b6040805163ffffffff909616865260208601949094528484019290925260608401526080830152519081900360a00190f35b6102cd6004803603604081101561071857600080fd5b5063ffffffff8135169060200135612b5f565b610733612d24565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561076d578181015183820152602001610755565b50505050905090810190601f16801561079a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610302600480360360208110156107be57600080fd5b50356001600160a01b0316612d46565b610478612ded565b610478612dfc565b610478612e0b565b610811600480360360408110156107fc57600080fd5b5063ffffffff81358116916020013516612e1a565b604080519115158252519081900360200190f35b6102cd6004803603606081101561083b57600080fd5b5080359060208101359060400135612e45565b6102cd6004803603604081101561086457600080fd5b5080359060200135612e98565b610478612eb3565b610478612ec2565b610478612ed1565b6102cd6004803603608081101561089f57600080fd5b506001600160a01b038135169063ffffffff602082013581169160408101359160609091013516612ee0565b61047861308c565b610302600480360360408110156108e957600080fd5b5063ffffffff813516906020013561309b565b6105436004803603606081101561091257600080fd5b506001600160a01b038135169063ffffffff602082013516906040013561310d565b6109726004803603608081101561094a57600080fd5b506001600160a01b038135169063ffffffff60208201351690604081013590606001356133f9565b6040805192835260208301919091528051918290030190f35b6102cd600480360360408110156109a157600080fd5b5080359060200135613646565b610302600480360360608110156109c457600080fd5b5063ffffffff813581169160208101359091169060400135613931565b6102cd600480360360208110156109f757600080fd5b503563ffffffff166139b3565b61030260048036036020811015610a1a57600080fd5b50356001600160a01b0316613c50565b610733613d96565b6102cd60048036036060811015610a4857600080fd5b5063ffffffff8135169060208101359060400135613db8565b610478613f89565b6102cd60048036036040811015610a7f57600080fd5b5063ffffffff81358116916020013516613f98565b600080600080600080600360009054906101000a90046001600160a01b03166001600160a01b0316637c0741aa89896040518363ffffffff1660e01b8152600401808381526020018263ffffffff1681526020019250505060e06040518083038186803b158015610b0457600080fd5b505afa158015610b18573d6000803e3d6000fd5b505050506040513d60e0811015610b2e57600080fd5b50805160208201516060830151608084015160a0909401519298509096509450909250905083610b6457509350610b8992505050565b836000610b7387868486613fc0565b9050610b7f818561425a565b9750505050505050505b92915050565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b03163314610c435760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610c08578181015183820152602001610bf0565b50505050905090810190601f168015610c355780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600d805463ffffffff909216600160a01b0263ffffffff60a01b19909216919091179055565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b03163314610ce15760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610c08578181015183820152602001610bf0565b50600280546001600160a01b038084166001600160a01b03199283161792839055600380549092169281169290921790819055604080516366afa89360e01b8152905191909216916366afa893916004808301926020929190829003018186803b158015610d4e57600080fd5b505afa158015610d62573d6000803e3d6000fd5b505050506040513d6020811015610d7857600080fd5b5051600480546001600160a01b039283166001600160a01b03199182161780835560058054909216908416179055600354604080516382d726f960e01b8152905191909316926382d726f99281810192602092909190829003018186803b158015610de257600080fd5b505afa158015610df6573d6000803e3d6000fd5b505050506040513d6020811015610e0c57600080fd5b5051600680546001600160a01b039283166001600160a01b0319918216179182905560078054909116918316919091179055600354604080516309aa46bb60e31b815290519190921691634d5235d8916004808301926020929190829003018186803b158015610e7b57600080fd5b505afa158015610e8f573d6000803e3d6000fd5b505050506040513d6020811015610ea557600080fd5b5051600880546001600160a01b039283166001600160a01b0319918216179182905560098054909116918316919091179055600354604080516303be5dc760e61b81529051919092169163ef9771c0916004808301926020929190829003018186803b158015610f1457600080fd5b505afa158015610f28573d6000803e3d6000fd5b505050506040513d6020811015610f3e57600080fd5b5051600a80546001600160a01b039283166001600160a01b03199182161791829055600b8054909116918316919091179081905560408051635713e43560e11b81529051919092169163ae27c86a916004808301926020929190829003018186803b158015610fac57600080fd5b505afa158015610fc0573d6000803e3d6000fd5b505050506040513d6020811015610fd657600080fd5b5051600c80546001600160a01b03199081166001600160a01b039384161791829055600d805492909316911617905550565b60008083156110225761101b87876117bb565b905061102f565b61102c8787612b5f565b90505b60008061103c83886142d1565b905061104b81620186a061435b565b90506110598161016d61435b565b905061106581866142d1565b9050611071828261425a565b9998505050505050505050565b63ffffffff81166000908152600f60205260409020545b919050565b600d54600160a01b900463ffffffff1681565b600d546040805163c60fe7a360e01b8152600481018590529051600092839283926001600160a01b039092169163c60fe7a3916024808201928692909190829003018186803b1580156110ff57600080fd5b505afa158015611113573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405260e081101561113c57600080fd5b815160208301805160405192949293830192919084600160201b82111561116257600080fd5b90830190602082018581111561117757600080fd5b8251600160201b81118282018810171561119057600080fd5b82525081516020918201929091019080838360005b838110156111bd5781810151838201526020016111a5565b50505050905090810190601f1680156111ea5780820380516001836020036101000a031916815260200191505b506040526060015193955092935050505063ffffffff82166298967f141561121757600092505050610b89565b600061122685620186a06142d1565b9050611232818361435b565b9695505050505050565b63ffffffff166000908152600e602052604090205490565b6060808267ffffffffffffffff8111801561126e57600080fd5b50604051908082528060200260200182016040528015611298578160200160208202803683370190505b50905060005b838163ffffffff161015611365576003546040805163fbe41fdb60e01b81526004810189905263ffffffff80891660248301528416604482015290516000926001600160a01b03169163fbe41fdb916064808301926020929190829003018186803b15801561130c57600080fd5b505afa158015611320573d6000803e3d6000fd5b505050506040513d602081101561133657600080fd5b505183519091508190849063ffffffff851690811061135157fe5b60209081029190910101525060010161129e565b5090505b9392505050565b6002546001600160a01b031681565b600d546040805163c60fe7a360e01b8152600481018590529051600092839283926001600160a01b039092169163c60fe7a3916024808201928692909190829003018186803b1580156113d157600080fd5b505afa1580156113e5573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405260e081101561140e57600080fd5b815160208301805160405192949293830192919084600160201b82111561143457600080fd5b90830190602082018581111561144957600080fd5b8251600160201b81118282018810171561146257600080fd5b82525081516020918201929091019080838360005b8381101561148f578181015183820152602001611477565b50505050905090810190601f1680156114bc5780820380516001836020036101000a031916815260200191505b506040526060015193955092935050505063ffffffff82166298967f14156114e957600092505050610b89565b620186a06114f781836143dd565b9050600061150886620186a06142d1565b9050611514818361435b565b979650505050505050565b600b54604080516386bb3b6360e01b815263ffffffff8086166004830152841660248201529051600092839283928392839283926001600160a01b03909216916386bb3b639160448082019260e092909190829003018186803b15801561158557600080fd5b505afa158015611599573d6000803e3d6000fd5b505050506040513d60e08110156115af57600080fd5b5080516020808301516060840151608085015160a09095015163ffffffff808416600090815260118652604080822092881682529190955290932054939950909750955091935090915060ff161561160f57600095505050505050610b89565b600b5460408051631030e9cd60e21b815263ffffffff808c1660048301528a166024820152815160009384936001600160a01b03909116926340c3a7349260448083019392829003018186803b15801561166857600080fd5b505afa15801561167c573d6000803e3d6000fd5b505050506040513d604081101561169257600080fd5b5080516020909101519092509050846116b45782975050505050505050610b89565b60035460408051631fc5613560e11b815290516000926001600160a01b031691633f8ac26a916004808301926020929190829003018186803b1580156116f957600080fd5b505afa15801561170d573d6000803e3d6000fd5b505050506040513d602081101561172357600080fd5b50519050600061173d8261173742896143dd565b9061435b565b905060008085611758576117518b8b612b5f565b905061175b565b50835b6000611767828b6142d1565b905061177681620186a061435b565b90506117848161016d61435b565b905061179081856142d1565b905061179c838261425a565b92506117a8838961425a565b9f9e505050505050505050505050505050565b63ffffffff808216600090815260116020908152604080832093861683529290529081205460ff16156117f057506000610b89565b60006117fc8484612b5f565b63ffffffff8086166000908152600e602052604090205491925061182291839161425a16565b949350505050565b60035460408051632576d91360e01b81526001600160a01b03868116600483015263ffffffff86166024830152825160009485948594859490921692632576d913926044808201939291829003018186803b15801561188857600080fd5b505afa15801561189c573d6000803e3d6000fd5b505050506040513d60408110156118b257600080fd5b508051602090910151909250905063ffffffff82166298967f14156118df57600080935093505050611984565b60035460408051633e03a0d560e11b81526004810184905263ffffffff8916602482015290516000926001600160a01b031691637c0741aa9160448083019260e0929190829003018186803b15801561193757600080fd5b505afa15801561194b573d6000803e3d6000fd5b505050506040513d60e081101561196157600080fd5b506040015190508261197c63ffffffff82168884868c614455565b945094505050505b935093915050565b6004546001600160a01b031690565b6000546001600160a01b03163314806119be57506001546001600160a01b031633145b6119f4576040805162461bcd60e51b81526020600482015260026024820152610c8d60f21b604482015290519081900360640190fd5b63ffffffff928316600090815260116020908152604080832094909516825292909252919020805460ff1916911515919091179055565b600080611a3c87878686600a611008565b9050611a4b81620f42406142d1565b90506000611a5f8863ffffffff1683613646565b90506000611a73828863ffffffff16612795565b90506000611a838883600a613db8565b9050611a9281620f424061435b565b9a9950505050505050505050565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b03163314611b175760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610c08578181015183820152602001610bf0565b506000819050806001600160a01b031663343f9e486040518163ffffffff1660e01b815260040160206040518083038186803b158015611b5657600080fd5b505afa925050508015611b7b57506040513d6020811015611b7657600080fd5b505160015b611b8457611c0f565b50806001600160a01b031663343f9e486040518163ffffffff1660e01b815260040160206040518083038186803b158015611bbe57600080fd5b505afa158015611bd2573d6000803e3d6000fd5b505050506040513d6020811015611be857600080fd5b5051600d805463ffffffff909216600160a01b0263ffffffff60a01b199092169190911790555b600754604080516334817e0360e11b815290516000926001600160a01b031691636902fc06916004808301926020929190829003018186803b158015611c5457600080fd5b505afa158015611c68573d6000803e3d6000fd5b505050506040513d6020811015611c7e57600080fd5b505163ffffffff16905060005b818163ffffffff1610156122da57600754604080516324461c6160e01b815263ffffffff8416600482015290516000926001600160a01b0316916324461c619160248083019286929190829003018186803b158015611ce957600080fd5b505afa158015611cfd573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610100811015611d2757600080fd5b815160208301805160405192949293830192919084600160201b821115611d4d57600080fd5b908301906020820185811115611d6257600080fd5b8251600160201b811182820188101715611d7b57600080fd5b82525081516020918201929091019080838360005b83811015611da8578181015183820152602001611d90565b50505050905090810190601f168015611dd55780820380516001836020036101000a031916815260200191505b50604081815263354ac6fd60e01b825263ffffffff87166004830152519596506000956001600160a01b038b16955063354ac6fd945060248083019450602093509091829003018186803b158015611e2c57600080fd5b505afa158015611e40573d6000803e3d6000fd5b505050506040513d6020811015611e5657600080fd5b50519050611e64828261309b565b6000856001600160a01b0316631604a696846040518263ffffffff1660e01b8152600401808263ffffffff16815260200191505060206040518083038186803b158015611eb057600080fd5b505afa158015611ec4573d6000803e3d6000fd5b505050506040513d6020811015611eda57600080fd5b50519050611ee88382612590565b60005b858163ffffffff1610156120da57600754604080516324461c6160e01b815263ffffffff8416600482015290516000926001600160a01b0316916324461c619160248083019286929190829003018186803b158015611f4957600080fd5b505afa158015611f5d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610100811015611f8757600080fd5b815160208301805160405192949293830192919084600160201b821115611fad57600080fd5b908301906020820185811115611fc257600080fd5b8251600160201b811182820188101715611fdb57600080fd5b82525081516020918201929091019080838360005b83811015612008578181015183820152602001611ff0565b50505050905090810190601f1680156120355780820380516001836020036101000a031916815260200191505b5060408181526001620f801f60e11b0319825263ffffffff808d16600484015287166024830152519596506000956001600160a01b038f16955063ffe0ffc2945060448083019450602093509091829003018186803b15801561209757600080fd5b505afa1580156120ab573d6000803e3d6000fd5b505050506040513d60208110156120c157600080fd5b505190506120d0868383613931565b5050600101611eeb565b5060005b858163ffffffff1610156122ca57600754604080516324461c6160e01b815263ffffffff8416600482015290516000926001600160a01b0316916324461c619160248083019286929190829003018186803b15801561213c57600080fd5b505afa158015612150573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261010081101561217a57600080fd5b815160208301805160405192949293830192919084600160201b8211156121a057600080fd5b9083019060208201858111156121b557600080fd5b8251600160201b8111828201881017156121ce57600080fd5b82525081516020918201929091019080838360005b838110156121fb5781810151838201526020016121e3565b50505050905090810190601f1680156122285780820380516001836020036101000a031916815260200191505b50604081815263a196ea9560e01b825263ffffffff808d16600484015287166024830152519596506000956001600160a01b038f16955063a196ea95945060448083019450602093509091829003018186803b15801561228757600080fd5b505afa15801561229b573d6000803e3d6000fd5b505050506040513d60208110156122b157600080fd5b505190506122c086838361199b565b50506001016120de565b505060019092019150611c8b9050565b50505050565b600b54604080516386bb3b6360e01b815263ffffffff8087166004830152851660248201529051600092839283928392839283926001600160a01b03909216916386bb3b639160448082019260e092909190829003018186803b15801561234657600080fd5b505afa15801561235a573d6000803e3d6000fd5b505050506040513d60e081101561237057600080fd5b5080516020808301516060840151608085015160a09095015163ffffffff808416600090815260118652604080822092881682529190955290932054939950909750955091935090915060ff16156123d057600095505050505050611369565b826123e15794506113699350505050565b600b5460408051631030e9cd60e21b815263ffffffff808d1660048301528b166024820152815160009384936001600160a01b03909116926340c3a7349260448083019392829003018186803b15801561243a57600080fd5b505afa15801561244e573d6000803e3d6000fd5b505050506040513d604081101561246457600080fd5b50805160209182015160035460408051631fc5613560e11b815290519396509194506000936001600160a01b0390911692633f8ac26a926004808201939291829003018186803b1580156124b757600080fd5b505afa1580156124cb573d6000803e3d6000fd5b505050506040513d60208110156124e157600080fd5b5051905060006124f18b836142d1565b90506124fd814261425a565b9050600061250f83611737848a6143dd565b90506000808661252a576125238c8c612b5f565b905061252d565b50845b6000612539828c6142d1565b905061254881620186a061435b565b90506125568161016d61435b565b905061256281856142d1565b905061256e838261425a565b925061257a838a61425a565b9d50505050505050505050505050509392505050565b6000546001600160a01b03163314806125b357506001546001600160a01b031633145b6125e9576040805162461bcd60e51b81526020600482015260026024820152610c8d60f21b604482015290519081900360640190fd5b63ffffffff9091166000908152600f6020526040902055565b6007546040805163059e086960e51b815263ffffffff841660048201529051600092839283926001600160a01b039092169163b3c10d20916024808201928692909190829003018186803b15801561265957600080fd5b505afa15801561266d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261010081101561269757600080fd5b815160208301805160405192949293830192919084600160201b8211156126bd57600080fd5b9083019060208201858111156126d257600080fd5b8251600160201b8111828201881017156126eb57600080fd5b82525081516020918201929091019080838360005b83811015612718578181015183820152602001612700565b50505050905090810190601f1680156127455780820380516001836020036101000a031916815260200191505b50604052606081015160809091015190965094506000935061276c92508791506139b39050565b9050600061277a83836142d1565b905061278981620186a061435b565b9050611232848261425a565b6007546040805163059e086960e51b815260048101849052905160009260609284926001600160a01b039092169163b3c10d20916024808201928692909190829003018186803b1580156127e857600080fd5b505afa1580156127fc573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261010081101561282657600080fd5b815160208301805160405192949293830192919084600160201b82111561284c57600080fd5b90830190602082018581111561286157600080fd5b8251600160201b81118282018810171561287a57600080fd5b82525081516020918201929091019080838360005b838110156128a757818101518382015260200161288f565b50505050905090810190601f1680156128d45780820380516001836020036101000a031916815260200191505b5060405260200151929550919350505060ff82166063149050806128fb575060ff81166002145b1561290b57600092505050610b89565b604080516000808252602080830193849052600554631834192960e31b90945260ff85166024840190815269021e19e0c9bab240000060648501819052608060448601908152885160a48701528851959694956001600160a01b039095169463c1a0c9489489948b94938a9391929091608485019160c4860191908801908083838f5b838110156129a657818101518382015260200161298e565b50505050905090810190601f1680156129d35780820380516001836020036101000a031916815260200191505b508381038252845181528451602091820191808701910280838360005b83811015612a085781810151838201526020016129f0565b50505050905001965050505050505060206040518083038186803b158015612a2f57600080fd5b505afa158015612a43573d6000803e3d6000fd5b505050506040513d6020811015612a5957600080fd5b505190506000612a738869021e19e0c9bab24000006142d1565b9050612a7f818361435b565b98975050505050505050565b600080600080600080600080600080600360009054906101000a90046001600160a01b03166001600160a01b0316637c0741aa8d8d6040518363ffffffff1660e01b8152600401808381526020018263ffffffff1681526020019250505060e06040518083038186803b158015612b0157600080fd5b505afa158015612b15573d6000803e3d6000fd5b505050506040513d60e0811015612b2b57600080fd5b50805160208201516060830151608084015160a090940151929d50909b509950909750955050505050509295509295909350565b63ffffffff808216600090815260116020908152604080832093861683529290529081205460ff1615612b9457506000610b89565b600d546040805163c60fe7a360e01b815263ffffffff86166004820152905160009283926001600160a01b039091169163c60fe7a3916024808201928692909190829003018186803b158015612be957600080fd5b505afa158015612bfd573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405260e0811015612c2657600080fd5b815160208301805160405192949293830192919084600160201b821115612c4c57600080fd5b908301906020820185811115612c6157600080fd5b8251600160201b811182820188101715612c7a57600080fd5b82525081516020918201929091019080838360005b83811015612ca7578181015183820152602001612c8f565b50505050905090810190601f168015612cd45780820380516001836020036101000a031916815260200191505b50604052608081015160a090910151909650945060009350612cfb92508891506139b39050565b90506000612d0983836142d1565b9050612d1881620186a061435b565b9050611514848261425a565b6040518060400160405280600681526020016518189c18181960d11b81525081565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b03163314612dbd5760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610c08578181015183820152602001610bf0565b50600480546001600160a01b03199081166001600160a01b03938416179182905560058054929093169116179055565b6000546001600160a01b031681565b6004546001600160a01b031681565b6008546001600160a01b031681565b63ffffffff918216600090815260116020908152604080832093909416825291909152205460ff1690565b6000612e5483620f42406142d1565b92506000612e628385613646565b90506000612e708287612795565b9050612e7c86826110ad565b9050612e898487836145f2565b905061123281620f424061435b565b6000612ea782620f42406142d1565b91506113698383613646565b600c546001600160a01b031681565b6002546001600160a01b031690565b600a546001600160a01b031681565b6000806000612ef087878761310d565b600d546040805163c60fe7a360e01b815263ffffffff85166004820152905193955091935060009283926001600160a01b039092169163c60fe7a39160248083019286929190829003018186803b158015612f4a57600080fd5b505afa158015612f5e573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405260e0811015612f8757600080fd5b815160208301805160405192949293830192919084600160201b821115612fad57600080fd5b908301906020820185811115612fc257600080fd5b8251600160201b811182820188101715612fdb57600080fd5b82525081516020918201929091019080838360005b83811015613008578181015183820152602001612ff0565b50505050905090810190601f1680156130355780820380516001836020036101000a031916815260200191505b506040526060015193955092935050505063ffffffff82166298967f1415613064576000945050505050611822565b600061307084836142d1565b905061307f81620186a061435b565b9050611a83878683614637565b6001546001600160a01b031681565b6000546001600160a01b03163314806130be57506001546001600160a01b031633145b6130f4576040805162461bcd60e51b81526020600482015260026024820152610c8d60f21b604482015290519081900360640190fd5b63ffffffff9091166000908152600e6020526040902055565b60035460408051632576d91360e01b81526001600160a01b03868116600483015263ffffffff86166024830152825160009485948594859490921692632576d913926044808201939291829003018186803b15801561316b57600080fd5b505afa15801561317f573d6000803e3d6000fd5b505050506040513d604081101561319557600080fd5b508051602090910151909250905063ffffffff82166298967f14156131c257600080935093505050611984565b60035460408051633e03a0d560e11b81526004810184905263ffffffff8916602482015290516000926001600160a01b031691637c0741aa9160448083019260e0929190829003018186803b15801561321a57600080fd5b505afa15801561322e573d6000803e3d6000fd5b505050506040513d60e081101561324457600080fd5b50604090810151600754825163059e086960e51b815263ffffffff8716600482015292519193506000926001600160a01b039091169163b3c10d20916024808201928692909190829003018186803b15801561329f57600080fd5b505afa1580156132b3573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526101008110156132dd57600080fd5b815160208301805160405192949293830192919084600160201b82111561330357600080fd5b90830190602082018581111561331857600080fd5b8251600160201b81118282018810171561333157600080fd5b82525081516020918201929091019080838360005b8381101561335e578181015183820152602001613346565b50505050905090810190601f16801561338b5780820380516001836020036101000a031916815260200191505b50604052602001519450505060ff831660021491506133b69050576133b387620f42406142d1565b96505b60006133cb8563ffffffff168985878d614455565b905060ff8216600214156133e9576133e681620f42406142d1565b90505b9399939850929650505050505050565b60035460408051632576d91360e01b81526001600160a01b03878116600483015263ffffffff871660248301528251600094859485949390911692632576d9139260448083019392829003018186803b15801561345557600080fd5b505afa158015613469573d6000803e3d6000fd5b505050506040513d604081101561347f57600080fd5b50516007546040805163059e086960e51b815263ffffffff8416600482015290519293506000926001600160a01b039092169163b3c10d20916024808201928692909190829003018186803b1580156134d757600080fd5b505afa1580156134eb573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261010081101561351557600080fd5b815160208301805160405192949293830192919084600160201b82111561353b57600080fd5b90830190602082018581111561355057600080fd5b8251600160201b81118282018810171561356957600080fd5b82525081516020918201929091019080838360005b8381101561359657818101518382015260200161357e565b50505050905090810190601f1680156135c35780820380516001836020036101000a031916815260200191505b50604052602001519450505060ff831660021491506135ee9050576135eb86620f42406142d1565b95505b60006135fc89898989612ee0565b905060ff82166002141561361a5761361781620f42406142d1565b90505b60006136268288612795565b905061363581620f424061435b565b919a91995090975050505050505050565b6007546040805163059e086960e51b815260048101859052905160009260609284926001600160a01b039092169163b3c10d20916024808201928692909190829003018186803b15801561369957600080fd5b505afa1580156136ad573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526101008110156136d757600080fd5b815160208301805160405192949293830192919084600160201b8211156136fd57600080fd5b90830190602082018581111561371257600080fd5b8251600160201b81118282018810171561372b57600080fd5b82525081516020918201929091019080838360005b83811015613758578181015183820152602001613740565b50505050905090810190601f1680156137855780820380516001836020036101000a031916815260200191505b506040526020015192955091935050505060ff81166063148015906137ae575060ff8116600214155b6137e3576040805162461bcd60e51b81526020600482015260016024820152601960f91b604482015290519081900360640190fd5b604080516000808252602080830193849052600554631834192960e31b90945260ff85166024840190815260648401899052608060448501908152875160a4860152875194956001600160a01b03169463c1a0c9489488948a948d948a9491939092608486019260c4870192918901918190849084905b8381101561387257818101518382015260200161385a565b50505050905090810190601f16801561389f5780820380516001836020036101000a031916815260200191505b508381038252845181528451602091820191808701910280838360005b838110156138d45781810151838201526020016138bc565b50505050905001965050505050505060206040518083038186803b1580156138fb57600080fd5b505afa15801561390f573d6000803e3d6000fd5b505050506040513d602081101561392557600080fd5b50519695505050505050565b6000546001600160a01b031633148061395457506001546001600160a01b031633145b61398a576040805162461bcd60e51b81526020600482015260026024820152610c8d60f21b604482015290519081900360640190fd5b63ffffffff92831660009081526010602090815260408083209490951682529290925291902055565b6007546040805163059e086960e51b815263ffffffff84166004820152905160009283926001600160a01b039091169163b3c10d20916024808201928692909190829003018186803b158015613a0857600080fd5b505afa158015613a1c573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610100811015613a4657600080fd5b815160208301805160405192949293830192919084600160201b821115613a6c57600080fd5b908301906020820185811115613a8157600080fd5b8251600160201b811182820188101715613a9a57600080fd5b82525081516020918201929091019080838360005b83811015613ac7578181015183820152602001613aaf565b50505050905090810190601f168015613af45780820380516001836020036101000a031916815260200191505b506040526020015160ff169450505060028314159150613b1a9050576000915050611095565b600354604080516301c88f5960e21b815263ffffffff8616600482015290516000926001600160a01b0316916307223d64916024808301926020929190829003018186803b158015613b6b57600080fd5b505afa158015613b7f573d6000803e3d6000fd5b505050506040513d6020811015613b9557600080fd5b5051600b546040805162f2aeff60e81b815263ffffffff8816600482015290519293506000926001600160a01b039092169163f2aeff0091602480820192602092909190829003018186803b158015613bed57600080fd5b505afa158015613c01573d6000803e3d6000fd5b505050506040513d6020811015613c1757600080fd5b505190506000613c2a620186a0836142d1565b90508215613c4357613c3c818461435b565b9050613c47565b5060005b95945050505050565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b03163314613cc75760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610c08578181015183820152602001610bf0565b5060408051808201909152600681526518189c18181960d11b60208201526001600160a01b038216613d3a5760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610c08578181015183820152602001610bf0565b50600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6040518060400160405280600681526020016530313830303160d01b81525081565b6007546040805163059e086960e51b815263ffffffff86166004820152905160009283926001600160a01b039091169163b3c10d20916024808201928692909190829003018186803b158015613e0d57600080fd5b505afa158015613e21573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610100811015613e4b57600080fd5b815160208301805160405192949293830192919084600160201b821115613e7157600080fd5b908301906020820185811115613e8657600080fd5b8251600160201b811182820188101715613e9f57600080fd5b82525081516020918201929091019080838360005b83811015613ecc578181015183820152602001613eb4565b50505050905090810190601f168015613ef95780820380516001836020036101000a031916815260200191505b506040526020015160ff169450505060028314159150613f479050576040805162461bcd60e51b8152602060048201526002602482015261333760f01b604482015290519081900360640190fd5b6000613f5286612602565b9050613f5e81856142d1565b9050613f6c8161016d61435b565b9050613f7b85620186a06142d1565b94506000611514868361435b565b6006546001600160a01b031681565b63ffffffff918216600090815260106020908152604080832093909416825291909152205490565b6007546040805163059e086960e51b815263ffffffff87166004820152905160009283926001600160a01b039091169163b3c10d20916024808201928692909190829003018186803b15801561401557600080fd5b505afa158015614029573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261010081101561405357600080fd5b815160208301805160405192949293830192919084600160201b82111561407957600080fd5b90830190602082018581111561408e57600080fd5b8251600160201b8111828201881017156140a757600080fd5b82525081516020918201929091019080838360005b838110156140d45781810151838201526020016140bc565b50505050905090810190601f1680156141015780820380516001836020036101000a031916815260200191505b506040818152602092830151600354631fc5613560e11b8452915160ff9091169850600097506001600160a01b039091169550633f8ac26a9450600480830194509091829003018186803b15801561415857600080fd5b505afa15801561416c573d6000803e3d6000fd5b505050506040513d602081101561418257600080fd5b50519050600061419682611737428a6143dd565b905060028314156141a957849550614204565b6003831415614204576141bf86620f42406142d1565b955060006141d38963ffffffff1688613646565b600d549091506141f1908290600160a01b900463ffffffff16612795565b965061420087620f424061435b565b9650505b600061420f89612602565b9050600061421d82896142d1565b905061422c81620186a061435b565b9050600061423c8261016d61435b565b9050600061424a82866142d1565b9c9b505050505050505050505050565b60408051808201909152600681526530303830303160d01b602082015282820190838210156142ca5760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610c08578181015183820152602001610bf0565b5092915050565b6000826142e057506000610b89565b50818102818382816142ee57fe5b04146040518060400160405280600681526020016530303830303160d01b815250906142ca5760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610c08578181015183820152602001610bf0565b60008082116040518060400160405280600681526020016530303830303360d01b815250906143cb5760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610c08578181015183820152602001610bf0565b508183816143d557fe5b049392505050565b6000828211156040518060400160405280600681526020016518181c18181960d11b8152509061444e5760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315610c08578181015183820152602001610bf0565b5050900390565b6007546040805163059e086960e51b815260048101889052905160009260609284926001600160a01b039092169163b3c10d20916024808201928692909190829003018186803b1580156144a857600080fd5b505afa1580156144bc573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526101008110156144e657600080fd5b815160208301805160405192949293830192919084600160201b82111561450c57600080fd5b90830190602082018581111561452157600080fd5b8251600160201b81118282018810171561453a57600080fd5b82525081516020918201929091019080838360005b8381101561456757818101518382015260200161454f565b50505050905090810190601f1680156145945780820380516001836020036101000a031916815260200191505b506040526020015192955091935050505060ff8116606314156145e2576040805162461bcd60e51b81526020600482015260016024820152601960f91b604482015290519081900360640190fd5b600061107182848a8a8a8a61467c565b6000806145ff8486613f98565b90508015806146105750620186a081145b1561461e5782915050611369565b61462b83620186a06142d1565b9250613c47838261435b565b6000806146448486613f98565b90508015806146555750620186a081145b156146635782915050611369565b61466d83826142d1565b9250613c4783620186a061435b565b6000606061468b848487611254565b600554604051631834192960e31b815260ff8b1660048201908152604482018a90526080602483019081528b5160848401528b519495506001600160a01b039093169363c1a0c948938d938d938d9389939192606481019160a490910190602088019080838360005b8381101561470c5781810151838201526020016146f4565b50505050905090810190601f1680156147395780820380516001836020036101000a031916815260200191505b508381038252845181528451602091820191808701910280838360005b8381101561476e578181015183820152602001614756565b50505050905001965050505050505060206040518083038186803b15801561479557600080fd5b505afa1580156147a9573d6000803e3d6000fd5b505050506040513d60208110156147bf57600080fd5b50519897505050505050505056fea2646970667358221220164f1a1e7ea20a97aebf69f6b7b765fb3eaa458c2a19632e2702005eaf7e04db64736f6c634300060c0033";


const liqlev_bytecode = '0x6080604052600280546001600160a01b0319908116909155600480548216905560068054821690556008805482169055600a805482169055600c805482169055600e8054909116905534801561005457600080fd5b50600080546001600160a01b03191633179055600180556149578061007a6000396000f3fe608060405234801561001057600080fd5b50600436106101fb5760003560e01c80639377b9b01161011a578063cfbeb9d4116100ad578063f0329f6b1161007c578063f0329f6b1461079b578063f2fde38b146107a3578063f3fe3bc3146107c9578063fa5019f9146107d1578063fdd9545f146107d9576101fb565b8063cfbeb9d414610679578063d16043e2146106d6578063d35ffcf014610713578063d500958414610793576101fb565b8063ab94276a116100e9578063ab94276a1461061b578063aeac19e214610623578063c27f28f91461062b578063c50303e914610671576101fb565b80639377b9b014610599578063950fc602146105bf578063995b63bd146105c7578063aa79f9f814610613576101fb565b80635db53b23116101925780638c1f5f97116101615780638c1f5f97146105115780638da5cb5b146105195780638f35835a146105215780638ffc4ffa14610567576101fb565b80635db53b23146103e25780637237a66d1461044b57806372c0ffe314610471578063860d248a14610494576101fb565b8063452de525116101ce578063452de525146102d85780634db0879f146102fe5780635265b1ad146103215780635bee605b14610367576101fb565b80630ec2e821146102005780631ea46ced146102285780632ee251f2146102705780633caeb75e146102b4575b600080fd5b6102266004803603602081101561021657600080fd5b50356001600160a01b0316610816565b005b610226600480360360a081101561023e57600080fd5b506001600160a01b038135169063ffffffff602082013581169160408101359091169060608101359060800135610bef565b6102a26004803603604081101561028657600080fd5b5080356001600160a01b0316906020013563ffffffff16610e68565b60408051918252519081900360200190f35b6102bc611017565b604080516001600160a01b039092168252519081900360200190f35b610226600480360360208110156102ee57600080fd5b50356001600160a01b0316611026565b6102266004803603602081101561031457600080fd5b503563ffffffff166110c0565b6102266004803603608081101561033757600080fd5b5080356001600160a01b031690602081013563ffffffff908116916040810135909116906060013560ff166111f9565b6103936004803603604081101561037d57600080fd5b506001600160a01b0381351690602001356118de565b604051808863ffffffff1681526020018781526020018681526020018563ffffffff1681526020018481526020018381526020018260ff16815260200197505050505050505060405180910390f35b6103ea611b6a565b604051808363ffffffff16815260200180602001828103825283818151815260200191508051906020019060200280838360005b8381101561043657818101518382015260200161041e565b50505050905001935050505060405180910390f35b6102266004803603602081101561046157600080fd5b50356001600160a01b0316611de1565b6103ea6004803603602081101561048757600080fd5b503563ffffffff16611fa1565b61049c612165565b6040805160208082528351818301528351919283929083019185019080838360005b838110156104d65781810151838201526020016104be565b50505050905090810190601f1680156105035780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610226612187565b6102bc61234d565b61054c6004803603604081101561053757600080fd5b5063ffffffff8135811691602001351661235c565b60408051921515835260208301919091528051918290030190f35b6102266004803603604081101561057d57600080fd5b5080356001600160a01b0316906020013563ffffffff166123f6565b610226600480360360208110156105af57600080fd5b50356001600160a01b031661293b565b6102bc612a25565b6105f3600480360360408110156105dd57600080fd5b506001600160a01b038135169060200135612a34565b6040805163ffffffff909316835260208301919091528051918290030190f35b6102bc612ae4565b6102bc612af3565b6102bc612b02565b61064e6004803603602081101561064157600080fd5b503563ffffffff16612b11565b604080516001600160a01b03909316835260208301919091528051918290030190f35b6102a2612b9b565b6106b66004803603606081101561068f57600080fd5b50803563ffffffff90811691602081013590911690604001356001600160a01b0316612ba1565b604080519315158452602084019290925282820152519081900360600190f35b6106b6600480360360608110156106ec57600080fd5b50803563ffffffff90811691602081013590911690604001356001600160a01b0316612c93565b61073e6004803603604081101561072957600080fd5b5063ffffffff81358116916020013516612d53565b604051808863ffffffff1681526020018781526020018681526020018581526020018463ffffffff1681526020018363ffffffff1681526020018260ff16815260200197505050505050505060405180910390f35b6102bc612f58565b6102bc612f67565b610226600480360360208110156107b957600080fd5b50356001600160a01b0316612f76565b61049c6130bc565b6102bc6130de565b6106b6600480360360608110156107ef57600080fd5b50803563ffffffff90811691602081013590911690604001356001600160a01b03166130ed565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b031633146108ca5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561088f578181015183820152602001610877565b50505050905090810190601f1680156108bc5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600480546001600160a01b038084166001600160a01b031992831617808455600580549093169082161791829055604080516366afa89360e01b8152905192909116926366afa893928282019260209290829003018186803b15801561093057600080fd5b505afa158015610944573d6000803e3d6000fd5b505050506040513d602081101561095a57600080fd5b5051600c80546001600160a01b039283166001600160a01b03199182161791829055600d80549091169183169190911790556005546040805163bae0b81560e01b81529051919092169163bae0b815916004808301926020929190829003018186803b1580156109c957600080fd5b505afa1580156109dd573d6000803e3d6000fd5b505050506040513d60208110156109f357600080fd5b5051600e80546001600160a01b039283166001600160a01b03199182161791829055600f8054909116918316919091179055600554604080516382d726f960e01b8152905191909216916382d726f9916004808301926020929190829003018186803b158015610a6257600080fd5b505afa158015610a76573d6000803e3d6000fd5b505050506040513d6020811015610a8c57600080fd5b5051600880546001600160a01b039283166001600160a01b0319918216179182905560098054909116918316919091179055600554604080516303be5dc760e61b81529051919092169163ef9771c0916004808301926020929190829003018186803b158015610afb57600080fd5b505afa158015610b0f573d6000803e3d6000fd5b505050506040513d6020811015610b2557600080fd5b5051600680546001600160a01b039283166001600160a01b0319918216179182905560078054909116918316919091179081905560408051635713e43560e11b81529051919092169163ae27c86a916004808301926020929190829003018186803b158015610b9357600080fd5b505afa158015610ba7573d6000803e3d6000fd5b505050506040513d6020811015610bbd57600080fd5b5051600a80546001600160a01b03199081166001600160a01b039384161791829055600b805492909316911617905550565b6000546001600160a01b0316331480610c1257506002546001600160a01b031633145b80610c2757506006546001600160a01b031633145b80610c3c57506004546001600160a01b031633145b610c72576040805162461bcd60e51b81526020600482015260026024820152610c8d60f21b604482015290519081900360640190fd5b6000806000610c81878761345d565b94509450509350506000610c96898386613538565b50905085811015610cd3576040805162461bcd60e51b8152602060048201526002602482015261333960f01b604482015290519081900360640190fd5b84831015610d0d576040805162461bcd60e51b8152602060048201526002602482015261034360f41b604482015290519081900360640190fd5b6007546040805163e4ca83cf60e01b81526001600160a01b038c8116600483015263ffffffff8b166024830152604482018990529151919092169163e4ca83cf91606480830192600092919082900301818387803b158015610d6e57600080fd5b505af1925050508015610d7f575060015b610db5576040805162461bcd60e51b8152602060048201526002602482015261343160f01b604482015290519081900360640190fd5b6007546040805163d121553960e01b81526001600160a01b038c8116600483015263ffffffff86166024830152604482018a90529151919092169163d121553991606480830192600092919082900301818387803b158015610e1657600080fd5b505af1925050508015610e27575060015b610e5d576040805162461bcd60e51b81526020600482015260026024820152611a1960f11b604482015290519081900360640190fd5b505050505050505050565b60075460408051630bf140b160e31b81526001600160a01b03858116600483015263ffffffff8516602483015282516000948594921692635f8a0588926044808301939192829003018186803b158015610ec157600080fd5b505afa158015610ed5573d6000803e3d6000fd5b505050506040513d6040811015610eeb57600080fd5b5060200151600754604080516386bb3b6360e01b815263ffffffff808516600483015287166024820152905192935060009283926001600160a01b0316916386bb3b639160448083019260e0929190829003018186803b158015610f4e57600080fd5b505afa158015610f62573d6000803e3d6000fd5b505050506040513d60e0811015610f7857600080fd5b508051602091820151600f5460408051634228960360e11b815263ffffffff851660048201526024810184905290519396509194506000936001600160a01b03909116926384512c06926044808201939291829003018186803b158015610fde57600080fd5b505afa158015610ff2573d6000803e3d6000fd5b505050506040513d602081101561100857600080fd5b50519450505050505b92915050565b600e546001600160a01b031681565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b0316331461109d5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561088f578181015183820152602001610877565b50600280546001600160a01b0319166001600160a01b0392909216919091179055565b6000546001600160a01b03163314806110e357506002546001600160a01b031633145b806110f857506006546001600160a01b031633145b8061110d57506004546001600160a01b031633145b611143576040805162461bcd60e51b81526020600482015260026024820152610c8d60f21b604482015290519081900360640190fd5b6007546040805163272edf7b60e01b815263ffffffff84166004820152815160009384936001600160a01b039091169263272edf7b9260248083019392829003018186803b15801561119457600080fd5b505afa1580156111a8573d6000803e3d6000fd5b505050506040513d60408110156111be57600080fd5b508051602090910151909250905060005b818163ffffffff1610156111f3576111e8848285612c93565b5050506001016111cf565b50505050565b600180548101908190556001600160a01b0385163314611245576040805162461bcd60e51b81526020600482015260026024820152610ccd60f21b604482015290519081900360640190fd5b6112508584846136a8565b611289576040805162461bcd60e51b81526020600482015260056024820152641a1a979a1b60d91b604482015290519081900360640190fd5b60075460408051630bf140b160e31b81526001600160a01b03888116600483015263ffffffff8716602483015282516000949190911692635f8a05889260448082019391829003018186803b1580156112e157600080fd5b505afa1580156112f5573d6000803e3d6000fd5b505050506040513d604081101561130b57600080fd5b506020015160055460408051632576d91360e01b81526001600160a01b038a8116600483015263ffffffff8a166024830152825194955060009485949190911692632576d9139260448082019391829003018186803b15801561136d57600080fd5b505afa158015611381573d6000803e3d6000fd5b505050506040513d604081101561139757600080fd5b508051602090910151909250905063ffffffff82166298967f148015906113c3575063ffffffff821615155b6113f9576040805162461bcd60e51b8152602060048201526002602482015261031360f41b604482015290519081900360640190fd5b60075460408051631030e9cd60e21b815263ffffffff808716600483015289166024820152815160009384936001600160a01b03909116926340c3a7349260448083019392829003018186803b15801561145257600080fd5b505afa158015611466573d6000803e3d6000fd5b505050506040513d604081101561147c57600080fd5b50805160209091015160055460408051633e03a0d560e11b81526004810188905263ffffffff8e16602482015290519395509193506000926001600160a01b0390911691637c0741aa9160448083019260e0929190829003018186803b1580156114e557600080fd5b505afa1580156114f9573d6000803e3d6000fd5b505050506040513d60e081101561150f57600080fd5b50602001516009546040805163059e086960e51b815263ffffffff8916600482015290519293506000926001600160a01b039092169163b3c10d20916024808201928692909190829003018186803b15801561156a57600080fd5b505afa15801561157e573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526101008110156115a857600080fd5b815160208301805160405192949293830192919084600160201b8211156115ce57600080fd5b9083019060208201858111156115e357600080fd5b8251600160201b8111828201881017156115fc57600080fd5b82525081516020918201929091019080838360005b83811015611629578181015183820152602001611611565b50505050905090810190601f1680156116565780820380516001836020036101000a031916815260200191505b506040818152918201516005546369940d7960e01b835292519097506001600160a01b0390921695506369940d799450600480820194506020935090829003018186803b1580156116a657600080fd5b505afa1580156116ba573d6000803e3d6000fd5b505050506040513d60208110156116d057600080fd5b50516001600160a01b03828116911614611715576040805162461bcd60e51b81526020600482015260016024820152601960f91b604482015290519081900360640190fd5b6000611725888c89868e8a613720565b90506117378d898d8f858f8b8b613c54565b6117448d8d836000613d63565b611779576040805162461bcd60e51b81526020600482015260016024820152603360f81b604482015290519081900360640190fd5b60006117888e8d8d8989613df8565b9050600760009054906101000a90046001600160a01b03166001600160a01b031663986f65748a8e846040518463ffffffff1660e01b8152600401808463ffffffff1681526020018363ffffffff1681526020018281526020019350505050600060405180830381600087803b15801561180157600080fd5b505af1158015611815573d6000803e3d6000fd5b505050507f9c262d5b63a248052313b7cd254dfb1aa8b1920a144147357f9a4a3278315c8f8e8e8e8b864260405180876001600160a01b031681526020018663ffffffff1681526020018563ffffffff1681526020018463ffffffff168152602001838152602001828152602001965050505050505060405180910390a150505050505050505060015481146118d7576040805162461bcd60e51b8152602060048201526002602482015261191960f11b604482015290519081900360640190fd5b5050505050565b6000808080808080805b60035463ffffffff82161015611b4157896001600160a01b031660038263ffffffff168154811061191557fe5b60009182526020909120600390910201546001600160a01b03161415611b395760005b60038263ffffffff168154811061194b57fe5b600091825260209091206002600390920201015463ffffffff9081169082161015611b37578960038363ffffffff168154811061198457fe5b6000918252602080832063ffffffff8681168552600393909302016001019052604090912060040154161415611b2f5760038263ffffffff16815481106119c757fe5b906000526020600020906003020160010160008263ffffffff16815260200190815260200160002060040160049054906101000a900463ffffffff16828260038563ffffffff1681548110611a1857fe5b6000918252602080832063ffffffff888116855260039384029091016001019091526040909220548154908316928816908110611a5157fe5b906000526020600020906003020160010160008663ffffffff1681526020019081526020016000206001015460038763ffffffff1681548110611a9057fe5b906000526020600020906003020160010160008763ffffffff1681526020019081526020016000206002015460038863ffffffff1681548110611acf57fe5b906000526020600020906003020160010160008863ffffffff16815260200190815260200160002060040160089054906101000a900460ff168563ffffffff1695508463ffffffff16945098509850985098509850985098505050611b5e565b600101611938565b505b6001016118e8565b506298967f60008060008060008096509650965096509650965096505b92959891949750929550565b600080546060906001600160a01b0316331480611b9157506002546001600160a01b031633145b80611ba657506006546001600160a01b031633145b80611bbb57506004546001600160a01b031633145b611bf1576040805162461bcd60e51b81526020600482015260026024820152610c8d60f21b604482015290519081900360640190fd5b6007546040805163e05d4c7d60e01b815290516000926001600160a01b03169163e05d4c7d916004808301926020929190829003018186803b158015611c3657600080fd5b505afa158015611c4a573d6000803e3d6000fd5b505050506040513d6020811015611c6057600080fd5b5051905060608167ffffffffffffffff81118015611c7d57600080fd5b50604051908082528060200260200182016040528015611ca7578160200160208202803683370190505b5090506000805b838163ffffffff161015611dd7576000838263ffffffff1681518110611cd057fe5b911515602092830291909101909101526007546040805163272edf7b60e01b815263ffffffff84166004820152815160009384936001600160a01b039091169263272edf7b9260248083019392829003018186803b158015611d3157600080fd5b505afa158015611d45573d6000803e3d6000fd5b505050506040513d6040811015611d5b57600080fd5b508051602090910151909250905060005b818163ffffffff161015611dcc576000611d87858386612ba1565b505090508015611d98576001909501945b8015611dc3576001878663ffffffff1681518110611db257fe5b911515602092830291909101909101525b50600101611d6c565b505050600101611cae565b5093509150509091565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b03163314611e585760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561088f578181015183820152602001610877565b5060008190506000816001600160a01b031663c50303e96040518163ffffffff1660e01b815260040160206040518083038186803b158015611e9957600080fd5b505afa158015611ead573d6000803e3d6000fd5b505050506040513d6020811015611ec357600080fd5b5051905060005b818163ffffffff1610156111f357600080846001600160a01b031663c27f28f9846040518263ffffffff1660e01b8152600401808263ffffffff168152602001915050604080518083038186803b158015611f2457600080fd5b505afa158015611f38573d6000803e3d6000fd5b505050506040513d6040811015611f4e57600080fd5b508051602090910151909250905060005b818163ffffffff161015611f9657611f756148d5565b611f80878684613e5f565b9050611f8c8482614048565b5050600101611f5f565b505050600101611eca565b600080546060906001600160a01b0316331480611fc857506002546001600160a01b031633145b80611fdd57506006546001600160a01b031633145b80611ff257506004546001600160a01b031633145b612028576040805162461bcd60e51b81526020600482015260026024820152610c8d60f21b604482015290519081900360640190fd5b6007546040805163272edf7b60e01b815263ffffffff86166004820152815160009384936001600160a01b039091169263272edf7b9260248083019392829003018186803b15801561207957600080fd5b505afa15801561208d573d6000803e3d6000fd5b505050506040513d60408110156120a357600080fd5b508051602090910151909250905060608167ffffffffffffffff811180156120ca57600080fd5b506040519080825280602002602001820160405280156120f4578160200160208202803683370190505b5090506000805b838163ffffffff161015612158576000612116898388612ba1565b50509050801561214f5781848463ffffffff168151811061213357fe5b63ffffffff909216602092830291909101909101526001909201915b506001016120fb565b509450925050505b915091565b6040518060400160405280600681526020016518189c18181960d11b81525081565b6000546001600160a01b03163314806121aa57506002546001600160a01b031633145b806121bf57506006546001600160a01b031633145b806121d457506004546001600160a01b031633145b61220a576040805162461bcd60e51b81526020600482015260026024820152610c8d60f21b604482015290519081900360640190fd5b6007546040805163e05d4c7d60e01b815290516000926001600160a01b03169163e05d4c7d916004808301926020929190829003018186803b15801561224f57600080fd5b505afa158015612263573d6000803e3d6000fd5b505050506040513d602081101561227957600080fd5b5051905060005b818163ffffffff161015612349576007546040805163272edf7b60e01b815263ffffffff84166004820152815160009384936001600160a01b039091169263272edf7b9260248083019392829003018186803b1580156122df57600080fd5b505afa1580156122f3573d6000803e3d6000fd5b505050506040513d604081101561230957600080fd5b508051602090910151909250905060005b818163ffffffff16101561233e57612333848285612c93565b50505060010161231a565b505050600101612280565b5050565b6000546001600160a01b031681565b60008060038463ffffffff168154811061237257fe5b906000526020600020906003020160010160008463ffffffff16815260200190815260200160002060040160099054906101000a900460ff1660038563ffffffff16815481106123be57fe5b906000526020600020906003020160010160008563ffffffff16815260200190815260200160002060050154915091505b9250929050565b600180548101908190556001600160a01b0383163314612442576040805162461bcd60e51b81526020600482015260026024820152610ccd60f21b604482015290519081900360640190fd5b600080600080612458878763ffffffff166118de565b50509450509350935093506000811161249d576040805162461bcd60e51b8152602060048201526002602482015261343760f01b604482015290519081900360640190fd5b60055460408051632576d91360e01b81526001600160a01b038a8116600483015263ffffffff8816602483015282516000949190911692632576d9139260448082019391829003018186803b1580156124f557600080fd5b505afa158015612509573d6000803e3d6000fd5b505050506040513d604081101561251f57600080fd5b5060200151600554600380549293506001600160a01b0390911691634585c2a19184918991908990811061254f57fe5b600091825260208083208a845260016003909302018201905260408083209091015481516001600160e01b031960e088901b168152600481019590955263ffffffff93909316602485015260448401929092526064830181905242608484015260a48301819052905160c48084019382900301818387803b1580156125d357600080fd5b505af11580156125e7573d6000803e3d6000fd5b505060075460408051630bf140b160e31b81526001600160a01b038d8116600483015263ffffffff8d16602483015282516000965093169350635f8a05889260448083019392829003018186803b15801561264157600080fd5b505afa158015612655573d6000803e3d6000fd5b505050506040513d604081101561266b57600080fd5b5060200151600754600380549293506001600160a01b0390911691637d3d31169184918c91908a90811061269b57fe5b9060005260206000209060030201600101600089815260200190815260200160002060040160099054906101000a900460ff1660038a815481106126db57fe5b906000526020600020906003020160010160008a8152602001908152602001600020600501546040518563ffffffff1660e01b8152600401808563ffffffff1681526020018463ffffffff1681526020018315158152602001828152602001945050505050600060405180830381600087803b15801561275a57600080fd5b505af115801561276e573d6000803e3d6000fd5b505050507f8aa4737827f454d7c009fc7a8dd1e63764850cdae60dd52373fbc2f105974fd3898988600389815481106127a357fe5b600091825260208083208b84526001600390930201820181526040928390209091015482516001600160a01b03909616865263ffffffff9485169186019190915291909216838301526060830152426080830152519081900360a00190a160006003868154811061281057fe5b906000526020600020906003020160010160008681526020019081526020016000206001018190555060006003868154811061284857fe5b906000526020600020906003020160010160008681526020019081526020016000206002018190555060006003868154811061288057fe5b90600052602060002090600302016001016000868152602001908152602001600020600301819055506000600386815481106128b857fe5b9060005260206000209060030201600101600086815260200190815260200160002060040160086101000a81548160ff021916908360ff1602179055505050505050506001548114612936576040805162461bcd60e51b8152602060048201526002602482015261191960f11b604482015290519081900360640190fd5b505050565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b031633146129b25760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561088f578181015183820152602001610877565b506000819050612349816001600160a01b031663ab94276a6040518163ffffffff1660e01b815260040160206040518083038186803b1580156129f457600080fd5b505afa158015612a08573d6000803e3d6000fd5b505050506040513d6020811015612a1e57600080fd5b5051610816565b600c546001600160a01b031681565b60008060005b60035463ffffffff82161015612ad457846001600160a01b031660038263ffffffff1681548110612a6757fe5b60009182526020909120600390910201546001600160a01b03161415612acc5760038163ffffffff1681548110612a9a57fe5b600091825260208083208784526001600390930201919091019052604090205463ffffffff90811693501690506123ef565b600101612a3a565b506298967f946000945092505050565b600a546001600160a01b031681565b6004546001600160a01b031690565b6006546001600160a01b031681565b60035460009081906000190163ffffffff841610612b3457506000905080612160565b60038363ffffffff1681548110612b4757fe5b600091825260209091206003918202015481546001600160a01b03909116919063ffffffff8616908110612b7757fe5b600091825260209091206002600390920201015490925063ffffffff169050915091565b60035490565b60008054819081906001600160a01b0316331480612bc957506002546001600160a01b031633145b80612bde57506006546001600160a01b031633145b80612bf357506004546001600160a01b031633145b612c29576040805162461bcd60e51b81526020600482015260026024820152610c8d60f21b604482015290519081900360640190fd5b6000806000612c38898961345d565b94509450509350506000612c4d888386613538565b5090506000806000612c608d8d8d6130ed565b92509250925083821180612c7357508581115b15612c7e5750829050845b91985096509450505050505b93509350939050565b60008054819081906001600160a01b0316331480612cbb57506002546001600160a01b031633145b80612cd057506006546001600160a01b031633145b80612ce557506004546001600160a01b031633145b612d1b576040805162461bcd60e51b81526020600482015260026024820152610c8d60f21b604482015290519081900360640190fd5b6000806000612d2b898989612ba1565b9250925092508215612d4457612d44878a8a8585610bef565b91989097509095509350505050565b600080600080600080600060038963ffffffff1681548110612d7157fe5b6000918252602080832063ffffffff8c8116855260039384029091016001019091526040909220548154908316928c16908110612daa57fe5b906000526020600020906003020160010160008a63ffffffff1681526020019081526020016000206001015460038b63ffffffff1681548110612de957fe5b906000526020600020906003020160010160008b63ffffffff1681526020019081526020016000206002015460038c63ffffffff1681548110612e2857fe5b906000526020600020906003020160010160008c63ffffffff1681526020019081526020016000206003015460038d63ffffffff1681548110612e6757fe5b906000526020600020906003020160010160008d63ffffffff16815260200190815260200160002060040160009054906101000a900463ffffffff1660038e63ffffffff1681548110612eb657fe5b906000526020600020906003020160010160008e63ffffffff16815260200190815260200160002060040160049054906101000a900463ffffffff1660038f63ffffffff1681548110612f0557fe5b906000526020600020906003020160010160008f63ffffffff16815260200190815260200160002060040160089054906101000a900460ff16965096509650965096509650965092959891949750929550565b6002546001600160a01b031690565b6002546001600160a01b031681565b60005460408051808201909152600681526530313830303160d01b6020820152906001600160a01b03163314612fed5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561088f578181015183820152602001610877565b5060408051808201909152600681526518189c18181960d11b60208201526001600160a01b0382166130605760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561088f578181015183820152602001610877565b50600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6040518060400160405280600681526020016530313830303160d01b81525081565b6008546001600160a01b031681565b60008054819081906001600160a01b031633148061311557506002546001600160a01b031633145b8061312a57506006546001600160a01b031633145b8061313f57506004546001600160a01b031633145b613175576040805162461bcd60e51b81526020600482015260026024820152610c8d60f21b604482015290519081900360640190fd5b60008060008060006131878b8b61345d565b94509450945094509450600061319e8a8387613538565b509050846007146131b9576131b681620f424061451f565b90505b6131c683620f424061451f565b600f546040805163be2148a160e01b81526001600160a01b038e8116600483015263ffffffff808a166024840152604483018790528b1660648301529151939650600093919092169163be2148a1916084808301926020929190829003018186803b15801561323457600080fd5b505afa158015613248573d6000803e3d6000fd5b505050506040513d602081101561325e57600080fd5b5051600f5460408051631c953e6d60e31b815263ffffffff8b1660048201526024810188905290519293506000926001600160a01b039092169163e4a9f36891604480820192602092909190829003018186803b1580156132be57600080fd5b505afa1580156132d2573d6000803e3d6000fd5b505050506040513d60208110156132e857600080fd5b5051905060078714156133055761330282620f424061451f565b91505b600f5460408051630b02534b60e11b815263ffffffff8b16600482015290516000928392839283926001600160a01b031691631604a696916024808301926020929190829003018186803b15801561335c57600080fd5b505afa158015613370573d6000803e3d6000fd5b505050506040513d602081101561338657600080fd5b50519050806133955750620186a05b60006133a1868361451f565b90506133b081620186a06145b0565b9050808710156133bf57600194505b8415613440578b600714613418576133d986888f8f614632565b90945092506133eb84620f42406145b0565b93506133fa83620f42406145b0565b9250600184849f509f509f5050505050505050505050505050612c8a565b6001886134288c620f42406145b0565b9f509f509f5050505050505050505050505050612c8a565b60008060009f509f509f5050505050505050505050505050612c8a565b600080600080600080600080600080600760009054906101000a90046001600160a01b03166001600160a01b03166386bb3b638d8d6040518363ffffffff1660e01b8152600401808363ffffffff1681526020018263ffffffff1681526020019250505060e06040518083038186803b1580156134d957600080fd5b505afa1580156134ed573d6000803e3d6000fd5b505050506040513d60e081101561350357600080fd5b50805160208201516040830151606084015160c090940151929d50909b50909950909750955050505050509295509295909350565b600754604080516399db826560e01b81526001600160a01b03868116600483015263ffffffff8616602483015282516000948594859493909116926399db82659260448083019392829003018186803b15801561359457600080fd5b505afa1580156135a8573d6000803e3d6000fd5b505050506040513d60408110156135be57600080fd5b506020015160075460408051632ae79c7160e11b815263ffffffff808516600483015289166024820152905192935060009283926001600160a01b0316916355cf38e29160448083019260e0929190829003018186803b15801561362157600080fd5b505afa158015613635573d6000803e3d6000fd5b505050506040513d60e081101561364b57600080fd5b508051602090910151909250905063ffffffff8083169087161461369b576040805162461bcd60e51b8152602060048201526002602482015261066760f31b604482015290519081900360640190fd5b9791965090945050505050565b60008160ff16601914806136bf57508160ff166032145b806136cd57508160ff16604b145b806136db57508160ff166064145b6136e757506000613719565b60006136f9858563ffffffff166118de565b505094505050505080600014613713576000915050613719565b60019150505b9392505050565b600754604080516386bb3b6360e01b815263ffffffff808a1660048301528816602482015290516000928392839283926001600160a01b0316916386bb3b639160448083019260e0929190829003018186803b15801561377f57600080fd5b505afa158015613793573d6000803e3d6000fd5b505050506040513d60e08110156137a957600080fd5b5080516020820151606090920151600b546040805163c60fe7a360e01b815263ffffffff8516600482015290519397509395509093506000926001600160a01b039091169163c60fe7a3916024808201928692909190829003018186803b15801561381357600080fd5b505afa158015613827573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405260e081101561385057600080fd5b815160208301805160405192949293830192919084600160201b82111561387657600080fd5b90830190602082018581111561388b57600080fd5b8251600160201b8111828201881017156138a457600080fd5b82525081516020918201929091019080838360005b838110156138d15781810151838201526020016138b9565b50505050905090810190601f1680156138fe5780820380516001836020036101000a031916815260200191505b5060405260200151945050505060ff821660631480159150613924575060ff8116600214155b61395a576040805162461bcd60e51b8152602060048201526002602482015261323760f01b604482015290519081900360640190fd5b6009546040805163059e086960e51b81526004810186905290516000926001600160a01b03169163b3c10d209160248083019286929190829003018186803b1580156139a557600080fd5b505afa1580156139b9573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526101008110156139e357600080fd5b815160208301805160405192949293830192919084600160201b821115613a0957600080fd5b908301906020820185811115613a1e57600080fd5b8251600160201b811182820188101715613a3757600080fd5b82525081516020918201929091019080838360005b83811015613a64578181015183820152602001613a4c565b50505050905090810190601f168015613a915780820380516001836020036101000a031916815260200191505b506040818152918201516005546369940d7960e01b835292519097506001600160a01b0390921695506369940d799450600480820194506020935090829003018186803b158015613ae157600080fd5b505afa158015613af5573d6000803e3d6000fd5b505050506040513d6020811015613b0b57600080fd5b50516001600160a01b0382811691161415613b52576040805162461bcd60e51b8152602060048201526002602482015261333560f01b604482015290519081900360640190fd5b600f5460408051631b99c64d60e21b815263ffffffff8089166004830152602482018890528d16604482015260648101869052891515608482015290516000926001600160a01b031691636e6719349160a4808301926020929190829003018186803b158015613bc157600080fd5b505afa158015613bd5573d6000803e3d6000fd5b505050506040513d6020811015613beb57600080fd5b50519050808a1015613c29576040805162461bcd60e51b8152602060048201526002602482015261199b60f11b604482015290519081900360640190fd5b613c368160ff8b1661451f565b9050613c438160646145b0565b9d9c50505050505050505050505050565b60055460408051633e03a0d560e11b815263ffffffff808b16600483015288166024820152905160009283926001600160a01b0390911691637c0741aa9160448082019260e092909190829003018186803b158015613cb257600080fd5b505afa158015613cc6573d6000803e3d6000fd5b505050506040513d60e0811015613cdc57600080fd5b5080516080909101519092509050613cf26148d5565b6040518061012001604052808463ffffffff1681526020018881526020014281526020018381526020018a63ffffffff1681526020018963ffffffff1681526020018760ff1681526020018615158152602001858152509050613d558b82614048565b505050505050505050505050565b60055460408051630c34e02760e41b81526001600160a01b03878116600483015263ffffffff871660248301526044820186905284151560648301529151600093929092169163c34e027091608480820192869290919082900301818387803b158015613dcf57600080fd5b505af1925050508015613de0575060015b613dec57506000613df0565b5060015b949350505050565b6000808315613e08575081613e15565b613e128787610e68565b90505b60008560ff1660641415613e2b57506000613e54565b613e388260ff881661451f565b9050613e458160646145b0565b9050613e51828261485d565b90505b979650505050505050565b613e676148d5565b60008060008060008060008a6001600160a01b031663d35ffcf08b8b6040518363ffffffff1660e01b8152600401808363ffffffff1681526020018263ffffffff1681526020019250505060e06040518083038186803b158015613eca57600080fd5b505afa158015613ede573d6000803e3d6000fd5b505050506040513d60e0811015613ef457600080fd5b810190808051906020019092919080519060200190929190805190602001909291908051906020019092919080519060200190929190805190602001909291908051906020019092919050505096509650965096509650965096506000808c6001600160a01b0316638f35835a8d8d6040518363ffffffff1660e01b8152600401808363ffffffff1681526020018263ffffffff16815260200192505050604080518083038186803b158015613fa957600080fd5b505afa158015613fbd573d6000803e3d6000fd5b505050506040513d6040811015613fd357600080fd5b5080516020909101519092509050613fe96148d5565b50604080516101208101825263ffffffff9a8b16815260208101999099528801969096526060870194909452918616608086015290941660a084015260ff90931660c083015291151560e0820152610100810191909152949350505050565b60006298967f818061405a8682612a34565b909250905063ffffffff82166298967f146143835760006003828154811061407e57fe5b6000918252602082206002600390920201015463ffffffff16915080805b8363ffffffff168163ffffffff16101561415e57886080015163ffffffff16600386815481106140c857fe5b6000918252602080832063ffffffff86811685526003939093020160010190526040909120600401541614801561414557508860a0015163ffffffff166003868154811061411257fe5b6000918252602080832063ffffffff8681168552600393909302016001019052604090912060040154600160201b900416145b15614156576001925080915061415e565b60010161409c565b50811561425357876003858154811061417357fe5b6000918252602080832063ffffffff808716855260016003948502909201820183526040948590208651815490831663ffffffff199182161782559387015192810192909255938501516002820155606085015192810192909255608084015160048301805460a087015160c088015160e08901511515600160481b0260ff60481b1960ff909216600160401b0260ff60401b19938a16600160201b0267ffffffff000000001997909a1694909716939093179490941696909617959095169290921716929092179091556101009091015160059091015594508461437b565b6003848154811061426057fe5b60009182526020909120600391820201600201805463ffffffff198116600163ffffffff9283160190911617905580548991908690811061429d57fe5b6000918252602080832063ffffffff808916855260016003948502909201820183526040948590208651815490831663ffffffff199182161782559387015192810192909255938501516002820155606085015192810192909255608084015160048301805460a087015160c088015160e08901511515600160481b0260ff60481b1960ff909216600160401b0260ff60401b19938a16600160201b0267ffffffff000000001997909a1694909716939093179490941696909617959095169290921716929092179091556101009091015160059091015591945084915b505050614515565b604080518082019091526001600160a01b038781168252600160208301818152600380549283018155600081905293517fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b92850292830180546001600160a01b031916919094161790925590517fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85d909101805463ffffffff191663ffffffff9092169190911790558054869190600019810190811061443e57fe5b60009182526020808320838052600160039384029091018101825260408085208651815463ffffffff91821663ffffffff199182161783559488015193820193909355908601516002820155606086015193810193909355608085015160048401805460a088015160c089015160e08a01511515600160481b0260ff60481b1960ff909216600160401b0260ff60401b19938816600160201b0267ffffffff000000001997909816949098169390931794909416949094179390931693909317161790556101009092015160059092019190915592505b5090949350505050565b60008261452e57506000611011565b508181028183828161453c57fe5b04146040518060400160405280600681526020016530303830303160d01b815250906145a95760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561088f578181015183820152602001610877565b5092915050565b60008082116040518060400160405280600681526020016530303830303360d01b815250906146205760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561088f578181015183820152602001610877565b5081838161462a57fe5b049392505050565b60008080614640878761485d565b600f5460408051637a4936fd60e01b8152600481018490526024810188905290519293506001600160a01b0390911691637a4936fd91604480820192602092909190829003018186803b15801561469657600080fd5b505afa1580156146aa573d6000803e3d6000fd5b505050506040513d60208110156146c057600080fd5b5051600f54604080516322102ce960e11b8152600481018890526024810184905290519293506001600160a01b039091169163442059d291604480820192602092909190829003018186803b15801561471857600080fd5b505afa15801561472c573d6000803e3d6000fd5b505050506040513d602081101561474257600080fd5b5051600f5460408051631c953e6d60e31b81526004810188905260248101849052905192935083926001600160a01b039092169163e4a9f36891604480820192602092909190829003018186803b15801561479c57600080fd5b505afa1580156147b0573d6000803e3d6000fd5b505050506040513d60208110156147c657600080fd5b5051600f5460408051637a4936fd60e01b81526004810184905263ffffffff8a16602482015290519294506001600160a01b0390911691637a4936fd91604480820192602092909190829003018186803b15801561482357600080fd5b505afa158015614837573d6000803e3d6000fd5b505050506040513d602081101561484d57600080fd5b5051909890975095505050505050565b6000828211156040518060400160405280600681526020016518181c18181960d11b815250906148ce5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561088f578181015183820152602001610877565b5050900390565b6040805161012081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e081018290526101008101919091529056fea2646970667358221220931a91243a375ee1564c20b885f8ae3e0a215ab5e4d711e7f48c64b6da4e825764736f6c634300060c0033';

/*
let NFT_profiles_list = document.getElementById('NFT_profiles_list');
NFT_profiles_list.length = 0;


//getNFTPUBContract();
//getValueTokenContract();

let NFT_profiles_list_upd = document.getElementById('NFT_profiles_list_upd');
NFT_profiles_list_upd.length = 0;

let NFT_images_list = document.getElementById('NFT_images_list');
NFT_images_list.length = 0;*/

let deposit_profiles_list = document.getElementById('deposit_profiles_list');
deposit_profiles_list.length = 0;


let credit_profiles_list = document.getElementById('credit_profiles_list');
credit_profiles_list.length = 0;


let smartcontracts_list = document.getElementById('smartcontracts_list');
smartcontracts_list.length = 0;


let functions_list = document.getElementById('functions_list');
functions_list.length = 0;

let famers_list = document.getElementById('famers_list');
famers_list.length = 0;

let data_profiles_list = document.getElementById('data_profiles_list');
data_profiles_list.length = 0;

let to_wallet = document.getElementById('to_wallet');

let asset_name = document.getElementById('asset_name');
let asset_description = document.getElementById('asset_description');
let asset_html_description = document.getElementById('asset_html_description');
let asset_img_url = document.getElementById('asset_img_url');
let asset_video_url = document.getElementById('asset_video_url');
//let asset_price = document.getElementById('asset_price');
//let asset_buyback_price = document.getElementById('asset_buyback_price');

let asset_name_upd = document.getElementById('asset_name_upd');
let asset_type_upd = document.getElementById('asset_type_upd');
let asset_description_upd = document.getElementById('asset_description_upd');
let asset_html_description_upd = document.getElementById('asset_html_description_upd');
let asset_img_url_upd = document.getElementById('asset_img_url_upd');
let asset_video_url_upd = document.getElementById('asset_video_url_upd');
//let asset_price_upd = document.getElementById('asset_price_upd');
//let asset_buyback_price_upd = document.getElementById('asset_buyback_price_upd');


let check_wallet = document.getElementById('check_wallet');

// create NFT asset (specific collectible) and send it to wallet
function publishSelectedNFTProfileClick(to_wallet){
		if (NFT_profiles_list.selectedIndex > 0){
			var val = JSON.parse(NFT_profiles_list.value);
			
			if (to_wallet !== ''){
				resetMsg();
				temporaryDisableCurrentButton();
				publishFamerNFT(val["asset_name"],val["asset_contract"],to_wallet);
			} else {				
				infoMsg('Please, input wallet address to which you will publish collectible');
			}
	

		} else {
			infoMsg('Please, select profile');
		}
	
	
}

async function publishFamerNFT(asset_name,contract_address,to_wallet, callback = null){
	
	//publish NFT (i.e. mint collectible for nftName to 'to_wallet'
	//console.log(asset_name,contract_address,to_wallet); return;
	if (!contract_address) return;

  	let nft_famer_contract = await new window.web3js.eth.Contract(famer_token_abi, contract_address); 
 					
  	nft_famer_contract.methods
	.mint(to_wallet, 1, assetNFTUrlByName(asset_name))
	.send( {from: userObject.account, gasPrice: window.gp}, function(error, txnHash) {
    	if (error) throw error;
    	output_transaction(txnHash);
		
		//and save to db
		//  { token_id, profile_id, mint_wallet, mint_price, transaction_type } 
		//saveMintToDb(t_id, profile_id, to_wallet, 0 /*becase admin*/, 'admin_mint',txnHash);
    	if (callback) callback();
 	 })
	 .catch(error => 	{
			errorMsg('smartcontract mint error, try again');
		});   
}


async function checkTokenExists(asset_name,contract_address, callback_token, callback_btn){
	
	//publish NFT (i.e. mint collectible for nftName to 'to_wallet'
	//console.log(asset_name,contract_address,to_wallet); return;
	if (!contract_address) return;

  	let nft_famer_contract = await new window.web3js.eth.Contract(famer_token_abi, contract_address); 
 	
	let totalSupply = await nft_famer_contract.methods.totalSupply().call({from:userObject.account});

	if (totalSupply == 0){
		callback_btn(true);
		return;
	} else if (totalSupply == 1){
		let token_id = await nft_famer_contract.methods.tokenByIndex(0).call({from:userObject.account});
		if (token_id == 1){
			callback_token(true);
			callback_btn(false);
		} 
		else{
			callback_token(false);
			callback_btn(false);
			errorMsg('wrong token id, should be 1');
		} 
	} else {
		callback_token(false)
		callback_btn(false);
		errorMsg('wrong total tokens number, should be 0 or 1');
	}


}


function createNFTProfileClick(){
		if (NFT_images_list.selectedIndex > 0){
			var selVal = NFT_images_list.value;
			if (asset_name.value !== '' && asset_type.value !== '' && asset_description.value !== '' && 
				asset_img_url.value !== '' && //asset_price.value !== '' && asset_buyback_price.value !== '' &&
				asset_nft_name.value !== '' && asset_nft_symbol.value !== ''){
					resetMsg();
					createNFT(asset_name.value, asset_type.value, asset_description.value, asset_html_description.value, asset_img_url.value, asset_video_url.value, 0, 0, asset_nft_name.value, asset_nft_symbol.value );
			} else {
				infoMsg('Please, complete all fields');
			}
	

		} else {
			infoMsg('Please, select image');
		}
	
	
}

function updateNFTProfileClick(){
		if (NFT_profiles_list_upd.selectedIndex > 0){
			
			if (asset_name_upd.value !== ''  && asset_type_upd.value !== '' && asset_description_upd.value !== '' && asset_img_url_upd.value !== ''  //&& asset_price_upd.value !== '' && asset_buyback_price_upd.value !== '' 
				&& asset_contract_upd.value !== ''){
					resetMsg();
					//asset_name as a key for update, as we do not change it
					var val = JSON.parse(NFT_profiles_list_upd.value);
				if (asset_name_upd.value === val["asset_name"] && 
					asset_img_url_upd.value == val["asset_img_url"] && 
					asset_type_upd.value == val["asset_type"]){
						updateNFT(val["asset_name"], asset_description_upd.value, asset_html_description_upd.value, asset_video_url_upd.value, 0, 0, '' /*do not update contract*/);
				} else { //this can't happen normally
						errorMsg('Error, data do not valid (asset name/image url)');   					
				}

			} else {
				infoMsg('Please, complete all fields');
			}
	

		} else {
			infoMsg('Please, select NFT');
		}
	
	
}

function deleteNFTProfileClick(){
		if (NFT_profiles_list_upd.selectedIndex > 0){
			
			if (asset_name_upd.value !== ''  && asset_img_url_upd.value !== ''){
					resetMsg();
					//asset_name as a key for update, as we do not change it
					var val = JSON.parse(NFT_profiles_list_upd.value);
				if (asset_name_upd.value === val["asset_name"] && 
					asset_img_url_upd.value == val["asset_img_url"] && 
					asset_type_upd.value == val["asset_type"]){
						deleteNFT(val["asset_name"]);
				} else { //this can't happen normally
						errorMsg('Error, data do not valid (asset name/image url)');
				}

			} else {
				errorMsg('Please, complete all fields');
			}
	

		} else {
			errorMsg('Please, select NFT');
		}
		
}


function deleteArtworkClick(){
		if (NFT_images_list.selectedIndex > 0){
			resetMsg();
			deleteArtwork(NFT_images_list.value);			

		} else {
			errorMsg('Please, select image');
		}
}


function checkWalletClick(){

	if (check_wallet.value !== ''){
		resetMsg();	
		checkWallet(check_wallet.value);
	} else {
		infoMsg('Please, input wallet address');
	}
	
}





function createNFT(	asset_name, asset_type, asset_description, asset_html_description, asset_img_url, 
					asset_video_url, asset_price, asset_buyback_price, 
					asset_nft_name, asset_nft_symbol, callback = null){

	
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("servicekeyauth", window.service_key);

	var raw = JSON.stringify({	"asset_name":asset_name, 
								"asset_type":asset_type, 
								"asset_description":asset_description,
								"asset_html_description":asset_html_description,
								"asset_img_url":asset_img_url,
								"asset_video_url":asset_video_url,
								"asset_price":asset_price,
								"asset_buyback_price":asset_buyback_price,
								"asset_nft_name":asset_nft_name,
								"asset_nft_symbol":asset_nft_symbol
							});
	

	var requestOptions = {
	  method: 'POST',
	  headers: myHeaders,
	  body: raw,
	  redirect: 'follow'
	};

	fetch("<?php echo $nft_pub_api?>save_nft_profile", requestOptions)
	  .then(response => {	
	  						if (response.status !== 200){
	  							throw new Error(response.status);
	  						} else {
	  							return response.clone().json();
	  						}
	  						
	  					})
	  .then(respJson => {
	  						//console.log('pub NFT success:',respJson);
	  						if (respJson.type === "new"){
	  							
								infoMsg('NFT profile created in database');

								deployContract(famer_token_abi, famer_token_bytecode, [asset_nft_name, asset_nft_symbol], 
								(contract_address)=>{
										updateNFT(asset_name, asset_description, asset_html_description, asset_video_url, asset_price, asset_buyback_price, contract_address);
								});
								
							
    

								
	  						} else if (respJson.type === "existing") {
								infoMsg('NFT profile already exists');
	  						} else {
								errorMsg('unexpected results');
	  						}

	  					})
	  .catch(error => 	{
	  						errorMsg('Create NFT failure: '+error);
	
	  					});    	
}


function updateNFT(asset_name, asset_description, asset_html_description, asset_video_url, asset_price, asset_buyback_price, asset_contract, callback = null){
	//can update only asset_description/asset_price
	
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("servicekeyauth", window.service_key);

	var raw = JSON.stringify({	"asset_name":asset_name, //key for update
								"asset_description":asset_description,
								"asset_html_description":asset_html_description,
								"asset_video_url":asset_video_url,
								"asset_price":asset_price,
								"asset_buyback_price":asset_buyback_price,
								"asset_contract":asset_contract
							});
	

	var requestOptions = {
	  method: 'POST',
	  headers: myHeaders,
	  body: raw,
	  redirect: 'follow'
	};

	fetch("<?php echo $nft_pub_api?>update_nft_profile", requestOptions)
	  .then(response => {	
	  						if (response.status !== 200){
	  							throw new Error(response.status);
	  						} else {
	  							return response.clone().json();
	  						}
	  						
	  					})
	  .then(respJson => {
	  						//console.log('pub NFT success:',respJson);
	  						if (respJson.type === "updated"){
  								/*
	  							while(NFT_profiles_list_upd.length>1){
	  								NFT_profiles_list_upd.remove(1);
	  							}
	  							fillList('<?php echo $nft_pub_api?>get_nft_profiles',NFT_profiles_list_upd,'asset_name',null,true);*/
								infoMsg('NFT profile updated');
								
								
								
	  						} else if (respJson.error === "nft-profile-not-found") {
								errorMsg('NFT profile not found');
	  						} else {
								errorMsg('unexpected results');
	  						}


	  					})
	  .catch(error => 	{
	  						errorMsg('Update NFT failure: '+error);
	
	  					});    	
}


function deleteNFT(asset_name, callback = null){
	
	
		var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("servicekeyauth", window.service_key);

	var raw = JSON.stringify({	"asset_name":asset_name });
	

	var requestOptions = {
	  method: 'POST',
	  headers: myHeaders,
	  body: raw,
	  redirect: 'follow'
	};

	fetch("<?php echo $nft_pub_api?>delete_nft_profile", requestOptions)
	  .then(response => {	
	  						if (response.status !== 200){
	  							throw new Error(response.status);
	  						} else {
	  							return response.clone().json();
	  						}
	  						
	  					})
	  .then(respJson => {
	  						if (respJson.type === "deleted"){
	  							while(NFT_profiles_list_upd.length>1){
	  								NFT_profiles_list_upd.remove(1);
	  							}
	  							fillList('<?php echo $nft_pub_api?>get_nft_profiles',NFT_profiles_list_upd,'asset_name',null,true);
								infoMsg('NFT profile deleted');

								

	  						} else if (respJson.error === "nft-profile-not-found") {
								errorMsg('NFT profile not found');
	  						} else {
								errorMsg('unexpected results');
	  						}


	  					})
	  .catch(error => 	{
							errorMsg('Delete NFT failure: '+error);
	
	  					});    	
}


function deleteArtwork(img_name){
	
	
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("servicekeyauth", window.service_key);

	var raw = JSON.stringify({	"img_name":img_name });
	

	var requestOptions = {
	  method: 'POST',
	  headers: myHeaders,
	  body: raw,
	  redirect: 'follow'
	};

	fetch("<?php echo $nft_artwork_api?>delete", requestOptions)
	  .then(response => {	
	  						if (response.status !== 200){
	  							throw new Error(response.status);
	  						} else {
	  							return response.clone().json();
	  						}
	  						
	  					})
	  .then(respJson => {
	  						if (respJson.type === "deleted"){
	  							while(NFT_images_list.length>1){
	  								NFT_images_list.remove(1);
	  							}
	  							fillList('<?php echo $nft_artwork_api?>nft_images/list',NFT_images_list,'name');
								infoMsg('NFT profile deleted');
	  						} else if (respJson.error === "image-not-found") {
								errorMsg('Image not found');
	  						} else {
								errorMsg('unexpected results');
	  						}
								  						
	  					})
	  .catch(error => 	{
	  						errorMsg('Delete NFT failure: '+error);
	
	  					});    	
}

window.addEventListener('DOMContentLoaded', async () => {



	
	window.service_key = "<?php echo $service_key; ?>";

	await getBackendParameter('STAKING_CONTRACT',(contract_address) => {
		window.staking_contract_address = contract_address;	
		safeSetValueById('staking_contract', window.staking_contract_address);	
	});

	await getBackendParameter('FAMERS_REGISTER_CONTRACT',(contract_address) => {
		window.famers_register_contract_address = contract_address;	
		safeSetValueById('famers_register_contract', window.famers_register_contract_address);	
	});

	
	await getBackendParameter('DATA_PROVIDER_CONTRACT',(contract_address) => {
		window.data_provider_contract_address = contract_address;	
		safeSetValueById('data_provider_contract', window.data_provider_contract_address);	
	});	

	await getBackendParameter('VOTES_CALC_CONTRACT',(contract_address) => {
		window.votes_calc_contract_address = contract_address;	
		safeSetValueById('votes_calc_contract', window.votes_calc_contract_address);	
	});	

	await getBackendParameter('USAGE_CALC_CONTRACT',(contract_address) => {
		window.usage_calc_contract_address = contract_address;	
		safeSetValueById('usage_calc_contract', window.usage_calc_contract_address);	
	});	

	await getBackendParameter('DEPPROFILES_REGISTER_CONTRACT',(contract_address) => {
		window.depprofiles_register_contract_address = contract_address;	
		safeSetValueById('depprofiles_register_contract', window.depprofiles_register_contract_address);	
	});	

	await getBackendParameter('CREDIT_PROFILES_REGISTER_CONTRACT',(contract_address) => {
		window.credit_profiles_register_contract_address = contract_address;	
		safeSetValueById('credit_profiles_register_contract', window.credit_profiles_register_contract_address);	
	});	

	await getBackendParameter('CREDIT_CONTRACT',(contract_address) => {
		window.credit_contract_address = contract_address;	
		safeSetValueById('credit_contract', window.credit_contract_address);	
	});	

	await getBackendParameter('LIQLEV_CONTRACT',(contract_address) => {
		window.liqlev_contract_address = contract_address;	
		safeSetValueById('liqlev_contract', window.liqlev_contract_address);	
	});	
	
	
	await initWeb3jsReader();

	window.web3js =  await new Web3(window.ethereum);
	window.web3 = window.web3js;
	window.BN = web3js.utils.BN;

	window.gp = await window.web3js.eth.getGasPrice();
	window.gp = window.gp*2;

	await initStakingContractReader();
	await initCreditContractReader();
	await initLiqLevContractReader();

	await initStakingContract();
  	
	//setupList(NFT_profiles_list, 'Choose NFT profile');
	//setupList(NFT_profiles_list_upd, 'Choose NFT profile');
	//setupList(NFT_images_list, 'Choose image');
	setupList(deposit_profiles_list, 'Choose deposit profile');
	setupList(credit_profiles_list, 'Choose credit profile');
	setupList(smartcontracts_list, 'Choose smartcontract');
//	setupList(famers_list, 'Choose famer');
	setupList(data_profiles_list, 'Choose data profile');

	
  	

//  	fillList('<?php echo $nft_pub_api?>get_nft_profiles',NFT_profiles_list,'asset_name',null,true);

//  	fillList('<?php echo $nft_pub_api?>get_nft_profiles',NFT_profiles_list_upd,'asset_name',null,true);
	
//  	fillList('<?php echo $nft_artwork_api?>nft_images/list',NFT_images_list,'name');

  	fillDepositProfilesList(deposit_profiles_list);
  	fillCreditProfilesList(credit_profiles_list);
  	

 // 	fillFamersList(famers_list);
	fillDataProfilesList(data_profiles_list);
	await fillSmartcontractsList(smartcontracts_list);
	//fillFunctionsList(functions_list);

	let bank_is_running = await window.staking_smartcontract.methods.isActive().call({from:userObject.account});

	if (bank_is_running) safeSetInnerHTMLById('start_stop_button','Pause Bank')
	else safeSetInnerHTMLById('start_stop_button','Start Bank');

});



function fillList(url,list_elem,field_name, val_field_name = null, complex_val = false){

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("servicekeyauth", window.service_key);

	

	var requestOptions = {
	  method: 'GET',
	  headers: myHeaders,
	  redirect: 'follow'
	};

	fetch(url,requestOptions)
  		.then(
  			function(response) {
  				if (response.status !== 200){
  					console.warn('possible issue with fetch, '+url+', status: ',response.status);
  					return;
  				}

  				response.json().then(function(data){
  					let option;

  					for (let i=0; i < data.length; i++){
  						option = document.createElement('option');
  						//console.log(data[i][field_name]);
  						option.text = data[i][field_name];
  						if (!val_field_name && !complex_val){
  							option.value = option.text;
  						} else if (!complex_val && val_field_name){
  							option.value = data[i][val_field_name];
  						} else if (complex_val){ //complex_val
  							option.value =  JSON.stringify(data[i]);
  						} else { 
  							option.value = option.text;
  						}	
  						list_elem.add(option);
  					}
  					
  					list_elem.style.display = "block";
  				});

  			}
  		).catch(function(err){
  			console.log('List fetch error, '+url+': ', err);
  		});
}

async function fillDepositProfilesList(list_elem){


	let dep_profiles_contract = await new window.web3js_reader.eth.Contract(profiles_register_abi, window.depprofiles_register_contract_address); 
	let profiles_len = await dep_profiles_contract.methods.depositProfilesLength().call({from:userObject.account});
	//console.log('profiles_len', profiles_len);

	let option;
	for(let i=0; i< profiles_len; i++){
		let prof_details = await dep_profiles_contract.methods.depositProfiles(i).call({from:userObject.account});
		
		option = document.createElement('option');
		
		option.text = prof_details[1]; //name
		let json_details = {};
		json_details['id'] = prof_details[0];
		json_details['name'] = prof_details[1];
		json_details['deposit_type'] = prof_details[2];
		json_details['deposit_token_address'] = prof_details[3];
		json_details['init_apy'] = prof_details[4];
		json_details['rate'] = prof_details[5];
		json_details['reward_per_day'] = prof_details[6];
		json_details['min_lock_time'] = prof_details[7];
		
		option.value =  JSON.stringify(json_details);
		
		list_elem.add(option);
	}
	list_elem.style.display = "block";
	
}

async function fillCreditProfilesList(list_elem){


	let credit_profiles_contract = await new window.web3js_reader.eth.Contract(credit_profiles_register_abi, window.credit_profiles_register_contract_address);
	

	let profiles_len = await credit_profiles_contract.methods.creditProfilesLength().call({from:userObject.account});
	
	

	let option;
	for(let i=0; i< profiles_len; i++){
		let prof_details = await credit_profiles_contract.methods.creditProfiles(i).call({from:userObject.account});
		
		option = document.createElement('option');
		
		option.text = prof_details[1]; //name
		let json_details = {};
		json_details['id'] = prof_details[0];
		json_details['name'] = prof_details[1];
		json_details['_type'] = prof_details[2];
		json_details['_token_address'] = prof_details[3];
		json_details['valuation_percent'] = prof_details[4];
		json_details['init_apy'] = prof_details[5];
		json_details['rate'] = prof_details[6];
		
		option.value =  JSON.stringify(json_details);
		
		list_elem.add(option);
	}
	list_elem.style.display = "block";
	
}

async function fillSmartcontractsList(list_elem){
	await initStakingContract();
	await initDepProfilesContract();
	await initFamersRegisterContract();
	await initDataProviderContract();
	await initVotesCalcContract();
	await initUsageCalcContract();
	await initCredProfilesContract();
	await initCreditContract();
	await initLiqLevContract();
	await initDataProviderContract();

	let smarcontracts_arr = [
		{text: 'Deposit contract', abi: staking_contract_abi, contract: 'window.staking_smartcontract'},
		{text: 'Deposit profiles', abi: profiles_register_abi , contract: 'window.depprofiles_smartcontract'},
		{text: 'Famers register', abi: famers_register_abi, contract: 'window.famers_register_smartcontract'},
		{text: 'Data profiles', abi: data_provider_abi, contract: 'window.data_provider_smartcontract'},
		{text: 'Votes calc', abi: votes_calc_abi, contract: 'window.votes_calc_smartcontract'},
		{text: 'Usage calc', abi: usage_calc_abi, contract: 'window.usage_calc_smartcontract'},
		{text: 'Credit profiles', abi: credit_profiles_register_abi, contract: 'window.credprofiles_smartcontract'},
		{text: 'Credit contract', abi: credit_contract_abi, contract: 'window.credit_smartcontract'},
		{text: 'LiqLev contract', abi: liqlev_contract_abi, contract: 'window.liqlev_smartcontract'},
		{text: 'DataProvider contract', abi: data_provider_abi, contract: 'window.data_provider_smartcontract'}

	];

	

	let option;
	for(let i=0; i< smarcontracts_arr.length; i++){
		
		
		option = document.createElement('option');
		
		option.text = smarcontracts_arr[i].text; //name

		let json_details = {};
		json_details['text'] = smarcontracts_arr[i].text;
		json_details['abi'] = smarcontracts_arr[i].abi;
		json_details['contract'] = smarcontracts_arr[i].contract;
		
		
		option.value =  JSON.stringify(json_details);
		
		list_elem.add(option);
	}
	list_elem.style.display = "block";
	
}


async function fillFunctionsList(list_elem){

	let smc = JSON.parse(smartcontracts_list.value);
	

	let option;
	for(let i=0; i< smc.abi.length; i++){
		
		
		option = document.createElement('option');
		if (smc.abi[i].type == "function"){ 
			option.text = smc.abi[i].name; //name
			let json_details = smc.abi[i];
			option.value =  JSON.stringify(json_details);
			list_elem.add(option);
		}
	}
	list_elem.style.display = "block";
	
}




async function fillFamersList(list_elem){


	initFamersRegisterContract((famersContractInstance) => {

	    window.web3js.eth.getAccounts(async function(error, accounts) {
	      if (error) throw error;
	     		
	     		let profiles_len = await famersContractInstance.methods.famersLength().call({from:userObject.account});
				//console.log('profiles_len', profiles_len);

				let option;
				for(let i=0; i< profiles_len; i++){
					let prof_details = await famersContractInstance.methods.famers(i).call({from:userObject.account});
					
					
					option = document.createElement('option');
					
					option.text = await famersContractInstance.methods.getFamerName(i).call({from:userObject.account});
					let json_details = {};
					json_details['famer_token_address'] = prof_details[0];
					json_details['sold'] = prof_details[1];
					json_details['sold_for'] = prof_details[2];
					
					
					option.value =  JSON.stringify(json_details);
					
					list_elem.add(option);
				}
				list_elem.style.display = "block";
		});
	});

	
}

async function fillDataProfilesList(list_elem){

	

	initDataProviderContract((contractInstance) => {

	    window.web3js.eth.getAccounts(async function(error, accounts) {
	      if (error) throw error;
	     		
	     		let profiles_len = await contractInstance.methods.data_profiles_length().call({from:userObject.account});
				//console.log('profiles_len', profiles_len);

				let option;
				for(let i=0; i< profiles_len; i++){
					let prof_details = await contractInstance.methods.data_profiles(i).call({from:userObject.account});
					
					
					option = document.createElement('option');
					
					option.text = prof_details[0];
					let json_details = {};
					json_details['name'] = prof_details[0];
					json_details['data_provider_contract'] = prof_details[1];
					json_details['isInternal'] = prof_details[2];
					json_details['_data'] = prof_details[3];
					json_details['_decimals'] = prof_details[4];
					
					
					option.value =  JSON.stringify(json_details);
					
					list_elem.add(option);
				}
				list_elem.style.display = "block";
		});
	});

	
}


function NFTImagesListOnchange(){
	if (NFT_images_list.selectedIndex > 0){
		document.getElementById('asset_img_url').value = "<?php echo $nft_artwork_api?>imagebinary/"+NFT_images_list.value;
		document.getElementById('asset_img').src = document.getElementById('asset_img_url').value;
	}
}

function refreshNFTImagesList(){
	while(NFT_images_list.length>1){
		NFT_images_list.remove(1);
	}
	fillList('<?php echo $nft_artwork_api?>nft_images/list',NFT_images_list,'name');
}


function refreshNFTProfilesListUpd(){
	while(NFT_profiles_list_upd.length>1){
	  	NFT_profiles_list_upd.remove(1);
	}
	fillList('<?php echo $nft_pub_api?>get_nft_profiles',NFT_profiles_list_upd,'asset_name',null,true);

	while(NFT_profiles_list.length>1){
	  	NFT_profiles_list.remove(1);
	}
	fillList('<?php echo $nft_pub_api?>get_nft_profiles',NFT_profiles_list,'asset_name',null,true);
								
}

function refreshDepositProfilesList(){
	while(deposit_profiles_list.length>1){
		deposit_profiles_list.remove(1);
	}
	fillDepositProfilesList(deposit_profiles_list);
}

function refreshCreditProfilesList(){
	while(credit_profiles_list.length>1){
		credit_profiles_list.remove(1);
	}
	fillCreditProfilesList(credit_profiles_list);
}

function refreshSmartcontractsList(){
	while(smartcontracts_list.length>1){
		smartcontracts_list.remove(1);
	}
	fillSmartcontractsList(smartcontracts_list);
}


function refreshFamersList(){
	while(famers_list.length>1){
		famers_list.remove(1);
	}
	fillFamersList(famers_list);
}

function refreshDataProfilesList(){
	while(data_profiles_list.length>1){
		data_profiles_list.remove(1);
	}
	fillDataProfilesList(data_profiles_list);
}

function NFTProfilesListUpdOnchange(){
	if (NFT_profiles_list_upd.selectedIndex > 0){
		var val = JSON.parse(NFT_profiles_list_upd.value);
		document.getElementById('asset_img_url_upd').value = val["asset_img_url"];

		document.getElementById('asset_img_upd').src = document.getElementById('asset_img_url_upd').value;


		document.getElementById('asset_name_upd').value = val["asset_name"];
		document.getElementById('asset_type_upd').value = val["asset_type"];
		document.getElementById('asset_description_upd').value = val["asset_description"];
		document.getElementById('asset_html_description_upd').value = val["asset_html_description"];
		document.getElementById('asset_video_url_upd').value = val["asset_video_url"];
		document.getElementById('asset_contract_upd').value = val["asset_contract"];

		getFamerSmartcontractDetails( val["asset_contract"], (result) => { 
											//console.log(result);
											safeSetValueById('asset_nft_name_upd', result['name']);
											safeSetValueById('asset_nft_symbol_upd',result['symbol']);
										});
		//document.getElementById('asset_price_upd').value = val["asset_price"];
		//document.getElementById('asset_buyback_price_upd').value = val["asset_buyback_price"];
	}
}

function NFTProfilesListOnchange(){
	if (NFT_profiles_list.selectedIndex > 0){
		var val = JSON.parse(NFT_profiles_list.value);
		checkTokenExists(val["asset_name"], val["asset_contract"], 

				async (res) => { 
					if (res){
						let nft_famer_contract = await new window.web3js.eth.Contract(famer_token_abi, val["asset_contract"]);  	
						let token_url = await nft_famer_contract.methods.tokenURI(1).call({from:userObject.account});
						document.getElementById('token_url').value = token_url;
						document.getElementById('token_url').style.display = "block";
					} else {
						document.getElementById('token_url').value = '';
						document.getElementById('token_url').style.display = "none";
					}
				},

				(res) => { 
					if (res){
						document.getElementById('pub_nft_collectible').disabled = false; 	
					} else {
						document.getElementById('pub_nft_collectible').disabled = true; 
					}
				});
		document.getElementById('asset_img_pub').src = val["asset_img_url"];
	}
}

function depositProfilesListOnchange(){
	if (deposit_profiles_list.selectedIndex > 0){
		var val = JSON.parse(deposit_profiles_list.value);
		//console.log('id=',val['asset_id']);
	}
}

function creditProfilesListOnchange(){
	if (credit_profiles_list.selectedIndex > 0){
		var val = JSON.parse(credit_profiles_list.value);
		//console.log('id=',val['asset_id']);
	}
}

function smartcontractsListOnchange(){
	if (smartcontracts_list.selectedIndex > 0){
		var val = JSON.parse(smartcontracts_list.value);
		while(functions_list.length>1){
			functions_list.remove(1);
		}
		fillFunctionsList(functions_list);
		//console.log('id=',val['asset_id']);
	}
}

function functionsListOnchange(){
	if (functions_list.selectedIndex > 0){
		var val = JSON.parse(functions_list.value);
		

		//console.log('val=', val);
		//function_call_panel
		let html = '';
		for(let i=0; i< val.inputs.length; i++){
			html += '<div class="row" style="height: 100%; padding-top: 2vh;">';	
				html += '<label for="'+val.inputs[i].name+'" class="col-2 col-form-label">'+val.inputs[i].name+':</label>'; 
				let dl='';
				if (val.inputs[i].type == "bool") dl='list="bool_list"';
				html +=	'<div class="col-6">';
					html +=	'<input type="text" '+dl+' id="'+val.inputs[i].name+'_smc_id" class="form-control" placeholder="" value="" name="'+val.inputs[i].name+'">'; 
				html += '</div>';
				if (val.inputs[i].type == "bool") html += '<datalist id="bool_list"><option value="true"><option value="false"></datalist>';
				html +=	'<div class="col-4">';
					html +=	'<span>' +val.inputs[i].type+' </span>'; 
				html += '</div>';
			html +=	'</div>';
		}
		if (val.stateMutability == "payable"){
			html += '<div class="row" style="height: 100%; padding-top: 2vh;">';	
				html += '<label for="send_wei_value" class="col-2 col-form-label">Send value, wei:</label>'; 
				html +=	'<div class="col-6">';
					html +=	'<input type="text" id="send_wei_value" class="form-control" placeholder="" value="" name="send_wei_value">'; 
				html += '</div>';
				html +=	'<div class="col-4">';
					html +=	'<span>Value in wei to be send</span>'; 
				html += '</div>';
			html +=	'</div>';
		}
		html += '<div class="row" style="height: 100%; padding-top: 2vh;">';	
			html += '<div class="col-8"></div><div class="col-4">';
				html += '<button class="btn btn-primary" type="submit" onclick="callSmartcontractFunction()">Call</button>';
			html += '</div>';
		html +=	'</div>';
			
		html += '<div class="row" style="height: 100%; margin-top: 2vh; margin-left: 2vw; margin-right: 2vw; border:solid; border-color: black; border-width:1px">';	
			html += '<div class="col-12">';
				html += '<textarea style="width:100%" id="call_results" style="color:black"  onclick="copyToClipboard()" readonly></textarea>';
			html += '</div>';
		html +=	'</div>';		
			


		safeSetInnerHTMLById('function_call_panel',html);
	}
}

async function callSmartcontractFunction(){
	var function_data = JSON.parse(functions_list.value);
	var smc_value = JSON.parse(smartcontracts_list.value);

	let params = '';
	for(let i=0; i< function_data.inputs.length; i++){
		if (function_data.inputs[i].type.includes('[]')) {
			params += '[';
		} else if (function_data.inputs[i].type == "bool"){
			//	
		}
		else { //if (function_data.inputs[i].type == "address" || function_data.inputs[i].type == "string" ){
			params += '"';
		}

		params += document.getElementById(function_data.inputs[i].name+'_smc_id').value;
		
		if (function_data.inputs[i].type.includes('[]')) {
			params += ']';
		} else if (function_data.inputs[i].type == "bool"){
			//		
		} else {
			params += '"';
		}

		if (i< function_data.inputs.length-1) params += ',';
	}
	//console.log(params);
	let eval_str ='';
	if (function_data.stateMutability == "view" || function_data.stateMutability == "pure"){
		eval_str = smc_value.contract+".methods."+function_data.name+"("+params+").call({ from:userObject.account})";
		
	} else if (function_data.stateMutability == "nonpayable"){
		eval_str = smc_value.contract+".methods."+function_data.name+"("+params+").send({ from:userObject.account})";		
		
	} else if (function_data.stateMutability == "payable"){
		eval_str = smc_value.contract+".methods."+function_data.name+"("+params+").send({ from:userObject.account, value:"+ document.getElementById('send_wei_value').value+" })";		
	} 
	console.log('eval_str=',eval_str);

	let res = await eval(eval_str);
	if (typeof res == 'object') {
		safeSetInnerHTMLById('call_results',(JSON && JSON.stringify ? JSON.stringify(res) : res) );
    } else {
        safeSetInnerHTMLById('call_results',res);
    }
}

function famersListOnchange(){
	if (famers_list.selectedIndex > 0){
		var val = JSON.parse(famers_list.value);
		//console.log('id=',val['asset_id']);
	}
}


function dataProfilesListOnchange(){
	if (data_profiles_list.selectedIndex > 0){
		var val = JSON.parse(data_profiles_list.value);
		//console.log('id=',val['asset_id']);
	}
}

function getWalletBalanceDetails(){
  if (document.getElementById('balance_details_btn').innerHTML == 'Balance'){
       	getEthBalance(userObject.account, (res) => { 
       		safeSetValueById('balance_eth',res) 
   		});

       	getTokensBalance(userObject.account, (res) => { 
       		safeSetValueById('balance_tokens',res) 
   		});


       	document.getElementById("balance_details").style="display: block;";
       	document.getElementById('balance_details_btn').innerHTML = 'Hide';
  } else {
       	document.getElementById("balance_details").style="display: none;"; 
       	document.getElementById('balance_details_btn').innerHTML = 'Balance';
  }
 
}

function getAdminWallets(){
 
     
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("servicekeyauth", "<?php echo $service_key?>");
  

 

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(WALLETS_API_URL+'/get_admin_wallets', requestOptions)
    .then(response => { 
                if (response.status !== 200){
                  throw new Error(response.status);
                } else {
                  return response.clone().json();
                }
                
              })
    .then(respJson => {
               
                if (respJson.type == "success"){
                   
                    document.getElementById('admin_wallets').value = respJson.admin_wallets;
                    resetMsg();

                } else {
                    errorMsg('API error'); 
                         
                }
                

               
              })
    .catch(error =>   {
                 console.log(error);
                
              });     
}

function setAdminWallets(){
  
  if (document.getElementById('admin_wallets').value === ''){
	infoMsg('wallets list should not be empty (format: 0xFFF.., OxDDD..)'); 
  	return;
  } 

  	    
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("servicekeyauth", "<?php echo $service_key?>");
  
  var raw = JSON.stringify({"admin_wallets_in":document.getElementById('admin_wallets').value});
 

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(WALLETS_API_URL+'/set_admin_wallets', requestOptions)
    .then(response => { 
                if (response.status !== 200){
                  throw new Error(response.status);
                } else {
                  return response.clone().json();
                }
                
              })
    .then(respJson => {
                
                if (respJson.type == "success"){
                    resetMsg();

                } else {
                    errorMsg('API error');     
                }
                

               
              })
    .catch(error =>   {
                 console.log(error);
                
              });     
}



function getEndpoint(){
 
     
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("servicekeyauth", "<?php echo $service_key?>");
  

 

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(WALLETS_API_URL+'/get_endpoint', requestOptions)
    .then(response => { 
                if (response.status !== 200){
                  throw new Error(response.status);
                } else {
                  return response.clone().json();
                }
                
              })
    .then(respJson => {
                
                if (respJson.type == "success"){
                   
                    document.getElementById('end_point').value = respJson.endpoint;
					resetMsg();

                } else {
                    errorMsg('API error');     
                }
                

               
              })
    .catch(error =>   {
                 console.log(error);
                
              });     
}

function setEndpoint(){
  
  if (document.getElementById('end_point').value === ''){
	infoMsg('endpoint cannot be empty (format: https://...)'); 
  	return;
  } 
  resetMsg();	
  	    
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("servicekeyauth", "<?php echo $service_key?>");
  
  var raw = JSON.stringify({"endpoint":document.getElementById('end_point').value});
 

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(WALLETS_API_URL+'/set_endpoint', requestOptions)
    .then(response => { 
                if (response.status !== 200){
                  throw new Error(response.status);
                } else {
                  return response.clone().json();
                }
                
              })
    .then(respJson => {
                
                if (respJson.type == "success"){
                    resetMsg();

                } else {
                    errorMsg('API error');     
                }
                

               
              })
    .catch(error =>   {
                 console.log(error);
                
              });     
}







function getMarketplaceContractOwner(){
 
     
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("servicekeyauth", "<?php echo $service_key?>");
  

 

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(WALLETS_API_URL+'/get_marketplace_contract_owner', requestOptions)
    .then(response => { 
                if (response.status !== 200){
                  throw new Error(response.status);
                } else {
                  return response.clone().json();
                }
                
              })
    .then(respJson => {
                
                if (respJson.type == "success"){
                   
                    document.getElementById('marketplace_contract_owner').value = respJson.owner_wallet;
					resetMsg();

                } else {
                    errorMsg('API error (marketplace contract owner)');    
                }
                

               
              })
    .catch(error =>   {
                 console.log(error);
                
              });     
}


async function setMarketplaceContractOwner(new_owner){
		  
	  
	if (!new_owner){
		errorMsg('cannot get new owner address');
		return;
	}
	resetMsg();
   
    initMarketplaceContract((marketplaceContractInstance) => {
		window.web3js.eth.getAccounts(function(error, accounts) {
	      if (error) throw error;
	      // Send ERC20 transaction with web3
	      
	      
	      marketplaceContractInstance.methods.transferOwnership(new_owner).send( {from: accounts[0]}, function(error, txnHash) {
	        if (error) throw error;
	        output_transaction(txnHash);
	      });
	    });

	});

      
}



async function setMarketplaceContractInternalPriceCurve(callback = null){
  
   
   initMarketplaceContract((marketplaceContractInstance) => {
	  
	    window.web3js.eth.getAccounts(function(error, accounts) {
	      if (error) throw error;
	     		
	     		
		      	marketplaceContractInstance.methods.setInternalPriceCurve().send( {from: accounts[0]}, function(error, txnHash) {
		        if (error) throw error;
		        	output_transaction(txnHash);
		        	if (callback) callback();
		     	 });
	    });

	});
}

async function setMarketplaceContractExternalPriceCurve(callback = null){
  
   
   initMarketplaceContract((marketplaceContractInstance) => {
	  
	    window.web3js.eth.getAccounts(function(error, accounts) {
	      if (error) throw error;
	     		
	     		
		      	marketplaceContractInstance.methods.setExternalPriceCurve().send( {from: accounts[0]}, function(error, txnHash) {
		        if (error) throw error;
		        	output_transaction(txnHash);
		        	if (callback) callback();
		     	 });
	    });

	});
}

async function setMarketplaceContractPriceCurvePercent(new_curve, callback = null){
  
   
   initMarketplaceContract((marketplaceContractInstance) => {
	  
	    window.web3js.eth.getAccounts(function(error, accounts) {
	      if (error) throw error;
	     		
	     		
		      	marketplaceContractInstance.methods.setPriceCurve(new_curve).send( {from: accounts[0]}, function(error, txnHash) {
		        if (error) throw error;
		        	output_transaction(txnHash);
		        	if (callback) callback();
		     	 });
	    });

	});
}



async function getVotesCalcDataProvider(callback){
   
    initVotesCalcContract((contractInstance) => {
     	      
      	contractInstance.methods.getDataProviderContract().call({from:userObject.account})
          .then(async (result) => {
             callback(result);   

          })
          .catch((error) => {
                console.log('error calling smartcontract:', error );
                callback('');
          });
	    
	});
}

async function setVotesCalcDataProvider(new_provider, callback = null){
 
	initVotesCalcContract((contractInstance) => {
	       		
      	contractInstance.methods.setDataProviderContract(new_provider).send( {from: userObject.account, gasPrice: window.gp}, function(error, txnHash) {
        if (error) throw error;
        	output_transaction(txnHash);
        	if (callback) callback;
     	 });
	    

	});
}

//price for which customer can sell token
async function getMarketplaceContractPriceManager(callback){
  
   
    initMarketplaceContract((marketplaceContractInstance) => {
	  
	    window.web3js.eth.getAccounts(function(error, accounts) {
	      if (error) throw error;
	    
	   	      
	      marketplaceContractInstance.methods.getPriceManager().call({from:userObject.account})
	          .then(async (result) => {
	             callback(result);   

	          })
	          .catch((error) => {
	                console.log('error calling exchange contract (getPriceManager): ', error );
	                callback('');
	          });
	    });
	});
}


async function setMarketplaceContractPriceManager(new_priceman, callback = null){
 
	initMarketplaceContract((marketplaceContractInstance) => {
	  
	    window.web3js.eth.getAccounts(function(error, accounts) {
	      if (error) throw error;
	     		
	     		
		      	marketplaceContractInstance.methods.setPriceManagerRight(new_priceman).send( {from: accounts[0]}, function(error, txnHash) {
		        if (error) throw error;
		        	output_transaction(txnHash);
		        	if (callback) callback;
		     	 });
	    });

	});
}


async function stakingContractTransferTokens(prev_contract_addr, current_contract_addr){

	let prev_staking_contract = await new window.web3js.eth.Contract(staking_contract_abi, prev_contract_addr); 
	let current_staking_contract = await new window.web3js.eth.Contract(staking_contract_abi, current_contract_addr);

	let wei_amount = await window.web3js_reader.eth.getBalance(prev_contract_addr);
	if (wei_amount >0){
		await prev_staking_contract.methods.ownerWithdrawEther(current_contract_addr, wei_amount).send({from: userObject.account, gasPrice: window.gp});	
	}
	


    let dep_profiles_contract = await new window.web3js_reader.eth.Contract(profiles_register_abi, window.depprofiles_register_contract_address); 
	let dpl = await dep_profiles_contract.methods.depositProfilesLength().call({from:userObject.account});
	let t_ids = new Array();


	for (let i = 0; i < dpl; i++){
            //0 means max amount for ERC20 compatible and ignored for ERC721
            
            let prof_details = await dep_profiles_contract.methods.depositProfiles(i).call({from:userObject.account});
	
				p_dep_type = prof_details[2];
				p_tok_addr = prof_details[3];
				
       
	            if (p_dep_type == ERC721_TOKEN){
	            	  //tokenOfOwnerByIndex(wallet,i); 

	            	 let token_ids = new Array();
	            	 let token_count = await  window.cyclops_nft_smartcontract_reader.methods.balanceOf(prev_contract_addr).call({from:userObject.account});
	            	 for (let j=0; j < token_count; j++){
	            	 	let token_id =  await window.cyclops_nft_smartcontract_reader.methods.tokenOfOwnerByIndex(prev_contract_addr,j).call({from:userObject.account});
	            	 	token_ids.push(parseInt(token_id));
	            	 }
	            	 //console.log('token_ids=', token_ids);
	            	 if (token_count > 0){
	                 	await prev_staking_contract.methods.ownerWithdrawTokens(current_contract_addr, p_tok_addr, p_dep_type, token_count, token_ids).send({from: userObject.account, gasPrice: window.gp});
	             	 }
	            } else { 
	                 
	                 await prev_staking_contract.methods.ownerWithdrawTokens(current_contract_addr, p_tok_addr, p_dep_type, 0, t_ids).send({from: userObject.account, gasPrice: window.gp});
	            }
               
    }
        
    //withdraw reward tokens
    let reward_token_address = await prev_staking_contract.methods.getRewardToken().call({from:userObject.account});
    await prev_staking_contract.methods.ownerWithdrawTokens(current_contract_addr, reward_token_address, ERC20_TOKEN, 0, t_ids).send({from: userObject.account, gasPrice: window.gp});





}

async function updateContractsLinks(){
	

	await initStakingContract();
	await initCreditContract();
	await initVotesCalcContract();
	await initUsageCalcContract();
	await initLiqLevContract();


	await window.staking_smartcontract.methods.setCreditContract(window.credit_contract_address).send({from: userObject.account, gasPrice: window.gp});
	await window.staking_smartcontract.methods.setUsageCalcContract(window.usage_calc_contract_address).send({from: userObject.account,gasPrice: window.gp});
	await window.staking_smartcontract.methods.setVotesCalcContract(window.votes_calc_contract_address).send({from: userObject.account,gasPrice: window.gp});
	await window.staking_smartcontract.methods.setLiqLevContract(window.liqlev_contract_address).send({from: userObject.account,gasPrice: window.gp});
	await window.credit_smartcontract.methods.setCredProfilesRegister(window.credit_profiles_register_contract_address).send({from: userObject.account,gasPrice: window.gp});
	

	while (true){
		let cc = await window.staking_smartcontract.methods.getCreditContract().call({from: userObject.account});
		let uc = await window.staking_smartcontract.methods.getUsageCalcContract().call({from: userObject.account});
		let vc = await window.staking_smartcontract.methods.getVotesCalcContract().call({from: userObject.account});
		let ll = await window.staking_smartcontract.methods.getLiqLevContract().call({from: userObject.account});
		let cpr = await window.credit_smartcontract.methods.getCredProfilesRegister().call({from: userObject.account});
		//console.log('cc=',cc, 'uc=',uc, 'vc=',vc)
		if (cc == window.credit_contract_address && 
			uc == window.usage_calc_contract_address && 
			ll == window.liqlev_contract_address &&
			cpr == window.credit_profiles_register_contract_address &&
			vc == window.votes_calc_contract_address) break;
	}
	

	await window.votes_calc_smartcontract.methods.setDepositContract(window.staking_contract_address).send({from: userObject.account,gasPrice: window.gp});

	await window.credit_smartcontract.methods.setDepositContract(window.staking_contract_address).send({from: userObject.account,gasPrice: window.gp});
	
	await window.usage_calc_smartcontract.methods.setDepositContract(window.staking_contract_address).send({from: userObject.account,gasPrice: window.gp});

	await window.liqlev_smartcontract.methods.setDepositContract(window.staking_contract_address).send({from: userObject.account,gasPrice: window.gp});

}



async function stakingContractTransferConfig(prev_contract_addr, current_contract_addr){

	
	let current_staking_contract = await new window.web3js.eth.Contract(staking_contract_abi, current_contract_addr);
	let prev_staking_contract = await new window.web3js.eth.Contract(staking_contract_abi, prev_contract_addr); 

	await current_staking_contract.methods.setupFromConfig(prev_contract_addr).send({from: userObject.account, gasPrice: window.gp});
	let ll = await prev_staking_contract.methods.getLiqLevContract().call({from: userObject.account});
	await current_staking_contract.methods.setLiqLevContract(ll).send({from: userObject.account, gasPrice: window.gp});

}

async function creditContractTransferConfig(prev_contract_addr, current_contract_addr){
	
	let current_credit_contract = await new window.web3js.eth.Contract(credit_contract_abi, current_contract_addr);

	await current_credit_contract.methods.setupFromConfig(prev_contract_addr).send({from: userObject.account, gasPrice: window.gp});

}

async function stakingContractGiveAccessToTransferDeposits(prev_contract_addr, current_contract_addr){
	
	let prev_staking_contract = await new window.web3js.eth.Contract(staking_contract_abi, prev_contract_addr); 

	await prev_staking_contract.methods.setManagerRight(current_contract_addr).send({from: userObject.account, gasPrice: window.gp});

}

async function creditContractGiveAccessToTransferData(prev_contract_addr, current_contract_addr){	
	let prev_credit_contract = await new window.web3js.eth.Contract(credit_contract_abi, prev_contract_addr); 
	await prev_credit_contract.methods.setManagerRight(current_contract_addr).send({from: userObject.account, gasPrice: window.gp});
}

async function stakingContractTransferDeposits(prev_contract_addr, current_contract_addr){
	
	let current_staking_contract = await new window.web3js.eth.Contract(staking_contract_abi, current_contract_addr);

	await current_staking_contract.methods.setupFromDeposits(prev_contract_addr).send({from: userObject.account, gasPrice: window.gp});

}

async function creditContractTransferData(prev_contract_addr, current_contract_addr){
	
	let current_credit_contract = await new window.web3js.eth.Contract(credit_contract_abi, current_contract_addr);

	await current_credit_contract.methods.setupFromData(prev_contract_addr).send({from: userObject.account, gasPrice: window.gp});

}

async function getStakingContractBalance(contract_address){
	getEthBalance(contract_address, async (res) => { 
		safeSetValueById('contract_balance', res+' ETH\n');
		let staking_contract = await new window.web3js.eth.Contract(staking_contract_abi, contract_address); 
		let profiles_len = await staking_contract.methods.depositProfilesLength().call({from:userObject.account});
		//console.log('profiles_len', profiles_len);
		for(let i=0; i< profiles_len; i++){
			let prof_details = await staking_contract.methods.depositProfiles(i).call({from:userObject.account});
			
			getTokensBalance(contract_address, prof_details[3], (res) => { 
				let curval = document.getElementById('contract_balance').value+'\n';
				safeSetValueById('contract_balance',curval+res) 
			});
		}

	});	
}

async function getEthBalance(eth_addr,  callback){
	 window.web3js_reader.eth.getBalance(eth_addr)
     .then((result) => {
        var eth_balance = window.web3js_reader.utils.fromWei(result, 'ether');
        callback((parseFloat(eth_balance)).toFixed(4));

     })
     .catch( (err) => {
        errorMsg('web3/endpoint error:',err);
        callback(0);
     });
                        
}



async function getTokensBalance(eth_addr, token_addr, callback ) {

	let BN = window.web3js_reader.utils.BN;
	let token_contract = await new window.web3js.eth.Contract(erc20TokenContractAbi, token_addr); 

	token_contract.methods.balanceOf(eth_addr).call({from:userObject.account})
	.then(async (result) => {
	    balance = new BN(result);
	    
        var divider = new BN(10);
        divider = divider.pow(new BN(18)); //optimisation, do not call decimals()
        balance = (balance / divider).toFixed(4);
        if (callback) callback(balance.toString());
		                            
		    

	}).catch ((error) => {
		         errorMsg('error calling erc20 contract');
		        
	}); 
	 	
	

}







async function addTokensToMarketplaceContract(amount){

	
	//if (parseInt(amount) < 1){
	//	infoMsg('please provide valid amount (>=1)');
    //    return;
    // }
 	resetMsg(); 

    
		
	let BN = window.web3js.utils.BN;

	// Calculate contract compatible value for approve with proper decimal points using BigNumber

	let tokenAmount = safeFloatToWei(amount).toString(); 
	

	let calculatedTokensValue = web3js.utils.toHex(tokenAmount);
	

   	initMarketplaceContract((marketplaceContractInstance) => {
  
	    window.web3js.eth.getAccounts(function(error, accounts) {
	      if (error) throw error;
				
	     		
	     	marketplaceContractInstance.methods.depositTokens(calculatedTokensValue).send({from: accounts[0]}, function(error, txnHash) {
			        if (error) throw error;
			        output_transaction(txnHash);
	      	}).then(async (result) => {
		      	checkTokensAllowance(accounts[0],'success', 'check_tokens_allowance');

		      })
		      .catch((error) => {
		            console.log('error calling exchange contract (depositTokens): ', error );
		            return;
		      });
	    });
	});   
   
}


async function withdrawMarketplaceContractTokens(wallet_address, amount){
	 
	if (!wallet_address){
		infoMsg('please provide wallet address');
        return;
    }

   	resetMsg();

  
	let BN = window.web3js.utils.BN;

	// Calculate contract compatible value for approve with proper decimal points using BigNumber

	let tokenAmount = safeFloatToWei(amount).toString();

	let calculatedTokensValue = web3js.utils.toHex(tokenAmount);

    


	
	initMarketplaceContract((marketplaceContractInstance) => {
  	 	
	    window.web3js.eth.getAccounts(function(error, accounts) {
	      if (error) throw error;
	    
	      marketplaceContractInstance.methods.withdrawTokens(wallet_address,tokenAmount).send( {from: accounts[0]}, function(error, txnHash) {
	        if (error) throw error;
	        output_transaction(txnHash);
	      });

	      
	    });

	});
}


async function addFundsToMarketplaceContractBalance(amount_s){
	
 	const amount_finney = (amount_s*1000).toFixed(0); //1 finney = 0.01 ether;

	      
	if (!amount_finney || amount_finney < 100){
		infoMsg('please provide at least 0.1 ETH');
	    return;
	}
	resetMsg();
    

    initMarketplaceContract((marketplaceContractInstance) => {
	 	
	    window.web3js.eth.getAccounts(function(error, accounts) {
	      if (error) throw error;
	      
	      marketplaceContractInstance.methods.deposit(amount_finney).send( {from: accounts[0],value: web3js.utils.toWei(amount_s, 'ether')}, function(error, txnHash) {
	        if (error) throw error;
	        output_transaction(txnHash);
	      });
	    });
	});

   
}

async function withdrawMarketplaceContractBalance(wallet_address, amount){
	 
	if (!wallet_address){
		infoMsg('please provide wallet address');
	    return;
	}
	resetMsg();
   

    amount_eth = amount;


	initMarketplaceContract((marketplaceContractInstance) => {
 	
	    window.web3js.eth.getAccounts(function(error, accounts) {
	      if (error) throw error;
	    
	      
	      

	      marketplaceContractInstance.methods.withdraw(wallet_address, web3js.utils.toWei(amount_eth.toString(), 'ether')).send( {from: accounts[0]}, function(error, txnHash) {
	        if (error) throw error;
	        output_transaction(txnHash);
	      });

	      
	    });
	});
}




function getPublisherContractBank(callback){
	

	initNFTPubContract((nftpubContractInstance) => {
							  
	    window.web3js.eth.getAccounts(function(error, accounts) {
	      if (error) throw error;
				
			nftpubContractInstance.methods.getBankContract().call({from:userObject.account})
			.then(async (result) => {
	             callback(result);   

	          })
	          .catch((error) => {
	                errorMsg('error calling publisher contract: '+error );
	                callback('');
	          });
		    
		});
    
	});

}


function setPublisherContractBank(new_bank, callback = null){
	

	initNFTPubContract((nftpubContractInstance) => {
							  
	    window.web3js.eth.getAccounts(function(error, accounts) {
	      if (error) throw error;
				
			nftpubContractInstance.methods.transferBankRight(new_bank)
				.send( {from: accounts[0]}, function(error, txnHash) {
				        	if (error) throw error;
				        	output_transaction(txnHash);					
				        	if (callback) callback();
				     	 })
						 .catch(error => 	{
	  						errorMsg('publisher smartcontract API error, try again');
	  					});   
		    
		});
    
	});

}

function safeFloatToWei(num){ //as string
	var num_s = num.toString()
	
	//calc digits after 'dot'
	var n = num_s.indexOf(',');
	if (n == -1) n = num_s.indexOf('.');
	if (n == -1) return 0;
	let num_dig = num_s.length - n -1
	
	//float as integer in string form
	num_s = num_s.substr(n+1);

	//divide adj constant on 10**[num digits after dot]
	let bn_adj = new window.BN(ADJ_CONSTANT.toString());
	let adj = 
	bn_adj = bn_adj.div( (new window.BN(10)).pow(new BN(num_dig)) );


	//bn based on float as integer in string form
	let bn_num =  new window.BN(num_s);	

	//adjust with adj constant
	bn_num = bn_num.mul(bn_adj);

	//and return in BN form
	return bn_num;
}


async function getFamerSmartcontractDetails(contract_address, callback = null){
  	if (!contract_address) return;

  	let nft_famer_contract = await new window.web3js.eth.Contract(famer_token_abi, contract_address); 
   	
	let details = {};
	details['name'] = await nft_famer_contract.methods.name().call({from:userObject.account});
	details['symbol'] = await nft_famer_contract.methods.symbol().call({from:userObject.account});
	if (callback) callback(details);
	return details;         
}

async function deployContractClick(contract_abi, contract_bytecode, constract_constructor_args, callback = null){
	temporaryDisableCurrentButton();
	deployContract(contract_abi, contract_bytecode, constract_constructor_args, callback);
}

//constructor_args in format [123,'my string']
async function deployContract(contract_abi, contract_bytecode, constract_constructor_args, callback = null){
	//temporaryDisableCurrentButton();

	let deployed_contract = await new window.web3js.eth.Contract(contract_abi); 
	//console.log(deployed_contract);

	
	let gas = await deployed_contract.deploy({
	    data: contract_bytecode,
	    arguments: constract_constructor_args
	}).estimateGas({from: userObject.account, gasPrice: window.gp});
	

	let gasPrice = await web3.eth.getGasPrice();
	//console.log(gasPrice);
	
	deployed_contract.deploy({
    	data: contract_bytecode,
	    arguments: constract_constructor_args
	})
	.send({
	    from: userObject.account,
	    gas: (gas*1.3).toFixed(0),
	    gasPrice: gasPrice
	}, function(error, transactionHash){ console.log(error) })
	.on('error', function(error){ console.log(error) })
	.on('transactionHash', function(transactionHash){ output_transaction(transactionHash); })
	.on('receipt', function(receipt){
	   console.log(receipt.contractAddress) // contains the new contract address
	   if (callback) callback(receipt.contractAddress);
	})
	.on('confirmation', function(confirmationNumber, receipt){  })
	.then(function(newContractInstance){
	    console.log(newContractInstance.options.address) // instance with the new contract address
	});
}	

async function getAndSaveDepositAssetsList(callback){
	temporaryDisableCurrentButton();
	infoMsg('Updating..');
	let profiles = new Array();
	let dep_profiles_contract = await new window.web3js_reader.eth.Contract(profiles_register_abi, window.depprofiles_register_contract_address); 
	let dpl = await dep_profiles_contract.methods.depositProfilesLength().call({from:userObject.account});
	for (let i = 0; i < dpl; i++){
            
            	let prof_details = await dep_profiles_contract.methods.depositProfiles(i).call({from:userObject.account});
            	let p_dep_type = prof_details[2];
            	if (parseInt(p_dep_type ) == UNISWAP_PAIR) continue;

				let p_id = prof_details[0];
				let p_name = prof_details[1];
				
				let p_tok_addr = prof_details[3];
				let init_apy = prof_details[4];
				let rate = prof_details[5];
				let reward_per_day = prof_details[6];
				let min_lock_time = prof_details[7];
				profiles.push({ p_id: p_id, p_name: p_name, p_dep_type: p_dep_type, 
								p_tok_addr: p_tok_addr, init_apy: init_apy, rate: rate,
								reward_per_day: reward_per_day, min_lock_time: min_lock_time });
	}
	callback( JSON.stringify(profiles));
}


async function getAndSaveCreditProfilesList(callback){
	temporaryDisableCurrentButton();
	infoMsg('Updating..');
	let plist = new Array();

	let cred_profiles_contract = await new window.web3js_reader.eth.Contract(credit_profiles_register_abi, window.credit_profiles_register_contract_address); 
	let profiles_len = await cred_profiles_contract.methods.creditProfilesLength().call({from:userObject.account});
	

	
	for(let i=0; i< profiles_len; i++){
		let option = {};
		let prof_details = await cred_profiles_contract.methods.creditProfiles(i).call({from:userObject.account});
		
		
	
		option['id'] = prof_details[0];
		option['name'] = prof_details[1];
		option['_type'] = prof_details[2];
		option['_token_address'] = prof_details[3];
		option['valuation_percent'] = prof_details[4];
		option['init_apy'] = prof_details[5];
		option['rate'] = prof_details[6];
	

		plist.push(option);
	}
	
	callback( JSON.stringify(plist));
}

async function getAndSaveOnlyLiqPairs(callback){
	temporaryDisableCurrentButton();
	infoMsg('Updating..');
	let profiles = new Array();
	let dep_profiles_contract = await new window.web3js_reader.eth.Contract(profiles_register_abi, window.depprofiles_register_contract_address); 
	let dpl = await dep_profiles_contract.methods.depositProfilesLength().call({from:userObject.account});
	for (let i = 0; i < dpl; i++){
            
            	let prof_details = await dep_profiles_contract.methods.depositProfiles(i).call({from:userObject.account});
            	p_dep_type = prof_details[2];
            	if (parseInt(p_dep_type ) != UNISWAP_PAIR) continue;

				p_id = prof_details[0];
				p_name = prof_details[1];
				
				p_tok_addr = prof_details[3];
				init_apy = prof_details[4];
				rate = prof_details[5];
				profiles.push({ p_id: p_id, p_name: p_name, p_dep_type: p_dep_type, p_tok_addr: p_tok_addr, init_apy: init_apy, rate: rate });
	}
	callback( JSON.stringify(profiles));
}

async function getAndSaveFullAssetsList(callback){
	temporaryDisableCurrentButton();
	infoMsg('Updating..');
	let profiles = new Array();
	let dep_profiles_contract = await new window.web3js_reader.eth.Contract(profiles_register_abi, window.depprofiles_register_contract_address); 
	let dpl = await dep_profiles_contract.methods.depositProfilesLength().call({from:userObject.account});
	for (let i = 0; i < dpl; i++){
            
            	let prof_details = await dep_profiles_contract.methods.depositProfiles(i).call({from:userObject.account});
            	p_dep_type = prof_details[2];
            	

				p_id = prof_details[0];
				p_name = prof_details[1];
				
				p_tok_addr = prof_details[3];
				init_apy = prof_details[4];
				rate = prof_details[5];
				profiles.push({ p_id: p_id, p_name: p_name, p_dep_type: p_dep_type, p_tok_addr: p_tok_addr, init_apy: init_apy, rate: rate });
	}
	callback( JSON.stringify(profiles));
}

function setBackendParameter(var_name, var_value){
	//can update only asset_description/asset_price
	
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("servicekeyauth", window.service_key);

	var raw = JSON.stringify({	"var_name":var_name, //key for update
								"var_value":var_value
							});
	

	var requestOptions = {
	  method: 'POST',
	  headers: myHeaders,
	  body: raw,
	  redirect: 'follow'
	};

	fetch(WALLETS_API_URL+'/set_var', requestOptions)
	  .then(response => {	
	  						if (response.status !== 200){
	  							throw new Error(response.status);
	  						} else {
	  							return response.clone().json();
	  						}
	  						
	  					})
	  .then(respJson => {
	  						
	  						if (respJson.type === "success"){
  								
								resetMsg();
								
	  						} else {
								errorMsg('backend parameter update failure');
	  						}


	  					})
	  .catch(error => 	{
	  						errorMsg('backend parameter update failure: '+error);
	
	  					});    	
}




function openEtherscanLink(eth_addr){
	let ch ='';
	if (window.chainId == '0x38') ch = ''
	else ch = 'testnet.';
	let url = 'https://'+ch+'bscscan.com/address/'+eth_addr;
	window.open(url,'_blank');
}

function getSmartContractDepositProfile(getProfileIdCallback, setDetailsCallback){
	if (getProfileIdCallback() == 0){
		 infoMsg('please select profile');
		 return;
	}
	
	getSmartcontractDepositProfileDetails(getProfileIdCallback, setDetailsCallback);
}

async function getSmartcontractDepositProfileDetails(getProfileIdCallback, setDetailsCallback){
  
   	var profile_id = getProfileIdCallback();
  	initDepProfilesContract(async (contractInstance) => {
	      
      	let prof_details = await contractInstance.methods.getDepositProfileById(profile_id).call({from:userObject.account});
		
		let json_details = {};
		json_details['id'] = prof_details[0];
		json_details['name'] = prof_details[1];
		json_details['deposit_type'] = rev_dep_types[prof_details[2]];
		json_details['deposit_token_address'] = prof_details[3];
		json_details['init_apy'] = prof_details[4];
		json_details['rate'] = prof_details[5];
		json_details['reward_per_day'] = prof_details[6];
		json_details['min_lock_time'] = prof_details[7];
		
		setDetailsCallback(json_details);
	  
	});
}


function getSmartContractCreditProfile(getProfileIdCallback, setDetailsCallback){
	if (getProfileIdCallback() == 0){
		 infoMsg('please select profile');
		 return;
	}
	
	getSmartcontractCreditProfileDetails(getProfileIdCallback, setDetailsCallback);
}

async function getSmartcontractCreditProfileDetails(getProfileIdCallback, setDetailsCallback){
  
   	var profile_id = getProfileIdCallback();
  	initCredProfilesContract(async (contractInstance) => {
	      
      	let prof_details = await contractInstance.methods.getCreditProfileById(profile_id).call({from:userObject.account});
		
		let json_details = {};
		json_details['id'] = prof_details[0];
		json_details['name'] = prof_details[1];
		json_details['_type'] = rev_dep_types[prof_details[2]];
		json_details['_token_address'] = prof_details[3];
		json_details['valuation_percent'] = prof_details[4];
		json_details['init_apy'] = prof_details[5];
		json_details['rate'] = prof_details[6];
	
		setDetailsCallback(json_details);
	  
	});
}


function updateSmartContractDepositProfile(	getProfileIdCallback, 
										getUIDetailsCallback, //details from UI
										callback = null){
		

	var profile_id = getProfileIdCallback();
	if (profile_id > 0) {
		
		
		let details = getUIDetailsCallback();

		

		initDepProfilesContract((contractInstance) => {

  
		     		
		     		//(uint32 id, string calldata name, uint8 deposit_type, address deposit_token_address, uint256 reward_per_day, uint256 min_lock_time) 
			      	contractInstance.methods.replaceDepositProfileAtId(	
			      									details['id'], 
			      									details['name'], 
			      									dep_types[details['deposit_type']], 
			      									details['deposit_token_address'],
			      									details['init_apy'],
			      									details['rate'],
			      									details['reward_per_day'],
		      										details['min_lock_time']
												 ).send( {from: userObject.account, gasPrice: window.gp}, function(error, txnHash) {
			        if (error) throw error;
			        	output_transaction(txnHash);
			        	if (callback) callback();
				     	});
			    
		});
			
	}
}

function updateSmartContractCreditProfile(	getProfileIdCallback, 
										getUIDetailsCallback, //details from UI
										callback = null){
		

	var profile_id = getProfileIdCallback();
	if (profile_id > 0) {
		
		
		let details = getUIDetailsCallback();

		

		initCredProfilesContract((contractInstance) => {

  
		     		
		     		//(uint32 id, string calldata name, uint8 deposit_type, address deposit_token_address, uint256 reward_per_day, uint256 min_lock_time) 
			      	contractInstance.methods.replaceCreditProfileAtId(	
			      									details['id'], 
			      									details['name'], 
			      									dep_types[details['_type']], 
			      									details['_token_address'],
			      									details['valuation_percent'],
			      									details['init_apy'],
			      									details['rate']
												 ).send( {from: userObject.account, gasPrice: window.gp}, function(error, txnHash) {
			        if (error) throw error;
			        	output_transaction(txnHash);
			        	if (callback) callback();
				     	});
			    
		});
			
	}
}


function addSmartContractDepositProfile(	getProfileIdCallback, 
										getUIDetailsCallback, //details from UI
										callback = null){
		

	var profile_id = getProfileIdCallback();
	if (profile_id > 0) {
		
		
		let details = getUIDetailsCallback();

		

		initDepProfilesContract((contractInstance) => {
  
    		//(uint32 id, string calldata name, uint8 deposit_type, address deposit_token_address, uint256 reward_per_day, uint256 min_lock_time) 
	      	contractInstance.methods.addDepositProfile(	
	      									details['id'], 
	      									details['name'], 
	      									dep_types[details['deposit_type']], 
	      									details['deposit_token_address'],
	      									details['init_apy'],
			      							details['rate'],
	      									details['reward_per_day'],
      										details['min_lock_time']
										 ).send( {from: userObject.account, gasPrice: window.gp}, function(error, txnHash) {
	        if (error) throw error;
	        	output_transaction(txnHash);
	        	if (callback) callback();
		     	});
	    	});
		
			
	}
}

function addSmartContractCreditProfile(	getProfileIdCallback, 
										getUIDetailsCallback, //details from UI
										callback = null){
		

	var profile_id = getProfileIdCallback();
	if (profile_id > 0) {
		
		
		let details = getUIDetailsCallback();

		

		initCredProfilesContract((contractInstance) => {
  
    		//(uint32 id, string calldata name, uint8 deposit_type, address deposit_token_address, uint256 reward_per_day, uint256 min_lock_time) 
	      	contractInstance.methods.addCreditProfile(	
	      									details['id'], 
	      									details['name'], 
	      									dep_types[details['_type']], 
	      									details['_token_address'],
	      									details['valuation_percent'],
	      									details['init_apy'],
			      							details['rate']
	      									
										 ).send( {from: userObject.account, gasPrice: window.gp}, function(error, txnHash) {
	        if (error) throw error;
	        	output_transaction(txnHash);
	        	if (callback) callback();
		     	});
	    	});
		
			
	}
}

/* ----- */



async function initDataProviderContract(callback = null){
	
	if (!window.data_provider_smartcontract){
		     
		if (window.web3js){
			window.data_provider_smartcontract = await new window.web3js.eth.Contract(data_provider_abi, window.data_provider_contract_address); 
			if (callback) callback(window.data_provider_smartcontract);
		}
		
	} else {
		if (callback) callback(window.data_provider_smartcontract);
	}
} 

async function initVotesCalcContract(callback = null){
	
	if (!window.votes_calc_smartcontract){
		     
		if (window.web3js){
			window.votes_calc_smartcontract = await new window.web3js.eth.Contract(votes_calc_abi, window.votes_calc_contract_address); 
			if (callback) callback(window.votes_calc_smartcontract);
		}
		
	} else {
		if (callback) callback(window.votes_calc_smartcontract);
	}
} 

async function initUsageCalcContract(callback = null){
	
	if (!window.usage_calc_smartcontract){
		     
		if (window.web3js){
			window.usage_calc_smartcontract = await new window.web3js.eth.Contract(usage_calc_abi, window.usage_calc_contract_address); 
			if (callback) callback(window.usage_calc_smartcontract);
		}
		
	} else {
		if (callback) callback(window.usage_calc_smartcontract);
	}
} 

async function initDepProfilesContract(callback = null){
	
	if (!window.depprofiles_smartcontract){
		     
		if (window.web3js){
			window.depprofiles_smartcontract = await new window.web3js.eth.Contract(profiles_register_abi, window.depprofiles_register_contract_address); 
			if (callback) callback(window.depprofiles_smartcontract);
		}
		
	} else {
		if (callback) callback(window.depprofiles_smartcontract);
	}
} 

async function initCredProfilesContract(callback = null){
	
	if (!window.credprofiles_smartcontract){
		     
		if (window.web3js){
			window.credprofiles_smartcontract = await new window.web3js.eth.Contract(credit_profiles_register_abi, window.credit_profiles_register_contract_address); 
			if (callback) callback(window.credprofiles_smartcontract);
		}
		
	} else {
		if (callback) callback(window.credprofiles_smartcontract);
	}
} 

 

function addSmartContractDataProfile(	getUIDetailsCallback, //details from UI
										callback = null){
		
	
	let details = getUIDetailsCallback();

	

	initDataProviderContract((dataproviderContractInstance) => {
	
 		//(uint32 id, string calldata name, uint8 deposit_type, address deposit_token_address, uint256 reward_per_day, uint256 min_lock_time) 
      	dataproviderContractInstance.methods.registerDataProfile(	
      									details['name'],
										details['data_provider_contract'],
										to_bool[details['isInternal']],
										details['_data'],
										details['_decimals']
									 ).send( {from: userObject.account, gasPrice: window.gp}, function(error, txnHash) {
        if (error) throw error;
        	output_transaction(txnHash);
        	if (callback) callback();
	     	});
		   
	});
			

}

function updateSmartContractDataProfile(	 
										getUIDetailsCallback, //details from UI
										callback = null){
			
	
	let details = getUIDetailsCallback();

	

	initDataProviderContract((contractInstance) => {

	  
	     		
	     		//(uint32 id, string calldata name, uint8 deposit_type, address deposit_token_address, uint256 reward_per_day, uint256 min_lock_time) 
		      	contractInstance.methods.replaceDataProfile(	
		      									details['name'],
												details['data_provider_contract'],
												to_bool[details['isInternal']],
												details['_data'],
												details['_decimals']
											 ).send( {from: userObject.account, gasPrice: window.gp}, function(error, txnHash) {
		        if (error) throw error;
		        	output_transaction(txnHash);
		        	if (callback) callback();
			     	});
		    
	});
			
	
}

function getSmartContractDataProfile(getProfileIdCallback, setDetailsCallback){
	if (getProfileIdCallback() == 0){
		 infoMsg('please select profile');
		 return;
	}
	
	getSmartcontractDataProfileDetails(getProfileIdCallback, setDetailsCallback);
}

async function getSmartcontractDataProfileDetails(getProfileIdCallback, setDetailsCallback){
  
   	var profile_id = getProfileIdCallback()-1;

 
	initDataProviderContract(async (contractInstance) => {
	      
      	let prof_details = await contractInstance.methods.data_profiles(profile_id).call({from:userObject.account});

      	
		
		let json_details = {};
		json_details['name'] = prof_details[0];
		json_details['data_provider_contract'] = prof_details[1];
		json_details['isInternal'] = rev_to_bool[prof_details[2]];
		json_details['_data'] = await contractInstance.methods.getData(prof_details[0]).call({from:userObject.account});//prof_details[3];
		json_details['_decimals'] = prof_details[4];
	
		
		setDetailsCallback(json_details);
	  
	});
}

/*------*/


function addSmartContractFamerProfile(	getUIDetailsCallback, //details from UI
										callback = null){
		
	
	let details = getUIDetailsCallback();

	

	initFamersRegisterContract((famersContractInstance) => {
	
 		//(uint32 id, string calldata name, uint8 deposit_type, address deposit_token_address, uint256 reward_per_day, uint256 min_lock_time) 
      	famersContractInstance.methods.registerFamer(	
      									details['famer_token_address'], 
      									to_bool[details['sold']], 
      									details['sold_for']
									 ).send( {from: userObject.account, gasPrice: window.gp}, function(error, txnHash) {
        if (error) throw error;
        	output_transaction(txnHash);
        	if (callback) callback();
	     	});
		   
	});
			

}

function updateSmartContractFamerProfile(	 
										getUIDetailsCallback, //details from UI
										callback = null){
			
	
	let details = getUIDetailsCallback();

	

	initFamersRegisterContract((famersContractInstance) => {

	  
	     		
	     		//(uint32 id, string calldata name, uint8 deposit_type, address deposit_token_address, uint256 reward_per_day, uint256 min_lock_time) 
		      	famersContractInstance.methods.replaceFamer(	
		      									details['famer_token_address'], 
		      									to_bool[details['sold']], 
		      									details['sold_for']
											 ).send( {from: userObject.account, gasPrice: window.gp}, function(error, txnHash) {
		        if (error) throw error;
		        	output_transaction(txnHash);
		        	if (callback) callback();
			     	});
		    
	});
			
	
}

function copyToClipboard(){
  var copyText = document.getElementById("call_results");

  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  document.execCommand("copy");
}

function copyToClipboardInput(elem = null){

  let copyText;
  if (elem) copyText = document.getElementById(elem)
  else copyText = event.srcElement;		

  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  document.execCommand("copy");
}


async function getAnalysisTable(){
		

	
			
		
		depositContractInstance = window.staking_smartcontract_reader;
		
		
		creditContractInstance = window.credit_smartcontract_reader;
		
	
		liqlevContractInstance = window.liqlev_smartcontract_reader;
		
		if (!userObject.deposit_profiles){
			userObject.deposit_profiles = await getAllProfiles();;
		} else {
			//
		}
		

		let html = 
									'<table class="table" style="font-size: 0.75em; color: black;">'+
									 '<thead>'+
									    '<tr style="text-align:left">'+
									      '<th>Customer #</th>'+
									      '<th>Customer<br>wallet</th>'+
									      '<th>In good<br>standing?</th>'+
									   '</tr>'+
									  '</thead>'+ 
									  '<tbody>';
	
    	
    	let cust_count = await creditContractInstance.methods.getCustomersCreditsLength().call({from: userObject.account});

		
    	//console.log('cust_count=', cust_count);
		let cust_id_col = new Array();
		let cust_wallets_col = new Array();
		let cust_status_col = new Array();

		//let analyze_res = await liqlevContractInstance.methods.analyzeLiquidationAll().call({from: userObject.account});
		
		let active_customers_arr = new Array();
		for (let i = 0; i < cust_count; i++){
			infoMsg('analyze customer '+(i+1).toString()+' out of '+cust_count.toString());
			cust_id_col.push('<td>'+i.toString()+'</td>');

			let cust = await creditContractInstance.methods.getCustomersCreditsItem(i).call({from: userObject.account});
			cust_wallets_col.push('<td>'+cust[0]+'</td>');

			
			let bad__credits_count = 0; 
			let active_credits = 0;
	        for (let j=0; j < parseInt(cust[1]); j++){
	        	let res;
	        	 try {
	             	res = await analyzeLiquidationForCredit(i,j, cust[0]);
	             	active_credits += parseInt(res[3]);
	             } catch(err) {

	             	//console.log('i,j=',i,j);
	             }
	             //console.log('res =',res)
	             if (res[0]){		                 
	                 bad__credits_count++;
	             }
	        }

	        if (active_credits > 0){
	        	active_customers_arr.push(1);
	        } else {
	        	active_customers_arr.push(0);
	        }
		
			let txt ='';
			if (bad__credits_count == 0){
				if (active_credits > 0){
					txt = 'Yes: <button  onclick="analyze_customer('+i.toString()+')">Details</button>';
				} else {
					txt = 'Yes';
				}
				cust_status_col.push('<td style="background-color: green">'+txt+'</td>');
			} else {
				txt = 'No: <button  onclick="analyze_customer('+i.toString()+')">Details</button>';
				cust_status_col.push('<td style="background-color: orange">'+txt+'</td>');
				
			}
			
		}

		
		
		
		
		for (let i = 0; i < cust_count; i++){
            //0 means max amount for ERC20 compatible and ignored for ERC721
            	if (active_customers_arr[i] == 0) continue;
             	html += '<tr style="text-align: left; font-size: 0.75em">';
            
            	html += cust_id_col[i];

	            html += cust_wallets_col[i];

	            html += cust_status_col[i];
    	
	           
              	html += '</tr>';
    	}
        

				      	

		html +=	'</tbody>'+
			'</table>';

	    safeSetInnerHTMLById('analysis_table', html);
	    safeSetInnerHTMLById('cust_analysis_table', '');
	    resetMsg();


}

/*
async function processLiquidationForCredit_aux1( cust_index,  credit_index){

		 let creditContract = window.credit_smartcontract_reader;

		 let res = await creditContract.methods.viewCustomerCreditByIndex(cust_index,credit_index).call({from: userObject.account});
         
         let credit_profile_id = parseInt(res[0]);
         let collateral_profile_id = parseInt(res[1]);
         let collateral_id = parseInt(res[2]);
         let credit_amount = new BN(res[3]);
         let linked_dep_id = parseInt(res[6]); 
        
        
        return [credit_profile_id, collateral_profile_id, linked_dep_id, 
                    credit_amount, collateral_id ]; 
}*/
/*
async function processLiquidationForCredit_aux2(cust_wallet,  collateral_id,  collateral_profile_id){
         
        let creditContract = window.credit_smartcontract_reader;
      
        let res = await creditContract.methods.viewCustomerCollateral(cust_wallet, collateral_id).call({from: userObject.account});
        let clt_index = parseInt(res[1]);
         
        
        let res1  = await creditContract.methods.viewCustomerCollateralByIndex( clt_index, collateral_id).call({from: userObject.account});

        let deposit_profile_id = parseInt(res1[0]);
        let deposit_amount = new BN(res1[1]);
                
        if (deposit_profile_id != collateral_profile_id) alert('failure 38');
        
        return [deposit_amount, clt_index]; 
}*/


async function calcLiq_aux(credit_usd_value_bn, coll_usd_value_bn, credit_profile_id,  collateral_profile_id){

	//	console.log('===calcLiq_aux===');

		let usageContract = window.usage_calc_smartcontract_reader;


		if (credit_usd_value_bn.lt(coll_usd_value_bn)){
			return [0,0];
		} 
        
		credit_usd_value = credit_usd_value_bn.div(new BN(ADJ_CONSTANT.toString()));
		coll_usd_value = coll_usd_value_bn.div(new BN(ADJ_CONSTANT.toString()));	
		
	//	console.log('credit/collateral', credit_usd_value.toString(), coll_usd_value.toString());	

        let t_am_to_liq = credit_usd_value.sub(coll_usd_value); //in usd
        t_am_to_liq = await usageContract.methods.calcFromUSDValue(t_am_to_liq, collateral_profile_id).call({from: userObject.account}); //in coll asset tokens_number
        t_am_to_liq = await usageContract.methods.adjustedAsset(collateral_profile_id, t_am_to_liq).call({from: userObject.account}); //adjusted to (1/(1-coll_val%))
        let coll_am_to_liq = new BN(t_am_to_liq); //it is amount we will liquidate in customers collateral
        t_am_to_liq = await usageContract.methods.calcUSDValueByProfileNonNFT(collateral_profile_id, coll_am_to_liq).call({from: userObject.account});//back to usd
        t_am_to_liq = await usageContract.methods.calcFromUSDValue(t_am_to_liq, credit_profile_id).call({from: userObject.account}); //in credit asset tokens_number
        let credit_am_to_liq = new BN(t_am_to_liq);
        return [coll_am_to_liq, credit_am_to_liq];
}

/*
async function analyzeLiquidation( cust_index,  credit_index,  cust_wallet){

		 let usageContract = window.usage_calc_smartcontract_reader;

		 let credit_profile_id,  collateral_profile_id,  linked_dep_id, credit_amount,  collateral_id;

         [ cred_p_id,  clt_p_id,  l_dep_id, 
          credit_amount,  clt_id] = await processLiquidationForCredit_aux1(cust_index, credit_index);

        if (credit_amount.toString() == "0") return [false,0,0];

        credit_profile_id = parseInt(cred_p_id);  
        collateral_profile_id = parseInt(clt_p_id);
        linked_dep_id = parseInt(l_dep_id);
        collateral_id = parseInt(clt_id);


        let coll_amount,  clt_index;
        [coll_amount, clt_index] =  await processLiquidationForCredit_aux2( cust_wallet, collateral_id, collateral_profile_id);
       
        if (collateral_profile_id != 7){//NFT
            coll_amount = coll_amount.mul(new BN(mwei_scale));//in mwei_scale for usd
        }
        credit_amount = credit_amount.mul(new BN(mwei_scale));//in mwei_scale for usd
        
        let coll_usd_value = new BN(await usageContract.methods.calcUSDValueCollateral(cust_wallet,linked_dep_id,coll_amount, credit_profile_id ).call({from: userObject.account}));
        let credit_usd_value = new BN(await usageContract.methods.calcUSDValueByProfileNonNFT(credit_profile_id, credit_amount).call({from: userObject.account}));
        
        if (coll_usd_value.lt(credit_usd_value)) console.log('failure: coll_usd_value < credit_usd_value')

         if (collateral_profile_id == 7){//NFT
            coll_usd_value = coll_usd_value.mul(new BN(mwei_scale));//in mwei_scale for usd
        }
        
        
        let need_to_liquidate = false;
        let coll_am_to_liq = new BN(0);
        let credit_am_to_liq = new BN(0);
        
        //adjust with liq %% 
        let liq_limit = 0;
       
        liq_limit = await usageContract.methods.getLiquidationLimitByProfileId(credit_profile_id).call({from: userObject.account});; //return like 95% = 95000
        
        if (liq_limit == 0) liq_limit = apy_scale;
        
        let comp_value = credit_usd_value.mul(new BN(liq_limit));
        comp_value = comp_value.div(new BN(apy_scale));
        
        if (coll_usd_value.lt(comp_value)){   
            need_to_liquidate = true;    
        } 
       
        
        if (need_to_liquidate){ //calc volume to liquidate
             if (collateral_profile_id != 7){
                  [coll_am_to_liq, credit_am_to_liq] = await calcLiq_aux( credit_usd_value, coll_usd_value, credit_profile_id,  collateral_profile_id);
                  coll_am_to_liq = coll_am_to_liq.div(new BN(mwei_scale));
                  credit_am_to_liq = credit_am_to_liq.div(new BN(mwei_scale));
                  return [true,coll_am_to_liq, credit_am_to_liq];
             } else {
                  return [true,coll_amount, credit_amount.div(new BN(mwei_scale))];
             }
        } else {
            return [false,0,0];
        }
        
     
        
        //1 - 10 ETH collateral, rate 1300, 0,75 ratio, eth coll usd value = 9750, credit 9750 USDT 
        //2 - 10 ETH collateral, rate 1200, 0,75 ratio, eth coll usd value = 9000, credit 9750 USDT
        //3 - 750 usd in eth = 0,625 (@ 1200), cut = 0,625 /(1-0,75) = 2,5 ETH, usd value = 3000 usdt 
        //4  - final coll cut 2,5 = 7,5 // credit cut 3000 = 6750
        //5 7,5 x 1200 = 9000 x 0,75 = 6750, credit = 6750
        
        
}
*/

async function calcAssetUsdValue(profile_id, w_amount, token_ids){//wei amount - BN(!)
		//console.log('calcAssetUsdValue params:', profile_id,w_amount,token_ids);

		let contract = window.data_provider_smartcontract_reader;
		let dep_profiles_contract = await new window.web3js_reader.eth.Contract(profiles_register_abi, window.depprofiles_register_contract_address); 
	
        
        let res  = await dep_profiles_contract.methods.getDepositProfileById(profile_id).call({from:userObject.account});
        //console.log('res profiles=', res);

		if (parseInt(res[2]) == NATIVE_ETHEREUM){
			let wei_amount = w_amount;
			
			let [data, dec] = await Promise.all([ contract.methods.getData('BNBUSD').call({from:userObject.account}), contract.methods.getDecimals('BNBUSD').call({from:userObject.account})]);
			
			let usd_bn = new BN(wei_amount.mul(new BN(data) ));
			//console.log('usd_bn', usd_bn.toString());
			let base = new BN(10);
			let div_dec = new BN(base.pow(new BN(dec)));	
			let usd_adj = new BN( usd_bn.div(div_dec));	

			//console.log ('usd_adj eth=', usd_adj);
			
			//let usd_float = parseFloat(window.web3js_reader.utils.fromWei(usd_adj, 'ether'));
			return usd_adj;
		} else if (parseInt(res[2]) == ERC721_TOKEN){
			let vc_contract;
			await initVotesCalcContractReader(async (c) => {
				vc_contract = c;
			});

			
		 

		 	let wei_am = await vc_contract.methods.calcNFTTokensValue(token_ids).call({from:userObject.account});//cytr
		 	let wei_amount = new BN(wei_am);
		 	
		 	let [data, dec] = await Promise.all([ contract.methods.getData('ETNAUSD').call({from:userObject.account}), contract.methods.getDecimals('ETNAUSD').call({from:userObject.account})]);
			
		 	//let data = await contract.methods.getData('CYTRUSD').call({from:userObject.account});
			//let dec = await contract.methods.getDecimals('CYTRUSD').call({from:userObject.account});
			let usd_bn = new BN(wei_amount.mul(new BN(data) ));
			//console.log('usd_bn', usd_bn.toString());
			let base = new BN(10);
			let div_dec = new BN(base.pow(new BN(dec)));	
			let usd_adj = new BN( usd_bn.div(div_dec));	
			//console.log('usd_adj', usd_adj.toString());
			//let usd_float = parseFloat(window.web3js_reader.utils.fromWei(usd_adj, 'ether'));
			//console.log ('usd_adj erc721=', usd_adj);
			return usd_adj;

		} else if (parseInt(res[2])  == ERC20_TOKEN || parseInt(res[2])  == UNISWAP_PAIR){
			
			
			let wei_amount = w_amount; 

			let [data, dec] = await Promise.all([contract.methods.getData(res[1]).call({from:userObject.account}), contract.methods.getDecimals(res[1]).call({from:userObject.account})]);  
			//let data = await contract.methods.getData(userObject.state.selected_depprofile_name).call({from:userObject.account});
			//let dec = await contract.methods.getDecimals(userObject.state.selected_depprofile_name).call({from:userObject.account});
			let usd_bn = new BN(wei_amount.mul(new BN(data) ));
			//console.log('usd_bn', usd_bn.toString());
			let base = new BN(10);
			let div_dec = new BN(base.pow(new BN(dec)));	
			let usd_adj = new BN( usd_bn.div(div_dec));	
			//console.log('usd_adj', usd_adj.toString());
			//let usd_float = parseFloat(window.web3js_reader.utils.fromWei(usd_adj, 'ether'));
			//console.log ('usd_adj erc20=', usd_adj);
			return usd_adj;
		}
}


async function calcCollateralUSDValue( clt_amount,  collateral_profile_id, get_credit_profile_id, token_ids){   

		let usd_val = await calcAssetUsdValue(collateral_profile_id, clt_amount, token_ids);
		//console.log('calcCollateralUSDValue usd_val =', usd_val.toString());
        
        let cred_profile = await window.credprofiles_smartcontract.methods.getCreditProfileById(collateral_profile_id).call({from:userObject.account});
		//console.log(cred_profile);

		let c_id = cred_profile[0];
		let c_val_perc = new BN(cred_profile[4]);
      
        if (c_id == BAD_CREDIT_PROFILE_ID) return 0;
        
        
        let usd_valued =  usd_val.mul(c_val_perc);
        usd_valued = usd_valued.div(new BN(apy_scale));
     	//console.log('calcCollateralUSDValue usd_valued =', usd_valued.toString());   
     

        let usd_valued_adj = await adjustWithPairCoefficientGet(get_credit_profile_id, collateral_profile_id, usd_valued);
        //console.log('calcCollateralUSDValue usd_valued_adj =', usd_valued_adj.toString());   
     
        
        return usd_valued_adj;
       
}




async function adjustWithPairCoefficientGet( get_credit_profile_id,  collateral_profile_id,  amount){//amount - BN
         let adj_coeff = await window.usage_calc_smartcontract_reader.methods.getAdjCoeffByPair( collateral_profile_id,  get_credit_profile_id).call({from:userObject.account});
      
         if (parseInt(adj_coeff) == 0 || parseInt(adj_coeff) == apy_scale) return amount;
         
         amount = amount.mul(new BN(adj_coeff));
         amount = amount.div(new BN(apy_scale));
         return amount;
}


async function analyzeLiquidationForCredit(cust_id, cred_id, cust_wallet){

			let creditContractInstance = window.credit_smartcontract_reader;
			let usageContract = window.usage_calc_smartcontract_reader;


			let credit = await creditContractInstance.methods.viewCustomerCreditByIndex(cust_id,cred_id).call({from: userObject.account});
			
			
			if (credit.credit_amount == 0 && credit.acc_fee == 0) return [false,0,0,0];
		
			
			let coll = await creditContractInstance.methods.viewCustomerCollateralByIndex(cust_id, parseInt(credit.collateral_id)).call({from: userObject.account});
			
			
			let usd_v_cred =  await calcAssetUsdValue(parseInt(credit.profile_id),new BN(credit.credit_amount),new Array());
			//console.log('usd_v_cred=',usd_v_cred.toString());


			let token_ids = new Array();
			if (credit.collateral_profile_id == "7"){
				let tn = parseInt(coll.tokens_number);
				for (let j=0; j < tn; j++){
					let t_id = await window.credit_smartcontract_reader.methods.viewCustomerCollateralTokenByIndex(cust_id, parseInt(credit.collateral_id),j).call({from: userObject.account});
					token_ids.push(t_id);
				}

			}
			let usd_v_coll = await calcCollateralUSDValue( new BN(coll.deposit_amount),  parseInt(coll.deposit_profile_id), parseInt(credit.profile_id), token_ids);  

			//console.log('usd_v_coll=',usd_v_coll.toString());
			
			
			let bad_credit = false;
			let analyze_res;
		
/***/
			//if (usd_v_coll.lt(usd_v_cred)) return [true, new BN(coll.deposit_amount), new BN(credit.credit_amount)];

	        
	        let need_to_liquidate = false;
	        let coll_am_to_liq = new BN(0);
	        let credit_am_to_liq = new BN(0);
	        
	        //adjust with liq %% 
	        let liq_limit = new BN(0);
	       
	        liq_limit = await usageContract.methods.getLiquidationLimitByProfileId(parseInt(credit.profile_id)).call({from: userObject.account});; //return like 95% = 95000
	        
	        if (liq_limit == 0) liq_limit = apy_scale;
	        
	        let comp_value = usd_v_cred.mul(new BN(liq_limit));
	        comp_value = comp_value.div(new BN(apy_scale));
	        
	        if (usd_v_coll.lt(comp_value)){   
	            need_to_liquidate = true;    
	        } 
	       
	       
	        if (need_to_liquidate){ //calc volume to liquidate
	             if (credit.collateral_profile_id != "7"){
	             	  //console.log('comp_val=', comp_value.toString(),'usd_v_coll=',usd_v_coll.toString() );

	                  [coll_am_to_liq, credit_am_to_liq] = await calcLiq_aux( comp_value, usd_v_coll, parseInt(credit.profile_id), parseInt(credit.collateral_profile_id));
	                  //coll_am_to_liq = coll_am_to_liq.div(new BN(mwei_scale));
	                  //credit_am_to_liq = credit_am_to_liq.div(new BN(mwei_scale));
	                  //console.log('need to liquidate', true, coll_am_to_liq.toString(), credit_am_to_liq.toString());
	                  return [true,coll_am_to_liq, credit_am_to_liq,1];
	             } else {
	                  return [true, new BN(coll.deposit_amount), new BN(credit.credit_amount),1];
	                  //console.log('need to liquidate', false,coll.deposit_amount, credit.credit_amount);
	             }
	        } else {
	        	//console.log('need to liquidate', false,0,0);
	            return [false,0,0,1];
	        }
	

}


async function analyze_customer(cust_id){
		
		safeSetInnerHTMLById('cust_analysis_table', '');
		depositContractInstance = window.staking_smartcontract_reader;
		
		
		creditContractInstance = window.credit_smartcontract_reader;
		
	
		liqlevContractInstance = window.liqlev_smartcontract_reader;

		if (!userObject.deposit_profiles){
			userObject.deposit_profiles = await getAllProfiles();;
		} else {
			//
		}

		let profiles;
    	if (!window.all_profiles){
    		profiles = await getAllProfilesWithUniswap();
    		window.all_profiles = profiles;
    	} else {
    		profiles = window.all_profiles;
    	}
		
		let cust = await creditContractInstance.methods.getCustomersCreditsItem(cust_id).call({from: userObject.account});
		window.current_cust = cust;

		let credits_count = parseInt(cust[1]);
		

		let html = 					'<div><h6 style="color:black">customer id: '+cust_id.toString()+' wallet: '+cust[0]+'</h6></div>'+
									
									'<table class="table" style="font-size: 0.75em; color: black;">'+
									 '<thead>'+
									    '<tr style="text-align:left">'+
									      '<th>Credit #</th>'+
									      '<th>Credit asset</th>'+
									      '<th>Credit value</th>'+
									      '<th>Collateral asset</th>'+
									      '<th>Collateral value</th>'+
									      '<th>In good<br>standing?</th>'+
									      '<th>Liquidation: credit/ collateral</th>'+
									      '<th>Credit after liquidation</th>'+	
									      '<th>Collateral after liquidation</th>'+	
									      //'<th>Leverage</th>'+	
									   '</tr>'+
									  '</thead>'+ 
									  '<tbody>';
	
    
		let credit_id_col = new Array();
		let credit_asset_col = new Array();
		let credit_val_col = new Array();
		let credit_usd_val_col = new Array();
		let coll_asset_col = new Array();
		let coll_val_col = new Array();
		let coll_usd_val_col = new Array();
		let credit_status_col = new Array();
		let liq_amnts_col = new Array();
		let credit_after_liq_col = new Array();
		let coll_after_liq_col = new Array();
		//let lev_data_col = new Array();

		//console.log('credits_count=',credits_count);		
		for (let i = 0; i < credits_count; i++){
			infoMsg('analyze credit '+(i+1).toString()+' out of '+credits_count.toString());

			let credit = await creditContractInstance.methods.viewCustomerCreditByIndex(cust_id,i).call({from: userObject.account});
			//console.log('credit=', credit, 'c_id=',i);
			//continue;
			
			if (credit.credit_amount == 0 && credit.acc_fee == 0) continue;
			//if(credit.collateral_profile_id == "7") continue;
		
			
			let coll = await creditContractInstance.methods.viewCustomerCollateralByIndex(cust_id, credit.collateral_id).call({from: userObject.account});
			//console.log('coll=', coll);
			//let asset_name = 

			credit_id_col.push('<td>'+i.toString()+'</td>');

			let p_cred_name;
			profiles.forEach( e => {if (e.p_id == credit.profile_id){ p_cred_name = e.p_name;} });

			credit_asset_col.push('<td>'+p_cred_name+'</td>');
			
			
			let usd_v_cred =  await calcUSDValueByProfileNonNFT(credit.credit_amount,credit.profile_id);
			
			credit_val_col.push('<td>body: '+(credit.credit_amount)+'<br>fee: '+credit.acc_fee+'<br>USD val: '+usd_v_cred.toString()+'USD</td>');
			
			let p_clt_name;
			profiles.forEach( e => {if (e.p_id == credit.collateral_profile_id){ p_clt_name = e.p_name;} });


			coll_asset_col.push('<td>'+p_clt_name+'</td>');
			//console.log(cust[0], credit.linked_dep_id,coll.deposit_amount,credit.profile_id);
			
			//let usd_v_coll  = await window.usage_calc_smartcontract_reader.methods.calcUSDValueCollateral(cust[0], parseInt(credit.linked_dep_id),coll.deposit_amount,parseInt(credit.profile_id)).call({ from: userObject.account});
			let token_ids = new Array();
			if (credit.collateral_profile_id == "7"){
				let tn = parseInt(coll.tokens_number);
				for (let j=0; j < tn; j++){
					let t_id = await window.credit_smartcontract_reader.methods.viewCustomerCollateralTokenByIndex(cust_id, parseInt(credit.collateral_id),j).call({from: userObject.account});
					token_ids.push(t_id);
				}

			}
			let usd_v_coll = await calcCollateralUSDValue( new BN(coll.deposit_amount),  coll.deposit_profile_id, credit.profile_id, token_ids);  
			let usd_v_coll_t = (parseFloat(window.web3js_reader.utils.fromWei(usd_v_coll, 'ether'))).toFixed(2);

			coll_val_col.push('<td>native: '+(coll.deposit_amount)+'<br>in usd:'+usd_v_coll_t.toString()+'</td>');
			//console.log('usd_v_coll', usd_v_coll);
	
			
			let bad_credit = false;
			let analyze_res;
		

			
			if (credit.collateral_profile_id != "7"){
				//console.log('anal params=',cust_id, i, cust[0]);
				analyze_res = await analyzeLiquidationForCredit(cust_id, i, cust[0]);
				bad_credit = analyze_res[0];
				//console.log(analyze_res);
			} else {

				if (usd_v_cred > usd_v_coll_t){
					bad_credit = true;
				}
			}
			

			if (!bad_credit){
				credit_status_col.push('<td style="background-color: green">Yes</td>');
			} else {
				//console.log('wlt=',cust[0]);
				let txt;
				if (credit.collateral_profile_id != "7"){
					txt = 'No: <button  onclick="processLiquidationForCreditClick('+cust_id+','+ i.toString()+',\''+cust[0]+'\')'+'">Liquidate Credit</button>';
				} else {
					txt = 'No: <button  onclick="processLiquidationForCreditNFTClick('+cust_id+','+ i.toString()+',\''+cust[0]+'\')'+'">NFT: Full Liquidate Credit</button>';
				}
				//console.log('txt==', txt);
        					
				credit_status_col.push('<td style="background-color: orange">'+txt+'</td>');
			}
			if (credit.collateral_profile_id != "7"){
				liq_amnts_col.push('<td>'+'coll liq: '+analyze_res[1]+'<br>credit liq: '+analyze_res[2]+'</td>');
			
				let coll_liq_bn = new BN(analyze_res[1]);
				let cred_liq_bn = new BN(analyze_res[2]);
				let cred_am_bn = new BN(credit.credit_amount);
				let coll_am_bn = new BN(coll.deposit_amount);

				

				let diff_cred_bn = cred_am_bn.sub(cred_liq_bn);
				let diff_coll_bn = coll_am_bn.sub(coll_liq_bn);

				let usd_cred_diff =  await calcUSDValueByProfileNonNFT(diff_cred_bn.toString(),parseInt(credit.profile_id));
			
				
				credit_after_liq_col.push('<td>'+diff_cred_bn.toString()+'<br>'+usd_cred_diff.toString()+' USD </td>');


				/**/
				let empty_t_ids = new Array();
				
				let usd_v_coll_diff = await calcCollateralUSDValue( diff_coll_bn,  coll.deposit_profile_id, credit.profile_id, empty_t_ids);  

				/**/
			
				//***let usd_v_coll_diff  = await window.usage_calc_smartcontract_reader.methods.calcUSDValueCollateral(cust[0], parseInt(credit.linked_dep_id),diff_coll_bn.toString(),parseInt(credit.profile_id)).call({ from: userObject.account});

				coll_after_liq_col.push('<td>'+diff_coll_bn.toString()+'<br>'+(parseFloat(window.web3js_reader.utils.fromWei(usd_v_coll_diff, 'ether'))).toFixed(2)+' USD </td>');
			} else {
				liq_amnts_col.push('<td>NA</td>');
				credit_after_liq_col.push('<td>NA (NFT)</td>');
				coll_after_liq_col.push('<td>NA (NFT)</td>');
			}

			// function viewCustomerLeverageByCredId(address cust_wallet, uint256 cred_id) public view 
    		//	returns (uint32 lev_dep_id, uint256 cust_index, uint256 lev_index, uint32 deposit_profile_id, uint256 lev_amount, uint256 lev_date) {
			//let lev = await liqlevContractInstance.methods.viewCustomerLeverageByCredId(cust[0], i).call({from:userObject.account});
			//let lev_s = 'lev. amount: '+lev.lev_amount+ '<br>lev.date:'+timeConverter(parseInt(lev.lev_date));
			//lev_data_col.push('<td>'+lev_s+'</td>');

		}

		
		
		
		
		for (let i = 0; i < credit_id_col.length; i++){
            //0 means max amount for ERC20 compatible and ignored for ERC721
             	html += '<tr style="text-align: left; font-size: 0.75em">';
            
            	html += credit_id_col[i];
				html += credit_asset_col[i]
				html += credit_val_col[i];
				
				html += coll_asset_col[i];
				html += coll_val_col[i];
				
				html += credit_status_col[i];
				html += liq_amnts_col[i];
				html += credit_after_liq_col[i];
				html += coll_after_liq_col[i];
    			//html += lev_data_col[i];
	           
              	html += '</tr>';
    	}
        

				      	

		html +=	'</tbody>'+
			'</table>';

	    safeSetInnerHTMLById('cust_analysis_table', html);
	    resetMsg();


}


function depositIsExtractable( index,  dep_id, customers_deposits, p_min_lock_time) {
        
        if (customers_deposits[index][dep_id].imply_lock == false) return true;


        if (parseInt(Date.now()/1000) < (parseInt(customers_deposits[index][dep_id].deposit_date) + p_min_lock_time)){

        	return false;
        } else {
         	return true;
        }
}

async function depositsStat(profile_id, customers_deposits){    
        let tot_amount = new BN(0);
        let tot_extr_amount = new BN(0);
        let tot_reward = new BN(0);
        let tot_extr_reward = new BN(0);

        let dep_profiles_contract = await new window.web3js_reader.eth.Contract(profiles_register_abi, window.depprofiles_register_contract_address); 
		//let profiles_len = await dep_profiles_contract.methods.depositProfilesLength().call({from:userObject.account});
	
        
        let res  = await dep_profiles_contract.methods.getDepositProfileById(profile_id).call({from:userObject.account});
       
        for (let j=0; j < customers_deposits.length;j++){
            for(let i=0; i < customers_deposits[j].length; i++){
                //Deposit memory dep = customers_deposits[j].deposits[i];
                if (parseInt(customers_deposits[j][i].deposit_profile_id) == profile_id){
                    tot_amount = tot_amount.add( new BN(customers_deposits[j][i].deposit_amount) );
                    let d_rew = await window.staking_smartcontract_reader.methods.depositReward(j,i).call({from: userObject.account});
                    //console.log('d_rew=',d_rew);
                    tot_reward = tot_reward.add( new BN(d_rew) );
                    if ( depositIsExtractable(j,i, customers_deposits, parseInt(res[7]) ) ){
                        tot_extr_amount = tot_extr_amount.add( new BN(customers_deposits[j][i].deposit_amount));
                        tot_extr_reward = tot_extr_reward.add( new BN(d_rew));
                    }
                     
                }
            }
        }
        return [tot_amount, tot_extr_amount, tot_reward, tot_extr_reward];

}

async function buildPortfolioTable(){

		await initStakingContractReader();
		await initCreditContractReader();
		await initLiqLevContractReader();
			
		
		depositContractInstance = window.staking_smartcontract_reader;
		
		
		creditContractInstance = window.credit_smartcontract_reader;
		
	
		liqlevContractInstance = window.liqlev_smartcontract_reader;
		
		
		if (!userObject.deposit_profiles){
			userObject.deposit_profiles = await getAllProfiles();;
		} else {
			//
		}


		/*

			uint256 cdl = prevContract.getCustomersDepositsLength();
          
        for (uint256 i=0; i < cdl; i++){
            (address cust, uint256 dn) = prevContract.getCustomersDepositsItem(i);
            for (uint32 j=0; j < dn; j++){
                //(uint32 deposit_profile_id, uint256 deposit_amount, uint256 tokens_number, uint256 deposit_date, uint256 votes, uint32 famer_id) = prevContract.viewCustomerDepositByIndex(i,j);
                
                Deposit memory dep = getPrevContractDeposit(prevContract,i,j);//Deposit(deposit_profile_id, deposit_amount, tokens_number, deposit_date, votes, famer_id);
                uint256[] memory token_ids = new uint256[](dep.tokens_number);
                for (uint256 k=0; k < dep.tokens_number; k++){
                    
                    uint256 t_id =  prevContract.viewCustomerDepositTokenByIndex(i, j, k);
                    token_ids[k] = t_id;
                    
                }
                addDeposit(cust, dep,  token_ids);  
               
            }
        }
		*/
		
			let customers = new Array();


			let cdl = await depositContractInstance.methods.getCustomersDepositsLength().call({from: userObject.account});
			
			for (let i=0; i < cdl; i++){
				infoMsg('collecting customers data '+(i+1).toString()+' out of '+cdl.toString());
				cust_data = await depositContractInstance.methods.getCustomersDepositsItem(i).call({from: userObject.account});
				//console.log(cust_data);
				
				let cust = cust_data[0];
				let dn = cust_data[1];
				let deposits = new Array();
           		for (let j=0; j < parseInt(dn); j++){
	                //(uint32 deposit_profile_id, uint256 deposit_amount, uint256 tokens_number, uint256 deposit_date, uint256 votes, uint32 famer_id) = 
	                let cust_dep_data =  await depositContractInstance.methods.viewCustomerDepositByIndex(i,j).call({from: userObject.account});
	               // console.log(cust_dep_data);
	                deposits.push(cust_dep_data);
               }
               customers.push(deposits);
			}
			//console.log(customers);
			
			window.customers_deposits = customers;


			let html = 
									'<table class="table" style="font-size: 0.75em; color: black">'+
									 '<thead>'+
									    '<tr style="text-align:left">'+
									      '<th>Asset</th>'+
									      '<th>Currently avail.</th>'+
									      '<th>Balance<br>[Avail - (Deposits+Rew)]</th>'+
									      '<th>Balance<br>[Avail - (Deposits+Rew)<br>+ (Credits+Fee)]</th>'+
									      '<th>In Deposits</th>'+
									      '<th>In Deposits<br>USD value</th>'+
									      '<th>Extractable<br>now</th>'+
									      '<th>Current<br>reward</th>'+
									      '<th>Extractable<br>reward</th>'+
									      '<th>APY</th>'+
									      //'<th>Withdrawn by<br>customers</th>'+
									      '<th>Credits</th>'+
									      '<th>Credits<br>fee</th>'+
									   '</tr>'+
									  '</thead>'+ 
									  '<tbody>';
	
    	let profiles;
    	if (!window.all_profiles){
    		profiles = await getAllProfilesWithUniswap();
    		window.all_profiles = profiles;
    	} else {
    		profiles = window.all_profiles;
    	}
    	

		let asset_column = new Array();
		let dep_column = new Array();
		let dep_column_val = new Array();
		let dep_column_usd = new Array();
	    let cur_avail_column = new Array();
	    let cur_avail_column_val = new Array();
		let extractable_dep_col = new Array();
		let reward_col = new Array();
		let reward_col_val = new Array();
		let extractable_reward_col = new Array();
		let cred_column = new Array();
		let cred_column_val = new Array();
		let fee_column = new Array();
		let fee_column_val = new Array();
		
		
		for (let i = 0; i < profiles.length; i++){		
			infoMsg('run analysis for profile '+(i+1).toString()+' out of '+profiles.length.toString());

			if (parseInt(profiles[i]['p_dep_type']) == UNISWAP_PAIR){
				asset_column.push('<th scope="row" style="background-color: grey">'+profiles[i]['p_name']+'</th>');

			} else {
				asset_column.push('<th scope="row">'+profiles[i]['p_name']+'</th>');
			}
			
			let dep_stat =  await depositsStat(parseInt(profiles[i]['p_id']), customers );//await depositContractInstance.methods.depositsStat(parseInt(profiles[i]['p_id'])).call({from:userObject.account});
			//console.log('dep_stat =', dep_stat);
			
			
			let dep_total = dep_stat[0];
			if (parseInt(profiles[i]['p_dep_type']) != ERC721_TOKEN)
			 	dep_total = window.web3js_reader.utils.fromWei(dep_total, 'ether');
			let dep_total_str = ((parseFloat(dep_total)).toFixed(3)).toString();  
			//console.log(dep_total_str);

			dep_column.push('<td>'+dep_total_str+'</td>');
			dep_column_val.push(parseFloat(dep_total));

			if (parseInt(profiles[i]['p_dep_type']) != ERC721_TOKEN){
				let am =  await calcUSDValueByProfileNonNFT(dep_stat[0].toString(),parseInt(profiles[i]['p_id']));
				//console.log('am usd=',am);
				dep_column_usd.push('<td>'+am+'</td>');
			} else {
				dep_column_usd.push('<td>-</td>');
			}

			let extr_dep_total = dep_stat[1];
			if (parseInt(profiles[i]['p_dep_type']) != ERC721_TOKEN)
			 	extr_dep_total = window.web3js_reader.utils.fromWei(extr_dep_total, 'ether');

			let extr_dep_total_str = ((parseFloat(extr_dep_total)).toFixed(3)).toString();  
			extractable_dep_col.push('<td>'+extr_dep_total_str+'</td>');

			let rew_total = window.web3js_reader.utils.fromWei(dep_stat[2], 'ether');
			let rew_total_str = ((parseFloat(rew_total)).toFixed(3)).toString(); 
			//console.log('rew_total_str=',rew_total_str);  

			if (parseInt(profiles[i]['p_dep_type']) == UNISWAP_PAIR || parseInt(profiles[i]['p_dep_type']) == ERC721_TOKEN ) rew_total_str += '<br>ETNA';
			reward_col.push('<td>'+rew_total_str+'</td>');
			reward_col_val.push(parseFloat(rew_total));

			let extr_rew_total = window.web3js_reader.utils.fromWei(dep_stat[3], 'ether');
			let extr_rew_total_str = ((parseFloat(extr_rew_total)).toFixed(3)).toString();  
			extractable_reward_col.push('<td>'+extr_rew_total_str+'</td>');

			let cred_stat = await creditContractInstance.methods.creditsStat(parseInt(profiles[i]['p_id'])).call({from:userObject.account});
			let cred_total = cred_stat[0];
			let fee_total = cred_stat[1];
			if (parseInt(profiles[i]['p_dep_type']) != ERC721_TOKEN)
			 	cred_total = window.web3js_reader.utils.fromWei(cred_total, 'ether');
			let cred_total_str = ((parseFloat(cred_total)).toFixed(3)).toString();  
			cred_column.push('<td>'+cred_total_str+'</td>');
			cred_column_val.push(parseFloat(cred_total));

			fee_total = window.web3js_reader.utils.fromWei(fee_total, 'ether'); 
			let fee_total_str = ((parseFloat(fee_total)).toFixed(3)).toString(); 
			fee_column.push('<td>'+fee_total_str+'</td>');
			fee_column_val.push(parseFloat(fee_total));
		}
	

		for (let i = 0; i < profiles.length; i++){
			let txt='';
			if (profiles[i].p_dep_type == ERC721_TOKEN){
	            	           	
	            let token_count = await  window.cyclops_nft_smartcontract_reader.methods.balanceOf(window.staking_contract_address).call({from:userObject.account});  
	            	
	            txt = '<td>'+token_count+'</td>';
	            	
	            cur_avail_column_val.push(parseFloat(token_count));		 
	            	 
            } else if (profiles[i].p_dep_type   == ERC20_TOKEN || profiles[i].p_dep_type == UNISWAP_PAIR){ 
                 let erc20contract = await new window.web3js_reader.eth.Contract(erc20TokenContractAbi, profiles[i].p_tok_addr); 
                 let erc20_count = await erc20contract.methods.balanceOf(window.staking_contract_address).call({from:userObject.account});
                 let adj_count = window.web3js_reader.utils.fromWei(erc20_count, 'ether');	            
				 let adj_count_str =  ((parseFloat(adj_count)).toFixed(4)).toString(); 
                 let token_name = await erc20contract.methods.name().call({from:userObject.account});

                 if (parseInt(profiles[i]['p_dep_type']) == UNISWAP_PAIR) adj_count_str += '<br>account once<br>for pair';
                 txt = '<td>'+adj_count_str+'</td>';

                 cur_avail_column_val.push(parseFloat(adj_count));
                
                 //html += '<span class="small-text-block">'+token_name+': '+adj_count_str+'</span>';  
                 
            } else if (profiles[i].p_dep_type == NATIVE_ETHEREUM){
            	let wb = await window.web3js_reader.eth.getBalance(window.staking_contract_address);
    			let eth_balance = window.web3js_reader.utils.fromWei(wb, 'ether');
    			cur_avail_column_val.push(parseFloat(eth_balance));
    			let adj_eth_balance =  ((parseFloat(eth_balance)).toFixed(4)).toString(); 
            	txt = '<td>'+adj_eth_balance+'</td>';
            	
            }
            if (!txt) txt =  '<td>-</td>'; 
			cur_avail_column.push(txt);
			
		}
		

		let usage_contract;
		await initUsageCalcContractReader((contract) => {
			usage_contract = contract;
		});
		
		let apy_column = new Array();
		for (let j = 0; j < profiles.length; j++){
			let apy_str;
			
			let apy = parseInt(profiles[j]['init_apy']);
			let rate = parseInt(profiles[j]['rate']);
			let rate_real = rate  / apy_scale; 
			let apy_real = apy  / apy_scale; 
			let usage = await usage_contract.methods.getAssetUsage(profiles[j]['p_id']).call({from:userObject.account});
			let usage_real = usage / apy_scale;
			apy_real = apy_real + rate_real * usage_real;

			apy_str = ((apy_real*100).toFixed(3)).toString()+'%';
			
			apy_column.push('<td>'+apy_str+'</td>');
		}
		
		/*let earned_column = new Array();
		await depositContractInstance.getPastEvents('CustomerWithdrawDepositRewardById', {	fromBlock: 0, toBlock: 'latest'})
				.then(function(events){
				   for (let i = 0; i < profiles.length; i++){
				   		let flag = false;
				   		
				   		let v = new BN(0);
						events.forEach(function(item) {
							
							if (profiles[i]['p_id'] == item.returnValues.profile_id){
								v =v.add(new BN(item.returnValues.reward));
								flag = true;
							
							}
														
						});
						

						if (flag){
							let vf = window.web3js_reader.utils.fromWei(v, 'ether');
							let f = (parseFloat(vf)).toFixed(3);
							earned_column.push('<td>'+f.toString()+'</td>');
						} else {
							earned_column.push('<td>-</td>');
						}
						
						
					}
				})
				.catch(error => 	{
		  			errorMsg('cannot get events from smartcontract');
		});    */   
	      
		let balance1_col_val = new Array();
		let balance2_col_val = new Array();
		let cytr_rew_nft_and_pairs = 0;
		for (let i = 0; i < profiles.length; i++){
		
			let bal1 = cur_avail_column_val[i] - dep_column_val[i]
			if (profiles[i].p_dep_type != ERC721_TOKEN && profiles[i].p_dep_type != UNISWAP_PAIR ){
				bal1 -= reward_col_val[i];
			} else {
				cytr_rew_nft_and_pairs += reward_col_val[i];
			}
			let bal2 = bal1 + cred_column_val[i]+fee_column_val[i];
			
			balance1_col_val.push(bal1);
			balance2_col_val.push(bal2);
			
		}		

		for (let i = 0; i < profiles.length; i++){
		
			if (profiles[i].p_name == 'ETNA') {
				balance1_col_val[i] -= cytr_rew_nft_and_pairs;
				balance2_col_val[i] -= cytr_rew_nft_and_pairs;
			}

		}		

		let balance1_col = new Array();
		let balance2_col = new Array();
		for (let i = 0; i < profiles.length; i++){
			
			let bal1 = balance1_col_val[i];
			let bal2 = balance2_col_val[i];

			let bal1_str = ((parseFloat(bal1)).toFixed(3)).toString(); 
			let bal2_str = ((parseFloat(bal2)).toFixed(3)).toString(); 
			
			if (bal1 > 0){
				txt1 = '<td style="background-color: green">'+bal1_str+'</td>';
			} else if (bal1 == 0){
				txt1 = '<td style="background-color: yellow">'+bal1_str+'</td>';
			} else {
				txt1 = '<td style="background-color: red">'+bal1_str+'</td>';
			}

			if (bal2 > 0){
				txt2 = '<td style="background-color: green">'+bal2_str+'</td>';
			} else if (bal2 == 0){
				txt2 = '<td style="background-color: yellow">'+bal2_str+'</td>';
			} else {
				txt2 = '<td style="background-color: red">'+bal2_str+'</td>';
			}
			
			balance1_col.push(txt1);
			balance2_col.push(txt2);
			
		}

		//compress table
		let i=0;
		let remove_rows_array = new Array();
		let base_rows_array = new Array();
		while(i < profiles.length-1){
            //0 means max amount for ERC20 compatible and ignored for ERC721
             	if (profiles[i+1]['p_name'].slice(0,-3) == profiles[i]['p_name'].slice(0,-3) && profiles[i+1]['p_dep_type'] == UNISWAP_PAIR && profiles[i]['p_dep_type'] == UNISWAP_PAIR ){

             		//asset_column[i] = '<th scope="row" style="background-color: grey">'+profiles[i]['p_name'].slice(0,-3)+'</th>'
             		remove_rows_array.push(i+1);
             		if (!remove_rows_array.includes(i)){
             			 base_rows_array.push({base: i, remove: new Array()});
             			 base_rows_array[base_rows_array.length-1].remove.push(i+1);
             		} else {
             			base_rows_array[base_rows_array.length-1].remove.push(i+1);
             		}
             	}	

            	i++;
    	}
		
		//console.log('remove_rows_array=',remove_rows_array);
		//console.log('base_rows_array=',base_rows_array);
		/*
		for (let i=0; i < base_rows_array.length; i ++){
			asset_column[base_rows_array[i].base] = '<th scope="row" style="background-color: grey">'+profiles[base_rows_array[i].base]['p_name'].slice(0,-3)+'</th>';

			let txt = '<br>';
			for (let j=0; j < base_rows_array[i].remove.length; j++){
				txt += dep_column_val[base_rows_array[i].remove[j]].toFixed(3)+' '+profiles[base_rows_array[i].remove[j]]['p_name'].slice(-3)+'<br>';
			}

			dep_column[base_rows_array[i].base] = '<td>'+dep_column_val[base_rows_array[i].base].toFixed(3)+' '+profiles[base_rows_array[i].base]['p_name'].slice(-3)+txt+'</td>';

		}*/


		for (let i = 0; i < profiles.length; i++){
            //0 means max amount for ERC20 compatible and ignored for ERC721
            	//if (remove_rows_array.includes(i)) continue;

             	html += '<tr style="text-align: left; font-size: 0.75em">';
            
            	html += asset_column[i];

            	html += cur_avail_column[i];

            	html += balance1_col[i];

            	html += balance2_col[i];

	            html += dep_column[i];

	            html += dep_column_usd[i];

	            html += extractable_dep_col[i];
    	
	           	html += reward_col[i];

	           	html += extractable_reward_col[i];

	           	html += apy_column[i];

	           	//html += earned_column[i];

	           	html += cred_column[i];

	           	html += fee_column[i];
	           
              	html += '</tr>';
    	}
        


		html +=	'</tbody>'+
			'</table>';

	 
	    safeSetInnerHTMLById('portfolio_table', html);
	    resetMsg();


}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

async function adjustLiquidity(){
	let liqlevContractInstance;
	await initLiqLevContract((contract) => {
		liqlevContractInstance = contract;
	});

	liqlevContractInstance.methods.processLiquidationAll().send({ from:userObject.account});

}

async function processLiquidationForCreditClick(cust_id, cred_id, cust_wallet){
	//console.log(cust_id, cred_id, cust_wallet); return;

	let liqlevContractInstance = window.liqlev_smartcontract; //write instance

	let need_to_liquidate, coll_am_to_liq, credit_am_to_liq, empty;

	[need_to_liquidate, coll_am_to_liq, credit_am_to_liq, empty] = await analyzeLiquidationForCredit(cust_id, cred_id, cust_wallet);

	console.log('cust_wallet=',cust_wallet, 'cust_id=',cust_id, 'cred_id=',cred_id, 'coll_am_liq=',coll_am_to_liq.toString(), 'credit_am_liq=',credit_am_to_liq.toString());
	//return;
	if (need_to_liquidate){
		await liqlevContractInstance.methods.liquidate(cust_wallet, cust_id, cred_id, coll_am_to_liq.toString(), credit_am_to_liq.toString()).send({ from:userObject.account});
	}
}

async function processLiquidationForCreditNFTClick(cust_id, cred_id, cust_wallet){
	infoMsg('you need to proceed manually. current approach - just leave it on bank balance and do not liquidate');
	//console.log(cust_id, cred_id, cust_wallet); return;
	/*let creditContractInstance;
	await initCreditContract((contract) => {
			creditContractInstance = contract;
	});

	let credit = await creditContractInstance.methods.viewCustomerCreditByIndex(cust_id,cred_id).call({from: userObject.account});
			
	let coll = await creditContractInstance.methods.viewCustomerCollateralByIndex(cust_id, credit.collateral_id).call({from: userObject.account});
	console.log(credit,coll);
			
	await creditContractInstance.methods.decreaseCredit(cust_wallet,cred_id,credit.credit_amount).send({from: userObject.account,gasPrice: window.gp});

	await creditContractInstance.methods.decreaseCollateral(cust_wallet,parseInt(credit.collateral_id),coll.deposit_amount).send({from: userObject.account,gasPrice: window.gp});

    */ 
  	
  	//creditContractInstance.methods.returnFee(cust_wallet,cred_id,credit.acc_fee).send({from: userObject.account,gasPrice: window.gp, value: credit.acc_fee});

  
}

async function start_stop_bank(){
	let bank_is_running = await window.staking_smartcontract.methods.isActive().call({from:userObject.account});

	if (bank_is_running){
		await window.staking_smartcontract.methods.pause().send({from: userObject.account, gasPrice: window.gp});
	 	safeSetInnerHTMLById('start_stop_button','Start Bank');	
	} else{
		await window.staking_smartcontract.methods.start().send({from: userObject.account, gasPrice: window.gp});
		safeSetInnerHTMLById('start_stop_button','Pause Bank')
	} 

}

async function getEthBalance(wallet,  callback =((res) => { safeSetInnerHTMLById('eth_balance',res,'inline') })){
	 window.web3js_reader.eth.getBalance(wallet)
     .then((result) => {
        let eth_balance = toTokens(result,4);// window.web3js_reader.utils.fromWei(result, 'ether');
        callback(eth_balance);

     })
     .catch( (err) => {
        errorMsg('web3/endpoint error:',err);
        callback(0);
     });
                        
}

function setupList(list,introText){
	let defaultOption = document.createElement('option');
  	defaultOption.text = introText;

  	list.add(defaultOption);
  	list.selectedIndex = 0;
}

function fillList(url,list_elem,field_name, val_field_name = null, complex_val = false, callback = null){

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("servicekeyauth", window.service_key);

	var requestOptions = {
	  method: 'GET',
	  headers: myHeaders,
	  redirect: 'follow'
	};

	fetch(url,requestOptions)
  		.then(
  			function(response) {
  				if (response.status !== 200){
  					
  					return;
  				}

  				response.json().then(function(data){
  					let option;

  					for (let i=0; i < data.length; i++){
  						option = document.createElement('option');
  						
  						option.text = data[i][field_name];
  						if (!val_field_name && !complex_val){
  							option.value = option.text;
  						} else if (!complex_val && val_field_name){
  							option.value = data[i][val_field_name];
  						} else if (complex_val){ //complex_val
  							option.value =  JSON.stringify(data[i]);
  						} else { 
  							option.value = option.text;
  						}	
  						list_elem.add(option);
  					}
  					
  					list_elem.style.display = "block";
					if (callback) callback();
  				});

  			}
  		).catch(function(err){
  			
  		});
}


</script>
<!-- End Document
================================================== -->
</body>
</html>