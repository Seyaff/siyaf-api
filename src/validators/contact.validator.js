import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string({
      required_error: "Identifier is required.",
      invalid_type_error: "Identifier must be a string.",
    })
    .min(2, "Identifier must be at least 2 characters.")
    .max(100, "Identifier is too long."),
    
  email: z
    .string({ required_error: "Return address is required." })
    .email("Invalid email format provided."),
    
  message: z
    .string({ required_error: "Project parameters are required." })
    .min(10, "Message must be at least 10 characters to provide sufficient context.")
    .max(5000, "Message exceeds maximum length."),
});