const initialState = {
    order:[],
    ordertransac:[]
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    
    switch (type) {
        case "ADD ORDER":
            return {
                ...state,
                order : payload
            }
        case "DELET ORDER":
            return{
                ...state,
                order : payload
            }
        case "ORDER TRANSAC":
            return{
                ...state,
                ordertransac : payload
            }
        default:
            return state;
    }
}