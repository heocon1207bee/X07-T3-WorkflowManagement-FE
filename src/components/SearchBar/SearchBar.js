import React from 'react';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

const SearchBar = ({ modal }) => {
    const { setOpenProject } = modal;
    const searchValue = useSelector((state) => state.searchValue);
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch({ type: 'input', value: e.target.value });
    };

    return (
        <div className="search-container">
            <div className="search-bar">
                <input value={searchValue} onChange={(e) => handleSearch(e)} placeholder="Tìm kiếm" />
            </div>
            <div className="create-pj-button">
                <button onClick={() => setOpenProject(true)}>
                    Tạo mới <AppstoreAddOutlined />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
