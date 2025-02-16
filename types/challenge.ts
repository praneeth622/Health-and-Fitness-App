export interface ChallengeDetails {
  id: string;
  title: string;
  sponsor: string;
  duration: string;
  participants: number;
  image: string;
  description: string;
  progress: number;
  currentDistance: number;
  targetDistance: number;
  daysLeft: number;
  reward: string;
}

export interface Milestone {
  id: number;
  distance: number;
  reward: string;
  completed: boolean;
}

export interface LeaderboardUser {
  id: number;
  name: string;
  distance: number;
  image: string;
}

export interface Tip {
  id: number;
  title: string;
  description: string;
  icon: keyof typeof import('@expo/vector-icons/Ionicons').glyphMap;
}

export interface PublicChallenge {
  id: string;
  title: string;
  sponsor: string;
  reward: string;
  duration: string;
  participants: number;
  progress: number;
  image: string;
  description: string;
  currentDistance: number;
  targetDistance: number;
  daysLeft: number;
}

export interface GroupChallenge {
  id: string;
  title: string;
  group: string;
  members: any[];
  description: string;
  duration: string;
  image: string;
  currentDistance: number;
  targetDistance: number;
  daysLeft: number;
  progress: number;
}

export interface UserRewards {
  points: number;
  redeemableRewards: RewardItem[];
  earnedRewards: EarnedReward[];
  sponsorshipProgress: SponsorshipProgress[];
}

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  type: 'discount' | 'subscription' | 'product';
  value: string;
  brand: string;
  image: string;
  expiryDate?: string;
}

export interface EarnedReward {
  id: string;
  rewardId: string;
  dateEarned: string;
  used: boolean;
  dateUsed?: string;
}

export interface SponsorshipProgress {
  challengeId: string;
  progress: number;
  milestones: SponsorshipMilestone[];
}

export interface SponsorshipMilestone {
  target: number;
  reward: string;
  achieved: boolean;
}