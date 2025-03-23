"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
export default function MatchDetailsError() {
  const router = useRouter();
  const t = useTranslations("COMPONENTS.MATCH_DETAILS_ERROR");
  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={() => router.back()}
        className="flex items-center text-white/80 hover:text-white transition-colors mb-4 group"
      >
        <ArrowLeft
          className="mr-2 group-hover:-translate-x-1 transition-transform"
          size={18}
        />
        {t("BACK_BUTTON")}
      </button>

      <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-xl"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <AlertTriangle size={48} className="text-red-400 mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            {t("MATCH_NOT_FOUND")}
          </h2>
          <p className="text-white/70 mb-6">
            {"We couldn't find the match details you're looking for."}
          </p>
          <button
            onClick={() => router.replace("/")}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors"
          >
            {t("RETURN_TO_MATCHES")}
          </button>
        </div>
      </div>
    </div>
  );
}
