import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "gold"
  | "outline"
  | "light"
  | "outline-light"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full font-sans font-medium uppercase leading-none tracking-[0.17em] transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-45";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-forest text-warm-white hover:bg-primary-green hover:shadow-lift active:scale-[0.99]",
  gold: "bg-gold text-soft-black hover:bg-[#b9975a] hover:shadow-lift active:scale-[0.99]",
  outline:
    "border border-forest/25 bg-transparent text-forest hover:border-forest hover:bg-forest hover:text-warm-white",
  light:
    "bg-warm-white text-forest hover:bg-beige hover:shadow-lift active:scale-[0.99]",
  "outline-light":
    "border border-warm-white/30 bg-transparent text-warm-white hover:border-warm-white/70 hover:bg-warm-white/10",
  ghost: "bg-transparent text-forest hover:bg-forest/5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-4 text-[0.625rem]",
  md: "min-h-11 px-6 text-[0.6875rem]",
  lg: "min-h-13 px-8 text-[0.6875rem]",
};

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleOptions = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps extends ComponentPropsWithoutRef<"button">, ButtonStyleOptions {
  children: ReactNode;
}

export function Button({
  variant,
  size,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  );
}

interface ButtonLinkProps extends ComponentPropsWithoutRef<"a">, ButtonStyleOptions {
  href: string;
  children: ReactNode;
  external?: boolean;
}

export function ButtonLink({
  href,
  external,
  variant,
  size,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = buttonStyles({ variant, size, className });

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
