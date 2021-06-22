import {Fetch_REQUESTS} from "../Type";

const RequestsReducer = (state={
    fetchRequests:[]
},action) => {
    switch(action.type){
        case Fetch_REQUESTS:
            return({
                ...state,
                fetchRequests: action.payload
            })
        default:
            return state;
    }
};

export default RequestsReducer;