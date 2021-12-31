import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

const filterItemDesc = (variantsData, variantId) =>{
    const variantDict = []
    var formGroup = []

    const variantInit = {
        color:'Color',
        size:'Size'
    }

    //Convert Filter Variants To Array In Dictionary.
    const filterItemAttributes = variantsData.filter(index => index.variants.items_id == variantId)

    for(var keys in variantInit) {
        variantDict.push({
            key: keys,
            value: filterItemAttributes.filter(index=>index.variants.name.includes(variantInit[keys]))
        })
    }

    const variantFilterNull = variantDict.filter(i=>i.value.length > 0)
    const variantConverted = variantFilterNull.map(i=>({[i.key]: i.value}))


    //To Get The Variant UI According From The Keys
    for (var i in variantConverted) {
        const getVariantKeys = Object.keys(variantConverted[i])[0]
        const variantsMap = Object.values(variantConverted[i])[0]
        if (getVariantKeys == 'color'){
            formGroup.push(
                variantsMap.map((variant) =>
                  
                    <FormControlLabel key={variant.name} name="Color" value={variant.name} control={<Radio value={variant.name} size="small"/>} label={<div className={`${variant.alias} border rounded w-6 h-6`} />} />
                )
            )
        } 
        else 
        {
            formGroup.push( 
                variantsMap.map( variant =>
                    <FormControlLabel key={variant.name} name={getVariantKeys} value={variant.name} control={<Radio value={variant.name} size="small"/>} label={variant.alias} />
                )
            )
        }
    }

    return formGroup
}

export default filterItemDesc;