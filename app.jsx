// Фрэш Super-App — Telegram Mini App (multi-module: VPN + Lottery + Feed + Profile)

const { useState, useEffect } = React;

// Простой toast-фидбек для кликов по кнопкам.
// Также копирует строку в буфер обмена, если передан второй аргумент `copyText`.
window.toast = function toast(msg, copyText) {
  if (copyText && navigator.clipboard) {
    navigator.clipboard.writeText(copyText).catch(() => {});
  }
  let host = document.getElementById('fresh-toast-host');
  if (!host) {
    host = document.createElement('div');
    host.id = 'fresh-toast-host';
    document.body.appendChild(host);
  }
  const el = document.createElement('div');
  el.className = 'fresh-toast';
  el.textContent = msg;
  host.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 250);
  }, 1700);
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#B8E641",
  "theme": "dark",
  "radius": 22,
  "crystals": 1240,
  "vpnDays": 12,
  "xpCurrent": 320,
  "xpTarget": 500,
  "adminMode": false
}/*EDITMODE-END*/;

// ─── VPN-модуль ─────────────────────────────────────────────────
// Внутренний sub-router VPN (home / plans / install / invite / bonus / me / payments).
// Навигация — через push/back callbacks из HomeScreen, без собственного TabBar
// (root navigation теперь делает SuperAppShell).
function VPNModule({ tweaks, initialConnectOpen = false }) {
  const [sub, setSub] = useState('home');

  const accent = tweaks.accent;

  const screens = {
    home:     <HomeScreen tweaks={tweaks}
                initialConnectOpen={initialConnectOpen}
                onOpenProfile={() => setSub('me')}
                onOpenPlans={() => setSub('plans')}
                onOpenInvite={() => setSub('invite')}
                onOpenInstall={() => setSub('install')}/>,
    plans:    <PlansScreen onBack={() => setSub('home')} accent={accent}/>,
    invite:   <InviteScreen onBack={() => setSub('home')} accent={accent}/>,
    install:  <InstallScreen onBack={() => setSub('home')} accent={accent}/>,
    bonus:    <BonusScreen onBack={() => setSub('home')} accent={accent}/>,
    me:       <ProfileScreen onBack={() => setSub('home')}
                onOpenPayments={() => setSub('payments')}
                accent={accent}/>,
    payments: <PaymentsScreen onBack={() => setSub('me')} accent={accent}/>,
  };

  return <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>{screens[sub]}</div>;
}

