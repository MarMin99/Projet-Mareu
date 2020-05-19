import firebase from '../firebase';

export function getReunion(){
    return(dispatch) => {
        firebase.database().ref('/reunion').on('value', snapshot =>{
                dispatch({
                    type:"REUNION_FETCH",
                    playload:snapshot.val(),
                })
            }
        )
    }
}

// export function addReunionDb(sujet,lieu,participants,date){
//    return (dispatch) =>{
//        firebase.database().ref('/reunion').push({sujet,lieu,participants,date})
//    }
// }