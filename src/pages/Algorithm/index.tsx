import { Tabs } from 'antd';

import BinarySearch from './binary_search.svg';
import Dp from './dp.svg';
import HeapStackQueue from './heap_stack_queue.svg';
import LinkedList from './linked_list.svg';
import Tree from './tree.svg';
import Mini from './mini.svg';

export default function English() {
  const items = [
    {
      label: '二分查找',
      key: '1',
      children: <img src={BinarySearch} alt="" />,
    },
    {
      label: '动态规划',
      key: '2',
      children: <img src={Dp} alt="" />,
    },
    {
      label: '堆栈队列',
      key: '3',
      children: <img src={HeapStackQueue} alt="" />,
    },
    {
      label: '链表',
      key: '4',
      children: <img src={LinkedList} alt="" />,
    },
    {
      label: '树',
      key: '5',
      children: <img src={Tree} alt="" />,
    },
    {
      label: '小众',
      key: '6',
      children: <img src={Mini} alt="" />,
    },
  ];

  return (
    <>
      <Tabs
        items={items}
        defaultActiveKey={'1'}
        style={{
          overflow: 'scroll',
        }}
      />
    </>
  );
}
