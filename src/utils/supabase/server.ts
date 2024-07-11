//src/lib/supabase/server.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, {
                ...options,
                httpOnly: true, // Ensure HttpOnly flag for security
                secure: true, // Ensure Secure flag for HTTPS
                sameSite: 'lax' // Adjust depending on your requirements
              })
            );
          } catch (error) {
            console.error("Error setting cookies", error);
          }
        },
      },
    }
  )
}
