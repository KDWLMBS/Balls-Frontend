<template>
  <form @submit="save">
    <div>
      <span>name</span>
      <input type="text"/>
    </div>
    <div>
      <span>type</span>
      <input type="checkbox"/>
    </div>
    <div>
      <span>shift</span>
      <input type="checkbox"/>
    </div>
    <div>
      <span>shift direction</span>
      <input type="checkbox"/>
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


