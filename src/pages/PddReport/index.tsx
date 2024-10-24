import { Tabs } from 'antd';

import Chat from './Chat';
import MakeRp from './MakeRp';
import JdVersion from './JdVersion';

export default function English() {
  const items = [
    {
      label: '会话',
      key: '1',
      children: <Chat />,
    },
    {
      label: '开方',
      key: '2',
      children: <MakeRp />,
    },
    {
      label: '京东版本号',
      key: '3',
      children: <JdVersion />,
    },
  ];

  return (
    <>
      <Tabs
        items={items}
        defaultActiveKey={'1'}
        // className="pt-[5px] px-[20px]"
        style={{
          height: 'calc(100vh - 180px)',
        }}
      />
    </>
  );
}
