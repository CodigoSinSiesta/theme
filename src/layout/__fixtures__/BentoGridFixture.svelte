<!--
  Fixture de test — monta BentoGrid con hijos sintéticos para que los tests
  puedan inspeccionar la estructura DOM resultante.
-->
<script>
  import { untrack } from 'svelte';
  import BentoGrid from '../BentoGrid.svelte';

  let {
    cols = 12,
    gap = '20px',
    dense = true,
    ariaLabel = ''
  } = $props();

  const initial = {
    cols: untrack(() => cols),
    gap: untrack(() => gap),
    dense: untrack(() => dense),
    ariaLabel: untrack(() => ariaLabel)
  };
</script>

<BentoGrid
  cols={initial.cols}
  gap={initial.gap}
  dense={initial.dense}
  ariaLabel={initial.ariaLabel}
>
  <div data-testid="child-1">A</div>
  <div data-testid="child-2">B</div>
</BentoGrid>
