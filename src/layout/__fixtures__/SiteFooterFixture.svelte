<!--
  Fixture de test — monta SiteFooter con props configurables.
-->
<script>
  import { untrack } from 'svelte';
  import SiteFooter from '../SiteFooter.svelte';

  let { copyright = '', links = [], tagline = '' } = $props();

  const initial = {
    copyright: untrack(() => copyright),
    links: untrack(() => links),
    tagline: untrack(() => tagline)
  };
</script>

<SiteFooter
  copyright={initial.copyright}
  links={initial.links}
  tagline={initial.tagline}
/>
