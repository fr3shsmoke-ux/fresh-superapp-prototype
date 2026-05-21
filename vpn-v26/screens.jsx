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
        {/* Основная карточка — ключ доступа */}
        <div className="key-hero" style={{
          padding: '22px 18px 18px', borderRadius: 'var(--r-xl)', marginBottom: 14,
          border: '1px solid var(--accent-line)', position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative shield-check */}
          <div className="hero-orb" aria-hidden="true">
            <span className="hero-orb-pulse"/>
            <iconify-icon icon="ph:shield-check-duotone" width="92" height="92" style={{ color: 'var(--accent)' }}/>
          </div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="hero-status">
              <span className="hero-status-dot"/>
              Подписка активна
            </div>

            <h2 className="hero-title display">
              Премиум
              <span className="hero-title-sub">327 дней</span>
            </h2>

            <div className="hero-tagline">
              до 19.03.2027 · 3 устройства
            </div>

            <div className="hero-actions">
              <button onClick={() => setConnectOpen(true)} className="hero-cta" style={{ background: accent }}>
                <iconify-icon icon="ph:lightning-duotone" width="16" height="16" style={{ display: 'inline-flex', color: '#0E0E10' }}/>
                Подключиться
              </button>
              <button onClick={() => setQrOpen(true)} aria-label="Показать QR-код ключа" className="hero-iconbtn">
                <IconQR size={20}/>
              </button>
              <button onClick={() => t('Поделиться ключом')} aria-label="Поделиться ключом" className="hero-iconbtn">
                <iconify-icon icon="ph:share-network-duotone" width="20" height="20" style={{ display: 'inline-flex' }}/>
              </button>
            </div>
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

Object.assign(window, {
  HomeScreen, PlansScreen, ProfileScreen, InviteScreen, BonusScreen,
  PaymentsScreen,
  ReferralCalculator, CheckoutPanel,
});