// ─── Super-App Shell (v3, 2026-05-16) ───────────────────────────
// 5-tab navigation: Розыгрыши / Задания / Главная (центр) / Новости / VPN.
// Header: profile-icon (L) + Кристаллы chip (центр) + settings-icon (R).
// Profile/Settings — push-routes из header (не в TabBar).
// Главная = game home (XP bar + wheel of fortune + side ribbons mini-games).
function SuperAppShell({ tweaks, initialModule = 'main', initialConnectOpen = false }) {
  const [module, setModule] = useState(initialModule);
  const [overlay, setOverlay] = useState(null); // 'profile' | 'settings' | null
  // Розыгрыши, запущенные через мастер. Живут на уровне Shell — переживают смену вкладок.
  // Стартовый демо-розыгрыш (наполненная статистика) — пример экрана организатора.
  const [myLotteries, setMyLotteries] = useState(() => [DEMO_MY_LOTTERY]);
  const crystals = tweaks.crystals;
  const vpnDays = tweaks.vpnDays;
  const xpCurrent = tweaks.xpCurrent;
  const xpTarget = tweaks.xpTarget;
  const isAdmin = tweaks.adminMode === true;

  const accent = tweaks.accent;

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', tweaks.accent);
    document.documentElement.style.setProperty('--accent-strong', tweaks.accent);
    document.documentElement.style.setProperty('--accent-deep', '#1F7A3A');
    document.documentElement.style.setProperty('--accent-soft', tweaks.accent + '28');
    document.documentElement.style.setProperty('--accent-line', tweaks.accent + '5C');
    document.documentElement.style.setProperty('--r-lg', tweaks.radius + 'px');
    document.documentElement.style.setProperty('--r-xl', (tweaks.radius + 6) + 'px');
  }, [tweaks.accent, tweaks.radius]);

  const modules = {
    main:    <MainHomeScreen accent={accent} xpCurrent={xpCurrent} xpTarget={xpTarget}/>,
    lottery: <LotteryStubScreen accent={accent} myLotteries={myLotteries} setMyLotteries={setMyLotteries}/>,
    tasks:   <TasksStubScreen accent={accent}/>,
    news:    <FeedStubScreen accent={accent}/>,
    vpn:     <VPNModule tweaks={tweaks} initialConnectOpen={initialConnectOpen}/>,
  };

  // Side ribbons — в основном mini-games (Founder: «слева/справа сбоку от центра иконки разных событий
  // (мини-игры в основном)»). Только на «Главной» — на других табах скрыты, content full-width.
  const showRibbons = module === 'main';
  const leftRibbons = [
    { icon: 'ph:circle-half-tilt-fill',  value: 'Кубик', gradient: 'linear-gradient(160deg, #B8E641, #1F7A3A)',  glow: '#B8E641', onClick: () => window.toast && window.toast('Слайд-Куб — Этап 2') },
    { icon: 'ph:game-controller-fill',   value: 'Поезд', gradient: 'linear-gradient(160deg, #5BA8FF, #1E5BB5)', glow: '#5BA8FF', badge: 'NEW', onClick: () => window.toast && window.toast('Путешествие на поезде — Этап 2') },
    { icon: 'ph:music-notes-fill',       value: 'Рифм',  gradient: 'linear-gradient(160deg, #C77AFF, #6B2BB8)', glow: '#C77AFF', onClick: () => window.toast && window.toast('Лайм-Рифм — Этап 2') },
  ];
  const rightRibbons = [
    { icon: 'ph:gift-fill',              value: 'LIVE',  badge: '3д',   gradient: 'linear-gradient(160deg, #FF6B6B, #B73030)', glow: '#FF6B6B', onClick: () => { setModule('lottery'); window.toast && window.toast('Розыгрыш @spotify'); } },
    { icon: 'ph:question-fill',          value: 'Quiz',  gradient: 'linear-gradient(160deg, #FFB85C, #C77A1F)', glow: '#FFB85C', onClick: () => window.toast && window.toast('Угадай-Источник — Этап 2') },
    { icon: 'ph:flame-fill',             value: '7',     gradient: 'linear-gradient(160deg, #5BE2D6, #1A8A82)', glow: '#5BE2D6', onClick: () => window.toast && window.toast('Streak +1 день') },
  ];

  const layout = React.useContext(LayoutContext);
  const desktopClass = layout === 'desktop' ? 'desktop-mode' : '';

  return (
    <div className={`tg-app variant-sharp ${desktopClass} ${tweaks.theme === 'light' ? 'light' : ''}`}>
      <SuperAppHeader crystals={crystals} accent={accent}
        onOpenProfile={() => setOverlay('profile')}
        onOpenSettings={() => setOverlay('settings')}
        onOpenCrystalsStore={() => window.toast && window.toast('Магазин Кристаллов — Этап 2')}/>
      {/* XP progress bar — только на «Главной» (Royal Match trophy-bar pattern) */}
      {module === 'main' && (
        <XPProgressBar current={xpCurrent} target={xpTarget} rewardIcon="ph:gift-fill" rewardLabel="+10 дней VPN на уровне 8" accent={accent}/>
      )}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {showRibbons && <SideRibbons side="left" items={leftRibbons}/>}
        <div style={{ position: 'absolute', inset: 0, marginLeft: showRibbons ? 44 : 0, marginRight: showRibbons ? 44 : 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {modules[module]}
        </div>
        {showRibbons && <SideRibbons side="right" items={rightRibbons}/>}
      </div>
      <ModuleTabBar active={module} onChange={setModule}/>
      {/* Profile / Settings overlay sheets */}
      <Sheet open={overlay === 'profile'} onClose={() => setOverlay(null)} title="Профиль" subtitle="@alexsmith · уровень 7">
        <MeSuperAppScreen accent={accent} crystals={crystals} vpnDays={vpnDays} isAdmin={isAdmin} embedded/>
      </Sheet>
      <Sheet open={overlay === 'settings'} onClose={() => setOverlay(null)} title="Настройки">
        <div style={{ padding: '4px 0 12px', color: 'var(--fg-mute)', fontSize: 13, lineHeight: 1.5 }}>
          Уведомления · приватность · язык · тема · admin (если admin user_id) — Этап 5 spec.
        </div>
      </Sheet>
    </div>
  );
}

// ─── Phone-обёртка ───────────────────────────────────────────
function PhoneFrame({ tweaks, initialModule = 'main', label = 'Фрэш', initialConnectOpen }) {
  return (
    <LayoutContext.Provider value="mobile">
      <IOSDevice width={390} height={780} dark={tweaks.theme !== 'light'}>
        <div style={{ height: '100%', paddingTop: 50, display: 'flex', flexDirection: 'column' }}>
          {/* Telegram WebApp header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '6px 16px 8px', flexShrink: 0,
            background: tweaks.theme === 'light' ? '#fff' : '#0E0E10',
            borderBottom: `1px solid ${tweaks.theme === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)'}`,
          }}>
            <div style={{ fontSize: 13, color: tweaks.theme === 'light' ? '#999' : 'rgba(255,255,255,0.5)' }}>‹ Назад</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: tweaks.theme === 'light' ? '#000' : '#fff' }}>{label}</div>
            <div style={{ fontSize: 13, color: tweaks.theme === 'light' ? '#999' : 'rgba(255,255,255,0.5)' }}>···</div>
          </div>
          <SuperAppShell tweaks={tweaks} initialModule={initialModule} initialConnectOpen={initialConnectOpen}/>
        </div>
      </IOSDevice>
    </LayoutContext.Provider>
  );
}

// ─── Desktop-обёртка ─────────────────────────────────────────
// Имитирует окно Telegram Desktop (Win/Mac). Сам контейнер mini app центрируется
// через .tg-app.desktop-mode (max-width 560px) в styles.css.
function DesktopFrame({ tweaks, initialModule = 'vpn', label = 'Фрэш', initialConnectOpen, width = 760, height = 880 }) {
  const dark = tweaks.theme !== 'light';
  const chrome = dark ? '#17212B' : '#F4F4F5';
  const chromeText = dark ? 'rgba(255,255,255,0.85)' : '#15151A';
  const chromeMute = dark ? 'rgba(255,255,255,0.5)' : 'rgba(21,21,26,0.5)';
  return (
    <div style={{
      width, height, borderRadius: 12, overflow: 'hidden',
      background: dark ? '#0E0E10' : '#fff',
      boxShadow: '0 30px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.25)',
      display: 'flex', flexDirection: 'column',
      fontFamily: '-apple-system, system-ui, "Segoe UI", sans-serif',
    }}>
      {/* Title bar (имитация frame окна) */}
      <div style={{
        height: 32, flexShrink: 0,
        background: chrome, borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 12px',
      }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: '#FF5F57' }}/>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: '#FEBC2E' }}/>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: '#28C840' }}/>
        </div>
        <div style={{ fontSize: 12, fontWeight: 500, color: chromeText }}>
          Telegram Desktop · {label}
        </div>
        <div style={{ fontSize: 11, color: chromeMute }}>×</div>
      </div>
      {/* TG WebApp top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 18px', flexShrink: 0,
        background: dark ? '#17212B' : '#fff',
        borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      }}>
        <div style={{ fontSize: 13, color: chromeMute }}>‹ Закрыть</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: chromeText }}>{label}</div>
        <div style={{ fontSize: 13, color: chromeMute }}>···</div>
      </div>
      {/* Mini app */}
      <div style={{ flex: 1, overflow: 'hidden', background: dark ? '#0E0E10' : '#fff', display: 'flex' }}>
        <LayoutContext.Provider value="desktop">
          <SuperAppShell tweaks={tweaks} initialModule={initialModule} initialConnectOpen={initialConnectOpen}/>
        </LayoutContext.Provider>
      </div>
    </div>
  );
}

