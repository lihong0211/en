import { ProTable } from '@ant-design/pro-components';
import request from '../../../request';

type ItemType = {
  name: string;
  version: string;
};

export default function Root() {
  return (
    <ProTable<ItemType>
      rowKey="name"
      scroll={{ y: 460 }}
      search={false}
      columns={[
        {
          dataIndex: 'name',
          title: '医生',
          hideInSearch: true,
        },
        {
          dataIndex: 'version',
          title: '版本',
          hideInSearch: true,
        },
      ]}
      request={async ({ current, pageSize, ...rest }) => {
        const data = await request.post(`/api/jdReport/version/list`, {
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
