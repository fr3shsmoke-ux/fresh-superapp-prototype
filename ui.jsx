// Общие UI-компоненты для всех скринов VPN

// Большая кнопка подключения с пульсом и состояниями
function ConnectOrb({ state = 'off', accent = '#E8B26A', shape = 'orb', onClick, size = 220 }) {
  // state: off | connecting | on
  const isOn = state === 'on';
  const isLoading = state === 'connecting';

  return (
    <button onClick={onClick} style={{
      width: size, height: size, borderRadius: '50%',
      border: 'none', background: 'transparent', cursor: 'pointer',
      position: 'relative', padding: 0,
      WebkitTapHighlightColor: 'transparent',
    }}>
      {/* Расходящиеся кольца — только в on */}
      {isOn && shape === 'orb' && [0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: `1.5px solid ${accent}`,
          animation: `orb-ring 2.4s ${i * 0.8}s infinite ease-out`,
          opacity: 0,
        }} />
      ))}

      {/* Внешнее кольцо */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        border: `1px solid ${isOn ? 'rgba(232,178,106,0.35)' : 'rgba(255,255,255,0.08)'}`,
        transition: 'all 0.4s',
      }} />

      {/* Главный круг */}
      <div style={{
        position: 'absolute', inset: 14, borderRadius: '50%',
        background: isOn
          ? `radial-gradient(circle at 30% 30%, ${accent}, #1F7A3A 75%)`
          : 'radial-gradient(circle at 30% 30%, #2a2a32, #15151a 70%)',
        boxShadow: isOn
          ? `0 0 60px ${accent}55, inset 0 0 40px rgba(0,0,0,0.4)`
          : 'inset 0 0 40px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.04)',
        animation: isOn ? 'orb-pulse 3.2s ease-in-out infinite' : 'none',
        transition: 'all 0.5s',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Иконка */}
        <div style={{
          color: isOn ? '#fff' : 'rgba(255,255,255,0.55)',
          transition: 'color 0.3s',
        }}>
          {isLoading ? (
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              border: `3px solid rgba(255,255,255,0.12)`,
              borderTopColor: accent,
              animation: 'spin 0.9s linear infinite',
            }} />
          ) : (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4v8M5.5 7.5a8 8 0 1 0 13 0"/>
            </svg>
          )}
        </div>
      </div>

      {/* Внутренний хайлайт */}
      <div style={{
        position: 'absolute', top: 22, left: 22, width: size * 0.4, height: size * 0.25,
        borderRadius: '50%',
        background: isOn
          ? 'radial-gradient(ellipse, rgba(255,255,255,0.4), transparent 70%)'
          : 'radial-gradient(ellipse, rgba(255,255,255,0.05), transparent 70%)',
        pointerEvents: 'none',
      }} />
    </button>
  );
}

