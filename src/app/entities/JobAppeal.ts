export class JobAppeal {
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
}