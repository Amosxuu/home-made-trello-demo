<template>
    <div class="delete" @click="deleteEvent">
        <ion-icon name="trash-outline"></ion-icon>
    </div>
</template>

<script>
export default {
    methods:{
        deleteEvent(){
            this.$emit('deleteEvent')
        }
    }
}
</script>

<style lang="scss" scoped>
.delete{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #39b982;
    box-shadow: inset 0 0 3px rgba(0,0,0,0.5);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.1s;
    &:hover{
        background-color:#eb4d4b;
    }
    ion-icon{
        font-size: 2em;
        &:hover{
            color: #fff;
        }
    }
    
}
</style>