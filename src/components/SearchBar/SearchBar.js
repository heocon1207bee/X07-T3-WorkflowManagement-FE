import React from 'react';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { FORM_CREATE } from '../../configs/FORM_STATUS';

import './SearchBar.style.scss';
import { Input } from 'antd';
const { Search } = Input;

const SearchBar = ({ modal }) => {
    const themeStore = useSelector((state) => state.theme);
    const { setOpenProject, setFormType } = modal;
    const searchValue = useSelector((state) => state.searchValue);
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch({ type: 'input', value: e.target.value });
    };
    const handleCreateProject = () => {
        setOpenProject(true);
        setFormType(FORM_CREATE);
    };

    return (
        <div className={`search-container ${themeStore.theme}-mode`}>
            <div className="search-bar">
                <Search
                    className={`${themeStore.theme}-mode input-search`}
                    value={searchValue}
                    onChange={(e) => handleSearch(e)}
                    placeholder="Tìm kiếm"
                />
            </div>
            <div className="create-pj-button">
                <button onClick={handleCreateProject}>
                    Tạo mới <AppstoreAddOutlined />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
