import { Amplify } from "aws-amplify";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import amplifyConfig from "./deployment/amplify-config";

export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api/ routes
		 * 2. /_next/ (Next.js internals)
		 * 3. /_proxy/, /_auth/, /_root/ (special pages for OG tags proxying, password protection, and placeholder _root pages)
		 * 4. /_static (inside /public)
		 * 5. /_vercel (Vercel internals)
		 * 6. all root files inside /public (e.g. /favicon.ico)
		 */
		"/((?!api/|_next/|_proxy/|_auth/|_root/|_static|_vercel|[\\w-]+\\.\\w+).*)",
	],
};

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
	const { domain, path, key } = parse(req);

	if (domain === "app.dub.sh" || domain === "app.localhost:3000") {
		if (path === "/") {
			return NextResponse.rewrite(new URL(`/dashboard`, req.url));
		} else {
			return NextResponse.rewrite(new URL(`${path}`, req.url));
		}
	} else if (domain === "dub.sh" || domain === "localhost:3000") {
		console.log("here");
		return NextResponse.rewrite(new URL(`/`, req.url));
	}

	//   if (domain === "api.dub.sh" || domain === "api.localhost:3000") {
	//     return ApiMiddleware(req);
	//   }

	//   if (key.length === 0) {
	//     return RootMiddleware(req, ev);
	//   }

	//   if (home) {
	//     if (path.startsWith("/static")) {
	//       return NextResponse.rewrite(
	//         new URL("/_static" + path.split("/static")[1], req.url),
	//       );
	//     }
	//     if (DEFAULT_REDIRECTS[key]) {
	//       return NextResponse.redirect(DEFAULT_REDIRECTS[key]);
	//     }
	//     if (RESERVED_KEYS.has(key)) {
	//       return NextResponse.next();
	//     }
	//   }

	//   return LinkMiddleware(req, ev);
}

export const parse = (req: NextRequest) => {
	let domain = req.headers.get("host");
	const path = req.nextUrl.pathname;
	const key = decodeURIComponent(path.split("/")[1]); // to handle foreign languages like Hebrew
	return { domain, path, key };
};

export const detectBot = (req: NextRequest) => {
	const url = req.nextUrl;
	if (url.searchParams.get("bot")) return true;
	const ua = req.headers.get("User-Agent");
	if (ua) {
		/* Note:
		 * - bot is for most bots & crawlers
		 * - facebookexternalhit is for Facebook crawler
		 * - MetaInspector is for https://metatags.io/
		 */
		return /bot|facebookexternalhit|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|MetaInspector/i.test(
			ua
		);
	}
	return false;
};
