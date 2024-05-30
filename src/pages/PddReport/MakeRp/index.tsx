import { ProTable } from '@ant-design/pro-components';
import { Card } from 'antd';
import request from '../../../request';
import ReactJsonView from 'react-json-view';

type ItemType = {
  id: number;
  start_time: string;
  end_time: string;
  req_content: string;
  res_content: string;
};

export default function Root() {
  return (
    <ProTable<ItemType>
      rowKey="id"
      scroll={{ y: 460 }}
      columns={[
        {
          dataIndex: 'sessionid',
          title: 'sessionid',
          width: 100,
        },
        {
          dataIndex: 'name',
          title: '姓名',
          width: 80,
          hideInSearch: true,
        },
        {
          dataIndex: 'sex',
          title: '性别',
          hideInSearch: true,
        },
        {
          dataIndex: 'age',
          title: '年龄',
          hideInSearch: true,
        },
        {
          dataIndex: 'diagnosis',
          title: '诊断',
          hideInSearch: true,
        },
        {
          dataIndex: 'medicine',
          title: '药品',
          hideInSearch: true,
        },
        {
          dataIndex: 'dosage',
          title: '用法用量',
          hideInSearch: true,
        },
      ]}
      request={async ({ current, pageSize, ...rest }) => {
        // const res = await request.post(`/api/pddReport/rp/add`, {
        //   sessionid: '12323',
        //   name: '测试',
        //   sex: '难',
        //   age: '80',
        //   diagnosis: '阳痿',
        //   medicine: '伟哥',
        //   dosage: '管饱',
        // });
        // console.log(res);
        const data = await request.post(`/api/pddReport/rp/list`, {
          page: current,
          size: pageSize,
          query: {
            ...rest,
          },
        });
        return {
          success: true,
          ...data,
        };
      }}
    />
  );
}
