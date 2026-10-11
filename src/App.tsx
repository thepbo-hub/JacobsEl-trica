/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import circuitBg from './assets/circuit-bg.jpg';
import {
  Wifi,
  MapPin,
  Globe,
  Share2,
  Copy,
  Check,
  Eye,
  EyeOff,
  Navigation,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Phone,
  Clock,
  ShieldCheck,
  Sparkles,
  Zap,
  Droplets,
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';

// ============================================================================
// DADOS DA EMPRESA - JACOBS ELÉTRICA E HIDRÁULICA
// (Edite este objeto para alterar qualquer informação do biosite)
// ============================================================================
export const COMPANY_CONFIG = {
  // Dados Principais
  name: "Jacobs Elétrica e Hidráulica",
  tagline: "Materiais Elétricos, Hidráulicos e Ferramentas Profissionais",
  cnpj: "Jacobs Elétrica e Hidráulica Ltda.",
  logoUrl: "https://i.postimg.cc/43xpF9Jj/Logotipo-3D-Jacobs-Eletrica-e-Hidraulica.png",
  
  // Links Oficiais
  siteUrl: "https://silvertech-mobile-store.my.canva.site/hidraulica-e-eletrica",
  whatsappUrl: "https://wa.link/qemsza",
  instagramUrl: "https://instagram.com/jacobs_eh?vrfl=MTdoc3llNWc0ZGF5bg%3D%3D",
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJB9vWNpt_mQARvx3Y8oG9S-4",
  locationUrl: "https://maps.app.goo.gl/6mdnvUnSnuwPU8kZ6",
  
  // Endereço Completo
  address: "Rua São Francisco Xavier, 175 - Tijuca, Rio de Janeiro - RJ, 20550-010",
  neighborhood: "Tijuca, Rio de Janeiro - RJ",
  cep: "20550-010",
  
  // Wi-Fi da Loja (para clientes presenciais)
  wifi: {
    ssid: "JACOBS",
    password: "Castelonegro12",
  },
  
  // Horários de Funcionamento (Fuso: America/Sao_Paulo)
  operatingHours: {
    timezone: "America/Sao_Paulo",
    schedule: [
      { day: 1, name: "segunda-feira", short: "seg", open: "08:00", close: "17:00", isOpenDay: true },
      { day: 2, name: "terça-feira", short: "ter", open: "08:00", close: "17:00", isOpenDay: true },
      { day: 3, name: "quarta-feira", short: "qua", open: "08:00", close: "17:00", isOpenDay: true },
      { day: 4, name: "quinta-feira", short: "qui", open: "08:00", close: "17:00", isOpenDay: true },
      { day: 5, name: "sexta-feira", short: "sex", open: "08:00", close: "17:30", isOpenDay: true },
      { day: 6, name: "sábado", short: "sáb", open: "08:00", close: "14:00", isOpenDay: true },
      { day: 0, name: "domingo", short: "dom", open: null, close: null, isOpenDay: false },
    ],
  },
  
  // Fotos do Carrossel de Produtos (com título e descrição legíveis)
  products: [
    {
      id: 1,
      image: "https://i.postimg.cc/sfnhLXBS/Whats-App-Image-2026-10-11-at-16-27-30-(1).jpg",
      title: "Tubos, Conexões e Registros Hidráulicos",
      category: "Linha Hidráulica",
      description: "Tubulações de PVC para água fria, esgoto e água quente CPVC/PPR. Registros de gaveta, pressão, adaptadores, curvas e joelhos de alta resistência com garantia de vedação absoluta.",
    },
    {
      id: 2,
      image: "https://i.postimg.cc/y6fZGdJZ/Whats-App-Image-2026-10-11-at-16-27-30-(2).jpg",
      title: "Cabos Elétricos, Fios Flexíveis e Eletrodutos",
      category: "Linha Elétrica",
      description: "Fios e cabos flexíveis de cobre normatizados NBR (1.5mm², 2.5mm², 4mm², 6mm² a 16mm²), 750V e 1kV antichama. Eletrodutos corrugados reforçados e caixas de passagem octogonais e 4x2.",
    },
    {
      id: 3,
      image: "https://i.postimg.cc/fWH9PL3S/Whats-App-Image-2026-10-11-at-16-27-30-(3).jpg",
      title: "Disjuntores DIN, DPS e Quadros de Distribuição",
      category: "Proteção Elétrica",
      description: "Disjuntores termomagnéticos monopolares, bipolares e tripolares padrão DIN, interruptores DR (diferencial residual), dispositivos de proteção contra surtos (DPS) e barramentos blindados.",
    },
    {
      id: 4,
      image: "https://i.postimg.cc/c1DnzHKg/Whats-App-Image-2026-10-11-at-16-27-30-(4).jpg",
      title: "Ferramentas Profissionais e Instrumentos de Medição",
      category: "Ferramentas",
      description: "Alicates universais, de bico e de corte com isolamento 1000V. Chaves de fenda, Philips, chaves de teste de voltagem, multímetros digitais, chaves grifo e ferramentas de encanador.",
    },
    {
      id: 5,
      image: "https://i.postimg.cc/CMvq21ZR/Whats-App-Image-2026-10-11-at-16-27-30-(5).jpg",
      title: "Metais Sanitários, Chuveiros e Reparos Hidráulicos",
      category: "Acabamentos & Reparos",
      description: "Chuveiros e duchas elétricas multitemperatura e eletrônicas, torneiras para pia e tanque, reparos originais para válvulas de descarga, sifões flexíveis universais e engates trançados em inox.",
    },
    {
      id: 6,
      image: "https://i.postimg.cc/7PB2R6Cb/Whats-App-Image-2026-10-11-at-16-27-30-(6).jpg",
      title: "Iluminação LED, Plafons e Refletores Blindados",
      category: "Iluminação",
      description: "Lâmpadas LED de alta eficiência, tubulares T8, painéis plafon de sobrepor e embutir (luz quente, neutra e fria), refletores potentes IP65 para áreas externas, garagens e fachadas.",
    },
    {
      id: 7,
      image: "https://i.postimg.cc/c1DnzHKs/Whats-App-Image-2026-10-11-at-16-27-30-(7).jpg",
      title: "Vedações, Fitas Isolantes, Adesivos e Fixações",
      category: "Acessórios Técnicos",
      description: "Fitas isolantes de alta fusão e autofusão 3M, fitas veda-rosca teflon de alta densidade, cola plástica para PVC, silicone acético e PU40, buchas, parafusos e abraçadeiras metálicas.",
    },
  ],
};

// ============================================================================
// LÓGICA DE STATUS AO VIVO (ABERTO / FECHADO - HORÁRIO DE BRASÍLIA)
// ============================================================================
interface LiveStatus {
  isOpen: boolean;
  statusText: string;
  badgeLabel: string;
  colorClass: string;
  dotClass: string;
  nextDetail: string;
}

function calculateLiveStatus(): LiveStatus {
  try {
    const now = new Date();
    // Extrai data e hora no fuso oficial America/Sao_Paulo
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Sao_Paulo',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });

    const parts = formatter.formatToParts(now);
    let hour = 0;
    let minute = 0;
    let weekdayStr = 'Mon';

    for (const part of parts) {
      if (part.type === 'hour') hour = parseInt(part.value, 10);
      if (part.type === 'minute') minute = parseInt(part.value, 10);
      if (part.type === 'weekday') weekdayStr = part.value;
    }

    if (hour === 24) hour = 0;

    const weekdayMap: Record<string, number> = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };
    const day = weekdayMap[weekdayStr] ?? now.getDay();
    const currentMinutes = hour * 60 + minute;

    // Regras:
    // Seg-Qui: 08:00 (480) até 17:00 (1020)
    // Sex: 08:00 (480) até 17:30 (1050)
    // Sáb: 08:00 (480) até 14:00 (840)
    // Dom: Fechado o dia todo

    // Segunda a Quinta (dias 1, 2, 3, 4)
    if (day >= 1 && day <= 4) {
      if (currentMinutes < 480) {
        return {
          isOpen: false,
          statusText: "FECHADO · Abre hoje às 08h",
          badgeLabel: "Abre hoje às 08h",
          colorClass: "from-red-950/80 via-red-900/60 to-red-950/90 border-red-500/60 text-red-100",
          dotClass: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]",
          nextDetail: "Hoje: 08:00 às 17:00",
        };
      }
      if (currentMinutes < 1020) {
        return {
          isOpen: true,
          statusText: "ABERTO · Fecha às 17h",
          badgeLabel: "ABERTO · Fecha às 17h",
          colorClass: "from-emerald-950/90 via-emerald-900/70 to-emerald-950/90 border-emerald-400 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.35)]",
          dotClass: "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)] animate-pulse",
          nextDetail: "Atendimento presencial e WhatsApp até 17h",
        };
      }
      // Após as 17:00
      if (day === 4) {
        // Quinta à noite -> sexta abre às 08h
        return {
          isOpen: false,
          statusText: "FECHADO · Abre amanhã às 08h",
          badgeLabel: "Abre amanhã às 08h",
          colorClass: "from-red-950/80 via-red-900/60 to-red-950/90 border-red-500/60 text-red-100",
          dotClass: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]",
          nextDetail: "Sexta: 08:00 às 17:30",
        };
      }
      return {
        isOpen: false,
        statusText: "FECHADO · Abre amanhã às 08h",
        badgeLabel: "Abre amanhã às 08h",
        colorClass: "from-red-950/80 via-red-900/60 to-red-950/90 border-red-500/60 text-red-100",
        dotClass: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]",
        nextDetail: "Amanhã: 08:00 às 17:00",
      };
    }

    // Sexta-feira (dia 5)
    if (day === 5) {
      if (currentMinutes < 480) {
        return {
          isOpen: false,
          statusText: "FECHADO · Abre hoje às 08h",
          badgeLabel: "Abre hoje às 08h",
          colorClass: "from-red-950/80 via-red-900/60 to-red-950/90 border-red-500/60 text-red-100",
          dotClass: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]",
          nextDetail: "Hoje: 08:00 às 17:30",
        };
      }
      if (currentMinutes < 1050) {
        return {
          isOpen: true,
          statusText: "ABERTO · Fecha às 17h30",
          badgeLabel: "ABERTO · Fecha às 17h30",
          colorClass: "from-emerald-950/90 via-emerald-900/70 to-emerald-950/90 border-emerald-400 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.35)]",
          dotClass: "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)] animate-pulse",
          nextDetail: "Atendimento estendido até 17h30",
        };
      }
      return {
        isOpen: false,
        statusText: "FECHADO · Abre amanhã (sábado) às 08h",
        badgeLabel: "Abre amanhã (sábado) às 08h",
        colorClass: "from-red-950/80 via-red-900/60 to-red-950/90 border-red-500/60 text-red-100",
        dotClass: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]",
        nextDetail: "Sábado: 08:00 às 14:00",
      };
    }

    // Sábado (dia 6)
    if (day === 6) {
      if (currentMinutes < 480) {
        return {
          isOpen: false,
          statusText: "FECHADO · Abre hoje às 08h",
          badgeLabel: "Abre hoje às 08h",
          colorClass: "from-red-950/80 via-red-900/60 to-red-950/90 border-red-500/60 text-red-100",
          dotClass: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]",
          nextDetail: "Hoje: 08:00 às 14:00",
        };
      }
      if (currentMinutes < 840) {
        return {
          isOpen: true,
          statusText: "ABERTO · Fecha às 14h",
          badgeLabel: "ABERTO · Fecha às 14h",
          colorClass: "from-emerald-950/90 via-emerald-900/70 to-emerald-950/90 border-emerald-400 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.35)]",
          dotClass: "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)] animate-pulse",
          nextDetail: "Plantão de sábado até 14h",
        };
      }
      return {
        isOpen: false,
        statusText: "FECHADO · Abre segunda-feira às 08h",
        badgeLabel: "Abre segunda-feira às 08h",
        colorClass: "from-red-950/80 via-red-900/60 to-red-950/90 border-red-500/60 text-red-100",
        dotClass: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]",
        nextDetail: "Retorno na segunda às 08h00",
      };
    }

    // Domingo (dia 0)
    return {
      isOpen: false,
      statusText: "FECHADO · Abre segunda-feira às 08h",
      badgeLabel: "Abre segunda-feira às 08h",
      colorClass: "from-red-950/80 via-red-900/60 to-red-950/90 border-red-500/60 text-red-100",
      dotClass: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]",
      nextDetail: "Segunda: 08:00 às 17:00",
    };
  } catch {
    return {
      isOpen: true,
      statusText: "ABERTO · Consulte horários",
      badgeLabel: "ABERTO",
      colorClass: "from-emerald-950/90 via-emerald-900/70 to-emerald-950/90 border-emerald-400 text-emerald-100",
      dotClass: "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)] animate-pulse",
      nextDetail: "Jacobs Elétrica e Hidráulica",
    };
  }
}

