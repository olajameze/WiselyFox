import { z } from "zod";
import { AGE_BANDS } from "@/data/age-bands";

export const AGE_BAND_VALUES = [...AGE_BANDS] as const;

export const ageBandSchema = z.enum(AGE_BAND_VALUES);

export const joinWaitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Enter a valid email address." })
    .max(254, { message: "Email is too long." }),
  name: z
    .string()
    .trim()
    .max(80, { message: "Name must be 80 characters or fewer." })
    .optional()
    .or(z.literal("").transform(() => undefined)),
  ageBands: z
    .array(ageBandSchema)
    .max(AGE_BANDS.length, { message: "Too many age bands selected." })
    .default([]),
  marketingOptIn: z.boolean().default(false),
  turnstileToken: z.string().optional(),
});

export type JoinWaitlistInput = z.infer<typeof joinWaitlistSchema>;
