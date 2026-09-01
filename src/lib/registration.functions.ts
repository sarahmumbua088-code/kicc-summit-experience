import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const createRegistrationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  organization: z.string().nullable().optional(),
  passType: z.enum(["student", "1-day", "2-day", "vip"]),
  amount: z.number().int().positive(),
});

export const createRegistration = createServerFn({ method: "POST" })
  .inputValidator((data) => createRegistrationSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: registration, error } = await supabaseAdmin
      .from("registrations")
      .insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        organization: data.organization ?? null,
        pass_type: data.passType,
        amount: data.amount,
        status: "pending_payment",
      })
      .select("id, full_name, phone, pass_type, amount, status")
      .single();

    if (error) {
      console.error("Registration insert error:", error);
      throw new Error("Failed to create registration");
    }

    return {
      id: registration.id,
      fullName: registration.full_name,
      phone: registration.phone,
      passType: registration.pass_type,
      amount: registration.amount,
      status: registration.status,
    };
  });
