import createMiddleware from 'next-intl/middleware'
import { routing } from './src/i18n/routing'

export default createMiddleware(routing)

export const config = {
  // api, _next, ファイル拡張子を除くすべてのパスに適用
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
