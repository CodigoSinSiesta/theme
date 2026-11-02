/* mcp-connect · agente conectado a N servidores MCP con sus herramientas; un servidor por paso (curvas desde el agente).
   Datos: agent = { logo, name }, servers[] (1–6) = { logo, name, tools: [] | 'a · b' }. Con más de 4 las filas se juntan. */
TPL['mcp-connect'] = {
  def: {
    kicker: 'MCP', title: 'Un agente, [[cuatro servidores]]',
    agent: { logo: 'mcp', name: 'Agente' },
    servers: [
      { logo: 'github', name: 'GitHub', tools: ['list_prs', 'create_issue', 'review'] },
      { logo: 'slack', name: 'Slack', tools: ['post_message', 'read_channel'] },
      { logo: 'notion', name: 'Notion', tools: ['search', 'create_page'] },
      { logo: 'linear', name: 'Linear', tools: ['list_issues', 'update_status'] },
    ],
  },
  html(d, H) {
    const n = d.servers.length, p = n <= 4 ? 155 : 620 / n, h = Math.min(130, p - 25), tot = (n - 1) * p + h;
    const t0 = n >= 4 ? 330 : 627.5 - tot / 2, cy = i => t0 + i * p + h / 2;
    const paths = d.servers.map((s, i) => `<path class="draw" data-i="${i + 1}" d="M520 640 C700 640 720 ${cy(i)} 900 ${cy(i)}"/>`).join('');
    const rows = d.servers.map((s, i) => {
      const tools = Array.isArray(s.tools) ? s.tools.join(' · ') : s.tools;
      return `<div class="g r flex" data-i="${i + 1}" style="left:900px;top:${t0 + i * p}px;width:900px;height:${h}px;padding:0 30px;gap:26px">${H.ICO(s.logo, Math.min(70, h - 30))}<span class="t" style="font-size:34px;width:200px">${H.A(s.name)}</span><span class="mono" style="font-size:24px;color:var(--pale3)">${H.esc(tools)}</span></div>`;
    }).join('');
    return `${H.HEAD(d)}
<svg class="abs" style="left:0;top:0" width="1920" height="1080" fill="none" stroke="#60a5fa" stroke-width="3">${paths}</svg>
<div class="g lit r flex" data-i="0" style="left:120px;top:520px;width:400px;height:240px;gap:24px;flex-direction:column;justify-content:center">${H.ICO(d.agent.logo, 90)}<span class="t" style="font-size:36px">${H.A(d.agent.name)}</span></div>
${rows}`;
  },
};
