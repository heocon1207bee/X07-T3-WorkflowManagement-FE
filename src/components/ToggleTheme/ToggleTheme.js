import { Button, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { CiDark, CiSun } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../stores/reducers/Theme/themeReducer';

import './ToggleTheme.style.scss';

export default function ToggleTheme() {
    const themeStore = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    const [icon, setIcon] = useState(() => {
        return themeStore.theme === 'light' ? <CiDark /> : <CiSun />;
    });
    const [alternativeTheme, setAlternativeTheme] = useState(() => {
        return themeStore.theme === 'light' ? 'dark' : 'light';
    });

    useEffect(() => {
        const icon = themeStore.theme === 'light' ? <CiDark /> : <CiSun />;
        setIcon(icon);
        const alternativeTheme = themeStore.theme === 'light' ? 'dark' : 'light';
        setAlternativeTheme(alternativeTheme);
    }, [themeStore.theme]);

    return (
        <Tooltip title={`${alternativeTheme} mode`}>
            <Button className={`${alternativeTheme}-mode btn-toggle-theme`} onClick={() => dispatch(toggleTheme())}>
                {icon}
            </Button>
        </Tooltip>
    );
}
