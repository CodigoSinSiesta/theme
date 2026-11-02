// Planos por párrafo. Cada plano o elemento se activa con la palabra que lo nombra (at, hlAt, listAt, flagAt, beats).
// Tipos: statement, cards (vs, cls), code, diagram (steps, git, stages, states, context), cap/split (capturas, en caps_clean/), gif. Ver ../../../motor/LEEME.md.
window.SHOTS = {
  'c1-01': [{ type: 'statement', kicker: 'Ejemplo', big: 'Un plano por idea,<br><span class="gr">sincronizado con la voz</span>', sub: 'Cada elemento entra cuando se nombra.' }],
  'c1-02': [{ type: 'cards', title: 'Tres pasos', cols: 3, items: [
    { k: '01', t: 'Instalar', d: 'el agente y sus requisitos', at: 'la instalación' },
    { k: '02', t: 'Configurar', d: 'proveedor y modelo', at: 'la configuración' },
    { k: '03', t: 'Primera sesión', d: 'un encargo pequeño', at: 'la primera sesión' }] }],
  'c2-01': [{ type: 'code', id: 'ejemplo', flagAt: ['el modelo', 'el modo de impresión', 'el prompt'] }],
  'c2-02': [{ type: 'diagram', name: 'steps', title: 'Cómo trabaja un agente', steps: [['Usuario', 'pide algo'], ['Agente', 'razona'], ['Herramientas', 'lee, edita, ejecuta'], ['Respuesta', 'con evidencia']], beats: ['el usuario pide', 'el agente piensa', 'usa herramientas', 'y responde'], cap: 'El bucle del agente' }],
};

window.CODE = {
  ejemplo: {
    title: 'Una petición desde la línea de comandos',
    lines: ['pi --model <modelo> \\', '   -p "Resume el README"'],
    flags: [['--model', 'Modelo que responde'], ['-p', 'Modo de impresión: responde y sale'], ['"Resume el README"', 'El prompt']],
  },
};
