import Vue from 'vue'
import Vuex from 'vuex'
import { saveStatePlugin,uuid } from '@/utils.js'
import defaultBoard from '@/default-board.js'

Vue.use(Vuex)
const board = JSON.parse(localStorage.getItem('board')) || defaultBoard
export default new Vuex.Store({
  plugins:[saveStatePlugin],
  state: {
    board
  },
  getters:{
    getTask(state){
      return (id,type)=>{
        for(const column of state.board.columns){
          for(const task of column.tasks){
            if(task.id === id){
              return type === 'task'? task:column
            }
          }
        }
      }
  },
},
  mutations: {
    CREATE_TASK(state,{name,nowTasks}){
      nowTasks.push({
        description: '',
        name,
        id: uuid(),
        userAssigned: null
      })
    },
    DELETE_ITEM(state,{id,type,columnIndex}){
      if(type === 'task'){
        state.board.columns.forEach((column)=>{
          column.tasks.forEach((task,index) => {
            if(task.id === id){
              column.tasks.splice(index,1)
            }
          });
        })
      }else if(type === 'column'){
        state.board.columns.splice(columnIndex,1)
      }
    },
  
    CREATE_COLUMN(state,{name}){
      const columns = state.board.columns
      columns.push({
        name,
        tasks:[]
      })
    },
    UPDATE_TASK(state,{task,key,value}){
      task[key] = value
    },
    MOVE_TASK(state,{toTasks,toTaskIndex,fromTaskIndex,fromTasks}){
      const taskToMove = fromTasks.splice(fromTaskIndex,1)[0]
      toTasks.splice(toTaskIndex,0,taskToMove)
    },
    MOVE_COLUMN(state,{fromColumnIndex,toColumnIndex}){ 
      const columnList = state.board.columns
      const columnToMove = columnList.splice(fromColumnIndex,1)[0]
      columnList.splice(toColumnIndex,0,columnToMove)
    },
    CHANGE_C_NAME(state,{columnIndex,value}){    
      state.board.columns[columnIndex].name = value
    },
    DELETE_ALL_C(state){
      state.board.columns = [] 
    }
  }
})
