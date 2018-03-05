<template>
  <form @submit="save">
    <v-text-field label="test" />
    <div>
      <span>name</span>
      <input type="text"/>
    </div>
    <div>
      <span>type</span>
      <select>
        <option value="single">Single</option>
        <option value="multiple">Multiple</option>
      </select>
    </div>
    <div>
      <span>shift?</span>
      <input type="checkbox"/>
    </div>
    <div>
      <span>shift direction</span>
      <select>
        <option value="left">Left</option>
        <option value="right">Right</option>
      </select>
    </div>
    <input type="submit" value="submit" />
  </form>
</template>

<script>
export default {
  computed: {
  }
}
</script>

<style lang="scss" scoped>

</style>


