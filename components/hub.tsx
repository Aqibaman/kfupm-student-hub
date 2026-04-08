"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bell, ChevronLeft, CircleUserRound, Menu, Trophy, X } from "lucide-react";
import clsx from "clsx";
import { appTitle, navigation, primaryStudent } from "@/lib/mock-data";
import type { NavItem } from "@/lib/types";
import { getNavIconByTitle, navIconMap } from "@/lib/nav-icons";

export function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className={clsx("flex items-center gap-3", compact ? "" : "mb-5") }>
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 p-2 shadow-sm ring-1 ring-white/35 backdrop-blur-sm">
        <Image src="/KFUPM.svg" alt="KFUPM logo" width={96} height={34} className="h-auto w-full brightness-0 invert" priority />
      </div>
      <div>
        <p className={clsx("font-semibold text-white", compact ? "text-sm" : "text-lg")}>{appTitle}</p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(0,133,64,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(218,201,97,0.18),_transparent_26%),linear-gradient(180deg,#f8f7f2_0%,#eef4ef_100%)] text-ink">
      <div className="mx-auto grid min-h-screen max-w-[1600px] gap-4 px-3 py-3 lg:gap-6 lg:px-6 lg:py-4 lg:grid-cols-[290px_1fr]">
        {mobileNavOpen ? (
          <button
            type="button"
            aria-label="Close menu overlay"
            className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-[2px] lg:hidden"
            onClick={() => setMobileNavOpen(false)}
          />
        ) : null}

        <aside
          className={clsx(
            "surface-card overflow-hidden bg-[linear-gradient(180deg,#0f7c46_0%,#0c5e43_48%,#083f53_100%)] p-5 text-white",
            "fixed inset-y-3 left-3 z-50 w-[min(86vw,320px)] overflow-y-auto transition duration-300 lg:static lg:inset-auto lg:z-auto lg:w-auto lg:translate-x-0 lg:overflow-visible",
            mobileNavOpen ? "translate-x-0" : "-translate-x-[112%] lg:translate-x-0"
          )}
        >
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">Menu</span>
            <button type="button" className="icon-btn h-10 w-10" onClick={() => setMobileNavOpen(false)} aria-label="Close menu">
              <X className="h-4.5 w-4.5" />
            </button>
          </div>
          <BrandLockup />
          <p className="max-w-xs text-sm leading-6 text-white/82">One-stop student service platform for daily campus support, operations, and student life tools.</p>

          <div className="mt-7 rounded-[30px] border border-white/12 bg-[radial-gradient(circle_at_top_left,_rgba(98,255,214,0.16),_transparent_28%),linear-gradient(160deg,rgba(5,102,85,0.96)_0%,rgba(8,88,79,0.94)_52%,rgba(9,70,95,0.92)_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_18px_34px_rgba(2,34,28,0.2)] backdrop-blur-sm">
            <p className="text-sm text-white/70">Signed in as</p>
            <p className="mt-2 text-2xl font-semibold leading-tight">{primaryStudent.name}</p>
            <p className="mt-1 text-sm text-white/80">{primaryStudent.department}</p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold-300/25 bg-gold-400/10 px-3 py-1.5 text-xs font-semibold text-gold-100">
              <Trophy className="h-3.5 w-3.5" />
              Rank #12
            </p>
          </div>

          <nav className="mt-7 space-y-2">
            {navigation.map((item) => (
              <NavLink key={item.href} item={item} active={pathname === item.href || pathname.startsWith(`${item.href}/`)} />
            ))}
          </nav>
        </aside>

        <main className="space-y-4 rounded-[28px] border border-white/70 bg-white/70 p-3 shadow-soft backdrop-blur lg:space-y-6 lg:rounded-[32px] lg:p-6">
          <header className="surface-card flex flex-col gap-4 overflow-hidden bg-gradient-to-r from-petrol-700 via-petrol-600 to-brand-700 px-4 py-4 text-white sm:flex-row sm:items-center sm:justify-between lg:px-5 lg:py-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3 lg:block">
                <span className="brand-chip border-white/20 bg-white/10 text-gold-100">Student Services</span>
                <button
                  type="button"
                  className="icon-btn h-10 w-10 lg:hidden"
                  aria-label="Open menu"
                  onClick={() => setMobileNavOpen(true)}
                >
                  <Menu className="h-4.5 w-4.5" />
                </button>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight lg:text-3xl">Welcome back, {primaryStudent.name.split(" ")[0]}</h1>
              <p className="max-w-2xl text-sm leading-6 text-white/80">Access medical support, bus tracking, laundry reservations, marketplace tools, and campus services from one polished student hub.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/notifications" className="icon-btn" aria-label="Notifications">
                <Bell className="h-5 w-5" />
              </Link>
              <Link href="/user-information" className="icon-btn" aria-label="Profile">
                <CircleUserRound className="h-5 w-5" />
              </Link>
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon ? navIconMap[item.icon as keyof typeof navIconMap] : undefined;

  return (
    <Link
      href={item.href}
      className={clsx(
        "group relative flex items-center justify-between overflow-hidden rounded-[22px] px-4 py-3.5 text-sm font-semibold transition duration-200",
        active
          ? "bg-white/14 text-white shadow-[0_0_35px_rgba(75,255,175,0.32)] ring-1 ring-white/15"
          : "text-white/82 hover:bg-white/10 hover:text-white"
      )}
    >
      {active ? <span className="absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#7dffd1] shadow-[0_0_18px_rgba(125,255,209,0.95)]" /> : null}
      <span className="inline-flex items-center gap-3">
        {Icon ? <Icon className={clsx("h-4.5 w-4.5 shrink-0", active ? "text-[#baf5d6]" : "text-white/75 group-hover:text-[#c9f7da]")} /> : null}
        <span>{item.title}</span>
      </span>
    </Link>
  );
}