// ============================================================================
// ÍCONES OFICIAIS VETORIAIS (INLINE SVG)
// ============================================================================

// Emblema Oficial WhatsApp
const WhatsAppIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="#25D366" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M34.2 13.8C31.5 11.1 27.9 9.6 24 9.6C16.1 9.6 9.6 16.1 9.6 24C9.6 26.5 10.3 29 11.5 31.1L9.6 38.4L17.1 36.4C19.1 37.5 21.5 38.1 24 38.1C31.9 38.1 38.4 31.6 38.4 23.7C38.4 19.9 36.9 16.5 34.2 13.8ZM24 35.7C21.8 35.7 19.7 35.1 17.9 34L17.5 33.8L13 35L14.2 30.6L14 30.2C12.8 28.3 12.1 26.2 12.1 24C12.1 17.4 17.4 12.1 24 12.1C27.2 12.1 30.2 13.3 32.4 15.6C34.7 17.8 35.9 20.8 35.9 24C35.9 30.5 30.6 35.7 24 35.7ZM30.5 27.2C30.1 27 28.3 26.1 28 26C27.6 25.9 27.4 25.8 27.1 26.2C26.9 26.6 26.1 27.6 25.8 27.9C25.6 28.2 25.3 28.2 25 28C24.6 27.8 23.5 27.4 22.1 26.2C21.1 25.3 20.3 24.1 20.1 23.7C19.9 23.4 20.1 23.2 20.3 23C20.4 22.8 20.7 22.5 20.9 22.3C21.1 22.1 21.2 21.9 21.3 21.7C21.4 21.4 21.4 21.2 21.3 21C21.2 20.8 20.5 19.1 20.2 18.3C19.9 17.6 19.6 17.7 19.4 17.7H18.7C18.4 17.7 18 17.8 17.7 18.2C17.4 18.5 16.5 19.4 16.5 21.1C16.5 22.8 17.7 24.5 17.9 24.7C18.1 24.9 20.3 28.4 23.8 29.8C27.2 31.3 27.2 30.8 28.2 30.7C29.2 30.6 30.5 29.9 30.7 29.2C31 28.5 31 27.9 30.9 27.8C30.8 27.6 30.6 27.5 30.5 27.2Z"
      fill="white"
    />
  </svg>
);

