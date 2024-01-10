<script lang="ts">
  import Icon from "@iconify/svelte";
  import { fade } from "svelte/transition";
  export let show: boolean;
</script>

{#if show}
  <div transition:fade class="fixed inset-0 loading">
    <div class="h-full grid place-content-center">
      <Icon
        icon="gg:spinner"
        class="text-slate-50 animate-spin text-5xl z-20"
      />
    </div>
  </div>
{/if}

<style lang="scss">
  .loading {
    @apply z-10;
  }

  .loading::before {
    content: "";
    position: absolute;
    inset: 0;
    @apply bg-black/80;
  }
</style>
