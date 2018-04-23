<template>
  <div class="bwInput">
    <select v-if="type.toLowerCase() === 'select'" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" >
      <option value selected disabled hidden>{{placeholder}}</option>
      <option v-for="(opt, index) in options" :key="index" :value="opt">{{opt}}</option>
    </select>
    <button v-else-if="type.toLowerCase() === 'submit'" @click="$emit('click')">Save</button>
    <input v-else :type="type" :placeholder="placeholder" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" />
  </div>
</template>

<script>
export default {
  props: [ 'type', 'placeholder', 'options', 'value' ]
}
</script>

<style lang="scss" scoped>
@import '../default';

div.bwInput {
  > * {
    display: block;
    width: 100%;
    padding: 1em 0.5em;

    border: 0;
    color: $primary-color;

    &::placeholder {
      color: $primary-color;
    }

    > * {
      padding: 0;
      margin: 0;
    }
  }

  > button {
    background: $primary-color;
    color: $text-color;
    &:hover {
      background: $hover-color;
    }
    &:active {
      background: $active-color;
    }
  }
}
</style>
