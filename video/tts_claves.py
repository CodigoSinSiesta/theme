# Orden de claves para la voz: primero la gratuita (GEMINI_API_KEY_FREE) y, cuando falla o se agota, la de pago
# (GEMINI_API_KEY) para todo lo que queda. Las claves solo se leen del entorno; nunca se escriben en ficheros.
import os, re, subprocess, threading, time

_lock = threading.Lock()
LIMITE = 300   # segundos por petición
_gratis_fuera = False


def _claves():
    out = []
    if os.environ.get('GEMINI_API_KEY_FREE') and not _gratis_fuera: out.append(('gratis', os.environ['GEMINI_API_KEY_FREE']))
    if os.environ.get('GEMINI_API_KEY'): out.append(('pago', os.environ['GEMINI_API_KEY']))
    return out


def generar(cmd):
    """Ejecuta el script de locución con la primera clave que funcione. Devuelve (resultado, 'gratis'|'pago'|None)."""
    global _gratis_fuera
    r = None
    for nombre, clave in _claves():
        env = {**os.environ, 'GEMINI_API_KEY': clave}; env.pop('GOOGLE_API_KEY', None)
        for _ in range(6):   # un límite por minuto se espera y se reintenta con la misma clave
            try:   # una petición colgada no debe parar el lote: pasado el límite cuenta como fallo
                r = subprocess.run(cmd, capture_output=True, text=True, env=env, timeout=LIMITE)
            except subprocess.TimeoutExpired:
                r = subprocess.CompletedProcess(cmd, 124, '', f'sin respuesta en {LIMITE} s')
            m = re.search(r'per minute.*?retry in (\d+)s', r.stderr or '')
            if r.returncode == 0 or not m: break
            time.sleep(int(m.group(1)) + 2)
        if r.returncode == 0: return r, nombre
        if nombre == 'gratis':
            with _lock:
                if not _gratis_fuera: print('clave gratuita sin servicio (' + r.stderr.strip()[-160:] + '): se sigue con la de pago', flush=True)
                _gratis_fuera = True
    return r, None
