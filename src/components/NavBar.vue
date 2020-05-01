<template>
  <div class="navbar">
    <div class="logo">
        <ion-icon name="newspaper-outline"></ion-icon>
    </div>
    <div class="title" >
        拖曳記事簿
    </div>
    <div class="toggle-container">
        <input type="checkbox" id="switch" name="theme" @change="changeTheme"/><label for="switch">Toggle</label>
        <p v-if="mode" class="Green" >Green 主題</p>
        <p v-else class="dark">Dark 主題</p>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            mode:true
        }
    },
methods:{
    changeTheme(){
        const checkbox = document.querySelector('input[name=theme]')
        if(checkbox.checked) {
            localStorage.setItem('theme','dark')
            this.trans()
            this.change()
            document.documentElement.setAttribute('data-theme', 'dark')
        } else {
            localStorage.setItem('theme','Green')
            this.trans()
            this.change()
            document.documentElement.setAttribute('data-theme', 'Green')
        }
    },
    trans(){
        document.documentElement.classList.add('transition');
        window.setTimeout(() => {
            document.documentElement.classList.remove('transition')
        }, 2000)
    },
    change(){
        this.mode = !this.mode
    }
    },
    mounted(){
        const theme = localStorage.getItem('theme') ||'Green'
        document.documentElement.setAttribute('data-theme', theme)
        const checkbox = document.querySelector('input[name=theme]')
        if(theme === 'dark'){
            checkbox.checked = true
            this.change()
        }
    }
}
</script>

<style lang="scss">
.navbar{
    height: 10vh;
    width: 100%;
    background-color: var(--navColor);
    box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    overflow: hidden;
    .title{
        margin-left:10px;
        height: 100%;
        font-size: 1.7rem;
        font-weight: 500;
        letter-spacing: 7px;
        line-height: 10vh;
        color: var(--navTextColor);
        
    }
    .logo{
        display: flex;
        ion-icon{
            font-size: 3.5em;
            color: var(--navTextColor);
            padding: 5px;
            padding-left: 10px;
        }
    }
}
/////////////////////////////////
.toggle-container{
    display: flex;
    align-content: center;
    .dark{
        color: var(--navTextColor);
    }
    .Green{
        color: var(--navTextColor);
    }
    p{
        font-weight: 600;
        font-size: 1.4em;
        margin-left: 20px;
        letter-spacing: 2px;
    }
}
input[type=checkbox]{
    margin-left: 30px;
	height: 0;
	width: 0;
	visibility: hidden;
}

label {
	cursor: pointer;
    text-indent: -9999px;
	width: 4vw;
	height: 4vh;
	background:var(--baseColor);
	float: right;
	border-radius: 100px;
    position: relative;
    margin-top: 4px;
}

label:after {
	content: '';
	position: absolute;
	top: 11%;
	left: 1%;
	width: 3vh;
	height: 3vh;
	background: #fff;
	border-radius: 90px;
	transition: 0.3s;
}

input:checked + label {
	background: var(--baseColor);
}

input:checked + label:after {
	left: calc(100% - 5px);
	transform: translateX(-100%);
}

label:active:after {
	width: 45px;
}

html.transition,
html.transition *,
html.transition *:before,
html.transition *:after {
  transition: all 750ms !important;
  transition-delay: 0 !important;
}
</style>