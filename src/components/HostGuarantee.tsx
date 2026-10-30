'use client';

import React from 'react';
import { ShieldCheck, UserCheck, Lock, Headphones, CheckCircle2 } from 'lucide-react';

const ASSURANCES = [
  {
    icon: ShieldCheck,
    title: '$1,000,000 Liability Protection',
    description:
      'Every studio booking includes complementary general liability coverage, shielding both hosts and creators against accidental property damages.',
  },
  {
    icon: UserCheck,
    title: '100% Verified Creator Profiles',
    description:
      'Government ID and industry credentials verified for every host and guest, fostering a secure, trustworthy collaborative community.',
  },
  {
    icon: Lock,
    title: 'Equipment Safety & Deposit Escrow',
    description:
      'Automated security deposit hold via escrow that releases promptly after production wrap upon equipment condition sign-off.',
  },
  {
    icon: Headphones,
    title: '24/7 Live Concierge Support',
    description:
      'Our dedicated production concierges are on standby around the clock via live chat and direct phone to assist with studio access or gear questions.',
  },
];

export default function HostGuarantee() {
  return (
    <section className="py-20 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#090d16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Box */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          
          {/* Subtle Ambient Light Gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Area */}
          <div className="relative z-10 max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              Creator Trust & Safety Guarantee
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Backed by the StudioSpace Guarantee & 24/7 Creator Support
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 mt-4 leading-relaxed">
              We stand firmly behind every creative session. Whether you are staging a national commercial campaign or hosting a local podcast series, our security standards protect every moment.
            </p>
          </div>

          {/* 4 Feature Columns */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ASSURANCES.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md hover:bg-zinc-800/80 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="font-extrabold text-base text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom Trust Badges */}
          <div className="relative z-10 mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero cancellation fee if cancelled within 24 hours of booking</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verified studio hosts with verified equipment lists</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Encrypted Stripe & SSL escrow payment processing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
