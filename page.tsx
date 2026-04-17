"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, CheckCircle2, Circle, Zap, Terminal } from "lucide-react";
import Link from "next/link";

const BUILD_STEPS = [
  "Initializing project environment...",
  "Installing dependencies (react, tailwindcss, framer-motion)...",
  "Generating database schema...",
  "Creating API routes for authentication...",
  "Building responsive layout components...",
  "Applying shadcn/ui design system...",
  "Compiling application...",
  "Deploying to Edge network...",
];

const PRICING = [
  {
    name: "Free",
    price: "$0",
    desc: "Perfect for testing ideas and side projects.",
    features: ["1 Project", "Basic AI Generation", "Community Support", "Standard Deploy"],
    cta: "Get Started",
    highlighted: false,
    stripeAction: null,
  },
  {
    name: "Pro",
    price: "$49",
    desc: "For founders who need to move fast.",
    features: [
      "Unlimited Projects",
      "Advanced AI Models",
      "Priority Support",
      "Custom Domains",
      "Database Access",
    ],
    cta: "Get Started",
    highlighted: true,
    stripeAction: "/api/stripe/checkout",
  },
  {
    name: "Enterprise",
    price: "$199",
    desc: "Dedicated infrastructure and scale.",
    features: [
      "Custom Infrastructure",
      "SLA Guarantee",
      "Dedicated Success Manager",
      "White-labeling",
      "SSO",
    ],
    cta: "Get Started",
    highlighted: false,
    stripeAction: null,
  },
];

function TerminalView({ idea }: { idea: string }) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);

  // Simulate build steps
  useState(() => {
    let step = 0;
    const interval = setInterval(() => {
      if (step < BUILD_STEPS.length) {
        setCompletedSteps((prev) => [...prev, step]);
        setCurrentStep(step + 1);
        step++;
      } else {
        clearInterval(interval);
        setDone(true);
      }
    }, 700);
    return () => clearInterval(interval);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-16"
    >
      {/* Terminal */}
      <div className="rounded-2xl border border-white/10 bg-[#0d0d0f] overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#111114]">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
          <span className="ml-3 text-white/40 text-xs font-mono flex items-center gap-1">
            <Terminal size={11} /> build-process.sh
          </span>
        </div>
        <div className="p-5 font-mono text-sm space-y-2 min-h-[320px]">
          {BUILD_STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={i <= currentStep ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3"
            >
              <span className="text-blue-400 mt-0.5">→</span>
              <span
                className={
                  completedSteps.includes(i) ? "text-white/60" : "text-white/90"
                }
              >
                {step}
              </span>
              {completedSteps.includes(i) && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto text-blue-400"
                >
                  <CheckCircle2 size={15} />
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div className="rounded-2xl border border-white/10 bg-[#0d0d0f] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#111114]">
          <span className="text-white/40 text-xs font-mono">localhost:3000</span>
          <span className="flex items-center gap-1.5 text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            LIVE
          </span>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 w-28 bg-white/10 rounded" />
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-white/10 rounded" />
              <div className="w-7 h-7 rounded-full bg-purple-500/70" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-3 space-y-2">
                <div className="w-6 h-6 rounded bg-blue-500/40" />
                <div className="h-2 w-16 bg-white/20 rounded" />
                <div className="h-2 w-20 bg-white/10 rounded" />
              </div>
            ))}
          </div>
          <div className="bg-white/5 rounded-xl p-4 flex items-center justify-center mt-2">
            <span className="text-blue-400/60 text-xl">⌇∿</span>
          </div>
        </div>
      </div>

      {done && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-full text-center"
        >
          <p className="text-green-400 font-semibold text-lg">
            ✓ Your app is live at{" "}
            <span className="underline underline-offset-4">launchpad.ai/app/your-idea</span>
          </p>
          <p className="text-white/40 text-sm mt-1">Building: &quot;{idea}&quot;</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function HomePage() {
  const [idea, setIdea] = useState("");
  const [launched, setLaunched] = useState(false);
  const [loadingStripe, setLoadingStripe] = useState(false);

  const handleLaunch = () => {
    if (!idea.trim()) return;
    setLaunched(true);
  };

  const handleProCheckout = async () => {
    setLoadingStripe(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingStripe(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080809] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#080809]/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Rocket size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">LaunchPad AI</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white/60 hover:text-white text-sm transition-colors">Login</button>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-700/10 rounded-full blur-[120px] pointer-events-none" />

        <AnimatePresence mode="wait">
          {!launched ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-white/70 mb-8">
                <Zap size={13} className="text-blue-400" />
                LaunchPad AI 2.0 is now live
              </div>

              <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.05] mb-6">
                Your Business Idea,
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                  Coded in 60 Seconds.
                </span>
              </h1>

              <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                Describe your vision in plain English. Our AI architects the database, writes the
                code, and deploys your fully-functional SaaS instantly.
              </p>

              {/* Input */}
              <div className="max-w-2xl mx-auto flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 shadow-xl shadow-black/30">
                <span className="text-white/30 font-mono text-lg">{">"}</span>
                <input
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLaunch()}
                  placeholder="Build a project management tool..."
                  className="flex-1 bg-transparent text-white placeholder-white/25 text-base outline-none"
                />
                <span className="text-white/20 text-xs font-mono hidden sm:block">⌘ K</span>
                <button
                  onClick={handleLaunch}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Zap size={15} />
                  Launch
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="terminal" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-3xl font-black mb-2">Building your app…</h2>
              <p className="text-white/40 text-sm mb-6">&quot;{idea}&quot;</p>
              <TerminalView idea={idea} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Simple, transparent pricing</h2>
            <p className="text-white/40 text-lg">
              Start for free, upgrade when you need more power to scale your idea.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PRICING.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-7 flex flex-col gap-6 border transition-all duration-300 ${
                  plan.highlighted
                    ? "border-blue-500/60 bg-gradient-to-b from-blue-950/30 to-purple-950/20 shadow-2xl shadow-blue-500/10"
                    : "border-white/8 bg-white/3 hover:border-white/15"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-[11px] font-bold tracking-widest uppercase px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <div>
                  <p className="text-white/60 text-sm font-medium mb-1">{plan.name}</p>
                  <p className="text-5xl font-black">
                    {plan.price}
                    <span className="text-xl font-normal text-white/40">/mo</span>
                  </p>
                  <p className="text-white/40 text-sm mt-2">{plan.desc}</p>
                </div>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                      <CheckCircle2 size={15} className="text-blue-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={plan.stripeAction ? handleProCheckout : undefined}
                  disabled={loadingStripe && plan.highlighted}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 shadow-lg shadow-blue-500/25"
                      : "bg-white/8 text-white hover:bg-white/12 border border-white/8"
                  }`}
                >
                  {loadingStripe && plan.highlighted ? "Redirecting…" : plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Rocket size={15} className="text-white" />
            </div>
            <span className="font-bold text-sm">LaunchPad AI</span>
          </div>
          <div className="flex items-center gap-6 text-white/40 text-sm">
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          </div>
          <div className="flex items-center gap-2 text-white/30 text-xs border border-white/10 px-3 py-1.5 rounded-full">
            <Zap size={11} className="text-blue-400" />
            BUILT WITH AI
          </div>
        </div>
      </footer>
    </main>
  );
}
