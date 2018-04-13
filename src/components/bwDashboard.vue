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
            <font-awesome-icon :icon="['fas', 'edit']" title="edit" @click="edit(currentMenu.title, item._id)" />
            <font-awesome-icon :icon="['fas', 'trash']" title="delete" @click="del(currentMenu.title, item._id)" />
          </div>
        </div>
        <section class="divider" v-if="index+1 !== currentMenu.list.length" />
      </div>
    </div>
    <div class="add" @click="add(currentMenu.title)">
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
    add (title) {
      this.$router.push({ path: `/${title}` })
    },
    edit (title, id) {
      this.$router.push({ path: `/${title}/${id}` })
    },
    del (title, id) {
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

      // could create a class called service and access the current one by doing service[this.currentMenu.title]...
    }
  }
}
</script>

<style lang="scss" scoped>
div.bwDashboard {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: rgba(255,255,255,0.75);
  margin: 10vh auto;
  max-height: 80vh;
  width: 90vw;
  border-radius: 0.2em;

  @media screen and (min-width: 720px) {
    width: 50vw;
  }

  > div.header {
    display: flex;
    flex-direction: row;
    background: rgba(255,255,255,0.75);
    > div.item {
      flex: 1;
      text-align: center;
      transition: 100ms;
      padding: 0.5em 0;
      font-size: 1em;
      background: rgba(0,0,0,0.5);
      color: rgba(255,255,255,0.75);
      &.active {
        background: rgba(0,0,0,0.75);
        color: rgba(255,255,255,0.75);
      }
      &:hover {
        background: rgba(0,0,0,0.75);
        color: rgba(255,255,255,0.75);
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
          color: rgba(0,0,0,0.65);

          &:hover {
            color: rgba(0,0,0,0.9);
          }
        }
        > div.actions {
          text-align: right;
          transition: 100ms;
          > * {
            margin: 0 0.25em;
            color: rgba(0,0,0,0.65);
            cursor: pointer;
            &:hover {
              color: rgba(0,0,0,0.9);
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
    background: rgba(255,255,255,0.75);
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
      background: rgba(0,0,0,0.75);
      color: rgba(255,255,255,0.75);
    }
  }
}
</style>