// Emblema Oficial Instagram
const InstagramIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="igGlow" cx="20%" cy="110%" r="130%">
        <stop offset="0%" stopColor="#ffdb55" />
        <stop offset="25%" stopColor="#f58529" />
        <stop offset="50%" stopColor="#d92e7f" />
        <stop offset="75%" stopColor="#c13584" />
        <stop offset="100%" stopColor="#405de6" />
      </radialGradient>
    </defs>
    <rect width="48" height="48" rx="14" fill="url(#igGlow)" />
    <rect x="11" y="11" width="26" height="26" rx="7.5" stroke="white" strokeWidth="3" />
    <circle cx="24" cy="24" r="6" stroke="white" strokeWidth="3" />
    <circle cx="31.5" cy="16.5" r="1.8" fill="white" />
  </svg>
);

// Emblema Oficial Google
const GoogleIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#ffffff" />
    <path
      d="M34.7 24.2C34.7 23.5 34.6 22.8 34.5 22.2H24V26.4H30C29.7 27.8 28.9 29.1 27.6 29.9V32.9H31.5C33.8 30.8 34.7 27.7 34.7 24.2Z"
      fill="#4285F4"
    />
    <path
      d="M24 35.1C27 35.1 29.5 34.1 31.5 32.9L27.6 29.9C26.5 30.6 25.3 31 24 31C21.1 31 18.6 29 17.7 26.4H13.6V29.5C15.6 32.8 19.5 35.1 24 35.1Z"
      fill="#34A853"
    />
    <path
      d="M17.7 26.4C17.3 25.1 17.3 23.8 17.7 22.5V19.4H13.6C12.1 22.3 12.1 25.8 13.6 28.7L17.7 26.4Z"
      fill="#FBBC05"
    />
    <path
      d="M24 17.9C25.6 17.9 27.1 18.5 28.3 19.6L31.6 16.3C29.5 14.4 26.8 13.3 24 13.3C19.5 13.3 15.6 15.6 13.6 19.4L17.7 22.5C18.6 19.8 21.1 17.9 24 17.9Z"
      fill="#EA4335"
    />
  </svg>
);

