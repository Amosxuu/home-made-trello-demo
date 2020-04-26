<template>
  <div class="board">
     
    <ul class="column-container">
      <li 
        class="column" 
        v-for="column,columnIndex in board.columns"
        :key="columnIndex"
        @drop="moveTaskOrColumn($event,column.tasks,columnIndex)"
        draggable
        @dragstart.self="pickUpColumn($event,columnIndex)"
        @dragover.prevent
        @dragenter.prevent
      >
        <DeleteBtn class="delete-btn" @deleteEvent="deleteColumn(columnIndex,column)"/>
        <input type="text" :value="column.name"
        class="column-name"
        @change="changeColumnName($event,columnIndex)"
        @keyup.enter="changeColumnName($event,columnIndex)"
        >
        
        <div class="task-container">
          <div class="task" 
          v-for="task, taskIndex in column.tasks"
          :key="taskIndex"
          @click=" goToRoute('task',task)"
          draggable
          @dragstart="pickUpTask($event,taskIndex,columnIndex)"

          @dragover.prevent
          @dragenter.prevent
          @drop.stop="moveTaskOrColumn($event,column.tasks,columnIndex,taskIndex)"
          
          >
            <p class="task-name">{{task.name}}</p>
            <p class="description"
            v-if="task.description"
            >{{task.description}}</p>
          </div>
          <div>
            <input class="task-input" type="text" placeholder="+ 請輸入任務" 
            @keyup.enter="createTask($event,column.tasks)"
            >
          </div>
        </div>
      </li>
    </ul>
    <div class="mask" v-if="isTaskOpen"
      @click.self="stopToTask"
      @keyup.esc ="stopToTask"
    >
        <router-view/>
    </div>
    <div class="createColumn" @click="goToRoute('column')">
      <img class="plus" src="@/assets/more.png">
    </div>
    <div class="createColumn deleteC" @click="deleteAllColumn">
      <img class="plus" src="@/assets/testing.png">
    </div>
    <div class="mask" v-if=" isColumnOpen" @click.self="stopToTask" >
      <transition appear name="show">
      <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import gsap from 'gsap'
export default {
  computed:{
    ...mapState(['board']),
    isTaskOpen(){
      return this.$route.name === 'task'
    },
    isColumnOpen(){
      return this.$route.name === 'column'
    }
  },
  methods:{
    goToRoute(name,task){
      if(task){
        this.$router.push({name,params:{id:task.id}})
      }else{
        this.$router.push({name})
      }
    },
    stopToTask(){
      this.$router.push({name:'board'})
    },
    createTask(event,nowTasks){
      if(event.target.value){
        this.$store.commit('CREATE_TASK',{
          name:event.target.value,
          nowTasks
        })
        event.target.value = ''
      }else{
        return
      }
    },
    deleteColumn(columnIndex,column){
      let columnName = column.name
      let del = confirm(`你確定要刪除${columnName}?`)
      if(del){
        this.$store.commit('DELETE_ITEM',{
          type:'column',
          columnIndex
        })
      }
    },
    changeColumnName(event,columnIndex){
      let value = event.target.value
      this.$store.commit('CHANGE_C_NAME',{
        columnIndex,
        value
      })
    },
    deleteAllColumn(){
      let yes = confirm('您確定要清空全部卡片嗎?')
      if(yes){
        this.$store.commit('DELETE_ALL_C')
      }
    },
    pickUpTask(event,fromTaskIndex,fromColumnIndex){
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('from-task-index',fromTaskIndex)
      event.dataTransfer.setData('from-column-index',fromColumnIndex)
      event.dataTransfer.setData('type','task')
    },
    pickUpColumn(event,fromColumnIndex){
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('from-column-index',fromColumnIndex)
      event.dataTransfer.setData('type','column')
    },
    moveTaskOrColumn(event,toTasks,toColumnIndex,toTaskIndex){
      const type = event.dataTransfer.getData('type')
      if(type === 'task'){
        this.moveTask(event,toTasks,toTaskIndex)
      }else{
        this.moveColumn(event,toColumnIndex)
      }
    },
    moveTask(event,toTasks,toTaskIndex){
      const fromTaskIndex = event.dataTransfer.getData('from-task-index')
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      this.$store.commit('MOVE_TASK',{
        toTasks,
        toTaskIndex,
        fromTaskIndex,
        fromTasks
      })
    },
    moveColumn(event,toColumnIndex){
      const fromColumnIndex = event.dataTransfer.getData('from-column-index')
      this.$store.commit('MOVE_COLUMN',{
        fromColumnIndex,
        toColumnIndex
      })
    }
  },
  mounted() {
    gsap.from('.column', {
      duration: 0.5,
      opacity: 0,
      y: 200,
      ease: 'power1',
      stagger: {
        each: 0.1,
      }
    })
  }
}
</script>

<style lang="scss">
  .board{
    background-color: var(--baseColor);
    padding: 20px;
    position: relative;
    min-height: 100vh;
    .mask{
      background-color:rgba(0,0,0,0.5);
      width: 100vw;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2; 
    }
    .createColumn,
    .deleteAllColumn
    {
      position: fixed;
      bottom: 2.5%;
      right: 2.5%;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 2px solid var(--darkColor);
      background-color:var(--inputColor);
      transition: all 0.5s;
      &:hover{
        box-shadow: 
        0px 0px 30px 2px var(--darkColor),
        ;
        transform: scale(1.2);
      }
      .plus{
        width: 60%;
        height: 60%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        
      }
    }
      .deleteC{
        bottom: 2.5%;
        right: 10%;
      }
  }
  .column-container{
    padding-top: 10vh;

    .column{
      width: 280px;
      max-height: 85vh;
      background-color: var(--darkColor);
      box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
      display: inline-block;
      vertical-align: top;
      padding: 15px 15px 10px 15px;
      margin: 5px;
      border-radius: 20px;
      overflow-y: scroll;
      .column-name{
        background-color:transparent;
        width: 100%;
        cursor: pointer;
        border: none;
        text-align: center;
        color: var(--textColor);
        font-size: 1.3em;
        letter-spacing: 5px;
      }
      .delete-btn{
        
      }
    }
  }

  .task-container{
    width: 100%;
    text-align: center;
    word-wrap:break-word;
    .task{
      padding-top: 5px;
      font-size: 20px;
      background-color: var(--inputColor);
      margin: 10px 0px;
      border-radius: 10px;
      cursor: pointer;
      &:hover{
        opacity: 0.7;
      }
      .description{
        margin-top: 5px;
        font-size: 16px;
        padding: 5px;
        color: #fff;
        border-radius: 0px 0px 10px 10px;
        background-color: var(--desColor);
        
      }
    }
    .clearfix::after{
      content: "";
      display: block;
      clear: both;
    }
    .task-input{
      width: 100%;
      background-color: transparent;
      border-radius: 10px;
      font-size: 1.2em;
      letter-spacing: 2px;
      cursor: pointer;
      border: none;
      outline: none;
      color: var(--textColor);
      padding: 5px;
      &::placeholder{
        color: var(--textColor);
      }
      &:hover{
        background-color: rgba(0,0,0,0.5);
      }
    }
  }

  
</style>