// ─── Корневой компонент с canvas ─────────────────────────────
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  return (
    <main aria-label="Фрэш Super-App — design canvas">
      <DesignCanvas defaultZoom={0.42} background="#0a0a0c">

        <DCSection id="row1-vpn" title="Ряд 1 — VPN v2.6 (исходный, сегодняшний)"
          description="Сегодняшний design handoff VPN v2.6 — отдан кодеру, live на fresh-vpn-design-handoff.netlify.app. Все экраны: Главная (Connect+Hero) / Тарифы / Инструкция Happ / Партнёрка / Бонусы / Профиль / История платежей + Connect Sheet (mobile happ:// и desktop QR). Полный DesignCanvas внутри iframe — можно листать внутри.">
          <DCArtboard id="vpn-original-canvas" label="VPN v2.6 — весь дизайн (iframe со scroll)" width={1100} height={900}>
            <div style={{ width: 1100, height: 900, borderRadius: 18, overflow: 'hidden', background: '#0a0a0c' }}>
              <iframe src="/vpn-v26/" width="1100" height="900" style={{ border: 'none', display: 'block' }} title="VPN v2.6 original handoff"/>
            </div>
          </DCArtboard>
        </DCSection>

        <DCSection id="row2-superapp" title="Ряд 2 — Фрэш Super-App v3 (новый, что собрали сегодня)"
          description="Новый super-app — 5-tab TabBar (Розыгрыши / Задания / Главная / Новости / VPN), header v3 (profile + Кристаллы chip + settings), XP progress bar, wheel of fortune по центру Главной, side ribbons mini-games (Sharp DNA + Royal Match colorful gradients), Tasks-tab с 4 mini-games + quests, profile/settings через overlay sheets.">
          <DCArtboard id="m-main" label="Главная (wheel of fortune + ribbons)" width={390} height={780}>
            <PhoneFrame tweaks={tweaks} initialModule="main"/>
          </DCArtboard>
          description="Telegram mini app на телефоне. Header: profile (L) + Кристаллы chip (центр, clickable→магазин) + settings (R). Под header — XP progress bar только на Главной. Bottom TabBar 5 пунктов: Розыгрыши / Задания / Главная (primary, центр) / Новости / VPN. Главная = wheel of fortune + side ribbons mini-games (Sharp DNA + Royal Match colorful gradients).">
          <DCArtboard id="m-main" label="Главная (wheel of fortune + ribbons)" width={390} height={780}>
            <PhoneFrame tweaks={tweaks} initialModule="main"/>
          </DCArtboard>
          <DCArtboard id="m-lottery" label="Розыгрыши (заглушка Этап 1)" width={390} height={780}>
            <PhoneFrame tweaks={tweaks} initialModule="lottery"/>
          </DCArtboard>
          <DCArtboard id="m-tasks" label="Задания + мини-игры (заглушка Этап 2)" width={390} height={780}>
            <PhoneFrame tweaks={tweaks} initialModule="tasks"/>
          </DCArtboard>
          <DCArtboard id="m-news" label="Новости (заглушка Этап 3)" width={390} height={780}>
            <PhoneFrame tweaks={tweaks} initialModule="news"/>
          </DCArtboard>
          <DCArtboard id="m-vpn" label="VPN" width={390} height={780}>
            <PhoneFrame tweaks={tweaks} initialModule="vpn"/>
          </DCArtboard>
          <DCArtboard id="m-vpn-connect" label="VPN Connect Sheet (mobile=happ://)" width={390} height={780}>
            <PhoneFrame tweaks={tweaks} initialModule="vpn" initialConnectOpen={true}/>
          </DCArtboard>
        </DCSection>

        <DCSection id="desktop" title="Telegram Desktop (Win / Mac)"
          description="Mini app в окне TG Desktop. Контейнер центрируется max-width 560px через `.tg-app.desktop-mode` (LayoutContext='desktop'). Sheets — floating modal, не bottom-pinned.">
          <DCArtboard id="d-main" label="Главная" width={760} height={880}>
            <DesktopFrame tweaks={tweaks} initialModule="main"/>
          </DCArtboard>
          <DCArtboard id="d-lottery" label="Розыгрыши" width={760} height={880}>
            <DesktopFrame tweaks={tweaks} initialModule="lottery"/>
          </DCArtboard>
          <DCArtboard id="d-tasks" label="Задания" width={760} height={880}>
            <DesktopFrame tweaks={tweaks} initialModule="tasks"/>
          </DCArtboard>
          <DCArtboard id="d-vpn" label="VPN" width={760} height={880}>
            <DesktopFrame tweaks={tweaks} initialModule="vpn"/>
          </DCArtboard>
        </DCSection>

      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Внешний вид">
          <TweakColor label="Акцент" value={tweaks.accent}
            onChange={(v) => setTweak('accent', v)}/>
          <TweakRadio label="Тема" value={tweaks.theme}
            options={[{value: 'dark', label: 'Тёмная'}, {value: 'light', label: 'Светлая'}]}
            onChange={(v) => setTweak('theme', v)}/>
          <TweakSlider label="Радиус" value={tweaks.radius} min={8} max={32} step={1}
            onChange={(v) => setTweak('radius', v)}/>
        </TweakSection>
        <TweakSection title="Super-App state">
          <TweakSlider label="Кристаллы" value={tweaks.crystals} min={0} max={9999} step={10}
            onChange={(v) => setTweak('crystals', v)}/>
          <TweakSlider label="Дни VPN" value={tweaks.vpnDays} min={0} max={365} step={1}
            onChange={(v) => setTweak('vpnDays', v)}/>
          <TweakRadio label="Admin режим" value={tweaks.adminMode ? 'on' : 'off'}
            options={[{value: 'off', label: 'Юзер'}, {value: 'on', label: 'Админ'}]}
            onChange={(v) => setTweak('adminMode', v === 'on')}/>
        </TweakSection>
      </TweaksPanel>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
