import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-purchase-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      <!-- Glow effect -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] -z-0 pointer-events-none"></div>
      
      <div class="relative z-10">
        <div class="text-center mb-8">
          <h3 class="text-3xl font-bold text-white mb-2">Garanta a Sua Licença</h3>
          <p class="text-slate-400">Preencha os dados abaixo para ativar a oferta de <span class="text-cyan-400 font-bold">2 anos pelo preço de 1</span>.</p>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-5">
          <!-- Empresa -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Nome da Empresa</label>
            <input 
              type="text" 
              formControlName="companyName"
              class="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-slate-500"
              placeholder="Ex: Comercial Sucesso, Lda"
            >
            @if (form.get('companyName')?.touched && form.get('companyName')?.invalid) {
              <p class="text-red-400 text-xs mt-1">Nome da empresa é obrigatório.</p>
            }
          </div>

          <!-- NIF -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">NIF (Número de Identificação Fiscal)</label>
            <input 
              type="text" 
              formControlName="nif"
              class="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-slate-500"
              placeholder="Ex: 5000123456"
            >
            @if (form.get('nif')?.touched && form.get('nif')?.invalid) {
              <p class="text-red-400 text-xs mt-1">NIF válido é obrigatório.</p>
            }
          </div>

          <!-- Responsável -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-1">Nome do Responsável</label>
            <input 
              type="text" 
              formControlName="responsibleName"
              class="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-slate-500"
              placeholder="Seu nome completo"
            >
            @if (form.get('responsibleName')?.touched && form.get('responsibleName')?.invalid) {
              <p class="text-red-400 text-xs mt-1">Nome do responsável é obrigatório.</p>
            }
          </div>

          <!-- Contatos Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-1">Telefone</label>
              <input 
                type="tel" 
                formControlName="phone"
                class="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-slate-500"
                placeholder="9XX XXX XXX"
              >
               @if (form.get('phone')?.touched && form.get('phone')?.invalid) {
                <p class="text-red-400 text-xs mt-1">Telefone obrigatório.</p>
              }
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-1">Email <span class="text-slate-500 text-xs font-normal">(Opcional)</span></label>
              <input 
                type="email" 
                formControlName="email"
                class="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-slate-500"
                placeholder="email@empresa.com"
              >
              @if (form.get('email')?.touched && form.get('email')?.invalid) {
                <p class="text-red-400 text-xs mt-1">Email inválido.</p>
              }
            </div>
          </div>

          <!-- Botão Submit -->
          <button 
            type="submit" 
            [disabled]="form.invalid || isSubmitting()"
            class="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.5)] transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 text-lg"
          >
            @if (isSubmitting()) {
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>A redirecionar para WhatsApp...</span>
            } @else {
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.001.572 2.135.881 3.282.881 3.182 0 5.769-2.587 5.769-5.767s-2.587-5.769-5.769-5.769c-3.181 0-5.765 2.584-5.767 5.766h.009c0-3.182 2.585-5.769 5.767-5.769zm5.548 10.369c-.218.061-.734.129-1.229.129-.497 0-1.012-.084-1.285-.246-.37-.216-1.577-1.12-2.34-1.928s-1.464-1.896-1.636-2.28c-.172-.384-.047-.723.158-.928.149-.149.349-.247.53-.247.18 0 .341.013.486.037.15.025.26.064.384.348.14.321.492 1.205.536 1.292.044.088.073.191.01.303-.063.112-.17.202-.271.303-.082.082-.2.18-.323.235-.134.06-.279.032-.505-.054-.486-.185-1.571-.786-2.264-1.577-.528-.603-.9-1.294-1.026-1.536-.126-.241-.013-.372.107-.492.11-.11.23-.271.348-.409.119-.137.159-.232.239-.383.08-.152.04-.285-.02-.398-.06-.112-.536-1.292-.734-1.769-.193-.464-.386-.401-.53-.408-.135-.007-.29-.009-.445-.009-.155 0-.406.058-.618.289-.212.231-.812.793-.812 1.935 0 1.143.832 2.246.948 2.402.116.155 1.637 2.5 3.965 3.506.554.239.987.382 1.326.49.56.178 1.069.153 1.472.093.447-.066 1.373-.561 1.567-1.103.194-.541.194-1.006.136-1.103-.058-.096-.214-.155-.451-.274z"/></svg>
              <span>COMPRAR AGORA E FATURAR LEGALMENTE</span>
            }
          </button>
          
          <p class="text-center text-xs text-slate-500 mt-4">
            🔒 Ao clicar, você será redirecionado para o WhatsApp oficial de ativação.
          </p>
        </form>
      </div>
    </div>
  `
})
export class PurchaseFormComponent {
  form: FormGroup;
  isSubmitting = signal(false);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      companyName: ['', Validators.required],
      nif: ['', Validators.required],
      responsibleName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.email]] // Removed Validators.required
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting.set(true);
      
      const formValue = this.form.value;
      const phoneNumber = '244945571528';
      
      let message = `Olá, quero ativar a licença JABAKULE (Promoção 2 anos).\n\n`;
      message += `*Dados da Empresa:*\n`;
      message += `Nome: ${formValue.companyName}\n`;
      message += `NIF: ${formValue.nif}\n`;
      message += `Responsável: ${formValue.responsibleName}\n`;
      message += `Telefone: ${formValue.phone}\n`;
      
      if (formValue.email) {
        message += `Email: ${formValue.email}\n`;
      }

      const encodedMessage = encodeURIComponent(message);
      const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      
      // Delay slightly to show processing state, then redirect
      setTimeout(() => {
        window.open(url, '_blank');
        this.isSubmitting.set(false);
        this.form.reset();
      }, 500);

    } else {
      this.form.markAllAsTouched();
    }
  }
}