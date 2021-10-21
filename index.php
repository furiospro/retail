function debug($arr){
    echo '<pre>'.print_r($arr,1).'</pre>';
}
$data = http_build_query([
    'order' => json_encode([
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
    'Content-type:application/x-www-form-urlencoded',
    'X-API-KEY:QlnRWTTWw9lv3kjxy1A8byjUmBQedYqb',
];

$url = 'https://superposuda.retailcrm.ru/api/v5/orders/create';

$curl =curl_init($url);
curl_setopt($curl,CURLOPT_URL,$url);
curl_setopt($curl, CURLOPT_HEADER, true);
curl_setopt($curl,CURLOPT_HTTPHEADER,$headers);
curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($curl,CURLOPT_POST,true);
curl_setopt($curl,CURLOPT_POSTFIELDS,$data);

$head = curl_exec($curl);
preg_match("/\{(.*)\}/si",$head,$match);
curl_close($curl);

debug(json_decode($match[0]));

