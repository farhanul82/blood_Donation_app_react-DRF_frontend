import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import Thunk from "redux-thunk";
import { Auth } from "./Reducer/Auth";
import DonationInfoReducer from "./Reducer/DonationInfoReducer";
import DonorReducer from "./Reducer/DonorReducer";
import FriendsReducer from "./Reducer/FriendsReducer";
import PostReducer from "./Reducer/PostReducer";
import ProfileReducer from "./Reducer/ProfileReducer";
import RequestsReducer from "./Reducer/RequestsReducer";
import UserPostReducer from "./Reducer/UserPostReducer";

const store = createStore(
  combineReducers({
    auth: Auth,
    donor:DonorReducer,
    request:RequestsReducer,
    profile: ProfileReducer,
    friends:FriendsReducer,
    donationInfo : DonationInfoReducer,
    post:PostReducer,
    UserPost : UserPostReducer
  }),
  composeWithDevTools(applyMiddleware(Thunk))
);
export default store;
