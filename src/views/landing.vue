<template>
  <div
    class="landing container mx-auto flex flex-col items-center justify-center"
  >
    <card
      class="card shadow-none md:shadow-lg text-center flex flex-col items-center justify-center rounded-lg py-12 px-8"
    >
      <h1 class="text-2xl font-bold">UF Scheduler</h1>
      <p>
        A small webapp to help you organize your semester at UF
      </p>

      <icon-button
        class="get-started mt-8"
        :size="64"
        @click.prevent="goToNamedRoute('app')"
      >
        arrow_forward
      </icon-button>

      <p class="get-started mt-2 mb-8">
        Get started
      </p>

      <div class="bottom-links flex flex-row justify-evenly w-full">
        <a href="https://www.hadithya.com/">Developer</a>
        <a href="/about" @click.prevent="goToNamedRoute('about')">About</a>
      </div>
    </card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from '@/components/shared/card/card.vue'
import IconButton from '@/components/shared/buttons/icon-button.vue'

export default defineComponent({
  components: {
    Card,
    IconButton
  },
  methods: {
    goToNamedRoute (name: string) {
      this.$router.push({ name })
      return 'f'
    }
  }
})
</script>

<style lang="scss" scoped>
.card {
  max-width: 300px;
}

button.get-started {
  background: #514eff;
  color: white;

  transition: all 0.25s;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
}

p.get-started {
  color: #514eff;
}

a {
  @apply text-indigo-600;

  transition: color 0.25s;

  &:hover {
    @apply text-indigo-900;
  }
}
</style>
