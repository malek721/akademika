import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../contexts/auth-context";
import type { Lang } from "../../i18n";

export const Route = createFileRoute("/$lang/_protected")({
  component: ProtectedLayout,
});

function ProtectedLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { lang } = Route.useParams();

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/$lang/login", params: { lang: lang as Lang }, replace: true });
    }
  }, [user, loading, navigate, lang]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <Outlet />;
}
