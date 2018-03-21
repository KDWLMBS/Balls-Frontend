<template>
    <div class="bwSimulation">
        <!-- dummy start -->
        <bw-frame v-bind="currentFrame" :disabled="false"></bw-frame>
        <!-- currentFrame is a computed variable.. get ele from array by using the pagination number as idx -->
        <!-- dummy end   -->
        <p>{{frame}}</p>
        <transition-group>
            <input v-for="(item, index) in frame.positions" :key="index" :disabled="disabled" type="range" vertical />
        </transition-group>
    </div>
</template>

<script>
export default {
  props: [
    'disabled',
    'frame',
  ]
}
</script>

<style lang="scss" scoped>
div.bwSimulation {
    height: 100%;
    input {
        height: inherit;
    }
}
</style>
