import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import { UserRewards } from '../types/challenge';

export function useRewards(userId: string) {
  const [rewards, setRewards] = useState<UserRewards | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = onSnapshot(
      doc(db, 'Users', userId),
      (doc) => {
        if (doc.exists()) {
          setRewards({
            points: doc.data().earnedPoints || 0,
            redeemableRewards: doc.data().redeemableRewards || [],
            earnedRewards: doc.data().earnedRewards || [],
            sponsorshipProgress: doc.data().sponsorshipProgress || []
          });
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching rewards:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return { rewards, loading };
}