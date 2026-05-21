// Fresh VPN — экраны (главная, инструкция, тарифы, партнёрка, бонусы, профиль)

// ─── Главный — подписка + ключ + быстрый старт ───────────────
function HomeScreen({ tweaks, onOpenPlans, onOpenInvite, onOpenInstall, onOpenProfile, initialConnectOpen = false }) {
  const accent = tweaks.accent;
  const key = 'https://fresh-vpn.io/sub/a4f8d9c2-3b7e-4f1a-9c5d-8e6f2b1a4d7e';
  const t = window.toast || (() => {});
  const [qrOpen, setQrOpen] = React.useState(false);
  const [connectOpen, setConnectOpen] = React.useState(initialConnectOpen);
  const [showKey, setShowKey] = React.useState(false);
  const isDesktop = useIsDesktop();
  // TODO (prod): схему deeplink сверить с актуальной документацией happ.su.
  // Распространённый формат для XRay-клиентов — happ://add/<subscription-url>
  // или https://happ.su/add?url=<encoded>. Кодер заменит на правильный.
  // На ПК (Telegram Desktop) happ:// нативного приложения нет — показываем QR
  // для скана камерой телефона, см. components.md §2.7.
  const deeplink = `happ://add/${encodeURIComponent(key)}`;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      {/* Тихая фоновая текстура — нейтральные символы, низкая заметность */}
      <MatrixRain color="#A8D63A" opacity={0.10} density={0.5} speed={0.2}/>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 18px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: `linear-gradient(160deg, ${accent}, #1F7A3A)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <iconify-icon icon="ph:drop-duotone" width="18" height="18" style={{ color: '#0E0E10' }} />
          </div>
          <div style={{ fontWeight: 800, fontSize: 17, letterSpacing: -0.4, whiteSpace: 'nowrap' }}>
            Fresh<span style={{color: 'var(--fg-mute)', fontWeight: 500, marginLeft: 6, fontSize: 13}}>VPN</span>
          </div>
        </div>
        <button onClick={onOpenProfile} className="hero-iconbtn" aria-label="Профиль" style={{ width: 38, height: 38, borderRadius: 12 }}>
          <iconify-icon icon="ph:user-circle-duotone" width="22" height="22" style={{ color: 'var(--fg-mute)' }}/>
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 4px', position: 'relative', zIndex: 1 }}>
        {/* Compact status row (вместо bulky hero card — давил visually) */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '6px 12px', marginBottom: 18,
          borderRadius: 999, background: 'rgba(120, 200, 150, 0.10)',
          border: '1px solid rgba(120, 200, 150, 0.24)', alignSelf: 'center',
          width: 'fit-content', marginLeft: 'auto', marginRight: 'auto',
        }}>
          <span className="hero-status-dot"/>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ok)' }}>Активна</span>
          <span style={{ fontSize: 11, color: 'var(--fg-mute)' }}>·</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg)' }}>327 дней</span>
        </div>

        {/* Большой ConnectOrb по центру (focal point вместо bulky hero card) */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
          padding: '4px 0 18px',
        }}>
          <ConnectOrb state="on" accent={accent} size={180} onClick={() => setConnectOpen(true)}/>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-mute)' }}>
            Нажмите чтобы подключиться
          </div>
          {/* 3 secondary actions: QR / Share / Plans */}
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button onClick={() => setQrOpen(true)} aria-label="QR" className="hero-iconbtn" style={{ width: 42, height: 42 }}>
              <IconQR size={18}/>
            </button>
            <button onClick={() => t('Поделиться ключом')} aria-label="Поделиться" className="hero-iconbtn" style={{ width: 42, height: 42 }}>
              <iconify-icon icon="ph:share-network-duotone" width="18" height="18" style={{ display: 'inline-flex' }}/>
            </button>
            <button onClick={onOpenPlans} aria-label="Тарифы" className="hero-iconbtn" style={{ width: 42, height: 42 }}>
              <iconify-icon icon="ph:crown-duotone" width="18" height="18" style={{ display: 'inline-flex' }}/>
            </button>
          </div>
        </div>

        {/* Подсказка-CTA на инструкцию */}
        <button onClick={onOpenInstall} style={{
          width: '100%', padding: '12px 14px', borderRadius: 'var(--r-lg)', marginBottom: 14,
          background: 'var(--bg-1)', border: '1px solid var(--line)',
          color: 'var(--fg)', textAlign: 'left',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <iconify-icon icon="ph:book-open-duotone" width="22" height="22" style={{ display: 'inline-flex', color: 'var(--accent-strong)', flexShrink: 0 }}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700 }}>Как подключиться?</div>
            <div style={{ fontSize: 11, color: 'var(--fg-mute)', marginTop: 2 }}>Инструкция за 1 минуту — установите Happ</div>
          </div>
          <IconChevron size={16} stroke="var(--fg-dim)"/>
        </button>

        {/* PROMO strip */}
        <PromoStrip onOpenInvite={onOpenInvite} onOpenPlans={onOpenPlans} accent={accent} t={t}/>
      </div>

      {/* Connect sheet — на mobile deeplink в Happ, на ПК QR-код. Fallback — копирка + скрытая ссылка. */}
      <Sheet open={connectOpen} onClose={() => setConnectOpen(false)}
        title="Подключиться"
        subtitle={isDesktop
          ? 'Отсканируйте QR-код в приложении Happ на телефоне'
          : 'Откройте Happ — ключ добавится автоматически'}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '4px 0 0' }}>
          {isDesktop ? (
            /* Desktop: QR — happ:// на Win/Mac не сработает, поэтому скан с телефона */
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
              padding: '8px 0 4px',
            }}>
              <QRImage value={deeplink} size={200}/>
              <div style={{ fontSize: 12, color: 'var(--fg-mute)', textAlign: 'center', maxWidth: 320, lineHeight: 1.5 }}>
                Откройте Happ на телефоне → «Подписки» → «+» → «Сканировать QR».
                Ключ добавится автоматически.
              </div>
            </div>
          ) : (
            /* Mobile: deeplink через <a>, чтобы iOS/Android открыли happ:// */
            <a href={deeplink} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              width: '100%', padding: '16px 18px', borderRadius: 14,
              background: accent, color: '#0E0E10', border: 'none', textDecoration: 'none',
              fontSize: 15, fontWeight: 800, letterSpacing: 0.2,
            }}>
              <iconify-icon icon="ph:lightning-duotone" width="20" height="20" style={{ display: 'inline-flex' }}/>
              Открыть в Happ
            </a>
          )}

          {/* Разделитель «или» */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--fg-dim)', fontSize: 11 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }}/>
            <span>или скопируйте ссылку</span>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }}/>
          </div>

          {/* Fallback — кнопка копирки + скрываемая ссылка */}
          <div style={{
            padding: 12, borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line)',
          }}>
            <button onClick={() => t('Ссылка скопирована', key)} style={{
              width: '100%', padding: '11px', borderRadius: 10,
              background: 'var(--bg-3)', border: '1px solid var(--line)', color: 'var(--fg)',
              fontSize: 13, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            }}>
              <IconCopy size={15}/>
              Скопировать ссылку
            </button>
            <button onClick={() => setShowKey(v => !v)} className="link-toggle" style={{
              marginTop: 8, width: '100%',
              background: 'transparent', border: 'none', padding: '6px 0',
              color: 'var(--fg-mute)', fontSize: 11, fontWeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer',
            }}>
              <iconify-icon icon={showKey ? 'ph:caret-up-duotone' : 'ph:caret-down-duotone'} width="12" height="12" style={{ display: 'inline-flex' }}/>
              {showKey ? 'Скрыть ссылку' : 'Показать ссылку'}
            </button>
            {showKey && (
              <div className="mono" style={{
                fontSize: 11, color: 'var(--fg-mute)',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                marginTop: 6, padding: '8px 10px', borderRadius: 8,
                background: 'var(--bg-3)', border: '1px solid var(--line)',
              }}>{key}</div>
            )}
            <div style={{ marginTop: 10, fontSize: 11, color: 'var(--fg-dim)', lineHeight: 1.5 }}>
              Откройте Happ → «Подписки» → «+» → «Из буфера обмена»
            </div>
          </div>

          {/* Переход на инструкцию для тех, у кого Happ не установлен */}
          <button onClick={() => { setConnectOpen(false); onOpenInstall && onOpenInstall(); }} style={{
            width: '100%', padding: '12px 14px', borderRadius: 12,
            background: 'transparent', border: '1px solid var(--accent-line)',
            color: 'var(--accent-strong)', fontSize: 13, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <iconify-icon icon="ph:book-open-duotone" width="16" height="16" style={{ display: 'inline-flex' }}/>
            Не установлен Happ? — Открыть инструкцию
          </button>
        </div>
      </Sheet>

      <Sheet open={qrOpen} onClose={() => setQrOpen(false)}
        title="QR-код подписки"
        subtitle="Отсканируйте камерой телефона или из приложения Happ">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, padding: '8px 0 0' }}>
          <QRImage value={key} size={220}/>
          <div className="mono" style={{
            width: '100%', padding: '10px 12px', borderRadius: 10,
            background: 'var(--bg-2)', border: '1px solid var(--line)',
            fontSize: 11, color: 'var(--fg-mute)', textAlign: 'center',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{key}</div>
          <div style={{ display: 'flex', gap: 8, width: '100%' }}>
            <button onClick={() => t('Ключ скопирован', key)} style={{
              flex: 1, padding: '12px', borderRadius: 12,
              background: accent, color: '#0E0E10', border: 'none',
              fontSize: 13, fontWeight: 700,
            }}>Скопировать ключ</button>
            <button onClick={() => t('Ссылка отправлена в избранное Telegram')} style={{
              flex: 1, padding: '12px', borderRadius: 12,
              background: 'var(--bg-2)', border: '1px solid var(--line)', color: 'var(--fg)',
              fontSize: 13, fontWeight: 600,
            }}>В избранное</button>
          </div>
          <div style={{ width: '100%', marginTop: 6 }}>
            <div style={{ fontSize: 11, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600, marginBottom: 8 }}>
              Подробности подписки
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              {[
                { k: 'Срок',         v: 'до 19.03.2027 · 327 дней' },
                { k: 'Устройств',    v: '3 одновременно' },
                { k: 'Лимит трафика',v: 'без ограничений' },
              ].map(r => (
                <div key={r.k} style={{
                  display: 'flex', justifyContent: 'space-between', gap: 12,
                  padding: '8px 12px', borderRadius: 10,
                  background: 'var(--bg-2)', border: '1px solid var(--line)',
                }}>
                  <span style={{ fontSize: 12, color: 'var(--fg-mute)' }}>{r.k}</span>
                  <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg)', textAlign: 'right' }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{
            width: '100%', padding: 12, borderRadius: 12,
            background: 'rgba(232,193,90,0.06)', border: '1px solid rgba(232,193,90,0.18)',
            fontSize: 11, color: 'var(--fg-mute)', lineHeight: 1.5,
          }}>
            ⚠ Никому не передавайте ключ — он привязан к подписке. Если что-то не работает — напишите в поддержку.
          </div>
        </div>
      </Sheet>
    </div>
  );
}

// ─── Promo strip с ротацией ──────────────────────────────────
function PromoStrip({ onOpenInvite, onOpenPlans, accent, t }) {
  const promos = React.useMemo(() => ([
    {
      icon: 'ph:paper-plane-tilt-duotone',
      iconBg: '#2AA9E0',
      title: '+10 дней Премиума',
      sub: 'Подписка на @freshvpn_news · разово',
      badge: 'триал',
      onClick: () => t('Подписка на @freshvpn_news · +10 дней Премиума зачислено'),
    },
    {
      icon: 'ph:gift-duotone',
      iconBg: `linear-gradient(135deg, ${accent}, #1F7A3A)`,
      iconColor: '#0E0E10',
      title: 'Приведи друга — 25–45%',
      sub: 'До 100 000 ₽ с сети приглашённых',
      onClick: onOpenInvite,
    },
    {
      icon: 'ph:crown-duotone',
      iconBg: 'rgba(232,193,90,0.18)',
      iconColor: '#e8c15a',
      title: 'Семейный — 5 устройств',
      sub: '5 040 ₽/год · самый выгодный',
      onClick: onOpenPlans,
    },
  ]), [accent, onOpenInvite, onOpenPlans, t]);
  const [idx, setIdx] = React.useState(() => Math.floor(Math.random() * 3));
  const cycle = () => setIdx((i) => (i + 1) % promos.length);
  const p = promos[idx];
  return (
    <button onClick={p.onClick} className="home-promo">
      <div className="home-promo-icon" style={{ background: p.iconBg, color: p.iconColor || '#fff' }}>
        <iconify-icon icon={p.icon} width="22" height="22" style={{ display: 'inline-flex' }}/>
      </div>
      <div className="home-promo-text">
        <div className="home-promo-title">
          {p.title}
          {p.badge && <span className="home-promo-badge">{p.badge}</span>}
        </div>
        <div className="home-promo-sub">{p.sub}</div>
      </div>
      <span className="home-promo-cycle" onClick={(e) => { e.stopPropagation(); cycle(); }} aria-label="Следующее предложение">
        <iconify-icon icon="ph:caret-right-duotone" width="16" height="16" style={{ display: 'inline-flex' }}/>
      </span>
    </button>
  );
}

// ─── Тарифы ───────────────────────────────────────────────────
function PlansScreen({ onBack, accent }) {
  const [tier, setTier] = React.useState('premium');
  const [period, setPeriod] = React.useState(12);
  const [payOpen, setPayOpen] = React.useState(null); // null | { kind, label, total }
  const [payMethod, setPayMethod] = React.useState('stars');
  const t = window.toast || (() => {});

  const tiers = {
    basic:    { name: 'Обычный',  devices: 1, prices: {1: 150, 3: 405, 6: 720, 12: 1260} },
    premium:  { name: 'Премиум',  devices: 3, prices: {1: 250, 3: 675, 6: 1200, 12: 2100} },
    family:   { name: 'Семейный', devices: 5, prices: {1: 600, 3: 1620, 6: 2880, 12: 5040} },
  };
  const periods = [
    {v: 1, label: '1 мес', save: 0},
    {v: 3, label: '3 мес', save: 10},
    {v: 6, label: '6 мес', save: 20},
    {v: 12, label: '12 мес', save: 30},
  ];

  const selected = tiers[tier];
  const total = selected.prices[period];
  const basePrice = selected.prices[1] * period; // цена без скидки = 1 мес × period
  const saved = basePrice - total;
  const monthly = Math.round(total / period);
  const currentSave = (periods.find(p => p.v === period) || {save: 0}).save;
  const fmt = (n) => n.toLocaleString('ru-RU').replace(/,/g, ' ');

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px 4px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} aria-label="Назад" style={{
          width: 36, height: 36, borderRadius: 12, background: 'var(--bg-2)',
          border: '1px solid var(--line)', color: 'var(--fg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <IconChevron size={18} stroke="currentColor" style={{ transform: 'rotate(180deg)' }}/>
        </button>
        <div className="display" style={{ fontSize: 22, fontWeight: 700 }}>Тарифы</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px 16px' }}>
        {/* Tier toggle (3 шт) */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, padding: 4, background: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: 14 }}>
          {Object.entries(tiers).map(([id, t]) => (
            <button key={id} onClick={() => setTier(id)} style={{
              flex: 1, padding: '10px 4px', borderRadius: 10, border: 'none',
              background: tier === id ? 'var(--accent)' : 'transparent',
              color: tier === id ? '#0E0E10' : 'var(--fg-mute)',
              fontSize: 12, fontWeight: 700, transition: 'all 0.2s',
            }}>{t.name}</button>
          ))}
        </div>

        {/* Tier card */}
        <div className={`plan-card ${tier === 'premium' ? 'is-hero' : ''}`} style={{
          padding: 18, borderRadius: 'var(--r-xl)', marginBottom: 14,
          background: `linear-gradient(150deg, ${accent}1c, transparent 70%), var(--bg-1)`,
          border: '1px solid var(--accent-line)', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--accent-strong)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6 }}>Тариф</div>
              <div className="display" style={{ marginTop: 4, fontSize: 26, fontWeight: 800 }}>{selected.name}</div>
            </div>
            <div style={{
              padding: '6px 10px', borderRadius: 10,
              background: 'var(--bg-2)', border: '1px solid var(--line)',
              fontSize: 11, fontWeight: 600, color: 'var(--fg-mute)',
            }}>{selected.devices} устр.</div>
          </div>

          {/* Period chips */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            {periods.map(p => (
              <button key={p.v} onClick={() => setPeriod(p.v)} style={{
                flex: 1, padding: '10px 4px', borderRadius: 12,
                background: period === p.v ? 'var(--accent-soft)' : 'var(--bg-2)',
                border: `1.5px solid ${period === p.v ? 'var(--accent)' : 'var(--line)'}`,
                color: 'var(--fg)', cursor: 'pointer', position: 'relative',
              }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{p.label}</div>
                {p.save > 0 && (
                  <div style={{
                    fontSize: 9, fontWeight: 700, marginTop: 2,
                    color: period === p.v ? 'var(--accent-strong)' : 'var(--fg-dim)',
                  }}>−{p.save}%</div>
                )}
              </button>
            ))}
          </div>

          {/* Price summary */}
          <div style={{
            padding: 14, borderRadius: 14, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--line)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                {currentSave > 0 && (
                  <span className="mono" style={{
                    fontSize: 14, fontWeight: 600, color: 'var(--fg-dim)',
                    textDecoration: 'line-through', textDecorationThickness: '1.5px',
                  }}>{fmt(basePrice)} ₽</span>
                )}
                <span className="mono" style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.8 }}>
                  {fmt(total)} <span style={{ fontSize: 16, color: 'var(--fg-mute)', fontWeight: 600 }}>₽</span>
                </span>
                {currentSave > 0 && (
                  <span style={{
                    padding: '3px 7px', borderRadius: 6,
                    background: 'var(--accent)', color: '#0E0E10',
                    fontSize: 10, fontWeight: 800, letterSpacing: 0.4,
                  }}>−{currentSave}%</span>
                )}
              </div>
              <div style={{ fontSize: 11, color: 'var(--fg-mute)', marginTop: 4 }}>
                {fmt(monthly)} ₽/мес · {selected.devices} устр.{currentSave > 0 ? ` · экономия ${fmt(saved)} ₽` : ''}
              </div>
            </div>
            <button onClick={() => setPayOpen({ kind: 'period', label: `${selected.name} · ${period} мес`, total })} style={{
              padding: '12px 18px', borderRadius: 12,
              background: accent, color: '#0E0E10', border: 'none',
              fontSize: 14, fontWeight: 700,
            }}>Купить</button>
          </div>
        </div>

        {/* Бессрочный 1+1 */}
        <div style={{
          padding: 16, borderRadius: 'var(--r-lg)', marginBottom: 14,
          background: 'var(--bg-1)', border: '1px dashed var(--accent-line)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'inline-block', padding: '2px 8px', borderRadius: 6,
                background: 'var(--accent)', color: '#0E0E10',
                fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5,
              }}>Бессрочно · 1+1</div>
              <div style={{ marginTop: 8, fontSize: 18, fontWeight: 800, letterSpacing: -0.4 }}>
                Один доступ — себе, второй — другу
              </div>
              <div style={{ marginTop: 4, fontSize: 12, color: 'var(--fg-mute)' }}>
                Без подписок и продлений. Подари второй ключ кому угодно.
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="mono" style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.6 }}>3 600 ₽</div>
              <div style={{ fontSize: 10, color: 'var(--fg-dim)' }}>навсегда</div>
            </div>
          </div>
          <button onClick={() => setPayOpen({ kind: 'forever', label: 'Бессрочно · 1+1', total: 3600 })} style={{
            marginTop: 12, width: '100%', padding: '12px', borderRadius: 12,
            background: 'var(--bg-2)', border: '1px solid var(--accent-line)', color: 'var(--accent-strong)',
            fontSize: 13, fontWeight: 700,
          }}>Купить навсегда</button>
        </div>

      </div>

      <Sheet open={!!payOpen} onClose={() => setPayOpen(null)}
        title="Оформление" subtitle={payOpen ? payOpen.label : ''}>
        {payOpen && (
          <CheckoutPanel
            label={payOpen.label}
            total={payOpen.total}
            method={payMethod}
            setMethod={setPayMethod}
            onPay={() => { setPayOpen(null); t(`Оплачено · ${payOpen.label} · ${fmt(payOpen.total)} ₽`); }}
            accent={accent}
            fmt={fmt}
          />
        )}
      </Sheet>
    </div>
  );
}

function CheckoutPanel({ label, total, method, setMethod, onPay, accent, fmt }) {
  const methods = [
    { id: 'stars', label: 'Telegram Stars', sub: 'мгновенно',         tag: '0%' },
    { id: 'sbp',   label: 'СБП',            sub: 'банки РФ',          tag: null },
    { id: 'card',  label: 'Карта',          sub: 'Visa / MIR / UnionPay', tag: null },
    { id: 'ton',   label: 'TON',            sub: 'крипта',            tag: null },
    { id: 'usdt',  label: 'USDT',           sub: 'TRC20 / TON',       tag: null },
    { id: 'sber',  label: 'СберPay',        sub: 'через банк',        tag: null },
  ];
  const fee = method === 'card' ? Math.round(total * 0.029) : 0;
  const finalTotal = total + fee;

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div style={{
        padding: 14, borderRadius: 14,
        background: `linear-gradient(150deg, ${accent}1c, transparent 70%), var(--bg-2)`,
        border: '1px solid var(--accent-line)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600 }}>К оплате</div>
          <div className="mono" style={{ fontSize: 24, fontWeight: 800, marginTop: 4, letterSpacing: -0.6 }}>
            {fmt(finalTotal)} <span style={{ fontSize: 14, color: 'var(--fg-mute)' }}>₽</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'var(--fg-dim)' }}>{label}</div>
          {fee > 0 && <div style={{ fontSize: 10, color: 'var(--fg-mute)', marginTop: 2 }}>+ {fmt(fee)} ₽ комиссия</div>}
        </div>
      </div>

      <div style={{ fontSize: 11, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600 }}>
        Способ оплаты
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        {methods.map(m => {
          const sel = method === m.id;
          return (
            <button key={m.id} onClick={() => setMethod(m.id)} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', textAlign: 'left',
              background: sel ? 'var(--accent-soft)' : 'var(--bg-2)',
              border: `1.5px solid ${sel ? 'var(--accent)' : 'var(--line)'}`,
              borderRadius: 14, color: 'var(--fg)', cursor: 'pointer', position: 'relative',
            }}>
              <PayIcon name={m.id} active={sel} accent={accent}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{m.label}</div>
                <div style={{ fontSize: 11, color: 'var(--fg-mute)', marginTop: 1 }}>{m.sub}</div>
              </div>
              {m.tag && (
                <span style={{
                  fontSize: 9, padding: '2px 7px', borderRadius: 5,
                  background: 'var(--accent)', color: '#0E0E10',
                  fontWeight: 800, letterSpacing: 0.4,
                }}>{m.tag} комиссии</span>
              )}
              {sel && <IconCheck size={16} stroke="var(--accent-strong)"/>}
            </button>
          );
        })}
      </div>

      <button onClick={onPay} style={{
        width: '100%', padding: '14px 16px', borderRadius: 14,
        background: accent, color: '#0E0E10', border: 'none',
        fontSize: 15, fontWeight: 800, letterSpacing: 0.2, marginTop: 4,
      }}>Оплатить {fmt(finalTotal)} ₽</button>

      <div style={{
        padding: 10, borderRadius: 10,
        background: 'rgba(120,200,150,0.08)', border: '1px solid rgba(120,200,150,0.20)',
        fontSize: 11, color: 'var(--fg-mute)', lineHeight: 1.5, display: 'flex', gap: 8,
      }}>
        <span style={{ color: 'var(--ok)', flexShrink: 0 }}>✓</span>
        <span>Гарантия возврата 7 дней без вопросов. Подписка активируется сразу после оплаты.</span>
      </div>
    </div>
  );
}

