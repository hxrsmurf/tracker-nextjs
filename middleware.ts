import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from 'next/server';

const query_middleware = async () => {
  return await fetch('http://localhost:3000/api/hello')
}

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const session = request.cookies.get('next-auth.session-token')?.valueOf()
  event.waitUntil(query_middleware())
  const response = NextResponse.next()
  return response
}