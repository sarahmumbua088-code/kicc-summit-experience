import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Check, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createRegistration } from "@/lib/registration.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  validateSearch: z.object({
    pass: z.enum(["student", "1-day", "2-day", "vip"]).optional(),
  }),
  head: () => ({
    meta: [
      {
        title: "Reserve Your Seat | Women in STEM Africa Summit 2026",
      },
      {
        name: "description",
        content:
          "Reserve your seat for the Women in STEM Africa Summit 2026 at KICC, Nairobi. Choose your pass and pay via M-Pesa.",
      },
      {
        property: "og:title",
        content: "Reserve Your Seat | Women in STEM Africa Summit 2026",
      },
      {
        property: "og:description",
        content:
          "Reserve your seat for the Women in STEM Africa Summit 2026 at KICC, Nairobi. Choose your pass and pay via M-Pesa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const passes = [
  { id: "student", name: "Student Pass", price: 1500 },
  { id: "1-day", name: "1-Day Pass", price: 3000 },
  { id: "2-day", name: "2-Day Pass", price: 5500 },
  { id: "vip", name: "VIP Pass", price: 20000 },
];

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid M-Pesa number"),
  organization: z.string().optional(),
  passType: z.enum(["student", "1-day", "2-day", "vip"]),
});

type FormValues = z.infer<typeof formSchema>;

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

function RegisterPage() {
  const { pass } = Route.useSearch();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [registration, setRegistration] = useState<{
    id: string;
    fullName: string;
    passType: string;
    amount: number;
    phone: string;
  } | null>(null);

  const createRegistrationFn = useServerFn(createRegistration);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      passType: pass ?? "2-day",
    },
  });

  const selectedPass = passes.find((p) => p.id === form.watch("passType"));

  async function onSubmit(values: FormValues) {
    const passDetails = passes.find((p) => p.id === values.passType);
    if (!passDetails) return;

    try {
      const result = await createRegistrationFn({
        data: {
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          organization: values.organization || null,
          passType: values.passType,
          amount: passDetails.price,
        },
      });

      setRegistration({
        id: result.id,
        fullName: result.fullName,
        passType: result.passType,
        amount: result.amount,
        phone: result.phone,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Registration failed:", error);
      form.setError("root", {
        message: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            <span className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Summit
            </span>
          </Link>
          <Badge
            variant="outline"
            className="rounded-full border-white/20 bg-background/30 px-3 py-1 text-xs text-foreground backdrop-blur-sm"
          >
            <Calendar className="mr-1 h-3 w-3" />
            3 - 4 Sep 2026
          </Badge>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center px-4 pt-28 pb-16">
        <div className="w-full max-w-xl">
          {!submitted ? (
            <>
              <div className="mb-8 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-summit-gold">
                  Reserve Your Seat
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Women in STEM Africa Summit 2026
                </h1>
                <p className="mt-3 flex items-center justify-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  KICC, Nairobi, Kenya
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm sm:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="passType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Select Pass</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-xl border-white/10 bg-background/50 text-foreground">
                                <SelectValue placeholder="Choose your pass" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl border-white/10 bg-card text-foreground">
                              {passes.map((p) => (
                                <SelectItem
                                  key={p.id}
                                  value={p.id}
                                  className="focus:bg-white/10 focus:text-foreground"
                                >
                                  {p.name} — {formatPrice(p.price)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Jane Doe"
                              className="h-12 rounded-xl border-white/10 bg-background/50 text-foreground placeholder:text-muted-foreground"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="jane@example.com"
                              className="h-12 rounded-xl border-white/10 bg-background/50 text-foreground placeholder:text-muted-foreground"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">M-Pesa Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="254712345678"
                              className="h-12 rounded-xl border-white/10 bg-background/50 text-foreground placeholder:text-muted-foreground"
                              {...field}
                            />
                          </FormControl>
                          <p className="text-xs text-muted-foreground">Enter number in format 2547XXXXXXXX</p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="organization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Organization / Institution <span className="text-muted-foreground">(Optional)</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Company or university name"
                              className="h-12 rounded-xl border-white/10 bg-background/50 text-foreground placeholder:text-muted-foreground"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.formState.errors.root && (
                      <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                        {form.formState.errors.root.message}
                      </p>
                    )}

                    <div className="rounded-xl border border-white/10 bg-background/30 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Selected Pass</span>
                        <span className="font-semibold text-foreground">{selectedPass?.name}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2">
                        <span className="text-lg font-semibold text-foreground">Total</span>
                        <span className="text-2xl font-bold text-primary">
                          {selectedPass ? formatPrice(selectedPass.price) : "—"}
                        </span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="h-13 w-full rounded-full bg-primary py-6 text-lg font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-70"
                    >
                      {form.formState.isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>Proceed to M-Pesa Payment</>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-primary/30 bg-card/50 p-8 text-center backdrop-blur-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-foreground">Registration Received</h2>
              <p className="mt-2 text-muted-foreground">
                Thank you, {registration?.fullName}. Your registration for the{" "}
                <strong className="text-foreground">{passes.find((p) => p.id === registration?.passType)?.name}</strong>{" "}
                has been recorded.
              </p>

              <div className="mt-6 rounded-xl border border-white/10 bg-background/30 p-4 text-left">
                <p className="text-sm text-muted-foreground">Amount due</p>
                <p className="text-2xl font-bold text-foreground">
                  {registration ? formatPrice(registration.amount) : "—"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">M-Pesa number: {registration?.phone}</p>
              </div>

              <div className="mt-6 rounded-xl border border-summit-gold/20 bg-summit-gold/5 p-4 text-left">
                <p className="text-sm font-medium text-summit-gold">M-Pesa payment instructions</p>
                <ol className="mt-2 list-decimal space-y-1 pl-4 text-sm text-muted-foreground">
                  <li>Go to M-Pesa on your phone</li>
                  <li>Select Lipa na M-Pesa → PayBill</li>
                  <li>Enter business number and account number provided via SMS</li>
                  <li>Enter amount {registration ? formatPrice(registration.amount) : "—"} and confirm</li>
                </ol>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                A confirmation message with payment details will be sent to {registration?.phone}.
              </p>

              <Button
                onClick={() => navigate({ to: "/" })}
                className="mt-8 rounded-full bg-white/10 px-8 text-foreground hover:bg-white/20"
              >
                Return to Homepage
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