// ─── Программа для друзей ────────────────────────────────────
function InviteScreen({ onBack, accent }) {
  const [tab, setTab] = React.useState('overview');
  const t = window.toast || (() => {});
  const refLink = 't.me/freshvpn_bot?start=alex_n';

  const ranks = [
    { id: 'starter',  name: 'Starter',    refs: 1,   l1: 25, l23: 0,  bonus: '—',         current: false },
    { id: 'active',   name: 'Active',     refs: 5,   l1: 25, l23: 0,  bonus: '+30 дней', current: true },
    { id: 'promoter', name: 'Promoter',   refs: 15,  l1: 30, l23: 0,  bonus: '1 000 ₽',   current: false },
    { id: 'leader',   name: 'Leader',     refs: 30,  l1: 35, l23: 3,  bonus: '5 000 ₽',   current: false },
    { id: 'top',      name: 'Top Leader', refs: 75,  l1: 40, l23: 5,  bonus: '25 000 ₽',  current: false },
    { id: 'director', name: 'Director',   refs: 200, l1: 45, l23: 7,  bonus: '100 000 ₽', current: false },
  ];
  const currentRank = ranks.find(r => r.current);
  const nextRank = ranks[ranks.findIndex(r => r.current) + 1];
  const myActive = 7; // активных друзей первого круга

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} aria-label="Назад" style={{
          width: 36, height: 36, borderRadius: 12, background: 'var(--bg-2)',
          border: '1px solid var(--line)', color: 'var(--fg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <IconChevron size={18} stroke="currentColor" style={{ transform: 'rotate(180deg)' }}/>
        </button>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>Друзья</div>
      </div>

      {/* Tab toggle */}
      <div style={{ padding: '10px 16px 8px', display: 'flex', gap: 4, background: 'transparent' }}>
        <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: 12, flex: 1 }}>
          {[
            {id: 'overview', l: 'Обзор'},
            {id: 'calc',     l: 'Калькулятор'},
            {id: 'ranks',    l: 'Уровни'},
            {id: 'network',  l: 'Друзья'},
          ].map(tt => (
            <button key={tt.id} onClick={() => setTab(tt.id)} style={{
              flex: 1, padding: '8px 4px', borderRadius: 8, border: 'none',
              background: tab === tt.id ? 'var(--accent)' : 'transparent',
              color: tab === tt.id ? '#0E0E10' : 'var(--fg-mute)',
              fontSize: 11, fontWeight: 700,
            }}>{tt.l}</button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px 16px' }}>
        {tab === 'overview' && (
          <>
            {/* Earnings hero */}
            <div style={{
              padding: 20, borderRadius: 'var(--r-xl)', marginBottom: 12,
              background: `linear-gradient(160deg, ${accent}1f, transparent 60%), var(--bg-1)`,
              border: '1px solid var(--accent-line)', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ fontSize: 11, color: 'var(--accent-strong)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.7 }}>
                Баланс к выводу
              </div>
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span className="mono" style={{ fontSize: 38, fontWeight: 800, letterSpacing: -1.2 }}>2 480</span>
                <span style={{ fontSize: 18, color: 'var(--fg-mute)', fontWeight: 600 }}>₽</span>
              </div>
              <div style={{ marginTop: 4, fontSize: 12, color: 'var(--fg-mute)' }}>
                За октябрь · от 100 ₽ можно выводить
              </div>
              <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
                <button onClick={() => t('Вывод 2 480 ₽ · откроется форма выплаты')} style={{
                  flex: 1, padding: '12px', borderRadius: 12, border: 'none',
                  background: accent, color: '#0E0E10', fontSize: 13, fontWeight: 700,
                }}>Вывести</button>
                <button onClick={() => t('Зачислено в подписку · +49 дней Премиума')} style={{
                  flex: 1, padding: '12px', borderRadius: 12,
                  background: 'var(--bg-2)', border: '1px solid var(--line)', color: 'var(--fg)',
                  fontSize: 13, fontWeight: 600,
                }}>В подписку</button>
              </div>
            </div>

            {/* Текущий ранг + прогресс */}
            <div style={{
              padding: 16, borderRadius: 'var(--r-lg)', marginBottom: 12,
              background: 'var(--bg-1)', border: '1px solid var(--line)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600 }}>Текущий ранг</div>
                  <div style={{ marginTop: 4, fontSize: 20, fontWeight: 800, letterSpacing: -0.3, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <RankBadge name={currentRank.name} accent={accent} size={28}/>
                    {currentRank.name}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: 'var(--fg-dim)' }}>Кэшбек</div>
                  <div className="mono" style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent-strong)' }}>
                    {currentRank.l1}%
                  </div>
                </div>
              </div>

              {/* Прогресс до следующего */}
              <div style={{ fontSize: 11, color: 'var(--fg-mute)', display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span>До уровня <strong style={{color: 'var(--fg)'}}>{nextRank.name}</strong></span>
                <span className="mono">{myActive} / {nextRank.refs} друзей</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: 'var(--bg-3)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${Math.min(100, (myActive / nextRank.refs) * 100)}%`,
                  background: `linear-gradient(90deg, ${accent}, #1F7A3A)`, borderRadius: 4,
                }}/>
              </div>
              <div style={{ marginTop: 8, fontSize: 11, color: 'var(--fg-dim)' }}>
                Откроется кэшбек <strong style={{color: 'var(--accent-strong)'}}>{nextRank.l1}%</strong> и бонус <strong style={{color: 'var(--accent-strong)'}}>{nextRank.bonus}</strong>
              </div>
            </div>

            {/* 5 уровней — мини-схема */}
            <div style={{
              padding: 16, borderRadius: 'var(--r-lg)', marginBottom: 12,
              background: 'var(--bg-1)', border: '1px solid var(--line)',
            }}>
              <div style={{ fontSize: 11, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600, marginBottom: 12 }}>
                Сколько получаешь за друзей
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  {l: 1, who: 'Друзья', pct: 25, refs: 7},
                  {l: 2, who: 'Их друзья', pct: 7, refs: 24},
                  {l: 3, who: 'Знакомые знакомых', pct: 3, refs: 71},
                  {l: 4, who: 'Дальняя сеть', pct: 1, refs: 142},
                  {l: 5, who: 'Самый дальний круг', pct: 0.5, refs: 286},
                ].map(lv => (
                  <div key={lv.l} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: 6,
                      background: 'var(--bg-3)', border: '1px solid var(--line)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, color: 'var(--accent-strong)',
                      fontFamily: 'var(--font-mono)', flexShrink: 0,
                    }}>{lv.l}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{lv.who}</div>
                      <div style={{ height: 6, background: 'var(--bg-3)', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{
                          width: `${(lv.pct / 25) * 100}%`, height: '100%', borderRadius: 3,
                          background: `linear-gradient(90deg, ${accent}, #1F7A3A)`,
                        }}/>
                      </div>
                    </div>
                    <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-strong)', width: 42, textAlign: 'right' }}>{lv.pct}%</span>
                    <span className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', width: 56, textAlign: 'right' }}>{lv.refs} чел.</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ссылка */}
            <div style={{
              padding: 14, borderRadius: 'var(--r-lg)', marginBottom: 12,
              background: 'var(--bg-1)', border: '1px solid var(--line)',
            }}>
              <div style={{ fontSize: 11, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600, marginBottom: 8 }}>
                Ваша ссылка для друзей
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className="mono" style={{
                  flex: 1, padding: '10px 12px', borderRadius: 12,
                  background: 'var(--bg-2)', border: '1px solid var(--line)',
                  fontSize: 11, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{refLink}</div>
                <button onClick={() => t('Ссылка скопирована', refLink)} aria-label="Скопировать реферальную ссылку" style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: 'var(--accent-soft)', border: '1px solid var(--accent-line)', color: 'var(--accent-strong)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><IconCopy size={18}/></button>
              </div>
              <button onClick={() => t('Открываем шаринг в Telegram')} style={{
                marginTop: 10, width: '100%', padding: '12px', borderRadius: 12,
                background: accent, color: '#0E0E10', border: 'none',
                fontSize: 13, fontWeight: 700,
              }}>Поделиться в Telegram</button>
            </div>
          </>
        )}

        {tab === 'calc' && <ReferralCalculator accent={accent} ranks={ranks}/>}

        {tab === 'ranks' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {ranks.map(r => {
              const isCurrent = r.current;
              const isAchieved = ranks.findIndex(x => x.id === r.id) <= ranks.findIndex(x => x.current);
              return (
                <div key={r.id} style={{
                  padding: 14, borderRadius: 'var(--r-lg)',
                  background: isCurrent ? `linear-gradient(135deg, ${accent}1c, transparent), var(--bg-1)` : 'var(--bg-1)',
                  border: `1px solid ${isCurrent ? accent : isAchieved ? 'var(--line-strong)' : 'var(--line)'}`,
                  opacity: isAchieved || isCurrent ? 1 : 0.85,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <RankBadge name={r.name} accent={accent} size={36}/>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.3 }}>{r.name}</span>
                        {isCurrent && (
                          <span style={{
                            fontSize: 9, padding: '2px 6px', borderRadius: 4,
                            background: 'var(--accent)', color: '#0E0E10',
                            fontWeight: 800, letterSpacing: 0.4, textTransform: 'uppercase',
                          }}>сейчас</span>
                        )}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--fg-mute)', marginTop: 2 }}>
                        От {r.refs} друзей · кэшбек {r.l1}%
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, color: 'var(--fg-dim)' }}>Бонус</div>
                      <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-strong)' }}>{r.bonus}</div>
                    </div>
                  </div>
                  {r.l23 > 0 && (
                    <div style={{ marginTop: 10, padding: 10, borderRadius: 10, background: 'var(--bg-2)', fontSize: 11, color: 'var(--fg-mute)' }}>
                      Дополнительно: +{r.l23}% за друзей друзей и +{r.l23}% за следующий круг
                    </div>
                  )}
                </div>
              );
            })}
            <div style={{
              marginTop: 4, padding: 12, borderRadius: 12,
              background: 'rgba(232,193,90,0.06)', border: '1px solid rgba(232,193,90,0.18)',
              fontSize: 11, color: 'var(--fg-mute)', lineHeight: 1.5,
            }}>
              Уровень обновляется каждый месяц. Если кто-то из друзей перестал пользоваться — уровень может понизиться.
            </div>
          </div>
        )}

        {tab === 'network' && (
          <>
            {/* stats */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <Stat label="Друзья" value="7" unit="из 15"/>
              <Stat label="Всего в сети" value="47" unit="чел."/>
              <Stat label="В мес." value="950" unit="₽" accent="var(--accent-strong)"/>
            </div>
            {/* invited */}
            <div style={{ fontSize: 11, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600, padding: '4px 4px 8px' }}>
              Приглашённые друзья
            </div>
            <div style={{ background: 'var(--bg-1)', borderRadius: 'var(--r-lg)', border: '1px solid var(--line)', overflow: 'hidden' }}>
              {[
                { name: 'Дмитрий К.', plan: 'Премиум · год', earn: '+525', hue: 200, sub: 7 },
                { name: 'Маша П.',    plan: 'Обычный · 6 мес', earn: '+180', hue: 280, sub: 3 },
                { name: 'Игорь В.',   plan: 'Семейный · год', earn: '+1 260', hue: 30, sub: 12 },
                { name: 'Аня Л.',     plan: 'Премиум · мес', earn: '+62', hue: 140, sub: 0 },
                { name: 'Сергей Б.',  plan: 'Пробный период', earn: 'ждём', hue: 340, sub: 0, pending: true },
                { name: 'Олег М.',    plan: 'Обычный · мес', earn: '+37', hue: 100, sub: 1 },
                { name: 'Лена Ф.',    plan: 'Премиум · 3 мес', earn: '+168', hue: 50, sub: 5 },
              ].map((f, i, arr) => (
                <button key={i} onClick={() => t(`${f.name} · ${f.plan}${f.pending ? '' : ` · ${f.earn} ₽`}`)} style={{
                  width: '100%', textAlign: 'left', background: 'transparent', color: 'var(--fg)',
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                  border: 'none', borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 12, flexShrink: 0,
                    background: `oklch(0.55 0.12 ${f.hue})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 700, color: '#fff',
                  }}>{f.name[0]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{f.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--fg-mute)', marginTop: 1 }}>
                      {f.plan}{f.sub > 0 && <> · привёл {f.sub} {f.sub === 1 ? 'друга' : 'друзей'}</>}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="mono" style={{
                      fontSize: 13, fontWeight: 700,
                      color: f.pending ? 'var(--fg-dim)' : 'var(--accent-strong)',
                    }}>{f.earn}{!f.pending && ' ₽'}</div>
                    {!f.pending && <div style={{ fontSize: 9, color: 'var(--fg-dim)' }}>в этом мес.</div>}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Бонусы ───────────────────────────────────────────────────
function BonusScreen({ onBack, accent }) {
  const t = window.toast || (() => {});
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} aria-label="Назад" style={{
          width: 36, height: 36, borderRadius: 12, background: 'var(--bg-2)',
          border: '1px solid var(--line)', color: 'var(--fg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <IconChevron size={18} stroke="currentColor" style={{ transform: 'rotate(180deg)' }}/>
        </button>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>Бонусы</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 16px 16px' }}>
        {/* Hero — два баланса */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <div style={{
            flex: 1, padding: 14, borderRadius: 'var(--r-lg)',
            background: `linear-gradient(150deg, ${accent}1f, transparent), var(--bg-1)`,
            border: '1px solid var(--accent-line)',
          }}>
            <div style={{ fontSize: 10, color: 'var(--accent-strong)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6 }}>Дни подписки</div>
            <div style={{ marginTop: 6, display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span className="mono" style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.8 }}>+88</span>
              <span style={{ fontSize: 12, color: 'var(--fg-mute)' }}>дней</span>
            </div>
            <div style={{ fontSize: 10, color: 'var(--fg-dim)', marginTop: 2 }}>применятся к подписке</div>
          </div>
          <div style={{
            flex: 1, padding: 14, borderRadius: 'var(--r-lg)',
            background: 'var(--bg-1)', border: '1px solid var(--line)',
          }}>
            <div style={{ fontSize: 10, color: 'var(--fg-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6 }}>Деньги</div>
            <div style={{ marginTop: 6, display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span className="mono" style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.8 }}>1 240</span>
              <span style={{ fontSize: 12, color: 'var(--fg-mute)' }}>₽</span>
            </div>
            <div style={{ fontSize: 10, color: 'var(--fg-dim)', marginTop: 2 }}>от 100 ₽ к выводу</div>
          </div>
        </div>

        {/* Категории */}
        <BonusGroup title="За верность" items={[
          { t: 'День рождения', s: 'каждый год', v: '+30 дней', icon: 'cake' },
          { t: 'Год в Fresh', s: 'через 217 дней', v: '+14 дней', icon: 'star' },
          { t: '6 продлений подряд', s: '5 из 6', v: '+30 дней', icon: 'streak', progress: 5/6 },
        ]} accent={accent}/>

        <BonusGroup title="За друзей" items={[
          { t: 'Первый друг на Обычном', s: 'оплатил подписку', v: '+30 дней', icon: 'gift' },
          { t: 'Первый друг на Премиуме', s: 'или Семейном', v: '+100 ₽', icon: 'money' },
          { t: '10 друзей в ранге Leader', s: 'в вашей сети', v: '+5 000 ₽', icon: 'leaders' },
        ]} accent={accent}/>

        <BonusGroup title="Полезные действия" items={[
          { t: 'Опрос о качестве', s: 'раз в квартал', v: '+7 дней', icon: 'survey' },
          { t: 'Сообщить об ошибке', s: 'принято в работу', v: '+14 дней', icon: 'bug' },
          { t: 'Развёрнутый отзыв', s: 'с примером проблемы', v: '+7 дней', icon: 'review' },
          { t: 'Установка на 3+ устройств', s: 'Премиум и Семейный', v: '+5 дней', icon: 'devices' },
          { t: 'Подписка на наш канал', s: '@freshvpn_news · разово, при отписке сгорает', v: '+10 дней', icon: 'tg' },
        ]} accent={accent}/>

        {/* Конкурс */}
        <div style={{ fontSize: 11, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600, padding: '4px 4px 8px' }}>
          Конкурсы и аспирации
        </div>
        <div style={{
          padding: 18, borderRadius: 'var(--r-xl)', marginBottom: 12,
          background: `linear-gradient(160deg, ${accent}1f, transparent 60%), var(--bg-1)`,
          border: '1px solid var(--accent-line)', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            display: 'inline-block', padding: '2px 8px', borderRadius: 6,
            background: 'var(--accent)', color: '#0E0E10',
            fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5,
          }}>Идёт сейчас</div>
          <div style={{ marginTop: 8, fontSize: 18, fontWeight: 800, letterSpacing: -0.4 }}>
            Топ-10: кто пригласил больше друзей
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-mute)', marginTop: 4 }}>
            Призовой фонд 50 000 ₽ · до конца октября 12 дней
          </div>

          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              {p: 1, name: 'igor_v', refs: 24, prize: '20 000', me: false},
              {p: 2, name: 'olga_m', refs: 19, prize: '15 000', me: false},
              {p: 3, name: 'anton_d', refs: 17, prize: '10 000', me: false},
              {p: 7, name: 'alex_n (вы)', refs: 7, prize: '1 000', me: true},
            ].map(r => (
              <button key={r.p} onClick={() => t(`#${r.p} @${r.name} · ${r.refs} друзей · приз ${r.prize} ₽`)} style={{
                width: '100%', textAlign: 'left', color: 'var(--fg)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10,
                background: r.me ? 'var(--accent-soft)' : 'rgba(0,0,0,0.18)',
                border: r.me ? '1px solid var(--accent-line)' : '1px solid var(--line)',
              }}>
                <div className="mono" style={{
                  width: 22, height: 22, borderRadius: 6,
                  background: r.p <= 3 ? accent : 'var(--bg-3)', color: r.p <= 3 ? '#0E0E10' : 'var(--fg-mute)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, flexShrink: 0,
                }}>{r.p}</div>
                <span style={{ flex: 1, fontSize: 12, fontWeight: r.me ? 700 : 500 }}>@{r.name}</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--fg-mute)' }}>{r.refs} друзей</span>
                <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-strong)' }}>{r.prize} ₽</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button onClick={() => t('Лучший за квартал · 1 год подписки в подарок')} style={{
            flex: 1, padding: 14, borderRadius: 'var(--r-lg)', textAlign: 'left', color: 'var(--fg)',
            background: 'var(--bg-1)', border: '1px solid var(--line)', cursor: 'pointer',
          }}>
            <div style={{ fontSize: 10, color: 'var(--fg-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6 }}>Лучший за квартал</div>
            <div style={{ marginTop: 6, fontSize: 13, fontWeight: 700 }}>Год подписки в подарок</div>
          </button>
          <button onClick={() => t('Партнёр года · 100 000 ₽ или поездка')} style={{
            flex: 1, padding: 14, borderRadius: 'var(--r-lg)', textAlign: 'left', color: 'var(--fg)',
            background: 'var(--bg-1)', border: '1px solid var(--line)', cursor: 'pointer',
          }}>
            <div style={{ fontSize: 10, color: 'var(--fg-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6 }}>Партнёр года</div>
            <div className="mono" style={{ marginTop: 6, fontSize: 14, fontWeight: 800, color: 'var(--accent-strong)' }}>100 000 ₽</div>
            <div style={{ fontSize: 10, color: 'var(--fg-dim)' }}>или поездка</div>
          </button>
        </div>

        {/* История */}
        <div style={{ fontSize: 11, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600, padding: '4px 4px 8px' }}>
          История начислений
        </div>
        <div style={{ background: 'var(--bg-1)', borderRadius: 'var(--r-lg)', border: '1px solid var(--line)', overflow: 'hidden' }}>
          {[
            {t: 'Друг @maria_p оформил Премиум', d: '17 окт', v: '+62 ₽'},
            {t: 'Опрос о качестве', d: '14 окт', v: '+7 дней'},
            {t: 'Друг @igor_v · Семейный год', d: '12 окт', v: '+1 260 ₽'},
            {t: 'Сообщение об ошибке · принято', d: '8 окт', v: '+14 дней'},
            {t: 'Друг @oleg_m продлил подписку', d: '5 окт', v: '+37 ₽'},
            {t: 'Подписка на @freshvpn_news', d: '1 окт', v: '+1 день'},
          ].map((h, i, arr) => (
            <button key={i} onClick={() => t(`${h.t} · ${h.d} · ${h.v}`)} style={{
              width: '100%', textAlign: 'left', background: 'transparent', color: 'var(--fg)', border: 'none',
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
              borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{h.t}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', marginTop: 1 }}>{h.d}</div>
              </div>
              <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-strong)' }}>{h.v}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function BonusGroup({ title, items, accent }) {
  const t = window.toast || (() => {});
  return (
    <>
      <div style={{ fontSize: 11, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600, padding: '4px 4px 8px' }}>{title}</div>
      <div style={{ background: 'var(--bg-1)', borderRadius: 'var(--r-lg)', border: '1px solid var(--line)', overflow: 'hidden', marginBottom: 12 }}>
        {items.map((it, i, arr) => (
          <button key={i} onClick={() => t(`${it.t} · ${it.s} · ${it.v}`)} style={{
            width: '100%', textAlign: 'left', background: 'transparent', color: 'var(--fg)', border: 'none',
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
            borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9, flexShrink: 0,
              background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent-strong)',
            }}>
              <BonusIcon name={it.icon}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{it.t}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-mute)', marginTop: 1 }}>{it.s}</div>
              {it.progress != null && (
                <div style={{ marginTop: 6, height: 4, borderRadius: 2, background: 'var(--bg-3)', overflow: 'hidden' }}>
                  <div style={{ width: `${it.progress * 100}%`, height: '100%', background: accent, borderRadius: 2 }}/>
                </div>
              )}
            </div>
            <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-strong)', whiteSpace: 'nowrap' }}>{it.v}</div>
          </button>
        ))}
      </div>
    </>
  );
}

function BonusIcon({ name }) {
  const map = {
    cake:     'ph:cake-duotone',
    star:     'ph:star-duotone',
    streak:   'ph:flame-duotone',
    comeback: 'ph:arrow-counter-clockwise-duotone',
    gift:     'ph:gift-duotone',
    money:    'ph:wallet-duotone',
    leaders:  'ph:users-three-duotone',
    survey:   'ph:clipboard-text-duotone',
    bug:      'ph:bug-duotone',
    review:   'ph:chat-circle-text-duotone',
    devices:  'ph:devices-duotone',
    tg:       'ph:paper-plane-tilt-duotone',
  };
  return <iconify-icon icon={map[name] || 'ph:circle-duotone'} width="18" height="18" style={{ display: 'inline-flex' }} />;
}

// Бейдж ранга — стилизованная иконка (геометрия по уровню)
function RankBadge({ name, accent, size = 36 }) {
  const map = {
    'Starter':    { sides: 3, fill: 0.0, color: '#888' },
    'Active':     { sides: 4, fill: 0.3, color: '#9ED658' },
    'Promoter':   { sides: 5, fill: 0.5, color: accent },
    'Leader':     { sides: 6, fill: 0.7, color: accent },
    'Top Leader': { sides: 7, fill: 0.85, color: accent },
    'Director':   { sides: 8, fill: 1.0, color: accent },
  };
  const r = map[name] || map.Starter;
  // строим полигон
  const cx = 12, cy = 12, R = 9;
  const points = Array.from({length: r.sides}, (_, i) => {
    const a = -Math.PI/2 + (i * 2 * Math.PI / r.sides);
    return `${cx + R * Math.cos(a)},${cy + R * Math.sin(a)}`;
  }).join(' ');

  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.28, flexShrink: 0,
      background: r.fill > 0.4 ? `linear-gradient(135deg, ${r.color}, #1F7A3A)` : 'var(--bg-3)',
      border: `1px solid ${r.fill > 0 ? r.color + '55' : 'var(--line)'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24">
        <polygon points={points}
          fill={r.fill > 0.4 ? '#0E0E10' : r.color + '88'}
          stroke={r.fill > 0.4 ? '#0E0E10' : r.color}
          strokeWidth="1.4" strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ─── Профиль (урезанный) ──────────────────────────────────────
function ProfileScreen({ onBack, onOpenPayments, accent }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} aria-label="Назад" style={{
          width: 36, height: 36, borderRadius: 12, background: 'var(--bg-2)',
          border: '1px solid var(--line)', color: 'var(--fg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <IconChevron size={18} stroke="currentColor" style={{ transform: 'rotate(180deg)' }}/>
        </button>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>Профиль</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px' }}>
        {/* Карточка пользователя */}
        <div style={{
          padding: 18, borderRadius: 'var(--r-xl)', marginBottom: 14,
          background: 'var(--bg-1)', border: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 18,
            background: `linear-gradient(135deg, ${accent}, #1F7A3A)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 800, color: '#0E0E10',
          }}>А</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3 }}>Александр Н.</div>
            <div style={{ fontSize: 12, color: 'var(--fg-mute)', marginTop: 2 }}>@alex_n</div>
            <div style={{
              marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '2px 8px', borderRadius: 999,
              background: 'var(--accent-soft)', color: 'var(--accent-strong)',
              fontSize: 11, fontWeight: 700, letterSpacing: 0.3,
              border: '1px solid var(--accent-line)',
            }}>
              <IconCrown size={11}/> ПРЕМИУМ · 327 дней
            </div>
          </div>
        </div>

        {/* Активная подписка */}
        <div style={{
          padding: 16, borderRadius: 'var(--r-lg)', marginBottom: 14,
          background: 'var(--bg-1)', border: '1px solid var(--line)',
        }}>
          <div style={{ fontSize: 11, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600 }}>Активная подписка</div>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Премиум · 12 мес</div>
            <div className="mono" style={{ fontSize: 13, color: 'var(--fg-mute)' }}>3 устр.</div>
          </div>
          <div style={{ marginTop: 10, height: 6, borderRadius: 3, background: 'var(--bg-3)', overflow: 'hidden' }}>
            <div style={{ width: '74%', height: '100%', background: `linear-gradient(90deg, ${accent}, #1F7A3A)`, borderRadius: 3 }}/>
          </div>
          <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--fg-mute)' }}>
            <span>осталось 327 дней</span>
            <span className="mono">до 19.03.2027</span>
          </div>
        </div>

        {/* Sub-row'ы: история платежей + поддержка */}
        <div style={{ background: 'var(--bg-1)', borderRadius: 'var(--r-lg)', border: '1px solid var(--line)', overflow: 'hidden' }}>
          <button onClick={onOpenPayments} style={{
            width: '100%', background: 'transparent', border: 'none',
            color: 'var(--fg)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', textAlign: 'left',
            borderBottom: '1px solid var(--line)',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--fg-mute)',
            }}>
              <IconChart size={18}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>История платежей</div>
              <div style={{ fontSize: 11, color: 'var(--fg-mute)', marginTop: 1 }}>последняя 19.03.2026 · 2 100 ₽</div>
            </div>
            <IconChevron size={16} stroke="var(--fg-dim)"/>
          </button>
          <button onClick={() => (window.toast || (() => {}))('Открываем чат поддержки · @freshvpn_help')} style={{
            width: '100%', background: 'transparent', border: 'none',
            color: 'var(--fg)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', textAlign: 'left',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: 'var(--bg-3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--fg-mute)',
            }}>
              <iconify-icon icon="ph:chat-circle-dots-duotone" width="18" height="18" style={{ display: 'inline-flex' }}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>Поддержка</div>
              <div style={{ fontSize: 11, color: 'var(--fg-mute)', marginTop: 1 }}>@freshvpn_help · ответим быстро</div>
            </div>
            <IconChevron size={16} stroke="var(--fg-dim)"/>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── История платежей ────────────────────────────────────────
function PaymentsScreen({ onBack, accent }) {
  const t = window.toast || (() => {});
  const fmt = (n) => n.toLocaleString('ru-RU').replace(/,/g, ' ');

  const payments = [
    { id: 1, date: '19.03.2026', desc: 'Премиум · 12 мес',           amount: 2100, method: 'Telegram Stars', status: 'paid' },
    { id: 2, date: '14.10.2025', desc: 'Кэшбэк за друга @maria_p',   amount: 62,   method: 'Внутренний счёт', status: 'cashback' },
    { id: 3, date: '12.10.2025', desc: 'Кэшбэк за друга @igor_v',    amount: 1260, method: 'Внутренний счёт', status: 'cashback' },
    { id: 4, date: '08.10.2025', desc: 'Бонус: сообщение об ошибке', amount: 0,    extra: '+14 дней',         method: '—', status: 'bonus' },
    { id: 5, date: '19.03.2025', desc: 'Премиум · 12 мес',           amount: 2100, method: 'СБП',             status: 'paid' },
    { id: 6, date: '01.10.2025', desc: 'Подписка @freshvpn_news',    amount: 0,    extra: '+1 день',          method: '—', status: 'bonus' },
    { id: 7, date: '19.03.2024', desc: 'Премиум · 12 мес',           amount: 2400, method: 'Карта Visa',      status: 'paid' },
  ];

  const total = payments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const cashback = payments.filter(p => p.status === 'cashback').reduce((s, p) => s + p.amount, 0);

  const statusColor = (st) => st === 'paid' ? 'var(--fg)' : st === 'cashback' ? 'var(--accent-strong)' : 'var(--accent-strong)';
  const statusLabel = (st) => st === 'paid' ? 'Оплата' : st === 'cashback' ? 'Кэшбэк' : 'Бонус';

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} aria-label="Назад" style={{
          width: 36, height: 36, borderRadius: 12, background: 'var(--bg-2)',
          border: '1px solid var(--line)', color: 'var(--fg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <IconChevron size={18} stroke="currentColor" style={{ transform: 'rotate(180deg)' }}/>
        </button>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>История платежей</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 16px 16px' }}>
        {/* Summary */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <div style={{
            flex: 1, padding: 14, borderRadius: 'var(--r-lg)',
            background: 'var(--bg-1)', border: '1px solid var(--line)',
          }}>
            <div style={{ fontSize: 10, color: 'var(--fg-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6 }}>Оплачено всего</div>
            <div className="mono" style={{ marginTop: 6, fontSize: 22, fontWeight: 800, letterSpacing: -0.6 }}>
              {fmt(total)} <span style={{ fontSize: 12, color: 'var(--fg-mute)' }}>₽</span>
            </div>
          </div>
          <div style={{
            flex: 1, padding: 14, borderRadius: 'var(--r-lg)',
            background: `linear-gradient(150deg, ${accent}1f, transparent), var(--bg-1)`,
            border: '1px solid var(--accent-line)',
          }}>
            <div style={{ fontSize: 10, color: 'var(--accent-strong)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6 }}>Кэшбэк</div>
            <div className="mono" style={{ marginTop: 6, fontSize: 22, fontWeight: 800, letterSpacing: -0.6, color: 'var(--accent-strong)' }}>
              {fmt(cashback)} <span style={{ fontSize: 12, color: 'var(--fg-mute)' }}>₽</span>
            </div>
          </div>
        </div>

        {/* List */}
        <div style={{ background: 'var(--bg-1)', borderRadius: 'var(--r-lg)', border: '1px solid var(--line)', overflow: 'hidden' }}>
          {payments.map((p, i) => (
            <button key={p.id} onClick={() => t(`${p.desc} · ${p.date} · ${p.amount > 0 ? fmt(p.amount) + ' ₽' : p.extra}`)} style={{
              width: '100%', textAlign: 'left', background: 'transparent', color: 'var(--fg)', border: 'none',
              display: 'grid', gridTemplateColumns: '32px 1fr auto', gap: 12, padding: '12px 14px',
              borderBottom: i < payments.length - 1 ? '1px solid var(--line)' : 'none',
              alignItems: 'center',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9,
                background: p.status === 'paid' ? 'var(--bg-3)' : 'var(--accent-soft)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: statusColor(p.status),
              }}>
                {p.status === 'paid' ? (
                  <iconify-icon icon="ph:credit-card-duotone" width="14" height="14" style={{ display: 'inline-flex' }} />
                ) : p.status === 'cashback' ? (
                  <iconify-icon icon="ph:arrow-counter-clockwise-duotone" width="14" height="14" style={{ display: 'inline-flex' }} />
                ) : (
                  <iconify-icon icon="ph:gift-duotone" width="14" height="14" style={{ display: 'inline-flex' }} />
                )}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{p.desc}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', marginTop: 2 }}>
                  {p.date} · {statusLabel(p.status)} · {p.method}
                </div>
              </div>
              <div className="mono" style={{
                fontSize: 13, fontWeight: 700, color: p.status === 'paid' ? 'var(--fg)' : 'var(--accent-strong)', whiteSpace: 'nowrap',
              }}>
                {p.amount > 0 ? `${p.status === 'paid' ? '−' : '+'}${fmt(p.amount)} ₽` : p.extra}
              </div>
            </button>
          ))}
        </div>

        <button onClick={() => t('PDF-выписка · отправлена в чат')} style={{
          marginTop: 14, width: '100%', padding: '12px', borderRadius: 12,
          background: 'var(--bg-1)', border: '1px solid var(--line)', color: 'var(--fg)',
          fontSize: 13, fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <iconify-icon icon="ph:file-text-duotone" width="16" height="16" style={{ display: 'inline-flex' }} />
          Скачать PDF-выписку
        </button>
      </div>
    </div>
  );
}

// ─── Калькулятор пассивного дохода ───────────────────────────
// Модель: средний чек одного приглашённого = 700 ₽/мес (между Обычным и Премиумом).
// Каждый приглашённый сам приводит ~1.4 человека на 2-й уровень и т. д.
// Текущий ранг определяет % с уровней: l1, l23 (уровни 2-3), для уровней 4-5
// фиксированно 1% и 0.5% соответственно.
function ReferralCalculator({ accent, ranks }) {
  const t = window.toast || (() => {});
  const fmt = (n) => Math.round(n).toLocaleString('ru-RU').replace(/,/g, ' ');

  // Параметры модели
  const ARPU = 700;            // средний чек, ₽/мес
  const BRANCHING = 1.4;       // сколько каждый приглашённый приводит сам
  const DEEP_PCT = [1, 0.5];   // % для 4-го и 5-го уровней (если есть)

  const [mode, setMode] = React.useState('count');   // 'count' | 'goal'
  const [count, setCount] = React.useState(20);      // приглашённых на 1-м уровне
  const [goal, setGoal] = React.useState(10000);     // желаемый доход, ₽/мес

  // По кол-ву приглашённых вычисляем ранг и доход
  const calcByCount = (c) => {
    const rank = [...ranks].reverse().find(r => c >= r.refs) || ranks[0];
    const pct1 = rank.l1;
    const pct23 = rank.l23 || 0;
    const l1 = c;
    const l2 = c * BRANCHING;
    const l3 = l2 * BRANCHING;
    const l4 = l3 * BRANCHING;
    const l5 = l4 * BRANCHING;
    const total = (
      l1 * ARPU * pct1 / 100 +
      l2 * ARPU * pct23 / 100 +
      l3 * ARPU * pct23 / 100 +
      l4 * ARPU * DEEP_PCT[0] / 100 +
      l5 * ARPU * DEEP_PCT[1] / 100
    );
    return { rank, pct1, pct23, levels: [l1, l2, l3, l4, l5], total };
  };

  // По цели подбираем минимальное кол-во приглашённых на 1-м уровне
  const calcByGoal = (g) => {
    let c = 1;
    while (c < 1000 && calcByCount(c).total < g) c++;
    return c;
  };

  const inputCount = mode === 'count' ? count : calcByGoal(goal);
  const result = calcByCount(inputCount);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Header */}
      <div style={{
        padding: 16, borderRadius: 'var(--r-lg)',
        background: `linear-gradient(150deg, ${accent}1f, transparent 60%), var(--bg-1)`,
        border: '1px solid var(--accent-line)',
      }}>
        <div style={{ fontSize: 11, color: 'var(--accent-strong)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6 }}>
          Калькулятор дохода
        </div>
        <div style={{ marginTop: 6, fontSize: 16, fontWeight: 700, letterSpacing: -0.2 }}>
          Сколько вы заработаете на партнёрке?
        </div>
        <div style={{ marginTop: 4, fontSize: 11, color: 'var(--fg-mute)', lineHeight: 1.4 }}>
          Средний чек подписки {ARPU} ₽/мес · каждый друг сам приводит ≈{BRANCHING} человека.
        </div>
      </div>

      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--bg-1)', border: '1px solid var(--line)', borderRadius: 12 }}>
        {[
          { id: 'count', l: 'По числу друзей' },
          { id: 'goal',  l: 'По цели дохода' },
        ].map(m => (
          <button key={m.id} onClick={() => setMode(m.id)} style={{
            flex: 1, padding: '9px 8px', borderRadius: 8, border: 'none',
            background: mode === m.id ? 'var(--accent)' : 'transparent',
            color: mode === m.id ? '#0E0E10' : 'var(--fg-mute)',
            fontSize: 12, fontWeight: 700,
          }}>{m.l}</button>
        ))}
      </div>

      {/* Input */}
      {mode === 'count' ? (
        <div style={{ padding: 16, borderRadius: 'var(--r-lg)', background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ fontSize: 11, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600 }}>
              Друзей на 1-м уровне
            </div>
            <span className="mono" style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent-strong)' }}>{count}</span>
          </div>
          <input type="range" min="1" max="200" value={count} onChange={(e) => setCount(+e.target.value)}
            style={{ width: '100%', marginTop: 10, accentColor: accent }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--fg-dim)', fontFamily: 'var(--font-mono)' }}>
            <span>1</span><span>50</span><span>100</span><span>200</span>
          </div>
        </div>
      ) : (
        <div style={{ padding: 16, borderRadius: 'var(--r-lg)', background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
          <div style={{ fontSize: 11, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600, marginBottom: 8 }}>
            Желаемый доход в месяц
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--bg-2)', borderRadius: 12, border: '1px solid var(--line)' }}>
            <input type="number" min="1000" step="1000" value={goal} onChange={(e) => setGoal(Math.max(1000, +e.target.value || 1000))}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: 'var(--fg)', fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-mono)',
                letterSpacing: -0.5, minWidth: 0,
              }}/>
            <span style={{ fontSize: 14, color: 'var(--fg-mute)', fontWeight: 600 }}>₽/мес</span>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            {[5000, 10000, 25000, 50000, 100000].map(g => (
              <button key={g} onClick={() => setGoal(g)} style={{
                padding: '6px 10px', borderRadius: 99,
                background: goal === g ? 'var(--accent-soft)' : 'var(--bg-2)',
                border: `1px solid ${goal === g ? 'var(--accent-line)' : 'var(--line)'}`,
                color: goal === g ? 'var(--accent-strong)' : 'var(--fg-mute)',
                fontSize: 11, fontWeight: 600, fontFamily: 'inherit',
              }}>{fmt(g)} ₽</button>
            ))}
          </div>
        </div>
      )}

      {/* Result hero */}
      <div style={{
        padding: 18, borderRadius: 'var(--r-xl)',
        background: `linear-gradient(160deg, ${accent}28, transparent 60%), var(--bg-1)`,
        border: `1.5px solid var(--accent-line)`,
      }}>
        <div style={{ fontSize: 11, color: 'var(--accent-strong)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.6 }}>
          {mode === 'count' ? 'Ваш прогноз дохода' : `Чтобы получать ${fmt(goal)} ₽/мес`}
        </div>
        {mode === 'count' ? (
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span className="mono" style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1 }}>{fmt(result.total)}</span>
            <span style={{ fontSize: 16, color: 'var(--fg-mute)', fontWeight: 600 }}>₽/мес</span>
          </div>
        ) : (
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span className="mono" style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1 }}>{inputCount}</span>
            <span style={{ fontSize: 14, color: 'var(--fg-mute)', fontWeight: 600 }}>друзей на 1-м уровне</span>
          </div>
        )}
        <div style={{ marginTop: 6, fontSize: 12, color: 'var(--fg-mute)' }}>
          ≈ {fmt(result.total * 12)} ₽ в год · {fmt(result.total / 30)} ₽ в день
        </div>
        <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <RankBadge name={result.rank.name} accent={accent} size={28}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700 }}>Уровень: {result.rank.name}</div>
            <div style={{ fontSize: 10, color: 'var(--fg-mute)' }}>кэшбэк {result.pct1}% с 1-го круга{result.pct23 > 0 ? ` · +${result.pct23}% с 2-3 круга` : ''}</div>
          </div>
        </div>
      </div>

      {/* Breakdown by levels */}
      <div style={{ padding: 14, borderRadius: 'var(--r-lg)', background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
        <div style={{ fontSize: 11, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600, marginBottom: 10 }}>
          Разбивка по уровням
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {result.levels.map((cnt, i) => {
            const pct = i === 0 ? result.pct1 : (i <= 2 ? result.pct23 : DEEP_PCT[i - 3]);
            const earn = cnt * ARPU * pct / 100;
            const isActive = pct > 0;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 5, flexShrink: 0,
                  background: isActive ? 'var(--bg-3)' : 'transparent',
                  border: `1px solid ${isActive ? 'var(--line-strong)' : 'var(--line)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700, color: isActive ? 'var(--accent-strong)' : 'var(--fg-dim)',
                  fontFamily: 'var(--font-mono)',
                }}>{i + 1}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, opacity: isActive ? 1 : 0.55 }}>
                    {Math.round(cnt)} чел. <span className="mono" style={{ color: 'var(--fg-mute)', fontWeight: 500 }}>· {pct}%</span>
                  </div>
                  <div style={{ height: 5, background: 'var(--bg-3)', borderRadius: 3, overflow: 'hidden', marginTop: 4 }}>
                    <div style={{
                      width: `${Math.min(100, (earn / result.total) * 100)}%`,
                      height: '100%',
                      background: isActive ? `linear-gradient(90deg, ${accent}, #1F7A3A)` : 'var(--bg-3)',
                      borderRadius: 3,
                    }}/>
                  </div>
                </div>
                <span className="mono" style={{
                  fontSize: 12, fontWeight: 700,
                  color: isActive ? 'var(--accent-strong)' : 'var(--fg-dim)',
                  width: 80, textAlign: 'right',
                }}>{fmt(earn)} ₽</span>
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={() => t('Готово · ссылка для приглашений скопирована', 't.me/freshvpn_bot?start=alex_n')} style={{
        width: '100%', padding: '14px 16px', borderRadius: 14, border: 'none',
        background: accent, color: '#0E0E10', fontSize: 14, fontWeight: 800,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        <IconCopy size={16} stroke="#0E0E10"/>
        Скопировать ссылку и пригласить
      </button>

      <div style={{
        padding: 12, borderRadius: 12,
        background: 'rgba(232,193,90,0.06)', border: '1px solid rgba(232,193,90,0.18)',
        fontSize: 11, color: 'var(--fg-mute)', lineHeight: 1.5,
      }}>
        Расчёт прогноза. Реальные выплаты зависят от того, какие тарифы выбрали друзья и
        насколько активно они приводят своих знакомых. Минимум для вывода — 100 ₽.
      </div>
    </div>
  );
}

// ─── Главная (game home с колесом фортуны, v3) ──────────────────
// Focal point — WheelOfFortune по центру + free-spin countdown chip + recent prizes list.
// XP bar и side ribbons mini-games рендерятся SuperAppShell'ом (не здесь).
function MainHomeScreen({ accent = '#B8E641', xpCurrent = 320, xpTarget = 500 }) {
  const recent = [
    { who: '@alex_p',    prize: '1 000 Кристаллов', time: '2 мин',  rare: true },
    { who: '@maria_k',   prize: '50 Кристаллов',    time: '5 мин',  rare: false },
    { who: '@dmitri_v',  prize: '+3 дня VPN',       time: '8 мин',  rare: false },
    { who: '@you',       prize: 'Premium 7 дней',   time: '12 мин', rare: true,  you: true },
  ];
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px 90px', position: 'relative' }}>
      {/* Free-spin chip сверху wheel */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
        <div className="freespin-chip">
          <iconify-icon icon="ph:clock-countdown-fill" width="13" height="13" style={{ display: 'inline-flex' }}/>
          <span>Бесплатное вращение через <b className="mono">4ч 22м</b></span>
        </div>
      </div>

      {/* Колесо фортуны */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14, position: 'relative' }}>
        <WheelOfFortune size={260} accent={accent}/>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <Stat label="Спинов сегодня" value="0" unit="/1" accent={accent}/>
        <Stat label="Выиграл сегодня" value="0" unit="Кр"/>
      </div>

      {/* Recent prizes (social proof) */}
      <div style={{ marginTop: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, padding: '0 4px' }}>
          <div style={{ fontSize: 11, color: 'var(--fg-mute)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 700 }}>Недавние выигрыши</div>
          <button onClick={() => window.toast && window.toast('История — Этап 2')} style={{
            background: 'transparent', border: 'none', color: 'var(--accent-strong)', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}>Все →</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {recent.map((r, i) => (
            <div key={i} className={`recent-prize ${r.you ? 'recent-prize-you' : ''} ${r.rare ? 'recent-prize-rare' : ''}`}>
              <div className="recent-prize-avatar" style={{ background: r.you ? `linear-gradient(135deg, ${accent}, #1F7A3A)` : 'var(--bg-3)' }}>
                {r.who.replace('@', '').charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{r.who}</div>
                <div style={{ fontSize: 10.5, color: 'var(--fg-mute)' }}>{r.prize}</div>
              </div>
              <div style={{ fontSize: 10, color: 'var(--fg-dim)' }}>{r.time}</div>
              {r.rare && <iconify-icon icon="ph:star-fill" width="13" height="13" style={{ display: 'inline-flex', color: '#FFB85C', marginLeft: 6 }}/>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Задания + мини-игры (заглушка Этап 0; реализация Этап 2) ───
// Список online + offline quests + mini-games grid.
function TasksStubScreen({ accent = '#B8E641' }) {
  const quests = [
    { label: 'Подпишись на @freshvpn_news',  reward: '+50 Кр',  cat: 'online',  done: false },
    { label: 'Сыграй в мини-игру 3 раза',     reward: '+100 Кр', cat: 'online',  progress: '1/3' },
    { label: 'Пригласи друга',                reward: '+5 дн VPN', cat: 'online', done: false },
    { label: 'Сканируй QR на упаковке',       reward: '+200 Кр + XP', cat: 'offline', done: false, locked: true },
  ];
  const games = [
    { label: 'Путешествие на поезде', icon: 'ph:game-controller-fill', tag: 'NEW',   color: '#5BA8FF' },
    { label: 'Слайд-Куб',              icon: 'ph:cube-fill',            tag: 'X2',    color: '#B8E641' },
    { label: 'Лайм-Рифм',              icon: 'ph:music-notes-fill',     tag: null,    color: '#C77AFF' },
    { label: 'Угадай-Источник',        icon: 'ph:question-fill',        tag: 'Daily', color: '#FFB85C' },
  ];
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 90px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4 }} className="display">Задания</div>
          <div style={{ fontSize: 12, color: 'var(--fg-mute)', marginTop: 2 }}>Заработай Кристаллы + бонусные дни VPN</div>
        </div>
      </div>

      {/* Mini-games grid */}
      <div style={{ fontSize: 11, color: 'var(--fg-mute)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 700, marginBottom: 8 }}>Мини-игры</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 18 }}>
        {games.map((g, i) => (
          <button key={i} onClick={() => window.toast && window.toast(`${g.label} — Этап 2`)} className="game-card">
            <div className="game-card-icon" style={{
              background: `linear-gradient(160deg, ${g.color}, ${g.color}88)`,
              boxShadow: `0 4px 12px ${g.color}55`,
            }}>
              <iconify-icon icon={g.icon} width="22" height="22" style={{ display: 'inline-flex', color: '#fff' }}/>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, textAlign: 'left' }}>{g.label}</div>
            {g.tag && <span className="game-card-tag" style={{ background: g.color }}>{g.tag}</span>}
          </button>
        ))}
      </div>

      {/* Quests list */}
      <div style={{ fontSize: 11, color: 'var(--fg-mute)', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 700, marginBottom: 8 }}>Daily Quests</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {quests.map((q, i) => (
          <button key={i} onClick={() => window.toast && window.toast(`${q.label} — Этап 2`)} className={`quest-row ${q.locked ? 'quest-row-locked' : ''}`}>
            <iconify-icon icon={q.cat === 'offline' ? 'ph:qr-code-duotone' : 'ph:check-circle-duotone'}
              width="20" height="20" style={{ display: 'inline-flex', color: q.locked ? 'var(--fg-dim)' : 'var(--accent-strong)', flexShrink: 0 }}/>
            <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{q.label}</div>
              <div style={{ fontSize: 10.5, color: 'var(--fg-mute)', marginTop: 1 }}>
                {q.reward} {q.progress && `· ${q.progress}`}
                {q.locked && ' · разблокируется через partners (Wave 3)'}
              </div>
            </div>
            <IconChevron size={14} stroke="var(--fg-dim)"/>
          </button>
        ))}
      </div>

      <div className="module-stub-note" style={{ marginTop: 14 }}>
        <iconify-icon icon="ph:info-duotone" width="16" height="16" style={{ display: 'inline-flex', color: 'var(--fg-mute)', flexShrink: 0 }}/>
        <span>Каркас Этап 0. Полные mini-games (Поезд + 3 других) + quest engine + Premium subscription — Этап 2.</span>
      </div>
    </div>
  );
}

// ─── Розыгрыши (заглушка Этап 0; полная реализация в Этап 1) ────
// ─── Lottery Module (Этап 1 — full implementation, 2026-05-16) ──
// In-module routing: subPage = 'feed' | 'detail' | 'joined' | 'winners' | 'create'.
// 6 mock розыгрышей × 3 типа: 3 partner-sponsored + 2 community + 1 brand-FMCG (Wave 3 placeholder).
// Commit-reveal verification (visual-only, реальный crypto — backend Wave 1+).

const LOTTERY_MOCK = [
  {
    id: 'spotify-12m',
    type: 'partner', title: 'Spotify Premium', prize: '12 месяцев Spotify Premium Family',
    prizeIcon: '🎵', accentColor: '#1DB954',
    ch: '@spotify_official', channelTitle: 'Spotify Россия', channelEmoji: '🎵',
    conditions: [
      { type: 'subscribe', target: '@spotify_official', label: 'Подпишись на @spotify_official' },
      { type: 'subscribe', target: '@fresh_super_app', label: 'Подпишись на @fresh_super_app' },
    ],
    extras: [
      { type: 'invite', label: 'Пригласи 3 друзей', tickets: 3, max: 10 },
      { type: 'boost',  label: 'Забусти канал @spotify_official', tickets: 5 },
    ],
    deadline: '3 дн 12 ч', deadlineMs: Date.now() + 3.5 * 24 * 3600 * 1000,
    joined: 1283, maxWinners: 5, status: 'active', verifySeed: 'a8f3e1...d29b',
  },
  {
    id: 'kinopoisk-6m',
    type: 'partner', title: 'Кинопоиск HD', prize: 'Подписка Кинопоиск HD на 6 месяцев',
    prizeIcon: '🎬', accentColor: '#FF6B6B',
    ch: '@kinopoisk_hd', channelTitle: 'Кинопоиск', channelEmoji: '🎬',
    conditions: [{ type: 'subscribe', target: '@kinopoisk_hd', label: 'Подпишись на @kinopoisk_hd' }],
    extras: [{ type: 'story', label: 'Поделись историей в TG', tickets: 2 }],
    deadline: '5 дн', deadlineMs: Date.now() + 5 * 24 * 3600 * 1000,
    joined: 847, maxWinners: 10, status: 'active', verifySeed: 'b7c2d4...f1a8',
  },
  {
    id: 'yandex-plus-12m',
    type: 'partner', title: 'Яндекс Плюс', prize: 'Яндекс Плюс на 12 мес + 5000 баллов',
    prizeIcon: '⭐', accentColor: '#FFCC00',
    ch: '@yandex_plus', channelTitle: 'Яндекс Плюс', channelEmoji: '⭐',
    conditions: [
      { type: 'subscribe', target: '@yandex_plus', label: 'Подпишись на @yandex_plus' },
      { type: 'subscribe', target: '@fresh_super_app', label: 'Подпишись на @fresh_super_app' },
    ],
    extras: [
      { type: 'invite', label: 'Пригласи друга', tickets: 1, max: 5 },
      { type: 'boost',  label: 'Забусти @yandex_plus', tickets: 3 },
      { type: 'story',  label: 'Поделись в сторис', tickets: 2 },
    ],
    deadline: '7 дн', deadlineMs: Date.now() + 7 * 24 * 3600 * 1000,
    joined: 2156, maxWinners: 20, status: 'active', verifySeed: 'c4e9a1...8b3d',
  },
  {
    id: 'community-iphone',
    type: 'community', title: 'iPhone 16 Pro', prize: 'iPhone 16 Pro 256GB Titanium',
    prizeIcon: '📱', accentColor: '#A8D63A',
    ch: '@tech_blog_pro', channelTitle: 'Tech Blog Pro', channelEmoji: '📱',
    conditions: [{ type: 'subscribe', target: '@tech_blog_pro', label: 'Подпишись на @tech_blog_pro' }],
    extras: [{ type: 'invite', label: 'Пригласи друга — +1 билет', tickets: 1, max: 20 }],
    deadline: '12 дн', deadlineMs: Date.now() + 12 * 24 * 3600 * 1000,
    joined: 4892, maxWinners: 1, status: 'active', verifySeed: 'd1f7b3...92ac',
  },
  {
    id: 'community-1m-stars',
    type: 'community', title: '1000 Telegram Stars', prize: '1 000 ⭐ Telegram Stars',
    prizeIcon: '⭐', accentColor: '#5BE2D6',
    ch: '@deal_hunter', channelTitle: 'Deal Hunter', channelEmoji: '🛒',
    conditions: [
      { type: 'subscribe', target: '@deal_hunter', label: 'Подпишись на @deal_hunter' },
      { type: 'subscribe', target: '@fresh_super_app', label: 'Подпишись на @fresh_super_app' },
    ],
    extras: [],
    deadline: '2 дн', deadlineMs: Date.now() + 2 * 24 * 3600 * 1000,
    joined: 376, maxWinners: 10, status: 'active', verifySeed: 'e2c8f4...a1d7',
  },
  {
    id: 'coca-cola-qr',
    type: 'brand-qr', title: 'Coca-Cola QR-конкурс', prize: 'Поездка на финал РФПЛ + мерч',
    prizeIcon: '🥤', accentColor: '#FF0000',
    ch: '@cocacola_ru', channelTitle: 'Coca-Cola', channelEmoji: '🥤',
    conditions: [{ type: 'scan-qr', target: 'Coca-Cola 0.5L', label: 'Сканируй QR на упаковке Coca-Cola 0.5L' }],
    extras: [],
    deadline: 'Wave 3', deadlineMs: 0,
    joined: 0, maxWinners: 100, status: 'wave3-placeholder', verifySeed: '—',
  },
];

const PARTNER_TYPE_LABEL = { partner: 'PARTNER', community: 'COMMUNITY', 'brand-qr': 'BRAND QR', mine: 'ВАШ' };
const PARTNER_TYPE_COLOR = { partner: '#B8E641', community: '#5BE2D6', 'brand-qr': '#FF6B6B', mine: '#FFB85C' };

// Относительный дедлайн «N дн M ч» из ISO-даты окончания.
function relDeadline(endIso) {
  if (!endIso) return 'скоро';
  const ms = new Date(endIso).getTime() - Date.now();
  if (isNaN(ms) || ms <= 0) return 'скоро';
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  if (d > 0) return h > 0 ? `${d} дн ${h} ч` : `${d} дн`;
  return `${h} ч`;
}

// Конвертация состояния мастера (LotteryCreateWizard data) → объект розыгрыша для ленты.
function wizardToLottery(data) {
  const ch = (data.publishChannels && data.publishChannels[0])
    || (data.subscribeChannels && data.subscribeChannels[0]) || '@fresh_super_app';
  const conditions = (data.subscribeChannels || []).filter(Boolean)
    .map(c => ({ type: 'subscribe', target: c, label: `Подпишись на ${c}` }));
  const extras = [];
  if (data.enableBoost)  extras.push({ type: 'boost',  label: `Забусти ${data.boostChannel}`, tickets: data.boostTickets || 1 });
  if (data.enableInvite) extras.push({ type: 'invite', label: 'Пригласи друга', tickets: data.inviteTickets || 1, max: data.maxInvites || 0 });
  if (data.enableStory)  extras.push({ type: 'story',  label: 'Поделись в сторис', tickets: data.storyTickets || 1 });
  const seed = (Math.random().toString(16) + '000000').slice(2, 8) + '...' + (Math.random().toString(16) + '0000').slice(2, 6);
  // Свежий розыгрыш — честные нули. Статистика наполняется по мере участников.
  const stats = {
    kpiTrend: { participants: 0, tickets: 0, views: 0, subs: 0 },
    participantsDaily: [],
    forecastFinal: 0,
    funnel: { views: 0, opened: 0, started: 0, captcha: 0, conditions: 0, joined: 0 },
    ticketsBySource: { subscribe: 0, invite: 0, boost: 0, story: 0 },
    channelGrowth: (data.subscribeChannels || []).filter(Boolean).map(c => ({ ch: c, before: 0, after: 0, spark: [] })),
    invitesSent: 0, invitesJoined: 0, kFactor: 0, topInviters: [],
    postForwards: 0, reactions: [],
    premiumPct: 0, platforms: {}, languages: [], audienceNew: 0, audienceReturning: 0,
    heatmap: [],
    protection: { captchaShown: 0, captchaPassed: 0, captchaFailed: 0, filteredAge: 0, filteredNoProfile: 0 },
    cleanScore: 0,
    retention: { d1: 0, d3: 0, d7: 0 },
    prizeBudget: 0,
    health: { score: 0, factors: [] },
  };
  return {
    id: 'my-' + Date.now(),
    type: 'mine',
    title: data.title || 'Мой розыгрыш',
    prize: data.title || 'Приз розыгрыша',
    description: data.description || '',
    prizeIcon: '🎁',
    accentColor: '#FFB85C',
    ch, channelTitle: ch.replace(/^@/, ''), channelEmoji: '🎁',
    bannerUrl: data.bannerUrl || '',
    conditions, extras,
    deadline: relDeadline(data.endDate),
    deadlineMs: data.endDate ? new Date(data.endDate).getTime() : Date.now() + 7 * 86400000,
    joined: 0,
    maxWinners: data.winners || 1,
    status: 'active',
    verifySeed: seed,
    mine: true,
    wizardData: { ...data },   // снимок мастера — для вкладки «Пост» (PreviewCard)
    stats,
  };
}

// Демо-розыгрыш организатора — наполненная статистика, чтобы дизайн стат-экрана был виден сразу.
// Реальные созданные через мастер розыгрыши стартуют с честными нулями (см. wizardToLottery).
const DEMO_END = new Date(Date.now() + 4 * 86400000 + 9 * 3600000);
const DEMO_MY_LOTTERY = {
  id: 'my-demo',
  type: 'mine',
  title: 'AirPods Pro 2',
  prize: 'Apple AirPods Pro 2 (USB-C)',
  description: '🎧 Разыгрываем AirPods Pro 2!\n\n✅ Условия: подпишись на каналы и жми «Участвовать».\n🍀 Победителей: 3 — выбор случайный и прозрачный.',
  prizeIcon: '🎧',
  accentColor: '#FFB85C',
  ch: '@my_tech_channel', channelTitle: 'my_tech_channel', channelEmoji: '🎧',
  bannerUrl: '',
  conditions: [
    { type: 'subscribe', target: '@my_tech_channel', label: 'Подпишись на @my_tech_channel' },
    { type: 'subscribe', target: '@fresh_super_app', label: 'Подпишись на @fresh_super_app' },
  ],
  extras: [
    { type: 'invite', label: 'Пригласи друга', tickets: 1, max: 5 },
    { type: 'boost',  label: 'Забусти @my_tech_channel', tickets: 2 },
  ],
  deadline: relDeadline(DEMO_END.toISOString()),
  deadlineMs: DEMO_END.getTime(),
  joined: 340, maxWinners: 3, status: 'active',
  verifySeed: 'f3a91c...7d2e', mine: true,
  wizardData: {
    type: 'standard', title: 'AirPods Pro 2',
    description: '🎧 Разыгрываем AirPods Pro 2!\n\n✅ Условия: подпишись на каналы и жми «Участвовать».\n🍀 Победителей: 3 — выбор случайный и прозрачный.',
    lang: 'ru', bannerUrl: '',
    buttonText: 'Участвовать', buttonStyle: 'default',
    subscribeChannels: ['@my_tech_channel', '@fresh_super_app'],
    publishChannels: ['@my_tech_channel'], publishTouched: true,
    pinPost: true, silentPost: false, resultsMode: 'inline',
    startNow: true, startDate: '', endDate: DEMO_END.toISOString().slice(0, 16),
    winners: 3, claimDeadline: 48, autoReroll: true, contact: '@my_tech_admin',
    enableBoost: true, boostChannel: '@my_tech_channel', boostTickets: 2, boostCap: 4,
    enableInvite: true, inviteTickets: 1, maxInvites: 5,
    enableStory: false, storyTickets: 1,
    captcha: true,
  },
  stats: {
    kpiTrend: { participants: 67, tickets: 98, views: 1850, subs: 73 },
    participantsDaily: [3, 7, 9, 12, 15, 11, 19, 24, 21, 33, 41, 38, 52, 55],
    forecastFinal: 1180,
    funnel: { views: 12400, opened: 1820, started: 760, captcha: 690, conditions: 410, joined: 340 },
    ticketsBySource: { subscribe: 340, invite: 156, boost: 48, story: 0 },
    channelGrowth: [
      { ch: '@my_tech_channel', before: 8200, after: 8487, spark: [8200, 8215, 8240, 8278, 8330, 8395, 8487] },
      { ch: '@fresh_super_app', before: 12400, after: 12494, spark: [12400, 12409, 12421, 12438, 12455, 12476, 12494] },
    ],
    invitesSent: 213, invitesJoined: 156, kFactor: 0.46,
    topInviters: [
      { name: 'А****й П.', count: 14 }, { name: 'М***я И.', count: 9 },
      { name: 'Д***н К.', count: 7 }, { name: 'Е***а С.', count: 6 },
      { name: 'И***н Р.', count: 5 },
    ],
    postForwards: 312,
    reactions: [{ e: '🔥', n: 165 }, { e: '❤️', n: 72 }, { e: '🏆', n: 37 }, { e: '✅', n: 9 }],
    premiumPct: 23,
    platforms: { ios: 47, android: 39, desktop: 11, web: 3 },
    languages: [{ code: 'RU', n: 78 }, { code: 'UK', n: 11 }, { code: 'EN', n: 7 }, { code: 'Другие', n: 4 }],
    audienceNew: 71, audienceReturning: 29,
    heatmap: (() => {
      const g = [];
      for (let d = 0; d < 7; d++) {
        const row = [];
        for (let h = 0; h < 24; h++) {
          let base = h < 7 ? 1 : h < 12 ? 5 : h < 17 ? 8 : h < 23 ? 15 : 4;
          if (d >= 5) base = Math.round(base * 1.3);
          row.push(Math.max(0, base + ((d * 7 + h) % 5) - 2));
        }
        g.push(row);
      }
      return g;
    })(),
    protection: { captchaShown: 521, captchaPassed: 448, captchaFailed: 73, filteredAge: 21, filteredNoProfile: 14 },
    cleanScore: 86,
    retention: { d1: 96, d3: 91, d7: 84 },
    prizeBudget: 24000,
    prev: { participants: 210, tickets: 318, subs: 240, views: 9100 },
    health: { score: 80, factors: [
      { label: 'Скорость набора', val: 82 },
      { label: 'Виральность', val: 69 },
      { label: 'Чистота аудитории', val: 86 },
      { label: 'Удержание D7', val: 84 },
    ] },
  },
};

function LotteryModule({ accent = '#B8E641', myLotteries = [], setMyLotteries = () => {} }) {
  const [subPage, setSubPage] = React.useState('feed');
  const [currentId, setCurrentId] = React.useState(null);
  const [joinedIds, setJoinedIds] = React.useState({});
  const [feedFilter, setFeedFilter] = React.useState('all');

  const goTo = (page, id = null) => { setSubPage(page); setCurrentId(id); };
  const goBack = () => { setSubPage('feed'); setCurrentId(null); };
  const current = [...myLotteries, ...LOTTERY_MOCK].find(l => l.id === currentId);
  const markJoined = (id) => setJoinedIds(j => ({ ...j, [id]: true }));

  // «Опубликовать» в мастере → конвертируем data → розыгрыш, добавляем в свои,
  // открываем ленту на фильтре «Запущенные».
  const publish = (wizardData) => {
    setMyLotteries(m => [wizardToLottery(wizardData), ...m]);
    setFeedFilter('created');
    setSubPage('feed'); setCurrentId(null);
    window.toast && window.toast('🎉 Розыгрыш запущен!');
  };

  // Правки настроек запущенного розыгрыша (вкладка «Пост» → «Применить»).
  const updateLottery = (id, wd) => {
    setMyLotteries(m => m.map(x => x.id === id ? applyWizardEdits(x, wd) : x));
  };

  if (subPage === 'detail' && current) {
    if (current.mine) {
      return <LotteryOwnerScreen lottery={current} accent={accent} onBack={goBack}
        onUpdate={(wd) => updateLottery(current.id, wd)}/>;
    }
    return <LotteryDetailScreen lottery={current} accent={accent} joined={!!joinedIds[current.id]}
      onBack={goBack}
      onJoin={() => { markJoined(current.id); goTo('joined', current.id); }}
      onViewWinners={() => goTo('winners', current.id)}/>;
  }
  if (subPage === 'joined' && current) {
    return <LotteryJoinedScreen lottery={current} accent={accent}
      onBack={() => goTo('detail', current.id)}
      onViewWinners={() => goTo('winners', current.id)}/>;
  }
  if (subPage === 'winners' && current) {
    return <LotteryWinnersScreen lottery={current} accent={accent}
      onBack={() => goTo('detail', current.id)}/>;
  }
  if (subPage === 'create') {
    return <LotteryCreateWizard accent={accent} onClose={goBack} onPublish={publish}/>;
  }
  // default: feed
  return <LotteryFeedScreen accent={accent} joinedIds={joinedIds} myLotteries={myLotteries}
    filter={feedFilter} setFilter={setFeedFilter}
    onOpen={(id) => goTo('detail', id)}
    onCreate={() => goTo('create')}/>;
}

function LotteryFeedScreen({ accent, joinedIds = {}, myLotteries = [], filter, setFilter, onOpen, onCreate }) {
  const mockActive = LOTTERY_MOCK.filter(l => l.status === 'active');
  const activeAll = [...myLotteries, ...mockActive];
  const filtered = filter === 'mine' ? activeAll.filter(l => joinedIds[l.id])
                 : filter === 'created' ? myLotteries
                 : filter === 'finished' ? LOTTERY_MOCK.filter(l => l.status === 'finished' || l.status === 'wave3-placeholder')
                 : activeAll;
  const featured = mockActive[0];
  const totalLive = activeAll.length;

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 90px', position: 'relative' }}>
      {/* Header — title + Create CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4 }} className="display">Розыгрыши</div>
          <div style={{ fontSize: 11.5, color: 'var(--fg-mute)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF6B6B', animation: 'pulse-dot 1.6s ease-in-out infinite' }}/>
            <span>{totalLive} активных сейчас</span>
          </div>
        </div>
        <button onClick={onCreate} className="lottery-create-btn">
          <iconify-icon icon="ph:plus-bold" width="14" height="14" style={{ display: 'inline-flex' }}/>
          Создать
        </button>
      </div>

      {/* Featured hero banner */}
      {featured && (
        <button onClick={() => onOpen(featured.id)} className="lottery-hero-banner" style={{ '--hero-accent': featured.accentColor }}>
          <div className="lottery-hero-glow"/>
          <div className="lottery-hero-content">
            <div className="lottery-hero-badge">🔥 FEATURED</div>
            <div className="lottery-hero-prize-emoji">{featured.prizeIcon}</div>
            <div className="lottery-hero-prize-text">{featured.prize}</div>
            <div className="lottery-hero-meta">
              <span className="lottery-hero-channel">{featured.channelEmoji} {featured.ch}</span>
              <span className="lottery-hero-countdown">⏰ {featured.deadline}</span>
            </div>
            <div className="lottery-hero-cta">Участвовать → {featured.joined.toLocaleString('ru-RU')} уже</div>
          </div>
        </button>
      )}

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 12, marginTop: 14, overflowX: 'auto' }}>
        <Chip active={filter === 'all'} onClick={() => setFilter('all')}>Все ({activeAll.length})</Chip>
        <Chip active={filter === 'created'} onClick={() => setFilter('created')}>Запущенные ({myLotteries.length})</Chip>
        <Chip active={filter === 'mine'} onClick={() => setFilter('mine')}>Мои подписки ({Object.keys(joinedIds).length})</Chip>
        <Chip active={filter === 'finished'} onClick={() => setFilter('finished')}>Завершённые</Chip>
      </div>

      {/* Cards list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((l) => (
          <button key={l.id} onClick={() => onOpen(l.id)} className="lottery-card" style={{ '--card-accent': l.accentColor }}>
            <div className="lottery-card-left">
              <div className="lottery-card-prize-emoji">{l.prizeIcon}</div>
              {joinedIds[l.id] && <div className="lottery-card-joined-badge">✓</div>}
            </div>
            <div className="lottery-card-body">
              <div className="lottery-card-channel">
                <span className="lottery-card-channel-emoji">{l.channelEmoji}</span>
                <span>{l.ch}</span>
                <span className="lottery-card-type-badge" style={{ background: PARTNER_TYPE_COLOR[l.type] + '22', color: PARTNER_TYPE_COLOR[l.type] }}>
                  {PARTNER_TYPE_LABEL[l.type]}
                </span>
              </div>
              <div className="lottery-card-prize">{l.prize}</div>
              <div className="lottery-card-meta">
                <span className="lottery-card-meta-item">
                  <iconify-icon icon="ph:clock-duotone" width="11" height="11" style={{ display: 'inline-flex', marginRight: 3 }}/>
                  {l.deadline}
                </span>
                <span className="lottery-card-meta-item">
                  <iconify-icon icon="ph:users-duotone" width="11" height="11" style={{ display: 'inline-flex', marginRight: 3 }}/>
                  {l.joined.toLocaleString('ru-RU')}
                </span>
                <span className="lottery-card-meta-item">
                  <iconify-icon icon="ph:trophy-duotone" width="11" height="11" style={{ display: 'inline-flex', marginRight: 3 }}/>
                  {l.maxWinners} поб.
                </span>
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: 30, textAlign: 'center', color: 'var(--fg-mute)', fontSize: 13 }}>
            {filter === 'mine' ? 'Вы пока не участвуете ни в одном розыгрыше'
              : filter === 'created' ? 'Вы пока не запускали розыгрышей. Нажмите «Создать».'
              : 'Здесь пока ничего нет'}
          </div>
        )}
      </div>

      <div className="module-stub-note" style={{ marginTop: 16 }}>
        <iconify-icon icon="ph:shield-check-duotone" width="16" height="16" style={{ display: 'inline-flex', color: accent, flexShrink: 0 }}/>
        <span>Все розыгрыши проходят commit-reveal verification. Победители выбираются прозрачно — seed публикуется заранее.</span>
      </div>
    </div>
  );
}

// ─── Участницкий флоу: живой таймер, count-up, соц-тикер (v60) ───
function LotteryCountdown({ deadlineMs, compact = false }) {
  const [now, setNow] = React.useState(() => Date.now());
  React.useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, (deadlineMs || 0) - now);
  if (diff === 0) return <div className="lottery-countdown ended">Розыгрыш завершён</div>;
  const units = [
    { v: Math.floor(diff / 86400000), l: 'дн' },
    { v: Math.floor((diff % 86400000) / 3600000), l: 'ч' },
    { v: Math.floor((diff % 3600000) / 60000), l: 'мин' },
    { v: Math.floor((diff % 60000) / 1000), l: 'сек' },
  ];
  const urgent = diff < 86400000;
  return (
    <div className={`lottery-countdown${compact ? ' compact' : ''}${urgent ? ' urgent' : ''}`}>
      {units.map((u, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="lottery-cd-sep">:</span>}
          <div className="lottery-cd-unit">
            <div className="lottery-cd-num">{String(u.v).padStart(2, '0')}</div>
            <div className="lottery-cd-label">{u.l}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

function useCountUp(target, dur = 900) {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    if (!target) { setN(0); return; }
    const start = Date.now();
    setN(0);
    const iv = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / dur);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p >= 1) clearInterval(iv);
    }, 40);
    return () => clearInterval(iv);
  }, [target]);
  return n;
}

const LOTTERY_TICKER = [
  { who: 'Анна К.', verb: 'вступила' },
  { who: 'Дмитрий П.', verb: 'вступил' },
  { who: 'Мария С.', verb: 'вступила' },
  { who: 'Иван Л.', verb: 'вступил' },
  { who: 'Елена В.', verb: 'вступила' },
  { who: 'Сергей М.', verb: 'вступил' },
  { who: 'Ольга Т.', verb: 'вступила' },
  { who: 'Никита Р.', verb: 'вступил' },
];

function LotteryJoinTicker({ joined }) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI(x => x + 1), 2600);
    return () => clearInterval(t);
  }, []);
  const e = LOTTERY_TICKER[i % LOTTERY_TICKER.length];
  return (
    <div className="lottery-ticker">
      <span className="lottery-ticker-dot"/>
      <span key={i} className="lottery-ticker-text"><b>{e.who}</b> {e.verb} · только что</span>
      <span className="lottery-ticker-hot">🔥 +{18 + joined % 42}/час</span>
    </div>
  );
}

function LotteryDetailScreen({ lottery: l, accent, joined, onBack, onJoin, onViewWinners }) {
  const [conditionsMet, setConditionsMet] = React.useState({});
  const metCount = l.conditions.filter(c => conditionsMet[c.target]).length;
  const allConditionsMet = metCount === l.conditions.length;
  const joinedCount = useCountUp(l.joined);
  const odds = l.joined > 0 ? Math.max(1, Math.round(l.joined / Math.max(1, l.maxWinners))) : 0;
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 100px', position: 'relative' }}>
      {/* Header with back */}
      <div className="lottery-detail-topbar">
        <button onClick={onBack} className="lottery-back-btn">
          <iconify-icon icon="ph:caret-left-bold" width="18" height="18" style={{ display: 'inline-flex' }}/>
        </button>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-mute)' }}>Розыгрыш</span>
        <button onClick={() => window.toast && window.toast('Ссылка скопирована')} className="lottery-share-btn">
          <iconify-icon icon="ph:share-network-duotone" width="16" height="16" style={{ display: 'inline-flex' }}/>
        </button>
      </div>

      {/* Hero prize */}
      <div className="lottery-detail-hero" style={{ '--hero-accent': l.accentColor }}>
        <div className="lottery-detail-hero-glow"/>
        <div className="lottery-detail-live"><span className="lottery-live-dot"/>Идёт сейчас</div>
        <div className="lottery-detail-hero-emoji lottery-hero-float">{l.prizeIcon}</div>
        <div className="lottery-detail-hero-title">{l.title}</div>
        <div className="lottery-detail-hero-prize">{l.prize}</div>
        <div className="lottery-detail-hero-meta">
          <span>{l.channelEmoji} {l.ch}</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span style={{ background: PARTNER_TYPE_COLOR[l.type] + '22', color: PARTNER_TYPE_COLOR[l.type], padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700 }}>
            {PARTNER_TYPE_LABEL[l.type]}
          </span>
        </div>
        <div className="lottery-detail-cd-wrap">
          <div className="lottery-cd-caption">До конца розыгрыша</div>
          <LotteryCountdown deadlineMs={l.deadlineMs}/>
        </div>
      </div>

      {/* Stats row */}
      <div className="lottery-detail-stats">
        <div className="lottery-detail-stat">
          <div className="lottery-detail-stat-value">{joinedCount.toLocaleString('ru-RU')}</div>
          <div className="lottery-detail-stat-label">Участников</div>
        </div>
        <div className="lottery-detail-stat">
          <div className="lottery-detail-stat-value">{l.maxWinners}</div>
          <div className="lottery-detail-stat-label">Победителей</div>
        </div>
        <div className="lottery-detail-stat">
          <div className="lottery-detail-stat-value" style={{ color: accent }}>{odds ? `~1 / ${odds}` : '—'}</div>
          <div className="lottery-detail-stat-label">Шанс</div>
        </div>
      </div>

      {/* Live social proof */}
      <LotteryJoinTicker joined={l.joined}/>

      {/* Conditions */}
      <div style={{ padding: '0 16px' }}>
        <div className="lottery-cond-head">
          <div className="lottery-section-title" style={{ margin: 0 }}>Условия участия</div>
          <div className="lottery-cond-count">{metCount} / {l.conditions.length}</div>
        </div>
        <div className="lottery-cond-progress">
          <div className="lottery-cond-progress-fill" style={{ width: `${l.conditions.length ? (metCount / l.conditions.length) * 100 : 0}%`, background: accent }}/>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
          {l.conditions.map((c, i) => {
            const met = !!conditionsMet[c.target];
            return (
              <button key={i} onClick={() => setConditionsMet(s => ({ ...s, [c.target]: !s[c.target] }))}
                className={`lottery-condition-item${met ? ' met' : ''}`}>
                <div className="lottery-cond-avatar">
                  <iconify-icon icon={c.type === 'subscribe' ? 'ph:telegram-logo-fill' : 'ph:qr-code-bold'} width="17" height="17" style={{ display: 'inline-flex' }}/>
                </div>
                <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{c.label}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--fg-mute)', marginTop: 1 }}>{c.type === 'subscribe' ? 'Подписка на канал' : 'Сканировать QR-код'}</div>
                </div>
                <div className="lottery-condition-check" style={{ background: met ? accent : 'transparent', borderColor: met ? accent : 'var(--line-strong)' }}>
                  {met && <iconify-icon icon="ph:check-bold" width="12" height="12" style={{ display: 'inline-flex' }}/>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Extras (bonus tickets) */}
        {l.extras.length > 0 && (
          <>
            <div className="lottery-section-title" style={{ marginTop: 18 }}>Получи доп. билеты</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {l.extras.map((e, i) => {
                const extraIcon = e.type === 'invite' ? 'lottery-invite' : e.type === 'boost' ? 'lottery-boost' : 'lottery-story';
                return (
                  <div key={i} className="lottery-extra-item">
                    <LottieIcon name={extraIcon} width={36} height={36} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}/>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{e.label}</div>
                      <div style={{ fontSize: 11, color: 'var(--fg-mute)', marginTop: 2 }}>{e.max ? `до ${e.max} билетов` : 'бонусный билет'}</div>
                    </div>
                    <div className="lottery-extra-badge">+{e.tickets}</div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Verification */}
        <div className="lottery-verify-box">
          <LottieIcon name="lottery-verify" width={36} height={36} style={{ flexShrink: 0, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700 }}>Честный розыгрыш</div>
            <div style={{ fontSize: 10.5, color: 'var(--fg-mute)', marginTop: 2 }}>
              Seed-hash зафиксирован: <code style={{ fontSize: 9.5, background: 'var(--bg-2)', padding: '1px 4px', borderRadius: 3 }}>{l.verifySeed}</code>
            </div>
          </div>
          <button onClick={onViewWinners} style={{ background: 'transparent', border: 'none', color: accent, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
            Как это →
          </button>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="lottery-detail-cta-wrap">
        {!joined && (
          <div className="lottery-cta-hint">
            {allConditionsMet
              ? `Всё готово · ${l.joined.toLocaleString('ru-RU')} участников${odds ? ` · твой шанс ~1 из ${odds}` : ''}`
              : `Выполни условия: ${metCount} из ${l.conditions.length}`}
          </div>
        )}
        {joined ? (
          <button onClick={() => onJoin()} className="lottery-cta-btn lottery-cta-joined" style={{ background: 'var(--bg-2)', color: accent, border: `1px solid ${accent}` }}>
            <iconify-icon icon="ph:check-circle-duotone" width="18" height="18" style={{ display: 'inline-flex', marginRight: 6 }}/>
            Вы участвуете
          </button>
        ) : (
          <button onClick={onJoin} disabled={!allConditionsMet}
            className={`lottery-cta-btn ${allConditionsMet ? 'lottery-cta-active' : 'lottery-cta-disabled'}`}
            style={{ '--cta-accent': l.accentColor }}>
            {allConditionsMet ? '🎉 Участвовать в розыгрыше' : `Выполните условия (${metCount}/${l.conditions.length})`}
          </button>
        )}
      </div>
    </div>
  );
}

function LotteryJoinedScreen({ lottery: l, accent, onBack, onViewWinners }) {
  const [ticketNum] = React.useState(() => Math.floor(Math.random() * 100000));
  const rolled = useCountUp(ticketNum, 1100);
  const odds = l.joined > 0 ? Math.max(1, Math.round(l.joined / Math.max(1, l.maxWinners))) : 0;
  const extras = l.extras || [];
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 100px' }}>
      <div className="lottery-detail-topbar">
        <button onClick={onBack} className="lottery-back-btn">
          <iconify-icon icon="ph:caret-left-bold" width="18" height="18" style={{ display: 'inline-flex' }}/>
        </button>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-mute)' }}>Вы участвуете</span>
        <button onClick={() => window.toast && window.toast('Ссылка скопирована')} className="lottery-share-btn">
          <iconify-icon icon="ph:share-network-duotone" width="16" height="16" style={{ display: 'inline-flex' }}/>
        </button>
      </div>

      <div style={{ padding: '18px 16px' }}>
        {/* Celebration */}
        <div className="lottery-joined-celebration">
          <div className="lottery-joined-burst">
            <LottieIcon name="lottery-ticket" width={104} height={104} style={{ display: 'block', margin: '0 auto' }}/>
            <span className="lottery-spark lottery-spark-1"/>
            <span className="lottery-spark lottery-spark-2"/>
            <span className="lottery-spark lottery-spark-3"/>
            <span className="lottery-spark lottery-spark-4"/>
          </div>
          <div className="lottery-joined-title">Вы в розыгрыше!</div>
          <div className="lottery-joined-subtitle">{l.prizeIcon} {l.prize}</div>
        </div>

        {/* Ticket */}
        <div className="lottery-ticket">
          <div className="lottery-ticket-label">Ваш номер билета</div>
          <div className="lottery-ticket-num">#{String(rolled).padStart(5, '0')}</div>
          <div className="lottery-ticket-meta">
            <span>{l.channelEmoji} {l.ch}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{l.maxWinners} побед.</span>
          </div>
        </div>

        {/* Countdown to draw */}
        <div className="lottery-joined-cd">
          <div className="lottery-cd-caption" style={{ textAlign: 'center' }}>До розыгрыша</div>
          <LotteryCountdown deadlineMs={l.deadlineMs} compact/>
        </div>

        {/* Your chance */}
        <div className="lottery-chance-card">
          <div className="lottery-chance-main">
            <iconify-icon icon="ph:target-duotone" width="24" height="24" style={{ display: 'inline-flex', color: accent, flexShrink: 0 }}/>
            <div style={{ flex: 1 }}>
              <div className="lottery-chance-val">{odds ? `1 из ${odds.toLocaleString('ru-RU')}` : 'высокий'}</div>
              <div className="lottery-chance-cap">твой шанс с одним билетом</div>
            </div>
          </div>
          <div className="lottery-chance-hint">Больше билетов — выше шанс ↓</div>
        </div>

        {/* Increase chance */}
        <div className="lottery-section-title">Увеличить шанс</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {extras.map((e, i) => {
            const extraIcon = e.type === 'invite' ? 'lottery-invite' : e.type === 'boost' ? 'lottery-boost' : 'lottery-story';
            return (
              <button key={i} onClick={() => window.toast && window.toast('Откроется в боте')}
                className="lottery-extra-item"
                style={{ cursor: 'pointer', width: '100%', fontFamily: 'inherit', color: 'var(--fg)', textAlign: 'left' }}>
                <LottieIcon name={extraIcon} width={34} height={34} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{e.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--fg-mute)', marginTop: 2 }}>{e.max ? `до ${e.max} билетов` : 'бонусный билет'}</div>
                </div>
                <div className="lottery-extra-badge">+{e.tickets}</div>
              </button>
            );
          })}
          <button onClick={() => window.toast && window.toast('Ссылка приглашения скопирована')} className="lottery-share-cta">
            <iconify-icon icon="ph:share-network-duotone" width="18" height="18" style={{ display: 'inline-flex' }}/>
            <span style={{ flex: 1, textAlign: 'left' }}>Поделиться с друзьями</span>
            <iconify-icon icon="ph:caret-right-bold" width="14" height="14" style={{ display: 'inline-flex' }}/>
          </button>
        </div>

        {/* What's next */}
        <div className="lottery-joined-next">
          <iconify-icon icon="ph:bell-ringing-duotone" width="18" height="18" style={{ display: 'inline-flex', color: accent, flexShrink: 0 }}/>
          <span>Победителей объявим через {l.deadline} — пришлём уведомление в бот.</span>
        </div>

        {/* Verify */}
        <div className="lottery-verify-box" style={{ marginTop: 12 }}>
          <iconify-icon icon="ph:shield-check-duotone" width="22" height="22" style={{ display: 'inline-flex', color: accent, flexShrink: 0 }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700 }}>Розыгрыш честный</div>
            <div style={{ fontSize: 10.5, color: 'var(--fg-mute)', marginTop: 2 }}>Победители по seed: <code style={{ fontSize: 9.5 }}>{l.verifySeed}</code></div>
          </div>
          <button onClick={onViewWinners} style={{ background: 'transparent', border: 'none', color: accent, fontSize: 11, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
            Подробнее →
          </button>
        </div>
      </div>
    </div>
  );
}

function LotteryWinnersScreen({ lottery: l, accent, onBack }) {
  const winners = [
    { name: 'А****й П.', ticket: '01284', country: 'RU' },
    { name: 'М***я И.',  ticket: '04721', country: 'RU' },
    { name: 'Д***н К.',  ticket: '08432', country: 'KZ' },
    { name: 'Е***а С.',  ticket: '01092', country: 'RU' },
    { name: 'И***н М.',  ticket: '06378', country: 'BY' },
  ].slice(0, l.maxWinners);
  const steps = [
    { ic: 'ph:lock-key-duotone',    t: 'Commit',   d: 'Хэш секретного seed зафиксирован до старта' },
    { ic: 'ph:users-three-duotone', t: 'Розыгрыш', d: 'Идёт сбор участников — seed скрыт от всех' },
    { ic: 'ph:seal-check-duotone',  t: 'Reveal',   d: 'Seed раскрыт — расчёт может проверить каждый' },
  ];
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 100px' }}>
      <div className="lottery-detail-topbar">
        <button onClick={onBack} className="lottery-back-btn">
          <iconify-icon icon="ph:caret-left-bold" width="18" height="18" style={{ display: 'inline-flex' }}/>
        </button>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-mute)' }}>Прозрачность</span>
        <span style={{ width: 32 }}/>
      </div>

      <div style={{ padding: '18px 16px' }}>
        {/* Hero explainer */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <LottieIcon name="lottery-verify" width={72} height={72} style={{ display: 'block', margin: '0 auto 8px' }}/>
          <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: -0.3 }}>Честный розыгрыш</div>
          <div style={{ fontSize: 11.5, color: 'var(--fg-mute)', marginTop: 4, lineHeight: 1.5 }}>
            Победителей выбирает не человек, а проверяемый алгоритм
          </div>
        </div>

        {/* 3 steps commit-reveal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {steps.map((s, i) => (
            <div key={i} className="lottery-verify-step">
              <div className="lottery-verify-step-num">{i + 1}</div>
              <iconify-icon icon={s.ic} width="24" height="24" style={{ display: 'inline-flex', color: accent, flexShrink: 0 }}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{s.t}</div>
                <div style={{ fontSize: 10.5, color: 'var(--fg-mute)', marginTop: 1, lineHeight: 1.4 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Hash box */}
        <div className="lottery-hash-box">
          <div className="lottery-hash-head">
            <span>Hash (commit)</span>
            <button onClick={() => window.toast && window.toast('Хэш скопирован')} className="lottery-hash-copy">
              <iconify-icon icon="ph:copy-duotone" width="13" height="13" style={{ display: 'inline-flex' }}/>
              копировать
            </button>
          </div>
          <div className="lottery-hash-val">{l.verifySeed}</div>
        </div>

        {/* Winners */}
        <div className="lottery-section-title">Победители (пример)</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {winners.map((w, i) => {
            const medal = i === 0 ? '#FFD700' : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : null;
            return (
              <div key={i} className={`lottery-winner-row${i === 0 ? ' winner-top' : ''}`}>
                <div className="lottery-winner-place" style={{ background: medal || 'var(--bg-2)', color: medal ? '#000' : 'var(--fg)' }}>
                  {i + 1}
                </div>
                <div className="lottery-winner-avatar">{w.name.charAt(0)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{w.name}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--fg-mute)' }}>Билет #{w.ticket} · {w.country}</div>
                </div>
                {i === 0
                  ? <LottieIcon name="lottery-trophy" width={34} height={34} style={{ filter: 'drop-shadow(0 2px 6px rgba(255,215,0,0.5))' }}/>
                  : <iconify-icon icon="ph:trophy-fill" width="16" height="16" style={{ display: 'inline-flex', color: 'var(--fg-dim)' }}/>}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 16, padding: 12, background: 'var(--accent-soft)', borderRadius: 10, border: '1px solid var(--accent-line)', fontSize: 11, color: 'var(--fg)', lineHeight: 1.5 }}>
          <b style={{ color: accent }}>Демо-данные.</b> В реальном розыгрыше победители появятся автоматически после reveal seed — расчёт сможет проверить любой.
        </div>
      </div>
    </div>
  );
}

// ─── Экран организатора своего розыгрыша: вкладки «Пост» + «Статистика» ───
function LotteryOwnerScreen({ lottery: l, accent, onBack, onUpdate }) {
  const [tab, setTab] = React.useState('post');
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 100px' }}>
      <div className="lottery-detail-topbar">
        <button onClick={onBack} className="lottery-back-btn">
          <iconify-icon icon="ph:caret-left-bold" width="18" height="18" style={{ display: 'inline-flex' }}/>
        </button>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg-mute)' }}>Ваш розыгрыш</span>
        <button onClick={() => window.toast && window.toast('Ссылка на пост скопирована')} className="lottery-share-btn">
          <iconify-icon icon="ph:share-network-duotone" width="16" height="16" style={{ display: 'inline-flex' }}/>
        </button>
      </div>

      <div className="lottery-owner-tabs">
        <button className={`lottery-owner-tab${tab === 'post' ? ' active' : ''}`} onClick={() => setTab('post')}>Пост</button>
        <button className={`lottery-owner-tab${tab === 'stats' ? ' active' : ''}`} onClick={() => setTab('stats')}>Статистика</button>
      </div>

      <div style={{ padding: '14px 16px' }}>
        {tab === 'post' ? <LotteryOwnerPost lottery={l} accent={accent} onApply={onUpdate}/> : <LotteryStats lottery={l} accent={accent}/>}
      </div>
    </div>
  );
}

const OWNER_TYPE_INFO = {
  standard: { label: 'Стандартный', icon: '🎁' },
  boost:    { label: 'За бусты канала', icon: '⚡' },
  invite:   { label: 'За приглашения', icon: '👥' },
  custom:   { label: 'Кастомный', icon: '⚙️' },
  qr:       { label: 'QR-конкурс FMCG', icon: '📦' },
};

// Применение правок настроек к запущенному розыгрышу: wizardData + производные поля для ленты/деталей.
function applyWizardEdits(lot, wd) {
  const conditions = (wd.subscribeChannels || []).filter(Boolean)
    .map(c => ({ type: 'subscribe', target: c, label: `Подпишись на ${c}` }));
  return {
    ...lot,
    wizardData: { ...wd },
    title: wd.title || lot.title,
    prize: wd.title || lot.prize,
    description: wd.description || '',
    bannerUrl: wd.bannerUrl || '',
    maxWinners: wd.winners || lot.maxWinners,
    deadline: relDeadline(wd.endDate),
    deadlineMs: wd.endDate ? new Date(wd.endDate).getTime() : lot.deadlineMs,
    conditions,
  };
}

function LotteryOwnerPost({ lottery: l, accent, onApply }) {
  // wizardData — снимок мастера; fallback на минимальный объект, если его нет.
  const base = l.wizardData || {
    type: l.type || 'standard', title: l.title || '', description: l.description || '',
    lang: 'ru', bannerUrl: l.bannerUrl || '',
    buttonText: 'Участвовать', buttonStyle: 'default',
    subscribeChannels: (l.conditions || []).map(c => c.target).filter(Boolean),
    publishChannels: [l.ch], publishTouched: true,
    pinPost: true, silentPost: false, resultsMode: 'inline',
    startNow: true, startDate: '', endDate: '',
    winners: l.maxWinners || 1, claimDeadline: 48, autoReroll: true, contact: '',
    enableBoost: false, boostChannel: l.ch, boostTickets: 1, boostCap: 4,
    enableInvite: false, inviteTickets: 1, maxInvites: 3,
    enableStory: false, storyTickets: 1, captcha: false,
  };
  const [draft, setDraft] = React.useState(base);
  const [openSec, setOpenSec] = React.useState(null);
  const [calCtx, setCalCtx] = React.useState(null);
  const upd = (k, v) => setDraft(d => ({ ...d, [k]: v }));

  const dirty = JSON.stringify(draft) !== JSON.stringify(base);
  const pub = ((draft.publishChannels && draft.publishChannels.length ? draft.publishChannels : [l.ch]) || []).filter(Boolean);
  const ti = OWNER_TYPE_INFO[draft.type] || { label: draft.type || '—', icon: '🎲' };

  const apply = () => {
    const warns = [];
    if ((draft.winners || 0) < (base.winners || 0)) warns.push('меньше победителей');
    if ((draft.subscribeChannels || []).length < (base.subscribeChannels || []).length) warns.push('убран канал подписки');
    if (base.enableBoost && !draft.enableBoost) warns.push('отключены бусты');
    if (base.enableInvite && !draft.enableInvite) warns.push('отключены приглашения');
    if (base.enableStory && !draft.enableStory) warns.push('отключены сторис');
    if (draft.endDate && base.endDate && new Date(draft.endDate) < new Date(base.endDate)) warns.push('сокращён срок');
    if (warns.length && !window.confirm('Эти изменения могут затронуть уже вступивших участников: ' + warns.join(', ') + '.\n\nВсё равно применить?')) return;
    onApply && onApply(draft);
    window.toast && window.toast('✅ Изменения применены к посту');
  };

  const sections = [
    { id: 'post',     title: 'Пост (текст, баннер, кнопка)', sub: draft.title || 'без названия',
      body: <Step2Settings data={draft} upd={upd} accent={accent} embedded/> },
    { id: 'channels', title: 'Каналы подписки',              sub: `${(draft.subscribeChannels || []).length} канал(ов)`,
      body: <Step3Channels data={draft} upd={upd}/> },
    { id: 'publish',  title: 'Публикация',                   sub: `${pub.length} канал(ов)${draft.pinPost ? ' · закреплён' : ''}`,
      body: <Step4Publish data={draft} upd={upd}/> },
    { id: 'dates',    title: 'Даты',                         sub: draft.endDate ? `до ${fmtEndDate(draft.endDate)}` : 'срок не задан',
      body: <Step5Dates data={draft} upd={upd} openCal={setCalCtx}/> },
    { id: 'winners',  title: 'Победители',                   sub: `${draft.winners} · реролл ${draft.autoReroll ? 'вкл' : 'выкл'}`,
      body: <Step6Winners data={draft} upd={upd}/> },
    { id: 'boosts',   title: 'Бусты каналов',                sub: draft.enableBoost ? 'включены' : 'выключены',
      body: <Step7Boosts data={draft} upd={upd}/> },
    { id: 'invites',  title: 'Приглашение друзей',           sub: draft.enableInvite ? 'включены' : 'выключены',
      body: <Step8Invites data={draft} upd={upd}/> },
    { id: 'story',    title: 'Постинг сторис',               sub: draft.enableStory ? 'включён' : 'выключен',
      body: <Step9Story data={draft} upd={upd}/> },
    { id: 'protect',  title: 'Защита от ботов',              sub: draft.captcha ? 'каптча включена' : 'каптча выключена',
      body: <Step10Protection data={draft} upd={upd} accent={accent} embedded/> },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 12, color: 'var(--fg-mute)', lineHeight: 1.5 }}>
        Так розыгрыш выглядит постом в TG-канале. Ниже — настройки, их можно менять в процессе.
      </div>
      <PreviewCard data={draft}/>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 12px',
        background: 'var(--bg-2)', borderRadius: 10, fontSize: 11.5, color: 'var(--fg-mute)', lineHeight: 1.5 }}>
        <iconify-icon icon="ph:megaphone-duotone" width="15" height="15" style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1 }}/>
        <span>
          Опубликован в {pub.join(', ') || '—'}
          {draft.pinPost ? ' · 📌 закреплён' : ''}
          {draft.silentPost ? ' · без звука' : ''}
        </span>
      </div>

      {/* ── Настройки розыгрыша ── */}
      <div className="lottery-section-title" style={{ marginTop: 4 }}>Настройки розыгрыша</div>
      <div style={{ fontSize: 11, color: 'var(--fg-mute)', lineHeight: 1.45, marginTop: -8 }}>
        Меняй настройки и жми «Применить» — обновления уйдут в живой пост канала.
      </div>

      {/* Тип — только просмотр */}
      <div className="owner-set-locked">
        <span style={{ fontSize: 18 }}>{ti.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600 }}>Тип: {ti.label}</div>
          <div style={{ fontSize: 10.5, color: 'var(--fg-mute)', marginTop: 1 }}>Механику нельзя изменить после запуска</div>
        </div>
        <iconify-icon icon="ph:lock-simple-fill" width="15" height="15" style={{ color: 'var(--fg-mute)', flexShrink: 0 }}/>
      </div>

      {/* Аккордеон настроек */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {sections.map(sec => {
          const open = openSec === sec.id;
          return (
            <div key={sec.id} className={`owner-set-section${open ? ' open' : ''}`}>
              <button className="owner-set-head" onClick={() => setOpenSec(open ? null : sec.id)}>
                <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
                  <div className="owner-set-title">{sec.title}</div>
                  <div className="owner-set-summary">{sec.sub}</div>
                </div>
                <iconify-icon icon="ph:caret-down-bold" width="14" height="14"
                  style={{ color: 'var(--fg-mute)', flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease' }}/>
              </button>
              {open && <div className="owner-set-body">{sec.body}</div>}
            </div>
          );
        })}
      </div>

      {/* Применить / Отменить — sticky, появляется при изменениях */}
      {dirty && (
        <div className="owner-apply-bar">
          <button className="owner-apply-cancel" onClick={() => setDraft(base)}>Отменить</button>
          <button className="owner-apply-btn" onClick={apply} style={{ background: accent }}>Применить изменения</button>
        </div>
      )}

      {/* Календарь дат (для секции «Даты») */}
      <Sheet open={!!calCtx} onClose={() => setCalCtx(null)} title="Дата и время" maxHeight="88%">
        {calCtx && (
          <WizCalendar value={calCtx.value}
            onApply={(v) => { calCtx.onApply(v); setCalCtx(null); }}
            onCancel={() => setCalCtx(null)}/>
        )}
      </Sheet>
    </div>
  );
}

// ─── Инфографика статистики розыгрыша (v57) ───
const fmtNum = (n) => Math.round(n || 0).toLocaleString('ru-RU');
const statColor = (v) => (v >= 75 ? 'var(--ok)' : v >= 45 ? 'var(--warn)' : 'var(--bad)');
const STAT_PALETTE = ['#B8E641', '#5BE3F2', '#FFB85C', '#C45BFF', '#FF6B6B', '#5BA8FF'];
const fmtDayMon = (ms) => {
  const d = new Date(ms), p = (n) => String(n).padStart(2, '0');
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}`;
};

function StatBlock({ title, hint, children }) {
  return (
    <div className="stat-block">
      <div className="lottery-section-title">{title}</div>
      {hint && <div className="stat-block-hint">{hint}</div>}
      {children}
    </div>
  );
}

function StatAreaChart({ data = [], accent = '#B8E641' }) {
  const pts = (data || []).filter((v) => typeof v === 'number');
  if (pts.length < 2) return <div className="stat-chart-empty">График появится, когда наберётся 2+ дня данных</div>;
  const W = 300, H = 72, pad = 6;
  const max = Math.max(1, ...pts);
  const step = (W - pad * 2) / (pts.length - 1);
  const xy = pts.map((v, i) => [pad + i * step, H - pad - (v / max) * (H - pad * 2)]);
  const line = xy.map((c, i) => (i ? 'L' : 'M') + c[0].toFixed(1) + ' ' + c[1].toFixed(1)).join(' ');
  const area = `${line} L${(W - pad).toFixed(1)} ${H - pad} L${pad.toFixed(1)} ${H - pad} Z`;
  const peak = pts.indexOf(max);
  return (
    <svg className="stat-area" viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <linearGradient id="statAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.42"/>
          <stop offset="100%" stopColor={accent} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill="url(#statAreaGrad)"/>
      <path d={line} fill="none" stroke={accent} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx={xy[peak][0]} cy={xy[peak][1]} r="3.6" fill={accent}/>
    </svg>
  );
}

function StatDonut({ segments = [], size = 116, stroke = 19 }) {
  const segs = (segments || []).filter((s) => (s.value || 0) > 0);
  const total = segs.reduce((a, s) => a + s.value, 0);
  const r = (size - stroke) / 2, C = 2 * Math.PI * r, cx = size / 2;
  let off = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke="var(--bg-2)" strokeWidth={stroke}/>
      {segs.map((s, i) => {
        const len = (s.value / total) * C;
        const node = (
          <circle key={i} cx={cx} cy={cx} r={r} fill="none" stroke={s.color} strokeWidth={stroke}
            strokeDasharray={`${len.toFixed(2)} ${(C - len).toFixed(2)}`} strokeDashoffset={(-off).toFixed(2)}
            transform={`rotate(-90 ${cx} ${cx})`}/>
        );
        off += len;
        return node;
      })}
      <text x={cx} y={cx - 1} textAnchor="middle" className="stat-donut-center">{fmtNum(total)}</text>
      <text x={cx} y={cx + 13} textAnchor="middle" className="stat-donut-sub">билетов</text>
    </svg>
  );
}

function StatLegend({ items = [] }) {
  return (
    <div className="stat-legend">
      {items.map((it, i) => (
        <div key={i} className="stat-legend-item">
          <span className="stat-legend-dot" style={{ background: it.color }}/>
          <span>{it.label}</span>
          <span className="stat-legend-val">{it.text}</span>
        </div>
      ))}
    </div>
  );
}

function StatSparkline({ data = [], color = '#B8E641' }) {
  const pts = (data || []).filter((v) => typeof v === 'number');
  if (pts.length < 2) return null;
  const W = 64, H = 22, min = Math.min(...pts), max = Math.max(...pts), rng = max - min || 1;
  const step = W / (pts.length - 1);
  const d = pts.map((v, i) => (i ? 'L' : 'M') + (i * step).toFixed(1) + ' ' + (H - 3 - ((v - min) / rng) * (H - 6)).toFixed(1)).join(' ');
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ flexShrink: 0 }}>
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function StatRing({ pct = 0, size = 92, stroke = 9, color, big, cap }) {
  const r = (size - stroke) / 2, C = 2 * Math.PI * r, cx = size / 2;
  const len = Math.max(0, Math.min(1, pct / 100)) * C;
  const col = color || statColor(pct);
  return (
    <div className="stat-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="var(--bg-2)" strokeWidth={stroke}/>
        <circle cx={cx} cy={cx} r={r} fill="none" stroke={col} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={`${len.toFixed(2)} ${(C - len).toFixed(2)}`} transform={`rotate(-90 ${cx} ${cx})`}/>
      </svg>
      <div className="stat-ring-center">
        <div className="stat-ring-num" style={{ color: col }}>{big}</div>
        {cap && <div className="stat-ring-cap">{cap}</div>}
      </div>
    </div>
  );
}

function StatSegBar({ segments = [] }) {
  const total = (segments || []).reduce((a, s) => a + (s.value || 0), 0) || 1;
  return (
    <div className="stat-segbar">
      {(segments || []).filter((s) => (s.value || 0) > 0).map((s, i) => (
        <div key={i} className="stat-segbar-seg" style={{ width: `${(s.value / total) * 100}%`, background: s.color }}/>
      ))}
    </div>
  );
}

function StatHeatmap({ grid = [], accent = '#B8E641' }) {
  if (!grid || grid.length === 0) return <div className="stat-chart-empty">Тепловая карта появится с активностью участников</div>;
  const max = Math.max(1, ...grid.flat());
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  return (
    <div>
      <div className="stat-heatmap">
        {grid.map((row, d) => (
          <div key={d} className="stat-heat-row">
            <span className="stat-heat-day">{days[d] || ''}</span>
            <div className="stat-heat-cells">
              {row.map((v, h) => (
                <div key={h} className="stat-heat-cell"
                  style={{ background: accent, opacity: v ? 0.12 + 0.88 * (v / max) : 0.06 }}/>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="stat-heat-hours">
        <span>0ч</span><span>6ч</span><span>12ч</span><span>18ч</span><span>23ч</span>
      </div>
    </div>
  );
}

function LotteryStats({ lottery: l, accent }) {
  const s = l.stats || {};
  const wd = l.wizardData || {};
  const fresh = (l.joined || 0) === 0;
  const [budget, setBudget] = React.useState(s.prizeBudget || 0);

  const tbs = s.ticketsBySource || {};
  const totalTickets = Object.values(tbs).reduce((a, v) => a + (v || 0), 0);
  const cg = s.channelGrowth || [];
  const subsGained = cg.reduce((a, c) => a + ((c.after || 0) - (c.before || 0)), 0);
  const f = s.funnel || {};
  const trend = s.kpiTrend || {};
  const daily = s.participantsDaily || [];
  const prot = s.protection || {};
  const reactions = s.reactions || [];
  const reactTotal = reactions.reduce((a, r) => a + (r.n || 0), 0);
  const ctr = f.views ? ((f.opened || 0) / f.views * 100) : 0;
  const prev = s.prev;
  const health = s.health || { score: 0, factors: [] };
  const retention = s.retention || {};
  const premiumUsers = Math.round((l.joined || 0) * (s.premiumPct || 0) / 100);
  const costPer = (n) => (budget && n ? Math.round(budget / n) : 0);

  const kpis = [
    { v: l.joined || 0, lbl: 'Участников', d: trend.participants },
    { v: totalTickets, lbl: 'Билетов', d: trend.tickets },
    { v: f.views || 0, lbl: 'Просмотров поста', d: trend.views },
    { v: subsGained, lbl: 'Новых подписчиков', d: trend.subs },
  ];

  const srcMeta = [
    { key: 'subscribe', label: 'Вход (подписка)', color: STAT_PALETTE[0] },
    { key: 'invite', label: 'Приглашения', color: STAT_PALETTE[1] },
    { key: 'boost', label: 'Бусты канала', color: STAT_PALETTE[2] },
    { key: 'story', label: 'Сторис', color: STAT_PALETTE[3] },
  ];
  const donutSegs = srcMeta.map((m) => ({ label: m.label, color: m.color, value: tbs[m.key] || 0 }));

  const funnelSteps = [
    { label: 'Просмотры поста', v: f.views },
    { label: 'Открыли мини-апп', v: f.opened },
    { label: 'Начали вход', v: f.started },
    { label: 'Прошли каптчу', v: f.captcha, captchaOnly: true },
    { label: 'Выполнили условия', v: f.conditions },
    { label: 'Участвуют', v: f.joined },
  ].filter((st) => !st.captchaOnly || wd.captcha);
  const funnelMax = Math.max(1, f.views || 0);

  const platforms = s.platforms || {};
  const platMeta = [
    { key: 'ios', label: 'iOS', color: STAT_PALETTE[1] },
    { key: 'android', label: 'Android', color: STAT_PALETTE[0] },
    { key: 'desktop', label: 'Desktop', color: STAT_PALETTE[2] },
    { key: 'web', label: 'Web', color: STAT_PALETTE[3] },
  ];
  const platSegs = platMeta.map((m) => ({ label: m.label, color: m.color, value: platforms[m.key] || 0 }));
  const langs = (s.languages || []).map((x, i) => ({ label: x.code, value: x.n, color: STAT_PALETTE[i % STAT_PALETTE.length] }));

  const compareRows = prev ? [
    { lbl: 'Участников', now: l.joined || 0, was: prev.participants },
    { lbl: 'Билетов', now: totalTickets, was: prev.tickets },
    { lbl: 'Подписчиков', now: subsGained, was: prev.subs },
    { lbl: 'Просмотров', now: f.views || 0, was: prev.views },
  ] : [];

  const askBudget = () => {
    const v = window.prompt('Бюджет приза в рублях (для расчёта цены за участника):', budget || '');
    if (v != null) {
      const n = parseInt(String(v).replace(/\D/g, ''), 10);
      if (!isNaN(n)) setBudget(n);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {fresh && (
        <div className="stat-empty-banner" style={{ marginBottom: 14 }}>
          📊 Розыгрыш только запущен — блоки заполнятся, как пойдут участники. Ниже видно, что именно будет собираться.
        </div>
      )}

      {/* 1 — Сводка */}
      <StatBlock title="Сводка">
        <div className="stat-kpi-grid">
          {kpis.map((k, i) => (
            <div key={i} className="stat-kpi-card">
              <div className="stat-kpi-val">{fmtNum(k.v)}</div>
              <div className="stat-kpi-lbl">{k.lbl}</div>
              <div className={`stat-kpi-trend ${k.d > 0 ? 'up' : 'flat'}`}>
                {k.d > 0
                  ? <><iconify-icon icon="ph:trend-up-bold" width="11" height="11"/><span>+{fmtNum(k.d)} за сутки</span></>
                  : <span>без изменений за сутки</span>}
              </div>
            </div>
          ))}
        </div>
      </StatBlock>

      {/* 2 — Динамика участников */}
      <StatBlock title="Динамика участников">
        <StatAreaChart data={daily} accent={accent}/>
        {daily.length >= 2 && (
          <div className="stat-xlabels">
            <span>{fmtDayMon(Date.now() - (daily.length - 1) * 86400000)}</span>
            <span>{fmtDayMon(Date.now() - Math.floor((daily.length - 1) / 2) * 86400000)}</span>
            <span>сегодня</span>
          </div>
        )}
        {s.forecastFinal > 0 && (
          <div className="stat-forecast">
            <iconify-icon icon="ph:chart-line-up-duotone" width="16" height="16" style={{ color: 'var(--accent)', flexShrink: 0 }}/>
            <span>Прогноз к финалу: <b>~{fmtNum(s.forecastFinal)}</b> участников при текущей скорости</span>
          </div>
        )}
      </StatBlock>

      {/* 3 — Воронка */}
      <StatBlock title="Воронка поста" hint="Где участники отваливаются — от просмотра поста до входа в розыгрыш">
        <div className="stat-funnel">
          {funnelSteps.map((step, i) => {
            const v = step.v || 0;
            const pct = Math.round((v / funnelMax) * 100);
            const ofViews = f.views ? Math.round((v / f.views) * 100) : 0;
            const prevV = i > 0 ? (funnelSteps[i - 1].v || 0) : v;
            const stepConv = prevV ? Math.round((v / prevV) * 100) : 100;
            return (
              <div key={i} className="stat-funnel-row">
                <div className="stat-funnel-head">
                  <span>{step.label}</span>
                  <span className="stat-funnel-num">{fmtNum(v)} <span style={{ color: 'var(--fg-mute)', fontWeight: 400 }}>· {ofViews}%</span></span>
                </div>
                <div className="stat-funnel-bar" style={{ width: `${Math.max(pct, 2)}%`, background: accent }}/>
                {i > 0 && <div className="stat-funnel-conv">шаг к шагу: {stepConv}%</div>}
              </div>
            );
          })}
        </div>
      </StatBlock>

      {/* 4 — Источники билетов */}
      <StatBlock title="Откуда билеты">
        {totalTickets > 0 ? (
          <div className="stat-donut-wrap">
            <StatDonut segments={donutSegs}/>
            <StatLegend items={donutSegs.filter((d) => d.value > 0).map((d) => ({
              label: d.label, color: d.color,
              text: `${fmtNum(d.value)} · ${Math.round(d.value / totalTickets * 100)}%`,
            }))}/>
          </div>
        ) : <div className="stat-chart-empty">Билетов пока нет</div>}
      </StatBlock>

      {/* 5 — Рост каналов */}
      <StatBlock title="Рост каналов" hint="Бот-админ опрашивает число подписчиков — видно реальный прирост">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {cg.length > 0 ? cg.map((c, i) => {
            const delta = (c.after || 0) - (c.before || 0);
            return (
              <div key={i} className="stat-channel-row">
                <iconify-icon icon="ph:telegram-logo-duotone" width="16" height="16" style={{ display: 'inline-flex', color: accent, flexShrink: 0 }}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.ch}</div>
                  <div style={{ fontSize: 10, color: 'var(--fg-mute)' }}>{fmtNum(c.before)} → {fmtNum(c.after)}</div>
                </div>
                <StatSparkline data={c.spark} color={accent}/>
                <span style={{ fontSize: 13, fontWeight: 800, color: delta > 0 ? accent : 'var(--fg-mute)' }}>+{fmtNum(delta)}</span>
              </div>
            );
          }) : <div className="stat-chart-empty">Каналы не заданы</div>}
        </div>
      </StatBlock>

      {/* 6 — Виральность */}
      {wd.enableInvite && (
        <StatBlock title="Виральность · приглашения">
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <div className="stat-mini-card">
              <div className="stat-mini-val">{(s.kFactor || 0).toFixed(2)}</div>
              <div className="stat-mini-lbl">K-фактор</div>
            </div>
            <div className="stat-mini-card">
              <div className="stat-mini-val">{fmtNum(s.invitesJoined)}</div>
              <div className="stat-mini-lbl">Пришло по реф.</div>
            </div>
            <div className="stat-mini-card">
              <div className="stat-mini-val">{s.invitesSent ? Math.round((s.invitesJoined / s.invitesSent) * 100) : 0}%</div>
              <div className="stat-mini-lbl">Конверсия ссылок</div>
            </div>
          </div>
          {(s.topInviters || []).length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div className="stat-block-hint" style={{ margin: '0 0 2px' }}>Топ-пригласители</div>
              {s.topInviters.map((t, i) => (
                <div key={i} className="lottery-winner-row">
                  <div className="lottery-winner-place" style={{ background: i === 0 ? '#FFD700' : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : 'var(--line)', color: i < 3 ? '#000' : 'var(--fg)' }}>{i + 1}</div>
                  <div style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--fg-mute)' }}>{t.count} приглаш.</div>
                </div>
              ))}
            </div>
          )}
        </StatBlock>
      )}

      {/* 7 — Вовлечённость поста */}
      <StatBlock title="Вовлечённость поста">
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <div className="stat-mini-card">
            <div className="stat-mini-val">{fmtNum(f.views)}</div>
            <div className="stat-mini-lbl">Просмотры</div>
          </div>
          <div className="stat-mini-card">
            <div className="stat-mini-val">{fmtNum(s.postForwards)}</div>
            <div className="stat-mini-lbl">Пересылки</div>
          </div>
          <div className="stat-mini-card">
            <div className="stat-mini-val">{ctr.toFixed(1)}%</div>
            <div className="stat-mini-lbl">CTR в мини-апп</div>
          </div>
        </div>
        {reactions.length > 0 ? (
          <div className="stat-reactions">
            {reactions.map((r, i) => (
              <div key={i} className="stat-reaction">{r.e} {fmtNum(r.n)}</div>
            ))}
            <div className="stat-reaction" style={{ background: 'var(--bg-2)', borderColor: 'var(--line)' }}>
              Всего&nbsp;<span>{fmtNum(reactTotal)}</span>
            </div>
          </div>
        ) : <div className="stat-chart-empty">Реакций на пост пока нет</div>}
      </StatBlock>

      {/* 8 — Аудитория */}
      <StatBlock title="Аудитория" hint="Язык — это язык интерфейса Telegram участника, не страна. Точную географию бот не видит.">
        <div className="stat-ring-row" style={{ marginBottom: 12 }}>
          <StatRing pct={s.premiumPct || 0} color={STAT_PALETTE[2]} big={`${s.premiumPct || 0}%`} cap="Premium"/>
          <div style={{ flex: 1, fontSize: 11.5, color: 'var(--fg-mute)', lineHeight: 1.5 }}>
            <b style={{ color: 'var(--fg)' }}>{fmtNum(premiumUsers)}</b> участников с Telegram Premium — косвенный признак платёжеспособной аудитории.
          </div>
        </div>
        <div className="stat-block-hint" style={{ margin: '0 0 4px' }}>Платформа</div>
        <StatSegBar segments={platSegs}/>
        <StatLegend items={platSegs.filter((p) => p.value > 0).map((p) => ({ label: p.label, color: p.color, text: `${p.value}%` }))}/>
        <div className="stat-block-hint" style={{ margin: '13px 0 4px' }}>Язык интерфейса</div>
        <StatSegBar segments={langs}/>
        <StatLegend items={langs.filter((x) => x.value > 0).map((x) => ({ label: x.label, color: x.color, text: `${x.value}%` }))}/>
        <div className="stat-block-hint" style={{ margin: '13px 0 4px' }}>Новые / возвращавшиеся</div>
        <StatSegBar segments={[
          { value: s.audienceNew || 0, color: STAT_PALETTE[0] },
          { value: s.audienceReturning || 0, color: STAT_PALETTE[4] },
        ]}/>
        <StatLegend items={[
          { label: 'Впервые у вас', color: STAT_PALETTE[0], text: `${s.audienceNew || 0}%` },
          { label: 'Из прошлых розыгрышей', color: STAT_PALETTE[4], text: `${s.audienceReturning || 0}%` },
        ]}/>
      </StatBlock>

      {/* 9 — Когда заходят */}
      <StatBlock title="Когда заходят" hint="Часы пик — лучшее время для напоминаний и анонса финала">
        <StatHeatmap grid={s.heatmap} accent={accent}/>
      </StatBlock>

      {/* 10 — Защита от ботов */}
      <StatBlock title="Защита от ботов">
        <div className="stat-ring-row" style={{ marginBottom: 10 }}>
          <StatRing pct={s.cleanScore || 0} big={`${s.cleanScore || 0}%`} cap="чистота"/>
          <div style={{ flex: 1, fontSize: 11.5, color: 'var(--fg-mute)', lineHeight: 1.5 }}>
            Доля участников, прошедших каптчу и фильтры без подозрений. 100% защиты не бывает — оценка показывает уровень.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div className="stat-mini-card">
            <div className="stat-mini-val" style={{ color: 'var(--ok)' }}>{fmtNum(prot.captchaPassed)}</div>
            <div className="stat-mini-lbl">Прошли каптчу</div>
          </div>
          <div className="stat-mini-card">
            <div className="stat-mini-val" style={{ color: 'var(--bad)' }}>{fmtNum(prot.captchaFailed)}</div>
            <div className="stat-mini-lbl">Не прошли</div>
          </div>
          <div className="stat-mini-card">
            <div className="stat-mini-val" style={{ color: 'var(--warn)' }}>{fmtNum((prot.filteredAge || 0) + (prot.filteredNoProfile || 0))}</div>
            <div className="stat-mini-lbl">Отсеяно фильтрами</div>
          </div>
        </div>
      </StatBlock>

      {/* 11 — Удержание */}
      <StatBlock title="Удержание подписчиков" hint="Из вступивших N дней назад — сколько ещё подписаны. Низкое D7 = «награды-фарм».">
        <div style={{ display: 'flex', gap: 8 }}>
          {[['1', retention.d1], ['3', retention.d3], ['7', retention.d7]].map(([k, v]) => (
            <div key={k} className="stat-mini-card">
              <div className="stat-mini-val" style={{ color: statColor(v || 0) }}>{v || 0}%</div>
              <div className="stat-mini-lbl">осталось через {k} дн</div>
            </div>
          ))}
        </div>
      </StatBlock>

      {/* 12 — Эффективность */}
      <StatBlock title="Эффективность бюджета">
        {budget > 0 ? (
          <>
            <div className="stat-cost-grid">
              <div className="stat-cost-card">
                <div className="stat-cost-val">{l.joined ? fmtNum(costPer(l.joined)) : '—'} ₽</div>
                <div className="stat-cost-lbl">за участника</div>
              </div>
              <div className="stat-cost-card">
                <div className="stat-cost-val">{subsGained ? fmtNum(costPer(subsGained)) : '—'} ₽</div>
                <div className="stat-cost-lbl">за подписчика</div>
              </div>
              <div className="stat-cost-card">
                <div className="stat-cost-val">{premiumUsers ? fmtNum(costPer(premiumUsers)) : '—'} ₽</div>
                <div className="stat-cost-lbl">за Premium-юзера</div>
              </div>
            </div>
            <button className="stat-budget-btn" style={{ marginTop: 8 }} onClick={askBudget}>
              Бюджет приза: {fmtNum(budget)} ₽ — изменить
            </button>
          </>
        ) : (
          <button className="stat-budget-btn" onClick={askBudget}>
            Указать бюджет приза → расчёт цены за участника
          </button>
        )}
      </StatBlock>

      {/* 13 — Сравнение с прошлым */}
      {compareRows.length > 0 && (
        <StatBlock title="Сравнение с прошлым розыгрышем">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {compareRows.map((r, i) => {
              const diff = r.was ? Math.round((r.now - r.was) / r.was * 100) : 0;
              return (
                <div key={i} className="stat-compare-row">
                  <span className="stat-compare-lbl">{r.lbl}</span>
                  <span className="stat-compare-now">{fmtNum(r.now)}</span>
                  <span className={`stat-compare-delta ${diff >= 0 ? 'up' : 'down'}`}>
                    {diff >= 0 ? '▲' : '▼'} {Math.abs(diff)}%
                  </span>
                </div>
              );
            })}
          </div>
        </StatBlock>
      )}

      {/* 14 — Здоровье розыгрыша */}
      <StatBlock title="Здоровье розыгрыша">
        <div className="stat-ring-row">
          <StatRing pct={health.score || 0} big={health.score || 0} cap="из 100"/>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
            {(health.factors || []).length > 0 ? (health.factors).map((fc, i) => (
              <div key={i} className="stat-health-factor">
                <span className="stat-health-factor-lbl">{fc.label}</span>
                <div className="stat-health-factor-track">
                  <div className="stat-health-factor-fill" style={{ width: `${fc.val}%`, background: statColor(fc.val) }}/>
                </div>
                <span className="stat-health-factor-val">{fc.val}</span>
              </div>
            )) : (
              <div style={{ fontSize: 11.5, color: 'var(--fg-mute)', lineHeight: 1.5 }}>Оценка появится с первыми участниками.</div>
            )}
          </div>
        </div>
      </StatBlock>

      {/* Экспорт + действия */}
      <div className="stat-block">
        <button className="stat-export-btn" onClick={() => window.toast && window.toast('Отчёт CSV/PDF — выгрузка (demo)')}>
          <iconify-icon icon="ph:download-simple-bold" width="15" height="15"/>
          Выгрузить полный отчёт (CSV / PDF)
        </button>
        <button
          onClick={() => { if (window.confirm('Завершить розыгрыш досрочно? Победители будут выбраны сразу.')) window.toast && window.toast('Розыгрыш завершён (demo)'); }}
          className="stat-finish-btn" style={{ marginTop: 8 }}>
          Завершить розыгрыш досрочно
        </button>
        <div style={{ fontSize: 10.5, color: 'var(--fg-mute)', textAlign: 'center', lineHeight: 1.5, marginTop: 10 }}>
          Демо-данные. В реальном розыгрыше всё обновляется автоматически из Telegram и мини-аппа.
        </div>
      </div>
    </div>
  );
}

function LotteryCreateWizard({ accent, onClose, onPublish }) {
  const [step, setStep] = React.useState(1);
  const TOTAL = 11;
  const [data, setData] = React.useState({
    type: 'standard',
    title: '', description: '', lang: 'ru',
    bannerUrl: '',
    buttonText: 'Участвовать', buttonStyle: 'default',
    subscribeChannels: ['@fresh_super_app'],
    publishChannels: [], publishTouched: false,
    pinPost: true, silentPost: false, resultsMode: 'inline',
    startNow: true, startDate: '', endDate: '',
    winners: 5, claimDeadline: 48, autoReroll: true, contact: '',
    enableBoost: false, boostChannel: '@fresh_super_app', boostTickets: 1, boostCap: 4,
    enableInvite: false, inviteTickets: 1, maxInvites: 3,
    enableStory: false, storyTickets: 1,
    captcha: true,
  });
  const upd = (k, v) => setData(d => ({ ...d, [k]: v }));
  const [helpOpen, setHelpOpen] = React.useState(false);
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [calCtx, setCalCtx] = React.useState(null); // {value, onApply} — общий календарь дат

  const steps = [
    { title: 'Тип розыгрыша',     emoji: '💡', help: 'Стандартный — самый простой формат. Бусты и Приглашения — дают больше виральности.' },
    { title: 'Основные настройки', emoji: '📝', help: 'Название появится в посте. Кнопка участия — текст и цвет влияют на CTR.' },
    { title: 'Подписки на каналы', emoji: '📂', help: 'Бот сам проверит, что участник подписан на каналы. Без каналов розыгрыш пройдёт без проверки подписки.' },
    { title: 'Публикация',         emoji: '💌', help: 'Выберите где постить розыгрыш. Можно сразу в несколько каналов.' },
    { title: 'Даты',               emoji: '📅', help: 'Бот работает в Московском времени (GMT+3). Min 1 час, max 30 дней.' },
    { title: 'Победители',         emoji: '🏆', help: 'До 30 победителей. Контакт пригодится — бот отправит победителям ваш @username.' },
    { title: 'Бусты каналов',      emoji: '⚡',  help: 'Участник делает boost вашего канала → +1 билет (max 10).' },
    { title: 'Приглашение друзей', emoji: '👥', help: 'Каждый приведённый друг = +1 билет участнику. Уникальная ссылка генерируется автоматически.' },
    { title: 'Постинг сторис',     emoji: '📺', help: 'Только TG Premium. Бот не проверяет факт публикации — checkmark по «доверию».' },
    { title: 'Защита от ботов',    emoji: '🛡', help: 'Капча — базовая. Liveness — камера-based (beta, ~100% защита).' },
    { title: 'Предварительный просмотр', emoji: '👀', help: 'Пост показан так, как его увидят подписчики в канале. Любой шаг можно поправить кнопкой «Назад».' },
  ];
  const cur = steps[step - 1];
  const [animDir, setAnimDir] = React.useState('fwd');
  const goNext = () => { setAnimDir('fwd'); setStep(s => s + 1); };
  const goPrev = () => { setAnimDir('back'); setStep(s => s - 1); };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
      {/* HEADER (fixed) */}
      <div style={{ flexShrink: 0 }}>
        <div className="lottery-detail-topbar">
          <button onClick={onClose} className="lottery-back-btn">
            <iconify-icon icon="ph:x-bold" width="18" height="18" style={{ display: 'inline-flex' }}/>
          </button>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Создание · {step}/{TOTAL}</span>
          <button onClick={() => setPreviewOpen(true)} className="lottery-back-btn" title="Превью поста">
            <iconify-icon icon="ph:eye-duotone" width="18" height="18" style={{ display: 'inline-flex' }}/>
          </button>
        </div>
        <div className="wizard-stepper">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div key={i} className={`wizard-stepper-dot ${i + 1 < step ? 'done' : ''} ${i + 1 === step ? 'active' : ''}`}/>
          ))}
        </div>
      </div>

      {/* MIDDLE (scrollable) */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
      {/* Hero — animated emoji + title (compact in v37) */}
      <div key={step} className={`wizard-hero wizard-slide-${animDir} wizard-hero-compact`}>
        <div className="wizard-hero-emoji">
          {(() => {
            // v41: ВСЕ 10 APNG (Founder picks 2026-05-20 round 2).
            // Steps 2/3/4/6/10 заменены с static на семантически-стрейч APNG.
            // v59: step 11 (Предварительный просмотр) — APNG «глаза» (MS Fluent animated).
            const FLUENT_MAP = {
              1:  './assets/icons/wizard/party-popper-v40.png',
              2:  './assets/icons/wizard/robot-v41.png',
              3:  './assets/icons/wizard/triangular-flag-v41.png',
              4:  './assets/icons/wizard/high-voltage-v41.png',
              5:  './assets/icons/wizard/spiral-calendar-v40.png',
              6:  './assets/icons/wizard/fire-v41.png',
              7:  './assets/icons/wizard/rocket-v40.png',
              8:  './assets/icons/wizard/handshake-v35.png',
              9:  './assets/icons/wizard/camera-flash-v40.png',
              10: './assets/icons/wizard/mechanical-arm-v41.png',
              11: './assets/icons/wizard/eyes-v41.png',
            };
            const src = FLUENT_MAP[step];
            if (!src) return cur.emoji;
            return (
              <img
                src={src}
                alt={cur.title}
                style={{ width: 100, height: 100, objectFit: 'contain', display: 'block', margin: '0 auto' }}
              />
            );
          })()}
        </div>
        <div className="wizard-hero-title">{cur.title}</div>
      </div>

      <div key={`content-${step}`} className={`wizard-content wizard-slide-${animDir}`} style={{ padding: '10px 14px 16px' }}>

        {step === 1 && (() => {
          const types = [
            {
              id: 'standard', label: 'Стандартный', desc: 'Подписка на каналы + случайный выбор', icon: '🎁',
              popular: true,
              activeSteps: [1,2,3,4,5,6,10],
              useCase: 'Хочешь органичный охват без накрутки',
              botFlow: 'Бот сам проверит подписку участников → случайно выберет N победителей',
            },
            {
              id: 'boost', label: 'За бусты канала', desc: 'Дополнительные билеты за boost канала', icon: '⚡',
              activeSteps: [1,2,3,4,5,6,7,10],
              useCase: 'Канал в зоне роста — нужны boost\'ы',
              botFlow: 'Каждый boost = +1 билет (max 10) → случайный выбор',
            },
            {
              id: 'invite', label: 'За приглашения', desc: 'Билеты за каждого друга', icon: '👥',
              activeSteps: [1,2,3,4,5,6,8,10],
              useCase: 'Виральный охват, цена нового подписчика низкая',
              botFlow: 'Каждый приглашённый = +1 билет (формула учитывает удержание)',
            },
            {
              id: 'custom', label: 'Кастомный', desc: 'Полная настройка условий', icon: '⚙️',
              activeSteps: [1,2,3,4,5,6,7,8,9,10],
              useCase: 'Сложная механика (mix бустов + приглашений + сторис)',
              botFlow: 'Комбинированная формула билетов из выбранных условий',
            },
            {
              id: 'qr', label: 'QR-конкурс FMCG', desc: 'Скан QR с упаковки = вход', icon: '📦',
              disabled: true,
              activeSteps: [1,2,5,6,10],
              useCase: 'Бренд-партнёрство с offline-точками (FMCG)',
              botFlow: 'Скан QR с упаковки → автоматический вход. Wave 3 · brand sponsor',
              lockNote: 'Доступно для брендов с верификацией. Запрос: support@fresh.app',
            },
          ];
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {types.map(t => {
                const isActive = data.type === t.id;
                return (
                  <div key={t.id} className={`wizard-type-card${t.disabled ? ' locked' : ''}${isActive ? ' active' : ''}`}>
                    <button
                      onClick={() => { if (!t.disabled) upd('type', t.id); }}
                      disabled={t.disabled}
                      className="wizard-radio-row"
                      style={{ borderColor: isActive ? accent : 'var(--line)', width: '100%' }}>
                      <span style={{ fontSize: 22, marginRight: 10 }}>{t.icon}</span>
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontSize: 13.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                          {t.label}
                          {t.popular && <span className="wizard-type-badge popular">🔥 90% в TG</span>}
                          {t.disabled && <span className="wizard-type-badge locked">🔒 Wave 3</span>}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--fg-mute)', marginTop: 2 }}>{t.desc}</div>
                      </div>
                      {isActive && <iconify-icon icon="ph:check-circle-fill" width="20" height="20" style={{ color: accent }}/>}
                    </button>
                    {t.disabled && t.lockNote && (
                      <div className="wizard-type-locknote">{t.lockNote}</div>
                    )}
                  </div>
                );
              })}

            </div>
          );
        })()}

        {step === 2 && <Step2Settings data={data} upd={upd} accent={accent}/>}

        {step === 3 && <Step3Channels data={data} upd={upd}/>}

        {step === 4 && <Step4Publish data={data} upd={upd}/>}

        {step === 5 && <Step5Dates data={data} upd={upd} openCal={setCalCtx}/>}

        {step === 6 && <Step6Winners data={data} upd={upd}/>}

        {step === 7 && <Step7Boosts data={data} upd={upd}/>}

        {step === 8 && <Step8Invites data={data} upd={upd}/>}

        {step === 9 && <Step9Story data={data} upd={upd}/>}

        {step === 10 && <Step10Protection data={data} upd={upd} accent={accent}/>}

        {step === 11 && <Step11Preview data={data} accent={accent}/>}
      </div>

      {/* Help-link под content */}
      <div style={{ padding: '0 16px 8px', textAlign: 'center' }}>
        <button onClick={() => setHelpOpen(true)} className="wizard-help-link">
          <iconify-icon icon="ph:question-duotone" width="13" height="13" style={{ display: 'inline-flex' }}/>
          <span>Подсказка: {cur.title.toLowerCase()}</span>
        </button>
      </div>
      </div>
      {/* END MIDDLE */}

      {/* Footer (fixed at bottom of wizard flex column) */}
      <div className="wizard-footer" style={{ flexShrink: 0 }}>
        {step > 1 && (
          <button onClick={goPrev} className="wizard-nav-btn wizard-nav-prev">Назад</button>
        )}
        {step < TOTAL ? (
          <button onClick={goNext} className="wizard-nav-btn wizard-nav-next" style={{ background: accent }}>
            Далее ({step}/{TOTAL})
          </button>
        ) : (
          <button onClick={() => { onPublish ? onPublish(data) : onClose(); }} className="wizard-nav-btn wizard-nav-next wizard-publish-btn" style={{ background: accent }}>
            🚀 Опубликовать
          </button>
        )}
      </div>

      <Sheet open={previewOpen} onClose={() => setPreviewOpen(false)} title="Полный предпросмотр" subtitle="так увидят пользователи в посте канала">
        <div style={{ padding: '2px 0 12px' }}>
          <PreviewCard data={data} full/>
          <div className="wizard-preview-note">
            👁 Превью обновляется live. Поля из всех 11 шагов отображаются актуально.
          </div>
        </div>
      </Sheet>

      <Sheet open={!!calCtx} onClose={() => setCalCtx(null)} title="Дата и время" maxHeight="88%">
        {calCtx && (
          <WizCalendar value={calCtx.value}
            onApply={(v) => { calCtx.onApply(v); setCalCtx(null); }}
            onCancel={() => setCalCtx(null)}/>
        )}
      </Sheet>

      <Sheet open={helpOpen} onClose={() => setHelpOpen(false)} title={`Шаг ${step}: ${cur.title}`} subtitle="как это работает">
        {step === 1 ? (
          <div className="wizard-help-body">
            <p>Определяет ключевую механику получения билетов участником. Влияет на то, какие условия и поля появятся на следующих шагах.</p>

            <h4>🎁 Стандартный <span className="hb-tag">90% в TG</span></h4>
            <p>Юзер подписывается на канал(ы) → бот сам проверяет подписку → выдаёт 1 билет → случайный выбор победителей.</p>
            <p className="hb-when"><b>Когда выбирать:</b> первый запуск, проверка спроса, простая аудитория. Нет дополнительных условий, минимум friction.</p>

            <h4>⚡ За бусты канала</h4>
            <p>+1 билет за каждый Telegram Boost канала (max 10 у одного юзера). Boost усиливает охват канала на 1-2 недели — двойная выгода для оргов в зоне роста.</p>
            <p className="hb-warn"><b>Минус:</b> участнику нужен Telegram Premium, иначе он не сможет дать boost.</p>

            <h4>👥 За приглашения</h4>
            <p>+1 билет за каждого приведённого друга по личной ссылке-приглашению. Виральный рост через знакомых.</p>
            <p className="hb-warn"><b>Минус:</b> легко накрутить через мульти-аккаунты. Обязательно включи каптчу на шаге 10.</p>

            <h4>⚙️ Кастомный</h4>
            <p>Mix всего: подписка + бусты + приглашения + сторис. Все условия опциональны и комбинируются.</p>
            <p className="hb-when"><b>Когда выбирать:</b> опытные орги с проверенной аудиторией, повторные кампании, A/B-тесты формул билетов.</p>

            <h4>📦 QR-конкурс FMCG <span className="hb-tag locked">Wave 3</span></h4>
            <p>Скан QR с упаковки = автоматический вход. Бот сверяет уникальность QR по бренд-базе → юзер получает билет без дополнительных действий.</p>
            <p className="hb-when"><b>Доступно для брендов с верификацией.</b> Запрос: <code>support@fresh.app</code></p>

            <div className="hb-divider"/>
            <p className="hb-tip"><b>💡 Совет:</b> начинай со «Стандартного». Когда поймёшь воронку — добавляй виральные механики (приглашения / бусты).</p>
          </div>
        ) : (
          <div className="wizard-help-body">
            <p>{cur.help}</p>
          </div>
        )}
      </Sheet>
    </div>
  );
}

function WizardField({ label, children }) {
  return (
    <div>
      <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--fg-mute)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.4 }}>{label}</div>
      {children}
    </div>
  );
}

function WizardToggle({ value, onChange, label }) {
  return (
    <button onClick={() => onChange(!value)} className="wizard-toggle-row" style={{ borderColor: value ? 'var(--accent)' : 'var(--line)' }}>
      <div style={{ flex: 1, textAlign: 'left', fontSize: 13 }}>{label}</div>
      <div style={{ width: 38, height: 22, borderRadius: 12, background: value ? 'var(--accent)' : 'var(--bg-2)', border: '1px solid var(--line)', position: 'relative', transition: 'background 0.18s ease' }}>
        <div style={{ position: 'absolute', top: 2, left: value ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.18s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}/>
      </div>
    </button>
  );
}

function CharCounter({ current, max, best, note }) {
  let state = 'ok';
  if (current > max) state = 'bad';
  else if (current > Math.round(max * 0.85)) state = 'warn';
  return (
    <div className={`wizard-char-counter ${state}`}>
      <span className="cc-note">{note}</span>
      <span className="cc-num">{current}<span className="cc-max">/{max}</span></span>
    </div>
  );
}

const DESC_TEMPLATE = `🎁 Призы:
🥇 1 место:
🥈 2 место:

✅ Условия:
1. Жми кнопку «Участвовать»
2. Подпишись на канал-инициатор
3. Поставь реакцию на пост

🍀 Участвуй и побеждай!`;

// Реальные стили TG inline-button (Bot API 9.4, февраль 2026).
// Цвет адаптируется под тему юзера, ниже представительские hex для preview.
const TG_BTN_STYLES = [
  { id: 'default', color: '#3390EC' },
  { id: 'success', color: '#34C759' },
  { id: 'danger',  color: '#FF3B30' },
];
const styleToColor = (id) => (TG_BTN_STYLES.find(s => s.id === id) || TG_BTN_STYLES[0]).color;

function fmtEndDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  const pad = n => String(n).padStart(2, '0');
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// Общая preview-карточка TG-поста. `full=true` — показывает доп. блоки (каналы / победители / защита).
function PreviewCard({ data, full = false }) {
  const endDateFmt = fmtEndDate(data.endDate);
  const btnBg = styleToColor(data.buttonStyle);
  return (
    <div className="wizard-cta-preview-card tg-style">
      <div className="wizard-cta-tg-header">
        <div className="wizard-cta-tg-avatar">@</div>
        <span className="wizard-cta-tg-channel">@fresh_super_app</span>
      </div>
      {data.bannerUrl && (
        <img src={data.bannerUrl} alt="" className="wizard-cta-tg-banner"/>
      )}
      <div className="wizard-cta-tg-body">
        <div className="wizard-cta-tg-title">{data.title || 'Название розыгрыша'}</div>
        <div className="wizard-cta-tg-desc">{data.description || 'Условия розыгрыша, описание приза, дедлайн...'}</div>
        {full && data.subscribeChannels && data.subscribeChannels.length > 0 && (
          <div className="wizard-cta-tg-section">
            <div className="wizard-cta-tg-section-lbl">📁 Подписка на каналы</div>
            <div className="wizard-cta-tg-section-val">{data.subscribeChannels.filter(Boolean).join(' · ') || '—'}</div>
          </div>
        )}
        {full && (
          <div className="wizard-cta-tg-section">
            <div className="wizard-cta-tg-section-lbl">🏆 Победители</div>
            <div className="wizard-cta-tg-section-val">{data.winners || 1} · контакт: {data.contact || <em>не задан</em>}</div>
          </div>
        )}
        {full && data.captcha && (
          <div className="wizard-cta-tg-section">
            <div className="wizard-cta-tg-section-lbl">🛡 Защита</div>
            <div className="wizard-cta-tg-section-val">
              <span className="wizard-cta-tg-protchip">Каптча Cloudflare</span>
            </div>
          </div>
        )}
        <div className={`wizard-cta-tg-deadline${endDateFmt ? '' : ' empty'}`}>
          Дата окончания розыгрыша: {endDateFmt || <em>укажи на Шаге 5</em>}
        </div>
        <div className="wizard-cta-tg-reactions">
          <span className="rx">🔥 165</span>
          <span className="rx">❤️ 72</span>
          <span className="rx">🏆 37</span>
          <span className="rx">✅ 9</span>
          <span className="views">👁 12K</span>
          <span className="edit-time">изменено 14:21</span>
        </div>
      </div>
      <button className="wizard-cta-tg-btn" style={{ background: btnBg, color: '#fff' }}>
        {data.buttonText || 'Участвовать'} (1344)
      </button>
    </div>
  );
}

// ─── Step 3: каналы для подписки ───
const KNOWN_CHANNELS = {
  '@spotify':         { subs: '2.4M', verified: true },
  '@durov':           { subs: '1.8M', verified: true },
  '@telegram':        { subs: '14M',  verified: true },
  '@fresh_super_app': { subs: '12.4K', verified: false },
  '@kinopoisk':       { subs: '870K', verified: true },
  '@yandex':          { subs: '1.2M', verified: true },
};
function isValidChannel(u) {
  return /^@[a-zA-Z][a-zA-Z0-9_]{3,31}$/.test(u);
}
function mockChannel(username) {
  const u = username.toLowerCase();
  if (KNOWN_CHANNELS[u]) return KNOWN_CHANNELS[u];
  let h = 0;
  for (let i = 0; i < username.length; i++) h = (h * 31 + username.charCodeAt(i)) | 0;
  const n = Math.abs(h % 900) + 12;
  return { subs: n + 'K', verified: false };
}
function avatarColor(s) {
  const colors = ['#B8E641', '#5BE3F2', '#FFB85C', '#FF6B6B', '#C45BFF', '#5BA8FF'];
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return colors[Math.abs(h) % colors.length];
}

// Каналы, где бот «Фрэш» уже назначен админом — подтягиваются автоматически.
const MY_CHANNELS = [
  { u: '@fresh_super_app', role: 'Владелец' },
  { u: '@fresh_news',      role: 'Админ' },
  { u: '@fresh_deals',     role: 'Админ' },
];

function Step3Channels({ data, upd }) {
  const MAX = 5;
  const [addOpen, setAddOpen] = React.useState(false);
  const [inviteOpen, setInviteOpen] = React.useState(false);
  const [draft, setDraft] = React.useState('');
  const channels = data.subscribeChannels;
  const inviteLink = 't.me/FreshBot?startapp=colab_RZ7K2P';

  const addChannel = (u) => {
    if (channels.length >= MAX) { window.toast && window.toast('Максимум 5 каналов'); return; }
    if (channels.some(c => c.toLowerCase() === u.toLowerCase())) return;
    upd('subscribeChannels', [...channels, u]);
  };
  const copyInvite = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(inviteLink)
        .then(() => window.toast && window.toast('Ссылка скопирована'))
        .catch(() => window.toast && window.toast(inviteLink));
    } else {
      window.toast && window.toast(inviteLink);
    }
  };

  const normalized = (() => {
    let v = draft.trim();
    if (v && !v.startsWith('@')) v = '@' + v;
    return v;
  })();
  const canAdd = isValidChannel(normalized)
    && !channels.some(c => c.toLowerCase() === normalized.toLowerCase())
    && channels.length < MAX;

  const add = () => {
    if (!canAdd) {
      if (channels.some(c => c.toLowerCase() === normalized.toLowerCase())) {
        window.toast && window.toast('Этот канал уже добавлен');
      }
      return;
    }
    upd('subscribeChannels', [...channels, normalized]);
    setDraft('');
    setAddOpen(false);
  };
  const addByForward = () => {
    window.toast && window.toast('Перешли сообщение из канала боту — он добавит его автоматически (demo)');
  };
  const remove = (i) => upd('subscribeChannels', channels.filter((_, j) => j !== i));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <WizardField label={`Каналы для подписки · ${channels.length}/${MAX}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {channels.length === 0 && (
            <div className="wizard-channels-empty">Пока нет каналов — добавь хотя бы один</div>
          )}
          {channels.map((ch, i) => {
            const valid = isValidChannel(ch);
            const meta = mockChannel(ch);
            return (
              <div key={i} className={`wizard-channel-card${valid ? '' : ' invalid'}`}>
                <div className="wizard-channel-avatar" style={{ background: valid ? avatarColor(ch) : 'var(--bg-3)' }}>
                  {ch.replace('@', '').charAt(0).toUpperCase() || '?'}
                </div>
                <div className="wizard-channel-info">
                  <div className="wizard-channel-name">
                    {ch}
                    {valid && meta.verified && (
                      <iconify-icon icon="ph:seal-check-fill" width="13" height="13" style={{ color: '#3390EC' }}/>
                    )}
                  </div>
                  <div className="wizard-channel-subs">
                    {valid
                      ? `${meta.subs} подписчиков`
                      : <span style={{ color: '#FFB85C' }}>неверный формат @username</span>}
                  </div>
                </div>
                <button onClick={() => remove(i)} className="wizard-icon-btn" title="Убрать">
                  <iconify-icon icon="ph:trash-duotone" width="16" height="16"/>
                </button>
              </div>
            );
          })}
        </div>
      </WizardField>

      {(() => {
        const available = MY_CHANNELS.filter(mc => !channels.some(c => c.toLowerCase() === mc.u.toLowerCase()));
        if (available.length === 0) return null;
        return (
          <WizardField label="Мои каналы · бот уже админ">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {available.map(mc => {
                const meta = mockChannel(mc.u);
                return (
                  <div key={mc.u} className="wizard-channel-card">
                    <div className="wizard-channel-avatar" style={{ background: avatarColor(mc.u) }}>
                      {mc.u.replace('@', '').charAt(0).toUpperCase()}
                    </div>
                    <div className="wizard-channel-info">
                      <div className="wizard-channel-name">{mc.u}</div>
                      <div className="wizard-channel-subs">{meta.subs} подписчиков · {mc.role}</div>
                    </div>
                    <button onClick={() => addChannel(mc.u)} className="wizard-channel-add-btn"
                      disabled={channels.length >= MAX}>
                      + Добавить
                    </button>
                  </div>
                );
              })}
            </div>
          </WizardField>
        );
      })()}

      {channels.length < MAX ? (
        <button onClick={() => { setDraft(''); setAddOpen(true); }} className="wizard-add-btn">
          + Добавить другой канал
        </button>
      ) : (
        <div className="wizard-channels-empty">Достигнут лимит — 5 каналов</div>
      )}

      <button onClick={() => setInviteOpen(true)} className="wizard-invite-btn">
        <iconify-icon icon="ph:users-three-duotone" width="16" height="16"/>
        <span>Пригласить со-организаторов</span>
      </button>

      <Sheet open={addOpen} onClose={() => setAddOpen(false)} title="Добавить канал">
        <div style={{ padding: '2px 0 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 12.5, color: 'var(--fg-mute)', lineHeight: 1.5 }}>
            Введите ссылку на канал в формате <code style={{ color: 'var(--accent-strong)' }}>@example</code> или
            добавьте приватный канал через пересылку сообщения. Бот должен быть админом канала.
          </div>
          <input value={draft} onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
            placeholder="@mychannel" className="wizard-input" autoFocus/>
          <button onClick={add} disabled={!canAdd}
            className="wizard-nav-btn wizard-nav-next"
            style={{ background: canAdd ? '#3390EC' : 'var(--bg-3)', color: canAdd ? '#fff' : 'var(--fg-mute)', cursor: canAdd ? 'pointer' : 'not-allowed' }}>
            Добавить
          </button>
          <button onClick={addByForward} className="wizard-nav-btn wizard-nav-prev">
            Добавить через пересылку
          </button>
        </div>
      </Sheet>

      <Sheet open={inviteOpen} onClose={() => setInviteOpen(false)} title="Пригласить со-организаторов">
        <div style={{ padding: '2px 0 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 12.5, color: 'var(--fg-mute)', lineHeight: 1.5 }}>
            Отправьте ссылку другим админам каналов. Они откроют её, выберут свои каналы
            (где бот «Фрэш» — админ) и подключат их к этому розыгрышу.
          </div>
          <div className="wizard-invite-link">{inviteLink}</div>
          <button onClick={copyInvite} className="wizard-nav-btn wizard-nav-next"
            style={{ background: '#3390EC', color: '#fff' }}>
            Копировать ссылку
          </button>
          <button onClick={() => window.toast && window.toast('Выбери чат в Telegram для пересылки (demo)')}
            className="wizard-nav-btn wizard-nav-prev">
            Переслать в Telegram
          </button>
        </div>
      </Sheet>
    </div>
  );
}

// ─── Step 4: публикация поста ───
function Step4Publish({ data, upd }) {
  const MAX = 8;
  const [addOpen, setAddOpen] = React.useState(false);
  const [draft, setDraft] = React.useState('');
  const channels = data.publishChannels;

  const setChannels = (next) => { upd('publishChannels', next); upd('publishTouched', true); };

  // авто-подстановка каналов из Шага 3 при первом открытии шага
  React.useEffect(() => {
    if (!data.publishTouched && channels.length === 0 && data.subscribeChannels.length > 0) {
      setChannels([...data.subscribeChannels]);
    }
  }, []);

  const addChannel = (u) => {
    if (channels.length >= MAX) { window.toast && window.toast('Максимум 8 каналов'); return; }
    if (channels.some(c => c.toLowerCase() === u.toLowerCase())) return;
    setChannels([...channels, u]);
  };
  const remove = (i) => setChannels(channels.filter((_, j) => j !== i));

  const normalized = (() => {
    let v = draft.trim();
    if (v && !v.startsWith('@')) v = '@' + v;
    return v;
  })();
  const canAdd = isValidChannel(normalized)
    && !channels.some(c => c.toLowerCase() === normalized.toLowerCase())
    && channels.length < MAX;
  const add = () => {
    if (!canAdd) {
      if (channels.some(c => c.toLowerCase() === normalized.toLowerCase())) {
        window.toast && window.toast('Этот канал уже добавлен');
      }
      return;
    }
    setChannels([...channels, normalized]);
    setDraft('');
    setAddOpen(false);
  };
  const addByForward = () => {
    window.toast && window.toast('Перешли сообщение из канала боту — он добавит его автоматически (demo)');
  };

  const RESULTS = [
    { id: 'inline',   label: 'В исходном посте', hint: 'Имена победителей допишутся в тот же пост' },
    { id: 'separate', label: 'Отдельным постом', hint: 'Новый пост с итогами в тех же каналах' },
    { id: 'both',     label: 'И там, и там',     hint: 'Надёжнее всего — увидят все' },
  ];

  const available = MY_CHANNELS.filter(mc => !channels.some(c => c.toLowerCase() === mc.u.toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <WizardField label={`Где опубликовать пост · ${channels.length}/${MAX}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {channels.length === 0 && (
            <div className="wizard-channels-empty">Добавь хотя бы один канал — там выйдет пост-розыгрыш</div>
          )}
          {channels.map((ch, i) => {
            const valid = isValidChannel(ch);
            const meta = mockChannel(ch);
            return (
              <div key={i} className={`wizard-channel-card${valid ? '' : ' invalid'}`}>
                <div className="wizard-channel-avatar" style={{ background: valid ? avatarColor(ch) : 'var(--bg-3)' }}>
                  {ch.replace('@', '').charAt(0).toUpperCase() || '?'}
                </div>
                <div className="wizard-channel-info">
                  <div className="wizard-channel-name">
                    {ch}
                    {valid && meta.verified && (
                      <iconify-icon icon="ph:seal-check-fill" width="13" height="13" style={{ color: '#3390EC' }}/>
                    )}
                  </div>
                  <div className="wizard-channel-subs">
                    {valid
                      ? `${meta.subs} подписчиков`
                      : <span style={{ color: '#FFB85C' }}>неверный формат @username</span>}
                  </div>
                </div>
                <button onClick={() => remove(i)} className="wizard-icon-btn" title="Убрать">
                  <iconify-icon icon="ph:trash-duotone" width="16" height="16"/>
                </button>
              </div>
            );
          })}
        </div>
        <div className="wizard-preview-note">Подставлены каналы из Шага 3 — отредактируй, если пост нужен не везде</div>
      </WizardField>

      {available.length > 0 && (
        <WizardField label="Мои каналы · бот уже админ">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {available.map(mc => {
              const meta = mockChannel(mc.u);
              return (
                <div key={mc.u} className="wizard-channel-card">
                  <div className="wizard-channel-avatar" style={{ background: avatarColor(mc.u) }}>
                    {mc.u.replace('@', '').charAt(0).toUpperCase()}
                  </div>
                  <div className="wizard-channel-info">
                    <div className="wizard-channel-name">{mc.u}</div>
                    <div className="wizard-channel-subs">{meta.subs} подписчиков · {mc.role}</div>
                  </div>
                  <button onClick={() => addChannel(mc.u)} className="wizard-channel-add-btn"
                    disabled={channels.length >= MAX}>
                    + Добавить
                  </button>
                </div>
              );
            })}
          </div>
        </WizardField>
      )}

      {channels.length < MAX ? (
        <button onClick={() => { setDraft(''); setAddOpen(true); }} className="wizard-add-btn">
          + Добавить другой канал
        </button>
      ) : (
        <div className="wizard-channels-empty">Достигнут лимит — 8 каналов</div>
      )}

      <WizardField label="Настройки поста">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <WizardToggle value={data.pinPost} onChange={(v) => upd('pinPost', v)} label="Закрепить пост в каналах"/>
          <WizardToggle value={data.silentPost} onChange={(v) => upd('silentPost', v)} label="Опубликовать без звука"/>
        </div>
      </WizardField>

      <WizardField label="Объявление итогов">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {RESULTS.map(r => (
            <button key={r.id} onClick={() => upd('resultsMode', r.id)}
              className={`wizard-radio-card${data.resultsMode === r.id ? ' active' : ''}`}>
              <div className="wizard-radio-dot"/>
              <div className="wizard-radio-text">
                <div className="wizard-radio-label">{r.label}</div>
                <div className="wizard-radio-hint">{r.hint}</div>
              </div>
            </button>
          ))}
        </div>
      </WizardField>

      <Sheet open={addOpen} onClose={() => setAddOpen(false)} title="Добавить канал">
        <div style={{ padding: '2px 0 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 12.5, color: 'var(--fg-mute)', lineHeight: 1.5 }}>
            Введите ссылку на канал в формате <code style={{ color: 'var(--accent-strong)' }}>@example</code> или
            добавьте приватный канал через пересылку сообщения. Бот должен быть админом — иначе он не сможет опубликовать пост.
          </div>
          <input value={draft} onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
            placeholder="@mychannel" className="wizard-input" autoFocus/>
          <button onClick={add} disabled={!canAdd}
            className="wizard-nav-btn wizard-nav-next"
            style={{ background: canAdd ? '#3390EC' : 'var(--bg-3)', color: canAdd ? '#fff' : 'var(--fg-mute)', cursor: canAdd ? 'pointer' : 'not-allowed' }}>
            Добавить
          </button>
          <button onClick={addByForward} className="wizard-nav-btn wizard-nav-prev">
            Добавить через пересылку
          </button>
        </div>
      </Sheet>
    </div>
  );
}

// ─── Step 5: даты ───
function toLocalInput(d) {
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const WIZ_WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const WIZ_MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

// Календарь с выбором времени — открывается в нижнем Sheet по клику на поле даты.
function WizCalendar({ value, onApply, onCancel }) {
  const init = (() => {
    const d = value ? new Date(value) : null;
    return (d && !isNaN(d.getTime())) ? d : new Date();
  })();
  const [view, setView] = React.useState(new Date(init.getFullYear(), init.getMonth(), 1));
  const [sel, setSel] = React.useState(
    value ? new Date(init.getFullYear(), init.getMonth(), init.getDate()) : null);
  const [hour, setHour] = React.useState(value ? init.getHours() : 12);
  const [minute, setMinute] = React.useState(value ? init.getMinutes() : 0);

  const y = view.getFullYear(), m = view.getMonth();
  const firstDow = (new Date(y, m, 1).getDay() + 6) % 7; // понедельник = 0
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const today = new Date(); today.setHours(0, 0, 0, 0);

  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const apply = () => {
    if (!sel) { window.toast && window.toast('Сначала выбери день'); return; }
    onApply(toLocalInput(new Date(sel.getFullYear(), sel.getMonth(), sel.getDate(), hour, minute)));
  };

  return (
    <div className="wizard-cal">
      <div className="wizard-cal-nav">
        <button type="button" onClick={() => setView(new Date(y, m - 1, 1))} className="wizard-cal-arrow">‹</button>
        <span className="wizard-cal-month">{WIZ_MONTHS[m]} {y}</span>
        <button type="button" onClick={() => setView(new Date(y, m + 1, 1))} className="wizard-cal-arrow">›</button>
      </div>
      <div className="wizard-cal-grid">
        {WIZ_WEEKDAYS.map(w => <div key={w} className="wizard-cal-dow">{w}</div>)}
      </div>
      <div className="wizard-cal-grid">
        {cells.map((d, i) => {
          if (d === null) return <div key={i}/>;
          const cellDate = new Date(y, m, d);
          const isPast = cellDate < today;
          const isSel = sel && sel.getFullYear() === y && sel.getMonth() === m && sel.getDate() === d;
          const isToday = cellDate.getTime() === today.getTime();
          return (
            <button key={i} type="button" disabled={isPast}
              onClick={() => setSel(new Date(y, m, d))}
              className={`wizard-cal-day${isSel ? ' sel' : ''}${isToday ? ' today' : ''}`}>
              {d}
            </button>
          );
        })}
      </div>
      <div className="wizard-cal-time">
        <span className="wizard-cal-time-lbl">Время</span>
        <select value={hour} onChange={e => setHour(+e.target.value)} className="wizard-cal-select">
          {Array.from({ length: 24 }, (_, h) => (
            <option key={h} value={h}>{String(h).padStart(2, '0')}</option>
          ))}
        </select>
        <span className="wizard-cal-colon">:</span>
        <select value={minute} onChange={e => setMinute(+e.target.value)} className="wizard-cal-select">
          {Array.from({ length: 60 }, (_, mm) => (
            <option key={mm} value={mm}>{String(mm).padStart(2, '0')}</option>
          ))}
        </select>
      </div>
      <div className="wizard-cal-actions">
        <button type="button" onClick={onCancel} className="wizard-nav-btn wizard-nav-prev">Отмена</button>
        <button type="button" onClick={apply} className="wizard-nav-btn wizard-nav-next"
          style={{ background: '#3390EC', color: '#fff' }}>Готово</button>
      </div>
    </div>
  );
}

// Поле даты-времени: показывает значение, по клику открывает общий календарь мастера.
function DateTimeField({ value, onChange, placeholder, openCal }) {
  const display = fmtEndDate(value);
  return (
    <button type="button" className="wizard-datetime-field"
      onClick={() => openCal({ value, onApply: onChange })}>
      <iconify-icon icon="ph:calendar-blank-duotone" width="18" height="18"/>
      <span className={display ? 'wizard-datetime-val' : 'wizard-datetime-ph'}>
        {display || placeholder || 'Выбрать дату и время'}
      </span>
      <iconify-icon icon="ph:caret-down-bold" width="12" height="12" style={{ marginLeft: 'auto', opacity: 0.5 }}/>
    </button>
  );
}

function Step5Dates({ data, upd, openCal }) {
  const endFmt = fmtEndDate(data.endDate);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

      <WizardField label="Старт розыгрыша">
        <WizardToggle value={data.startNow} onChange={(v) => upd('startNow', v)}
          label="Начать сразу после публикации"/>
        {!data.startNow && (
          <div style={{ marginTop: 8 }}>
            <DateTimeField value={data.startDate}
              onChange={v => upd('startDate', v)}
              placeholder="Выбрать дату и время старта"
              openCal={openCal}/>
          </div>
        )}
      </WizardField>

      <WizardField label="Завершение розыгрыша">
        <DateTimeField value={data.endDate}
          onChange={v => upd('endDate', v)}
          placeholder="Выбрать дату и время завершения"
          openCal={openCal}/>
        {endFmt && <div className="wizard-preview-note">Розыгрыш завершится: {endFmt}</div>}
      </WizardField>

      <div className="wizard-preview-note">
        🕒 Всё время — московское (МСК, GMT+3). Победители выбираются автоматически после завершения.
      </div>
    </div>
  );
}

// Степпер числа: [−] [значение] [+]
function NumberStepper({ value, onChange, min = 0, max = 999 }) {
  const set = (v) => onChange(Math.max(min, Math.min(max, v)));
  return (
    <div className="wizard-numstep">
      <button type="button" onClick={() => set(value - 1)} disabled={value <= min}
        className="wizard-numstep-btn">−</button>
      <input type="number" value={value} min={min} max={max}
        onChange={e => set(parseInt(e.target.value) || min)}
        className="wizard-numstep-input"/>
      <button type="button" onClick={() => set(value + 1)} disabled={value >= max}
        className="wizard-numstep-btn">+</button>
    </div>
  );
}

// ─── Step 6: победители ───
function Step6Winners({ data, upd }) {
  const contact = (data.contact || '').trim();
  const contactValid = !contact || isValidChannel(contact.startsWith('@') ? contact : '@' + contact);

  const DEADLINES = [
    { h: 24, label: '24 часа',  hint: 'Быстро, но победитель может не успеть' },
    { h: 48, label: '48 часов', hint: 'Оптимально для большинства розыгрышей' },
    { h: 72, label: '72 часа',  hint: 'Запас для неактивной аудитории' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

      <WizardField label="Сколько победителей">
        <NumberStepper value={data.winners} onChange={v => upd('winners', v)} min={1} max={100}/>
      </WizardField>

      <WizardField label="Срок на подтверждение">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {DEADLINES.map(d => (
            <button key={d.h} onClick={() => upd('claimDeadline', d.h)}
              className={`wizard-radio-card${data.claimDeadline === d.h ? ' active' : ''}`}>
              <div className="wizard-radio-dot"/>
              <div className="wizard-radio-text">
                <div className="wizard-radio-label">{d.label}</div>
                <div className="wizard-radio-hint">{d.hint}</div>
              </div>
            </button>
          ))}
        </div>
        <div className="wizard-preview-note">
          Бот напишет победителю и даст кнопку «Забрать приз». Это время — на нажатие.
        </div>
      </WizardField>

      <WizardField label="Авто-реролл">
        <WizardToggle value={data.autoReroll} onChange={v => upd('autoReroll', v)}
          label="Перевыбрать победителя, если прежний не подтвердил или отказался"/>
        <div className="wizard-preview-note">
          {data.autoReroll
            ? 'Не нажал «Забрать приз» за срок или отказался — бот сразу разыгрывает это место заново среди участников. И так, пока не найдётся тот, кто заберёт приз.'
            : 'Приз остаётся неразыгранным — замену подключаешь вручную.'}
        </div>
      </WizardField>

      <WizardField label="Контакт для связи">
        <input value={data.contact} onChange={e => upd('contact', e.target.value)}
          placeholder="@your_username" className="wizard-input"/>
        <div style={{ fontSize: 11, marginTop: 6, lineHeight: 1.4,
          color: (contact && !contactValid) ? '#FFB85C' : 'var(--fg-mute)' }}>
          {contact && !contactValid
            ? 'Нужен формат @username'
            : 'Победитель получит этот контакт после подтверждения — чтобы договориться о доставке приза'}
        </div>
      </WizardField>

    </div>
  );
}

// ─── Step 7: бусты каналов ───
function Step7Boosts({ data, upd }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

      <WizardToggle value={data.enableBoost} onChange={(v) => upd('enableBoost', v)}
        label="Бусты канала дают дополнительные билеты"/>

      {data.enableBoost && (
        <>
          <WizardField label="Какой канал бустить">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {MY_CHANNELS.map(mc => {
                const meta = mockChannel(mc.u);
                const sel = data.boostChannel === mc.u;
                return (
                  <button key={mc.u} onClick={() => upd('boostChannel', mc.u)}
                    className={`wizard-radio-card${sel ? ' active' : ''}`}>
                    <div className="wizard-radio-dot"/>
                    <div className="wizard-radio-text">
                      <div className="wizard-radio-label">{mc.u}</div>
                      <div className="wizard-radio-hint">{meta.subs} подписчиков · {mc.role}</div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="wizard-preview-note">
              Бот видит бусты только в канале, где он назначен админом
            </div>
          </WizardField>

          <WizardField label="Билетов за один буст">
            <NumberStepper value={data.boostTickets} onChange={v => upd('boostTickets', v)} min={1} max={50}/>
          </WizardField>

          <WizardField label="Сколько бустов засчитываем с участника">
            <NumberStepper value={data.boostCap} onChange={v => upd('boostCap', v)} min={1} max={10}/>
            <div className="wizard-preview-note">
              У Premium-пользователя может быть несколько бустов. Сверх этого числа билеты не начисляем.
            </div>
          </WizardField>
        </>
      )}

    </div>
  );
}

// ─── Step 8: приглашение друзей ───
function Step8Invites({ data, upd }) {
  const unlimited = data.maxInvites === 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

      <WizardToggle value={data.enableInvite} onChange={(v) => upd('enableInvite', v)}
        label="Приглашённые друзья дают дополнительные билеты"/>

      {data.enableInvite && (
        <>
          <WizardField label="Билетов за одного друга">
            <NumberStepper value={data.inviteTickets} onChange={v => upd('inviteTickets', v)} min={1} max={50}/>
          </WizardField>

          <WizardField label="Максимум приглашений в зачёт">
            <WizardToggle value={unlimited} onChange={(v) => upd('maxInvites', v ? 0 : 3)}
              label="Без ограничений"/>
            {!unlimited && (
              <div style={{ marginTop: 8 }}>
                <NumberStepper value={data.maxInvites} onChange={v => upd('maxInvites', v)} min={1} max={50}/>
              </div>
            )}
            <div className="wizard-preview-note">
              {unlimited
                ? 'Билеты начисляем за каждого приглашённого друга, потолка нет'
                : 'Больше этого числа друзей билеты одному участнику не начисляем'}
            </div>
          </WizardField>

          <div className="wizard-preview-note">
            Друг засчитан, когда подпишется на каналы розыгрыша. Каждому участнику бот выдаст личную ссылку-приглашение — по ней он зовёт друзей.
          </div>
        </>
      )}

    </div>
  );
}

// ─── Step 9: постинг сторис ───
function Step9Story({ data, upd }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

      <WizardToggle value={data.enableStory} onChange={(v) => upd('enableStory', v)}
        label="Сторис даёт дополнительные билеты"/>

      {data.enableStory && (
        <>
          <WizardField label="Билетов за сторис">
            <NumberStepper value={data.storyTickets} onChange={v => upd('storyTickets', v)} min={1} max={50}/>
          </WizardField>

          <div style={{ padding: '11px 13px', background: 'var(--bg-2)', borderRadius: 10,
            fontSize: 11.5, color: 'var(--fg-mute)', lineHeight: 1.5 }}>
            <b style={{ color: 'var(--fg)' }}>Как проверяется:</b> участник публикует сторис и пересылает её боту.
            Бот убедится, что сторис настоящая и опубликована самим участником — билеты начислятся автоматически,
            без ручного подтверждения. Текст сторис бот не читает — проверяет только сам факт публикации.
          </div>
        </>
      )}

    </div>
  );
}

// ─── Step 10: защита от ботов ───
function Step10Protection({ data, upd, accent, embedded }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

      <WizardField label="Защита от ботов">
        <WizardToggle value={data.captcha} onChange={(v) => upd('captcha', v)}
          label="Каптча при участии"/>
        <div style={{ fontSize: 11.5, marginTop: 6, color: 'var(--fg-mute)', lineHeight: 1.5 }}>
          {data.captcha
            ? 'При входе в розыгрыш мини-апп проходит проверку Cloudflare — чаще всего невидимую, иногда с чекбоксом «я человек». Отсекает ботов и почти не мешает живым участникам.'
            : 'Без каптчи участвовать смогут и боты. Включи, если приз ценный.'}
        </div>
      </WizardField>

      <div style={{ padding: '11px 13px', background: 'var(--bg-2)', borderRadius: 10,
        fontSize: 11.5, color: 'var(--fg-mute)', lineHeight: 1.5 }}>
        <b style={{ color: 'var(--fg)' }}>Проверка победителя:</b> бот проверяет победителей
        автоматически — без ручного участия организатора.
      </div>

      {!embedded && (
        <div style={{ marginTop: 6, padding: 14, background: 'var(--accent-soft)', borderRadius: 10, border: `1px solid var(--accent-line)` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: accent, marginBottom: 6 }}>Розыгрыш готов</div>
          <div style={{ fontSize: 11.5, color: 'var(--fg-mute)', lineHeight: 1.5 }}>
            Тип: <b style={{ color: 'var(--fg)' }}>{data.type}</b> · {data.subscribeChannels.length} канал(ов) подписки · {data.winners} победителей
          </div>
        </div>
      )}

    </div>
  );
}

// ─── Step 11: предварительный просмотр поста ───
function Step11Preview({ data, accent }) {
  const targets = (data.publishChannels || []).filter(Boolean);
  const missing = [];
  if (!data.title || !data.title.trim()) missing.push('название (Шаг 2)');
  if (!data.endDate) missing.push('дату окончания (Шаг 5)');
  const ready = missing.length === 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 12, color: 'var(--fg-mute)', lineHeight: 1.5 }}>
        Так розыгрыш увидят подписчики канала. Проверь пост — любой шаг можно
        поправить кнопкой «Назад».
      </div>

      <PreviewCard data={data}/>

      <WizardField label="Куда опубликуем">
        {targets.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {targets.map(ch => (
              <div key={ch} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 10px', background: 'var(--bg-2)',
                border: '1px solid var(--line)', borderRadius: 8,
                fontSize: 13, color: 'var(--fg)' }}>
                <iconify-icon icon="ph:telegram-logo-duotone" width="16" height="16"
                  style={{ color: accent, display: 'inline-flex' }}/>
                <span>{ch}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            padding: '8px 10px', background: 'var(--bg-2)',
            border: '1px solid var(--line)', borderRadius: 8,
            fontSize: 12, color: 'var(--fg-mute)' }}>
            Канал для публикации не выбран — задай на Шаге 4.
          </div>
        )}
        <div style={{ fontSize: 11, color: 'var(--fg-mute)', marginTop: 6, lineHeight: 1.5 }}>
          {data.pinPost ? '📌 Пост закрепят в канале' : 'Пост не закрепляют'}
          {' · '}
          {data.silentPost ? 'без звука уведомления' : 'со звуком уведомления'}
        </div>
      </WizardField>

      {!ready && (
        <div style={{
          padding: '10px 12px', background: 'var(--bg-2)', borderRadius: 10,
          border: '1px solid var(--warn)', fontSize: 11.5,
          color: 'var(--fg)', lineHeight: 1.5 }}>
          ⚠️ Перед публикацией заполни: {missing.join(', ')}.
        </div>
      )}

      <div style={{
        padding: 14, background: 'var(--accent-soft)', borderRadius: 10,
        border: '1px solid var(--accent-line)' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: accent, marginBottom: 6 }}>
          {ready ? 'Розыгрыш готов к публикации' : 'Почти готово'}
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--fg-mute)', lineHeight: 1.5 }}>
          После кнопки «Опубликовать» пост появится в выбранных каналах,
          а бот начнёт принимать участников.
        </div>
      </div>
    </div>
  );
}

function Step2Settings({ data, upd, accent, embedded }) {
  const PRESET_BTN_TEXT = ['Участвовать', 'Принять участие', 'Участвую!'];
  const isCustomBtnText = !PRESET_BTN_TEXT.includes(data.buttonText);

  const onPickFile = (file) => {
    if (!file || !file.type || !file.type.startsWith('image/')) return;
    if (file.size > 2 * 1024 * 1024) {
      window.toast && window.toast('Картинка > 2 MB — выбери поменьше');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => upd('bannerUrl', e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <WizardField label="Картинка/баннер">
        {!data.bannerUrl ? (
          <label className="wizard-banner-drop">
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => onPickFile(e.target.files && e.target.files[0])}/>
            <iconify-icon icon="ph:image-duotone" width="22" height="22" style={{ color: 'var(--accent)' }}/>
            <span>Загрузить картинку (макс 2 MB)</span>
          </label>
        ) : (
          <div className="wizard-banner-preview">
            <img src={data.bannerUrl} alt="banner"/>
            <div className="wizard-banner-actions">
              <label className="wizard-banner-action">
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => onPickFile(e.target.files && e.target.files[0])}/>
                <iconify-icon icon="ph:arrow-clockwise-bold" width="14" height="14"/>
                <span>Заменить</span>
              </label>
              <button className="wizard-banner-action danger" onClick={() => upd('bannerUrl', '')}>
                <iconify-icon icon="ph:trash-duotone" width="14" height="14"/>
                <span>Удалить</span>
              </button>
            </div>
          </div>
        )}
      </WizardField>

      <WizardField label="Название розыгрыша">
        <input value={data.title} onChange={e => upd('title', e.target.value)} placeholder="iPhone 16 Pro" className="wizard-input" maxLength={80}/>
        <CharCounter current={(data.title || '').length} max={60} note="Лучше 30-50"/>
      </WizardField>

      <WizardField label="Описание">
        <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
          <button onClick={() => {
            if (data.description && !confirm('Заменить текущий текст шаблоном?')) return;
            upd('description', DESC_TEMPLATE);
          }} className="wizard-template-btn">📝 Заготовка</button>
        </div>
        <textarea value={data.description} onChange={e => upd('description', e.target.value)}
          placeholder="Условия, как получит победитель..." className="wizard-input"
          style={{ minHeight: 110, resize: 'vertical' }} maxLength={500}/>
        <CharCounter current={(data.description || '').length} max={280} note="Первые 110 = TG-preview"/>
      </WizardField>

      <WizardField label="Текст кнопки участия">
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {PRESET_BTN_TEXT.map(t => (
            <Chip key={t} active={!isCustomBtnText && data.buttonText === t} onClick={() => upd('buttonText', t)}>{t}</Chip>
          ))}
          <Chip active={isCustomBtnText} onClick={() => upd('buttonText', '')}>✏ Свой</Chip>
        </div>
        {isCustomBtnText && (
          <input value={data.buttonText} onChange={e => upd('buttonText', e.target.value)}
            placeholder="Свой текст кнопки" className="wizard-input" maxLength={30}
            style={{ marginTop: 8 }} autoFocus/>
        )}
      </WizardField>

      <WizardField label="Цвет кнопки">
        <div style={{ display: 'flex', gap: 10 }}>
          {TG_BTN_STYLES.map(s => {
            const sel = data.buttonStyle === s.id;
            return (
              <button key={s.id} onClick={() => upd('buttonStyle', s.id)}
                className="wizard-color-chip"
                style={{ background: s.color, outline: sel ? `2px solid ${s.color}` : 'none', outlineOffset: 3 }}
                title={s.id}/>
            );
          })}
        </div>
      </WizardField>

      {/* Mini CTA preview */}
      {!embedded && (
        <div className="wizard-cta-preview">
          <div className="wizard-cta-preview-lbl">Так увидят пользователи в посте</div>
          <PreviewCard data={data}/>
        </div>
      )}
    </div>
  );
}

// Legacy alias — оставляем чтобы не сломать app.jsx при импорте.
const LotteryStubScreen = LotteryModule;

// ─── Лента (Reddit-аналог, заглушка Этап 0; реализация Этап 3) ──
// 3 sample-поста с голосованием + AI-merge multi-source.
// Full-UGC + комменты + anti-fraud формула — Этап 3.
function FeedStubScreen({ accent = '#B8E641' }) {
  const samples = [
    { src: ['@durov'], multi: false, ts: '3 мин',  title: 'Telegram Stars обновление: subscriptions с триал-периодом, авто-renew', votes: 1842, comments: 256, tag: 'Технологии' },
    { src: ['@meduzaproject', '@bbcrussian', '@reuters_ru'], multi: true, ts: '8 мин',  title: 'AI-merged: ЕС принял регламент об обязательной маркировке AI-сгенерированного контента в соцсетях', votes: 743, comments: 89,  tag: 'Новости' },
    { src: ['@gamedev_ru'], multi: false, ts: '24 мин', title: 'Indie-разработчик собрал $500k на Kickstarter за 24 часа — pixelart MMORPG', votes: 421, comments: 132, tag: 'Игры' },
  ];
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 90px', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4 }} className="display">Лента</div>
          <div style={{ fontSize: 12, color: 'var(--fg-mute)', marginTop: 2 }}>Reddit-аналог · фильтры + голосование + AI-merge</div>
        </div>
        <button onClick={() => window.toast && window.toast('Поиск — Этап 3')} aria-label="Поиск" className="hero-iconbtn" style={{ width: 38, height: 38, borderRadius: 12 }}>
          <iconify-icon icon="ph:magnifying-glass-duotone" width="20" height="20" style={{ color: 'var(--fg-mute)' }}/>
        </button>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto' }}>
        {['Горячее', 'Новое', 'Топ за день', 'Подписки'].map((label, i) => (
          <Chip key={label} active={i === 0}>{label}</Chip>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {samples.map((p, i) => (
          <div key={i} className="feed-stub-post">
            <div className="feed-stub-meta">
              <div className="feed-stub-sources">
                {p.src.slice(0, 3).map((s, j) => (
                  <div key={j} className="feed-stub-avatar" style={{ marginLeft: j > 0 ? -8 : 0, zIndex: 3 - j }}>
                    {s.replace('@', '').charAt(0).toUpperCase()}
                  </div>
                ))}
                <span style={{ marginLeft: 8 }}>{p.src[0]}{p.multi && ` +${p.src.length - 1}`}</span>
                {p.multi && <span className="feed-stub-merge-chip">AI-merge</span>}
              </div>
              <span style={{ fontSize: 11, color: 'var(--fg-dim)' }}>{p.ts}</span>
            </div>
            <div className="feed-stub-title">{p.title}</div>
            <div className="feed-stub-actions">
              <div className="feed-stub-vote">
                <button onClick={() => window.toast && window.toast('+1 голос (вес 0.4 — новичок)')} aria-label="Голос +">
                  <iconify-icon icon="ph:arrow-fat-up-duotone" width="16" height="16" style={{ display: 'inline-flex' }}/>
                </button>
                <span className="mono">{p.votes.toLocaleString('ru-RU')}</span>
                <button onClick={() => window.toast && window.toast('-1 голос')} aria-label="Голос -">
                  <iconify-icon icon="ph:arrow-fat-down-duotone" width="16" height="16" style={{ display: 'inline-flex' }}/>
                </button>
              </div>
              <span className="feed-stub-comment-count">
                <iconify-icon icon="ph:chat-circle-duotone" width="13" height="13" style={{ display: 'inline-flex', marginRight: 4 }}/>
                {p.comments}
              </span>
              <span className="feed-stub-tag">{p.tag}</span>
              <button className="feed-stub-icon-btn" onClick={() => window.toast && window.toast('Поделиться — Этап 3')} aria-label="Поделиться">
                <iconify-icon icon="ph:share-network-duotone" width="14" height="14" style={{ display: 'inline-flex' }}/>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="module-stub-note">
        <iconify-icon icon="ph:info-duotone" width="16" height="16" style={{ display: 'inline-flex', color: 'var(--fg-mute)', flexShrink: 0 }}/>
        <span>Каркас Этап 0. Full-UGC + создание постов + комменты + anti-fraud + permalink — Этап 3.</span>
      </div>
    </div>
  );
}

// ─── Профиль (super-app version, теперь через header overlay не в TabBar) ──
// Аватар + Кристаллы balance + уровень + sections. embedded=true рендерит без outer padding (внутри Sheet).
function MeSuperAppScreen({ accent = '#B8E641', crystals = 0, vpnDays = 0, isAdmin = false, embedded = false }) {
  const sections = [
    { id: 'premium',   icon: 'ph:crown-duotone',         label: 'Премиум',          sub: '199 ⭐/мес · x2 Кристаллов в mini-games + ad-free Лента', badge: 'NEW' },
    { id: 'tasks',     icon: 'ph:target-duotone',        label: 'Задания + игры',   sub: 'Заработай Кристаллы и бонусные дни VPN' },
    { id: 'referral',  icon: 'ph:user-plus-duotone',     label: 'Друзья',           sub: 'Реф-код один на все модули · 5 дней VPN за друга' },
    { id: 'history',   icon: 'ph:clock-counter-clockwise-duotone', label: 'История', sub: 'Транзакции Кристаллов + VPN-дни + ачивки' },
    { id: 'support',   icon: 'ph:lifebuoy-duotone',      label: 'Поддержка',        sub: '@FreshSupportBot · ответ в течение 2 часов' },
    { id: 'settings',  icon: 'ph:gear-six-duotone',      label: 'Настройки',        sub: 'Уведомления · приватность · язык' },
  ];
  const containerStyle = embedded
    ? { padding: '4px 0 12px' }
    : { flex: 1, overflowY: 'auto', padding: '14px 16px 90px', position: 'relative' };
  return (
    <div style={containerStyle}>
      {/* Avatar + name + level */}
      <div className="me-card">
        <div className="me-avatar" style={{ background: `linear-gradient(160deg, ${accent}, #1F7A3A)` }}>
          А
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3 }}>Алексей</div>
          <div style={{ fontSize: 12, color: 'var(--fg-mute)', marginTop: 2 }}>@alexsmith · уровень 7</div>
          <div className="me-level-bar">
            <div className="me-level-fill" style={{ width: '64%', background: accent }}/>
          </div>
          <div style={{ fontSize: 10, color: 'var(--fg-dim)', marginTop: 4, letterSpacing: 0.3, textTransform: 'uppercase' }}>
            до уровня 8: 320 XP · награда +50 дн VPN
          </div>
        </div>
      </div>

      {/* Balance row: Кристаллы + дни VPN */}
      <div style={{ display: 'flex', gap: 8, marginTop: 12, marginBottom: 14 }}>
        <Stat label="Кристаллы" value={crystals.toLocaleString('ru-RU')} unit="💎" accent={accent}/>
        <Stat label="Дни VPN" value={vpnDays} unit="дн"/>
      </div>

      {/* Admin badge (только для admin user_id) */}
      {isAdmin && (
        <button onClick={() => window.toast && window.toast('Admin dashboard — Этап 5')} className="me-admin-card">
          <div className="me-admin-icon" style={{ background: `linear-gradient(135deg, ${accent}, #d97a64)` }}>
            <iconify-icon icon="ph:wrench-duotone" width="18" height="18" style={{ color: '#0E0E10' }}/>
          </div>
          <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--accent-strong)' }}>Admin · dashboard</div>
            <div style={{ fontSize: 11, color: 'var(--fg-mute)', marginTop: 2 }}>Статистика · модерация · юзеры · розыгрыши · игры · audit-log</div>
          </div>
          <IconChevron size={16} stroke="var(--accent-strong)"/>
        </button>
      )}

      {/* Sections list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {sections.map(s => (
          <button key={s.id} onClick={() => window.toast && window.toast(`${s.label} — будущий этап`)} className="me-section-row">
            <iconify-icon icon={s.icon} width="22" height="22" style={{ display: 'inline-flex', color: 'var(--accent-strong)', flexShrink: 0 }}/>
            <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                {s.label}
                {s.badge && <span className="me-section-badge">{s.badge}</span>}
              </div>
              <div style={{ fontSize: 11, color: 'var(--fg-mute)', marginTop: 2 }}>{s.sub}</div>
            </div>
            <IconChevron size={16} stroke="var(--fg-dim)"/>
          </button>
        ))}
      </div>

      <div className="module-stub-note">
        <iconify-icon icon="ph:info-duotone" width="16" height="16" style={{ display: 'inline-flex', color: 'var(--fg-mute)', flexShrink: 0 }}/>
        <span>Каркас Этап 0. Tasks + mini-games (4 игры) — Этап 2. Admin-dashboard — Этап 5.</span>
      </div>
    </div>
  );
}

Object.assign(window, {
  HomeScreen, PlansScreen, ProfileScreen, InviteScreen, BonusScreen,
  PaymentsScreen,
  ReferralCalculator, CheckoutPanel,
  LotteryStubScreen, LotteryModule, FeedStubScreen, MeSuperAppScreen,
  MainHomeScreen, TasksStubScreen,
});
