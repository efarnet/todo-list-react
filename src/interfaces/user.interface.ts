import type { Gender } from "../enums/Gender";

export interface User {
  id?: string;
  lastname?: string;
  firstname?: string;
  email?: string;
  gender?: Gender;
  password?: string;
}
