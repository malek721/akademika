import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-context-Bgeuh49U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var supabase = createClient("https://mbclweheyejqdiyiatvz.supabase.co", "sb_publishable_5Ows118hy92Il5Gb9AmNhg_DGk9aNa-", { auth: {
	persistSession: true,
	autoRefreshToken: true
} });
var AuthContext = (0, import_react.createContext)({
	user: null,
	session: null,
	loading: true
});
function AuthProvider({ children }) {
	const [state, setState] = (0, import_react.useState)({
		user: null,
		session: null,
		loading: true
	});
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setState({
				user: session?.user ?? null,
				session,
				loading: false
			});
		});
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			setState({
				user: session?.user ?? null,
				session,
				loading: false
			});
		});
		return () => subscription.unsubscribe();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: state,
		children
	});
}
var useAuth = () => (0, import_react.useContext)(AuthContext);
//#endregion
export { supabase as n, useAuth as r, AuthProvider as t };
