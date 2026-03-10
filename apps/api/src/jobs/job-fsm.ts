import { JobStatus } from '@prisma/client';

const transitions: Record<JobStatus, JobStatus[]> = {
  ASSIGNMENT: ['SCHEDULING', 'CUSTOMER_HOLD', 'CARRIER_HOLD'],
  SCHEDULING: ['FIELD_EXECUTION', 'CUSTOMER_HOLD', 'CARRIER_HOLD'],
  FIELD_EXECUTION: ['ESTIMATING', 'CUSTOMER_HOLD', 'CARRIER_HOLD'],
  ESTIMATING: ['ESTIMATE_SUBMITTED'],
  ESTIMATE_SUBMITTED: ['QA_REVIEW'],
  QA_REVIEW: ['CUSTOMER_CARRIER_APPROVAL'],
  CUSTOMER_CARRIER_APPROVAL: ['BILLING_READINESS'],
  BILLING_READINESS: ['INVOICED'],
  INVOICED: ['CLOSED'],
  CLOSED: [],
  CUSTOMER_HOLD: ['SCHEDULING'],
  CARRIER_HOLD: ['SCHEDULING'],
};

export function canTransition(from: JobStatus, to: JobStatus): boolean {
  return transitions[from].includes(to);
}
