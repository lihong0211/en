import { PageContainer, ProTable } from '@ant-design/pro-components';
import { css } from '@emotion/react';
import { Button, Popconfirm, message } from 'antd';
import request from '../../../request';
import AddEdit from './AddEdit';

type ItemType = {
  id: number;
  speech: string;
  meaning: string;
};

export default function DialogueList() {
  const handleDelete = async (id: number, cb: any) => {
    request
      .post(`/api/living-speech/delete`, { id })
      .then(() => {
        message.success('删除成功');
        cb();
      })
      .catch(() => {
        message.error('操作失败');
      });
  };
  return (
    <PageContainer
      className="animate__animated animate__fadeIn"
      css={css`
        .ant-pro-page-container-children-container {
          padding: 0;
        }
        .ant-form-horizontal {
          padding: 0;
          padding-top: 10px;
        }
      `}
      style={{ padding: 0 }}
    >
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
            dataIndex: 'speech',
            title: '用语',
          },
          {
            dataIndex: 'meaning',
            title: '释义',
          },

          {
            title: '操作',
            valueType: 'option',
            width: 150,
            align: 'center',
            render(_dom, entity, _index, action) {
              return (
                <div className="space-x-2">
                  <AddEdit
                    onSubmitted={action?.reload}
                    initialValues={{
                      id: entity.id,
                      speech: entity.speech,
                      meaning: entity.meaning,
                    }}
                    trigger={<Button type="link">编辑</Button>}
                  />
                  <Popconfirm
                    title="确定删除该用语吗"
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
            />,
          ];
        }}
        request={async ({ current, pageSize, ...rest }) => {
          const data = await request.post(`/api/living-speech/list`, {
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
    </PageContainer>
  );
}
