<?php

return [
    'ethereum' => [
        'api_url' => env('ETHERSCAN_API_URL', 'https://api.etherscan.io/api'),
        'api_key' => env('ETHERSCAN_API_KEY', ''),
    ],
    
    'bsc' => [
        'api_url' => env('BSCSCAN_API_URL', 'https://api.bscscan.com/api'),
        'api_key' => env('BSCSCAN_API_KEY', ''),
    ],
    
    'polygon' => [
        'api_url' => env('POLYGONSCAN_API_URL', 'https://api.polygonscan.com/api'),
        'api_key' => env('POLYGONSCAN_API_KEY', ''),
    ],
];

