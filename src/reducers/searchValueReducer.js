const searchValueReducer = (state='', action) => {
    switch (action.type) {
        case 'input':
            return action.value;
    }
    return state
}

export default searchValueReducer