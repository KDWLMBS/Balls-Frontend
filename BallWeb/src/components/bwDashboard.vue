<template>
  <div class="bwDashboard">
    <v-tabs color="white" dark slider-color="grey">
      <v-tab v-for="(menu, index) in menus" :key="index">
        {{menu.title}}
      </v-tab>
      <v-tab-item v-for="(menu, index) in menus" :key="index">
        <v-list>
          <template v-for="(item, index) in menu.list">
            <v-list-tile avatar ripple :key="index">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item._id}}</v-list-tile-sub-title>
                <!-- <v-list-tile-sub-title class="text--primary">{{ item.author }}</v-list-tile-sub-title> -->
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn outline flat icon @click="edit(item._id)">
                  <v-icon color="primary">edit</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn outline flat icon @click="deletePat(item._id)">
                  <v-icon color="primary">delete</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import patternService from '@/api/pattern'

export default {
  name: 'bwDashboard',
  data () {
    return {
      menus: {
        pattern: { title: 'Pattern', list: [] },
        formulas: { title: 'Formula', list: [] }
      }
    }
  },
  created () {
    patternService.readAll().then(res => {
      this.menus.pattern.list = res
    })
  },
  methods: {
    edit (id) {
      this.$router.push({ path: `/pattern/${id}` })
    },
    deletePat (id) {
      patternService.delete({_id: id})
        .then(res => {
          const idx = this.menus.pattern.list.findIndex(e => e._id == id)
          this.menus.pattern.list.splice(idx, 1)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
div.bwDashboard {
  background: rgba(255,255,255,0.75);
  margin: 5em auto; 
  width: 90vw;
  border-radius: 0.2em;

  @media screen and (min-width: 720px) {
    width: 50vw;
  }
}
</style>
