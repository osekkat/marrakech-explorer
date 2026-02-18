import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Globe, Sun, Moon, Monitor, Type, Zap, Info, Trash2, Shield, ChevronRight } from "lucide-react";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

const Settings = () => {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');
  const [reduceMotion, setReduceMotion] = useState(() => localStorage.getItem('reduce-motion') === 'true');

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('theme', theme);
    root.classList.remove('dark', 'light');
    if (theme === 'dark') root.classList.add('dark');
    else if (theme === 'light') root.classList.remove('dark');
    else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) root.classList.add('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('reduce-motion', String(reduceMotion));
    document.documentElement.style.setProperty('--motion-duration', reduceMotion ? '0s' : '');
  }, [reduceMotion]);

  const changeLang = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('app-language', code);
  };

  const clearCache = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <PageHeader title={t('settings.title')} />

      <div className="px-5 space-y-6">
        {/* Language */}
        <section>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
            <Globe className="w-4 h-4 text-primary" /> {t('settings.language')}
          </h3>
          <div className="flex gap-2">
            {languages.map(l => (
              <button
                key={l.code}
                onClick={() => changeLang(l.code)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium min-h-[44px] transition-all ${
                  i18n.language === l.code
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground"
                }`}
              >
                <span>{l.flag}</span>
                <span>{l.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Theme */}
        <section>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
            <Sun className="w-4 h-4 text-primary" /> {t('settings.theme')}
          </h3>
          <div className="flex gap-2">
            {[
              { id: "system", icon: Monitor, label: t('settings.system') },
              { id: "light", icon: Sun, label: t('settings.light') },
              { id: "dark", icon: Moon, label: t('settings.dark') },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setTheme(id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium min-h-[44px] transition-all ${
                  theme === id ? "bg-primary text-primary-foreground" : "bg-card text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* Accessibility */}
        <section>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
            <Zap className="w-4 h-4 text-primary" /> {t('settings.accessibility')}
          </h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between bg-card rounded-xl p-4 min-h-[44px]">
              <span className="text-sm text-foreground">{t('settings.reduceMotion')}</span>
              <input
                type="checkbox"
                checked={reduceMotion}
                onChange={e => setReduceMotion(e.target.checked)}
                className="w-5 h-5 accent-primary"
              />
            </label>
          </div>
        </section>

        {/* Safety Center */}
        <section>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
            <Shield className="w-4 h-4 text-primary" /> {t('settings.safetyCenter')}
          </h3>
          <div className="bg-card rounded-xl overflow-hidden">
            {[
              { label: "Emergency Contacts", detail: "Police: 19 · Ambulance: 15 · Tourist Police: +212 524 384 601" },
              { label: "Embassies in Rabat", detail: "Most embassies are in the capital. Check your country's website." },
              { label: "SOS Message Templates", detail: "Pre-written messages for emergencies in Arabic and French" },
            ].map((item, i) => (
              <div key={i} className={`p-4 ${i > 0 ? "border-t border-border" : ""}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Clear cache */}
        <button onClick={clearCache} className="flex items-center gap-3 w-full bg-card rounded-xl p-4 min-h-[44px]">
          <Trash2 className="w-4 h-4 text-destructive" />
          <span className="text-sm font-medium text-destructive">{t('settings.clearCache')}</span>
        </button>

        {/* About */}
        <div className="bg-card rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Info className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">{t('settings.about')}</p>
              <p className="text-xs text-muted-foreground">{t('settings.version')} 1.0.0 · Marrakech Compass</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-8" />
    </div>
  );
};

export default Settings;