// Шилд-вариант
function ConnectShield({ state, accent, onClick, size = 220 }) {
  const isOn = state === 'on';
  return (
    <button onClick={onClick} style={{
      width: size, height: size, border: 'none', background: 'transparent',
      cursor: 'pointer', padding: 0, position: 'relative',
    }}>
      <svg width={size} height={size} viewBox="0 0 220 220">
        <defs>
          <linearGradient id="shg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={isOn ? accent : '#2a2a32'}/>
            <stop offset="1" stopColor={isOn ? '#1F7A3A' : '#15151a'}/>
          </linearGradient>
        </defs>
        <path d="M110 18 L186 44 V112 C186 158 152 188 110 200 C68 188 34 158 34 112 V44 Z"
          fill="url(#shg)"
          stroke={isOn ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.06)'}
          strokeWidth="1"
          style={{ filter: isOn ? `drop-shadow(0 0 30px ${accent}88)` : 'none', transition: 'all 0.5s' }}
        />
        <g stroke={isOn ? '#fff' : 'rgba(255,255,255,0.4)'} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M85 108 L102 125 L138 88"/>
        </g>
      </svg>
      {isOn && (
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle, ${accent}33, transparent 60%)`,
          animation: 'orb-pulse 3s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
      )}
    </button>
  );
}

// Wave-вариант
function ConnectWaves({ state, accent, onClick, size = 220 }) {
  const isOn = state === 'on';
  return (
    <button onClick={onClick} style={{
      width: size, height: size, borderRadius: '50%',
      border: 'none', cursor: 'pointer', padding: 0, position: 'relative', overflow: 'hidden',
      background: isOn ? '#15151a' : '#15151a',
      boxShadow: isOn ? `0 0 50px ${accent}44, inset 0 0 0 1px ${accent}55` : 'inset 0 0 0 1px rgba(255,255,255,0.08)',
      transition: 'all 0.5s',
    }}>
      <svg width={size} height={size} viewBox="0 0 220 220" style={{ position: 'absolute', inset: 0 }}>
        {/* три волны */}
        {[0, 1, 2].map(i => (
          <path key={i}
            d={`M-220 ${110 + i * 4} Q -165 ${100 + i * 6} -110 ${110 + i * 4} T 0 ${110 + i * 4} T 110 ${110 + i * 4} T 220 ${110 + i * 4} T 330 ${110 + i * 4} T 440 ${110 + i * 4} V 220 H -220 Z`}
            fill={isOn ? `${accent}${i === 0 ? '55' : i === 1 ? '33' : '22'}` : `rgba(255,255,255,${i === 0 ? 0.05 : 0.03})`}
            style={{ animation: isOn ? `wave ${5 + i * 1.5}s linear infinite` : 'none' }}
          />
        ))}
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: isOn ? '#fff' : 'rgba(255,255,255,0.5)',
      }}>
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4v8M5.5 7.5a8 8 0 1 0 13 0"/>
        </svg>
      </div>
    </button>
  );
}

function ConnectVisual({ shape, state, accent, onClick, size }) {
  if (shape === 'shield') return <ConnectShield state={state} accent={accent} onClick={onClick} size={size}/>;
  if (shape === 'waves') return <ConnectWaves state={state} accent={accent} onClick={onClick} size={size}/>;
  return <ConnectOrb state={state} accent={accent} onClick={onClick} size={size} shape="orb"/>;
}

// Флаг — 2-буквенный код
function FlagBadge({ code, size = 36 }) {
  const palette = {
    NL: ['#AE1C28', '#fff', '#21468B'],
    DE: ['#000', '#DD0000', '#FFCE00'],
    US: ['#B22234', '#fff', '#3C3B6E'],
    JP: ['#fff', '#BC002D', '#fff'],
    SG: ['#EF3340', '#fff', '#fff'],
    GB: ['#012169', '#fff', '#C8102E'],
    SE: ['#006AA7', '#FECC02', '#006AA7'],
    CH: ['#D52B1E', '#fff', '#D52B1E'],
    TR: ['#E30A17', '#fff', '#E30A17'],
    AE: ['#00732F', '#fff', '#000'],
    AUTO: ['#25252D', '#E8B26A', '#25252D'],
  };
  const [a, b, c] = palette[code] || ['#333', '#555', '#777'];
  return (
    <div style={{
      width: size, height: size, borderRadius: 8, overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)',
      display: 'grid', gridTemplateRows: '1fr 1fr 1fr',
      flexShrink: 0,
    }}>
      <div style={{ background: a }}/>
      <div style={{ background: b }}/>
      <div style={{ background: c }}/>
    </div>
  );
}

function TabBar({ active = 'home', onChange = () => {} }) {
  // Phosphor Duotone дает более характерный визуал в таб-баре
  const tabs = [
    { id: 'home',    label: 'Главная',    icon: 'ph:lightning-duotone' },
    { id: 'install', label: 'Инструкция', icon: 'ph:book-open-duotone' },
    { id: 'plans',   label: 'Тариф',      icon: 'ph:crown-duotone' },
    { id: 'invite',  label: 'Друзья',     icon: 'ph:gift-duotone' },
    { id: 'bonus',   label: 'Бонусы',     icon: 'ph:star-duotone' },
  ];
  return (
    <div className="tabbar">
      {tabs.map(t => (
        <div key={t.id} className={`tab ${active === t.id ? 'active' : ''}`} onClick={() => onChange(t.id)}>
          <iconify-icon icon={t.icon} width="22" height="22" style={{ display: 'inline-flex' }}/>
          <span>{t.label}</span>
        </div>
      ))}
    </div>
  );
}

// Маленькая статистическая ячейка
function Stat({ label, value, unit, accent }) {
  return (
    <div style={{
      flex: 1, background: 'var(--bg-2)', borderRadius: 'var(--r-md)',
      padding: '12px 14px', border: '1px solid var(--line)',
    }}>
      <div style={{ fontSize: 10, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 500 }}>{label}</div>
      <div style={{ marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span className="mono" style={{ fontSize: 22, fontWeight: 600, color: accent || 'var(--fg)', letterSpacing: -0.5 }}>{value}</span>
        {unit && <span className="mono" style={{ fontSize: 11, color: 'var(--fg-dim)' }}>{unit}</span>}
      </div>
    </div>
  );
}

// Чип
function Chip({ children, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '7px 12px', borderRadius: 999,
      background: active ? 'var(--accent-soft)' : 'var(--bg-2)',
      color: active ? 'var(--accent-strong)' : 'var(--fg-mute)',
      border: `1px solid ${active ? 'var(--accent-line)' : 'var(--line)'}`,
      fontSize: 12, fontWeight: 500, fontFamily: 'inherit',
      whiteSpace: 'nowrap',
    }}>{children}</button>
  );
}

// Card-обёртка
function Card({ children, padding = 16, style = {} }) {
  return (
    <div style={{
      background: 'var(--bg-1)', borderRadius: 'var(--r-lg)',
      padding, border: '1px solid var(--line)',
      ...style,
    }}>{children}</div>
  );
}

// Способы оплаты — кликабельная сетка
function PaymentMethods({ accent }) {
  const [selected, setSelected] = React.useState('stars');

  const methods = [
    { id: 'stars', label: 'Telegram Stars', sub: 'мгновенно', icon: 'stars', tag: 'без комиссии' },
    { id: 'sbp',   label: 'СБП',            sub: 'банки РФ',   icon: 'sbp' },
    { id: 'card',  label: 'Карта',          sub: 'Visa / MIR',  icon: 'card' },
    { id: 'ton',   label: 'TON',            sub: 'крипта',      icon: 'ton' },
    { id: 'usdt',  label: 'USDT',           sub: 'TRC20 / TON', icon: 'usdt' },
    { id: 'sber',  label: 'СберPay',        sub: 'через банк',  icon: 'sber' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px 10px' }}>
        <div style={{ fontSize: 11, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 500 }}>
          Способ оплаты
        </div>
        <div style={{ fontSize: 11, color: 'var(--fg-mute)', fontWeight: 500 }}>
          {methods.find(m => m.id === selected)?.label}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {methods.map(m => {
          const sel = selected === m.id;
          return (
            <button key={m.id} onClick={() => setSelected(m.id)} style={{
              padding: '12px 10px 10px', borderRadius: 14,
              background: sel ? 'var(--accent-soft)' : 'var(--bg-1)',
              border: `1.5px solid ${sel ? 'var(--accent)' : 'var(--line)'}`,
              color: 'var(--fg)', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              position: 'relative', transition: 'all 0.18s ease',
              boxShadow: sel ? `0 4px 16px ${accent}22` : 'none',
            }}>
              {sel && (
                <div style={{
                  position: 'absolute', top: 6, right: 6,
                  width: 14, height: 14, borderRadius: 7, background: 'var(--accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <IconCheck size={9} stroke="#0E0E10"/>
                </div>
              )}
              {m.tag && !sel && (
                <div style={{
                  position: 'absolute', top: 6, right: 6,
                  fontSize: 8, padding: '1px 5px', borderRadius: 4,
                  background: 'var(--accent)', color: '#0E0E10',
                  fontWeight: 800, letterSpacing: 0.3, textTransform: 'uppercase',
                }}>0%</div>
              )}
              <PayIcon name={m.icon} active={sel} accent={accent}/>
              <div style={{ fontSize: 11, fontWeight: 700, marginTop: 2, color: sel ? 'var(--fg)' : 'var(--fg)' }}>{m.label}</div>
              <div style={{ fontSize: 9, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: 0.4 }}>{m.sub}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PayIcon({ name, active, accent }) {
  const bg = active ? `linear-gradient(135deg, ${accent}, #1F7A3A)` : 'var(--bg-3)';
  const fg = active ? '#0E0E10' : 'var(--fg)';
  const wrap = {
    width: 36, height: 36, borderRadius: 10, background: bg,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: fg, transition: 'all 0.2s',
  };
  switch (name) {
    case 'stars': return (
      <div style={wrap}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.4 6.4 6.6.5-5 4.5 1.6 6.6L12 16.7l-5.6 3.3 1.6-6.6L3 8.9l6.6-.5L12 2z"/>
        </svg>
      </div>
    );
    case 'sbp': return (
      <div style={wrap}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 8l8-5 8 5M4 8l8 5 8-5M4 8v8l8 5M20 8v8l-8 5"/>
        </svg>
      </div>
    );
    case 'card': return (
      <div style={wrap}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="13" rx="2"/><path d="M2 11h20M6 16h4"/>
        </svg>
      </div>
    );
    case 'ton': return (
      <div style={wrap}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 8l9 13 9-13H3zm3 1.5h4.5L12 18 6 9.5zm7.5 0H18L12 18l1.5-8.5z" opacity="0.95"/>
        </svg>
      </div>
    );
    case 'usdt': return (
      <div style={wrap}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 6h14M12 6v14M8 11c0 1.5 1.8 2.5 4 2.5s4-1 4-2.5"/>
        </svg>
      </div>
    );
    case 'sber': return (
      <div style={wrap}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 7a9 9 0 1 0 2 5"/><path d="M19 3l-7 7-2-2"/>
        </svg>
      </div>
    );
    default: return <div style={wrap}/>;
  }
}

// ─────────────────────────────────────────────────────────────
// Bottom-sheet Modal
// Используется для QR-ключа, оплаты, доп. инфо.
// Закрытие: оверлей, кнопка ✕, Escape.
// ─────────────────────────────────────────────────────────────
// Контекст layout — задаётся обёрткой (PhoneFrame=mobile, DesktopFrame=desktop).
// В production коде кодер заменит на window.matchMedia или WebApp.platform — здесь
// важно, чтобы в DesignCanvas-превью артборды показывались в своём режиме независимо
// от ширины окна браузера.
const LayoutContext = React.createContext('mobile');

function useIsDesktop() {
  return React.useContext(LayoutContext) === 'desktop';
}

function Sheet({ open, onClose, title, subtitle, children, maxHeight = '78%' }) {
  const isDesktop = useIsDesktop();

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose && onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.55)',
      backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: isDesktop ? 'center' : 'flex-end',
      justifyContent: 'center',
      padding: isDesktop ? 24 : 0,
      animation: 'sheet-fade 0.18s ease-out',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: '100%',
        maxWidth: isDesktop ? 460 : 'none',
        maxHeight: isDesktop ? '88%' : maxHeight,
        background: 'var(--bg-1)', color: 'var(--fg)',
        borderRadius: isDesktop ? 20 : '24px 24px 0 0',
        boxShadow: isDesktop ? '0 20px 60px rgba(0,0,0,0.5)' : '0 -10px 40px rgba(0,0,0,0.4)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        animation: isDesktop ? 'sheet-pop 0.22s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'sheet-up 0.22s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}>
        {/* Drag handle — только на мобильном (на ПК выглядит инородно) */}
        {!isDesktop && (
          <div style={{ padding: '10px 0 4px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--line-strong)' }}/>
          </div>
        )}
        {/* Header */}
        <div style={{ padding: isDesktop ? '18px 18px 14px' : '6px 18px 14px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            {title && <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3 }}>{title}</div>}
            {subtitle && <div style={{ fontSize: 12, color: 'var(--fg-mute)', marginTop: 3 }}>{subtitle}</div>}
          </div>
          <button onClick={onClose} aria-label="Закрыть" style={{
            width: 32, height: 32, borderRadius: 10, flexShrink: 0,
            background: 'var(--bg-2)', border: '1px solid var(--line)', color: 'var(--fg-mute)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M6 6l12 12M18 6l-12 12"/>
            </svg>
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 18px 18px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// QR-код через qrcode.react не подключён — рисуем через
// внешний api goqr.me как <img>. Альтернатива — open-source SVG-QR
// на чистом JS, но для дизайн-макета достаточно картинки.
// ─────────────────────────────────────────────────────────────
function QRImage({ value, size = 220 }) {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=0&data=${encodeURIComponent(value)}&bgcolor=ffffff&color=0E0E10`;
  return (
    <div style={{
      width: size + 24, height: size + 24, padding: 12,
      borderRadius: 18, background: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    }}>
      <img src={url} alt="QR" width={size} height={size} style={{ display: 'block' }}/>
    </div>
  );
}

// ─── Matrix-rain фон для тёмных вариантов (Sharp, Energetic) ───
// Trail-free вариант: каждая колонка держит «голову» + 2 призрака с быстрым затуханием.
// Каждый кадр canvas полностью очищается — никаких длинных хвостов.
function MatrixRain({ color = '#A8D63A', density = 0.7, speed = 1, opacity = 0.18 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext('2d');
    const fontSize = 11;            // меньше шрифт → больше колонок одновременно
    const colStep  = 11;            // расстояние между колонками по X
    // Нейтральные символы — точки/линии/блоки. БЕЗ "01"/"VPN"/японских, чтобы не выглядело как «вас взламывают».
    const chars = '·∙•∘░▒│┊';
    const TRAIL = 5;
    const TRAIL_ALPHAS = [1.0, 0.62, 0.38, 0.22, 0.11, 0.04];
    let cols = [];
    let raf;
    let last = 0;
    const fps = 22;

    const pickChar = () => chars[Math.floor(Math.random() * chars.length)];

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${fontSize}px JetBrains Mono, ui-monospace, monospace`;
      ctx.textBaseline = 'top';
      const colCount = Math.max(1, Math.floor(rect.width / colStep));
      cols = Array.from({ length: colCount }, (_, i) => ({
        x: i * colStep,
        y: -Math.random() * rect.height,
        v: (0.4 + Math.random() * 1.1) * speed,
        on: Math.random() < density,
        wait: Math.floor(Math.random() * 60),
        lastLine: null,            // отслеживаем номер строки для смены символа
        history: Array.from({ length: TRAIL + 1 }, () => ({ ch: pickChar() })),
      }));
    };
    resize();

    const draw = (ts) => {
      raf = requestAnimationFrame(draw);
      if (ts - last < 1000 / fps) return;
      last = ts;
      const rect = canvas.parentElement.getBoundingClientRect();
      // Полная очистка: никаких накопительных хвостов
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = color;
      cols.forEach(col => {
        if (!col.on) {
          col.wait--;
          if (col.wait <= 0) { col.on = true; col.y = -fontSize; }
          return;
        }
        col.y += col.v * fontSize;

        // символ меняется только когда колонка пересекает целую строку,
        // → скорость смены символа равна скорости падения, не fps
        const line = Math.floor(col.y / fontSize);
        if (line !== col.lastLine) {
          col.history.unshift({ ch: pickChar() });
          col.history.length = TRAIL + 1;
          col.lastLine = line;
        }

        for (let i = 0; i <= TRAIL; i++) {
          const yi = col.y - i * fontSize;
          if (yi < -fontSize || yi > rect.height + fontSize) continue;
          ctx.globalAlpha = opacity * TRAIL_ALPHAS[i];
          ctx.fillText(col.history[i].ch, col.x, yi);
        }

        if (col.y > rect.height + fontSize * (TRAIL + 2)) {
          col.on = Math.random() < density;
          col.y = -fontSize;
          col.wait = Math.floor(Math.random() * 25);
        }
      });
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [color, density, speed, opacity]);

  return (
    <canvas ref={ref} aria-hidden="true" style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      zIndex: 0, mixBlendMode: 'screen',
    }}/>
  );
}

// ─── Super-App Header (v3, redesigned 2026-05-16) ────────────────
// Layout: profile-icon (left) + Кристаллы chip (центр, clickable → магазин)
// + settings-icon (right). VPN дни — НЕ в header, только в табе VPN внутри content.
function SuperAppHeader({ crystals = 0, accent = '#B8E641', onOpenProfile, onOpenSettings, onOpenCrystalsStore }) {
  return (
    <div className="superapp-header">
      <button className="superapp-header-icon-btn" onClick={onOpenProfile} aria-label="Профиль">
        <iconify-icon icon="ph:user-circle-duotone" width="22" height="22" style={{ display: 'inline-flex', color: 'var(--fg-mute)' }}/>
      </button>
      <button className="crystals-chip crystals-chip-center" onClick={onOpenCrystalsStore}
        aria-label={`Баланс ${crystals} Кристаллов · купить ещё`}>
        <iconify-icon icon="ph:diamond-fill" width="15" height="15" style={{ display: 'inline-flex', color: accent }}/>
        <span className="crystals-chip-value mono">{crystals.toLocaleString('ru-RU')}</span>
        <iconify-icon icon="ph:plus-bold" width="11" height="11" style={{ display: 'inline-flex', color: 'var(--accent-strong)', marginLeft: 3 }}/>
      </button>
      <button className="superapp-header-icon-btn" onClick={onOpenSettings} aria-label="Настройки">
        <iconify-icon icon="ph:gear-six-duotone" width="22" height="22" style={{ display: 'inline-flex', color: 'var(--fg-mute)' }}/>
      </button>
    </div>
  );
}

// ─── XP Progress Bar (Royal Match trophy-bar pattern) ────────────
// Под header: progress bar текущий/целевой XP + reward-icon в конце.
// XP даётся за quests / mini-games. Reward — следующий level prize (бонус-дни VPN / Кристаллы / etc).
function XPProgressBar({ current = 0, target = 1000, rewardIcon = 'ph:gift-fill', rewardLabel = '+10 дн VPN', accent = '#B8E641' }) {
  const pct = Math.min(100, Math.round((current / target) * 100));
  return (
    <div className="xp-bar-wrap">
      <div className="xp-bar-track">
        <div className="xp-bar-fill" style={{ width: pct + '%', background: `linear-gradient(90deg, ${accent}, #C8F050)` }}/>
        <div className="xp-bar-label mono">{current.toLocaleString('ru-RU')} / {target.toLocaleString('ru-RU')} XP</div>
      </div>
      <button className="xp-bar-reward" aria-label={`Следующая награда: ${rewardLabel}`}
        title={rewardLabel}>
        <iconify-icon icon={rewardIcon} width="18" height="18" style={{ display: 'inline-flex', color: '#FFB85C' }}/>
      </button>
    </div>
  );
}

// ─── Side Ribbons (Royal Match-pattern, Sharp DNA visual) ────────
// 2 вертикальные колонки event-cards по бокам content area:
// слева — active activities (розыгрыш / игра недели / quest),
// справа — promos (Premium / Кристаллы pack / streak).
// Layout-pattern из Royal Match home screen, visual — austere Sharp
// (lime accent на dark, тонкие линии, без faux-3D/orange/yellow gradient).
// Каждый ribbon = SingleSideRibbon: иконка вверху + bold value + countdown/sub.
function SingleSideRibbon({ icon, gradient, glow, value, badge, onClick, side = 'left' }) {
  // Icon-only, без подписи (как в Royal Match). Уникальный gradient + glow на icon,
  // value (countdown / progress / amount) под иконкой компактно.
  const ribbonStyle = gradient
    ? { background: gradient, boxShadow: `0 4px 14px ${glow}55, 0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.2)`, borderColor: 'rgba(255,255,255,0.18)' }
    : {};
  return (
    <button onClick={onClick} className={`side-ribbon side-ribbon-${side} ${gradient ? 'side-ribbon-colored' : ''}`}
      style={ribbonStyle}>
      {badge && <span className="side-ribbon-badge">{badge}</span>}
      <div className="side-ribbon-icon-bg">
        <iconify-icon icon={icon} width="22" height="22" style={{ display: 'inline-flex', color: '#FFFFFF', filter: `drop-shadow(0 1px 2px rgba(0,0,0,0.4))` }}/>
      </div>
      <div className="side-ribbon-value mono">{value}</div>
    </button>
  );
}

function SideRibbons({ side = 'left', items = [] }) {
  if (!items.length) return null;
  return (
    <div className={`side-ribbons side-ribbons-${side}`}>
      {items.map((it, i) => (
        <SingleSideRibbon key={i} side={side} {...it}/>
      ))}
    </div>
  );
}

// ─── Wheel of Fortune (Этап 0 game home focal point) ────────────
// 8 секторов, Sharp DNA palette (dark + lime accents), SVG-based с CSS rotate animation.
// Анти-паттерны учтены (research 2026-05-16): 8 не 16+ секторов, visible weighting, no fake near-miss,
// reduced-motion respect, haptic ready hook. Spin button круглый по центру (canonical pattern).
// Pointer top-center тонкий lime triangle. Ornate frame — thin lime ring + tick marks (НЕ baroque gold).
function WheelOfFortune({ size = 260, accent = '#B8E641', onResult }) {
  const sectors = [
    { label: '50',    sub: 'Кр',  tier: 'common' },
    { label: '200',   sub: 'Кр',  tier: 'common' },
    { label: '+3',    sub: 'дн',  tier: 'common' },
    { label: '1000',  sub: 'Кр',  tier: 'epic'   },
    { label: '50',    sub: 'Кр',  tier: 'common' },
    { label: '7д',    sub: 'PRO', tier: 'epic'   },
    { label: '200',   sub: 'Кр',  tier: 'common' },
    { label: 'JKPT',  sub: '5к',  tier: 'rare'   },
  ];
  const [rotation, setRotation] = React.useState(0);
  const [spinning, setSpinning] = React.useState(false);
  const [resultIdx, setResultIdx] = React.useState(null);

  const N = sectors.length;
  const arc = 360 / N;  // 45° per sector
  const R = size / 2;
  const inner = R * 0.30;  // inner радиус (под spin button)

  const tierFill = (tier, hovered = false) => {
    if (tier === 'rare')   return `url(#sg-rare)`;
    if (tier === 'epic')   return `url(#sg-epic)`;
    return hovered ? '#1C1C22' : '#15151A';
  };
  const tierStroke = (tier) => {
    if (tier === 'rare')   return accent;
    if (tier === 'epic')   return accent;
    return 'rgba(184, 230, 65, 0.18)';
  };
  const tierText = (tier) => {
    if (tier === 'rare')   return '#0E0E10';
    if (tier === 'epic')   return '#0E0E10';
    return '#F5F4EF';
  };

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setResultIdx(null);
    // Weighted random — rare 5%, epic 15%, common 80%
    const r = Math.random();
    let idx;
    if (r < 0.05) idx = 7;               // JKPT rare
    else if (r < 0.20) idx = (r < 0.125) ? 3 : 5;  // epic — 1000 Кр / Premium 7д
    else idx = [0, 1, 2, 4, 6][Math.floor(Math.random() * 5)];

    // Целевая rotation: 5 полных + landing на середине sector idx
    // Pointer вверху (12 o'clock), значит выпавший sector должен оказаться на 12 o'clock
    // Sectors начинаются с 0° (12 o'clock) против часовой
    const target = 360 * 5 + (360 - idx * arc - arc / 2);
    setRotation(prev => prev + target);

    // Haptic — Telegram WebApp API placeholder для production
    if (window.Telegram?.WebApp?.HapticFeedback?.impactOccurred) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }

    setTimeout(() => {
      setSpinning(false);
      setResultIdx(idx);
      if (onResult) onResult(sectors[idx]);
      if (window.toast) window.toast(`Выиграно: ${sectors[idx].label} ${sectors[idx].sub}`);
    }, 4500);
  };

  const wedges = sectors.map((s, i) => {
    const a1 = (i * arc - 90) * Math.PI / 180;          // start angle (12 o'clock=0)
    const a2 = ((i + 1) * arc - 90) * Math.PI / 180;    // end angle
    const x1 = R + R * Math.cos(a1);
    const y1 = R + R * Math.sin(a1);
    const x2 = R + R * Math.cos(a2);
    const y2 = R + R * Math.sin(a2);
    const isWinner = !spinning && resultIdx === i;
    const midA = (i * arc + arc / 2 - 90) * Math.PI / 180;
    const textR = R * 0.65;
    const tx = R + textR * Math.cos(midA);
    const ty = R + textR * Math.sin(midA);
    const rotDeg = i * arc + arc / 2;  // rotate text along radial axis
    return (
      <g key={i}>
        <path d={`M ${R} ${R} L ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2} Z`}
          fill={tierFill(s.tier)} stroke={tierStroke(s.tier)} strokeWidth={isWinner ? 2.5 : 1}
          style={{
            filter: isWinner ? `drop-shadow(0 0 12px ${accent})` : 'none',
            transition: 'filter 0.3s ease',
          }}/>
        <g transform={`translate(${tx} ${ty}) rotate(${rotDeg})`}>
          <text x={0} y={-4} textAnchor="middle" fill={tierText(s.tier)}
            fontFamily="JetBrains Mono, ui-monospace, monospace"
            fontSize={s.tier === 'rare' ? '13' : '12'} fontWeight="700">{s.label}</text>
          <text x={0} y={9} textAnchor="middle" fill={s.tier === 'common' ? 'rgba(245,244,239,0.55)' : 'rgba(14,14,16,0.65)'}
            fontFamily="Inter, sans-serif"
            fontSize="8" fontWeight="600" letterSpacing="0.3">{s.sub}</text>
        </g>
      </g>
    );
  });

  return (
    <div className="wheel-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
        className="wheel-svg" style={{ transform: `rotate(${rotation}deg)`, transition: spinning ? 'transform 4.5s cubic-bezier(0.17, 0.67, 0.21, 1.0)' : 'none' }}>
        <defs>
          <linearGradient id="sg-epic" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={accent}/>
            <stop offset="1" stopColor="#7AB025"/>
          </linearGradient>
          <radialGradient id="sg-rare">
            <stop offset="0" stopColor="#FFFFFF"/>
            <stop offset="0.4" stopColor={accent}/>
            <stop offset="1" stopColor="#7AB025"/>
          </radialGradient>
          <radialGradient id="sg-bg">
            <stop offset="0" stopColor="#1F7A3A" stopOpacity="0.15"/>
            <stop offset="1" stopColor="#000000" stopOpacity="0"/>
          </radialGradient>
        </defs>
        {/* Outer dark ring + lime tick-marks */}
        <circle cx={R} cy={R} r={R - 1} fill="url(#sg-bg)"/>
        {wedges}
        {/* Inner circle (под Spin button) */}
        <circle cx={R} cy={R} r={inner} fill="#0E0E10" stroke={accent} strokeWidth="1.5"/>
        {/* Outer thin lime ring */}
        <circle cx={R} cy={R} r={R - 1} fill="none" stroke={accent} strokeWidth="1.5" opacity="0.6"/>
      </svg>
      {/* Top pointer — тонкий lime triangle, drop-shadow */}
      <div className="wheel-pointer" style={{ borderTopColor: accent }} aria-hidden="true"/>
      {/* Spin button — круглый по центру, lime fill */}
      <button onClick={handleSpin} disabled={spinning} className="wheel-spin-btn" style={{
        background: spinning ? 'rgba(184, 230, 65, 0.3)' : accent,
        color: '#0E0E10',
        boxShadow: spinning ? 'none' : `0 0 24px ${accent}88, inset 0 -2px 4px rgba(0,0,0,0.25), inset 0 2px 4px rgba(255,255,255,0.4)`,
      }}>
        {spinning ? (
          <iconify-icon icon="ph:hourglass-medium-fill" width="22" height="22" style={{ display: 'inline-flex', animation: 'spin 1s linear infinite' }}/>
        ) : (
          <span>SPIN</span>
        )}
      </button>
    </div>
  );
}

// ─── LottieIcon — Lottie .json animated icons (v31, 2026-05-19) ──
// Wraps lottie-web. Loads ./assets/lottie/<name>.json лениво.
// Works on Netlify HTTP, не работает через file:// (CORS) — для design-handoff приемлемо.
function LottieIcon({ name, width = 64, height = 64, loop = true, autoplay = true, className, style, onClick }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || typeof window.lottie === 'undefined') return;
    const anim = window.lottie.loadAnimation({
      container: ref.current,
      renderer: 'svg',
      loop,
      autoplay,
      path: `./assets/lottie/${name}.json`,
    });
    return () => { try { anim.destroy(); } catch (e) {} };
  }, [name, loop, autoplay]);
  return <div ref={ref} className={className} onClick={onClick} style={{ width, height, display: 'inline-block', ...style }} aria-label={name}/>;
}

