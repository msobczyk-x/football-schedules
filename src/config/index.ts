import { ESportEventStatus } from "@/types/api";

const config = {
  DEFAULT_PAGE_LIMIT: 30,
  DEFAULT_PAGE_OFFSET: 0,
  FINISHED_MATCH_STATUES: [
    ESportEventStatus.CLOSED,
    ESportEventStatus.ENDED,
    ESportEventStatus.INTERRUPTED,
    ESportEventStatus.ABANDONED,
    ESportEventStatus.CANCELLED,
  ],
  NOT_FINISHED_MATCH_STATUES: [
    ESportEventStatus.LIVE,
    ESportEventStatus.NOT_STARTED,
    ESportEventStatus.POSTPONED,
    ESportEventStatus.STARTED,
    ESportEventStatus.SUSPENDED,
    ESportEventStatus.DELAYED,
  ],
};

export default config;
