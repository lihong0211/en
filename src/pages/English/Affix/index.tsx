import { ProTable } from '@ant-design/pro-components';
import { useState } from 'react';
import { Button, Popconfirm, message, Tag } from 'antd';
import request from '../../../request';
import AddEdit from './AddEdit';

type ItemType = {
  id: number;
  name: string;
  meaning: string;
  similar: any[];
  cases: any[];
};

export default function Root() {
  const handleDelete = async (id: number, cb: any) => {
    request
      .post(`/api/affix/delete`, { id })
      .then(() => {
        message.success('删除成功');
        cb();
      })
      .catch(() => {
        message.error('操作失败');
      });
  };
  const [list, setList] = useState<any[]>([]);
  return (
    <ProTable<ItemType>
      rowKey="id"
      scroll={{ x: 1500, y: 660 }}
      search={false}
      columns={[
        {
          dataIndex: 'id',
          title: 'ID',
          hideInSearch: true,
          fixed: 'left',
          width: 80,
        },
        {
          dataIndex: 'name',
          title: '词缀',
          render: (_dom, entity) => {
            return <Tag>{entity.name}</Tag>;
          },
        },
        {
          dataIndex: 'meaning',
          title: '释义',
          hideInSearch: true,
        },
        {
          dataIndex: 'similar',
          title: '相似词缀',
          render: (_dom, entity) => {
            return (
              <>
                {entity?.similar?.map((item) => {
                  return <Tag>{item}</Tag>;
                })}
              </>
            );
          },
          hideInSearch: true,
        },
        {
          dataIndex: 'cases',
          title: '例子',
          width: 300,
          hideInSearch: true,
          render: (_dom, entity) => {
            return (
              <>
                {entity?.cases?.map((item) => {
                  return (
                    <Tag className="m-1">
                      {item.word}: {item.meaning}
                    </Tag>
                  );
                })}
              </>
            );
          },
        },

        {
          title: '操作',
          valueType: 'option',
          fixed: 'right',
          width: 150,
          render(_dom, entity, _index, action) {
            return (
              <div className="space-x-2">
                <AddEdit
                  onSubmitted={action?.reload}
                  initialValues={{
                    id: entity.id,
                    name: entity.name,
                    meaning: entity.meaning,
                    similar: entity.similar,
                    cases: entity.cases,
                    list,
                  }}
                  trigger={<Button type="link">编辑</Button>}
                  list={list}
                />
                <Popconfirm
                  title="确定删除该词缀吗"
                  onConfirm={() => handleDelete(entity.id, action?.reload)}
                >
                  <Button type="link">删除</Button>
                </Popconfirm>
              </div>
            );
          },
        },
      ]}
      toolBarRender={(action) => {
        return [
          <AddEdit
            trigger={<Button type="primary">新增</Button>}
            key="add"
            onSubmitted={action?.reload}
            list={list}
          />,
        ];
      }}
      request={async ({}) => {
        const data = await request.get(`/api/affix/list`);
        setList(() =>
          data?.data.map((item: any) => {
            return {
              label: item.name,
              value: item.name,
              key: item.id,
            };
          })
        );
        return {
          success: true,
          ...data,
        };
      }}
    />
  );
}
