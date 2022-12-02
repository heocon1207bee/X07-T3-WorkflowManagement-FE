export const saveToLocal = (key, data = {}) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getDataInLocal = (key) => {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
};

export const updateToken = (key, token) => {
    const data = getDataInLocal(key);
    data.token = token;
    saveToLocal(key, data);
};
