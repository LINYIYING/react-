import React, { useEffect, useState } from 'react'
import './less/ListTable.less'
import { Space, Table, Button, Pagination } from 'antd'
import { ArticleListApi } from '../request/api'
import moment from 'moment'

function Mytitle(props) {
    return (
        <div>
            <a
                className="table_title"
                href={'http://codesohigh.com:8765/article/' + props.id}
                target="_blank"
            >
                {props.title}
            </a>
            <p style={{ color: '#999' }}>{props.subTitle}</p>
        </div>
    )
}

export default function ListTable() {
    const [arr, setArr] = useState([
        {
            key: '1',
            name: 'John Brown',
            address: 'New York No. 1 Lake Park',
        },
    ])

    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total:10 })

    const getArticleList = (current,pageSize) => {
        ArticleListApi({
          num: current,
          count: pageSize
        }).then(res => {
            if (res.errCode === 0) {
              console.log(res.data)
              let {num,count,total} = res.data
              setPagination({
                current: num,
                pageSize: count,
                total: total
              })
                let newArr = JSON.parse(JSON.stringify(res.data.arr))
                let myarr = []

                newArr.map(item => {
                    let obj = {
                        key: item.id,
                        date: moment(item.date).format('YYYY-MM-DD hh:mm:ss'),
                        mytitle: (
                            <Mytitle title={item.title} subTitle={item.subTitle} id={item.id} />
                        ),
                    }
                    myarr.push(obj)
                })
                setArr(myarr)
            }
        })
    }

    useEffect(() => {
        getArticleList(pagination.current,pagination.pageSize)
    },[])

    const pageChange = (arg) => {
      getArticleList(arg.current,arg.pageSize)
    }

    const columns = [
        {
            dataIndex: 'mytitle',
            key: 'mytitle',
            width: '60%',
            render: text => <div>{text}</div>,
        },
        {
            dataIndex: 'date',
            key: 'date',
            render: text => <p>{text}</p>,
        },
        {
            title: 'Action',
            key: 'action',
            render: text => {
                return (
                    <Space size="middle">
                        <Button type="primary" onClick={() => console.log(text.key)}>
                            编辑
                        </Button>
                        <Button type="danger" onClick={() => console.log(text.key)}>
                            删除
                        </Button>
                    </Space>
                )
            },
        },
    ]
    return (
        <div className="list_table">
            <Table
                showHeader={false}
                dataSource={arr}
                columns={columns}
                onChange={pageChange}
                pagination={pagination}
            />
            ;
        </div>
    )
}
