'use client'
import { useSession } from 'next-auth/react';
export const useAuth = () => {
  const { data: session, status  } = useSession();

  if (status === 'loading') {
    return { session: null, loading: true };
  }

  return { session, loading: false };
};