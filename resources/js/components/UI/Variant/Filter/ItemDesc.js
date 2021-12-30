import React, {useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const filterItemDescVariant = (prop) => {
    //Initialize the variants attribute.
    const [colorVariant, setColorVariant] = useState([])
    const [sizeVariant, setSizeVariant] = useState([])
    const variantDict = []
    var formGroup = []
    const variantSelection = []

    const variantInit = {
        color:'Color',
        size:'Size'
    }

    //Convert Filter Variants To Array In Dictionary.
    const filterItemAttributes = prop.variantDetailsData.filter(index => index.variants.items_id == prop.itemIdParams)

    for(var keys in variantInit) {
        variantDict.push({
            key: keys,
            value: filterItemAttributes.filter(index=>index.variants.name.includes(variantInit[keys]))
        })
    }

    const variantConverted = variantDict.map(i=>({[i.key]: i.value}))

    //Check the variant is able to select from the radio button type
    const handleUIChange = (event) => {
        const checkVariantName = event.target.name
        if(checkVariantName == variantInit.color){
            setColorVariant({[event.target.name] : event.target.value})
        }
        if(checkVariantName == variantInit.size){
            setSizeVariant({[event.target.name] : event.target.value})
        }
    }
    variantSelection.push(colorVariant, sizeVariant)


    //To Get The Variant UI According From The Keys
    for (var i in variantConverted) {
        const getVariantKeys = Object.keys(variantConverted[i])[0]
        const checkVariantValuesLength = Object.values(variantConverted[i])[0].length

        if (checkVariantValuesLength <= 0) return null

        if (getVariantKeys == 'color'){
            formGroup.push(
                variantConverted[i].color.map( index =>
                    <FormControlLabel key={index.name} name="Color" value={index.name} control={<Radio value={index.name} size="small"/>} label={<div className={`${index.alias} border rounded w-6 h-6`} />} />
                )
            )
        }

        if(getVariantKeys == 'size'){
            formGroup.push( 
                variantConverted[i].size.map( index =>
                    <FormControlLabel key={index.name} name="Size" value={index.name} control={<Radio value={index.name} size="small"/>} label={index.alias} />
                )
            )
        }
        
    }

    //Render the form group interface
    return(
        <div>
            {
                formGroup.map(
                    (form,index) =>
                    <div className="flex justify-between items-center">
                        <p>{form[index].props.name}</p>
                        <div>
                            <FormControl component="fieldset">
                                <RadioGroup row
                                    aria-label={form[index].props.name}
                                    name="controlled-radio-buttons-group"
                                    onChange={handleUIChange}
                                >
                                    {formGroup[index]}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>     
                )
            }
        </div>
    );
}

export default filterItemDescVariant;