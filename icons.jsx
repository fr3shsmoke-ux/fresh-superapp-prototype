// Иконки через Phosphor Duotone (iconify). Современный, более характерный look — все Icon* унифицированы.
// API совместим со старым: <IconX size={20} stroke="..." />.
const Icon = ({ name, size = 22, color = 'currentColor', stroke, style }) => (
  <iconify-icon
    icon={name}
    width={size}
    height={size}
    style={{ color: stroke || color, display: 'inline-flex', ...style }}
  />
);

const IconPower     = (p) => <Icon {...p} name="ph:power-duotone" />;
const IconShield    = (p) => <Icon {...p} name="ph:shield-check-duotone" />;
const IconBolt      = (p) => <Icon {...p} name="ph:lightning-duotone" />;
const IconGlobe     = (p) => <Icon {...p} name="ph:globe-duotone" />;
const IconUser      = (p) => <Icon {...p} name="ph:user-circle-duotone" />;
const IconGift      = (p) => <Icon {...p} name="ph:gift-duotone" />;
const IconChevron   = (p) => <Icon {...p} name="ph:caret-right-duotone" />;
const IconCheck     = (p) => <Icon {...p} name="ph:check-duotone" />;
const IconClose     = (p) => <Icon {...p} name="ph:x-duotone" />;
const IconSearch    = (p) => <Icon {...p} name="ph:magnifying-glass-duotone" />;
const IconStar      = (p) => <Icon {...p} name="ph:star-duotone" />;
const IconCrown     = (p) => <Icon {...p} name="ph:crown-duotone" />;
const IconSettings  = (p) => <Icon {...p} name="ph:gear-six-duotone" />;
const IconCopy      = (p) => <Icon {...p} name="ph:copy-duotone" />;
const IconArrowDown = (p) => <Icon {...p} name="ph:arrow-down-duotone" />;
const IconArrowUp   = (p) => <Icon {...p} name="ph:arrow-up-duotone" />;
const IconQR        = (p) => <Icon {...p} name="ph:qr-code-duotone" />;
const IconChart     = (p) => <Icon {...p} name="ph:chart-bar-duotone" />;
const IconWifi      = (p) => <Icon {...p} name="ph:wifi-high-duotone" />;
const IconLock      = (p) => <Icon {...p} name="ph:lock-key-duotone" />;
const IconBook      = (p) => <Icon {...p} name="ph:book-open-duotone" />;
const IconHelp      = (p) => <Icon {...p} name="ph:question-duotone" />;
const IconPhone     = (p) => <Icon {...p} name="ph:device-mobile-camera-duotone" />;
const IconLaptop    = (p) => <Icon {...p} name="ph:laptop-duotone" />;
const IconKey       = (p) => <Icon {...p} name="ph:key-duotone" />;
const IconPlay      = (p) => <Icon {...p} name="ph:play-duotone" />;

Object.assign(window, {
  Icon, IconPower, IconShield, IconBolt, IconGlobe, IconUser, IconGift, IconChevron,
  IconCheck, IconClose, IconSearch, IconStar, IconCrown, IconSettings, IconCopy,
  IconArrowDown, IconArrowUp, IconQR, IconChart, IconWifi, IconLock,
  IconBook, IconHelp, IconPhone, IconLaptop, IconKey, IconPlay,
});