export function PageIntro({
  title,
  description,
  backHref = "/dashboard",
  icon,
  aside
}: {
  title: string;
  description: string;
  backHref?: string;
  icon?: ReactNode;
  aside?: ReactNode;
}) {
  const router = useRouter();
  const asideContent = aside ?? <BrandAside />;

  return (
    <section className="surface-card overflow-hidden bg-white p-6 lg:p-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <button
            type="button"
            onClick={() => (backHref ? router.push(backHref) : router.back())}
            className="secondary-btn mb-5 h-10 px-4 lg:h-11"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="mt-2 flex items-center gap-3 text-2xl font-semibold text-slate-950 lg:mt-4 lg:text-[2.1rem]">
            {icon ?? (() => {
              const DerivedIcon = getNavIconByTitle(title);
              return DerivedIcon ? <DerivedIcon className="h-7 w-7 shrink-0 text-brand-700" /> : null;
            })()}
            <span>{title}</span>
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">{description}</p>
        </div>
        <div className="hidden lg:block">{asideContent}</div>
      </div>
    </section>
  );
}

function BrandAside() {
  return (
    <div className="rounded-[26px] border border-brand-100 bg-brand-50/60 p-5">
      <Image src="/KFUPM.svg" alt="KFUPM logo" width={170} height={60} className="h-auto w-[170px]" />
      <p className="mt-4 max-w-[290px] text-sm font-medium leading-6 text-slate-700">
        One place, one flow — everything students need in one go
      </p>
    </div>
  );
}

export function CardGrid({ children, cols = "md:grid-cols-2 xl:grid-cols-3" }: { children: ReactNode; cols?: string }) {
  return <div className={clsx("grid gap-4", cols)}>{children}</div>;
}

export function SoftCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={clsx("surface-card p-5", className)}>{children}</div>;
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
      {subtitle ? <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p> : null}
    </div>
  );
}

export function ActionLink({
  href,
  label,
  variant = "primary",
  className = ""
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}) {
  const variants = {
    primary: "primary-btn",
    secondary: "secondary-btn",
    danger: "danger-btn"
  };

  return (
    <Link href={href} className={clsx(variants[variant], className)}>
      {label}
    </Link>
  );
}

export function MiniStat({ label, value, subtext }: { label: string; value: string; subtext: string }) {
  return (
    <SoftCard className="bg-white/92">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{subtext}</p>
    </SoftCard>
  );
}

export function DataList({
  items
}: {
  items: Array<{ title: string; meta?: string; value?: string; description?: string }>;
}) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={`${item.title}-${item.meta}`} className="rounded-[22px] border border-slate-200/80 bg-white/80 p-4 transition hover:border-brand-200 hover:bg-brand-50/40">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-semibold text-slate-900">{item.title}</h4>
              {item.description ? <p className="mt-1 text-sm leading-6 text-slate-500">{item.description}</p> : null}
            </div>
            {item.value ? <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{item.value}</span> : null}
          </div>
          {item.meta ? <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">{item.meta}</p> : null}
        </div>
      ))}
    </div>
  );
}
