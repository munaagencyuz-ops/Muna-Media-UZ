// Muna Media — Detailed Case App
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "blue",
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
    document.documentElement.style.setProperty(
      '--shadow',
      t.borderStyle === 'soft' ? '0 14px 32px -10px rgba(14,14,12,0.22)' : '6px 6px 0 0 var(--ink)'
    );
  }, [t.palette, t.borderStyle]);

  return (
    <>
      <Nav />
      <CaseHero />
      <CaseChallenge />
      <CaseExecution />
      <CaseResults />
      <CaseCTA />
      <CaseFooter />

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
