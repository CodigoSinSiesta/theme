<script>
  import SlideCompare from '../SlideCompare.svelte';

  let {
    eyebrow = 'Craftmanship',
    title = 'Buenas prácticas',
    titleHighlight = 'prácticas',
    subtitle = '',
    left = {
      label: 'Evita esto',
      items: ['No hacer A', 'No hacer B']
    },
    right = {
      label: 'Hazlo',
      items: ['Hacer X', 'Hacer Y']
    },
    leftKind = 'err',
    rightKind = 'ok',
    insight = null
  } = $props();
</script>

<SlideCompare
  {eyebrow}
  {title}
  {titleHighlight}
  {subtitle}
  {left}
  {right}
  {leftKind}
  {rightKind}
  {insight}
/>
