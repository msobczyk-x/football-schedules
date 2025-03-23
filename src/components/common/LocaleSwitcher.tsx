import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

export default function LocaleSwitcher() {
  const t = useTranslations("COMPONENTS.LOCALE_SWITCHER");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t("LABEL")}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur}>
          {t(`OPTIONS.${cur.toUpperCase()}`)}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
