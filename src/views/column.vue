<template>
    <div class="big-column">
        <h2>請輸入新標題</h2>
        <input type="text" class="new-input" placeholder="請輸入新標題"
        @keyup.enter="createNewColumn($event)"
        >
    </div>
</template>

<script>
import{mapState} from 'vuex'
export default {
    computed:{
        ...mapState(['board']),
    },
    methods:{
        createNewColumn(event){
            const name = event.target.value
            if(name){
                this.$store.commit('CREATE_COLUMN',{
                    name
                })
                this.$router.push({name:'board'})
            }
        }
    }
}
</script>

<style lang="scss">
.big-column{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 50%;
    height: 25%;
    border-radius: 10px;
    border: 4px solid  var(--baseColor);
    padding: 20px;
    background-color: var(--darkColor);
    display: block;
    h2{
        text-align: center;
        color:  var(--textColor);
        padding: 5px;
        letter-spacing: 10px;
        margin-bottom: 10px;
    }
    .new-input{
        width: 100%;
        padding: 5px;
        font-size: 1.1em;
        border-radius: 10px;
        border: none;
        outline: none;
    }
}
</style>