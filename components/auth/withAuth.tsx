import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface WithAuthProps {
  [key: string]: any;
}

const withAuth = <P extends WithAuthProps>(WrappedComponent: React.ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
      const checkAuth = () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (!token || !user) {
          router.push('/auth/login');
          return;
        }

        try {
          JSON.parse(user);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/auth/login');
        }
      };

      checkAuth();
    }, [router]);

    if (isAuthenticated === null) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          {/* <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div> */}
        </div>
      );
    }

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    }
    return null;
  };

  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

  return AuthenticatedComponent;
};

export default withAuth;
