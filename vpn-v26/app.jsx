// Fresh VPN — Telegram Mini App

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
  "radius": 22
}/*EDITMODE-END*/;

function VPNApp({ tweaks, initialTab = 'home', initialConnectOpen = false }) {
  const [tab, setTab] = useState(initialTab);

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

  const screens = {
    home:     <HomeScreen tweaks={tweaks}
                initialConnectOpen={initialConnectOpen}
                onOpenProfile={() => setTab('me')}
                onOpenPlans={() => setTab('plans')}
                onOpenInvite={() => setTab('invite')}
                onOpenInstall={() => setTab('install')}/>,
    plans:    <PlansScreen onBack={() => setTab('home')} accent={accent}/>,
    invite:   <InviteScreen onBack={() => setTab('home')} accent={accent}/>,
    install:  <InstallScreen onBack={() => setTab('home')} accent={accent}/>,
    bonus:    <BonusScreen onBack={() => setTab('home')} accent={accent}/>,
    me:       <ProfileScreen onBack={() => setTab('home')}
                onOpenPayments={() => setTab('payments')}
                accent={accent}/>,
    payments: <PaymentsScreen onBack={() => setTab('me')} accent={accent}/>,
  };

  // Sub-routes профиля показывают active=home в TabBar (профиль не в табах)
  const tabBarActive =
    (tab === 'me' || tab === 'payments') ? 'home' : tab;

  const layout = React.useContext(LayoutContext);
  const desktopClass = layout === 'desktop' ? 'desktop-mode' : '';

  return (
    <div className={`tg-app variant-sharp ${desktopClass} ${tweaks.theme === 'light' ? 'light' : ''}`}>
      {screens[tab]}
      <TabBar active={tabBarActive} onChange={setTab}/>
    </div>
  );
}

// ─── Phone-обёртка ───────────────────────────────────────────
function PhoneFrame({ tweaks, initialTab = 'home', label = 'Fresh VPN', initialConnectOpen }) {
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
          <VPNApp tweaks={tweaks} initialTab={initialTab} initialConnectOpen={initialConnectOpen}/>
        </div>
      </IOSDevice>
    </LayoutContext.Provider>
  );
}

// ─── Desktop-обёртка ─────────────────────────────────────────
// Имитирует окно Telegram Desktop (Win/Mac). Сам контейнер mini app центрируется
// через .tg-app.desktop-mode (max-width 560px) в styles.css.
function DesktopFrame({ tweaks, initialTab = 'home', label = 'Fresh VPN', initialConnectOpen, width = 760, height = 880 }) {
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
          <VPNApp tweaks={tweaks} initialTab={initialTab} initialConnectOpen={initialConnectOpen}/>
        </LayoutContext.Provider>
      </div>
    </div>
  );
}

// ─── Корневой компонент с canvas ─────────────────────────────
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  return (
    <main aria-label="Fresh VPN — design canvas">
      <DesignCanvas defaultZoom={0.42} background="#0a0a0c">

        <DCSection id="mobile" title="Mobile (iOS / Android)"
          description="Telegram mini app на телефоне. Sharp вариант — техничный, austere, тонкие линии, lime-акцент. Connect Sheet — bottom-pinned, primary CTA «Открыть в Happ» через happ:// deeplink.">
          <DCArtboard id="a-home" label="Главная" width={390} height={780}>
            <PhoneFrame tweaks={tweaks} initialTab="home"/>
          </DCArtboard>
          <DCArtboard id="a-plans" label="Тарифы" width={390} height={780}>
            <PhoneFrame tweaks={tweaks} initialTab="plans"/>
          </DCArtboard>
          <DCArtboard id="a-invite" label="Партнёрка" width={390} height={780}>
            <PhoneFrame tweaks={tweaks} initialTab="invite"/>
          </DCArtboard>
          <DCArtboard id="bonus" label="Бонусы" width={390} height={780}>
            <PhoneFrame tweaks={tweaks} initialTab="bonus"/>
          </DCArtboard>
          <DCArtboard id="profile" label="Профиль" width={390} height={780}>
            <PhoneFrame tweaks={tweaks} initialTab="me"/>
          </DCArtboard>
          <DCArtboard id="payments" label="История платежей" width={390} height={780}>
            <PhoneFrame tweaks={tweaks} initialTab="payments"/>
          </DCArtboard>
          <DCArtboard id="install" label="Инструкция Happ" width={390} height={780}>
            <PhoneFrame tweaks={tweaks} initialTab="install"/>
          </DCArtboard>
        </DCSection>

        <DCSection id="desktop-sharp" title="Telegram Desktop (Win / Mac)"
          description="Mini app в окне TG Desktop. Контейнер контента центрируется max-width 560px, по бокам — поля. Connect-sheet — floating modal с QR-кодом (happ:// на ПК не работает — нужен скан с телефона).">
          <DCArtboard id="desktop-home" label="Главная (открытый Sheet с QR)" width={760} height={880}>
            <DesktopFrame tweaks={tweaks} initialTab="home" initialConnectOpen={true}/>
          </DCArtboard>
          <DCArtboard id="desktop-profile" label="Профиль" width={760} height={880}>
            <DesktopFrame tweaks={tweaks} initialTab="me"/>
          </DCArtboard>
          <DCArtboard id="desktop-install" label="Инструкция Happ" width={760} height={880}>
            <DesktopFrame tweaks={tweaks} initialTab="install"/>
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
      </TweaksPanel>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
