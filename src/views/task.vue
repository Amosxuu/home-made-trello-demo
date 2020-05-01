<template>
<transition appear name="show">
    <div class="big-task">
        <div class="create-area">
            <DeleteBtn class="delete-btn" @deleteEvent="deleteItem"/>
            <h2>{{column.name}}</h2>
            <input 
            class="name-input" 
            placeholder="請輸入標題" 
            type="text" 
            :value="task.name"
            @change="updateTaskProperty($event,'name')"
            >
            <div class="description-area" >
                <textarea 
                class="description-input" 
                placeholder="請輸入內容" 
                :value="task.description"
                @change="updateTaskProperty($event,'description')"
                ></textarea>
            </div>
        </div>
        <div class="task-submit"  @click="submit">
            <ion-icon name="push"></ion-icon>
        </div>
    </div>
</transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters(['getTask']),
        task(){
            return this.getTask(this.$route.params.id,'task')
        },
        column(){
            return this.getTask(this.$route.params.id,'column')
        }
    },
    methods:{
        updateTaskProperty($event,key){
            this.$store.commit('UPDATE_TASK',{
                task:this.task,
                key:key,
                value:event.target.value
            })
        },
        deleteItem(){
            this.$store.commit('DELETE_ITEM',{
                id:this.task.id,
                type:'task'
            })
            this.$router.push({name:'board'})
        },
        submit(){
            this.$router.push({name:'board'})
        }
    }
}
</script>

<style lang="scss" >
.big-task{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 600px;
    border-radius: 10px;
    padding: 10px;
    background-color:  var(--darkColor);
    display: block;
    border: 4px solid var(--baseColor);

    .delete-btn{
        float: right;
        margin-bottom: 10px;
    }
    .name-input{
        width: 100%;
        padding: 5px;
        font-size: 1.1em;
        border-radius: 10px;
        border: none;
        outline: none;
    }
    h2{
        font-family: Noto Sans TC;
        text-align: center;
        vertical-align: middle;
        color:var(--textColor);
        letter-spacing: 10px;
        margin: 10px;
    }
    
    .description-area{
        margin-top: 20px;
        .description-input{
            width: 100%;
            height: 130px;
            padding: 5px;
            font-size: 1em;
            border-radius: 10px;
            border: none;
            outline: none;
        }
    }
    .task-submit{
        margin: 5px;
        float: right;
        padding: 10px;
        width: 80px;
        font-size: 2.5em;
        border-radius: 10px;
        background-color: #39b982;
        color: white;
        box-shadow: -3px 3px #333;
        transform: translate(0px ,0px);
        display: flex;
        justify-content: center;
        cursor: pointer;
        &:active{
            background-color:#eb4d4b;
            transform: translate(-3px, 3px);
            box-shadow: none;
        }
    }
}

</style>