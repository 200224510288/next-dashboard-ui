import { z } from "zod";

// Agent Schema
export const agentSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .min(1, { message: "Email is required!" }),
  userName: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),  // optional password field (used in update)
  officeAddress: z.string().min(1, { message: "Office Address is required!" }),
  homeAddress: z.string().min(1, { message: "Home Address is required!" }),
  city: z.string().min(1, { message: "City is required!" }),
});

export type AgentSchema = z.infer<typeof agentSchema>;
