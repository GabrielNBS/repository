"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ArrowRight, Download, Users, Briefcase, Calendar } from "lucide-react";

export default function About() {
  const stats = [
    { icon: <Calendar className="w-5 h-5" />, value: "[12+]", label: "anos de experiência" },
    { icon: <Briefcase className="w-5 h-5" />, value: "[40+]", label: "projetos entregues" },
    { icon: <Users className="w-5 h-5" />, value: "[98%]", label: "de clientes recorrentes" },
  ];

  return (
    <section id="about" className="section-standard min-h-screen flex items-center py-20 relative overflow-hidden bg-background">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 -z-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto">
        <div className="flex flex-col gap-12">
          {/* Content Grid */}
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24 items-start">
            {/* Left Column: Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: -20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative group"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border border-foreground/5">
                <Image
                  src="/images/avatar.png"
                  alt="Developer Avatar"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-8 -left-8 -z-10 w-48 h-48 border-2 border-accent/20 rounded-3xl animate-pulse" />
              <div className="absolute -top-8 -right-8 -z-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors duration-700" />
              
              {/* Floating badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 top-1/4 z-20 bg-background/80 backdrop-blur-md border border-foreground/10 px-4 py-2 rounded-xl shadow-xl hidden md:block"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-tighter">Disponível para Projetos</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Text & Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-12"
            >
              <div className="space-y-8 text-lg md:text-xl text-foreground/70 leading-relaxed font-light">
                <p>
                  Trabalho na interseção entre design e código. Comecei como designer,
                  migrei para o frontend e nunca mais separei os dois. Hoje entrego
                  componentes que respeitam o sistema de design e funcionam em produção —
                  sem renegociar pixel por pixel com o time de dev.
                </p>
                <p>
                  Já colaborei com empresas como <span className="text-foreground font-bold">[Empresa A]</span>, 
                  <span className="text-foreground font-bold"> [Empresa B]</span> e 
                  <span className="text-foreground font-bold"> [Empresa C]</span>,
                  em projetos que somam mais de <span className="text-foreground font-bold">[X]</span> usuários ativos.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col gap-3 p-8 rounded-3xl bg-foreground/5 border border-foreground/10 hover:border-accent/40 hover:bg-foreground/[0.07] transition-all duration-300 group">
                    <div className="text-accent group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-3xl font-black text-foreground tracking-tighter">{stat.value}</div>
                      <div className="text-sm text-foreground/50 font-medium uppercase tracking-wider">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="flex flex-wrap items-center gap-8 pt-6">
                <button className="px-10 py-5 bg-accent text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-accent/90 transition-all shadow-2xl shadow-accent/30 hover:-translate-y-1.5 active:scale-95 cursor-pointer">
                  Ver projetos <ArrowRight className="w-5 h-5" />
                </button>
                <a href="#" className="flex items-center gap-2 font-bold text-foreground/80 hover:text-accent transition-all group relative">
                  <span>Baixar currículo</span>
                  <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
                </a>
              </div>
              
              {/* Badges / Logos Placeholder */}
              <div className="pt-12 border-t border-foreground/5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/30 mb-6">Reconhecimentos</p>
                <div className="flex flex-wrap gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                  <span className="text-sm font-bold">Featured on Awwwards</span>
                  <span className="text-sm font-bold">Product Hunt</span>
                  <span className="text-sm font-bold">CSS Design Awards</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
