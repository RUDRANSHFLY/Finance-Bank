import { z } from "zod";

export const authFormSchema = (type: string) =>
  z.object({
    email: z.string().email(),
    password: z.string().trim().min(8),
    firstName:
      type === "sign-in" ? z.string().optional() : z.string().trim().min(3),
    lastName:
      type === "sign-in" ? z.string().optional() : z.string().trim().min(3),
    address1: type === "sign-in" ? z.string().optional() : z.string().max(50),
    state:
      type === "sign-in" ? z.string().optional() : z.string().max(2).min(2),
    city: type === "sign-in" ? z.string().optional() : z.string().min(2),
    postalCode:
      type === "sign-in" ? z.string().optional() : z.string().max(6).min(3),
    ssn: type === "sign-in" ? z.string().optional() : z.string().min(3),
    dateofBirth: type === "sign-in" ? z.string().optional() : z.string().min(3),
  });
