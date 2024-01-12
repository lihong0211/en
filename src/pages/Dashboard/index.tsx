import { Tabs, Card } from 'antd';

import Words from './Words';
import Root from './Root';
import Affix from './Affix';
import Dialogue from './Dialogue';
import LivingSpeech from './LivingSpeech';
import Test from './Test';
import Footer from '../../components/Footer';

export default function Dashboard() {
  const items = [
    {
      label: '单词',
      key: '1',
      children: <Words />,
    },
    {
      label: '词根',
      key: '2',
      children: <Root />,
    },

    {
      label: '词缀',
      key: '3',
      children: <Affix />,
    },
    {
      label: '对白',
      key: '4',
      children: <Dialogue />,
    },
    {
      label: '用语',
      key: '5',
      children: <LivingSpeech />,
    },
    {
      label: '测试',
      key: '6',
      children: <Test />,
    },
  ];

  return (
    <>
      {/* <Card bordered style={{ height: '100vh' }}> */}
      <Tabs
        items={items}
        defaultActiveKey={'1'}
        className="pt-[5px] px-[20px]"
        style={{
          height: '100vh',
        }}
      />
      {/* </Card> */}
      <Footer></Footer>
    </>
  );
}
