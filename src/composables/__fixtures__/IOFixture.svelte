<!--
  Fixture de test — monta el composable en N nodos y expone `isVisible`
  vía data-attr para que los tests lo lean sin atravesar la API runes.
-->
<script>
  import { untrack } from 'svelte';
  import { useIntersectionObserver } from '../useIntersectionObserver.svelte.js';

  let { options = {}, count = 1 } = $props();
  // Snapshot inicial — el composable lee options solo una vez al construirse.
  const observer = useIntersectionObserver(untrack(() => options));
</script>

<div data-testid="visible-state" data-visible={observer.isVisible}></div>
{#each Array(count) as _, i (i)}
  <div data-testid="target-{i}" use:observer.target></div>
{/each}
