import { doc, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import { db } from '../FirebaseConfig';

export const POINTS_SYSTEM = {
  WORKOUT_COMPLETION: 50,
  MEAL_TRACKING: 20,
  CHALLENGE_JOIN: 100,
  CHALLENGE_COMPLETION: 500,
  DAILY_STREAK: 30,
  MILESTONE_ACHIEVEMENT: 200
};

export async function awardPoints(userId: string, amount: number, reason: string) {
  try {
    const userRef = doc(db, 'Users', userId);
    await updateDoc(userRef, {
      earnedPoints: increment(amount),
      pointsHistory: arrayUnion({
        amount,
        reason,
        timestamp: new Date().toISOString()
      })
    });
    return true;
  } catch (error) {
    console.error('Error awarding points:', error);
    return false;
  }
}

export async function redeemReward(userId: string, rewardId: string, pointsCost: number) {
  try {
    const userRef = doc(db, 'Users', userId);
    await updateDoc(userRef, {
      earnedPoints: increment(-pointsCost),
      redeemedRewards: arrayUnion({
        rewardId,
        redeemedAt: new Date().toISOString()
      })
    });
    return true;
  } catch (error) {
    console.error('Error redeeming reward:', error);
    return false;
  }
}