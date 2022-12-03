export const saveToLocal = (key, data = {}) => {
    const currentLocal = getDataInLocal(key);
    if (!currentLocal) localStorage.setItem(key, JSON.stringify(data));
    const update = { ...currentLocal, ...data };
    localStorage.setItem(key, JSON.stringify(update));
};

export const getDataInLocal = (key) => {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
};

export const updateToken = (key, token) => {
    saveToLocal(key, { token });
};
