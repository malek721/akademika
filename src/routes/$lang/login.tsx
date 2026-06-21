import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/login")({
  component: lazyRouteComponent(() => import("../../pages/login")),
});
