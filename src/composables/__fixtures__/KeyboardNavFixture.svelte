<!--
  Fixture de test — monta useKeyboardNav y expone via window el contador
  de invocaciones por handler. Soporta dos modos: literal o getter.
-->
<script>
  import { untrack } from 'svelte';
  import { useKeyboardNav } from '../useKeyboardNav.svelte.js';

  let { shortcuts, useGetter = false } = $props();

  const nav = useKeyboardNav(
    untrack(() => useGetter) ? () => shortcuts : untrack(() => shortcuts)
  );

  if (typeof window !== 'undefined') {
    window.__nav = nav;
  }
</script>

<div data-testid="nav" data-count={nav.shortcuts.length}></div>
<input data-testid="input" />
<div data-testid="editable" contenteditable="true"></div>
