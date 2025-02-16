export interface Reward {
  id: string;
  title: string;
  pointsCost: number;
  image: string;
  description: string;
  brand: string;
  type: 'discount' | 'subscription' | 'product';
  value: string;
  expiryDate?: string;
}

export interface UserRewardStatus {
  earnedPoints: number;
  availableRewards: Reward[];
  redeemedRewards: string[]; // Array of reward IDs
}