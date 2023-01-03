import React from 'react';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { FiDelete } from 'react-icons/fi';
import { FORM_CREATE } from '../../configs/FORM_STATUS';

const SearchBar = ({ modal }) => {
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
        <div className="search-container">
            <div className="search-bar">
                <input value={searchValue} onChange={(e) => handleSearch(e)} placeholder="Tìm kiếm" />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch({ type: 'input', value: '' });
                    }}
                >
                    <FiDelete />
                </button>
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
