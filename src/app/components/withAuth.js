'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      console.log('Checking session status:', status);
      if (status === 'loading') return; // Do nothing while loading

      if (!session) {
        console.log('No session found, redirecting to login');
        router.replace('/login');
      }
    }, [session, status, router]);

    if (status === 'loading' || !session) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

