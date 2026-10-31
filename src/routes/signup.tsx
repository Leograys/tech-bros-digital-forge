import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  AtSign,
  Check,
  CircleAlert,
  Eye,
  EyeOff,
  KeyRound,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { registerAccount } from "@/lib/auth";
import logo from "@/assets/techbros-logo.png";
import mascot from "@/assets/techbros-mascot.png";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create an Account | Tech Bros" },
      {
        name: "description",
        content: "Join the Tech Bros community and start building what's next.",
      },
    ],
  }),
  component: SignupPage,
});

type FormValues = {
  fullName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
};

type FormField = keyof FormValues;
type FormErrors = Partial<Record<FormField, string>>;
type TextFieldName = Exclude<FormField, "termsAccepted">;

const initialValues: FormValues = {
  fullName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
};

const fieldOrder: FormField[] = [
  "fullName",
  "email",
  "username",
  "password",
  "confirmPassword",
  "termsAccepted",
];

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Enter your full name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (values.username && !/^[a-zA-Z0-9_]{3,20}$/.test(values.username)) {
    errors.username = "Use 3–20 letters, numbers, or underscores.";
  }
  if (values.password.length < 8) {
    errors.password = "Use at least 8 characters.";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords don't match.";
  }
  if (!values.termsAccepted) {
    errors.termsAccepted = "Please accept the Terms and Conditions.";
  }

  return errors;
}

