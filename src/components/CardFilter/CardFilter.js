import { Table } from 'antd';
import React,{useEffect, useState} from "react";
import { Input } from 'antd';
import axios from "axios";

const columns = [
    {
        title: 'công việc',
        dataIndex: 'work',
    },
    {
        title: 'trạng thái',
        dataIndex: 'status',
        filters: [
            {
                text: 'mới tạo',
                value: 'mới tạo',
            },
            {
                text: 'bị hủy bỏ',
                value: 'bị hủy bỏ',
            },

        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.status.includes(value),
        width: '30%',
    },
    {
        title: 'tiến độ',
        dataIndex: 'progress',
    },
    {
        title: 'độ ưu tiên',
        dataIndex: 'priority',
        filters: [
            {
                text: 'rất cao',
                value: 'rất cao',
            },
            {
                text: 'cao',
                value: 'cao',
            },
            {
                text: 'trung bình',
                value: 'trung bình',
            },
            {
                text: 'thấp',
                value: 'thấp',
            },
            {
                text: 'rất thấp',
                value: 'rất thấp',
            },
        ],
        onFilter: (value, record) => record.priority.startsWith(value),
        filterSearch: true,
        width: '40%',
    },
    {
        title: 'mô tả',
        dataIndex: 'description',
    },
    {
        title: 'hết hạn',
        dataIndex: 'deadline',
    },
];

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

export default function CardFilter(){
    const [data, setData]=useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [keyword, setKeyword] = useState('');

    // const CallApi = async()=>{
    //     setIsLoading(true);
    //
    //
    //     await axios.get('http://localhost:5000/api/work')
    //         .then(function (response) {
    //             // handle success
    //             console.log(response.data);
    //             setData(response.data)
    //         })
    //         .catch(function (error) {
    //             // handle error
    //             console.log(error);
    //         });
    //
    //     setIsLoading(false);
    // }

    useEffect(()=>{
        // CallApi();

    },[]);

    // const result = data.filter(item=>item.work.toLowerCase().indexOf(keyword.toLowerCase())>-1);
    const result = []

    return(
        <div>
            <Input style={{width:"50%", margin:"2px 25%"}} type="text" placeholder="tìm kiếm" onChange={(event)=>setKeyword(event.target.value)}/><br/><br/>
            {
                isLoading ? <h1>Loading...</h1>:<Table columns={columns} dataSource={result} onChange={onChange} />
            }
        </div>
    )
}