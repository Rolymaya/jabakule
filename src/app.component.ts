import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownTimerComponent } from './components/countdown.component';
import { PurchaseFormComponent } from './components/purchase-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CountdownTimerComponent, PurchaseFormComponent],
  styles: [`
    :host {
      display: block;
    }
  `],
  template: `
    <!-- Background Elements -->
    <div class="fixed inset-0 z-[-1] bg-slate-950 overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-20"></div>
      <div class="glow-blob bg-blue-600 top-[-10%] left-[-10%] w-[500px] h-[500px]"></div>
      <div class="glow-blob bg-purple-600 bottom-[-10%] right-[-10%] w-[600px] h-[600px]"></div>
      <div class="glow-blob bg-cyan-500 top-[40%] left-[30%] w-[300px] h-[300px] opacity-20 animate-float"></div>
    </div>

    <!-- Header -->
    <header class="fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
      <div class="container mx-auto px-4 lg:px-32 py-4 flex justify-between items-center">
        
        <!-- Left Side: Logo & Badge -->
        <div class="flex items-center gap-4 md:gap-6">
          <!-- Logo -->
          <div class="flex items-center gap-2 cursor-pointer" (click)="scrollTo('top')">
            <div class="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center font-black text-white text-xl shadow-[0_0_15px_rgba(6,182,212,0.6)]">
              J
            </div>
            <span class="text-2xl font-black tracking-tight text-white">JABAKULE</span>
          </div>

          <!-- AGT Badge (Desktop/Tablet) -->
          <div class="hidden sm:flex group relative items-center">
            <div class="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 cursor-help hover:bg-emerald-500 hover:text-slate-900 transition-all duration-300">
              <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse group-hover:bg-slate-900"></div>
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
              SOFTWARE CERTIFICADO AGT
            </div>
            
            <!-- Tooltip Hover Effect -->
            <div class="absolute left-0 top-full mt-3 opacity-0 transform -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-50">
               <div class="bg-slate-900 border border-emerald-500 rounded-lg p-3 shadow-[0_0_20px_rgba(16,185,129,0.4)] whitespace-nowrap relative">
                  <div class="absolute -top-1.5 left-6 w-3 h-3 bg-slate-900 border-t border-l border-emerald-500 rotate-45"></div>
                  <p class="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-1 opacity-80">Licença Oficial</p>
                  <p class="text-sm text-white font-mono font-bold tracking-wide">FE/12/AGT/2025</p>
               </div>
            </div>
          </div>
        </div>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-8">
          <a (click)="scrollTo('legal')" class="text-sm font-semibold text-slate-300 hover:text-white cursor-pointer transition-colors">Legalidade</a>
          <a (click)="scrollTo('features')" class="text-sm font-semibold text-slate-300 hover:text-white cursor-pointer transition-colors">Vantagens</a>
          <a (click)="scrollTo('pricing')" class="text-sm font-semibold text-slate-300 hover:text-white cursor-pointer transition-colors">Preços</a>
          <button (click)="scrollTo('buy')" class="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-5 py-2 rounded-full font-bold transition-all shadow-[0_0_10px_rgba(34,211,238,0.5)] hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]">
            Faturar Agora
          </button>
        </nav>

        <!-- Mobile Menu Button -->
        <button (click)="toggleMenu()" class="md:hidden text-white p-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>

      <!-- Mobile Nav -->
      @if (isMenuOpen()) {
        <div class="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-700 p-4 flex flex-col gap-4 animate-fade-in shadow-2xl">
          <!-- Mobile Badge -->
          <div class="flex items-center justify-center py-2">
             <div class="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
              Certificado AGT: FE/12/AGT/2025
            </div>
          </div>
          <a (click)="scrollTo('legal')" class="text-slate-300 hover:text-white py-2 border-b border-slate-800 text-center">Legalidade</a>
          <a (click)="scrollTo('features')" class="text-slate-300 hover:text-white py-2 border-b border-slate-800 text-center">Vantagens</a>
          <a (click)="scrollTo('pricing')" class="text-slate-300 hover:text-white py-2 border-b border-slate-800 text-center">Preços</a>
          <button (click)="scrollTo('buy')" class="bg-cyan-500 text-slate-900 py-3 rounded-lg font-bold w-full shadow-[0_0_15px_rgba(34,211,238,0.3)]">Faturar Agora</button>
        </div>
      }
    </header>

    <main class="pt-24 pb-20">
      <!-- Hero Section -->
      <section id="top" class="container mx-auto px-4 lg:px-32 py-10 md:py-20 flex flex-col items-center text-center relative">
        
        <!-- Authority Badge -->
        <div class="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/50 rounded-full px-4 py-1.5 mb-8 animate-fade-in-up">
          <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span class="text-green-400 font-bold text-xs md:text-sm tracking-wide uppercase">✅ Licenciado pela AGT — FE/12/AGT/2025</span>
        </div>

        <!-- Headline -->
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 max-w-5xl mx-auto">
          A partir de 1 Jan 2026, só <span class="gradient-text">Faturas Eletrónicas</span> serão válidas.
        </h1>

        <p class="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 font-light">
          Evite multas pesadas, bloqueios de atividade e problemas fiscais. 
          Use o JABAKULE, software certificado, e durma tranquilo.
        </p>

        <!-- Hero CTA -->
        <div class="flex flex-col md:flex-row gap-4 mb-16 w-full md:w-auto">
          <button (click)="scrollTo('buy')" class="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.4)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3">
            <span>🔥 QUERO FATURAR LEGALMENTE</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </button>
          <button (click)="scrollTo('video')" class="bg-slate-800/50 hover:bg-slate-800 border border-slate-600 text-white text-lg font-semibold px-8 py-4 rounded-xl backdrop-blur-sm transition-all flex items-center justify-center gap-3">
            <svg class="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-1.832a1 1 0 000-1.664l-3-1.832z"></path></svg>
            <span>Ver como funciona</span>
          </button>
        </div>

        <!-- Quick Benefits Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
          <div class="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center hover:border-cyan-500/30 transition-colors">
            <div class="text-2xl mb-2">🛡️</div>
            <div class="font-bold text-white text-sm">2 Anos de Licença</div>
          </div>
          <div class="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center hover:border-cyan-500/30 transition-colors">
            <div class="text-2xl mb-2">🚀</div>
            <div class="font-bold text-white text-sm">Usuários Ilimitados</div>
          </div>
          <div class="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center hover:border-cyan-500/30 transition-colors">
            <div class="text-2xl mb-2">🎓</div>
            <div class="font-bold text-white text-sm">Formação Gratuita</div>
          </div>
          <div class="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center hover:border-cyan-500/30 transition-colors">
            <div class="text-2xl mb-2">🔧</div>
            <div class="font-bold text-white text-sm">Suporte 24/7</div>
          </div>
        </div>
      </section>

      <!-- Form Section -->
      <section id="buy" class="py-20 relative">
        <div class="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div class="container mx-auto px-4 lg:px-32 flex flex-col items-center">
            <h2 class="text-3xl md:text-5xl font-black text-center text-white mb-4">Compre Agora Sua Licença</h2>
            <p class="text-slate-400 text-center mb-12 max-w-2xl">Preencha o formulário. O processo é rápido e a sua licença é emitida em minutos após confirmação.</p>
            
            <div class="w-full max-w-2xl">
              <app-purchase-form></app-purchase-form>
            </div>
        </div>
      </section>

      <!-- Legal Alert Section (Fear) -->
      <section id="legal" class="py-20 relative overflow-hidden">
        <div class="absolute inset-0 bg-red-900/10 skew-y-3 transform origin-bottom-right"></div>
        <div class="container mx-auto px-4 lg:px-32 relative z-10">
          <div class="max-w-4xl mx-auto bg-slate-900 border-l-4 border-red-500 p-8 md:p-12 rounded-r-2xl shadow-2xl">
            <h2 class="text-3xl md:text-4xl font-black text-white mb-6 uppercase flex items-center gap-3">
              <span class="text-red-500 text-5xl">⚠️</span> Atenção Empresários!
            </h2>
            <div class="space-y-4 text-lg text-slate-300 mb-8">
              <p class="font-bold text-white">O cenário fiscal mudou. A partir de 2026:</p>
              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <span class="text-red-500 font-bold text-xl">❌</span>
                  <span>Faturas manuais (papel) ou Excel serão <strong>imediatamente anuladas</strong>.</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-red-500 font-bold text-xl">❌</span>
                  <span>Softwares sem licença AGT válida tornam a sua operação <strong>ilegal</strong>.</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-red-500 font-bold text-xl">❌</span>
                  <span>Risco real de <strong>multas pesadas</strong> e encerramento do estabelecimento.</span>
                </li>
              </ul>
            </div>
            
            <div class="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <p class="text-green-400 font-bold text-xl flex items-center gap-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                A Solução: JABAKULE
              </p>
              <p class="text-slate-400 mt-2">Já estamos 100% prontos, licenciados e em conformidade total com a lei.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="py-20 bg-slate-900/50">
        <div class="container mx-auto px-4 lg:px-32">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-5xl font-black text-white mb-4">Tudo o que precisa para faturar</h2>
            <p class="text-slate-400 text-lg">Simples, rápido e aprovado pela AGT.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Card 1 -->
            <div class="group bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <div class="w-14 h-14 bg-slate-700 rounded-lg flex items-center justify-center mb-6 text-3xl group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                📄
              </div>
              <h3 class="text-xl font-bold text-white mb-3">Faturação Ilimitada</h3>
              <p class="text-slate-400">Emita faturas, recibos, guias e proformas sem limites de quantidade. Tudo certificado.</p>
            </div>

            <!-- Card 2 -->
            <div class="group bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <div class="w-14 h-14 bg-slate-700 rounded-lg flex items-center justify-center mb-6 text-3xl group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                📱
              </div>
              <h3 class="text-xl font-bold text-white mb-3">Acesso em Qualquer Lugar</h3>
              <p class="text-slate-400">Funciona no seu telemóvel, tablet ou computador. Fature na loja, em casa ou na rua.</p>
            </div>

            <!-- Card 3 -->
            <div class="group bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <div class="w-14 h-14 bg-slate-700 rounded-lg flex items-center justify-center mb-6 text-3xl group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                📊
              </div>
              <h3 class="text-xl font-bold text-white mb-3">Relatórios Automáticos</h3>
              <p class="text-slate-400">Saiba exatamente quanto vendeu. Exporte o ficheiro SAF-T para a AGT com um clique.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Video Section -->
      <section id="video" class="py-20 container mx-auto px-4 lg:px-32">
        <div class="max-w-5xl mx-auto text-center">
          <h2 class="text-3xl md:text-5xl font-black text-white mb-10 leading-tight">
            Veja como o <span class="text-cyan-400">JABAKULE</span> funciona <br class="hidden md:block"> em menos de 1 minuto
          </h2>
          
          <div class="relative aspect-video bg-slate-800 rounded-3xl overflow-hidden border-2 border-cyan-500/50 shadow-[0_0_50px_rgba(34,211,238,0.15)] group">
            <!-- Video Support -->
            <video 
              autoplay 
              muted 
              loop 
              playsinline
              preload="auto"
              class="w-full h-full object-cover"
              src="assets/video/vsl-demonstracao.mp4"
              (playing)="onVideoPlaying()"
              (pause)="onVideoPaused()"
              (ended)="onVideoPaused()">
            </video>

            <!-- Gradient Overlays for aesthetics -->
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none"></div>
            
            <!-- Fake Progress Bar -->
            <div class="absolute bottom-0 left-0 w-full h-1.5 bg-slate-950/60 backdrop-blur-sm">
              <div 
                class="h-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-1000 ease-linear"
                [style.width.%]="fakeProgress()">
              </div>
            </div>

            <!-- Custom Labels -->
            <div class="absolute top-6 left-6 flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <div class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </div>
              <span class="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.2em]">Live Demo</span>
            </div>

            <div class="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
               <div class="bg-cyan-500/20 backdrop-blur-md border border-cyan-500/50 text-cyan-400 text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-widest">
                  Alta Definição 4K
               </div>
            </div>
          </div>

          <p class="mt-8 text-slate-400 font-medium">
            💡 Mais de 1.500 empresas já simplificaram a sua faturação com este sistema.
          </p>
        </div>
      </section>

      <!-- Pricing & Promo Section -->
      <section id="pricing" class="py-20 bg-gradient-to-b from-slate-900 to-blue-900/20">
        <div class="container mx-auto px-4 lg:px-32">
          <div class="flex flex-col lg:flex-row items-center justify-center gap-12">
            
            <!-- Text Side -->
            <div class="lg:w-1/2 text-left">
              <h2 class="text-4xl md:text-5xl font-black text-white mb-6">Promoção Especial de Adaptação à Nova Lei</h2>
              <p class="text-xl text-slate-300 mb-8">Não deixe para a última hora. Garanta a conformidade do seu negócio hoje com uma oferta irrepetível.</p>
              
              <ul class="space-y-4 mb-8">
                <li class="flex items-center gap-3">
                  <span class="text-cyan-400 text-xl">✔</span>
                  <span class="text-white text-lg">Software licenciado AGT</span>
                </li>
                <li class="flex items-center gap-3">
                  <span class="text-cyan-400 text-xl">✔</span>
                  <span class="text-white text-lg font-bold bg-cyan-500/10 px-2 py-1 rounded">2 anos de licença (Pague 1, Leve 2)</span>
                </li>
                <li class="flex items-center gap-3">
                  <span class="text-cyan-400 text-xl">✔</span>
                  <span class="text-white text-lg">Usuários ilimitados</span>
                </li>
                <li class="flex items-center gap-3">
                  <span class="text-cyan-400 text-xl">✔</span>
                  <span class="text-white text-lg">Formação & Suporte Gratuito</span>
                </li>
              </ul>

              <div class="inline-block bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <p class="text-sm text-slate-400 uppercase tracking-widest mb-2">Preço Promocional</p>
                <div class="flex items-end gap-2">
                  <span class="text-5xl font-black text-white">46.000 Kz</span>
                  <span class="text-xl text-slate-400 mb-2">/ 2 anos</span>
                </div>
                <p class="text-green-400 text-sm mt-2 font-bold">Poupança imediata de 46.000 Kz</p>
              </div>
            </div>

            <!-- Timer Side -->
            <div class="lg:w-1/2 w-full">
              <app-countdown></app-countdown>
            </div>

          </div>
        </div>
      </section>


      <!-- Final CTA -->
      <section class="py-20 bg-cyan-900/20 border-t border-cyan-900/50">
        <div class="container mx-auto px-4 lg:px-32 text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Não espere 2026 chegar.</h2>
          <p class="text-xl text-slate-300 mb-8">Regularize o seu negócio hoje e foque no crescimento.</p>
          <button (click)="scrollTo('buy')" class="bg-white text-blue-900 text-xl font-bold px-10 py-4 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform">
            🔥 ATIVAR JABAKULE AGORA
          </button>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-slate-950 py-12 border-t border-slate-900">
        <div class="container mx-auto px-4 lg:px-32 flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-slate-800 rounded flex items-center justify-center font-bold text-white">J</div>
            <span class="font-bold text-white">JABAKULE</span>
          </div>
          <p class="text-slate-500 text-sm">© 2025 JABAKULE. Software Certificado Nº FE/12/AGT/2025. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>

    <!-- Floating WhatsApp -->
    <button 
      (click)="openWhatsApp()"
      class="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.6)] pulse-glow transition-all hover:scale-110 group flex items-center gap-2"
    >
      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.001.572 2.135.881 3.282.881 3.182 0 5.769-2.587 5.769-5.767s-2.587-5.769-5.769-5.769c-3.181 0-5.765 2.584-5.767 5.766h.009c0-3.182 2.585-5.769 5.767-5.769zm5.548 10.369c-.218.061-.734.129-1.229.129-.497 0-1.012-.084-1.285-.246-.37-.216-1.577-1.12-2.34-1.928s-1.464-1.896-1.636-2.28c-.172-.384-.047-.723.158-.928.149-.149.349-.247.53-.247.18 0 .341.013.486.037.15.025.26.064.384.348.14.321.492 1.205.536 1.292.044.088.073.191.01.303-.063.112-.17.202-.271.303-.082.082-.2.18-.323.235-.134.06-.279.032-.505-.054-.486-.185-1.571-.786-2.264-1.577-.528-.603-.9-1.294-1.026-1.536-.126-.241-.013-.372.107-.492.11-.11.23-.271.348-.409.119-.137.159-.232.239-.383.08-.152.04-.285-.02-.398-.06-.112-.536-1.292-.734-1.769-.193-.464-.386-.401-.53-.408-.135-.007-.29-.009-.445-.009-.155 0-.406.058-.618.289-.212.231-.812.793-.812 1.935 0 1.143.832 2.246.948 2.402.116.155 1.637 2.5 3.965 3.506.554.239.987.382 1.326.49.56.178 1.069.153 1.472.093.447-.066 1.373-.561 1.567-1.103.194-.541.194-1.006.136-1.103-.058-.096-.214-.155-.451-.274z"/></svg>
      <span class="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold">Falar no WhatsApp</span>
    </button>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  isMenuOpen = signal(false);
  fakeProgress = signal(0);
  private progressInterval: any;
  private currentIncrement = 2.5;

  ngOnInit() { }

  onVideoPlaying() {
    this.startFakeProgress();
  }

  onVideoPaused() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  ngOnDestroy() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  private startFakeProgress() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }

    // VSL Style: Starts fast, slows down gradually
    this.progressInterval = setInterval(() => {
      this.fakeProgress.update(v => {
        if (v >= 99) {
          clearInterval(this.progressInterval);
          return 99;
        }

        const nextVal = v + this.currentIncrement;

        // As it approaches the end, it slows down significantly
        if (v > 70) {
          this.currentIncrement *= 0.95;
        } else if (v > 40) {
          this.currentIncrement *= 0.98;
        }

        return nextVal > 99 ? 99 : nextVal;
      });
    }, 1000);
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  scrollTo(elementId: string) {
    this.isMenuOpen.set(false);
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openWhatsApp() {
    window.open('https://wa.me/244945571528?text=Olá, quero aderir ao JABAKULE, software licenciado pela AGT.', '_blank');
  }
}