export const PLAN_LIMITS = {
  free: 5_000,
  student: 50_000,
  researcher: 500_000,
} as const;

export type PlanType = keyof typeof PLAN_LIMITS;
