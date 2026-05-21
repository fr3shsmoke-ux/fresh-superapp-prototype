// ─── Инструкция ───────────────────────────────────────────────
function InstallScreen({ onBack, accent }) {
  const [platform, setPlatform] = React.useState('ios');
  const [openFaq, setOpenFaq] = React.useState(null);

  const platforms = [
    { id: 'ios',     label: 'iPhone',   icon: <IconPhone size={18}/> },
    { id: 'android', label: 'Android',  icon: <IconPhone size={18}/> },
    { id: 'mac',     label: 'Mac',      icon: <IconLaptop size={18}/> },
    { id: 'win',     label: 'Windows',  icon: <IconLaptop size={18}/> },
  ];

  // Реальные ссылки и шаги по официальной документации happ.su
  const guides = {
    ios: {
      app: 'Happ',
      store: 'App Store',
      url: 'https://apps.apple.com/app/id6504287215',
      time: '~2 минуты',
      steps: [
        { t: 'Скопируйте свой ключ', d: 'На главной нажмите «Копировать» рядом с ключом — он попадёт в буфер обмена.' },
        { t: 'Установите Happ', d: 'Бесплатное приложение из App Store (RU-версия — Happ Plus). Кнопка ниже откроет страницу в App Store.' },
        { t: 'Импортируйте ключ', d: 'Откройте Happ → нижняя вкладка «Подписки» → значок «+» в правом верхнем углу → «Из буфера обмена». Ключ подгрузится автоматически.' },
        { t: 'Включите VPN', d: 'Откройте вкладку «Соединение» и нажмите большую круглую кнопку. iOS один раз попросит разрешение на VPN-конфигурацию — нажмите «Разрешить» и подтвердите Face ID / паролем.' },
      ],
    },
    android: {
      app: 'Happ',
      store: 'Google Play',
      url: 'https://play.google.com/store/apps/details?id=com.happproxy',
      time: '~2 минуты',
      steps: [
        { t: 'Скопируйте свой ключ', d: 'На главной нажмите «Копировать» — ключ окажется в буфере обмена.' },
        { t: 'Установите Happ', d: 'Бесплатно из Google Play (или прямой APK с GitHub, если Play недоступен). Кнопка ниже откроет страницу.' },
        { t: 'Импортируйте ключ', d: 'Откройте Happ → вкладка «Подписки» → значок «+» сверху → «Из буфера обмена». Подписка добавится с автообновлением.' },
        { t: 'Включите VPN', d: 'На вкладке «Соединение» нажмите кнопку запуска. Android попросит разрешение на VPN — подтвердите «OK».' },
      ],
    },
    mac: {
      app: 'Happ',
      store: 'App Store · macOS',
      url: 'https://apps.apple.com/app/id6504287215',
      time: '~3 минуты',
      steps: [
        { t: 'Скопируйте свой ключ', d: 'Со страницы Telegram-бота на iPhone, либо здесь — кнопка «Копировать» на главной.' },
        { t: 'Установите Happ', d: 'Бесплатно из Mac App Store (нужен macOS 14 Sonoma и выше). Альтернатива — DMG с GitHub-релизов happ.su.' },
        { t: 'Импортируйте ключ', d: 'Откройте Happ → меню «Подписки» → «+» → «Из буфера обмена». Подписка появится в списке.' },
        { t: 'Включите VPN', d: 'Нажмите кнопку подключения. macOS попросит разрешение на установку VPN-конфигурации — подтвердите паролем администратора.' },
      ],
    },
    win: {
      app: 'Happ',
      store: 'happ.su',
      url: 'https://github.com/Happ-proxy/happ-desktop/releases/latest/download/setup-Happ.x64.exe',
      time: '~3 минуты',
      steps: [
        { t: 'Скопируйте свой ключ', d: 'На главной нажмите «Копировать» — ключ попадёт в буфер обмена компьютера.' },
        { t: 'Установите Happ', d: 'Скачайте установщик «setup-Happ.x64.exe» с happ.su и запустите. SmartScreen может предупредить — нажмите «Подробнее → Выполнить в любом случае».' },
        { t: 'Импортируйте ключ', d: 'Откройте Happ → раздел «Подписки» → «+» → «Из буфера обмена». Профиль появится в списке.' },
        { t: 'Включите VPN', d: 'Нажмите кнопку подключения. Windows попросит разрешение на установку драйвера TUN — подтвердите «Да».' },
      ],
    },
  };

  const g = guides[platform];

  const faq = [
    {
      q: 'Это безопасно? Можно вообще?',
      a: 'Да. Fresh — это инструмент для свободного доступа к интернету. Мы не храним логи, что вы открываете, не передаём данные третьим лицам. Сервис работает в правовом поле многих стран; ответственность за использование лежит на пользователе.',
    },
    {
      q: 'Будет ли тормозить интернет?',
      a: 'Скорость почти не отличается от обычной. На наших серверах нет ограничений по трафику и количеству подключений. Если заметите замедление — напишите в поддержку, попробуем другую локацию.',
    },
    {
      q: 'Нужно ли что-то платить за пробный период?',
      a: 'Нет. 7 дней — бесплатно, без привязки карты. После пробного периода сервис просто перестанет работать, пока вы не оформите подписку.',
    },
    {
      q: 'Сколько устройств можно подключить?',
      a: 'На тарифе «Обычный» — одно устройство. «Премиум» — до трёх. «Семейный» — до шести. Переключаться между устройствами можно в любой момент.',
    },
    {
      q: 'Что если ключ перестал работать?',
      a: 'Зайдите в раздел «Профиль» → «Мои устройства» → «Перевыпустить ключ». Старый ключ перестанет работать, новый придёт сюда в чат.',
    },
    {
      q: 'Можно отключить и снова включить позже?',
      a: 'Да, в любой момент. Подписка — помесячная, без штрафов за паузу. Когда вернётесь, просто оплатите следующий месяц.',
    },
    {
      q: 'Как пригласить друга?',
      a: 'В разделе «Друзья» есть ваша персональная ссылка. Когда друг оплатит подписку, вы получите кэшбэк 25–45% с каждой его оплаты — он автоматически вычитается из ваших следующих платежей.',
    },
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} aria-label="Назад" style={{
          width: 36, height: 36, borderRadius: 12, background: 'var(--bg-2)',
          border: '1px solid var(--line)', color: 'var(--fg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <IconChevron size={18} stroke="currentColor" style={{ transform: 'rotate(90deg)' }}/>
        </button>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>Инструкция</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 100px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Hero */}
        <div style={{
          padding: 16, borderRadius: 'var(--r-lg)',
          background: 'var(--bg-1)', border: '1px solid var(--line)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: `linear-gradient(135deg, ${accent}, #1F7A3A)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0E0E10',
            }}>
              <IconPlay size={20} stroke="#0E0E10"/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.3 }}>Как начать пользоваться</div>
              <div style={{ fontSize: 11, color: 'var(--fg-mute)', marginTop: 2 }}>4 шага · {g.time}</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--fg-mute)', lineHeight: 1.5 }}>
            Сервис работает через специальное приложение. Установите его один раз —
            дальше Fresh открывается одной кнопкой.
          </div>
        </div>

        {/* Platform picker */}
        <div>
          <div style={{ fontSize: 11, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600, padding: '4px 4px 8px' }}>
            Выберите устройство
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {platforms.map(p => {
              const active = platform === p.id;
              return (
                <button key={p.id} onClick={() => setPlatform(p.id)} style={{
                  padding: '14px 12px', borderRadius: 'var(--r-md)',
                  background: active ? 'var(--bg-1)' : 'var(--bg-2)',
                  border: active ? `1px solid ${accent}` : '1px solid var(--line)',
                  color: 'var(--fg)', fontSize: 13, fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  cursor: 'pointer', transition: 'all 120ms',
                }}>
                  <span style={{ color: active ? accent : 'var(--fg-mute)' }}>{p.icon}</span>
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Steps */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '4px 4px 8px' }}>
            <div style={{ fontSize: 11, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600 }}>
              Установка на {platforms.find(p => p.id === platform).label}
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-mute)' }}>{g.app}</div>
          </div>

          <div style={{ background: 'var(--bg-1)', borderRadius: 'var(--r-lg)', border: '1px solid var(--line)', overflow: 'hidden' }}>
            {g.steps.map((s, i) => (
              <div key={i} style={{
                display: 'flex', gap: 14, padding: 16,
                borderBottom: i < g.steps.length - 1 ? '1px solid var(--line)' : 'none',
                position: 'relative',
              }}>
                {/* Step number */}
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: `linear-gradient(135deg, ${accent}, #1F7A3A)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#0E0E10', fontSize: 13, fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                }}>{i + 1}</div>

                <div style={{ flex: 1, minWidth: 0, paddingTop: 3 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, letterSpacing: -0.2 }}>
                    {s.t}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--fg-mute)', lineHeight: 1.55 }}>
                    {s.d}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button onClick={() => (window.toast || (() => {}))('Ключ получен и скопирован', 'https://fresh-vpn.io/sub/a4f8d9c2-3b7e-4f1a-9c5d-8e6f2b1a4d7e')} style={{
            width: '100%', padding: '14px 16px', borderRadius: 'var(--r-md)',
            background: accent, border: 'none', color: '#0E0E10',
            fontSize: 14, fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <IconKey size={18} stroke="#0E0E10"/>
            Получить ключ
          </button>
          <button onClick={() => {
            (window.toast || (() => {}))(`Открываем ${g.app} в ${g.store}`);
            try { window.open(g.url, '_blank', 'noopener,noreferrer'); } catch (e) {}
          }} style={{
            width: '100%', padding: '14px 16px', borderRadius: 'var(--r-md)',
            background: 'var(--bg-1)', border: '1px solid var(--line)', color: 'var(--fg)',
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            Открыть {g.app} в {g.store}
            <IconChevron size={16} stroke="var(--fg-dim)" style={{ transform: 'rotate(-90deg)' }}/>
          </button>
        </div>

        {/* Tip */}
        <div style={{
          padding: 14, borderRadius: 'var(--r-md)',
          background: 'rgba(45,162,73,0.06)', border: '1px solid rgba(45,162,73,0.18)',
          display: 'flex', gap: 12,
        }}>
          <div style={{ color: accent, flexShrink: 0, marginTop: 1 }}>
            <IconHelp size={18} stroke={accent}/>
          </div>
          <div style={{ flex: 1, fontSize: 12, color: 'var(--fg-mute)', lineHeight: 1.5 }}>
            Если что-то не получилось — напишите в&nbsp;
            <span style={{ color: 'var(--fg)', fontWeight: 600 }}>@freshvpn_help</span>.
            Отвечают живые люди, обычно за 15 минут.
          </div>
        </div>

        {/* FAQ */}
        <div>
          <div style={{ fontSize: 11, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600, padding: '4px 4px 8px' }}>
            Частые вопросы
          </div>
          <div style={{ background: 'var(--bg-1)', borderRadius: 'var(--r-lg)', border: '1px solid var(--line)', overflow: 'hidden' }}>
            {faq.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={i} style={{
                  borderBottom: i < faq.length - 1 ? '1px solid var(--line)' : 'none',
                }}>
                  <button onClick={() => setOpenFaq(open ? null : i)} style={{
                    width: '100%', background: 'transparent', border: 'none', color: 'var(--fg)',
                    padding: '14px 16px', textAlign: 'left', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}>
                    <span style={{ flex: 1, fontSize: 13, fontWeight: 600, letterSpacing: -0.1 }}>{f.q}</span>
                    <IconChevron size={16} stroke="var(--fg-dim)" style={{
                      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 180ms',
                    }}/>
                  </button>
                  {open && (
                    <div style={{
                      padding: '0 16px 14px',
                      fontSize: 12, color: 'var(--fg-mute)', lineHeight: 1.6,
                    }}>
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Support CTA — большая кнопка для тех, у кого что-то не получилось */}
        <button
          onClick={() => (window.toast || (() => {}))('Открываем чат поддержки · @freshvpn_help')}
          style={{
            width: '100%', marginTop: 4, padding: '14px 16px',
            borderRadius: 'var(--r-lg)',
            background: 'var(--bg-1)',
            border: '1px solid var(--accent-line)',
            color: 'var(--fg)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
          }}
        >
          <div style={{
            width: 40, height: 40, borderRadius: 12, flexShrink: 0,
            background: 'var(--accent-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--accent-strong)',
          }}>
            <iconify-icon icon="ph:chat-circle-dots-duotone" width="22" height="22" style={{ display: 'inline-flex' }}/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Что-то не работает?</div>
            <div style={{ fontSize: 12, color: 'var(--fg-mute)', marginTop: 2 }}>Напишите нам — ответим быстро · @freshvpn_help</div>
          </div>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { InstallScreen });