function SignupPage() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    kind: "success" | "error";
    message: string;
  } | null>(null);
  const submissionInProgress = useRef(false);

  const passwordChecks = [
    values.password.length >= 8,
    /[a-z]/.test(values.password) && /[A-Z]/.test(values.password),
    /\d/.test(values.password),
    /[^a-zA-Z0-9]/.test(values.password),
  ];
  const strength = passwordChecks.filter(Boolean).length;
  const strengthLabel =
    strength <= 1
      ? "Getting started"
      : strength === 2
        ? "Fair"
        : strength === 3
          ? "Good"
          : "Strong";

  function updateField(field: TextFieldName, value: string) {
    const updated = { ...values, [field]: value };
    setValues(updated);
    setSubmitStatus(null);

    setErrors((current) => {
      const next = { ...current };
      const validation = validate(updated);
      if (current[field]) {
        if (validation[field]) next[field] = validation[field];
        else delete next[field];
      }
      if ((field === "password" || field === "confirmPassword") && current.confirmPassword) {
        if (validation.confirmPassword) next.confirmPassword = validation.confirmPassword;
        else delete next.confirmPassword;
      }
      return next;
    });
  }

  function validateField(field: FormField) {
    const fieldError = validate(values)[field];
    setErrors((current) => {
      const next = { ...current };
      if (fieldError) next[field] = fieldError;
      else delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInProgress.current) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setHasSubmitted(true);
    setSubmitStatus(null);

    const firstInvalidField = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalidField) {
      document.getElementById(firstInvalidField)?.focus();
      return;
    }

    submissionInProgress.current = true;
    setIsSubmitting(true);
    try {
      await registerAccount({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        username: values.username.trim(),
        password: values.password,
      });
      setSubmitStatus({ kind: "success", message: "Your account has been created." });
    } catch (error) {
      setSubmitStatus({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "We couldn't create your account. Please try again later.",
      });
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_35%,rgba(0,217,255,0.10),transparent_38%),radial-gradient(ellipse_at_86%_70%,rgba(8,123,255,0.12),transparent_42%)]"
      />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-7 lg:px-10">
        <Link
          to="/"
          aria-label="Tech Bros home"
          className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4"
        >
          <img src={logo} alt="" className="h-9 w-9" />
          <span className="font-display text-xl tracking-wide">
            TECH <span className="text-gradient">BROS</span>
          </span>
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span className="hidden sm:inline">Back to home</span>
          <span className="sm:hidden">Home</span>
        </Link>
      </header>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-7 px-4 pb-8 sm:px-7 md:grid-cols-[minmax(0,0.85fr)_minmax(390px,1.15fr)] md:gap-6 md:px-8 lg:min-h-[calc(100vh-76px)] lg:gap-12 lg:px-10 lg:pb-12">
        <section
          aria-labelledby="community-heading"
          className="flex flex-col items-center text-center md:items-start md:text-left"
        >
          <div className="relative mx-auto w-36 sm:w-44 md:mx-0 md:w-[min(100%,17rem)] lg:w-[min(100%,22rem)]">
            <div
              aria-hidden="true"
              className="absolute inset-8 rounded-full bg-primary/20 blur-3xl"
            />
            <img
              src={mascot}
              alt="A friendly Tech Bros robot waving hello"
              className="mascot-glow animate-float relative w-full"
            />
          </div>
          <p className="mt-1 text-xs font-semibold tracking-[0.3em] text-neon">
            TECHNOLOGY <span className="text-secondary">•</span> CREATIVITY{" "}
            <span className="text-secondary">•</span> INNOVATION
          </p>
          <h1
            id="community-heading"
            className="mt-4 max-w-xl font-display text-4xl uppercase leading-[0.98] tracking-wide sm:text-5xl lg:text-6xl"
          >
            Join the <span className="text-gradient">Tech Bros</span> Community
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            Be part of a community where technology, creativity, and innovation come together.
          </p>
          <p className="mt-3 text-sm font-medium text-foreground/90">
            Your ideas. Our technology. Let&apos;s build something amazing.
          </p>
        </section>

        <section aria-labelledby="signup-heading" className="w-full min-w-0">
          <div className="mx-auto w-full max-w-xl rounded-2xl border border-primary/20 bg-card/90 p-5 shadow-[0_24px_90px_-38px_rgba(0,217,255,0.35)] backdrop-blur-xl sm:p-7 lg:p-8">
            <div className="mb-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-neon">
                <ShieldCheck size={20} aria-hidden="true" />
              </div>
              <h2 id="signup-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Create Your Account
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Join Tech Bros and start building what&apos;s next.
              </p>
            </div>

            <form noValidate onSubmit={handleSubmit} aria-busy={isSubmitting}>
              <fieldset disabled={isSubmitting} className="min-w-0 space-y-4">
                <TextField
                  id="fullName"
                  label="Full Name"
                  placeholder="Your full name"
                  value={values.fullName}
                  onChange={(value) => updateField("fullName", value)}
                  onBlur={() => validateField("fullName")}
                  error={errors.fullName}
                  icon={<UserRound size={17} aria-hidden="true" />}
                  autoComplete="name"
                  required
                />
                <TextField
                  id="email"
                  label="Email Address"
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={(value) => updateField("email", value)}
                  onBlur={() => validateField("email")}
                  error={errors.email}
                  icon={<Mail size={17} aria-hidden="true" />}
                  autoComplete="email"
                  inputMode="email"
                  required
                />
                <TextField
                  id="username"
                  label={
                    <>
                      Username <span className="font-normal text-muted-foreground">(optional)</span>
                    </>
                  }
                  placeholder="Choose a username"
                  value={values.username}
                  onChange={(value) => updateField("username", value)}
                  onBlur={() => validateField("username")}
                  error={errors.username}
                  icon={<AtSign size={17} aria-hidden="true" />}
                  autoComplete="username"
                />

                <TextField
                  id="password"
                  label="Password"
                  placeholder="At least 8 characters"
                  value={values.password}
                  onChange={(value) => updateField("password", value)}
                  onBlur={() => validateField("password")}
                  error={errors.password}
                  icon={<KeyRound size={17} aria-hidden="true" />}
                  type={passwordVisible ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  trailing={
                    <VisibilityToggle
                      visible={passwordVisible}
                      onClick={() => setPasswordVisible((visible) => !visible)}
                      label="password"
                    />
                  }
                />
                <div className="-mt-2 space-y-2" aria-live="polite">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Password strength</span>
                    <span className={strength >= 3 ? "text-neon" : "text-muted-foreground"}>
                      {values.password ? strengthLabel : "Not set"}
                    </span>
                  </div>
                  <div
                    className="grid grid-cols-4 gap-1.5"
                    role="img"
                    aria-label={`Password strength: ${values.password ? strengthLabel : "not set"}`}
                  >
                    {passwordChecks.map((passed, index) => (
                      <span
                        key={index}
                        className={`h-1 rounded-full transition-colors ${
                          passed
                            ? "bg-primary shadow-[0_0_10px_rgba(0,217,255,0.45)]"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    Use 8+ characters with a mix of uppercase, lowercase, numbers, and symbols.
                  </p>
                </div>

                <TextField
                  id="confirmPassword"
                  label="Confirm Password"
                  placeholder="Enter your password again"
                  value={values.confirmPassword}
                  onChange={(value) => updateField("confirmPassword", value)}
                  onBlur={() => validateField("confirmPassword")}
                  error={errors.confirmPassword}
                  icon={<LockKeyhole size={17} aria-hidden="true" />}
                  type={confirmVisible ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  trailing={
                    <VisibilityToggle
                      visible={confirmVisible}
                      onClick={() => setConfirmVisible((visible) => !visible)}
                      label="confirmation password"
                    />
                  }
                />

                <div className="pt-1">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="termsAccepted"
                      checked={values.termsAccepted}
                      onCheckedChange={(checked) => {
                        setValues((current) => ({ ...current, termsAccepted: checked === true }));
                        setSubmitStatus(null);
                        if (checked) {
                          setErrors((current) => {
                            const next = { ...current };
                            delete next.termsAccepted;
                            return next;
                          });
                        } else if (hasSubmitted) {
                          setErrors((current) => ({
                            ...current,
                            termsAccepted: "Please accept the Terms and Conditions.",
                          }));
                        }
                      }}
                      aria-invalid={Boolean(errors.termsAccepted)}
                      aria-describedby={errors.termsAccepted ? "termsAccepted-error" : undefined}
                      disabled={isSubmitting}
                      className="mt-0.5 h-5 w-5 rounded-md"
                    />
                    <label
                      htmlFor="termsAccepted"
                      className="cursor-pointer text-sm leading-relaxed text-muted-foreground"
                    >
                      I agree to the{" "}
                      <span className="font-medium text-foreground">Terms and Conditions</span> and
                      Privacy Policy.
                    </label>
                  </div>
                  {errors.termsAccepted ? (
                    <p
                      id="termsAccepted-error"
                      className="mt-1.5 text-xs text-red-300"
                      role="alert"
                    >
                      {errors.termsAccepted}
                    </p>
                  ) : null}
                </div>

                {submitStatus ? (
                  <div
                    role={submitStatus.kind === "success" ? "status" : "alert"}
                    className={`flex items-start gap-2.5 rounded-lg border px-3.5 py-3 text-sm ${
                      submitStatus.kind === "success"
                        ? "border-primary/30 bg-primary/10 text-neon"
                        : "border-red-400/25 bg-red-400/10 text-red-200"
                    }`}
                  >
                    {submitStatus.kind === "success" ? (
                      <Check size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
                    ) : (
                      <CircleAlert size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
                    )}
                    <span>{submitStatus.message}</span>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary min-h-12 w-full px-5 py-3 text-sm uppercase tracking-[0.12em] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle size={17} className="animate-spin" aria-hidden="true" />
                      Creating account…
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight size={17} aria-hidden="true" />
                    </>
                  )}
                </button>
              </fieldset>
            </form>

            <div className="mt-5 border-t border-border/70 pt-5 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <span className="font-semibold text-foreground" aria-disabled="true">
                Sign In
              </span>
              <p className="mt-1 text-xs text-muted-foreground/80">Sign in is not available yet.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

type TextFieldProps = {
  id: TextFieldName;
  label: ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string | undefined;
  icon: ReactNode;
  type?: "text" | "email" | "password";
  autoComplete: string;
  inputMode?: "email";
  required?: boolean;
  trailing?: ReactNode;
};

function TextField({
  id,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  icon,
  type = "text",
  autoComplete,
  inputMode,
  required = false,
  trailing,
}: TextFieldProps) {
  return (
    <div className="min-w-0 space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-foreground/90">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-muted-foreground">
          {icon}
        </span>
        <Input
          id={id}
          name={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          autoComplete={autoComplete}
          inputMode={inputMode}
          required={required}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`h-12 rounded-xl bg-background/70 pl-11 text-base ${
            trailing ? "pr-12" : "pr-4"
          } ${error ? "border-red-400/70 focus-visible:ring-red-300" : ""}`}
        />
        {trailing}
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-xs text-red-300" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function VisibilityToggle({
  visible,
  onClick,
  label,
}: {
  visible: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${visible ? "Hide" : "Show"} ${label}`}
      aria-pressed={visible}
      className="absolute inset-y-0 right-1.5 inline-flex w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-neon focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-[-3px]"
    >
      {visible ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
    </button>
  );
}
