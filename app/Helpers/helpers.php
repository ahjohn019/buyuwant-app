<?php


function couponSelection($discount_value, $discount_type){
    $discountPrice = "";

    if ($discount_type == 'fixed') {
        $discountPrice = (float)$discount_value;
    }

    if ($discount_type == 'percentage') {
        $discountPrice = (float)$discount_value . '%';
    }

    return $discountPrice;
}

function discountItem($item_price, $discount_type, $discount_value){
    if($discount_type == 'fixed'){
        $discountPrice = (float)$item_price - (float)$discount_value;
    } 
    
    if($discount_type == 'percentage')
    {
        $discountPrice = (100 - (float)$discount_value) / 100 * (float)$item_price;
    }

    $convertDiscountFormat = number_format($discountPrice, 2, '.', ' ');
    return $convertDiscountFormat;
}