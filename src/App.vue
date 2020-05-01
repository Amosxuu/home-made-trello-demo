<template>
  <div id="app">
    <NavBar class="navpos"/>
    <router-view/>
  </div>
</template>

<script>

export default {
 
}
</script>
<style lang="scss">

html[data-theme="Green"]{
  --navColor:#55917F;
  --navTextColor:#EFF2F1;;
  --darkColor: #5E4C5A;
  --inputColor:#E1F0C4;
  --baseColor:#FFE2D1;
  --textColor:#f1f2f6;
  --desColor:#6BAB90;
}
html[data-theme="dark"]{
  --navColor:#f1f2f6;
  --navTextColor:#30336b;
  --darkColor: #576574;
  --inputColor:#f1f2f6;
  --baseColor:#333;
  --textColor:#f1f2f6;
  --desColor:#333;
}
html[data-theme="light"]{
  --navColor:#e7dfdd;
  --navTextColor:#30336b;
  --darkColor: #a239ca;
  --inputColor:#e7dfdd;
  --baseColor:#0e0b16;
  --textColor:#e7dfdd;
  --desColor:#55917F;
}
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Noto Sans TC;
}
#app{
  position: relative;
  width: 100%;
  height: 100vh;
  .navpos{
    position: fixed;
    z-index: 99;
  }
}

::-webkit-scrollbar {
    width: 12px;
}
 
::-webkit-scrollbar-track {
    // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 10px;
}
 
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--inputColor);
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}

.show-enter {
  opacity: 0;
  transform: scale(0);
}

.show-enter-active,
.show-leave-active {
  transition: all 0.5s ease-out;
}

.show-leave-to {
  opacity: 0;
}

</style>
