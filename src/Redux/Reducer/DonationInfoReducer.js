import {FETCH_DONATION_INFO} from "../Type";
import React from 'react';

const DonationInfoReducer = (state={
    donationInfo :[],
},action) => {
    switch(action.type){
        case FETCH_DONATION_INFO:
            return({
                ...state,
                donationInfo: action.payload
            })
        default:
            return state;
    }
};

export default DonationInfoReducer;

