import { Component, signal, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-cyan-500/30 neon-border max-w-3xl mx-auto transform hover:scale-105 transition-transform duration-300">
      <h3 class="text-xl md:text-2xl font-bold text-center mb-6 text-white uppercase tracking-wider">
        ⏰ A Promoção termina em: <span class="text-cyan-400 font-extrabold">31 de Dezembro de 2025</span>
      </h3>
      
      <div class="grid grid-cols-4 gap-3 md:gap-6 w-full max-w-2xl">
        <!-- Dias -->
        <div class="flex flex-col items-center">
          <div class="w-full aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center border border-slate-700 shadow-xl relative overflow-hidden group">
            <div class="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span class="text-3xl md:text-5xl font-black text-white font-mono z-10">{{ days() }}</span>
          </div>
          <span class="text-xs md:text-sm text-slate-400 mt-2 uppercase font-semibold">Dias</span>
        </div>

        <!-- Horas -->
        <div class="flex flex-col items-center">
          <div class="w-full aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center border border-slate-700 shadow-xl relative overflow-hidden group">
             <div class="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span class="text-3xl md:text-5xl font-black text-white font-mono z-10">{{ hours() }}</span>
          </div>
          <span class="text-xs md:text-sm text-slate-400 mt-2 uppercase font-semibold">Horas</span>
        </div>

        <!-- Minutos -->
        <div class="flex flex-col items-center">
          <div class="w-full aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center border border-slate-700 shadow-xl relative overflow-hidden group">
             <div class="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span class="text-3xl md:text-5xl font-black text-white font-mono z-10">{{ minutes() }}</span>
          </div>
          <span class="text-xs md:text-sm text-slate-400 mt-2 uppercase font-semibold">Minutos</span>
        </div>

        <!-- Segundos -->
        <div class="flex flex-col items-center">
          <div class="w-full aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.3)] relative overflow-hidden">
             <div class="absolute inset-0 bg-cyan-500/20 animate-pulse"></div>
            <span class="text-3xl md:text-5xl font-black text-cyan-400 font-mono z-10">{{ seconds() }}</span>
          </div>
          <span class="text-xs md:text-sm text-cyan-400 mt-2 uppercase font-bold">Segundos</span>
        </div>
      </div>

      <div class="mt-6 text-center">
        <p class="text-red-400 font-semibold animate-pulse">
          ⚠️ Últimas vagas com este preço promocional!
        </p>
      </div>
    </div>
  `
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  days = signal('00');
  hours = signal('00');
  minutes = signal('00');
  seconds = signal('00');
  
  private intervalId: any;

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  startTimer() {
    // Set target to Dec 31st, 2025
    const targetDate = new Date('2025-12-31T23:59:59').getTime();

    this.intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const distance = targetDate - currentTime;

      if (distance < 0) {
        clearInterval(this.intervalId);
        this.days.set('00');
        this.hours.set('00');
        this.minutes.set('00');
        this.seconds.set('00');
        return;
      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      this.days.set(d < 10 ? '0' + d : d.toString());
      this.hours.set(h < 10 ? '0' + h : h.toString());
      this.minutes.set(m < 10 ? '0' + m : m.toString());
      this.seconds.set(s < 10 ? '0' + s : s.toString());
    }, 1000);
  }
}