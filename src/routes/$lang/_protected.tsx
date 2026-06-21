import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <svg className="h-8 w-8 animate-spin text-primary" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      </div>
    );
  }

  if (!user) return null;

  return <Outlet />;
}
