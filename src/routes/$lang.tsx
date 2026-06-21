import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import type { Lang } from "../i18n";

const VALID_LANGS: string[] = ["tr", "en"];

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!VALID_LANGS.includes(params.lang)) {
      throw redirect({ to: "/tr", replace: true });
    }
    return { lang: params.lang as Lang };
  },
  component: () => <Outlet />,
});
