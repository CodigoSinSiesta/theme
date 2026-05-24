<!--
  @codigosinsiesta/theme/layout/SiteFooter

  Pie de página estático sin estado: copyright + social links + tagline.
  Patrón minimal para portfolios, landings de talleres y sitios CsS.

  Layout (desktop):  [copyright]  [tagline centrado]  [links →]
  Layout (mobile):    stack vertical centrado con gap consistente.

  Contrato de iconos: cada `link.icon` es el basename de un asset servido
  desde `/icons/{icon}.svg` por el consumer (Vite/Astro lo hacen automático
  si los SVG viven en `public/`). El componente NO inlina los SVG — usa un
  `<img>` que apunta a la ruta absoluta. Si el archivo no existe el browser
  oculta el icono y queda solo el label. Iconos disponibles en el theme
  (v0.9.0): los 13 Heroicons de v0.6.0 + el trío social `github`,
  `linkedin`, `envelope` añadidos en esta release.

  Bloques condicionales: si `copyright`, `tagline` o `links` están vacíos
  el slot correspondiente no se renderiza (el grid se ajusta solo).

  Links externos: `href` que matchea `^https?:` recibe automáticamente
  `target="_blank"` + `rel="noopener noreferrer"`. Internos (anclas,
  rutas relativas, `mailto:`...) no — el consumer puede forzar abriendo
  en nueva pestaña usando un `href` absoluto.

  Uso:
    const links = [
      { href: 'https://github.com/TellMeAlex',    label: 'GitHub',   icon: 'github' },
      { href: 'https://linkedin.com/in/...',       label: 'LinkedIn', icon: 'linkedin' },
      { href: 'mailto:alex@tellmealex.dev',         label: 'Email',    icon: 'envelope' }
    ];

    <SiteFooter
      copyright="© 2026 Alejandro de la Fuente"
      tagline="Hecho con ♥ · parte de Código Sin Siesta"
      {links}
    />
-->

<script lang="ts">
  type FooterLink = { href: string; label: string; icon?: string };

  let {
    copyright = '',
    links = [] as FooterLink[],
    tagline = ''
  } = $props<{
    copyright?: string;
    links?: FooterLink[];
    tagline?: string;
  }>();

  function isExternal(href: string): boolean {
    return /^https?:/i.test(href);
  }
</script>

<footer class="csi-site-footer">
  <div class="csi-site-footer__inner">
    {#if copyright}
      <div class="csi-site-footer__copyright">{copyright}</div>
    {/if}

    {#if tagline}
      <div class="csi-site-footer__tagline">{tagline}</div>
    {/if}

    {#if links.length > 0}
      <nav class="csi-site-footer__links" aria-label="Enlaces del pie">
        {#each links as link (link.href)}
          {@const external = isExternal(link.href)}
          <a
            class="csi-site-footer__link"
            href={link.href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
          >
            {#if link.icon}
              <img
                class="csi-site-footer__icon"
                src={`/icons/${link.icon}.svg`}
                alt=""
                width="18"
                height="18"
                aria-hidden="true"
              />
            {/if}
            <span>{link.label}</span>
          </a>
        {/each}
      </nav>
    {/if}
  </div>
</footer>

<style>
  .csi-site-footer {
    border-top: 1px solid var(--color-borde);
    background: var(--color-fondo-alt);
    color: var(--color-tinta4);
    font-family: var(--font-body);
    font-size: 13px;
  }
  .csi-site-footer__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 24px 22px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 16px;
  }
  .csi-site-footer__copyright {
    justify-self: start;
    grid-column: 1;
  }
  .csi-site-footer__tagline {
    justify-self: center;
    grid-column: 2;
    color: var(--color-tinta3);
  }
  .csi-site-footer__links {
    justify-self: end;
    grid-column: 3;
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
  }
  .csi-site-footer__link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--color-tinta2);
    text-decoration: none;
    padding: 4px 8px;
    border-radius: 6px;
    transition: color 150ms ease-out, background 150ms ease-out;
  }
  .csi-site-footer__link:hover {
    color: var(--color-cielo);
    background: color-mix(in oklab, var(--color-electrico) 12%, transparent);
  }
  .csi-site-footer__icon {
    display: block;
    width: 18px;
    height: 18px;
    /* Los SVG sirven el path en stroke=currentColor; al ser <img> el browser
       no aplica el color CSS. Mantenemos la opacidad consistente con el texto. */
    opacity: 0.85;
  }
  .csi-site-footer__link:hover .csi-site-footer__icon {
    opacity: 1;
  }

  @media (max-width: 640px) {
    .csi-site-footer__inner {
      display: flex;
      flex-direction: column;
      gap: 12px;
      text-align: center;
      padding: 20px 18px;
    }
    .csi-site-footer__copyright,
    .csi-site-footer__tagline,
    .csi-site-footer__links {
      justify-self: center;
      grid-column: auto;
    }
    .csi-site-footer__links {
      justify-content: center;
    }
  }
</style>
