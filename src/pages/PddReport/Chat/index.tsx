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
        // {
        //   dataIndex: 'start_time',
        //   title: '开始时间',
        // },
        // {
        //   dataIndex: 'end_time',
        //   title: '结束时间',
        // },
        {
          dataIndex: 'cost',
          title: '耗时',
          width: 80,
          hideInSearch: true,
        },
        {
          dataIndex: 'req_content',
          title: '请求',
          hideInSearch: true,
          render(_, entity) {
            return (
              <Card bodyStyle={{ height: 500, overflow: 'scroll' }}>
                <ReactJsonView src={JSON.parse(entity?.req_content)} />;
              </Card>
            );
          },
        },
        {
          dataIndex: 'res_content',
          title: '响应',
          hideInSearch: true,
          render(_, entity) {
            return (
              <Card bodyStyle={{ height: 500, overflow: 'scroll' }}>
                <ReactJsonView src={JSON.parse(entity?.res_content)} />;
              </Card>
            );
          },
        },
      ]}
      request={async ({ current, pageSize, ...rest }) => {
        const data = await request.post(`/api/pddReport/chat/list`, {
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
