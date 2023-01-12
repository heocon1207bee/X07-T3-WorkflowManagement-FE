const filterReducer = (state={title: '', member: [], priority:[], type:''}, action) => {
    switch (action.type) {
        case 'filterInput':
            return action.value;
        case 'cancelFilter':
            return state
    }
    return state
}

export default filterReducer