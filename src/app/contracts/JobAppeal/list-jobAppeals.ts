export class List_JobAppeals {
  id: string;
  appealUsername: string;
  appealDate: Date;
  appealJob: string;
  appealUserCity: string;
  appealUserDistrict: string;
  appealUserNeighborhood: string;
  appealDescription: string;
  supervisor: string | null;
  decisionDate: Date | null;
  appealState: boolean | null = null;
  isSeen: boolean | null = null;
  updatedDate: Date;
  isUpdated: boolean;
}