// Emblema Waze Oficial
const WazeIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#33CCFF" />
    <path
      d="M34.5 23.5C34.5 17.7 29.8 13 24 13C18.2 13 13.5 17.7 13.5 23.5C13.5 25.5 14.1 27.4 15.1 29L14 34L19.2 33C20.7 33.7 22.3 34 24 34C29.8 34 34.5 29.3 34.5 23.5Z"
      fill="white"
    />
    <circle cx="20" cy="22" r="2.2" fill="#1E293B" />
    <circle cx="28" cy="22" r="2.2" fill="#1E293B" />
    <path
      d="M21 26.5C21.8 27.5 23 28.2 24.3 28.2C25.6 28.2 26.8 27.5 27.6 26.5"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="18" cy="34" r="2.5" fill="#1E293B" stroke="white" strokeWidth="1.5" />
    <circle cx="30" cy="34" r="2.5" fill="#1E293B" stroke="white" strokeWidth="1.5" />
  </svg>
);

// Emblema Uber Oficial
const UberIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#000000" stroke="#333333" strokeWidth="1" />
    <text
      x="24"
      y="29"
      textAnchor="middle"
      fill="#ffffff"
      fontFamily="sans-serif"
      fontWeight="900"
      fontSize="13"
      letterSpacing="-0.5px"
    >
      Uber
    </text>
  </svg>
);

// Emblema Globo / Site Oficial
const GlobeEmblem = ({ className = "w-7 h-7" }: { className?: string }) => (
  <div className={`${className} rounded-xl bg-gradient-to-br from-blue-500 to-blue-800 flex items-center justify-center p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]`}>
    <Globe className="w-full h-full text-white" />
  </div>
);

// Emblema Localização / Pin
const MapPinEmblem = ({ className = "w-7 h-7" }: { className?: string }) => (
  <div className={`${className} rounded-xl bg-gradient-to-br from-red-500 to-red-800 flex items-center justify-center p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]`}>
    <MapPin className="w-full h-full text-white" />
  </div>
);

// Emblema Wi-Fi 3D
const WifiEmblem = ({ className = "w-7 h-7" }: { className?: string }) => (
  <div className={`${className} rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]`}>
    <Wifi className="w-full h-full text-slate-950 font-bold" />
  </div>
);

