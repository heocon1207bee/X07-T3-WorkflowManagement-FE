export const saveToLocal = (key, data = {}) => {
    const currentLocal = getDataInLocal(key);
    if (!currentLocal) localStorage.setItem(key, JSON.stringify(data));
    const update = { ...currentLocal, ...data };
    localStorage.setItem(key, JSON.stringify(update));
};

export const getDataInLocal = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : false;
};

export const updateToken = (key, token) => {
    saveToLocal(key, { token });
};

export const getToken = (key) => {
    const { token } = getDataInLocal(key);
    return token ?? false;
};
