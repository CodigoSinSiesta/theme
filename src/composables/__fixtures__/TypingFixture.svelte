<!--
  Fixture de test — monta useTypingEffect y expone displayText / isComplete
  vía data-attrs. Las opciones se leen una sola vez al construir (untrack).
-->
<script>
  import { untrack } from 'svelte';
  import { useTypingEffect } from '../useTypingEffect.svelte.js';

  let { options } = $props();
  const typing = useTypingEffect(untrack(() => options));

  if (typeof window !== 'undefined') {
    window.__typing = typing;
  }
</script>

<div
  data-testid="typing"
  data-text={typing.displayText}
  data-complete={typing.isComplete}
></div>
