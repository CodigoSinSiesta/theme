<!--
  Fixture de test — monta BentoCard con props configurables.
-->
<script>
  import { untrack } from 'svelte';
  import BentoCard from '../BentoCard.svelte';

  let {
    size = 'md',
    ariaLabel = 'Test card',
    keyboardHint = '',
    entryAnimation = true,
    id = ''
  } = $props();

  const initial = {
    size: untrack(() => size),
    ariaLabel: untrack(() => ariaLabel),
    keyboardHint: untrack(() => keyboardHint),
    entryAnimation: untrack(() => entryAnimation),
    id: untrack(() => id)
  };
</script>

<BentoCard
  size={initial.size}
  ariaLabel={initial.ariaLabel}
  keyboardHint={initial.keyboardHint}
  entryAnimation={initial.entryAnimation}
  id={initial.id}
>
  <div data-testid="card-content">Contenido</div>
</BentoCard>
