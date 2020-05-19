

export default function (state={}, action){
    switch(action.type){
        case "REUNION_FETCH":
            console.log(action.playload);
            return{
                ...state,
            }
        default:
            return state
    }
}