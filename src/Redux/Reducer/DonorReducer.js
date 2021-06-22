import React from 'react';
import {Fetch_DONOR,GRT_USER_PROFILE} from "../Type";

const DonorReducer = (state={
    filterDonor:[],
    getDonorProfile: [],
},action) => {
    switch(action.type){
        case Fetch_DONOR:
      
            return({
                ...state,
                filterDonor:action.payload
            })
        case GRT_USER_PROFILE:
            
            return({
                ...state,
                getDonorProfile:action.payload,
            })     
        default:
            return state;
    }
    
};

export default DonorReducer;