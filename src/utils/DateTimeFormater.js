const formatDate = (oldDate) => {
    const newDate = new Date(oldDate);
    return (`${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`);
};

export {formatDate}