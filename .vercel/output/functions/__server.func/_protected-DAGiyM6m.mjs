import { o as __toESM } from "./_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { r as useAuth } from "./_ssr/auth-context-Bgeuh49U.mjs";
import { f as LoaderCircle } from "./_libs/lucide-react.mjs";
import { _ as useNavigate, d as Outlet } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./_protected-CDhJ061b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_protected-DAGiyM6m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProtectedLayout() {
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	const { lang } = Route.useParams();
	(0, import_react.useEffect)(() => {
		if (!loading && !user) navigate({
			to: "/$lang/login",
			params: { lang },
			replace: true
		});
	}, [
		user,
		loading,
		navigate,
		lang
	]);
	if (loading || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
}
//#endregion
export { ProtectedLayout as component };
