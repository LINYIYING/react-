import React from 'react'
import { Avatar, Button, List, Skeleton } from 'antd';

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

export default function ListList() {
  return (
    <div className='list_table'>
      使用列表
    </div>
  )
}
