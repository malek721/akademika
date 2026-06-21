import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/register")({
  component: lazyRouteComponent(() => import("../../pages/register")),
});
