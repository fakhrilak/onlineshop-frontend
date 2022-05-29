const initialState = {
    order:[]
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
        default:
            return state;
    }
}