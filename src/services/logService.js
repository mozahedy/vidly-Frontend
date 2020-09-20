import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
    Sentry.init({
        dsn: "https://f5fdd7563fc4475e90efede881af9970@o450267.ingest.sentry.io/5434591",
        integrations: [
          new Integrations.BrowserTracing(),
        ],
        tracesSampleRate: 1.0,
      });
}

export default {
    init
};