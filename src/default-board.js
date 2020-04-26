import {uuid} from '@/utils.js'

export default {
    name: 'workshop',
    columns: [
      {
        name: '未完成事件',
        tasks: [
          {
            description: '可點擊卡片標題或任務來修改內容',
            name: '隨意修改卡片內容',
            id: uuid(),
            userAssigned: null
          },
          {
            description: '',
            name: '卡片所有的元素都可以拖曳起來',
            id: uuid(),
            userAssigned: null
          },
          {
            description: '',
            name: '直覺的操作相當簡單',
            id: uuid(),
            userAssigned: null
          }
        ]
      },
      {
        name: '處理中的事件',
        tasks: [
          {
            description: '',
            name: '可雙擊卡片標題',
            id: uuid(),
            userAssigned: null
          }
        ]
      },
      {
        name: '已完成事件',
        tasks: [
          {
            description: '只要按上方NavBar上的按鈕就可以實現變換主題的顏色',
            name: '可變換主題',
            id: uuid(),
            userAssigned: null
          }
        ]
      }
    ]
  }