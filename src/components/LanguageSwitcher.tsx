// src/components/LanguageSwitcher.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronDown, Globe } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
}) => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'fr', name: 'Français', label: 'FR' },
    { code: 'en', name: 'English', label: 'EN' },
  ];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  const current =
    languages.find((lang) => i18n.language?.startsWith(lang.code)) ??
    languages[0];

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <div className="group">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full justify-between gap-2 pr-2"
          title={t('language.switch')}
        >
          <span className="inline-flex items-center gap-2">
            <Globe className="h-4 w-4 shrink-0" aria-hidden />
            <span className="rounded border border-border bg-muted/50 px-1.5 font-mono text-xs font-semibold tabular-nums">
              {current.label}
            </span>
            <span className="hidden sm:inline">{current.name}</span>
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:rotate-180" />
        </Button>

        <div className="invisible absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md border bg-popover text-popover-foreground opacity-0 shadow-md ring-1 ring-border transition-all duration-200 group-hover:visible group-hover:opacity-100">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                type="button"
                onClick={() => handleLanguageChange(language.code)}
                className={`flex w-full items-center px-4 py-2 text-left text-sm transition-colors ${
                  i18n.language?.startsWith(language.code)
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <span className="mr-3 font-mono text-xs font-semibold tabular-nums text-muted-foreground">
                  {language.label}
                </span>
                {language.name}
                {i18n.language?.startsWith(language.code) && (
                  <Check className="ml-auto h-4 w-4 text-primary" aria-hidden />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
