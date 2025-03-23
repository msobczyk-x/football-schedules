"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";
import { Locale } from "next-intl";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error: `pathname` and `params` are not compatible with `replace`
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>

      <label
        className={clsx(
          "relative flex items-center px-3 py-1.5 backdrop-blur-md bg-white/10 border border-white/20 rounded-full text-white transition-all duration-300",
          "group-hover:bg-white/15 group-hover:border-white/30 group-hover:shadow-lg",
          isPending && "transition-opacity [&:disabled]:opacity-30"
        )}
      >
        <Globe size={14} className="mr-1.5 text-white/70" />
        <p className="sr-only">{label}</p>
        <select
          className="inline-flex appearance-none bg-transparent py-1 pl-0 pr-5 outline-none text-sm font-medium cursor-pointer"
          defaultValue={defaultValue}
          disabled={isPending}
          onChange={onSelectChange}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </label>
    </div>
  );
}
