import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache, publishableKey } from '../lib/clerk';

export function ClerkAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider 
      publishableKey={publishableKey || 'pk_test_cG9saXNoZWQtY2hpcG11bmstODEuY2xlcmsuYWNjb3VudHMuZGV2JA'}
      tokenCache={tokenCache}
    >
      {children}
    </ClerkProvider>
  );
} 