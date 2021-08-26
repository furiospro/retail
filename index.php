<?php

$url = 'https://superposuda.retailcrm.ru/';


$data = http_build_query([
	'order' => json_encode([
		'site' => 'test',
		'orderMethod' => 'test',
		'orderType' => 'fizik',
		'number' => '11021986',
		'lastName' => 'Жуков',
		'firstName' => 'Юрий',
		'patronymic' => 'Викторович',
		'customFields' => [
			'prim' => 'тестовое задание'
		],
		'customerComment' => 'https://github.com/furiospro/retail',
		'items' =>[
			[
				'productName' => 'Маникюрный набор AZ105R Azalita'
			]
		],
		'status' => 'trouble',
	]),
]);
$headers = [
	'http' => [
		'method' => 'POST',
		'header' => 'application/x-www-form-urlencoded',
		'X-API-KEY' => 'QlnRWTTWw9lv3kjxy1A8byjUmBQedYqb',
		'content' => $data
	]
];


$context = stream_context_create($headers);

$file = fopen($url.'api/v5/orders/create','r',false,$context);
fpassthru($file);
fclose($file);



