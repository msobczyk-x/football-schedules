"use client";

import { useTranslations } from "next-intl";

export default function LoadingIndicator() {
  const t = useTranslations("COMPONENTS.LOADING_INDICATOR");
  return (
    <div className="w-full flex justify-center items-center py-12">
      <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl"></div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-blue-500/20 blur-2xl"></div>
        <div className="absolute -left-8 -top-8 w-24 h-24 rounded-full bg-purple-500/20 blur-2xl"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
          <p className="text-white mt-4 font-medium">{t("LOADING")}</p>
        </div>
      </div>
    </div>
  );
}
