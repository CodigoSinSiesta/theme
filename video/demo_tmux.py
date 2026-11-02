"""Utilidades para grabar demos de terminal en el VPS (usuario `csn`) con tmux: envían teclas, esperan a que aparezca un
texto y guardan la pantalla con sus colores ANSI en caps_raw/<nombre>.ansi; render_terminal.mjs la dibuja después.
Cada vídeo tiene su work/demo.py con los pasos (`from demo_tmux import *`) y la tabla PASOS. No lee ni escribe claves."""
import re, shlex, subprocess, sys, time
from pathlib import Path

HOST, SES, W, H = 'csn', 'csn', 120, 35
RAW = Path.cwd() / 'caps_raw'; RAW.mkdir(exist_ok=True)
PS1 = r'\[\e[1;32m\]csn@vps\[\e[0m\]:\[\e[1;34m\]\w\[\e[0m\]\$ '


def usar_local(prompt='mac'):
    """Para pasos que se graban en el Mac (p. ej. `gh` contra GitHub): el mismo tmux, en local y con otro prompt."""
    global HOST, PS1
    HOST = 'local'
    PS1 = r'\[\e[1;32m\]' + prompt + r'\[\e[0m\]:\[\e[1;34m\]\w\[\e[0m\]\$ '


def usar_remoto(host='csn', prompt='csn@vps'):
    """Vuelve al VPS (y a su prompt) después de usar_local()."""
    global HOST, PS1
    HOST = host
    PS1 = r'\[\e[1;32m\]' + prompt + r'\[\e[0m\]:\[\e[1;34m\]\w\[\e[0m\]\$ '


def ssh(cmd, check=True):
    args = ['bash', '-c', cmd] if HOST == 'local' else ['ssh', '-o', 'BatchMode=yes', HOST, cmd]
    r = subprocess.run(args, capture_output=True, text=True)
    if check and r.returncode: raise SystemExit(f'falló: {cmd}\n{r.stderr}')
    return r.stdout


def tmux(*args, check=True):
    return ssh('tmux ' + ' '.join(shlex.quote(a) for a in args), check)


def _shell():
    """Shell limpia de la sesión. En el VPS se añade ~/.local/bin al PATH; en el Mac no se toca (su PATH tiene carpetas
    con espacios y, al expandirlo en la línea de tmux, la shell no llega a arrancar)."""
    path = '' if HOST == 'local' else 'PATH=$HOME/.local/bin:$PATH '
    return f'env TERM=xterm-256color {path}PS1={shlex.quote(PS1)} bash --norc -i'


def nueva(ventana='main'):
    """Sesión tmux limpia de 120×35 con un prompt corto (sin el nombre de la máquina)."""
    tmux('kill-session', '-t', SES, check=False)
    ssh(f'tmux new-session -d -s {SES} -n {ventana} -x {W} -y {H} -c "$HOME" "{_shell()}"')
    tmux('set-option', '-t', SES, 'status', 'off'); tmux('set-option', '-t', SES, 'history-limit', '5000')
    time.sleep(0.6); limpiar(ventana)


def ventana(nombre):
    tmux('new-window', '-t', SES, '-n', nombre, _shell())
    time.sleep(0.6); limpiar(nombre)


def escribe(texto, enter=True, v='main', pausa=0.04):
    """Teclea como una persona (letra a letra no hace falta: tmux pega el texto literal)."""
    tmux('send-keys', '-t', f'{SES}:{v}', '-l', texto)
    if enter: time.sleep(0.15); tmux('send-keys', '-t', f'{SES}:{v}', 'Enter')
    time.sleep(pausa)


def tecla(*teclas, v='main'):
    tmux('send-keys', '-t', f'{SES}:{v}', *teclas); time.sleep(0.3)


def limpiar(v='main'):
    tecla('C-l', v=v); tmux('clear-history', '-t', f'{SES}:{v}'); time.sleep(0.3)


def pantalla(v='main', historia=False):
    a = ['capture-pane', '-p', '-e', '-t', f'{SES}:{v}'] + (['-S', '-'] if historia else [])
    return tmux(*a)


def espera(patron, v='main', seg=90, historia=False):
    """Espera a que la pantalla contenga `patron` (regex sobre el texto sin colores)."""
    t0 = time.time()
    while time.time() - t0 < seg:
        txt = re.sub(r'\x1b\[[0-9;:]*m', '', pantalla(v, historia))
        if re.search(patron, txt): return txt
        time.sleep(0.8)
    raise SystemExit(f'no apareció «{patron}» en {seg}s:\n' + txt[-1500:])


def guarda(nombre, v='main', historia=False):
    (RAW / f'{nombre}.ansi').write_text(pantalla(v, historia))
    print('  ✓', nombre)




def texto(v='main', historia=False):
    """La pantalla sin códigos de color."""
    return re.sub(r'\x1b\[[0-9;:]*m', '', pantalla(v, historia))


def espera_n(palabra, n, v='main', seg=120):
    """Espera a que `palabra` salga al menos n veces (p. ej. en la pregunta y en la respuesta)."""
    t0 = time.time()
    while time.time() - t0 < seg:
        if texto(v).count(palabra) >= n: return
        time.sleep(1)
    raise SystemExit(f'«{palabra}» no llegó a {n} apariciones:\n' + texto(v)[-1500:])


def espera_prompt(v='main', seg=60):
    """Espera a que la shell vuelva a estar libre (la última línea con texto es el prompt): así la siguiente orden no
    se teclea encima de la salida de la anterior."""
    t0 = time.time()
    while time.time() - t0 < seg:
        lineas = [l for l in texto(v).split('\n') if l.strip()]
        if lineas and re.search(r'\$\s*$', lineas[-1]): return
        time.sleep(0.5)
    raise SystemExit('la shell no volvió al prompt:\n' + texto(v)[-800:])


def ejecutar(pasos_definidos):
    """`python3 demo.py <paso>…` o `python3 demo.py todo`: ejecuta los pasos (funciones pNN) en orden."""
    pasos = list(pasos_definidos) if sys.argv[1:] == ['todo'] else sys.argv[1:]
    for p in pasos:
        print('paso', p); pasos_definidos[p]()