// ─── Module TabBar — root navigation 5 пунктов (v3, 2026-05-16) ──
// «Главная» — центральный таб (game home с wheel of fortune + mini-games),
// visually larger (как у Notcoin/Royal Match central CTA).
function ModuleTabBar({ active = 'main', onChange = () => {} }) {
  const tabs = [
    { id: 'lottery', label: 'Розыгрыши', iconImg: './assets/icons/tab-lottery-gift-trans-512.png' },
    { id: 'tasks',   label: 'Задания',   iconImg: './assets/icons/tab-tasks-target-trans-512.png' },
    { id: 'main',    label: 'Главная',   iconImg: './assets/icons/tab-main-crystal-trans-512.png', primary: true },
    { id: 'news',    label: 'Новости',   iconImg: './assets/icons/tab-news-tv-trans-512.png' },
    { id: 'vpn',     label: 'VPN',       iconImg: './assets/icons/tab-vpn-shield-trans-512.png' },
  ];
  return (
    <div className="tabbar tabbar-5">
      {tabs.map(t => (
        <div key={t.id} className={`tab ${active === t.id ? 'active' : ''} ${t.primary ? 'tab-primary' : ''}`} onClick={() => onChange(t.id)}>
          <img src={t.iconImg} alt={t.label} className="tab-icon-img" style={{ width: t.primary ? 44 : 36, height: t.primary ? 44 : 36 }}/>
          <span>{t.label}</span>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, {
  ConnectOrb, ConnectShield, ConnectWaves, ConnectVisual,
  FlagBadge, TabBar, Stat, Chip, Card, PaymentMethods,
  Sheet, QRImage, MatrixRain,
  SuperAppHeader, ModuleTabBar, SideRibbons, SingleSideRibbon, XPProgressBar,
  LottieIcon,
});
