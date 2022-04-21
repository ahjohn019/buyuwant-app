<?php


function couponSelection($subtotal, $discount_value, $discount_type){
    $discountPrice = "";

    if ($discount_type == 'fixed') {
        $discountPrice = (float)$discount_value;
    }

    if ($discount_type == 'percentage') {
        $discountPrice = (float)$discount_value . '%';
    }

    return $discountPrice;
}