export default function App() {
  // Estado ao vivo (Aberto/Fechado)
  const [liveStatus, setLiveStatus] = useState<LiveStatus>(calculateLiveStatus);

  // Estados dos Modais
  const [isWifiModalOpen, setIsWifiModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [wifiCopied, setWifiCopied] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);
  
  // Estado do Carrossel de Produtos
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomedProduct, setZoomedProduct] = useState<(typeof COMPANY_CONFIG.products)[0] | null>(null);

  // Touch Swipe para o Carrossel
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Atualização em tempo real do status de abertura a cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveStatus(calculateLiveStatus());
    }, 30000); // verifica a cada 30 segundos
    return () => clearInterval(timer);
  }, []);

  // Passagem automática de slides a cada 4 segundos
  useEffect(() => {
    if (isPaused || zoomedProduct !== null) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % COMPANY_CONFIG.products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, zoomedProduct]);

  // Handlers para o swipe no carrossel
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 45) {
        // Swipe para esquerda -> próximo
        setCurrentSlide((prev) => (prev + 1) % COMPANY_CONFIG.products.length);
      } else if (distance < -45) {
        // Swipe para direita -> anterior
        setCurrentSlide((prev) => (prev - 1 + COMPANY_CONFIG.products.length) % COMPANY_CONFIG.products.length);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

  // Funções de Copiar com feedback visual
  const handleCopyPassword = () => {
    navigator.clipboard.writeText(COMPANY_CONFIG.wifi.password);
    setWifiCopied(true);
    setTimeout(() => setWifiCopied(false), 2600);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(COMPANY_CONFIG.address);
    setAddressCopied(true);
    setTimeout(() => setAddressCopied(false), 2600);
  };

  const encodedAddress = encodeURIComponent(COMPANY_CONFIG.address);

  return (
    <div className="min-h-screen bg-[#030711] text-slate-100 flex flex-col items-center justify-start relative overflow-x-hidden selection:bg-red-600 selection:text-white">
      {/* =========================================================================
          PLANO DE FUNDO: FOTO DE CIRCUITOS ELETRÔNICOS POR TODA A PÁGINA
          ========================================================================= */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat bg-fixed transition-all"
        style={{ backgroundImage: `url(${circuitBg})` }}
      >
        {/* Overlay translúcido de tom marinho profundo que preserva as linhas de circuito e garante legibilidade total */}
        <div className="absolute inset-0 bg-[#030713]/70 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030713]/85 via-[#030b1c]/55 to-[#02050b]/90" />
      </div>

      {/* =========================================================================
          CANVAS CENTRAL MOBILE-FIRST (Máx ~480px, totalmente responsivo)
          ========================================================================= */}
      <main className="relative z-10 w-full max-w-[480px] min-h-screen flex flex-col px-4 pt-4 pb-12 transition-all">

        {/* -----------------------------------------------------------------------
            1) CABEÇALHO INDUSTRIAL: LOGO 3D + ELEMENTOS REAIS + SELO AO VIVO
            ----------------------------------------------------------------------- */}
        <header className="relative w-full flex flex-col items-center pt-2 pb-6">

          {/* ESTRUTURA REALISTA DE CANOS DE COBRE E CONDUÍTES ATRÁS DA LOGO */}
          <div className="relative w-full max-w-[420px] mb-2 px-2">
            
            {/* Tubo de Cobre Superior com Acabamento Metálico */}
            <div className="relative w-full h-3 copper-pipe-horizontal rounded-full flex items-center justify-between px-3 shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              {/* Conexão/Luva metálica esquerda */}
              <div className="w-3.5 h-5 -my-1 copper-fitting rounded-sm border border-amber-300/40 shadow-md" />
              {/* Conexão/Tee metálica direita */}
              <div className="w-3.5 h-5 -my-1 copper-fitting rounded-sm border border-amber-300/40 shadow-md" />
            </div>

            {/* ELEMENTO INOVADOR: VÁLVULA / REGISTRO COM GOTA D'ÁGUA REALISTA */}
            <div className="absolute -top-1 left-7 flex flex-col items-center z-20">
              {/* Registro/Volante com pegador vermelho realista */}
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-900 border-2 border-red-400 shadow-[0_3px_6px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.7)] flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 border border-amber-500 shadow-inner" />
              </div>
              {/* Haste do registro */}
              <div className="w-1.5 h-2.5 bg-gradient-to-r from-amber-700 via-amber-300 to-amber-800" />
              
              {/* Gota d'água física escorrendo */}
              <div className="relative w-4 h-24 flex flex-col items-center pointer-events-none">
                {/* Gota caindo com reflexo specular */}
                <div className="absolute top-0 w-2.5 h-3.5 bg-gradient-to-b from-sky-200 via-sky-400/90 to-blue-500 rounded-full rounded-t-sm shadow-[0_0_8px_rgba(56,189,248,0.8),inset_0_1px_2px_#ffffff] water-drip-active" />
                {/* Ondulações de água (ripples) na base */}
                <div className="absolute bottom-2 w-8 h-2 rounded-full border border-sky-400/80 water-ripple-active" />
              </div>
            </div>

            {/* ELEMENTO INOVADOR: TERMINAL ELÉTRICO COM FAÍSCAS / ARCOS SUTIS */}
            <div className="absolute -top-1 right-7 flex flex-col items-center z-20">
              {/* Prensa-cabo / Terminal blindado metálico */}
              <div className="w-6 h-6 rounded-md bg-gradient-to-b from-slate-600 via-slate-700 to-slate-900 border border-slate-400/50 shadow-[0_3px_6px_rgba(0,0,0,0.8)] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
              </div>
              {/* Fios saindo em feixe (azul e vermelho) */}
              <div className="flex gap-0.5">
                <div className="w-1 h-4 bg-blue-600 rounded-b shadow-[0_0_4px_#2563eb]" />
                <div className="w-1 h-5 bg-red-600 rounded-b shadow-[0_0_4px_#dc2626]" />
              </div>
              {/* Micro-arco elétrico sutil com faísca azul-branca e aura avermelhada */}
              <div className="relative w-8 h-10 flex items-center justify-center pointer-events-none">
                <div className="electric-arc-glow flex items-center justify-center">
                  <Zap className="w-5 h-5 text-cyan-200 fill-cyan-100" />
                </div>
              </div>
            </div>
          </div>

          {/* LOGOTIPO 3D OFICIAL DA EMPRESA EM DESTAQUE MÁXIMO */}
          <div className="relative z-10 my-1 group flex flex-col items-center">
            {/* Glow de fundo da logo */}
            <div className="absolute inset-0 bg-blue-500/15 blur-2xl rounded-full scale-110 pointer-events-none" />
            
            <img
              src={COMPANY_CONFIG.logoUrl}
              alt="Jacobs Elétrica e Hidráulica - Logotipo Oficial"
              className="relative w-[270px] max-w-[85vw] h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] transition-transform duration-300 hover:scale-[1.02]"
              loading="eager"
            />

            {/* Subtítulo Técnico e Elegante */}
            <p className="mt-2 text-center text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-300/90 flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-red-500 rounded-full" />
              <span>Tijuca · Rio de Janeiro</span>
              <span className="w-2 h-0.5 bg-blue-500 rounded-full" />
            </p>
          </div>

          {/* ===================================================================
              SELO AO VIVO: ABERTO / FECHADO (HORÁRIO DE BRASÍLIA)
              Em alto relevo 3D brilhoso logo abaixo da logo
              =================================================================== */}
          <div className="w-full mt-3 flex justify-center">
            <div
              className={`relative px-5 py-2.5 rounded-full border bg-gradient-to-r ${liveStatus.colorClass} backdrop-blur-md flex items-center gap-2.5 shadow-[0_4px_14px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all`}
            >
              {/* Ponto indicador com aura pulsante quando aberto */}
              <span className={`w-3 h-3 rounded-full shrink-0 ${liveStatus.dotClass}`} />
              
              {/* Texto do status ao vivo */}
              <span className="font-industrial text-sm sm:text-base font-extrabold tracking-wide uppercase">
                {liveStatus.statusText}
              </span>

              {/* Ícone relógio discreto */}
              <Clock className="w-4 h-4 opacity-70 shrink-0 ml-0.5" />
            </div>
          </div>

          {/* Detalhe sutil de atendimento */}
          <div className="mt-2 text-[11px] text-slate-400 font-medium tracking-tight">
            Horário de Brasília · {liveStatus.nextDetail}
          </div>
        </header>

        {/* -----------------------------------------------------------------------
            2) BOTÕES DE LINKS PRINCIPAIS (EM MOVIMENTO: SALTO AO PASSAR O MOUSE)
            SEQUÊNCIA EXATA: 1. Site Oficial, 2. WhatsApp, 3. Instagram, 4. Google, 5. Wi-Fi
            ----------------------------------------------------------------------- */}
        <section aria-label="Links Principais" className="w-full flex flex-col gap-3.5 my-2">

          {/* 1. SITE OFICIAL (3D Navy Profissional com Salto ao Passar o Mouse) */}
          <a
            href={COMPANY_CONFIG.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glossy-3d-btn btn-3d-navy min-h-[64px] px-4 py-3 group cursor-pointer"
          >
            <div className="shrink-0 mr-3.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-110">
              <GlobeEmblem className="w-8 h-8" />
            </div>
            <div className="flex-1 text-left flex flex-col justify-center overflow-hidden">
              <div className="text-white text-base sm:text-lg font-black tracking-wide leading-tight group-hover:translate-x-0.5 transition-transform truncate">
                Visitar Nosso Site Oficial
              </div>
              <div className="text-slate-300 text-xs font-semibold leading-tight truncate">
                Catálogo de materiais e serviços
              </div>
            </div>
            <div className="shrink-0 ml-2 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all">
              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
            </div>
          </a>

          {/* 2. WHATSAPP (3D Verde com Salto ao Passar o Mouse) */}
          <a
            href={COMPANY_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glossy-3d-btn btn-3d-green min-h-[64px] px-4 py-3 group cursor-pointer"
          >
            <div className="shrink-0 mr-3.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-110">
              <WhatsAppIcon className="w-8 h-8" />
            </div>
            <div className="flex-1 text-left flex flex-col justify-center overflow-hidden">
              <div className="text-white text-base sm:text-lg font-black tracking-wide leading-tight group-hover:translate-x-0.5 transition-transform truncate">
                Chamar no WhatsApp
              </div>
              <div className="text-emerald-100/90 text-xs font-semibold leading-tight truncate">
                Orçamentos imediatos e televendas
              </div>
            </div>
            <div className="shrink-0 ml-2 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all">
              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
            </div>
          </a>

          {/* 3. INSTAGRAM (3D Gradiente com Salto ao Passar o Mouse) */}
          <a
            href={COMPANY_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glossy-3d-btn btn-3d-instagram min-h-[64px] px-4 py-3 group cursor-pointer"
          >
            <div className="shrink-0 mr-3.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-110">
              <InstagramIcon className="w-8 h-8" />
            </div>
            <div className="flex-1 text-left flex flex-col justify-center overflow-hidden">
              <div className="text-white text-base sm:text-lg font-black tracking-wide leading-tight group-hover:translate-x-0.5 transition-transform truncate">
                Siga no Instagram
              </div>
              <div className="text-pink-100/90 text-xs font-semibold leading-tight truncate">
                @jacobs_eh · Obras, produtos e novidades
              </div>
            </div>
            <div className="shrink-0 ml-2 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all">
              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
            </div>
          </a>

          {/* 4. GOOGLE AVALIAÇÃO (3D Dark com Estrelas Douradas e Salto ao Passar o Mouse) */}
          <a
            href={COMPANY_CONFIG.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glossy-3d-btn btn-3d-google min-h-[64px] px-4 py-3 group cursor-pointer"
          >
            <div className="shrink-0 mr-3.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-110">
              <GoogleIcon className="w-8 h-8" />
            </div>
            <div className="flex-1 text-left flex flex-col justify-center overflow-hidden">
              <div className="text-white text-base sm:text-lg font-black tracking-wide leading-tight group-hover:translate-x-0.5 transition-transform flex items-center gap-1.5 truncate">
                <span>Avalie no Google</span>
                <span className="text-amber-400 text-xs font-black tracking-wider bg-amber-400/20 px-1.5 py-0.5 rounded border border-amber-400/30">
                  ★★★★★
                </span>
              </div>
              <div className="text-slate-300 text-xs font-semibold leading-tight truncate">
                Sua opinião fortalece nosso atendimento
              </div>
            </div>
            <div className="shrink-0 ml-2 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all">
              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
            </div>
          </a>

          {/* 5. CONECTAR AO WI-FI (3D Navy com Salto ao Passar o Mouse) */}
          <button
            type="button"
            onClick={() => setIsWifiModalOpen(true)}
            className="glossy-3d-btn btn-3d-navy min-h-[64px] px-4 py-3 group cursor-pointer"
          >
            <div className="shrink-0 mr-3.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-110">
              <WifiEmblem className="w-8 h-8" />
            </div>
            <div className="flex-1 text-left flex flex-col justify-center overflow-hidden">
              <div className="text-white text-base sm:text-lg font-black tracking-wide leading-tight group-hover:translate-x-0.5 transition-transform truncate">
                Conectar ao Wi-Fi
              </div>
              <div className="text-amber-300 text-xs font-semibold leading-tight truncate">
                Rede e senha grátis para clientes na loja
              </div>
            </div>
            <div className="shrink-0 ml-2 text-amber-400 group-hover:translate-x-1 transition-all">
              <Wifi className="w-5 h-5" />
            </div>
          </button>
        </section>

        {/* -----------------------------------------------------------------------
            3) SEÇÃO: COMO CHEGAR
            Endereço, Copiar Endereço, Rota Google Maps, Waze e Uber
            ----------------------------------------------------------------------- */}
        <section aria-label="Como Chegar" className="w-full mt-7 pt-5 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-lg sm:text-xl font-industrial font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-red-500" />
              <span>Como Chegar</span>
            </h2>
            <span className="text-xs text-slate-400 font-medium">Tijuca · RJ</span>
          </div>

          {/* Card do Endereço Físico */}
          <div className="w-full p-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0c1626] border border-slate-700/70 shadow-[0_8px_20px_rgba(0,0,0,0.6)] flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Endereço da Loja
                </p>
                <p className="text-sm sm:text-base font-bold text-white leading-snug mt-0.5">
                  {COMPANY_CONFIG.address}
                </p>
              </div>
            </div>

            {/* Botão Copiar Endereço */}
            <button
              type="button"
              onClick={handleCopyAddress}
              className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                addressCopied
                  ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 active:scale-[0.98]'
              }`}
            >
              {addressCopied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Endereço copiado com sucesso!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar endereço completo</span>
                </>
              )}
            </button>
          </div>

          {/* Grade de Botões de Rota (Google Maps + Waze + Uber) em Alto Relevo 3D */}
          <div className="w-full flex flex-col gap-2.5 mt-3">
            {/* Rota no Google Maps */}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glossy-3d-btn btn-3d-maps min-h-[54px] px-4 py-2.5 group cursor-pointer"
            >
              <div className="shrink-0 mr-3">
                <MapPinEmblem className="w-7 h-7" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-white text-sm sm:text-base font-extrabold leading-tight">
                  Traçar Rota no Google Maps
                </div>
                <div className="text-blue-200 text-xs font-medium">Navegação passo a passo</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Waze & Uber Lado a Lado no Mobile */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Botão Waze */}
              <a
                href={`https://waze.com/ul?q=${encodedAddress}&navigate=yes`}
                target="_blank"
                rel="noopener noreferrer"
                className="glossy-3d-btn btn-3d-waze min-h-[54px] px-3 py-2 group cursor-pointer"
              >
                <div className="shrink-0 mr-2.5">
                  <WazeIcon className="w-7 h-7" />
                </div>
                <div className="flex-1 text-left overflow-hidden">
                  <div className="text-white text-xs sm:text-sm font-black leading-tight truncate">
                    Ir com Waze
                  </div>
                  <div className="text-sky-100 text-[10px] font-semibold truncate">Rotas ao vivo</div>
                </div>
              </a>

              {/* Botão Uber */}
              <a
                href={`https://m.uber.com/ul/?action=setPipeline&dropoff[formatted_address]=${encodedAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glossy-3d-btn btn-3d-uber min-h-[54px] px-3 py-2 group cursor-pointer"
              >
                <div className="shrink-0 mr-2.5">
                  <UberIcon className="w-7 h-7" />
                </div>
                <div className="flex-1 text-left overflow-hidden">
                  <div className="text-white text-xs sm:text-sm font-black leading-tight truncate">
                    Pedir Uber
                  </div>
                  <div className="text-slate-300 text-[10px] font-semibold truncate">Destino direto</div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* -----------------------------------------------------------------------
            4) SEÇÃO: CARROSSEL DE PRODUTOS
            Auto-play a cada 4s, swipe, pause on touch, descrições legíveis e zoom
            ----------------------------------------------------------------------- */}
        <section aria-label="Produtos e Catálogo" className="w-full mt-8 pt-5 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <h2 className="text-lg sm:text-xl font-industrial font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-400" />
                <span>Nossos Produtos & Materiais</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Deslize para ver itens disponíveis na loja
              </p>
            </div>
            
            {/* Controles de Navegação Rápida */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev - 1 + COMPANY_CONFIG.products.length) % COMPANY_CONFIG.products.length)}
                className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center border border-slate-700 active:scale-95 transition-all cursor-pointer"
                aria-label="Slide anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % COMPANY_CONFIG.products.length)}
                className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center border border-slate-700 active:scale-95 transition-all cursor-pointer"
                aria-label="Próximo slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visualizador do Slide Ativo */}
          <div
            className="w-full rounded-2xl bg-gradient-to-b from-[#0b172a] to-[#060c17] border border-slate-700/80 shadow-[0_12px_28px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Imagem do Produto com Aspecto Completo e botão de ampliação */}
            <div className="relative w-full aspect-[4/3] bg-black/60 flex items-center justify-center overflow-hidden border-b border-slate-800">
              <img
                src={COMPANY_CONFIG.products[currentSlide].image}
                alt={COMPANY_CONFIG.products[currentSlide].title}
                className="w-full h-full object-contain p-1 transition-transform duration-500 hover:scale-105 cursor-pointer"
                onClick={() => setZoomedProduct(COMPANY_CONFIG.products[currentSlide])}
                loading="lazy"
              />

              {/* Badge da Categoria */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/90 backdrop-blur-md border border-slate-700 text-[11px] font-black uppercase tracking-wider text-amber-400">
                {COMPANY_CONFIG.products[currentSlide].category}
              </div>

              {/* Botão de Zoom/Tela Cheia */}
              <button
                type="button"
                onClick={() => setZoomedProduct(COMPANY_CONFIG.products[currentSlide])}
                className="absolute top-3 right-3 p-2 rounded-lg bg-black/70 hover:bg-black/90 text-white border border-slate-600/70 backdrop-blur-sm active:scale-90 transition-transform cursor-pointer"
                title="Ampliar imagem para ler detalhes"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Indicador de Pausa se tocar */}
              {isPaused && (
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-slate-300 backdrop-blur-sm">
                  Pausado
                </div>
              )}
            </div>

            {/* Descrição e Título do Produto */}
            <div className="p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-widest uppercase text-red-400">
                  Foto {currentSlide + 1} de {COMPANY_CONFIG.products.length}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  Toque na foto para ampliar
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-industrial font-extrabold text-white leading-tight">
                {COMPANY_CONFIG.products[currentSlide].title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {COMPANY_CONFIG.products[currentSlide].description}
              </p>

              {/* Botão de Cotação Direta do Item no WhatsApp */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Olá! Vi no biosite o item "${COMPANY_CONFIG.products[currentSlide].title}" e gostaria de consultar preço e disponibilidade.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-emerald-400/50 shadow-md active:scale-[0.98] transition-transform"
              >
                <Phone className="w-4 h-4" />
                <span>Consultar este produto no WhatsApp</span>
              </a>
            </div>

            {/* Barra de Progresso e Indicadores (Bolinhas) */}
            <div className="px-4 pb-3 flex items-center justify-center gap-1.5">
              {COMPANY_CONFIG.products.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentSlide === index
                      ? 'w-6 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                      : 'w-2 bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Ir para foto ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* -----------------------------------------------------------------------
            5) RODAPÉ DISCRETO E PROFISSIONAL
            ----------------------------------------------------------------------- */}
        <footer className="w-full mt-10 pt-6 pb-2 border-t border-slate-800/80 text-center flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-widest">
            <span>Jacobs Elétrica e Hidráulica</span>
            <span>·</span>
            <span>Tijuca - RJ</span>
          </div>

          <p className="text-[11px] text-slate-500 max-w-[360px] leading-relaxed">
            {COMPANY_CONFIG.address}
          </p>

          <p className="text-[10px] text-slate-600">
            © {new Date().getFullYear()} Todos os direitos reservados.
          </p>
        </footer>

      </main>

      {/* =========================================================================
          MODAL DE WI-FI DA LOJA (COM SENHA, REVELAR/OCULTAR, COPIAR E QR CODE)
          ========================================================================= */}
      {isWifiModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsWifiModalOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#13233c] to-[#0a1322] border border-blue-500/40 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.3)] relative flex flex-col gap-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button
              type="button"
              onClick={() => setIsWifiModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Ícone Wi-Fi em Destaque 3D */}
            <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 border border-amber-300 shadow-[0_8px_16px_rgba(245,158,11,0.4),inset_0_2px_2px_rgba(255,255,255,0.7)] flex items-center justify-center text-slate-950 font-black">
              <Wifi className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-xl font-industrial font-extrabold text-white tracking-wide uppercase">
                Wi-Fi Jacobs
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Conecte-se gratuitamente enquanto estiver em nossa loja
              </p>
            </div>

            {/* Painel com Dados da Rede */}
            <div className="flex flex-col gap-3 text-left">
              {/* Nome da Rede */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Nome da Rede (SSID)
                </span>
                <span className="text-base font-mono font-bold text-amber-400 tracking-wider">
                  {COMPANY_CONFIG.wifi.ssid}
                </span>
              </div>

              {/* Senha da Rede com Olho e Copiar */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Senha da Rede
                  </span>
                  <span className="text-base font-mono font-bold text-white tracking-wider">
                    {showPassword ? COMPANY_CONFIG.wifi.password : '•••••••••••••'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 cursor-pointer"
                  title={showPassword ? "Ocultar senha" : "Ver senha"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Botão Copiar Senha em Alto Relevo */}
            <button
              type="button"
              onClick={handleCopyPassword}
              className={`glossy-3d-btn ${wifiCopied ? 'btn-3d-green' : 'btn-3d-red'} min-h-[50px] px-4 py-2.5 justify-center gap-2 cursor-pointer text-sm sm:text-base font-extrabold`}
            >
              {wifiCopied ? (
                <>
                  <Check className="w-5 h-5 text-white" />
                  <span>Senha copiada!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 text-white" />
                  <span>Copiar senha do Wi-Fi</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-slate-400">
              Rede disponível nas dependências da loja na Rua São Francisco Xavier, 175.
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL DE ZOOM EM ALTA RESOLUÇÃO DO PRODUTO (TELA CHEIA)
          ========================================================================= */}
      {zoomedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setZoomedProduct(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-[#091220] border border-slate-700 p-4 shadow-2xl relative flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar Zoom */}
            <button
              type="button"
              onClick={() => setZoomedProduct(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/90 text-white border border-slate-700 cursor-pointer hover:bg-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Visualização Ampliada da Foto Inteira */}
            <div className="relative w-full flex-1 min-h-[300px] max-h-[60vh] bg-black/90 rounded-xl overflow-hidden flex items-center justify-center p-2">
              <img
                src={zoomedProduct.image}
                alt={zoomedProduct.title}
                className="max-w-full max-h-[58vh] object-contain rounded-lg"
              />
            </div>

            {/* Informações detalhadas */}
            <div className="mt-3 flex flex-col gap-1.5">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {zoomedProduct.category}
              </div>
              <h4 className="text-base sm:text-lg font-industrial font-extrabold text-white">
                {zoomedProduct.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {zoomedProduct.description}
              </p>

              <div className="mt-2 flex gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Olá Jacobs Elétrica e Hidráulica! Gostaria de consultar o item: "${zoomedProduct.title}".`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Pedir Orçamento no WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setZoomedProduct(null)}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
