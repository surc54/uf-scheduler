<template>
  <router-view v-slot="{ Component }">
    <transition mode="out-in" :name="transitionName">
      <component :is="Component" class="h-full" :key="$route.path" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const pathLength = (path: string) => {
  return path === '/' ? 1 : path.split('/').length
}

export default defineComponent({
  data () {
    return {
      transitionName: 'anim-slide-right'
    }
  },
  watch: {
    $route (to, from) {
      const toDepth = pathLength(to.path)
      const fromDepth = pathLength(from.path)
      this.transitionName = toDepth < fromDepth ? 'anim-slide-right' : 'anim-slide-left'
    }
  }
})
</script>
