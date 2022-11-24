import React from 'react'
import { AppstoreAddOutlined } from '@ant-design/icons'

const SearchBar = () => {
  return (
    <div className='search-container'>
        <div className='search-bar'>
            <input placeholder='Tìm kiếm'/>
        </div>
        <div className='create-pj-button'>
            <button>Tạo mới <AppstoreAddOutlined /></button>
        </div>
    </div>
  )
}

export default SearchBar