const formatDate = (oldDate) => {
    const newDate = new Date(oldDate);
    return (`${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`);
};

const formatDateTime = (oldDate) => {
    const newDate = new Date(oldDate);
    return (`${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`);
}
export {formatDate, formatDateTime}