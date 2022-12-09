import { notification } from 'antd';

const useNotification = () => {
    const [api, contextHolder] = notification.useNotification();
    const setNotificationWithIcon = ({ type, message, description }) => {
        api[type]({
            message,
            description,
        });
    };

    return { contextHolder, setNotificationWithIcon };
};

export default useNotification;
