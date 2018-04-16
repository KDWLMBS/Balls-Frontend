<template>
  <div class="bwDashboard">
    <div class="header"> <!-- flex row -->
      <div class="item" v-bind:class="{active: menu===currentMenu}" v-for="(menu, index) in menus" :key="index" @click="currentMenu=menu">
        {{ menu.title }}
      </div>
    </div>
    <div class="list"> <!-- flex column -->
      <div class="item" v-for="(item, index) in currentMenu.list" :key="index"> <!-- flex row -->
        <div class="row">
          <span>{{ item.name }}</span>
          <div class="actions">
            <font-awesome-icon :icon="['fas', 'play']" title="play" @click="play(item._id)" />
            <font-awesome-icon :icon="['fas', 'edit']" title="edit" @click="edit(item._id)" />
            <font-awesome-icon :icon="['fas', 'trash']" title="delete" @click="del(item._id)" />
          </div>
        </div>
        <section class="divider" v-if="index+1 !== currentMenu.list.length" />
      </div>
    </div>
    <div class="add" @click="add()">
      <span>Add</span>
      <font-awesome-icon :icon="['fas', 'plus-circle']" title="add" />
    </div>
  </div>
</template>

<script>
import patternService from '../api/pattern'
import formulaService from '../api/formula'

export default {
  name: 'bwDashboard',
  data () {
    return {
      currentMenu: {},
      menus: [
        { title: 'Pattern', list: [] },
        { title: 'Formula', list: [] }
      ]
    }
  },
  created () {
    this.currentMenu = this.menus[0]
    patternService.readAll().then(res => {
      this.menus.find(m => m.title === 'Pattern').list = res
    })
    formulaService.readAll().then(res => {
      this.menus.find(m => m.title === 'Formula').list = res
    })
  },
  methods: {
    add () { // navigation to add page of wheather pattern or formula
      let title = this.currentMenu.title
      this.$router.push({ path: `/${title}` })
    },
    edit (id) { // navigation to edit page
      let title = this.currentMenu.title
      this.$router.push({ path: `/${title}/${id}` })
    },
    del (id) { // deletion of pattern/formula
      let title = this.currentMenu.title
      switch (title) {
        case 'Pattern':
          patternService.delete({_id: id}).then(res => {
            const idx = this.currentMenu.list.findIndex(e => e._id === id)
            this.currentMenu.list.splice(idx, 1)
          })
          break
        case 'Formula':
          formulaService.delete({_id: id}).then(res => {
            const idx = this.currentMenu.list.findIndex(e => e._id === id)
            this.currentMenu.list.splice(idx, 1)
          })
          break
      }

      // could have created a class called services and access the current one by doing services[this.currentMenu.title]...
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../default';

div.bwDashboard {
  > div.header {
    display: flex;
    flex-direction: row;
    > div.item {
      flex: 1;
      text-align: center;
      transition: 100ms;
      padding: 0.5em 0;
      font-size: 1em;
      background-color: $primary-color;
      color: $text-color;
      &.active {
        background-color: $active-color;
        color: $text-color;
      }
      &:hover {
        background-color: $hover-color;
        color: $text-color;
      }
    }
  }
  > div.list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 0;
    > div.item {
      flex: 1;
      > div.row {
        display: flex;
        flex-direction: row;
        padding: 0.5em;
        margin: 0.1em 0;
        > span {
          flex: 1;
          margin: auto 0;
          font-size: 0.8em;
          color: $primary-color;

          &:hover {
            color: $hover-color;
          }
        }
        > div.actions {
          text-align: right;
          transition: 100ms;
          > * {
            margin: 0 0.25em;
            color: $primary-color;
            cursor: pointer;
            &:hover {
              color: $hover-color;
            }
          }
        }
      }
      > section.divider {
        display: block;
        width: 98%;
        margin: 0 auto;
        border-bottom: 0.1em solid rgba(0,0,0,0.5);
      }
    }
  }
  > div.add {
    background-color: $primary-color;
    color: $text-color;
    padding: 0.5em;
    transition: 100ms;
    text-align: center;
    > span {
      font-size: 1em;
      font-weight: bold;
    }

    > * {
      text-align: center;
      margin: 0 0.25em;
    }

    &:hover {
      background-color: $hover-color;
      color: $text-color;
    }
  }
}
</style>
