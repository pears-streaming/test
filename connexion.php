	<?php
	//liaison avec la BDD
	 $serveur = "localhost";
	 $login = "root";
	 $pass = "";

	try{
	 	$bdd = new PDO("mysql:host=$serveur;dbname=pears_streaming", $login, $pass);
	 	$bdd->setattribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	 }


	 //Message erreur si ça fonctione pas
	catch(PDOExeption $e){
	 	echo 'Echec : ' ,$e->getMessage();
	 }
	?>