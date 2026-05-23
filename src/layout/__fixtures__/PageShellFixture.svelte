<!--
  Fixture de test — monta PageShell con snippets sintéticos.
-->
<script>
  import PageShell from '../PageShell.svelte';

  let { theme = 'dark', scrollProgress = false, lang = 'es' } = $props();
</script>

<PageShell {theme} {scrollProgress} {lang}>
  {#snippet header()}
    <div data-testid="header-content">HEADER</div>
  {/snippet}
  {#snippet main()}
    <div data-testid="main-content">MAIN</div>
  {/snippet}
  {#snippet footer()}
    <div data-testid="footer-content">FOOTER</div>
  {/snippet}
</PageShell>
