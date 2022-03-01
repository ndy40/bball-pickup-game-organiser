import { QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { queryClient } from 'utilities/react-query/query-client';
import AuthProvider from 'context/auth/auth';

export default function ContextWrapper({ children }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}
