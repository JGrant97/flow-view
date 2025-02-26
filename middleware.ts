import { NextRequest, NextResponse } from 'next/server';
import Bearer from './types/bearer';
import Utility from './lib/utility';
import AuthAPI from './api/authAPI';

const blockedLoggedIn = ['/login', "/signup"];
const blockedConfirmedEmail = ['/confirmemail',];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const response = NextResponse.next()
  const cookie = req.cookies.get('session')?.value;
  const session = cookie ? JSON.parse(cookie) as Bearer : undefined;

  const isLoggedInBlock = blockedLoggedIn.includes(path);
  const isValidatedOnConfirmEmail = blockedConfirmedEmail.includes(path);

  if (!session?.token) 
    return response;
  
  const user = Utility.decryptJWT(session?.token);

  if (Utility.jwtExpired(user.exp)) {
    const result = await AuthAPI.Refresh(session);
    
    if (result instanceof Error) {
      response.cookies.delete('session');
      return response;
    }

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const cookieObj = Utility.getSessionResponseCookie();

    response.cookies.set('session', JSON.stringify(result), { ...cookieObj, expires })
  }

  if (isLoggedInBlock || isValidatedOnConfirmEmail) 
    return NextResponse.redirect(new URL('/', req.nextUrl), {headers: response.headers});

  if(!user.email_verified)
    return NextResponse.redirect(new URL('/confirmemail', req.nextUrl), {headers: response.headers});

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image).*)'],
}