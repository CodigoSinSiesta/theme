<!--
  Fixture de test — monta SiteHeader con props configurables.
-->
<script>
  import { untrack } from 'svelte';
  import SiteHeader from '../SiteHeader.svelte';

  let {
    links = [
      { href: '#one', label: 'Uno' },
      { href: '#two', label: 'Dos' }
    ],
    activeHref = '',
    logoVariant = 'both',
    keyboardShortcuts = true,
    showControls = false
  } = $props();

  // Snapshot inicial — el componente lee props al construir.
  const initial = {
    links: untrack(() => links),
    activeHref: untrack(() => activeHref),
    logoVariant: untrack(() => logoVariant),
    keyboardShortcuts: untrack(() => keyboardShortcuts),
    showControls: untrack(() => showControls)
  };
</script>

<SiteHeader
  links={initial.links}
  activeHref={initial.activeHref}
  logoVariant={initial.logoVariant}
  keyboardShortcuts={initial.keyboardShortcuts}
>
  {#snippet controls()}
    {#if initial.showControls}
      <button type="button" data-testid="control-btn">Toggle</button>
    {/if}
  {/snippet}
</SiteHeader>
