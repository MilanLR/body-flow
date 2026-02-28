import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useLang } from "@/i18n/LangContext";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  voornaam: z.string().min(1, "Verplicht"),
  achternaam: z.string().min(1, "Verplicht"),
  telefoon: z.string().optional(),
  email: z.string().email("Ongeldig e-mailadres"),
  contactvoorkeur: z.enum(["telefoon", "email"]),
  opmerkingen: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const { t } = useLang();
  const { ref, inView } = useInView();
  const tx = t.contact;
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: "Nieuwe sessie aanvraag - BodyFlow Amsterdam",
          from_name: `${data.voornaam} ${data.achternaam}`,
          ...data,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
        reset();
      } else {
        toast.error("Er ging iets mis. Probeer het opnieuw.");
      }
    } catch {
      toast.error("Er ging iets mis. Probeer het opnieuw.");
    }
  };

  const inputClass =
    "w-full border-b-[1.5px] border-[oklch(0.75_0.04_230)] py-1.5 font-body text-sm bg-transparent outline-none text-[var(--navy-800)] box-border";

  return (
    <section
      id="contact"
      className="mobile-padding bg-[var(--lighter-blue)] py-24"
    >
      <div className="container">
        <div
          ref={ref}
          className="responsive-grid contact-grid grid grid-cols-2 gap-20 items-start"
        >
          {/* Left column — contact info */}
          <div
            className={cn(
              "transition-all duration-[800ms] ease-out",
              inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6",
            )}
          >
            <span className="section-label">{tx.sectionLabel}</span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-medium text-[var(--navy-900)] mt-3 mb-8">
              {tx.h2}
            </h2>

            <div className="mb-8">
              <div className="flex items-start gap-3 mb-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  className="shrink-0 mt-0.5"
                >
                  <path
                    d="M9 1C6.24 1 4 3.24 4 6C4 9.75 9 17 9 17C9 17 14 9.75 14 6C14 3.24 11.76 1 9 1Z"
                    stroke="var(--ocean-500)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <circle
                    cx="9"
                    cy="6"
                    r="2"
                    stroke="var(--ocean-500)"
                    strokeWidth="1.2"
                    fill="none"
                  />
                </svg>
                <p className="font-body text-sm text-[var(--navy-600)] leading-relaxed">
                  Amsterdamseweg 487
                  <br />
                  1181 BR Amstelveen
                </p>
              </div>
              <div className="flex items-center gap-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M3 3H7L9 8L6.5 9.5C7.57 11.69 9.31 13.43 11.5 14.5L13 12L18 14V18C18 18 15 19 9 13C3 7 4 4 4 4L3 3Z"
                    stroke="var(--ocean-500)"
                    strokeWidth="1.3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <a
                  href="mailto:info@bodyflow.nl"
                  className="font-body text-sm text-[var(--navy-600)] no-underline"
                >
                  info@bodyflow.nl
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-medium text-[var(--navy-800)] mb-4">
                {tx.openingsLabel}
              </h3>
              <div className="flex flex-col gap-1.5">
                {tx.days.map((dag, idx) => (
                  <div
                    key={dag}
                    className="flex justify-between py-1.5 border-b border-[oklch(0.90_0.02_230)]"
                  >
                    <span className="font-body text-[0.875rem] text-[oklch(0.40_0.04_235)]">
                      {dag}
                    </span>
                    <span
                      className={cn(
                        "font-body text-[0.875rem] font-medium",
                        tx.times[idx] === tx.closed
                          ? "text-[oklch(0.60_0.04_235)]"
                          : "text-[var(--navy-600)]",
                      )}
                    >
                      {tx.times[idx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — booking form */}
          <div
            id="boek"
            className={cn(
              "contact-form-card bg-white p-10 rounded-sm shadow-[0_4px_30px_rgba(26,46,74,0.08)] transition-all duration-[800ms] ease-out delay-200",
              inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6",
            )}
          >
            <h3 className="font-display text-[1.8rem] font-medium text-[var(--navy-800)] mb-7">
              {tx.formTitle}
            </h3>

            {submitted ? (
              <div className="text-center py-12">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  className="mx-auto mb-4"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="22"
                    stroke="var(--ocean-500)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <polyline
                    points="14,24 21,31 34,17"
                    stroke="var(--ocean-500)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h4 className="font-display text-2xl text-[var(--navy-800)] mb-2">
                  {tx.thankYou}
                </h4>
                <p className="font-body text-sm text-[oklch(0.50_0.05_235)]">
                  {tx.thankYouMsg}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                <div className="mobile-form-grid grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-xs text-[oklch(0.40_0.04_235)] block mb-1.5">
                      {tx.firstName}
                    </label>
                    <input
                      type="text"
                      {...register("voornaam")}
                      className={inputClass}
                    />
                    {errors.voornaam && (
                      <p className="font-body text-xs text-red-500 mt-1">
                        {errors.voornaam.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="font-body text-xs text-[oklch(0.40_0.04_235)] block mb-1.5">
                      {tx.lastName}
                    </label>
                    <input
                      type="text"
                      {...register("achternaam")}
                      className={inputClass}
                    />
                    {errors.achternaam && (
                      <p className="font-body text-xs text-red-500 mt-1">
                        {errors.achternaam.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="font-body text-xs text-[oklch(0.40_0.04_235)] block mb-1.5">
                    {tx.phone}
                  </label>
                  <input
                    type="tel"
                    {...register("telefoon")}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="font-body text-xs text-[oklch(0.40_0.04_235)] block mb-1.5">
                    {tx.email}
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className={inputClass}
                  />
                  {errors.email && (
                    <p className="font-body text-xs text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-body text-xs text-[oklch(0.40_0.04_235)] block mb-3">
                    {tx.contactPref}
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        {...register("contactvoorkeur")}
                        value="telefoon"
                        className="accent-[var(--navy-600)]"
                      />
                      <span className="font-body text-[0.875rem] text-[oklch(0.40_0.04_235)]">
                        {tx.phoneOpt}
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        {...register("contactvoorkeur")}
                        value="email"
                        className="accent-[var(--navy-600)]"
                      />
                      <span className="font-body text-[0.875rem] text-[oklch(0.40_0.04_235)]">
                        {tx.emailOpt}
                      </span>
                    </label>
                  </div>
                  {errors.contactvoorkeur && (
                    <p className="font-body text-xs text-red-500 mt-1">
                      {errors.contactvoorkeur.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-body text-xs text-[oklch(0.40_0.04_235)] block mb-1.5">
                    {tx.remarks}
                  </label>
                  <textarea
                    {...register("opmerkingen")}
                    rows={3}
                    className={cn(inputClass, "resize-none")}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "btn-pill btn-pill-navy",
                      isSubmitting && "opacity-60 cursor-not-allowed",
                    )}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        {tx.submit}...
                      </span>
                    ) : (
                      tx.submit
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
