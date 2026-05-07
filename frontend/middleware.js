import { NextResponse } from 'next/server';

const ROLE_STUDENT = 'STUDENT';
const ROLE_INSTRUCTOR = 'INSTRUCTOR';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get('learnify_role')?.value;
  const token = request.cookies.get('learnify_token')?.value;

  if (!token || !role) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith('/dashboard/instructor') && role !== ROLE_INSTRUCTOR) {
    return NextResponse.redirect(new URL('/dashboard/student', request.url));
  }

  if (pathname.startsWith('/dashboard/student') && role !== ROLE_STUDENT) {
    return NextResponse.redirect(new URL('/dashboard/instructor', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/instructor/:path*', '/dashboard/student/:path*'],
};