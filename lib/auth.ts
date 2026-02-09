import { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export const getUserId = async (request: NextRequest) => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: () => undefined,
        remove: () => undefined
      }
    }
  );
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user?.id ?? null;
};
