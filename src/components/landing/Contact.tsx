import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { Reveal } from "./Reveal";

const HELP_OPTIONS = [
  "Website Development",
  "Web Application Development",
  "UI/UX Design",
  "Mobile-Friendly Digital Solution",
  "AI-Powered Solution",
  "Technical Support / Consultation",
  "Something else",
];

type FormValues = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_VALUES: FormValues = { name: "", email: "", topic: "", message: "" };

/**
 * NOTE: The form is NOT connected to a delivery service yet. On a valid
 * submit it shows an honest notice instead of a fake success message.
 * To enable sending, wire the submit handler to an email/messaging
 * endpoint (e.g. a server function calling a transactional email API).
 */
export function Contact() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showIntegrationNotice, setShowIntegrationNotice] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const setField = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = "Please enter your full name.";
    if (!values.email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.message.trim()) next.message = "Please tell us a little about your idea.";
    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setShowIntegrationNotice(false);
      const firstField = (["name", "email", "message"] as const).find(
        (field) => nextErrors[field],
      );
      if (firstField === "name") nameInputRef.current?.focus();
      return;
    }
    // Valid submission, but no sending service is connected yet.
    setShowIntegrationNotice(true);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="cta-panel rounded-3xl p-6 sm:p-10 lg:p-14">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">
                Got a Tech Idea?
              </h2>
              <p className="mt-2 text-xl font-semibold text-gradient sm:text-2xl">
                Let&apos;s Grow Together.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Have an idea, a project, or a challenge you&apos;d like to solve with
                technology? Let&apos;s talk about how we can bring it to life.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="#contact-form" className="btn-primary px-7 py-3.5 text-base">
                  Start a Conversation
                </a>
                <a
                  href="https://x.com/TBROS2024"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline px-7 py-3.5 text-base"
                >
                  Get in Touch
                  <ArrowUpRight size={18} aria-hidden />
                </a>
              </div>
            </div>

            <div id="contact-form" className="mx-auto mt-12 max-w-2xl scroll-mt-24">
              <form onSubmit={handleSubmit} noValidate className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Full Name
                    </label>
                    <input
                      ref={nameInputRef}
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Ada Lovelace"
                      value={values.name}
                      onChange={(event) => setField("name", event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className="field-input"
                    />
                    {errors.name ? (
                      <p id="contact-name-error" className="mt-1.5 text-sm text-destructive">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={values.email}
                      onChange={(event) => setField("email", event.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      className="field-input"
                    />
                    {errors.email ? (
                      <p id="contact-email-error" className="mt-1.5 text-sm text-destructive">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-topic"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    What do you need help with?
                  </label>
                  <select
                    id="contact-topic"
                    name="topic"
                    value={values.topic}
                    onChange={(event) => setField("topic", event.target.value)}
                    className="field-input appearance-none"
                  >
                    <option value="" className="bg-card">
                      Choose a topic (optional)
                    </option>
                    {HELP_OPTIONS.map((option) => (
                      <option key={option} value={option} className="bg-card">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Tell us about your idea, project, or challenge..."
                    value={values.message}
                    onChange={(event) => setField("message", event.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className="field-input resize-y"
                  />
                  {errors.message ? (
                    <p id="contact-message-error" className="mt-1.5 text-sm text-destructive">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <button type="submit" className="btn-primary px-7 py-3.5 text-base sm:justify-self-start">
                  <Send size={18} aria-hidden />
                  Send Message
                </button>

                <div aria-live="polite">
                  {showIntegrationNotice ? (
                    <p
                      role="status"
                      className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      Your message is ready — but sending isn&apos;t connected yet. This
                      form still needs to be linked to an email or messaging service
                      before messages can be delivered. Meanwhile, reach us on X or
                      TikTok: <span className="font-semibold text-neon">@TBROS2024</span>.
                    </p>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
