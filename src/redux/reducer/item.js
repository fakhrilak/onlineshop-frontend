const initialState = {
    items:[]
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    
    switch (type) {
        case "ITEMS":
            return {
                ...state,
                items : payload
            }
        default:
            return state;
    }
}