const initialValue = {
    action: {
        type: '',
        value: [],
    },
};

const projectDataReducer = (state = [], action = initialValue) => {
    switch (action.type) {
        case 'setData':
            return action.value;
        default:
            return state;
    }
};

export default projectDataReducer;
