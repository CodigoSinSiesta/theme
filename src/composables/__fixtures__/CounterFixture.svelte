<!--
  Fixture de test — monta useCounterAnimation y expone su estado vía
  data-attrs (legibles desde el test) y un controller en window
  para invocar métodos imperativos.
-->
<script>
  import { untrack } from 'svelte';
  import { useCounterAnimation } from '../useCounterAnimation.svelte.js';

  let { target = 100, duration = 1000, isActive = true, useGetter = false } = $props();

  // target/duration/useGetter son one-shot — el composable los lee al
  // construir. isActive cuando useGetter=true debe ser un closure reactivo
  // que el $effect del composable evalúa en cada cambio.
  const counter = useCounterAnimation({
    target: untrack(() => target),
    duration: untrack(() => duration),
    isActive: untrack(() => useGetter) ? () => isActive : untrack(() => isActive),
  });

  if (typeof window !== 'undefined') {
    window.__counter = counter;
  }
</script>

<div
  data-testid="counter"
  data-value={counter.value}
  data-complete={counter.isComplete}
  data-active={counter.isActive}
  data-target={counter.target}
></div>
