<template>
  <button :style="buttonStyle" v-ripple>
    <i class="material-icons">
      <slot></slot>
    </i>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    size: {
      type: [Number, String],
      default: 48
    }
  },
  computed: {
    buttonStyle (): Record<string, any> {
      return {
        width: this.size + 'px',
        height: this.size + 'px'
      }
    }
  }
})
</script>

<style lang="scss" scoped>
button {
  @apply rounded-full bg-blue-400 flex flex-row justify-center items-center overflow-hidden;

  > ::v-deep(span.surc-ripple-root) {
    @apply rounded;

    transition: transform 0.3s;
  }
}
</style>
