"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setAuthStudent } from "@/lib/demo-store";
import { appTitle } from "@/lib/mock-data";

export default function LoginPage() {
  const router = useRouter();
  const [studentName, setStudentName] = useState("Faisal Al-Qahtani");
  const [studentId, setStudentId] = useState("20210001");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthStudent(studentName);
    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_right,_rgba(218,201,97,0.18),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(0,133,64,0.18),_transparent_30%),linear-gradient(135deg,#003e51_0%,#0d573f_46%,#008540_100%)] px-4 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[36px] bg-white shadow-soft lg:grid-cols-[1.08fr_0.92fr]">
        <section className="bg-[linear-gradient(160deg,#003e51_0%,#0d573f_52%,#008540_100%)] p-8 text-white lg:p-12">
          <div className="inline-flex items-center gap-4 rounded-[26px] border border-white/10 bg-white/8 px-5 py-4 backdrop-blur-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-sm">
              <Image src="/KFUPM.svg" alt="KFUPM logo" width={110} height={38} className="h-auto w-full" priority />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gold-200">KFUPM</p>
              <p className="text-lg font-semibold">Student Services</p>
            </div>
          </div>
          <h1 className="mt-8 text-5xl font-semibold leading-tight">{appTitle}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/82">A one-stop student service platform for KFUPM students, bringing emergency support, laundry reservations, campus utilities, and community services into one polished hub.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "Medical and campus support in one place",
              "Shared points and rewards visibility",
              "Mock data with fully clickable flows",
              "Premium KFUPM-inspired student dashboard"
            ].map((item) => (
              <div key={item} className="rounded-[24px] border border-gold-200/15 bg-white/8 p-5 backdrop-blur-sm">
                <p className="text-lg font-semibold leading-7">{item}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="p-8 lg:p-12">
          <div className="mx-auto max-w-md">
            <p className="text-sm uppercase tracking-[0.28em] text-brand-700">Student Login</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">Access your dashboard</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">Use the mock student sign-in below to enter the demo and explore the connected KFUPM student-service experience.</p>
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="label">Student Name</label>
                <input className="field" value={studentName} onChange={(event) => setStudentName(event.target.value)} />
              </div>
              <div>
                <label className="label">Student ID</label>
                <input className="field" value={studentId} onChange={(event) => setStudentId(event.target.value)} />
              </div>
              <div>
                <label className="label">Password</label>
                <input className="field" type="password" defaultValue="password" />
              </div>
              <button type="submit" className="primary-btn w-full">
                Login to Student Hub
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
