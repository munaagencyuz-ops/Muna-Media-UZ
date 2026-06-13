// Muna Media — Services Uzbekistan App React Driver
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "blue",
  "heroLayout": "default",
  "borderStyle": "hard"
}/*EDITMODE-END*/;

const PALETTES = {
  blue:    { accent: '#295AE9', accent2: '#000000', label: 'Blue + Black' },
  electric:{ accent: '#295AE9', accent2: '#295AE9', label: 'Electric Blue' },
  classic: { accent: '#000000', accent2: '#295AE9', label: 'Black + Blue' },
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const p = PALETTES[t.palette] || PALETTES.blue;
    document.documentElement.style.setProperty('--accent', p.accent);
    document.documentElement.style.setProperty('--accent-2', p.accent2);
    if (t.borderStyle === 'soft') {
      document.documentElement.style.setProperty('--shadow', '0 14px 32px -10px rgba(14,14,12,0.22)');
    } else {
      document.documentElement.style.setProperty('--shadow', '6px 6px 0 0 var(--ink)');
    }
  }, [t.palette, t.borderStyle]);

  React.useEffect(() => {
    if (window.location.hash) {
      const handleScroll = () => {
        const id = window.location.hash.substring(1);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      };
      // Give React/Babel standalone some time to render components
      const timer = setTimeout(handleScroll, 400);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <Nav />
      <ServicesHero variant={t.heroLayout} />
      <ServicesWhy />
      <ServicesProblemSolution />
      <ServicesFormats />
      <ServicesIncluded />
      <ServicesHowWeWork />
      <ServicesAdvantages />
      <ServicesFAQ />
      <ServicesContact />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Палитра" />
        <TweakRadio
          label="Схема"
          value={t.palette}
          options={[
            { value: 'blue',     label: 'Blue' },
            { value: 'electric', label: 'Electric' },
            { value: 'classic',  label: 'Black/Blue' },
          ]}
          onChange={v => setTweak('palette', v)}
        />
        <TweakSection label="Hero" />
        <TweakRadio
          label="Бейдж"
          value={t.heroLayout}
          options={[
            { value: 'default', label: 'С бейджем' },
            { value: 'minimal', label: 'Без' },
          ]}
          onChange={v => setTweak('heroLayout', v)}
        />
        <TweakSection label="Карточки" />
        <TweakRadio
          label="Тени"
          value={t.borderStyle}
          options={[
            { value: 'hard', label: 'Брутальные' },
            { value: 'soft', label: 'Мягкие' },
          ]}
          onChange={v => setTweak('borderStyle', v)}
        />
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
