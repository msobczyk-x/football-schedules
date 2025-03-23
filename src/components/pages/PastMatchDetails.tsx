"use client";
import { SportEventData } from "@/types/api";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  MatchHeader,
  MatchInfo,
  MatchStatistics,
  ScoreCard,
  ScorersList,
} from "@/components/match";
type Props = {
  data: SportEventData;
};
export default function PastMatchDetails({ data }: Props) {
  const t = useTranslations("PAGES.MATCH");
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
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

      <MatchHeader matchData={data} />
      <ScoreCard matchData={data} />
      <MatchStatistics matchData={data} />
      <ScorersList matchData={data} />
      <MatchInfo matchData={data} />
    </div>
  );
}
