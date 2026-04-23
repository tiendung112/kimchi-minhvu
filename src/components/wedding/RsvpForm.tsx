import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";

const rsvpSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, { message: "Vui lòng nhập họ tên (tối thiểu 2 ký tự)." })
    .max(100, { message: "Họ tên không quá 100 ký tự." }),
  phone: z
    .string()
    .trim()
    .regex(/^(0|\+84)\d{9,10}$/, {
      message: "Số điện thoại Việt Nam không hợp lệ (vd: 0901234567).",
    }),
  guest_of: z.enum(["nha_trai", "nha_gai"]).refine((v) => !!v, {
    message: "Vui lòng chọn bạn là khách của ai.",
  }),
  attendee_count: z
    .number()
    .int()
    .min(1, { message: "Số người tham dự phải từ 1 trở lên." })
    .max(20, { message: "Tối đa 20 người." }),
  wishes: z
    .string()
    .trim()
    .max(1000, { message: "Lời chúc không quá 1000 ký tự." })
    .optional()
    .or(z.literal("")),
});

type RsvpValues = z.infer<typeof rsvpSchema>;

export const RsvpForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<RsvpValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      guest_of: undefined,
      attendee_count: 1,
      wishes: "",
    },
  });

  const onSubmit = async (values: RsvpValues) => {
    const { error } = await supabase.from("rsvp_responses").insert({
      full_name: values.full_name,
      phone: values.phone,
      guest_of: values.guest_of,
      attendee_count: values.attendee_count,
      wishes: values.wishes?.trim() ? values.wishes.trim() : null,
    });

    if (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại.", {
        description: "Xin lỗi vì sự bất tiện này.",
      });
      return;
    }

    toast.success("Cảm ơn bạn đã gửi xác nhận!", {
      description: "Chúng mình rất mong được gặp bạn trong ngày trọng đại.",
    });
    setSubmitted(true);
    form.reset();
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="rounded-sm border border-accent/40 bg-background p-5 shadow-[var(--shadow-card)] sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="py-8 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="gold-divider mb-6"
            >
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.25 }}
                className="inline-block text-base"
              >
                ❦
              </motion.span>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-2xl italic text-primary sm:text-3xl"
            >
              Cảm ơn bạn đã gửi xác nhận!
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 text-sm text-muted-foreground sm:text-base"
            >
              Chúng mình rất mong được gặp bạn trong ngày trọng đại.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Button
                type="button"
                variant="outline"
                className="mt-8 border-primary/30 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                onClick={() => setSubmitted(false)}
              >
                Gửi xác nhận khác
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            transition={{ staggerChildren: 0.07, delayChildren: 0.05 }}
          >
            <Form {...form}>
              <motion.form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                variants={{ hidden: {}, show: {} }}
              >
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem className="animate-fade-in-up [animation-delay:60ms] [animation-fill-mode:both]">
                        <FormLabel className="text-sm uppercase tracking-wider text-muted-foreground">
                          Họ và tên
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Vũ Thị Kim Chi"
                            className="h-12 border-accent/30 bg-background"
                            autoComplete="name"
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
                      <FormItem className="animate-fade-in-up [animation-delay:140ms] [animation-fill-mode:both]">
                        <FormLabel className="text-sm uppercase tracking-wider text-muted-foreground">
                          Số điện thoại
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            inputMode="tel"
                            className="h-12 border-accent/30 bg-background"
                            autoComplete="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guest_of"
                    render={({ field }) => (
                      <FormItem className="animate-fade-in-up [animation-delay:220ms] [animation-fill-mode:both]">
                        <FormLabel className="text-sm uppercase tracking-wider text-muted-foreground">
                          Bạn là khách của ai?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="grid grid-cols-2 gap-3"
                          >
                            {[
                              { value: "nha_trai", label: "Nhà trai" },
                              { value: "nha_gai", label: "Nhà gái" },
                            ].map((opt) => (
                              <Label
                                key={opt.value}
                                htmlFor={`guest-${opt.value}`}
                                className={`flex h-12 cursor-pointer items-center justify-center gap-2 rounded-sm border transition-colors ${
                                  field.value === opt.value
                                    ? "border-accent bg-accent/10 text-primary"
                                    : "border-accent/30 hover:border-accent/60"
                                }`}
                              >
                                <RadioGroupItem
                                  id={`guest-${opt.value}`}
                                  value={opt.value}
                                  className="sr-only"
                                />
                                <span className="font-serif text-base italic">{opt.label}</span>
                              </Label>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="attendee_count"
                    render={({ field }) => (
                      <FormItem className="animate-fade-in-up [animation-delay:300ms] [animation-fill-mode:both]">
                        <FormLabel className="text-sm uppercase tracking-wider text-muted-foreground">
                          Số người tham dự
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            inputMode="numeric"
                            min={1}
                            max={20}
                            className="h-12 border-accent/30 bg-background"
                            value={field.value ?? ""}
                            onChange={(e) => {
                              const v = e.target.value;
                              field.onChange(v === "" ? undefined : Number(v));
                            }}
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="wishes"
                    render={({ field }) => (
                      <FormItem className="animate-fade-in-up [animation-delay:380ms] [animation-fill-mode:both]">
                        <FormLabel className="text-sm uppercase tracking-wider text-muted-foreground">
                          Lời chúc gửi đến cặp đôi
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Chúc hai bạn trăm năm hạnh phúc..."
                            rows={4}
                            className="resize-none border-accent/30 bg-background"
                            maxLength={1000}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="animate-fade-in-up [animation-delay:460ms] [animation-fill-mode:both]">
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="group relative h-12 w-full overflow-hidden bg-primary font-serif text-base italic tracking-wide text-primary-foreground transition-transform duration-300 hover:scale-[1.01] hover:bg-primary/90 active:scale-[0.99]"
                    >
                      {form.formState.isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Đang gửi...
                        </>
                      ) : (
                        "Gửi xác nhận"
                      )}
                    </Button>
                  </div>
                </motion.form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
};
