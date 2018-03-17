<template>
  <div class="bwDashboard">
    <v-tabs v-model="active" color="white" dark slider-color="grey">
      <v-tab v-for="(menu, index) in menus" :key="index">
        {{menu.title}}
      </v-tab>
      <v-tab-item v-for="(menu, index) in menus" :key="index">
        <v-list>
          <template v-for="(item, index) in menu.list">
            <v-list-tile avatar ripple :key="index">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ item.author }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon dark color="primary" slot="activator">delete</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < menu.list.length" :key="`divider-${index}`" color="grey"></v-divider>
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
      menus: [
        {
          title: 'Pattern',
          list: [
            { title: 'Test', author: 'Wolfgang Schuchter', action: 'delete' },
            { title: 'Test', author: 'Wolfgang Schuchter', action: 'delete' },
            { title: 'Test', author: 'Wolfgang Schuchter', action: 'delete' },
          ]
        },
        {
          title: 'Formula',
          list: [
            { title: 'Test', author: 'Wolfgang Schuchter', action: 'delete' },
            { title: 'Test', author: 'Wolfgang Schuchter', action: 'delete' },
            { title: 'Test', author: 'Wolfgang Schuchter', action: 'delete' },
          ]
        }
      ]
    }
  },
  computed: {
    async patterns () {
      return await this.patternService.readAll()
    }
  },
  activated () {
    this.$store.dispatch('loadPatterns')
  }
}
</script>

<style lang="scss" scoped>

div.bwDashboard {
  margin: 5em auto; 
  width: 50vw;
  background: rgba(255,255,255,0.75);
}
</style>
