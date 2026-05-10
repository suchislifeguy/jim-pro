  import React, { useState, useEffect, useRef, Component, useMemo } from 'react';
  import ReloadPrompt from './components/ReloadPrompt';
  import { syncWrite, coldStartSync, syncAll } from './sync';
  import { createPortal } from 'react-dom';
  import { get, set } from 'idb-keyval';
  import {
    Trash2, ImageIcon, Printer, Plus, X, ChevronRight, ChevronDown, Sparkles,
    Pencil, Save, HardDrive, CheckCircle2, Clock, Moon, Sun, Edit3, Undo,
    RefreshCcw, Move, ZoomIn, Check, Search, DollarSign, Tag, Share2, Map,
    MapPinned, Navigation, LocateFixed, AlertTriangle, Receipt, Home, Info,
    Download, Upload, Settings, FileText, Bot, Mic, ShieldAlert, Lock,
    Bookmark, Package, PlusCircle, Calendar, Building2, CalendarPlus, Award,
    ShieldCheck, BadgeCheck, FileCheck, Camera, Wand2, Play, Square, Phone, Wallet, Timer, FileDown, Users, TrendingUp, CreditCard, MicOff, Radio, Mail, MessageSquare, Send
  } from 'lucide-react';

  const JimMascot = ({ size = 36, state = 'idle' }) => {
    const s = state;
    const wrapCls = s === 'error' ? 'jim-shake' : s === 'empty' ? 'jim-sway' : 'jim-idle';
    const h = Math.round(size * 1.3);
    const isWave = s === 'wave';
    const isThink = s === 'thinking';
    return (
      <div className={wrapCls} style={{ width: size, height: h, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 90" width="100%" height="100%" overflow="visible">
      <style>{`
        .jim-body {
          animation: bounce 0.4s ease-in-out infinite alternate, glitch 1.5s steps(3) infinite;
          transform-origin: 30px 60px;
        }
        .jim-head {
          animation: nod 0.8s ease-in-out infinite;
          transform-origin: 30px 28px;
        }
        .jim-hat {
          animation: nod 0.8s ease-in-out infinite;
          transform-origin: 30px 28px;
        }
        .jim-arm-left {
          animation: swingLeft 0.9s ease-in-out infinite;
          transform-origin: 15px 48px;
        }
        .jim-arm-right {
          animation: swingRight 1s ease-in-out infinite 0.5s;
          transform-origin: 44px 46px;
        }
        .jim-foot-left {
          animation: tapRight 0.4s ease-in-out infinite 0.2s;
          transform-origin: 38px 73px;
        }
        .jim-foot-right {
          animation: tapRight 0.4s ease-in-out infinite 0.2s;
          transform-origin: 38px 73px;
        }
        .jim-eyes {
          animation: eyeGlitch 2.5s infinite;
          transform-origin: 24px 27px;
        }
        .jim-mustache {
          animation: mustacheWiggle 0.5s ease-in-out infinite;
          transform-origin: 30px 36px;
        }
        .jim-clipboard {
          animation: clipboardFlip 0.8s ease-in-out infinite;
          transform-origin: 12px 62px;
        }
        .tick-draw {
          animation: drawTick 1s ease-out 1.2s both;
          stroke-dasharray: 12;
          stroke-dashoffset: 12;
        }

        @keyframes bounce {
          0% { transform: translateY(0) scaleY(1); }
          100% { transform: translateY(-1px) scaleY(1.05); }
        }
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(-3px, 1px); }
          30% { transform: translate(3px, -1px); }
          50% { transform: translate(-1px, -2px); }
          70% { transform: translate(2px, 2px); }
          90% { transform: translate(1px, -1px); }
        }
        @keyframes nod {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          50% { transform: rotate(12deg); }
          75% { transform: rotate(-5deg); }
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        @keyframes swingLeft {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-30deg); }
          50% { transform: rotate(40deg); }
          75% { transform: rotate(-10deg); }
        }
        @keyframes swingRight {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(25deg); }
          50% { transform: rotate(-35deg); }
          75% { transform: rotate(10deg); }
        }
        @keyframes tapLeft {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-35deg); }
        }
        @keyframes tapRight {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(25deg); }
        }
        @keyframes eyeGlitch {
          0%, 95%, 100% { transform: scaleY(1); }
          97% { transform: scaleY(0.05) translateY(12px); }
        }
        @keyframes mustacheWiggle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(20deg); }
        }
        @keyframes clipboardFlip {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(-1); }
        }
        @keyframes drawTick {
          to { stroke-dashoffset: 0; }
        }
        `}</style>

        <g className="jim-body">
        {/* LEFT ARM & CLIPBOARD */}
        <g className="jim-arm-left">
        <polygon points="19,44 14,49 12,57 18,53" fill="#eab308" />
        <polygon points="19,44 14,49 16,51 19,48" fill="#ca8a04" opacity="0.5" />
        <polygon points="12,56 18,52 19,63 14,65" fill="#f5cba0" />
        <g className="jim-clipboard">
        <rect x="4" y="52" width="12" height="20" rx="1.5" fill="#7a4c1a" />
        <rect x="5.5" y="54" width="9" height="17" rx="0.5" fill="#fef9e8" />
        <rect x="7" y="51" width="6" height="4" rx="1" fill="#334155" />
        <circle cx="10" cy="53" r="1" fill="#0f172a" />
        <rect x="6.5" y="56.5" width="7" height="1" rx="0.5" fill="#94a3b8" />
        <rect x="6.5" y="59" width="7" height="1" rx="0.5" fill="#94a3b8" />
        <rect x="6.5" y="61.5" width="5" height="1" rx="0.5" fill="#cbd5e1" />
        <path className="tick-draw" d="M7.2,66.5 L9.2,68.8 L13,64.5" stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="14" y="61" width="5" height="5.5" rx="2" fill="#f5cba0" />
        <path d="M15,64 L13.5,61.5" stroke="#d4956a" strokeWidth="1.3" strokeLinecap="round" />
        </g>
        </g>

        {/* LEGS & BOOTS */}
        <g>
        <path d="M19,63 L41,63 L43,74 L33,74 L31,67 L29,74 L17,74 Z" fill="#1e293b" />
        <line x1="21" y1="63" x2="19" y2="73" stroke="#0f172a" strokeWidth="1.2" />
        <line x1="39" y1="63" x2="41" y2="73" stroke="#0f172a" strokeWidth="1.2" />

        <g className="jim-foot-left">
        <path d="M17,73 L29,73 Q31,77 29,78 L17,78 Z" fill="#5a3a1a" />
        <path d="M17,73 L22,73 Q24,77 22,78 L17,78 Z" fill="#3e2610" />
        <rect x="17" y="77.5" width="12" height="2.5" rx="0.8" fill="#1a0f05" />
        </g>

        <g className="jim-foot-right">
        <path d="M33,73 L43,73 Q45,77 43,78 L33,78 Z" fill="#5a3a1a" />
        <path d="M38,73 L43,73 Q45,77 43,78 L41.5,78 Z" fill="#3e2610" />
        <rect x="33" y="77.5" width="10" height="2.5" rx="0.8" fill="#1a0f05" />
        </g>
        </g>

        {/* TORSO */}
        <path d="M19,43 Q30,41.5 41,43 L39,62 L21,62 Z" fill="#0a1120" />
        <path d="M17,45 C22,43 38,43 43,45 L41,61 L19,61 Z" fill="#eab308" />
        <polygon points="25,44 35,44 30,52" fill="#0a1120" />
        <path d="M18,55 Q30,58 42,55 L42,59 Q30,61.5 18,59 Z" fill="#f8fafc" />
        <path d="M22,44 L22,56 M38,44 L38,56" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
        <rect x="18.5" y="61.2" width="23" height="3.2" fill="#020617" rx="0.5" />
        <rect x="27" y="60.8" width="5" height="5" rx="1" fill="#cbd5e1" />
        <rect x="27.5" y="61.3" width="4" height="4" rx="0.5" fill="#94a3b8" />

        {/* RIGHT ARM */}
        <g className="jim-arm-right">
        <polygon points="43,44 50.5,46 51.5,56 43.2,52" fill="#eab308" />
        <polygon points="43,44 50.5,46 48,48 43.5,46" fill="#ca8a04" opacity="0.45" />
        <polygon points="43,51 51.5,55 48.5,65.5 42.5,63.2" fill="#f5cba0" />
        <rect x="41" y="62.5" width="6.5" height="6.2" rx="2.5" fill="#f5cba0" />
        <path d="M42.5,64.5 Q46.5,68.5 49,65.5" stroke="#d4956a" strokeWidth="0.5" fill="none" strokeLinecap="round" />
        </g>

        {/* NECK */}
        <rect x="27" y="39" width="6" height="6" fill="#f5cba0" />

        {/* HEAD & HAT */}
        <g className="jim-head">
        <ellipse cx="17.5" cy="30" rx="2.4" ry="3.2" fill="#f5cba0" />
        <ellipse cx="42.5" cy="30" rx="2.4" ry="3.2" fill="#f5cba0" />
        <circle cx="30" cy="28" r="14.5" fill="#fcd9b6" />

        <path d="M19.5,20.8 L26,19.5" stroke="#2d1a0a" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M34,19.5 L40.5,20.8" stroke="#2d1a0a" strokeWidth="1.8" strokeLinecap="round" />

        <g className="jim-eyes">
        <ellipse cx="24" cy="27" rx="3.8" ry="3.2" fill="white" />
        <ellipse cx="36" cy="27" rx="3.8" ry="3.2" fill="white" />
        <circle cx="24" cy="27.3" r="2.2" fill="#1a5a38" />
        <circle cx="36" cy="27.3" r="2.2" fill="#1a5a38" />
        <circle cx="24" cy="27.3" r="1.1" fill="#0d1f14" />
        <circle cx="36" cy="27.3" r="1.1" fill="#0d1f14" />
        <circle cx="25" cy="26.4" r="0.6" fill="white" />
        <circle cx="37" cy="26.4" r="0.6" fill="white" />
        <path d="M20,25.2 Q24,23.8 28,25.2" stroke="#2d1a0a" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        <path d="M32,25.2 Q36,23.8 40,25.2" stroke="#2d1a0a" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        </g>

        <circle cx="27" cy="30" r="0.6" fill="#d4956a" opacity="0.1" />
        <circle cx="28.5" cy="31.5" r="0.5" fill="#d4956a" opacity="0.1" />
        <circle cx="33" cy="30" r="0.6" fill="#d4956a" opacity="0.1" />

        <g className="jim-mustache">
        <path d="M21,36.5 Q26,33 30,35.5" stroke="#2d1a0a" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M30,35.5 Q34,33 39,36.5" stroke="#2d1a0a" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>

        <path d="M24,39 Q30,41.5 36,38.8" stroke="#2d1a0a" strokeWidth="1.2" fill="none" strokeLinecap="round" />

        <g className="jim-hat">
        <path d="M15,19 C15,4 45,4 45,19 Z" fill="#f97316" />
        <path d="M26.5,19 L27.5,9 Q30,7 32.5,9 L33.5,19 Z" fill="#ea580c" opacity="0.25" />
        <path d="M19,19 L20,12 Q21.5,10.5 23,12 L23,19 Z" fill="#ea580c" opacity="0.18" />
        <path d="M41,19 L40,12 Q38.5,10.5 37,12 L37,19 Z" fill="#ea580c" opacity="0.18" />
        <path d="M18,17.5 C18.5,10 22,7.5 22,7.5 C22,7.5 20,11 20.5,17.5 Z" fill="white" opacity="0.2" />
        <path d="M11,19 Q30,15 49,19 Q51,20 50,22 L10,22 Q9,20 11,19 Z" fill="#ea580c" />
        <path d="M11,19 Q30,15 49,19 Q50.5,20 50,20.8 Q30,17 10,20.8 Q9.5,20 11,19 Z" fill="#fb923c" opacity="0.5" />
        </g>
        </g>
        </g>
        </svg>
      </div>
    );
  };

  const DB_KEY_JOBS         = 'jobsite-master-v5';
  const DB_KEY_TEMPL        = 'joblog-templates';
  const DB_KEY_MATS         = 'joblog-materials';
  const DB_KEY_APPOINTMENTS = 'joblog-appointments';
  const DB_KEY_TIMESHEETS   = 'joblog-timesheets';

  const migrateProfile = (p) => {
    if (!p || p.credentials !== undefined) return p;
    const creds = [];
    if (p.abn) creds.push({ label: 'ABN', value: p.abn, expiry: '' });
    (p.licences || []).forEach(l => creds.push({
      label: l.customType || l.type,
      value: l.number + (l.state ? ` (${l.state})` : ''),
      expiry: l.expiry || ''
    }));
    if (p.insurance) creds.push({
      label: 'Public Liability Insurance',
      value: p.insurance + (p.insurancePolicy ? ' - ' + p.insurancePolicy : ''),
      expiry: p.insuranceExpiry || ''
    });
    const { abn, licences, insurance, insurancePolicy, insuranceExpiry, ...rest } = p;
    return { ...rest, credentials: creds };
  };

  const BIZA_KEY  = 'joblog-business';
  const MAX_STOPS = 12;

  const COUNTRY_CONFIGS = {
    AU: { name: 'Australia',      flag: '🇦🇺', currency: 'AUD', symbol: '$',  taxLabel: 'GST',       taxRate: 10, locale: 'en-AU', markupLabel: 'Additional Markup', regLabel: 'ABN', invoiceLabel: 'Tax Invoice' },
    NZ: { name: 'New Zealand',    flag: '🇳🇿', currency: 'NZD', symbol: '$',  taxLabel: 'GST',       taxRate: 15, locale: 'en-NZ', markupLabel: 'Additional Markup', regLabel: 'GST #', invoiceLabel: 'Tax Invoice' },
    US: { name: 'United States',  flag: '🇺🇸', currency: 'USD', symbol: '$',  taxLabel: 'Sales Tax', taxRate: 0,  locale: 'en-US', markupLabel: 'State / Local Tax', regLabel: 'Tax ID', invoiceLabel: 'Invoice' },
    CA: { name: 'Canada',         flag: '🇨🇦', currency: 'CAD', symbol: '$',  taxLabel: 'GST/HST',   taxRate: 5,  locale: 'en-CA', markupLabel: 'Provincial / Other Tax', regLabel: 'Business #', invoiceLabel: 'Invoice' },
    GB: { name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', symbol: '£',  taxLabel: 'VAT',       taxRate: 20, locale: 'en-GB', markupLabel: 'Additional Markup', regLabel: 'VAT Reg #', invoiceLabel: 'Tax Invoice' },
    IE: { name: 'Ireland',        flag: '🇮🇪', currency: 'EUR', symbol: '€',  taxLabel: 'VAT',       taxRate: 23, locale: 'en-IE', markupLabel: 'Additional Markup', regLabel: 'VAT #', invoiceLabel: 'Tax Invoice' },
  };
  let _cc = localStorage.getItem('jim-country') || 'AU';
  const getCC = () => COUNTRY_CONFIGS[_cc] || COUNTRY_CONFIGS.AU;

  // --- Utility Functions ---
  const formatLocal = (input, style = 'default') => {
    if (!input) return '';
    const d = new Date(input);
    if (isNaN(d.getTime())) return '';
    if (style === 'iso-date') return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    if (style === 'iso-datetime') return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    const loc = getCC().locale;
    if (style === 'short') return d.toLocaleDateString(loc, { day: 'numeric', month: 'short', year: '2-digit' });
    if (style === 'datetime') return d.toLocaleString(loc, { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
    return d.toLocaleDateString(loc);
  };

  const parseTimeToMinutes = (str) => {
    if (!str) return 0;
    const s = str.toLowerCase().trim();
    const hM = s.match(/(\d+\.?\d*)\s*h/);
    const mM = s.match(/(\d+\.?\d*)\s*m(?:in(?:utes?)?)?(?:\b|$)/);
    if (!hM && !mM) { const n = parseFloat(s); return isNaN(n) ? 0 : n * 60; }
    return (hM ? parseFloat(hM[1]) * 60 : 0) + (mM ? parseFloat(mM[1]) : 0);
  };

  const fmtMins = (m) => { const h = Math.floor(m/60), r = Math.round(m%60); if (!h && !r) return `0m`; if (!h) return `${r}m`; if (!r) return `${h}h`; return `${h}h ${r}m`; };
  const fmtAUD  = (n) => Number(n||0).toLocaleString(getCC().locale, { style:'currency', currency: getCC().currency, minimumFractionDigits:2, maximumFractionDigits:2 });
  const isExpiringSoon = (expiryStr) => { if (!expiryStr) return false; const diff = new Date(expiryStr) - new Date(); return diff > 0 && diff < 60 * 24 * 60 * 60 * 1000; };
  const isExpired = (expiryStr) => { if (!expiryStr) return false; return new Date(expiryStr) < new Date(); };

  // --- AI Proxy ---
  const AI_PROXY_BASE = import.meta.env.VITE_AI_PROXY_URL ||
    'https://us-central1-jim-pro-app-6acf6.cloudfunctions.net';

  const smartFetchAI = async (taskType, contents, generationConfig, user, userModelHint, userApiKey) => {
    const idToken = await user.getIdToken();
    const res = await fetch(`${AI_PROXY_BASE}/aiGenerate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
      body: JSON.stringify({ taskType, contents, generationConfig, userModelHint, userApiKey: userApiKey || undefined }),
    });
    if (res.ok) return await res.json();
    let errBody = {};
    try { errBody = await res.json(); } catch {}
    if (res.status === 503 && errBody.code === 'GEMINI_OVERLOADED') {
      throw new Error('AI is overloaded right now — try again in a minute.');
    }
    throw new Error(errBody.error || `AI request failed (${res.status})`);
  };

  const aiUploadFileProxy = async (file, user, userApiKey) => {
    const idToken = await user.getIdToken();
    const headers = { 'Content-Type': file.type, 'Authorization': `Bearer ${idToken}`, 'X-File-Size': String(file.size) };
    if (userApiKey) headers['X-User-Api-Key'] = userApiKey;
    const res = await fetch(`${AI_PROXY_BASE}/aiUploadFile`, {
      method: 'POST',
      headers,
      body: file,
    });
    if (!res.ok) {
      let errBody = {};
      try { errBody = await res.json(); } catch {}
      throw new Error(errBody.error || `Upload failed (${res.status})`);
    }
    return await res.json();
  };

  const getQuoteTotals = (tasks, gstEnabled, extraTaxRate = 0) => {
    let labour = 0, mats = 0;
    (tasks||[]).forEach(t => {
      labour += (parseTimeToMinutes(t.time)/60) * (parseFloat(t.rate)||0);
      mats   += parseFloat(t.materialsCost)||0;
    });
    const subtotal = labour + mats;
    const gst      = gstEnabled ? subtotal * (getCC().taxRate / 100) : 0;
    const extra    = subtotal * (extraTaxRate / 100);
    const total    = subtotal + gst + extra;
    return { labour, mats, subtotal, gst, extra, total };
  };

  const compressImage = (file) => new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = () => rej(new Error(`FileReader failed: ${file.name}`));
    reader.onload = (ev) => {
      const img = new Image(); img.src = ev.target.result;
      img.onerror = () => rej(new Error(`Decode failed: ${file.name}`));
      img.onload = () => {
        try {
          const c = document.createElement('canvas');
          const MAX = 800; // Optimal size to save on AI Tokens
          let w = img.width, h = img.height;
          if (w > MAX) { h *= MAX/w; w = MAX; }
          if (h > MAX) { w *= MAX/h; h = MAX; }
          c.width = w; c.height = h;
          c.getContext('2d').drawImage(img, 0, 0, w, h);
          res(c.toDataURL('image/webp', 0.6));
        } catch(e) { rej(e); }
      };
    };
  });

  const compressLogo = (file) => new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = () => rej(new Error('Logo read failed'));
    reader.onload = (ev) => {
      const img = new Image(); img.src = ev.target.result;
      img.onerror = () => rej(new Error('Logo decode failed'));
      img.onload = () => {
        try {
          const c = document.createElement('canvas');
          const MAX = 320; let w = img.width, h = img.height;
          if (w > MAX) { h *= MAX/w; w = MAX; }
          if (h > MAX) { w *= MAX/h; h = MAX; }
          c.width = w; c.height = h;
          c.getContext('2d').drawImage(img, 0, 0, w, h);
          res(c.toDataURL('image/webp', 0.7));
        } catch(e) { rej(e); }
      };
    };
  });

  const STATUSES = [
    { key:'draft',       label:'Drafting',    phase:'quoting',   cls:'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700' },
    { key:'sent',        label:'Quoted',      phase:'quoting',   cls:'bg-blue-100 dark:bg-blue-900/40 text-blue-600 border-blue-200 dark:border-blue-800' },
    { key:'approved',    label:'Approved',    phase:'working',   cls:'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 border-emerald-200 dark:border-emerald-800' },
    { key:'in_progress', label:'In Progress', phase:'working',   cls:'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800' },
    { key:'completed',   label:'Completed',   phase:'invoicing', cls:'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800' },
    { key:'invoiced',    label:'Invoiced',    phase:'invoicing', cls:'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 border-indigo-200 dark:border-indigo-800' },
    { key:'paid',        label:'Paid',        phase:'invoicing', cls:'bg-teal-100 dark:bg-teal-900/40 text-teal-700 border-teal-200 dark:border-teal-800' },
    { key:'rejected',    label:'Rejected',    phase:'lost',      cls:'bg-red-100 dark:bg-red-900/40 text-red-700 border-red-200 dark:border-red-800' },
  ];
  const HAPPY_PATH = ['draft','sent','approved','in_progress','completed','invoiced','paid'];
  const getStatus = (k) => STATUSES.find(s => s.key===k) || STATUSES[0];
  const phaseOf = (job) => (getStatus(job?.status || 'draft').phase);
  const isCompletionDoc = (job) => phaseOf(job) === 'invoicing' || job?.type === 'handover';
  const isOverdueInvoice = (job) => job?.status === 'invoiced' && job.invoicedAt && (Date.now() - job.invoicedAt > 30*86400000);
  const REJECTION_REASONS = [
    { key:'too_expensive',   label:'Too expensive' },
    { key:'went_elsewhere',  label:'Went with someone else' },
    { key:'no_response',     label:'No response from client' },
    { key:'scope_changed',   label:'Scope changed / cancelled' },
    { key:'other',           label:'Other' },
  ];
  const getRejectionLabel = (key) => (REJECTION_REASONS.find(r => r.key === key)?.label) || 'Rejected';
  const NEXT_ACTION_BTN = {
    draft:        'Mark Quoted',
    sent:         'Mark Approved',
    approved:     'Start Work',
    in_progress:  'Mark Completed',
    completed:    'Generate Invoice',
    invoiced:     'Mark Paid',
  };
  const daysSince = (ts) => ts ? Math.floor((Date.now() - ts) / 86400000) : null;
  const getNextActionHint = (job) => {
    const s = job?.status || 'draft';
    const d = daysSince(job?.createdAt);
    if (s === 'draft')        return d != null && d > 1 ? `Finish & send — drafted ${d}d ago` : 'Finish & send';
    if (s === 'sent') {
      const sent = daysSince(job?.createdAt);
      return sent != null && sent >= 3 ? `Follow up — sent ${sent}d ago` : 'Awaiting client';
    }
    if (s === 'approved')     return 'Start work';
    if (s === 'in_progress')  return 'Work in progress';
    if (s === 'completed')    return 'Send invoice';
    if (s === 'invoiced') {
      const od = job?.invoicedAt && (Date.now() - job.invoicedAt > 30*86400000);
      const d2 = daysSince(job?.invoicedAt);
      return od ? `Chase — overdue ${d2}d` : (d2 != null ? `Awaiting payment (${d2}d)` : 'Awaiting payment');
    }
    if (s === 'paid')         return 'Paid';
    if (s === 'rejected')     return `Lost — ${getRejectionLabel(job?.rejectionReason)}`;
    return '';
  };

  const getStartOfWeek = (date, weekStartsOn = 1) => {
    const d = new Date(date);
    const day = d.getDay() || 7;
    const diff = d.getDate() - day + weekStartsOn;
    return new Date(d.setDate(diff));
  };

  const PrintEditableDiv = ({ value, onChange, placeholder, className }) => (
    <div
      contentEditable suppressContentEditableWarning
      onBlur={e => onChange(e.currentTarget.innerText)}
      className={`empty:before:content-[attr(data-placeholder)] whitespace-pre-wrap outline-none ${className}`}
      data-placeholder={placeholder}
    >{value}</div>
  );

  class ErrorBoundary extends Component {
    constructor(props) { super(props); this.state = { hasError: false, error: null }; }
    static getDerivedStateFromError(error) { return { hasError: true, error }; }
    render() {
      if (this.state.hasError) return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-slate-100 dark:bg-slate-950">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-sm w-full text-center border dark:border-slate-800 shadow-xl">
            <div className="mb-4 flex justify-center"><JimMascot size={72} state="error"/></div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">Something went wrong</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{this.state.error?.message || 'Unexpected error'}</p>
            <button onClick={() => window.location.reload()} className="bg-orange-500 hover:bg-orange-400 text-white font-black px-6 py-3 rounded-xl w-full active:scale-95 transition-all">Reload App</button>
          </div>
        </div>
      );
      return this.props.children;
    }
  }

  const ToastMessage = ({ message, type, onClose }) => {
    useEffect(() => { const timer = setTimeout(onClose, type === 'error' ? 10000 : type === 'success' ? 3000 : 4000); return () => clearTimeout(timer); }, [onClose, type]);
    const styles = {
      success: { wrap: 'bg-emerald-600 border-emerald-500', icon: <CheckCircle2 size={20} className="text-white flex-shrink-0"/>, text: 'text-white' },
      error:   { wrap: 'bg-red-600 border-red-500', icon: <AlertTriangle size={20} className="text-white flex-shrink-0"/>, text: 'text-white' },
      info:    { wrap: 'bg-slate-800 border-slate-700', icon: <Info size={20} className="text-blue-400 flex-shrink-0"/>, text: 'text-white' },
    };
    const s = styles[type] || styles.info;
    return (
      <div className="fixed top-4 inset-x-4 z-[9999] flex justify-center pointer-events-auto animate-slide-down" style={{ marginTop: 'env(safe-area-inset-top)' }}>
        <div className={`w-full max-w-sm rounded-2xl shadow-2xl p-4 flex items-start gap-3 border ${s.wrap}`}>
          <div className="mt-0.5">{s.icon}</div>
          <div className="flex-1 min-w-0 max-h-[40vh] overflow-y-auto custom-scrollbar">
            <p className={`text-sm font-semibold leading-relaxed whitespace-pre-wrap break-words ${s.text}`}>{message}</p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white flex-shrink-0 p-1 rounded-lg transition-colors"><X size={16}/></button>
        </div>
      </div>
    );
  };

  const RejectSheet = ({ job, onConfirm, onCancel }) => {
    const [reason, setReason] = useState('too_expensive');
    const [note, setNote] = useState('');
    return (
      <div className="fixed inset-0 z-[350] bg-slate-900/80 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4">
        <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-2xl border dark:border-slate-800 pb-safe animate-slide-up sm:animate-none">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-lg mb-1">Move to Lost</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">{job?.address || 'This quote'} will be archived. You can reopen it later.</p>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Reason</label>
          <div className="space-y-1.5 mb-4">
            {REJECTION_REASONS.map(r => (
              <label key={r.key} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer text-sm font-semibold border transition-all ${reason === r.key ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-400' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>
                <input type="radio" name="reject-reason" value={r.key} checked={reason === r.key} onChange={() => setReason(r.key)} className="accent-red-500"/>
                {r.label}
              </label>
            ))}
          </div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Notes (optional)</label>
          <textarea className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none text-sm font-medium h-20 resize-none dark:text-white dark:placeholder-slate-500 mb-4 border border-slate-200 dark:border-slate-700 focus:border-red-400" placeholder="What did the client say?" value={note} onChange={e => setNote(e.target.value)}/>
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 font-black text-sm text-slate-600 dark:text-slate-300 active:scale-95 transition-all">Cancel</button>
            <button onClick={() => onConfirm(reason, note.trim())} className="flex-1 py-3 rounded-2xl font-black text-sm text-white bg-red-500 hover:bg-red-400 active:scale-95 transition-all">Move to Lost</button>
          </div>
        </div>
      </div>
    );
  };

  const ConfirmDialog = ({ message, confirmLabel = 'Delete', onConfirm, onCancel, danger = true }) => (
    <div className="fixed inset-0 z-[350] bg-slate-900/80 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4">
      <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-2xl border dark:border-slate-800 pb-safe animate-slide-up sm:animate-none">
        <p className="font-bold text-slate-800 dark:text-white text-center mb-6 leading-relaxed text-lg">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 font-black text-sm text-slate-600 dark:text-slate-300 active:scale-95 transition-all">Cancel</button>
          <button onClick={onConfirm} className={`flex-1 py-4 rounded-2xl font-black text-sm text-white active:scale-95 transition-all ${danger ? 'bg-red-500 hover:bg-red-400' : 'bg-orange-500 hover:bg-orange-400'}`}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );

  const UpgradeModal = ({ onClose, onUnlock, showToast }) => {
    return (
      <div className="fixed inset-0 z-[300] bg-slate-900/90 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-4 overflow-y-auto">
        <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl border dark:border-slate-800 animate-slide-up sm:animate-none pb-safe text-center my-auto">
          <div className="flex justify-end mb-2"><button onClick={onClose} aria-label="Close" className="w-9 h-9 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"><X size={18}/></button></div>
          <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center mx-auto mb-4"><Lock size={32} className="text-orange-500"/></div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Limit Reached</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">You've reached the 3-job free limit. Upgrade to Pro for unlimited features.</p>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl mb-6 border border-slate-200 dark:border-slate-700 text-left">
            <h3 className="font-black text-sm mb-1 text-slate-800 dark:text-white">Upgrade to JIM Pro</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium">Unlock unlimited projects and AI-powered tools.</p>
            <button className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-black text-sm transition-colors">Upgrade Now</button>
          </div>
        </div>
      </div>
    );
  };

  const AIAssistModal = ({ onClose, onGenerate, isGenerating, docType, toggleVoice, listeningField }) => {
    const [prompt, setPrompt] = useState('');
    return (
      <div className="fixed inset-0 z-[600] bg-slate-900/90 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-4 animate-slide-up sm:animate-none">
        <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 shadow-2xl border dark:border-slate-800 pb-safe">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-black text-lg flex items-center gap-2"><Sparkles className="text-purple-500" size={20}/> Ask AI</h3>
            <button onClick={onClose} aria-label="Close" className="w-9 h-9 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"><X size={18}/></button>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium leading-relaxed">Give JIM a nudge — any extra details and he'll write your {docType} around them.</p>

          <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 bg-slate-50 dark:bg-slate-800 mb-4 transition-shadow">
            <textarea
              className="w-full p-4 bg-transparent outline-none text-sm font-medium h-32 resize-none dark:text-white dark:placeholder-slate-500"
              placeholder="Additional instructions (optional)…"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
            />
            <div className="flex justify-end bg-slate-100 dark:bg-slate-700/50 px-2 py-1.5 border-t border-slate-200 dark:border-slate-700">
              <button type="button" onClick={() => toggleVoice('aiAssistPrompt', (val) => setPrompt(prev => typeof val === 'function' ? val(prev) : val))} className={`p-1.5 rounded-lg transition-colors flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${listeningField==='aiAssistPrompt' ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-600'}`}>
                <Mic size={14}/> Dictate
              </button>
            </div>
          </div>

          {isGenerating && (
            <div className="flex flex-col items-center gap-2 py-2 mb-2">
              <JimMascot size={52} state="thinking"/>
              <p className="text-xs font-black text-purple-500 uppercase tracking-widest">AI is thinking…</p>
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 bg-slate-100 dark:bg-slate-800 py-4 rounded-2xl font-black text-slate-600 dark:text-slate-300 active:scale-95 transition-all">Cancel</button>
            <button onClick={() => onGenerate(prompt)} disabled={isGenerating} className={`flex-1 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all active:scale-95 ${isGenerating ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-500/20'}`}>
              {isGenerating ? <><JimMascot size={20} state="thinking"/> Working…</> : <><Sparkles size={16}/> Generate</>}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CredentialsEditor = ({ credentials, onChange, regLabel }) => {
    const add = () => onChange([...credentials, { label: '', value: '', expiry: '' }]);
    const remove = (i) => onChange(credentials.filter((_, idx) => idx !== i));
    const upd = (i, f, v) => onChange(credentials.map((c, idx) => idx === i ? { ...c, [f]: v } : c));
    return (
      <div className="space-y-2">
        {credentials.length === 0 && <p className="text-xs text-slate-400 font-medium text-center py-2">No credentials added yet.</p>}
        {credentials.map((c, i) => {
          const exp = isExpired(c.expiry); const soon = isExpiringSoon(c.expiry);
          return (
            <div key={i} className={`p-3 rounded-xl border space-y-2 ${exp ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : soon ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
              <div className="flex items-center gap-2">
                <input className="flex-1 p-2 bg-slate-50 dark:bg-slate-700 rounded-lg outline-none text-[11px] font-black uppercase tracking-wide dark:text-white border border-slate-200 dark:border-slate-600 focus:ring-1 focus:ring-orange-400 placeholder-slate-400" placeholder={`Label  (e.g. ${regLabel}, Licence No., Insurance)`} value={c.label} onChange={e => upd(i,'label',e.target.value)}/>
                <button onClick={() => remove(i)} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors flex-shrink-0"><Trash2 size={14}/></button>
              </div>
              <input className="w-full p-2 bg-slate-50 dark:bg-slate-700 rounded-lg outline-none text-sm font-mono font-bold dark:text-white border border-slate-200 dark:border-slate-600 focus:ring-1 focus:ring-orange-400 placeholder-slate-400" placeholder="Value / number" value={c.value} onChange={e => upd(i,'value',e.target.value)}/>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex-shrink-0">Expiry</span>
                <input type="date" className={`flex-1 p-2 rounded-lg outline-none text-xs font-bold dark:text-white border focus:ring-1 focus:ring-orange-400 ${exp ? 'bg-red-50 dark:bg-red-900/30 border-red-300' : soon ? 'bg-amber-50 dark:bg-amber-900/30 border-amber-300' : 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600'}`} value={c.expiry} onChange={e => upd(i,'expiry',e.target.value)}/>
                {(exp||soon) && <span className={`text-[9px] font-black uppercase tracking-widest flex-shrink-0 ${exp?'text-red-500':'text-amber-500'}`}>{exp?'EXPIRED':'SOON'}</span>}
              </div>
            </div>
          );
        })}
        <button onClick={add} className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-xs font-black uppercase text-slate-400 hover:border-orange-400 hover:text-orange-500 transition-all">
          <PlusCircle size={14}/> Add Credential
        </button>
      </div>
    );
  };

  const BusinessProfileEditor = ({ profile, onSave, onClose, showToast }) => {
    const cc = getCC();
    const [form, setForm] = useState({
      name: profile.name || '', tradingName: profile.tradingName || '',
      phone: profile.phone || '', email: profile.email || '', address: profile.address || '',
      logo: profile.logo || '', credentials: profile.credentials || [],
      termsAndConditions: profile.termsAndConditions || ''
    });

    const handleLogoUpload = async (e) => {
      const file = e.target.files[0]; if (!file) return;
      try { const logoData = await compressLogo(file); setForm(f => ({ ...f, logo: logoData })); }
      catch { showToast('Logo could not be processed.', 'error'); }
    };

    const expiringCreds = form.credentials.filter(c => isExpiringSoon(c.expiry) || isExpired(c.expiry));

    return (
      <div className="fixed inset-0 z-[190] bg-slate-900/95 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4">
        <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl w-full max-w-md p-5 sm:p-6 shadow-2xl border dark:border-slate-800 max-h-[92vh] flex flex-col animate-slide-up sm:animate-none pb-safe">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
            <h3 className="font-black text-lg flex items-center gap-2 text-slate-900 dark:text-white"><Building2 size={18} className="text-orange-500"/> Business Profile</h3>
            <button onClick={onClose} aria-label="Close" className="w-9 h-9 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"><X size={18}/></button>
          </div>
          <div className="overflow-y-auto flex-1 custom-scrollbar pb-2 pr-1 space-y-5">
            {expiringCreds.length > 0 && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-2xl p-3 flex items-start gap-2">
                <AlertTriangle size={15} className="text-amber-500 flex-shrink-0 mt-0.5"/>
                <p className="text-xs text-amber-700 dark:text-amber-400 font-bold">{expiringCreds.length} credential{expiringCreds.length > 1 ? 's' : ''} {expiringCreds.some(c => isExpired(c.expiry)) ? 'expired or expiring soon' : 'expiring soon'} — update below.</p>
              </div>
            )}
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-700 border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
                {form.logo ? <img src={form.logo} className="w-full h-full object-contain p-1" alt="logo"/> : <ImageIcon size={26} className="text-slate-300 dark:text-slate-500"/>}
              </div>
              <div>
                <p className="font-black text-sm mb-0.5 dark:text-white">Business Logo</p>
                <p className="text-[10px] text-slate-400 mb-2 font-medium">Appears on printed reports</p>
                <label className="inline-flex items-center gap-1.5 bg-slate-200 dark:bg-slate-700 px-3 py-1.5 rounded-lg cursor-pointer text-[11px] font-black uppercase hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors dark:text-slate-200"><Upload size={11}/> Upload<input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload}/></label>
                {form.logo && <button onClick={() => setForm(f=>({...f,logo:''}))} className="text-[10px] text-red-400 font-bold mt-1 ml-2 hover:text-red-600">Remove</button>}
              </div>
            </div>

            <div className="space-y-3">
              <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Business Name *</label><input className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold outline-none border border-slate-100 dark:border-slate-700 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 dark:text-white" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></div>
              <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Trading Name</label><input className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none border border-slate-100 dark:border-slate-700 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 dark:text-white dark:placeholder-slate-500" value={form.tradingName} onChange={e=>setForm(f=>({...f,tradingName:e.target.value}))}/></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Phone</label><input className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none border border-slate-100 dark:border-slate-700 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 dark:text-white dark:placeholder-slate-500" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}/></div>
                <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Email</label><input className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none border border-slate-100 dark:border-slate-700 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 dark:text-white dark:placeholder-slate-500" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/></div>
              </div>
              <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Business Address</label><input className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none border border-slate-100 dark:border-slate-700 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 dark:text-white dark:placeholder-slate-500" value={form.address} onChange={e=>setForm(f=>({...f,address:e.target.value}))}/></div>
              <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Global Terms & Conditions</label><textarea className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none text-xs h-24 resize-none dark:text-white border border-slate-100 dark:border-slate-700 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40" placeholder="e.g. Quote valid for 30 days..." value={form.termsAndConditions} onChange={e=>setForm(f=>({...f,termsAndConditions:e.target.value}))}/></div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1"><BadgeCheck size={15} className="text-emerald-500"/><span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Licences &amp; Credentials</span></div>
              <p className="text-[10px] text-slate-400 mb-3">{`Add any credentials relevant to your country — ${cc.regLabel}, licence numbers, insurance, certifications.`}</p>
              <CredentialsEditor credentials={form.credentials} onChange={updated => setForm(f => ({ ...f, credentials: updated }))} regLabel={cc.regLabel}/>
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 flex-shrink-0">
            <button onClick={onClose} className="flex-1 bg-slate-100 dark:bg-slate-800 py-4 rounded-2xl font-black text-slate-600 dark:text-slate-300">Cancel</button>
            <button onClick={() => { onSave(form); onClose(); showToast('Profile Saved', 'success'); }} className="flex-1 bg-orange-500 hover:bg-orange-400 text-white py-4 rounded-2xl font-black active:scale-95 transition-all flex items-center justify-center gap-2"><Check size={16}/> Save</button>
          </div>
        </div>
      </div>
    );
  };

  const TemplateManager = ({ templates, onSave, onClose }) => {
    const [list, setList] = useState([...templates]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name:'', title:'', time:'', rate:'', materialsCost:'', materials:'', tools:'', desc:'' });
    const addNew = () => { setEditing(-1); setForm({ name:'', title:'', time:'', rate:'', materialsCost:'', materials:'', tools:'', desc:'' }); };
    const editTemplate = (index) => { setEditing(index); setForm({...list[index].data, name: list[index].name}); };
    const deleteTemplate = (index) => { const nl = list.filter((_,i)=>i!==index); setList(nl); onSave(nl); };
    const saveForm = () => {
      if (!form.name.trim() || !form.title.trim()) return;
      const tpl = { name: form.name.trim(), type: 'quote', data: { title: form.title, time: form.time, rate: form.rate, materialsCost: form.materialsCost, materials: form.materials, tools: form.tools, desc: form.desc } };
      let updated = editing >= 0 ? list.map((t,i)=>i===editing?tpl:t) : [...list, tpl];
      setList(updated); onSave(updated); setEditing(null);
    };
    return (
      <div className="fixed inset-0 z-[200] bg-slate-900/95 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4">
        <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl w-full max-w-md p-5 sm:p-6 shadow-2xl border dark:border-slate-800 max-h-[85vh] flex flex-col animate-slide-up sm:animate-none pb-safe">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
            <h3 className="font-black text-lg text-slate-900 dark:text-white">Task Templates</h3>
            <button onClick={onClose} aria-label="Close" className="w-9 h-9 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"><X size={18}/></button>
          </div>
          <div className="overflow-y-auto flex-1 custom-scrollbar mb-2">
            {editing === null ? (
              <>
                {list.length === 0 && <p className="text-center text-sm text-slate-400 font-bold py-6">No templates saved yet.</p>}
                {list.map((t, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-3 rounded-2xl mb-2">
                    <div className="min-w-0 pr-3"><span className="font-black text-sm text-slate-900 dark:text-white block truncate">{t.name}</span><p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{t.data.title}</p></div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button onClick={() => editTemplate(i)} className="bg-blue-50 dark:bg-blue-900/30 text-blue-500 hover:text-blue-600 p-2 rounded-xl"><Pencil size={14}/></button>
                      <button onClick={() => deleteTemplate(i)} className="bg-red-50 dark:bg-red-900/30 text-red-400 hover:text-red-500 p-2 rounded-xl"><Trash2 size={14}/></button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="space-y-3 pb-2 pr-1">
                <input className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl font-bold text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 dark:text-white" placeholder="Template Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                <input className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 dark:text-white" placeholder="Task Title *" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
                <div className="grid grid-cols-2 gap-3">
                  <input className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 dark:text-white" placeholder="Time (e.g. 2h)" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/>
                  <input className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 dark:text-white" placeholder="Rate/hr $" value={form.rate} onChange={e=>setForm({...form,rate:e.target.value})}/>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 dark:text-white" placeholder="Materials $" value={form.materialsCost} onChange={e=>setForm({...form,materialsCost:e.target.value})}/>
                  <textarea rows={3} className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 dark:text-white resize-y" placeholder={"Materials — one per line\n2x M10 bolts\n6m copper pipe, 1/2\""} value={form.materials} onChange={e=>setForm({...form,materials:e.target.value})}/>
                </div>
                <textarea rows={3} className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 dark:text-white resize-y" placeholder={"Tools — one per line\nDrill\nLevel"} value={form.tools} onChange={e=>setForm({...form,tools:e.target.value})}/>
                <textarea className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl h-24 resize-none text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 dark:text-white" placeholder="Description" value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})}/>
              </div>
            )}
          </div>
          {editing === null ? (
            <div className="flex gap-3 flex-shrink-0 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button onClick={onClose} className="flex-1 bg-slate-100 dark:bg-slate-800 py-4 rounded-2xl font-black text-sm text-slate-600 dark:text-slate-300">Close</button>
              <button onClick={addNew} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"><PlusCircle size={16}/> New Template</button>
            </div>
          ) : (
            <div className="flex gap-3 flex-shrink-0 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button onClick={() => setEditing(null)} className="flex-1 bg-slate-100 dark:bg-slate-800 py-4 rounded-2xl font-black text-sm text-slate-600 dark:text-slate-300">Cancel</button>
              <button onClick={saveForm} className="flex-1 bg-orange-500 hover:bg-orange-400 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2"><Check size={16}/> Save</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const MaterialManager = ({ materials, onSave, onClose }) => {
    const [list, setList] = useState([...materials]);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ name: '', price: '' });
    const saveForm = () => {
      if (!form.name.trim() || !form.price.trim()) return;
      const updated = [...list, { name: form.name.trim(), price: form.price.trim() }];
      setList(updated); onSave(updated); setEditing(false);
    };
    const deleteMaterial = (index) => { const updated = list.filter((_, i) => i !== index); setList(updated); onSave(updated); };
    return (
      <div className="fixed inset-0 z-[200] bg-slate-900/95 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4">
        <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl w-full max-w-md p-5 sm:p-6 shadow-2xl border dark:border-slate-800 max-h-[85vh] flex flex-col animate-slide-up sm:animate-none pb-safe">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
            <h3 className="font-black text-lg text-slate-900 dark:text-white">Saved Materials</h3>
            <button onClick={onClose} aria-label="Close" className="w-9 h-9 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"><X size={18}/></button>
          </div>
          <div className="overflow-y-auto flex-1 custom-scrollbar mb-2">
            {!editing ? (
              <>
                {list.length === 0 && <p className="text-center text-sm text-slate-400 font-bold py-6">No materials saved yet.</p>}
                {list.map((m, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-3 rounded-2xl mb-2">
                    <span className="font-black text-sm text-slate-900 dark:text-white truncate pr-2">{m.name}</span>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="font-black text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg">{fmtAUD(parseFloat(m.price))}</span>
                      <button onClick={() => deleteMaterial(i)} className="bg-red-50 dark:bg-red-900/30 text-red-400 hover:text-red-500 p-2 rounded-xl"><Trash2 size={14}/></button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="space-y-3 pb-2 pr-1">
                <input className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl font-bold text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 dark:text-white" placeholder="Material Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                <input className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 dark:text-white" placeholder="Price $ *" type="number" step="0.01" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/>
              </div>
            )}
          </div>
          {!editing ? (
            <div className="flex gap-3 flex-shrink-0 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button onClick={onClose} className="flex-1 bg-slate-100 dark:bg-slate-800 py-4 rounded-2xl font-black text-sm text-slate-600 dark:text-slate-300">Close</button>
              <button onClick={() => { setForm({name:'', price:''}); setEditing(true); }} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"><PlusCircle size={16}/> New Material</button>
            </div>
          ) : (
            <div className="flex gap-3 flex-shrink-0 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button onClick={() => setEditing(false)} className="flex-1 bg-slate-100 dark:bg-slate-800 py-4 rounded-2xl font-black text-sm text-slate-600 dark:text-slate-300">Cancel</button>
              <button onClick={saveForm} className="flex-1 bg-orange-500 hover:bg-orange-400 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2"><Check size={16}/> Save</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const SettingsModal = ({ geminiModel, userApiKey, extraTaxRate, countryCode, onSave, onClose, isDarkMode, toggleTheme, exportData, importData, userTemplates, saveUserTemplates, userMaterials, saveUserMaterials, businessProfile, saveBusinessProfile, showToast, dbSize, isPro, onUnlockPro }) => {
    const cc = getCC();
    const [draftModel, setDraftModel] = useState(geminiModel);
    const [draftApiKey, setDraftApiKey] = useState(userApiKey);
    const [draftExtraTax, setDraftExtraTax] = useState(extraTaxRate);
    const [draftCountry, setDraftCountry] = useState(countryCode || 'AU');
    const [showTemplates, setShowTemplates] = useState(false);
    const [showMaterials, setShowMaterials] = useState(false);
    const [showBusiness, setShowBusiness] = useState(false);
    const [showAdvancedAI, setShowAdvancedAI] = useState(false);
    const [licenceInput, setLicenceInput] = useState('');
    const [activeTab, setActiveTab] = useState('business');
    const save = () => { onSave(draftModel, draftApiKey, draftExtraTax, draftCountry); onClose(); showToast('Settings Saved', 'success'); };
    const hasBiz = !!businessProfile?.name;

    const handleLicenceUnlock = () => {
      showToast('Subscription is now managed via account settings', 'info');
    };

    const expiringCount = (businessProfile?.credentials || []).filter(c => isExpiringSoon(c.expiry) || isExpired(c.expiry)).length;

    const tabs = [
      { key: 'business', label: 'Business', badge: expiringCount > 0 ? expiringCount : (!hasBiz ? '!' : null) },
      { key: 'library',  label: 'Library' },
      { key: 'app',      label: 'App',     badge: null },
    ];

    const sectionLabel = "text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2";

    return (
      <div className="fixed inset-0 z-[160] bg-slate-900/90 backdrop-blur-md flex items-start sm:items-center justify-center sm:p-4">
        <div className="bg-white dark:bg-slate-900 rounded-b-3xl sm:rounded-3xl w-full max-w-md shadow-2xl border dark:border-slate-800 max-h-[92vh] flex flex-col animate-slide-down sm:animate-none pt-safe">

          {/* Header */}
          <div className="flex justify-between items-center px-5 pt-5 pb-3 flex-shrink-0">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Settings</h2>
            <button onClick={onClose} aria-label="Close" className="w-9 h-9 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"><X size={18}/></button>
          </div>

          {/* Tab Bar */}
          <div className="flex bg-slate-100 dark:bg-slate-800/60 rounded-xl p-1 mx-5 mb-1 flex-shrink-0">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)} className={`relative flex-1 h-9 rounded-lg text-sm font-semibold transition-all ${activeTab===t.key ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>
                {t.label}
                {t.badge && <span className="absolute top-0.5 right-1 min-w-[16px] h-4 px-1 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">{t.badge}</span>}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-4">

            {activeTab === 'business' && (
              <div className="space-y-5">
                {/* Business Profile */}
                <div>
                  <label className={sectionLabel}>Profile</label>
                  <button onClick={() => setShowBusiness(true)} className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-orange-400 dark:hover:border-orange-500 transition-all">
                    <div className="flex items-center gap-3 min-w-0">
                      {businessProfile?.logo
                        ? <img src={businessProfile.logo} className="h-9 w-9 object-contain rounded-lg bg-white dark:bg-slate-700 p-0.5 flex-shrink-0" alt="logo"/>
                        : <div className="w-9 h-9 bg-orange-100 dark:bg-orange-950/40 rounded-lg flex items-center justify-center flex-shrink-0"><Building2 size={16} className="text-orange-500"/></div>
                      }
                      <div className="text-left min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{hasBiz ? businessProfile.name : 'Set up business profile'}</p>
                          {expiringCount > 0 && <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">{expiringCount}</span>}
                        </div>
                        {hasBiz
                          ? <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{(businessProfile.credentials?.length || 0)} credential{(businessProfile.credentials?.length || 0) !== 1 ? 's' : ''} saved</p>
                          : <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Logo, {cc.regLabel}, credentials, T&Cs</p>
                        }
                      </div>
                    </div>
                    <Pencil size={14} className="text-slate-400 flex-shrink-0 ml-2"/>
                  </button>
                </div>

                {/* Region / Currency */}
                <div>
                  <label className={sectionLabel}>Region &amp; Currency</label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(COUNTRY_CONFIGS).map(([code, cfg]) => (
                      <button key={code} onClick={() => setDraftCountry(code)}
                        className={`flex flex-col items-center gap-0.5 py-2.5 rounded-xl border font-semibold text-xs transition-all ${draftCountry === code ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400' : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'}`}>
                        <span className="text-xl leading-none">{cfg.flag}</span>
                        <span>{cfg.name.split(' ')[0]}</span>
                        <span className="font-medium text-[10px] text-slate-500 dark:text-slate-500">{cfg.currency}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Extra Tax */}
                <div>
                  <label className={sectionLabel}>{COUNTRY_CONFIGS[draftCountry]?.markupLabel || 'Additional Markup'}</label>
                  <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/60 px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <input type="range" min="0" max="50" step="0.5" value={draftExtraTax} onChange={e => setDraftExtraTax(e.target.value)} className="flex-1 accent-orange-500"/>
                    <span className="font-bold text-slate-900 dark:text-white w-12 text-right text-sm">{draftExtraTax}%</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'library' && (
              <div className="space-y-5">
                <div>
                  <label className={sectionLabel}>Your Library</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => { setShowTemplates(true); setShowMaterials(false); }} className="flex flex-col items-start gap-1 p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                      <div className="flex items-center gap-2 text-slate-500"><Bookmark size={14}/><span className="text-[11px] font-semibold uppercase tracking-wider">Templates</span></div>
                      <span className="font-extrabold text-slate-900 dark:text-white text-lg">{userTemplates.length}</span>
                    </button>
                    <button onClick={() => { setShowMaterials(true); setShowTemplates(false); }} className="flex flex-col items-start gap-1 p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                      <div className="flex items-center gap-2 text-slate-500"><Package size={14}/><span className="text-[11px] font-semibold uppercase tracking-wider">Materials</span></div>
                      <span className="font-extrabold text-slate-900 dark:text-white text-lg">{userMaterials.length}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className={`${sectionLabel} mb-0`}>Backup &amp; Restore</label>
                    <div className={`flex items-center gap-1 px-2 h-6 rounded-md text-[10px] font-semibold ${parseFloat(dbSize)>4 ? 'text-red-500 bg-red-50 dark:bg-red-950/30' : 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'}`}><HardDrive size={10}/> {dbSize}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={exportData} className="flex items-center justify-center gap-2 h-11 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><Download size={15}/> Export</button>
                    <label className="flex items-center justify-center gap-2 h-11 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"><Upload size={15}/> Import<input type="file" accept=".json" className="hidden" onChange={importData}/></label>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Export creates a JSON backup of all jobs, templates, materials, and settings. Import replaces existing data.</p>
                </div>
              </div>
            )}

            {activeTab === 'app' && (
              <div className="space-y-5">
                {/* Appearance */}
                <div>
                  <label className={sectionLabel}>Appearance</label>
                  <button onClick={toggleTheme} className="w-full flex items-center justify-between px-4 h-14 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 transition-all">
                    <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {isDarkMode ? <Moon size={17} className="text-slate-400"/> : <Sun size={17} className="text-amber-500"/>}
                      {isDarkMode ? 'Dark' : 'Light'}
                    </div>
                    <div className={`w-10 h-6 rounded-full transition-all flex items-center px-0.5 ${isDarkMode ? 'bg-orange-500 justify-end' : 'bg-slate-300 justify-start'}`}>
                      <div className="w-5 h-5 rounded-full bg-white shadow"/>
                    </div>
                  </button>
                </div>

                {/* Advanced AI */}
                <div>
                  <button onClick={() => setShowAdvancedAI(p => !p)} className="w-full flex items-center justify-between py-1">
                    <span className={sectionLabel} style={{marginBottom:0}}>Advanced AI</span>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform flex-shrink-0 ${showAdvancedAI ? 'rotate-180' : ''}`}/>
                  </button>
                  {showAdvancedAI && (
                    <div className="mt-3 space-y-3">
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        JIM uses a built-in AI key with automatic model fallback. Optionally add your own free Gemini key from <span className="font-semibold">aistudio.google.com</span> to use your personal quota instead.
                      </p>
                      <div className="relative">
                        <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
                        <input type="password" className="w-full pl-10 pr-3.5 h-11 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl outline-none font-mono text-sm dark:text-white dark:placeholder-slate-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 transition-all" placeholder="Your Gemini API key (optional)" value={draftApiKey} onChange={e => setDraftApiKey(e.target.value)}/>
                      </div>
                      {draftApiKey && (
                        <div className="relative">
                          <Bot size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
                          <input type="text" className="w-full pl-10 pr-3.5 h-11 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl outline-none font-mono text-sm text-slate-700 dark:text-slate-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 transition-all" placeholder="Model hint e.g. gemini-2.5-pro (optional)" value={draftModel} onChange={e => setDraftModel(e.target.value)}/>
                        </div>
                      )}
                      {draftApiKey && <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Using your personal Gemini key</p>}
                    </div>
                  )}
                </div>

                {/* Pro Licence */}
                <div>
                  <label className={sectionLabel}>Pro Licence</label>
                  {isPro ? (
                    <div className="flex items-center gap-2 px-4 h-14 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl text-emerald-700 dark:text-emerald-400 font-semibold text-sm"><CheckCircle2 size={16}/> Full version active</div>
                  ) : (
                    <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3">
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Purchase a 1-year licence or enter your existing key.</p>
                      <div />
                      <div className="flex items-center gap-2"><div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"/><span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">or</span><div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"/></div>
                      <input type="text" className="w-full h-11 px-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-sm dark:text-white uppercase outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 transition-all" placeholder="Licence key" value={licenceInput} onChange={e => setLicenceInput(e.target.value)}/>
                      <button onClick={handleLicenceUnlock} className="w-full bg-orange-500 hover:bg-orange-400 text-white h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"><Lock size={15}/> Unlock</button>
                    </div>
                  )}
                </div>

                {/* Legal & Data */}
                <div className="pt-2">
                  <label className={sectionLabel}>Legal &amp; Privacy</label>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <a href="/privacy.html" target="_blank" className="flex-1 flex items-center justify-center gap-2 h-11 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Privacy</a>
                      <a href="/terms.html" target="_blank" className="flex-1 flex items-center justify-center gap-2 h-11 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Terms</a>
                      <a href="mailto:support@jim-pro.app" className="flex-1 flex items-center justify-center gap-2 h-11 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Support</a>
                    </div>
                    <button onClick={() => { if(confirm("WARNING: This will permanently delete ALL jobs, templates, and settings. This cannot be undone. Are you sure?")) { localStorage.clear(); window.location.reload(); } }} className="w-full flex items-center justify-center gap-2 h-11 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/40 transition-colors">
                      <Trash2 size={14}/> Delete All Data (Nuke)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Save */}
          <div className="px-5 pt-3 pb-5 border-t border-slate-100 dark:border-slate-800 flex-shrink-0">
            <button onClick={save} className="w-full bg-orange-500 hover:bg-orange-400 text-white h-12 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"><Check size={16}/> Save Settings</button>
          </div>

          {showBusiness && <BusinessProfileEditor profile={businessProfile || {}} onSave={saveBusinessProfile} onClose={() => setShowBusiness(false)} showToast={showToast}/>}
          {showTemplates && <TemplateManager templates={userTemplates} onSave={saveUserTemplates} onClose={() => setShowTemplates(false)}/>}
          {showMaterials && <MaterialManager materials={userMaterials} onSave={saveUserMaterials} onClose={() => setShowMaterials(false)}/>}
        </div>
      </div>
    );
  };

  const SignaturePad = ({ onSave, initialData }) => {
    const canvasRef = useRef(null);
    const isDrawing = useRef(false);
    useEffect(() => {
      if (initialData && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        const img = new Image(); img.src = initialData;
        img.onload = () => ctx.drawImage(img, 0, 0);
      }
    }, [initialData]);
    const getPos = (e) => {
      if(!canvasRef.current) return {x:0,y:0};
      const rect = canvasRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const scaleX = canvasRef.current.width / rect.width;
      const scaleY = canvasRef.current.height / rect.height;
      return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
    };
    const start = (e) => { e.preventDefault(); isDrawing.current = true; const pos = getPos(e); const ctx = canvasRef.current.getContext('2d'); ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.strokeStyle = '#0f172a'; ctx.beginPath(); ctx.moveTo(pos.x, pos.y); };
    const draw = (e) => { if (!isDrawing.current) return; e.preventDefault(); const pos = getPos(e); const ctx = canvasRef.current.getContext('2d'); ctx.lineTo(pos.x, pos.y); ctx.stroke(); };
    const end = () => { if (!isDrawing.current) return; isDrawing.current = false; onSave(canvasRef.current.toDataURL('image/webp', 0.5)); };
    const clear = () => { if(!canvasRef.current) return; const cvs = canvasRef.current; cvs.getContext('2d').clearRect(0, 0, cvs.width, cvs.height); onSave(null); };
    return (
      <div className="relative border-2 border-slate-300 border-dashed rounded-xl overflow-hidden bg-slate-50 no-print-border inline-block max-w-full touch-none">
        <canvas ref={canvasRef} width={600} height={200} className="w-full max-w-[600px] h-auto cursor-crosshair" onMouseDown={start} onMouseMove={draw} onMouseUp={end} onMouseOut={end} onTouchStart={start} onTouchMove={draw} onTouchEnd={end}/>
        <button onClick={clear} className="absolute top-2 right-2 bg-slate-200 hover:bg-slate-300 text-slate-600 text-[10px] font-black uppercase px-2 py-1 rounded shadow no-print transition-colors">Clear</button>
      </div>
    );
  };

  const NewJobModal = ({ type, onSave, onClose, user, geminiModel, userApiKey, showToast, toggleVoice, listeningField, jobs }) => {
    const [addr, setAddr] = useState('');
    const [client, setClient] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [showClientSuggestions, setShowClientSuggestions] = useState(false);

    const existingClients = useMemo(() => {
      const map = {};
      (jobs||[]).forEach(j => { if (j.clientName) { const k = j.clientName.toLowerCase(); if (!map[k]) map[k] = { name: j.clientName, phone: j.clientPhone||'', email: j.clientEmail||'' }; } });
      return Object.values(map);
    }, [jobs]);

    const clientSuggestions = client.trim().length >= 1 ? existingClients.filter(c => c.name.toLowerCase().includes(client.toLowerCase())) : [];
    const [additionalText, setAdditionalText] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [files, setFiles] = useState([]);
    const [isImporting, setIsImporting] = useState(false);
    const fileInputRef = useRef(null);
    const jimAiStateOptions = ['idle', 'wave', 'thinking', 'empty'];
    const [jimAiPos, setJimAiPos] = useState({ x: 40, y: 35 });
    const [jimAiMood, setJimAiMood] = useState('thinking');
    useEffect(() => {
      if (!isImporting) return;
      const move = () => {
        setJimAiPos({ x: 5 + Math.random() * 68, y: 8 + Math.random() * 60 });
        setJimAiMood(jimAiStateOptions[Math.floor(Math.random() * jimAiStateOptions.length)]);
      };
      move();
      const id = setInterval(move, 1100);
      return () => clearInterval(id);
    }, [isImporting]);

    const handleFiles = (e) => { setFiles(prev => [...prev, ...Array.from(e.target.files)]); e.target.value = ''; };
    const removeFile = (index) => setFiles(prev => prev.filter((_,i) => i!==index));
    const createManual = () => { if (!addr.trim()) return showToast('Address is required', 'error'); onSave(addr.trim(), client.trim(), phone.trim(), [], dueDate, email.trim()); };

    const createWithAI = async () => {
      setIsImporting(true);
      try {
        const fileParts = [];
        for (const file of files) {
          if (file.type === 'application/pdf') {
            let useFallback = false;
            try {
              const uploadData = await aiUploadFileProxy(file, user, userApiKey);
              if (!uploadData.file || !uploadData.file.uri) {
                useFallback = true;
              } else {
                fileParts.push({ fileData: { mimeType: file.type, fileUri: uploadData.file.uri } });
              }
            } catch (err) {
              console.warn("Upload proxy error:", err);
              useFallback = true;
            }

            if (useFallback) {
              const base64Data = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result.split(',')[1]);
                reader.onerror = reject;
                reader.readAsDataURL(file);
              });
              fileParts.push({ inlineData: { mimeType: file.type, data: base64Data } });
            }
          } else if (file.type.startsWith('image/')) {
            const base64Data = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result.split(',')[1]); reader.onerror = reject; reader.readAsDataURL(file); });
            fileParts.push({ inlineData: { mimeType: file.type || 'image/jpeg', data: base64Data } });
          }
        }

        const cc = getCC();
        const today = new Date().toISOString().slice(0,10);
        const textPrompt = `You are a data extraction AI for a ${cc.name} tradie.\nToday: ${today}. Currency: ${cc.currency} (${cc.symbol}). Tax: ${cc.taxLabel}.\n\nExtract job details from the attached files (if any) AND the source text below.\n\nSource Text:\n"""\n${additionalText || 'No additional text provided.'}\n"""\n\nRules:\n- If a field isn't explicit in the source, return empty string. Never invent or guess client details, prices, or dates.\n- Resolve relative dates ("next Tuesday", "tomorrow") against today's date above.\n- materials and tools must be newline-separated lists, one item per line. Do not use commas to separate items.\n\nReturn ONLY a valid JSON object with keys: "address", "clientName", "clientPhone", "clientEmail", "dueDate" (ISO YYYY-MM-DD or empty), "tasks" (array of objects with keys: title, time, rate (numeric ${cc.currency}/hr), materialsCost (numeric ${cc.currency}), materials (string, items separated by \\n), tools (string, items separated by \\n), desc).`;

        const resData = await smartFetchAI(
          'heavy',
          [{ parts: [{ text: textPrompt }, ...fileParts] }],
          { temperature: 0, response_mime_type: 'application/json' },
          user,
          geminiModel,
          userApiKey
        );

        const raw = resData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const json = JSON.parse(raw.replace(/```json\n?|```/g, '').trim());
        const toListString = (v) => Array.isArray(v) ? v.filter(Boolean).join('\n') : String(v||'');
        const tasks = (json.tasks || []).map(t => ({ title: t.title||'', time: t.time||'', rate: String(t.rate||''), materialsCost: String(t.materialsCost||''), materials: toListString(t.materials), tools: toListString(t.tools), desc: t.desc||'', images:[] }));
        onSave(json.address || addr, json.clientName || client, json.clientPhone || phone, tasks, json.dueDate || dueDate, json.clientEmail || email);
        showToast('JIM sorted it — check the details!', 'success');
      } catch (err) {
        console.error("AI Import Error:", err); showToast(`JIM hit a wall: ${err.message}`, 'error');
      } finally { setIsImporting(false); }
    };

    const isHandover = type === 'handover';
    const canUseAI = files.length > 0 || additionalText.trim().length > 0;

    return (
      <div className="fixed inset-0 z-[150] bg-slate-900/90 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-4">
        <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl w-full max-w-md shadow-2xl border dark:border-slate-800 relative overflow-hidden animate-slide-up sm:animate-none pb-safe">
          {isImporting && (
            <div className="absolute inset-0 bg-slate-900/85 rounded-t-3xl sm:rounded-3xl z-10 backdrop-blur-sm overflow-hidden">
              <div style={{ position: 'absolute', left: `${jimAiPos.x}%`, top: `${jimAiPos.y}%`, transition: 'left 0.9s cubic-bezier(0.34,1.56,0.64,1), top 0.9s cubic-bezier(0.34,1.56,0.64,1)' }}>
                <JimMascot size={72} state={jimAiMood}/>
              </div>
              <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1.5 pointer-events-none">
                <p className="text-white font-black text-sm uppercase tracking-widest">JIM is on it…</p>
                <p className="text-slate-400 text-xs font-semibold">Hang tight</p>
              </div>
            </div>
          )}

          <div className="flex justify-between items-start px-5 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className={`inline-block text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest mb-1.5 ${isHandover ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300' : 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300'}`}>{isHandover ? 'Completion Report' : 'Job Sheet'}</span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">New Project</h2>
            </div>
            <button onClick={onClose} aria-label="Close" className="w-9 h-9 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors mt-1"><X size={18}/></button>
          </div>

          <div className="px-5 py-4 space-y-3 max-h-[65vh] overflow-y-auto custom-scrollbar">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Job Address *</label>
              <div className="relative">
                <input autoFocus className="w-full px-4 py-3 pr-11 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-bold dark:text-white dark:placeholder-slate-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 border border-slate-200 dark:border-slate-700 text-sm" placeholder="e.g. 42 Acacia Ave, Sydney NSW" value={addr} onChange={e => setAddr(e.target.value)} />
                <button type="button" onClick={() => toggleVoice('newJobAddr', setAddr)} className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors ${listeningField==='newJobAddr'?'bg-red-500 text-white animate-pulse':'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}><Mic size={15}/></button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Client Name</label>
                <div className="relative">
                  <input className="w-full px-4 py-3 pr-9 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-medium dark:text-white dark:placeholder-slate-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 border border-slate-200 dark:border-slate-700 text-sm" placeholder="John Smith" value={client} onChange={e => { setClient(e.target.value); setShowClientSuggestions(true); }} onFocus={() => setShowClientSuggestions(true)} />
                  <button type="button" onClick={() => toggleVoice('newJobClient', setClient)} className={`absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors ${listeningField==='newJobClient'?'bg-red-500 text-white animate-pulse':'text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}><Mic size={13}/></button>
                  {showClientSuggestions && clientSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-20 mt-1 overflow-hidden">
                      {clientSuggestions.slice(0,5).map((c,i) => (
                        <button key={i} type="button" onMouseDown={e => e.preventDefault()} onClick={() => { setClient(c.name); if (c.phone) setPhone(c.phone); if (c.email) setEmail(c.email); setShowClientSuggestions(false); }}
                          className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 border-b border-slate-100 dark:border-slate-700 last:border-0 transition-colors">
                          <p className="font-bold text-sm dark:text-white">{c.name}</p>
                          {(c.phone || c.email) && <p className="text-[10px] text-slate-400 truncate">{c.phone}{c.phone && c.email ? ' · ' : ''}{c.email}</p>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Client Phone</label>
                <input className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-medium dark:text-white dark:placeholder-slate-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 border border-slate-200 dark:border-slate-700 text-sm" placeholder="04xx xxx xxx" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Client Email</label>
              <input type="email" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-medium dark:text-white dark:placeholder-slate-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 border border-slate-200 dark:border-slate-700 text-sm" placeholder="client@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Due Date (optional)</label>
              <input type="date" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-medium dark:text-white dark:placeholder-slate-500 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 border border-slate-200 dark:border-slate-700 text-sm" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>

            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"/>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">or use AI</span>
              <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"/>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <p className="text-[11px] font-black text-slate-700 dark:text-slate-300 uppercase flex items-center gap-1.5 mb-0.5"><JimMascot size={18} state="idle"/> Ask AI</p>
              <p className="text-[10px] text-slate-400 mb-3">Attach documents (PDF/Img) or dictate what you did.</p>
              <label className="flex items-center gap-2 mb-3 bg-slate-200 dark:bg-slate-700 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-xs font-black uppercase w-fit"><Upload size={13}/> Add Documents<input ref={fileInputRef} type="file" multiple accept=".pdf,image/jpeg,image/png,image/webp" className="hidden" onChange={handleFiles}/></label>
              {files.length > 0 && (
                <div className="mb-3 space-y-1">{files.map((f, i) => (<div key={i} className="flex items-center gap-2 bg-white dark:bg-slate-600 px-3 py-2 rounded-lg shadow-sm"><span className="text-[11px] font-medium truncate flex-1 dark:text-white">{f.name}</span><button onClick={() => removeFile(i)} className="text-red-400 flex-shrink-0"><X size={13}/></button></div>))}</div>
              )}

              <div className="border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 overflow-hidden shadow-sm focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-400/40 transition-shadow">
                <textarea
                  className="w-full px-4 py-3 bg-transparent outline-none text-xs font-medium resize-none h-20 dark:text-white dark:placeholder-slate-400"
                  placeholder="Paste text or dictate..."
                  value={additionalText}
                  onChange={e => setAdditionalText(e.target.value)}
                />
                <div className="flex items-center justify-end bg-slate-50 dark:bg-slate-800 px-2 py-1.5 border-t border-slate-100 dark:border-slate-600">
                  <button type="button" onClick={() => toggleVoice('newJobAI', setAdditionalText)} className={`p-1.5 rounded-lg transition-colors flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${listeningField==='newJobAI'?'bg-red-500 text-white animate-pulse':'text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                    <Mic size={14}/> Dictate
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 px-5 py-4 border-t border-slate-100 dark:border-slate-800">
            <button onClick={createManual} disabled={!addr.trim()} className={`flex-1 py-3.5 rounded-xl font-black text-sm shadow-sm transition-all active:scale-95 bg-slate-900 dark:bg-slate-700 text-white ${!addr.trim() ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-800'}`}>Create</button>
            {canUseAI && (
              <button onClick={createWithAI} disabled={isImporting} className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-3.5 rounded-xl font-black text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"><Sparkles size={15}/> Ask AI</button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const PrintPreview = ({ job, extraTaxRate, businessProfile = {}, onClose, onUpdateJob, showToast }) => {
    const [tasks, setTasks] = useState(job.tasks.map(t => ({...t})));
    const [header, setHeader] = useState({
      address: job.address, clientName: job.clientName, clientRef: job.clientRef || '',
      date: job.date ? new Date(job.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
      dueDate: job.dueDate || '', projectNotes: job.projectNotes || '', projectPhotos: job.projectPhotos || [],
    });
    const [signatureEnabled, setSignatureEnabled] = useState(job.showSignature || false);
    const [signatureData, setSignatureData] = useState(job.signature || null);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    
    // New Stage and Style state
    const [docStage, setDocStage] = useState(isCompletionDoc(job) ? 'invoice' : 'quote');
    const [docStyle, setDocStyle] = useState('contractor');

    useEffect(() => { onUpdateJob({ ...job, tasks, date: new Date(header.date).toISOString(), showSignature: signatureEnabled, signature: signatureData }); }, [header.date, header.dueDate, signatureEnabled, signatureData, tasks]);

    const updateTask = (index, field, value) => { const updated = [...tasks]; updated[index] = { ...updated[index], [field]: value }; setTasks(updated); };
    const totals = getQuoteTotals(tasks, job.gstEnabled, extraTaxRate);
    const showCosts = job.showCosts;
    const totalHours = tasks.reduce((a,t) => a + parseTimeToMinutes(t.time), 0);
    const biz = businessProfile;
    
    const cc = getCC();
    const docLabel = docStage === 'invoice' ? cc.invoiceLabel : 'Quotation';
    const matLabel = docStage === 'invoice' ? 'Materials Used' : 'Materials Needed';
    const toolLabel = docStage === 'invoice' ? 'Tools Used' : 'Tools Needed';
    
    const printLicences = (biz.licences || []);
    const hasInsurance = biz.insurance && biz.insurancePolicy;

    // Style Mapping
    const STYLES = {
      contractor: {
        container: "bg-white text-black p-6 sm:p-10 shadow-2xl rounded-sm",
        headerLine: "border-b-2 border-slate-300 pb-4 mb-4",
        accentText: "text-slate-900 font-black",
        labelColor: "text-slate-500",
        cardHeader: () => docStage === 'invoice' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-50 text-slate-800 border-slate-200',
        cardBody: "p-6",
        totalBox: "mt-6 border-2 border-slate-900 rounded-2xl p-6 flex justify-between items-end",
        fontFamily: "font-sans",
        tableHeader: "bg-slate-50 text-slate-800 border-slate-200"
      },
      boutique: {
        container: "bg-white text-slate-800 p-8 sm:p-12 shadow-xl rounded-xl",
        headerLine: "border-b border-slate-100 pb-8 mb-8",
        accentText: "text-slate-700 font-light",
        labelColor: "text-slate-400 uppercase tracking-widest text-[9px]",
        cardHeader: () => "bg-transparent border-b border-slate-100 text-slate-600 px-0 py-4",
        cardBody: "py-6 px-0",
        totalBox: "mt-12 bg-slate-50 rounded-3xl p-10 flex justify-between items-end",
        fontFamily: "font-serif",
        tableHeader: "border-b border-slate-200"
      },
      corporate: {
        container: "bg-white text-slate-900 p-6 sm:p-10 border border-slate-200 rounded-none shadow-md",
        headerLine: "bg-slate-900 text-white p-6 -mx-6 sm:-mx-10 mb-8",
        accentText: "text-white font-bold",
        labelColor: "text-slate-400 uppercase font-bold",
        cardHeader: () => "bg-slate-100 text-slate-900 border-b border-slate-300 px-5 py-3",
        cardBody: "p-6",
        totalBox: "mt-10 bg-slate-900 text-white p-8 flex justify-between items-end",
        fontFamily: "font-sans",
        tableHeader: "bg-slate-200 text-slate-900"
      },
      industrial: {
        container: "bg-white text-black p-4 sm:p-6 border-4 border-black rounded-none shadow-none",
        headerLine: "border-b-4 border-black pb-4 mb-4",
        accentText: "text-black font-black uppercase",
        labelColor: "text-black font-black uppercase",
        cardHeader: () => "border-4 border-black bg-black text-white px-4 py-2",
        cardBody: "p-4 border-x-4 border-b-4 border-black",
        totalBox: "mt-8 border-4 border-black p-6 flex justify-between items-end",
        fontFamily: "font-mono",
        tableHeader: "border-4 border-black"
      }
    };
    
    const s = STYLES[docStyle];

    const handleSharePDF = async () => {
      const element = document.getElementById('pdf-content');
      setIsGeneratingPDF(true);
      try {
        const opt = {
          margin: 10,
          filename: `${job.clientName || 'Job'}-${formatLocal(header.date, 'short')}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          pagebreak: { mode: ['css', 'legacy'] },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        const totalLabel = totals.total > 0 ? `${fmtAUD(totals.total)}${job.gstEnabled ? ` (inc. ${getCC().taxLabel})` : ''}` : '';
        const shareText = `${docLabel} for ${header.address}${totalLabel ? ` — ${totalLabel}` : ''}\n\nFrom ${biz.name || 'JIM'}`;
        const pdfBlob = await window.html2pdf().set(opt).from(element).output('blob');
        const file = new File([pdfBlob], `${job.clientName || 'Job_Report'}.pdf`, { type: 'application/pdf' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: `${docLabel} - ${biz.name || 'JIM'}`, text: shareText });
        } else {
          window.html2pdf().set(opt).from(element).save();
          showToast('Downloaded PDF', 'success');
        }
      } catch (err) { showToast('Error generating PDF', 'error'); console.error(err); }
      finally { setIsGeneratingPDF(false); }
    };

    const composeBody = () => {
      const totalLine = totals.total > 0 ? `Total: ${fmtAUD(totals.total)}${job.gstEnabled ? ` (inc. ${getCC().taxLabel})` : ''}` : '';
      return [
        `Hi ${header.clientName || 'there'},`,
        '',
        `Please find your ${docLabel.toLowerCase()} for ${header.address}.`,
        totalLine,
        header.projectNotes ? `\n${header.projectNotes}` : '',
        '',
        'Regards,',
        biz.name || '',
        biz.phone || '',
      ].filter(s => s !== '' || true).join('\n');
    };

    const handleEmail = () => {
      const subject = encodeURIComponent(`${docLabel} — ${header.address}${biz.name ? ` (${biz.name})` : ''}`);
      const body = encodeURIComponent(composeBody());
      const to = job.clientEmail || '';
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    };

    const handleSMS = () => {
      if (!job.clientPhone) { showToast('Add a client phone number first', 'error'); return; }
      const totalPart = totals.total > 0 ? ` is ${fmtAUD(totals.total)}` : ' is ready';
      const msg = `Hi ${header.clientName || ''}, your ${docLabel.toLowerCase()} for ${header.address}${totalPart}. From ${biz.name || 'your tradie'}`;
      window.location.href = `sms:${job.clientPhone}?body=${encodeURIComponent(msg)}`;
    };

    return createPortal(
      <div id="print-container" className="print-preview-overlay fixed inset-0 z-[500] bg-slate-100 dark:bg-slate-900 p-4 sm:p-8 overflow-y-auto pb-safe">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-between items-center mb-5 no-print gap-2">
            <div className="flex items-center gap-2">
              <button onClick={onClose} aria-label="Back" className="w-9 h-9 flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"><ChevronRight size={16} className="rotate-180"/></button>
              <h2 className="text-lg font-extrabold text-slate-800 dark:text-white">Preview</h2>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <button onClick={() => setSignatureEnabled(!signatureEnabled)} className={`h-9 px-3 rounded-lg font-semibold flex items-center gap-1.5 text-xs transition-colors border ${signatureEnabled ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/60' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}>
                <Edit3 size={13}/> Sign
              </button>
              <button onClick={() => window.print()} className="h-9 px-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold flex items-center gap-1.5 text-xs transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"><Printer size={13}/> Print</button>
              <button onClick={handleEmail} className="h-9 px-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold flex items-center gap-1.5 text-xs transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"><Mail size={13}/> Email</button>
              {job.clientPhone && (
                <button onClick={handleSMS} className="h-9 px-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold flex items-center gap-1.5 text-xs transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"><MessageSquare size={13}/> SMS</button>
              )}
              <button onClick={handleSharePDF} disabled={isGeneratingPDF} className="h-9 px-3.5 bg-orange-500 hover:bg-orange-400 text-white rounded-lg font-bold flex items-center gap-1.5 text-xs transition-colors shadow-sm disabled:opacity-60">
                {isGeneratingPDF ? <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"/> : <Send size={13}/>} Send PDF
              </button>
            </div>
          </div>

          {/* Document Controls Toolbar */}
          <div className="flex flex-wrap items-center gap-6 mb-6 p-5 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-slate-700 no-print shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Document Stage</label>
              <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-xl">
                <button onClick={() => setDocStage('quote')} className={`px-5 py-1.5 rounded-lg text-xs font-bold transition-all ${docStage === 'quote' ? 'bg-white dark:bg-slate-800 text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Quote</button>
                <button onClick={() => setDocStage('invoice')} className={`px-5 py-1.5 rounded-lg text-xs font-bold transition-all ${docStage === 'invoice' ? 'bg-white dark:bg-slate-800 text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Invoice</button>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1 min-w-[280px]">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Persona Style</label>
              <div className="flex gap-2">
                {['Contractor', 'Boutique', 'Corporate', 'Industrial'].map(styleName => {
                  const val = styleName.toLowerCase();
                  const isActive = docStyle === val;
                  return (
                    <button key={val} onClick={() => setDocStyle(val)} className={`flex-1 py-1.5 rounded-lg text-[11px] font-black transition-all border-2 ${isActive ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300 dark:hover:border-slate-600'}`}>
                      {styleName}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div id="pdf-content" className={`${s.container} ${s.fontFamily}`}>
            {biz.name && (
              <div className={s.headerLine}>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    {biz.logo && <img src={biz.logo} className={`h-16 w-auto object-contain ${docStyle==='contractor' ? 'rounded-lg' : ''}`} alt={biz.name}/>}
                    <div>
                      <h1 className={`text-2xl leading-tight ${s.accentText}`}>{biz.name}</h1>
                      {biz.tradingName && <p className="text-sm text-slate-500 font-medium">T/A {biz.tradingName}</p>}
                      {biz.abn && <p className={`text-xs mt-0.5 font-mono ${docStyle==='corporate' ? 'text-slate-300' : 'font-bold text-slate-600'}`}>{cc.regLabel} {biz.abn}</p>}
                    </div>
                  </div>
                  <div className={`text-right text-sm space-y-0.5 flex flex-col items-end ${docStyle==='corporate' ? 'text-slate-200' : 'text-slate-600'}`}>
                    {biz.phone && <p className="font-bold">{biz.phone}</p>}
                    {biz.email && <p>{biz.email}</p>}
                    {biz.address && <p className={`${docStyle==='corporate' ? 'text-slate-400' : 'text-slate-400'} text-xs mb-2`}>{biz.address}</p>}
                    {(printLicences.length > 0 || hasInsurance) && (
                      <div className={`mt-1 pt-2 border-t inline-block text-right min-w-[150px] ${docStyle==='corporate' ? 'border-slate-700' : 'border-slate-200'}`}>
                        {printLicences.map((lic, i) => <p key={i} className={`text-[10px] font-medium uppercase tracking-wide leading-tight mb-0.5 ${docStyle==='corporate' ? 'text-slate-400' : 'text-slate-500'}`}>{lic.type}: <span className={`font-mono ${docStyle==='corporate' ? 'text-white' : 'font-bold text-slate-800'}`}>{lic.number}</span></p>)}
                        {hasInsurance && <p className={`text-[10px] font-medium uppercase tracking-wide leading-tight ${docStyle==='corporate' ? 'text-slate-400' : 'text-slate-500'}`}>PLI ({biz.insurance}): <span className={`font-mono ${docStyle==='corporate' ? 'text-white' : 'font-bold text-slate-800'}`}>{biz.insurancePolicy}</span></p>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className={`${docStyle === 'corporate' ? 'mb-8' : 'border-b-2 border-slate-300 pb-3 mb-4'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-xs font-black uppercase tracking-widest ${s.labelColor}`}>{docLabel}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5"><span className="text-[10px] font-black text-slate-400 uppercase">Date:</span><input type="date" className="bg-transparent border-b border-dashed border-slate-400 text-right outline-none text-slate-800 text-xs font-bold cursor-pointer focus:border-orange-400" value={header.date} onChange={e => setHeader({...header, date: e.target.value})}/></div>
                </div>
              </div>
              <input className={`w-full text-3xl font-black bg-transparent border-b border-dashed border-slate-300 mb-2 pb-1 outline-none ${!header.clientName ? 'print:hidden' : ''}`} value={header.clientName} onChange={e => setHeader({...header, clientName: e.target.value})} placeholder="Client Name"/>
              <input className={`w-full text-lg font-bold bg-transparent border-b border-dashed border-slate-300 mb-1 pb-1 outline-none ${!header.clientRef ? 'print:hidden' : ''}`} value={header.clientRef} onChange={e => setHeader({...header, clientRef: e.target.value})} placeholder="Reference"/>
              <input className={`w-full text-slate-500 font-medium bg-transparent border-b border-dashed border-slate-300 mb-2 pb-1 outline-none ${!header.address ? 'print:hidden' : ''}`} value={header.address} onChange={e => setHeader({...header, address: e.target.value})} placeholder="Address"/>

              <div className={`flex items-center gap-2 mb-2 ${!header.dueDate ? 'print:hidden' : ''}`}>
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Due Date:</span>
                <input type="date" className="bg-transparent border-b border-dashed border-amber-400 outline-none text-amber-600 font-bold text-sm cursor-pointer focus:border-orange-500" value={header.dueDate} onChange={e => setHeader({...header, dueDate: e.target.value})}/>
              </div>

              <PrintEditableDiv value={header.projectNotes} onChange={v => setHeader({...header, projectNotes: v})} placeholder="Project notes / Document Summary" className={`w-full text-sm italic bg-transparent border-b border-dashed border-slate-300 mb-2 pb-1 ${!header.projectNotes ? 'print:hidden' : ''}`}/>
              {header.projectPhotos?.length > 0 && <div className="flex gap-2 mt-2 overflow-x-auto">{header.projectPhotos.map((p,i) => <img key={i} src={p} className="h-16 rounded-lg" alt=""/>)}</div>}
              <div className="flex gap-4 mt-2 text-sm font-medium text-slate-600">
                <span>TOTAL TIME: {fmtMins(totalHours)}</span>
                {showCosts && totals.total > 0 && <span>TOTAL: {fmtAUD(totals.total)} {job.gstEnabled ? `(inc. ${getCC().taxLabel})` : ''}</span>}
              </div>
            </div>

            <div className="space-y-4">
              {tasks.map((t, idx) => {
                const labour = (parseTimeToMinutes(t.time)/60)*(parseFloat(t.rate)||0);
                const mats   = parseFloat(t.materialsCost)||0;
                const subtotal = labour + mats;
                return (
                  <div key={idx} className={`${docStyle === 'contractor' ? 'print-card' : 'border-b border-slate-100 pb-6'}`}>
                    <div className={`${s.cardHeader()} flex justify-between items-center text-lg uppercase`}>
                      <input className="flex-1 font-black bg-transparent border-none outline-none" value={t.title} onChange={e => updateTask(idx, 'title', e.target.value)} placeholder="Task Title"/>
                      <input className="w-20 text-sm bg-transparent border-none outline-none text-right font-bold" value={t.time} onChange={e => updateTask(idx, 'time', e.target.value)} placeholder="Time"/>
                      {showCosts && subtotal > 0 && <span className="text-sm font-black ml-4">{fmtAUD(subtotal)}</span>}
                    </div>
                    <div className={s.cardBody}>
                      <PrintEditableDiv value={t.desc} onChange={v => updateTask(idx, 'desc', v)} placeholder="Task description" className={`w-full text-[14px] text-slate-700 mb-6 border-l-4 border-slate-200 pl-4 italic font-medium bg-transparent outline-none ${!t.desc ? 'print:hidden' : ''}`}/>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className={`${docStyle==='industrial' ? 'border-4 border-black p-4' : 'p-4 bg-slate-50 rounded-xl border'} ${!t.materials ? 'print:hidden' : ''}`}>
                          <label className={`text-[10px] font-black uppercase block mb-1 ${s.labelColor}`}>{matLabel}</label>
                          <PrintEditableDiv value={t.materials} onChange={v => updateTask(idx, 'materials', v)} className="text-[12px] font-bold text-slate-600 bg-transparent" placeholder={matLabel}/>
                        </div>
                        <div className={`${docStyle==='industrial' ? 'border-4 border-black p-4' : 'p-4 bg-slate-50 rounded-xl border'} ${!t.tools ? 'print:hidden' : ''}`}>
                          <label className={`text-[10px] font-black uppercase block mb-1 ${s.labelColor}`}>{toolLabel}</label>
                          <PrintEditableDiv value={t.tools} onChange={v => updateTask(idx, 'tools', v)} className="text-[12px] font-bold text-slate-600 bg-transparent" placeholder={toolLabel}/>
                        </div>

                        {showCosts && labour > 0 && (
                          <div className={`${docStyle==='industrial' ? 'border-4 border-black p-4' : 'p-4 bg-slate-50 rounded-xl border'}`}>
                            <label className={`text-[10px] font-black uppercase block mb-1 ${s.labelColor}`}>Labour Cost</label>
                            <span className="text-[12px] font-bold text-slate-600">{fmtAUD(labour)}{t.rate ? ` (${getCC().symbol}${t.rate}/hr)` : ''}</span>
                          </div>
                        )}
                        {showCosts && mats > 0 && (
                          <div className={`${docStyle==='industrial' ? 'border-4 border-black p-4' : 'p-4 bg-slate-50 rounded-xl border'}`}>
                            <label className={`text-[10px] font-black uppercase block mb-1 ${s.labelColor}`}>Materials Cost</label>
                            <span className="text-[12px] font-bold text-slate-600">{fmtAUD(mats)}</span>
                          </div>
                        )}
                      </div>
                      {t.images?.length > 0 && <div className="print-img-container">{t.images.map((img,i) => <div key={i} className={`overflow-hidden border aspect-[4/3] shadow-sm bg-slate-100 ${docStyle==='contractor' ? 'rounded-lg' : ''}`}><img src={img} className="w-full h-full object-cover"/></div>)}</div>}
                    </div>
                  </div>
                );
              })}
            </div>

            {showCosts && totals.total > 0 && (
              <div className={s.totalBox}>
                <div className={docStyle === 'corporate' ? 'space-y-1' : ''}>
                  <p className={`font-black uppercase text-sm ${docStyle==='corporate' ? 'text-slate-400' : 'text-slate-500'}`}>Labour: {fmtAUD(totals.labour)}</p>
                  <p className={`font-black uppercase text-sm ${docStyle==='corporate' ? 'text-slate-400' : 'text-slate-500'}`}>Materials: {fmtAUD(totals.mats)}</p>
                  {job.gstEnabled && (
                    <div className={`mt-2 border-t pt-2 ${docStyle==='corporate' ? 'border-slate-700' : 'border-slate-200'}`}>
                      <p className={`font-black uppercase text-sm ${docStyle==='corporate' ? 'text-slate-300' : 'text-slate-600'}`}>Subtotal: {fmtAUD(totals.subtotal)}</p>
                      <p className={`font-black uppercase text-sm ${docStyle==='corporate' ? 'text-slate-300' : 'text-slate-600'}`}>{getCC().taxLabel} ({getCC().taxRate}%): {fmtAUD(totals.gst)}</p>
                    </div>
                  )}
                  {extraTaxRate > 0 && <p className="font-black uppercase text-purple-600 text-sm">{getCC().markupLabel} ({extraTaxRate}%): {fmtAUD(totals.extra)}</p>}
                </div>
                <div className="text-right">
                  <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${docStyle==='corporate' ? 'text-orange-400' : 'text-slate-400'}`}>{docStage === 'invoice' ? 'Total Due' : job.gstEnabled ? `Total inc. Tax/${getCC().taxLabel}` : 'Quotation Total'}</p>
                  <p className={`text-4xl font-black ${docStyle==='corporate' ? 'text-white' : 'text-slate-900'}`}>{fmtAUD(totals.total)}</p>
                  {job.gstEnabled && <p className={`text-xs font-bold mt-1 ${docStyle==='corporate' ? 'text-slate-400' : 'text-slate-400'}`}>{getCC().taxLabel} included: {fmtAUD(totals.gst)}</p>}
                </div>
              </div>
            )}

            {signatureEnabled && (
              <div className="mt-8 pt-6 border-t-2 border-slate-200 break-inside-avoid">
                <p className="text-sm font-black text-slate-800 uppercase tracking-widest mb-3">Client Approval / Signature</p>
                <SignaturePad onSave={(data) => setSignatureData(data)} initialData={signatureData} />
              </div>
            )}

            {biz.termsAndConditions && (
              <div className={`mt-12 pt-4 border-t border-slate-300 text-[10px] font-medium whitespace-pre-wrap leading-tight break-inside-avoid ${docStyle==='corporate' ? 'text-slate-400' : 'text-slate-500'}`}>
                <p className={`font-bold uppercase mb-1 ${docStyle==='corporate' ? 'text-slate-300' : 'text-slate-700'}`}>Terms & Conditions</p>
                {biz.termsAndConditions}
              </div>
            )}
          </div>
        </div>
      </div>,
      document.body
    );
  };

  const AppointmentFormModal = ({ appointment, jobs, onSave, onDelete, onClose, showToast }) => {
    const editing = !!appointment.id;
    const [form, setForm] = useState({ title: appointment.title || '', jobId: appointment.jobId || '', start: appointment.start ? formatLocal(appointment.start, 'iso-datetime') : '', end: appointment.end ? formatLocal(appointment.end, 'iso-datetime') : '', notes: appointment.notes || '' });
    const save = () => {
      if (!form.title.trim() || !form.start || !form.end) return showToast('Title, start, and end are required.', 'error');
      const startDate = new Date(form.start); const endDate = new Date(form.end);
      if (endDate <= startDate) return showToast('End must be after start.', 'error');
      onSave({ id: appointment.id || (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString()), ...form, start: startDate.toISOString(), end: endDate.toISOString(), googleEventId: appointment.googleEventId || null });
    };
    return (
      <div className="fixed inset-0 z-[500] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md p-6 shadow-2xl border dark:border-slate-800 flex flex-col my-auto animate-slide-up sm:animate-none">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
            <h3 className="font-black text-lg text-slate-900 dark:text-white">{editing ? 'Edit Appointment' : 'New Appointment'}</h3>
            <button onClick={onClose} aria-label="Close" className="w-9 h-9 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"><X size={18}/></button>
          </div>
          <div className="overflow-y-auto flex-1 custom-scrollbar space-y-4 pb-2 pr-1">
            <div><label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Title *</label><input className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl font-bold dark:text-white outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 border border-slate-100 dark:border-slate-700" placeholder="e.g. Site Visit" value={form.title} onChange={e => setForm({...form, title: e.target.value})}/></div>
            <div><label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Link to Project</label><select className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl font-medium text-sm dark:text-white outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 border border-slate-100 dark:border-slate-700" value={form.jobId} onChange={e => setForm({...form, jobId: e.target.value})}><option value="">No linked job</option>{jobs.map(j => <option key={j.id} value={j.id}>{j.address} – {j.clientName}</option>)}</select></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Start *</label><input type="datetime-local" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl font-bold text-sm dark:text-white outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 border border-slate-100 dark:border-slate-700" value={form.start} onChange={e => setForm({...form, start: e.target.value})}/></div>
              <div><label className="text-[10px] font-black uppercase text-slate-400 block mb-1">End *</label><input type="datetime-local" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl font-bold text-sm dark:text-white outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 border border-slate-100 dark:border-slate-700" value={form.end} onChange={e => setForm({...form, end: e.target.value})}/></div>
            </div>
            <div><label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Notes</label><textarea className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-sm font-medium h-24 resize-none dark:text-white outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 border border-slate-100 dark:border-slate-700" placeholder="Additional details..." value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}/></div>
          </div>
          <div className="flex gap-2 pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex-shrink-0">
            {editing && (<button onClick={onDelete} className="bg-red-50 dark:bg-red-900/20 text-red-500 p-4 rounded-2xl font-black hover:bg-red-100 transition-colors flex items-center justify-center"><Trash2 size={20}/></button>)}
            <button onClick={onClose} className="flex-1 bg-slate-100 dark:bg-slate-800 py-4 rounded-2xl font-black text-slate-600 dark:text-slate-300">Cancel</button>
            <button onClick={save} className="flex-1 bg-orange-500 hover:bg-orange-400 text-white py-4 rounded-2xl font-black shadow-lg flex justify-center items-center gap-2"><Check size={18}/> Save</button>
          </div>
        </div>
      </div>
    );
  };

  const TimeEntryModal = ({ entry, jobs, onSave, onDelete, onClose, showToast }) => {
    const editing = !!entry.id;
    const [form, setForm] = useState({
      date: entry.date || formatLocal(new Date(), 'iso-date'),
      startTime: entry.startTime || '08:00',
      endTime: entry.endTime || '16:00',
      jobId: entry.jobId || '',
      category: entry.category || 'Site Work',
      notes: entry.notes || ''
    });

    const CATEGORIES = ['Site Work', 'Quoting', 'Admin', 'Travel', 'Maintenance'];

    const save = () => {
      if (!form.date || !form.startTime || !form.endTime) return showToast('Date and times are required.', 'error');
      const sm = parseInt(form.startTime.split(':')[0])*60 + parseInt(form.startTime.split(':')[1]);
      const em = parseInt(form.endTime.split(':')[0])*60 + parseInt(form.endTime.split(':')[1]);
      if (em <= sm) return showToast('End time must be after start time.', 'error');

      onSave({ id: entry.id || (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString()), ...form });
    };

    return (
      <div className="fixed inset-0 z-[500] bg-slate-900/95 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-4 animate-slide-up sm:animate-none">
        <div className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 shadow-2xl border dark:border-slate-800 flex flex-col pb-safe max-h-[90vh]">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
            <h3 className="font-black text-lg text-slate-900 dark:text-white">{editing ? 'Edit Time Entry' : 'Log Time'}</h3>
            <button onClick={onClose} aria-label="Close" className="w-9 h-9 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"><X size={18}/></button>
          </div>

          <div className="overflow-y-auto flex-1 custom-scrollbar space-y-4 pb-2">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Date</label>
              <input type="date" className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-bold text-sm dark:text-white focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 border border-slate-100 dark:border-slate-700" value={form.date} onChange={e => setForm({...form, date: e.target.value})}/>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Start Time</label><input type="time" className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-bold text-sm dark:text-white focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 border border-slate-100 dark:border-slate-700" value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})}/></div>
              <div><label className="text-[10px] font-black uppercase text-slate-400 block mb-1">End Time</label><input type="time" className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-bold text-sm dark:text-white focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 border border-slate-100 dark:border-slate-700" value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})}/></div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Category</label>
              <select className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-bold text-sm dark:text-white focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 border border-slate-100 dark:border-slate-700" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Link to Project (Optional)</label>
              <select className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-medium text-sm dark:text-white outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 border border-slate-100 dark:border-slate-700" value={form.jobId} onChange={e => setForm({...form, jobId: e.target.value})}>
                <option value="">No linked project</option>
                {jobs.map(j => <option key={j.id} value={j.id}>{j.address} – {j.clientName}</option>)}
              </select>
            </div>

            <div><label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Notes</label><textarea className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm font-medium h-20 resize-none dark:text-white outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 border border-slate-100 dark:border-slate-700" placeholder="e.g. Rough in bathroom..." value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}/></div>
          </div>

          <div className="flex gap-2 pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex-shrink-0">
            {editing && (<button onClick={onDelete} className="bg-red-50 dark:bg-red-900/20 text-red-500 p-3.5 rounded-xl font-black hover:bg-red-100 transition-colors flex items-center justify-center"><Trash2 size={18}/></button>)}
            <button onClick={onClose} className="flex-1 bg-slate-100 dark:bg-slate-800 py-3.5 rounded-xl font-black text-sm text-slate-600 dark:text-slate-300">Cancel</button>
            <button onClick={save} className="flex-1 bg-orange-500 hover:bg-orange-400 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg flex justify-center items-center gap-2"><Check size={16}/> Save</button>
          </div>
        </div>
      </div>
    );
  };

  const TimesheetPrintPreview = ({ weekLabel, weeklyLogs, weeklyTotalMins, jobs, businessProfile, startOfWeek, onClose, showToast }) => {
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const biz = businessProfile || {};
    const sortedLogs = [...weeklyLogs].sort((a,b) => new Date(a.date) - new Date(b.date));

    const handleSharePDF = async () => {
      const element = document.getElementById('timesheet-pdf-content');
      setIsGeneratingPDF(true);
      try {
        const opt = {
          margin: 10,
          filename: `Timesheet_${startOfWeek.toISOString().slice(0,10)}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        const pdfBlob = await window.html2pdf().set(opt).from(element).output('blob');
        const file = new File([pdfBlob], `Timesheet_${startOfWeek.toISOString().slice(0,10)}.pdf`, { type: 'application/pdf' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: `Timesheet - ${biz.name || 'JIM'}` });
        } else {
          window.html2pdf().set(opt).from(element).save();
          showToast('Downloaded PDF', 'success');
        }
      } catch(err) { showToast('Error generating PDF', 'error'); console.error(err); }
      finally { setIsGeneratingPDF(false); }
    };

    return createPortal(
      <div id="print-container" className="print-preview-overlay fixed inset-0 z-[500] bg-slate-100 dark:bg-slate-900 p-4 sm:p-8 overflow-y-auto pb-safe">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-between items-center mb-6 no-print gap-3">
            <h2 className="text-xl font-black text-slate-800 dark:text-white">Timesheet Preview</h2>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={() => window.print()} className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-4 py-2 rounded-xl font-black flex items-center gap-2 shadow-sm border dark:border-slate-700 text-sm"><Printer size={15}/> Print</button>
              <button onClick={handleSharePDF} disabled={isGeneratingPDF} className="bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-sm text-sm">
                {isGeneratingPDF ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> : <Share2 size={15}/>} Share PDF
              </button>
              <button onClick={onClose} className="bg-slate-800 text-white px-4 py-2 rounded-xl font-black text-sm">Close</button>
            </div>
          </div>

          <div id="timesheet-pdf-content" className="bg-white text-black p-6 sm:p-10 shadow-2xl rounded-sm">
            {biz.name && (
              <div className="pb-4 mb-4 border-b-2 border-slate-300">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    {biz.logo && <img src={biz.logo} className="h-16 w-auto object-contain rounded-lg" alt={biz.name}/>}
                    <div>
                      <h1 className="text-2xl font-black text-slate-900 leading-tight">{biz.name}</h1>
                      {biz.tradingName && <p className="text-sm text-slate-500 font-medium">T/A {biz.tradingName}</p>}
                      {biz.abn && <p className="text-xs font-bold text-slate-600 mt-0.5 font-mono">{getCC().regLabel} {biz.abn}</p>}
                    </div>
                  </div>
                  <div className="text-right text-sm text-slate-600 space-y-0.5">
                    {biz.phone && <p className="font-bold">{biz.phone}</p>}
                    {biz.email && <p>{biz.email}</p>}
                    {biz.address && <p className="text-slate-400 text-xs">{biz.address}</p>}
                  </div>
                </div>
              </div>
            )}

            <div className="border-b-2 border-cyan-600 pb-3 mb-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Timesheet</p>
                  <h2 className="text-3xl font-black text-cyan-700">{weekLabel}</h2>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Total Hours</p>
                  <p className="text-3xl font-black text-cyan-700">{fmtMins(weeklyTotalMins)}</p>
                </div>
              </div>
            </div>

            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-cyan-700 text-white">
                  <th className="px-3 py-2.5 text-left text-[10px] uppercase tracking-widest font-black">Day</th>
                  <th className="px-3 py-2.5 text-left text-[10px] uppercase tracking-widest font-black">Date</th>
                  <th className="px-3 py-2.5 text-left text-[10px] uppercase tracking-widest font-black">Time</th>
                  <th className="px-3 py-2.5 text-left text-[10px] uppercase tracking-widest font-black">Category</th>
                  <th className="px-3 py-2.5 text-left text-[10px] uppercase tracking-widest font-black">Job / Address</th>
                  <th className="px-3 py-2.5 text-left text-[10px] uppercase tracking-widest font-black">Notes</th>
                  <th className="px-3 py-2.5 text-right text-[10px] uppercase tracking-widest font-black">Hours</th>
                </tr>
              </thead>
              <tbody>
                {sortedLogs.map((l, i) => {
                  const jobInfo = jobs.find(j => j.id === l.jobId);
                  return (
                    <tr key={l.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-3 py-2.5 font-bold text-slate-800 border-b border-slate-100">{l.day}</td>
                      <td className="px-3 py-2.5 text-slate-500 text-xs border-b border-slate-100">{l.date}</td>
                      <td className="px-3 py-2.5 text-slate-500 text-xs whitespace-nowrap border-b border-slate-100">{l.timeStr}</td>
                      <td className="px-3 py-2.5 text-slate-700 border-b border-slate-100">{l.category}</td>
                      <td className="px-3 py-2.5 text-slate-500 border-b border-slate-100">{jobInfo ? jobInfo.address : '—'}</td>
                      <td className="px-3 py-2.5 text-slate-400 italic border-b border-slate-100">{l.notes}</td>
                      <td className="px-3 py-2.5 text-right font-black text-cyan-700 border-b border-slate-100">{l.hours}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-cyan-50 border-t-2 border-cyan-600">
                  <td colSpan="6" className="px-3 py-3 font-black text-cyan-700 uppercase tracking-widest text-sm">Total Hours</td>
                  <td className="px-3 py-3 text-right font-black text-2xl text-cyan-700">{fmtMins(weeklyTotalMins)}</td>
                </tr>
              </tfoot>
            </table>

            <p className="mt-8 text-[11px] text-slate-400 text-right">Generated {new Date().toLocaleDateString('en-AU', {day:'numeric',month:'long',year:'numeric'})}</p>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  const ScheduleView = ({ appointments, timesheets, jobs, onSaveAppointment, onDeleteAppointment, showConfirm, onScheduleFromJob, showToast, onNewTimeEntry, onEditTimeEntry, businessProfile }) => {
    const [viewTab, setViewTab] = useState('upcoming');
    const [weekOffset, setWeekOffset] = useState(0);
    const [apptModal, setApptModal] = useState(null);
    const [showTimesheetPrint, setShowTimesheetPrint] = useState(false);

    const today = new Date();
    const startOfWeek = getStartOfWeek(today, 1);
    startOfWeek.setDate(startOfWeek.getDate() + (weekOffset * 7));
    startOfWeek.setHours(0,0,0,0);

    const dayNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const days = Array.from({length:7}, (_,i) => { const d = new Date(startOfWeek); d.setDate(d.getDate()+i); return d; });
    const hours = Array.from({length:15}, (_,i) => i+6);

    // Setup Calendar Events (local only)
    const allEvents = appointments.map(a => ({ ...a, isLocal: true, start: new Date(a.start), end: new Date(a.end) }));
    const getEventsForSlot = (day, hour) => { const slotStart = new Date(day); slotStart.setHours(hour,0,0,0); const slotEnd = new Date(slotStart); slotEnd.setHours(hour+1,0,0,0); return allEvents.filter(ev => ev.start < slotEnd && ev.end > slotStart); };

    const handleSave = (data) => {
      onSaveAppointment(data); setApptModal(null); showToast('Appointment Saved', 'success');
    };

    const handleDeleteAppointment = (id) => {
      showConfirm('Delete this appointment?', () => {
        onDeleteAppointment(id); setApptModal(null); showToast('Appointment Deleted', 'info');
      });
    };

    // Setup Timesheet Calcs
    const endOfWeek = new Date(startOfWeek); endOfWeek.setDate(endOfWeek.getDate()+7);
    const fullDayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

    let weeklyTotalMins = 0;
    const dailyMins = [0,0,0,0,0,0,0];
    const weeklyLogs = [];

    timesheets.forEach(entry => {
      const [y,m,d] = entry.date.split('-');
      const tDate = new Date(y, m-1, d);
      tDate.setHours(0,0,0,0);

      if (tDate >= startOfWeek && tDate < endOfWeek) {
        const sm = parseInt(entry.startTime.split(':')[0])*60 + parseInt(entry.startTime.split(':')[1]);
        const em = parseInt(entry.endTime.split(':')[0])*60 + parseInt(entry.endTime.split(':')[1]);
        let mins = em >= sm ? em - sm : (em + 24*60) - sm;

        if (mins > 0) {
          weeklyTotalMins += mins;
          const dIdx = (tDate.getDay() + 6) % 7;
          dailyMins[dIdx] += mins;
          weeklyLogs.push({
            id: entry.id,
            day: fullDayNames[dIdx],
            date: entry.date,
            jobId: entry.jobId,
            category: entry.category,
            notes: entry.notes,
            timeStr: `${entry.startTime} - ${entry.endTime}`,
            hours: fmtMins(mins),
            rawMins: mins,
            originalEntry: entry
          });
        }
      }
    });

    const exportCSV = () => {
      if (weeklyLogs.length===0) return showToast('No entries to export', 'error');
      let csv = "Day,Date,Category,Job,Notes,Hours\n";
      weeklyLogs.sort((a,b)=>new Date(a.date)-new Date(b.date)).forEach(l => {
        const jobInfo = jobs.find(j => j.id === l.jobId);
        const jobName = jobInfo ? `${jobInfo.address}` : '';
        csv += `"${l.day}","${l.date}","${l.category}","${jobName}","${l.notes.replace(/"/g, '""')}","${l.hours}"\n`;
      });
      csv += `\nTotal,,,,, "${fmtMins(weeklyTotalMins)}"\n`;
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = `Timesheet_${startOfWeek.toISOString().slice(0,10)}.csv`; a.click(); URL.revokeObjectURL(url);
    };

    const openTimesheetPrint = () => {
      if (weeklyLogs.length === 0) return showToast('No entries to export', 'error');
      setShowTimesheetPrint(true);
    };

    return (
      <div className="max-w-6xl mx-auto p-4 animate-slide-up pb-24">

        {/* Toggle Bar */}
        <div className="flex bg-slate-100 dark:bg-slate-800/60 rounded-xl p-1 mb-5 max-w-sm mx-auto">
          <button onClick={() => setViewTab('upcoming')} className={`flex-1 h-9 font-semibold text-sm rounded-lg transition-all ${viewTab==='upcoming'?'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white':'text-slate-500'}`}>Appointments</button>
          <button onClick={() => setViewTab('timesheet')} className={`flex-1 h-9 font-semibold text-sm rounded-lg transition-all ${viewTab==='timesheet'?'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white':'text-slate-500'}`}>Timesheets</button>
        </div>

        <div className="flex justify-between items-center mb-4 max-w-sm mx-auto">
          <button onClick={() => setWeekOffset(o => o-1)} aria-label="Previous week" className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"><ChevronRight size={16} className="rotate-180"/></button>
          <h2 className="text-base font-bold text-center text-slate-900 dark:text-white">{days[0].toLocaleDateString('en-AU', {day:'numeric',month:'short'})} – {days[6].toLocaleDateString('en-AU', {day:'numeric',month:'short',year:'2-digit'})}</h2>
          <button onClick={() => setWeekOffset(o => o+1)} aria-label="Next week" className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"><ChevronRight size={16}/></button>
        </div>

        {viewTab === 'upcoming' ? (
          <>
            <div className="calendar-grid shadow-sm">
              <div className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 font-semibold text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-center">Time</div>
              {days.map((d,i) => {
                const isToday = d.toDateString()===today.toDateString();
                return (
                  <div key={i} className={`bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center py-2 ${isToday?'text-orange-500':'text-slate-500 dark:text-slate-400'}`}>
                    <span className="text-[10px] font-semibold uppercase tracking-wider">{dayNames[i]}</span>
                    <span className={`text-sm ${isToday?'font-extrabold':'font-semibold text-slate-700 dark:text-slate-300'}`}>{d.getDate()}</span>
                  </div>
                );
              })}
              {hours.map(hour => (
                <React.Fragment key={hour}>
                  <div className="calendar-hour">{hour}:00</div>
                  {days.map((day, di) => {
                    const slotEvents = getEventsForSlot(day, hour);
                    return (
                      <div key={di} className="calendar-cell" onClick={() => { const defStart=new Date(day); defStart.setHours(hour,0,0,0); const defEnd=new Date(defStart); defEnd.setHours(hour+1,0,0,0); setApptModal({ appointment: { id: null, title: '', jobId: '', start: defStart.toISOString(), end: defEnd.toISOString(), notes: '' } }); }}>
                        {slotEvents.map(ev => (
                          <div key={ev.id} onClick={(e) => { e.stopPropagation(); if(!ev.isGoogle) setApptModal({ appointment: ev }); }}
                            className="calendar-event bg-orange-100 dark:bg-orange-900/60 text-orange-800 dark:text-orange-200"
                            style={{ top: `${(ev.start.getMinutes()/60)*100}%`, height: `${Math.min(((ev.end - ev.start)/3600000)*100, 100)}%` }}>
                            <div className="truncate text-[9px] font-black">{ev.title}</div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
            <div className="mt-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 max-w-sm mx-auto">
              <div className="flex items-center gap-2 mb-3"><Clock size={13} className="text-slate-400"/><span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Upcoming</span></div>
              {allEvents.filter(ev => ev.start >= new Date()).sort((a,b)=>a.start-b.start).slice(0,5).map(ev => (
                <div key={ev.id} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                  <div className="min-w-0 flex-1 pr-2"><p className="font-semibold text-sm text-slate-900 dark:text-white truncate">{ev.title}</p><p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{formatLocal(ev.start.toISOString(), 'datetime')} – {formatLocal(ev.end.toISOString(), 'datetime')}</p></div>
                  <button onClick={() => handleDeleteAppointment(ev.id)} aria-label="Delete appointment" className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors flex-shrink-0"><Trash2 size={15}/></button>
                </div>
              ))}
              {allEvents.length===0 && <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">No upcoming appointments</p>}
            </div>
          </>
        ) : (
          <div className="space-y-3 max-w-sm mx-auto">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex justify-between items-center">
              <div>
                <p className="text-slate-500 dark:text-slate-400 font-semibold text-[11px] uppercase tracking-wider">This week</p>
                <h2 className="text-3xl font-extrabold mt-0.5 text-slate-900 dark:text-white">{fmtMins(weeklyTotalMins)}</h2>
              </div>
              <div className="flex flex-col gap-1.5">
                <button onClick={onNewTimeEntry} className="bg-orange-500 hover:bg-orange-400 text-white h-9 px-3.5 rounded-lg text-xs font-bold shadow-sm transition-all active:scale-95 flex items-center gap-1.5 justify-center"><Plus size={14}/> Log Time</button>
                <div className="flex gap-1.5">
                  <button onClick={exportCSV} className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 h-8 px-3 rounded-lg text-xs font-semibold transition-colors active:scale-95 flex items-center gap-1 justify-center"><FileDown size={12}/> CSV</button>
                  <button onClick={openTimesheetPrint} className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 h-8 px-3 rounded-lg text-xs font-semibold transition-colors active:scale-95 flex items-center gap-1 justify-center"><Printer size={12}/> PDF</button>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-3">
              {fullDayNames.map((d,i) => {
                const logs = weeklyLogs.filter(l => l.day === d);
                if (logs.length === 0) return null;
                return (
                  <div key={d} className="border-b border-slate-100 dark:border-slate-800 pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between items-end mb-2"><h4 className="font-bold text-slate-900 dark:text-white text-sm">{d}</h4><span className="font-bold text-slate-600 dark:text-slate-400 text-xs">{fmtMins(dailyMins[i])}</span></div>
                    <div className="space-y-1.5">
                      {logs.map((l,idx) => {
                        const jobInfo = jobs.find(j => j.id === l.jobId);
                        return (
                          <div key={l.id} onClick={() => onEditTimeEntry(l.originalEntry)} className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-transparent hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer transition-colors">
                            <div className="flex justify-between items-start mb-0.5">
                              <span className="font-semibold text-slate-900 dark:text-white text-sm">{l.category}</span>
                              <span className="font-semibold text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap">{l.timeStr} · {l.hours}</span>
                            </div>
                            {jobInfo && <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate"><MapPinned size={11}/> {jobInfo.address}</p>}
                            {l.notes && <p className="text-xs text-slate-500 italic truncate mt-0.5">{l.notes}</p>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {weeklyTotalMins === 0 && <p className="text-center text-slate-500 dark:text-slate-400 text-sm font-medium py-4">No hours logged this week</p>}
            </div>
          </div>
        )}

        {apptModal && (<AppointmentFormModal appointment={apptModal.appointment} jobs={jobs} onSave={handleSave} onDelete={() => handleDeleteAppointment(apptModal.appointment.id)} onClose={() => setApptModal(null)} showToast={showToast}/>)}
        {showTimesheetPrint && (
          <TimesheetPrintPreview
            weekLabel={`${days[0].toLocaleDateString('en-AU', {day:'numeric',month:'short'})} – ${days[6].toLocaleDateString('en-AU', {day:'numeric',month:'short',year:'numeric'})}`}
            weeklyLogs={weeklyLogs}
            weeklyTotalMins={weeklyTotalMins}
            jobs={jobs}
            businessProfile={businessProfile}
            startOfWeek={startOfWeek}
            onClose={() => setShowTimesheetPrint(false)}
            showToast={showToast}
          />
        )}
      </div>
    );
  };


  /* ════════════════════════════════════════════
       JIM LIVE PANEL
    ════════════════════════════════════════════ */
    const JimLivePanel = ({ status, transcript, onClose, onMicTap }) => {
      const transcriptRef = useRef(null);
      const [expanded, setExpanded] = useState(false);
      useEffect(() => { if (transcriptRef.current) transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight; }, [transcript]);

      const statusLabel = {
        connecting: 'Initialising...',
        listening: 'Listening...',
        thinking: 'AI is thinking...',
        speaking: 'AI is speaking...',
        error: 'Connection error',
        idle: 'Paused'
      };

      const statusColor = status === 'error' ? 'text-red-400' : status === 'speaking' ? 'text-orange-400' : status === 'listening' ? 'text-emerald-400' : 'text-slate-400';
      const dotColor = status === 'listening' ? 'bg-emerald-500 animate-pulse' : status === 'speaking' ? 'bg-orange-500 animate-pulse' : 'bg-slate-600';
      const micBg = status === 'speaking' || status === 'thinking' ? 'bg-amber-600 hover:bg-amber-500' : status === 'listening' ? 'bg-red-600 hover:bg-red-500' : 'bg-emerald-600 hover:bg-emerald-500';

      if (expanded) {
        return (
          <div className="fixed inset-x-0 bottom-0 z-[600] bg-slate-900/98 backdrop-blur-xl border-t border-slate-700 shadow-2xl rounded-t-3xl flex flex-col animate-slide-up pointer-events-auto" style={{height: '72vh'}}>
            {/* Header */}
            <div className="flex justify-between items-center px-5 pt-5 pb-3 border-b border-slate-800 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
                <h2 className="text-white font-black text-sm tracking-tight uppercase">Voice Mode</h2>
                <span className={`text-xs font-bold uppercase ${statusColor}`}>{statusLabel[status] || '...'}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setExpanded(false)} className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-1.5 rounded-full transition-colors" title="Compact view">
                  <ChevronDown size={16} />
                </button>
                <button onClick={onClose} className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-1.5 rounded-full transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Transcript — fills remaining space */}
            <div ref={transcriptRef} className="flex-1 overflow-y-auto custom-scrollbar px-4 py-3 space-y-3">
              {transcript.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-3 text-center">
                  <JimMascot size={52} state="idle" />
                  <p className="text-slate-500 text-sm font-medium">Ask about jobs, invoices, revenue, or how to use the app…</p>
                </div>
              ) : transcript.map((t, i) => (
                <div key={i} className={`flex items-start gap-2.5 ${t.role === 'jim' ? 'justify-start' : 'justify-end'}`}>
                  {t.role === 'jim' && (
                    <div className="w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[9px] font-black text-white">J</span>
                    </div>
                  )}
                  <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[88%] ${
                    t.role === 'jim'
                      ? 'bg-orange-600/20 border border-orange-500/30 text-orange-100'
                      : 'bg-slate-700 text-slate-200'
                  }`}>
                    {t.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Mic row */}
            <div className="flex items-center justify-center px-5 py-4 border-t border-slate-800 flex-shrink-0 pb-safe">
              <button onClick={onMicTap} className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all ${micBg}`} title={status === 'speaking' || status === 'thinking' ? 'Stop JIM' : 'Tap to Speak'}>
                {status === 'speaking' || status === 'thinking' ? <Square size={22} className="text-white fill-white"/> : <Mic size={28} className="text-white"/>}
              </button>
            </div>
          </div>
        );
      }

      return (
        <div className="fixed bottom-20 inset-x-4 max-w-sm mx-auto z-[600] bg-slate-900/95 backdrop-blur-xl border border-slate-700 shadow-2xl rounded-3xl p-4 flex flex-col gap-3 animate-slide-up pointer-events-auto">
          {/* Header */}
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
              <h2 className="text-white font-black text-sm tracking-tight uppercase">Voice Mode</h2>
            </div>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setExpanded(true)} className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-1.5 rounded-full transition-colors" title="Expand">
                <ChevronDown size={16} className="rotate-180" />
              </button>
              <button onClick={onClose} className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-1.5 rounded-full transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Transcript */}
          {transcript.length > 0 ? (
            <div ref={transcriptRef} className="w-full max-h-36 overflow-y-auto custom-scrollbar bg-slate-800/50 rounded-2xl p-3 space-y-2 border border-slate-700/50">
              {transcript.map((t, i) => (
                <div key={i} className={`flex items-start gap-2 ${t.role === 'jim' ? 'justify-start' : 'justify-end'}`}>
                  {t.role === 'jim' && (
                    <div className="w-5 h-5 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[9px] font-black text-white">J</span>
                    </div>
                  )}
                  <div className={`px-3 py-1.5 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                    t.role === 'jim'
                      ? 'bg-orange-600/20 border border-orange-500/30 text-orange-100'
                      : 'bg-slate-700 text-slate-200'
                  }`}>
                    {t.text}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full text-center text-slate-500 text-xs py-1">
              <p>Ask about jobs, invoices, or how to use the app…</p>
            </div>
          )}

          {/* Bottom Row: Status & Mic */}
          <div className="flex items-center justify-between px-1">
            <p className={`text-xs font-bold tracking-wide uppercase ${statusColor}`}>
              {statusLabel[status] || '...'}
            </p>
            <button onClick={onMicTap} className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all ${micBg}`} title={status === 'speaking' || status === 'thinking' ? 'Stop JIM' : 'Tap to Speak'}>
              {status === 'speaking' || status === 'thinking' ? <Square size={20} className="text-white fill-white"/> : <Mic size={24} className="text-white"/>}
            </button>
          </div>
        </div>
      );
    };



  /* ════════════════════════════════════════════
     FLOATING JIM (phone call only)
  ════════════════════════════════════════════ */
  const DraggableJim = ({ size }) => {
    const placeholderRef = useRef(null);
    const [fixed, setFixed] = useState(false);
    const [returning, setReturning] = useState(false);
    const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const drag = useRef({ hasMoved: false, startCX: 0, startCY: 0, originX: 0, originY: 0 });

    const onStart = (e) => {
      const el = placeholderRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      drag.current = { hasMoved: false, startCX: cx, startCY: cy, originX: rect.left, originY: rect.top };

      const onMove = (ev) => {
        if (ev.cancelable) ev.preventDefault();
        const mx = ev.touches ? ev.touches[0].clientX : ev.clientX;
        const my = ev.touches ? ev.touches[0].clientY : ev.clientY;
        const dx = mx - drag.current.startCX;
        const dy = my - drag.current.startCY;
        if (!drag.current.hasMoved && Math.abs(dx) + Math.abs(dy) > 6) {
          drag.current.hasMoved = true;
          setFixed(true);
          setIsDragging(true);
          setReturning(false);
          setDragPos({ x: drag.current.originX, y: drag.current.originY });
        }
        if (drag.current.hasMoved) setDragPos({ x: drag.current.originX + dx, y: drag.current.originY + dy });
      };

      const onEnd = () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onEnd);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('touchend', onEnd);
        setIsDragging(false);
        setReturning(true);
        setDragPos({ x: drag.current.originX, y: drag.current.originY });
        setTimeout(() => { setFixed(false); setReturning(false); }, 520);
      };

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('touchend', onEnd);
    };

    return (
      <>
        <div ref={placeholderRef} style={{ width: size, height: Math.round(size * 1.3), visibility: fixed ? 'hidden' : 'visible', cursor: 'grab', flexShrink: 0 }}
          onMouseDown={onStart} onTouchStart={onStart}>
          {!fixed && <JimMascot size={size} state="idle"/>}
        </div>
        {fixed && (
          <div style={{ position: 'fixed', left: dragPos.x, top: dragPos.y, zIndex: 99999, pointerEvents: 'none',
            transform: isDragging ? 'scale(1.5)' : 'scale(1)',
            transition: returning 
              ? 'left 0.8s cubic-bezier(0.68,-0.55,0.265,1.55), top 0.8s cubic-bezier(0.68,-0.55,0.265,1.55), transform 0.5s ease-out' 
              : 'transform 0.2s ease-out' }}>
            <JimMascot size={size} state={isDragging ? 'error' : 'idle'}/>
          </div>
        )}
      </>
    );
  };

  const FloatingJimMascot = ({ status }) => {
    const mascotState = status === 'error' ? 'error' : (status === 'speaking' || status === 'thinking') ? 'thinking' : status === 'listening' ? 'wave' : 'idle';
    const isThinking = status === 'thinking';
    const [pos, setPos] = useState({ x: 16, y: 90 });
    useEffect(() => {
      const move = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const sz = 64;
        const maxX = Math.max(8, vw - sz - 24);
        const minY = 72;
        const maxY = Math.max(minY + sz, vh - 260);
        setPos({
          x: Math.floor(Math.random() * maxX),
          y: Math.floor(minY + Math.random() * (maxY - minY))
        });
      };
      move();
      const id = setInterval(move, isThinking ? 1200 : 2500);
      return () => clearInterval(id);
    }, [isThinking]);
    return (
      <div style={{ position: 'fixed', left: pos.x, top: pos.y, transition: `left ${isThinking ? 0.7 : 1.4}s ease-in-out, top ${isThinking ? 0.7 : 1.4}s ease-in-out`, zIndex: 590, pointerEvents: 'none' }}>
        <JimMascot size={56} state={mascotState}/>
      </div>
    );
  };

  /* ════════════════════════════════════════════
     APP
  ════════════════════════════════════════════ */
  const SYNC_COLLECTIONS = [
    { key: 'jobs',         idbKey: 'jobsite-master-v5' },
    { key: 'templates',    idbKey: 'joblog-templates' },
    { key: 'materials',    idbKey: 'joblog-materials' },
    { key: 'appointments', idbKey: 'joblog-appointments' },
    { key: 'timesheets',   idbKey: 'joblog-timesheets' },
  ];

  const App = ({ user }) => {
    const [jobs, setJobs] = useState([]);
    const [userTemplates, setUserTemplates] = useState([]);
    const [userMaterials, setUserMaterials] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [timesheets, setTimesheets] = useState([]);
    const [businessProfile, setBusinessProfile] = useState(() => { try { return JSON.parse(localStorage.getItem(BIZA_KEY) || '{}'); } catch { return {}; } });
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [userTier, setUserTier] = useState(null);
    const [showUpgrade, setShowUpgrade] = useState(false);
    const [extraTaxRate, setExtraTaxRate] = useState(() => Number(localStorage.getItem('joblog-extratax') || 0));
    const [countryCode, setCountryCode] = useState(() => localStorage.getItem('jim-country') || 'AU');
    const [viewMode, setViewMode] = useState('dashboard');
    const [activeJobId, setActiveJobId] = useState(null);
    const [selectionMode, setSelectionMode] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [toast, setToast] = useState(null);
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [dbSize, setDbSize] = useState('0 MB');
    const [isDarkMode, setIsDarkMode] = useState(() => { const saved = localStorage.getItem('theme'); if (saved !== null) return saved === 'dark'; return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; });
    const [newJobModal, setNewJobModal] = useState(null);
    const [searchQ, setSearchQ] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [sortBy, setSortBy] = useState('created_desc');
    const [isEditingHeader, setIsEditingHeader] = useState(false);
    const [headerDraft, setHeaderDraft] = useState({ address:'', clientName:'', clientPhone:'', clientEmail:'', clientRef:'', dueDate:'', projectNotes:'', projectPhotos:[] });
    const [isLoading, setIsLoading] = useState(true);
    const [listeningField, setListeningField] = useState(null);
    const recognitionRef = useRef(null);
    const [geminiModel, setGeminiModel] = useState(() => localStorage.getItem('geminiModel') || 'gemini-2.0-flash-lite');
    const [userApiKey, setUserApiKey] = useState(() => localStorage.getItem('userGeminiApiKey') || '');
    const [confirmDialog, setConfirmDialog] = useState(null);
    const [printPreviewJob, setPrintPreviewJob] = useState(null);
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [useMyLocation, setUseMyLocation] = useState(true);
    const [locStatus, setLocStatus] = useState('idle');
    const [currentCoords, setCurrentCoords] = useState(null);
    const [appointmentFromJob, setAppointmentFromJob] = useState(null);
    const [timeEntryModal, setTimeEntryModal] = useState(null);
    const [showAIAssistModal, setShowAIAssistModal] = useState(false);
    const [rejectingJobId, setRejectingJobId] = useState(null);
    const [lostAnalysis, setLostAnalysis] = useState('');
    const [isAnalyzingLost, setIsAnalyzingLost] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isScanningReceipt, setIsScanningReceipt] = useState(false);
    const [isProfessionalizing, setIsProfessionalizing] = useState(false);
    const jimRecognitionRef = useRef(null);
    const jimActiveRef = useRef(false);

    // Live Timer
    const [activeTimer, setActiveTimer] = useState(() => { try { return JSON.parse(localStorage.getItem('joblog-timer') || 'null'); } catch { return null; } });
    const [now, setNow] = useState(Date.now());
    useEffect(() => { localStorage.setItem('joblog-timer', JSON.stringify(activeTimer)); }, [activeTimer]);
    useEffect(() => { if (!activeTimer) return; const int = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(int); }, [activeTimer]);

    const EMPTY_TASK = { title:'', time:'', rate:'', materialsCost:'', materials:'', tools:'', desc:'', images:[] };
    const [taskData, setTaskData] = useState(EMPTY_TASK);
    const [rateError, setRateError] = useState(false);
    const [matError, setMatError] = useState(false);
    const [editingImageIdx, setEditingImageIdx] = useState(null);
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [penColor, setPenColor] = useState('#ef4444');
    const [undoStack, setUndoStack] = useState([]);
    const [canvasZoom, setCanvasZoom] = useState(1);
    const [canvasPan, setCanvasPan] = useState({ x:0, y:0 });
    const [canvasMode, setCanvasMode] = useState('draw');
    const zoomRef = useRef(1);
    const panRef = useRef({ x:0, y:0 });
    const modeRef = useRef('draw');
    const drawRef = useRef(false);
    const pinchRef = useRef(null);
    const panStartRef = useRef(null);
    const COLORS = [{ hex:'#ef4444', name:'Red' }, { hex:'#22c55e', name:'Green' }, { hex:'#eab308', name:'Yellow' }, { hex:'#ffffff', name:'White' }, { hex:'#000000', name:'Black' }];
    const [showTemplatePop, setShowTemplatePop] = useState(false);
    const [showMaterialPop, setShowMaterialPop] = useState(false);
    const [jimLiveOpen, setJimLiveOpen] = useState(false);
    const [jimLiveStatus, setJimLiveStatus] = useState('idle');
    const [jimLiveTranscript, setJimLiveTranscript] = useState([]);
    const jimCancelledRef = useRef(false);
    const showToast = (message, type = 'info') => setToast({ message, type });

    const loadJobs = async () => {
      const d = await get(DB_KEY_JOBS) || [];
      const migrated = d.map(j => {
        const mj = { ...j };
        if (mj.type === 'handover' && mj.showCosts === undefined) mj.showCosts = false;
        if (mj.type === 'quote' && mj.showCosts === undefined) mj.showCosts = true;
        if (!mj.createdAt) mj.createdAt = mj.date ? new Date(mj.date).getTime() : Date.now();
        if (mj.invoiceNumber === undefined) mj.invoiceNumber = '';
        if (mj.amountPaid === undefined) mj.amountPaid = 0;
        // Workflow lifecycle migration:
        // - Old 'overdue' status → 'invoiced' with backdated invoicedAt so it still reads as overdue.
        // - Cash-job (type='handover') still on 'draft' → 'completed' (work done, ready to invoice).
        if (mj.status === 'overdue') {
          mj.status = 'invoiced';
          if (!mj.invoicedAt) mj.invoicedAt = (mj.createdAt || Date.now()) - 31*86400000;
        }
        if (mj.type === 'handover' && (!mj.status || mj.status === 'draft')) {
          mj.status = 'completed';
        }
        ['approvedAt','startedAt','completedAt','invoicedAt','paidAt','rejectedAt'].forEach(k => {
          if (mj[k] === undefined) mj[k] = null;
        });
        if (mj.rejectionReason === undefined) mj.rejectionReason = null;
        if (mj.rejectionNote === undefined) mj.rejectionNote = '';
        return mj;
      });
      setJobs(migrated); updMetric(migrated); setIsLoading(false);
    };
    const loadTemplates = async () => setUserTemplates(await get(DB_KEY_TEMPL) || []);
    const loadMaterials = async () => setUserMaterials(await get(DB_KEY_MATS) || []);
    const loadAppointments = async () => setAppointments(await get(DB_KEY_APPOINTMENTS) || []);
    const loadTimesheets = async () => setTimesheets(await get(DB_KEY_TIMESHEETS) || []);
    useEffect(() => {
      // Load local data immediately so the app never hangs
      loadJobs(); loadTemplates(); loadMaterials(); loadAppointments(); loadTimesheets();

      if (user?.uid) {
        user.getIdToken().then(idToken =>
          fetch(`${AI_PROXY_BASE}/status`, { headers: { Authorization: `Bearer ${idToken}` } })
            .then(r => r.ok ? r.json() : null)
            .then(data => {
              if (data?.tier) {
                setUserTier(data.tier);
                if (data.tier !== 'free') setIsUnlocked(true);
              }
            })
            .catch(() => {})
        );

        // Background sync — refresh state for any collections Firestore had newer data for
        coldStartSync(user.uid, SYNC_COLLECTIONS).then(updated => {
          if (updated.jobs)         loadJobs();
          if (updated.templates)    loadTemplates();
          if (updated.materials)    loadMaterials();
          if (updated.appointments) loadAppointments();
          if (updated.timesheets)   loadTimesheets();
        }).catch(() => {});

        const onOnline = () => syncAll(user.uid, SYNC_COLLECTIONS);
        window.addEventListener('online', onOnline);
        return () => window.removeEventListener('online', onOnline);
      }
    }, []);

    const updMetric = (d) => setDbSize(`${(new TextEncoder().encode(JSON.stringify(d)).length/1024/1024).toFixed(2)} MB`);
    const saveToDB = async (nj) => { setJobs(nj); try { await set(DB_KEY_JOBS, nj); if (user?.uid) syncWrite(user.uid, 'jobs', nj); } catch(e) { showToast('Warning: Data could not be saved (Storage limit).', 'error'); } updMetric(nj); };
    const saveUserTemplates = async (arr) => { setUserTemplates(arr); await set(DB_KEY_TEMPL, arr); if (user?.uid) syncWrite(user.uid, 'templates', arr); };
    const saveUserMaterials = async (arr) => { setUserMaterials(arr); await set(DB_KEY_MATS, arr); if (user?.uid) syncWrite(user.uid, 'materials', arr); };
    const saveAppointments = async (arr) => { setAppointments(arr); await set(DB_KEY_APPOINTMENTS, arr); if (user?.uid) syncWrite(user.uid, 'appointments', arr); };
    const saveTimesheets = async (arr) => { setTimesheets(arr); await set(DB_KEY_TIMESHEETS, arr); if (user?.uid) syncWrite(user.uid, 'timesheets', arr); };
    const saveBusinessProfile = (profile) => { setBusinessProfile(profile); localStorage.setItem(BIZA_KEY, JSON.stringify(profile)); };
    useEffect(() => { const root = document.documentElement; if (isDarkMode) { root.classList.add('dark'); document.getElementById('theme-color-meta').setAttribute('content','#020617'); localStorage.setItem('theme','dark'); } else { root.classList.remove('dark'); document.getElementById('theme-color-meta').setAttribute('content','#ffffff'); localStorage.setItem('theme','light'); } }, [isDarkMode]);

    const activeJob = jobs.find(j => j.id === activeJobId);

    const revenueStats = useMemo(() => {
      let pipeline=0, booked=0, owed=0, overdueAmt=0, banked=0, lost=0;
      let pipelineCount=0, bookedCount=0, owedCount=0, overdueCount=0, lostCount=0;
      let won=0, lostQuotes=0;
      jobs.forEach(j => {
        const total = getQuoteTotals(j.tasks, j.gstEnabled, extraTaxRate).total;
        const s = j.status || 'draft';
        if (s === 'rejected') {
          if (total) lost += total;
          lostCount++; lostQuotes++;
          return;
        }
        if (['approved','in_progress','completed','invoiced','paid'].includes(s)) won++;
        if (!total) return;
        if (['draft','sent'].includes(s)) { pipeline += total; pipelineCount++; }
        if (['approved','in_progress','completed'].includes(s)) { booked += total; bookedCount++; }
        if (s === 'invoiced') {
          owed += total; owedCount++;
          if (isOverdueInvoice(j)) { overdueAmt += total; overdueCount++; }
        }
        if (s === 'paid') banked += (parseFloat(j.amountPaid) || total);
      });
      const decided = won + lostQuotes;
      const winRate = decided >= 3 ? Math.round(won / decided * 100) : null;
      return { pipeline, booked, owed, overdueAmt, banked, lost, pipelineCount, bookedCount, owedCount, overdueCount, lostCount, winRate, won, lostQuotes,
               // Legacy aliases consumed elsewhere:
               quoted: pipeline, outstanding: owed, received: banked, invoicedCount: owedCount - overdueCount };
    }, [jobs, extraTaxRate]);

    const jimInsight = useMemo(() => {
      if (jobs.length === 0) return { state: 'wave', msg: "G'day! Create your first quote or completion report to get started." };
      const overdue = jobs.filter(j => isOverdueInvoice(j));
      const completedNotInvoiced = jobs.filter(j => j.status === 'completed');
      const sentCold = jobs.filter(j => j.status === 'sent' && j.createdAt < Date.now() - 7*86400000);
      const approvedStale = jobs.filter(j => j.status === 'approved' && (j.approvedAt || j.createdAt) < Date.now() - 7*86400000);
      const recentlyLost = jobs.filter(j => j.status === 'rejected' && j.rejectedAt && j.rejectedAt > Date.now() - 30*86400000);
      const expiringCreds = (businessProfile?.credentials || []).filter(c => isExpiringSoon(c.expiry) || isExpired(c.expiry));
      if (overdue.length) return { state: 'error', msg: `${overdue.length} invoice${overdue.length>1?'s':''} overdue — chase those payments!` };
      if (expiringCreds.length) return { state: 'error', msg: `${expiringCreds.length} credential${expiringCreds.length>1?'s':''} expired or expiring soon — update in Settings.` };
      if (completedNotInvoiced.length) return { state: 'idle', msg: `${completedNotInvoiced.length} job${completedNotInvoiced.length>1?'s':''} finished and waiting on an invoice.` };
      if (sentCold.length) return { state: 'idle', msg: `${sentCold.length} quote${sentCold.length>1?'s':''} sitting cold for >7 days — follow up?` };
      if (approvedStale.length) return { state: 'idle', msg: `${approvedStale.length} approved job${approvedStale.length>1?'s':''} haven't kicked off yet.` };
      if (recentlyLost.length >= 3) return { state: 'idle', msg: `${recentlyLost.length} quotes lost in the last 30 days — ask AI why.` };
      const activeCount = jobs.filter(j => j.status !== 'rejected').length;
      if (activeCount === 0) return { state: 'wave', msg: "G'day! Create your first quote or completion report to get started." };
      return { state: 'wave', msg: `All looking good! ${activeCount} project${activeCount>1?'s':''} on the books.` };
    }, [jobs, businessProfile, revenueStats]);

    const clientsData = useMemo(() => {
      const map = {};
      jobs.forEach(j => {
        const key = j.clientName || '—';
        if (!map[key]) map[key] = { name: key, phone: j.clientPhone||'', email: j.clientEmail||'', jobs: [], totalValue: 0, unpaidCount: 0, lastContact: 0 };
        map[key].jobs.push(j);
        if (!map[key].phone && j.clientPhone) map[key].phone = j.clientPhone;
        if (!map[key].email && j.clientEmail) map[key].email = j.clientEmail;
        const total = getQuoteTotals(j.tasks, j.gstEnabled, extraTaxRate).total;
        map[key].totalValue += total;
        if (j.createdAt > map[key].lastContact) map[key].lastContact = j.createdAt;
        if (['sent','approved','in_progress','completed','invoiced'].includes(j.status)) map[key].unpaidCount++;
      });
      return Object.values(map).sort((a,b) => b.totalValue - a.totalValue);
    }, [jobs, extraTaxRate]);
    const getTotals = (tasks) => { const m=(tasks||[]).reduce((a,t)=>a+parseTimeToMinutes(t.time),0); return { mins:m, str:fmtMins(m) }; };


    const handleSaveAppointment = (appt) => { let updated = appointments.find(a => a.id === appt.id) ? appointments.map(a => a.id === appt.id ? appt : a) : [...appointments, appt]; saveAppointments(updated); setAppointmentFromJob(null); };
    const handleDeleteAppointment = (id) => saveAppointments(appointments.filter(a => a.id !== id));

    const handleSaveTimeEntry = async (entry) => {
      const updated = timeEntryModal.id ? timesheets.map(t => t.id === entry.id ? entry : t) : [...timesheets, entry];
      await saveTimesheets(updated);
      setTimeEntryModal(null);
      showToast('Time entry saved!', 'success');
    };
    const handleDeleteTimeEntry = async (id) => {
      const updated = timesheets.filter(t => t.id !== id);
      await saveTimesheets(updated);
      setTimeEntryModal(null);
      showToast('Time entry deleted', 'info');
    };

    const buildJimContext = () => {
      const biz = businessProfile || {};
      const cc = getCC();
      const NEXT_ACTION_DESC = {
        draft:        'Finish the quote and send it',
        sent:         'Follow up with the client',
        approved:     'Get materials and start work',
        in_progress:  'Keep work moving; log time',
        completed:    'Send the invoice',
        invoiced:     'Chase payment if past 30 days',
        paid:         'Done',
      };
      const STAGE_HINT = {
        quoting:   'Tools to bring for measure-up: tape, level, laser, notepad, camera',
        working:   'Shopping list to pick up before/at the job',
        invoicing: 'Invoice / chase / receipt',
        lost:      'Lost — analyse for patterns when asked',
      };

      const jobDetails = jobs.map(j => {
        const qt = getQuoteTotals(j.tasks, j.gstEnabled, extraTaxRate);
        const paid = parseFloat(j.amountPaid) || 0;
        const balance = qt.total - paid;
        const phase = phaseOf(j);
        const status = j.status || 'draft';
        const taskLines = (j.tasks || []).map(t =>
          `      • ${t.title}${t.time ? ` (${t.time})` : ''}${t.rate ? ` @ ${cc.symbol}${t.rate}/hr` : ''}${t.materialsCost ? ` + ${cc.symbol}${t.materialsCost} mats` : ''}${t.materials ? `: ${String(t.materials).split('\n').filter(Boolean).join(', ')}` : ''}${t.tools ? ` | tools: ${String(t.tools).split('\n').filter(Boolean).join(', ')}` : ''}`
        ).join('\n');
        const dSinceCreated = daysSince(j.createdAt);
        let stageDetail = '';
        if (status === 'sent' && dSinceCreated != null) stageDetail = ` — sent ${dSinceCreated}d ago`;
        else if (status === 'approved' && j.approvedAt) stageDetail = ` — approved ${daysSince(j.approvedAt)}d ago`;
        else if (status === 'in_progress' && j.startedAt) stageDetail = ` — started ${daysSince(j.startedAt)}d ago`;
        else if (status === 'completed' && j.completedAt) stageDetail = ` — finished ${daysSince(j.completedAt)}d ago, ready to invoice`;
        else if (status === 'invoiced' && j.invoicedAt) {
          const od = isOverdueInvoice(j);
          stageDetail = ` — ${daysSince(j.invoicedAt)}d since invoice${od ? ', OVERDUE' : ''}`;
        }
        else if (status === 'rejected' && j.rejectedAt) stageDetail = ` — lost ${daysSince(j.rejectedAt)}d ago`;
        return [
          `  [${status.toUpperCase()}${stageDetail}] ${j.address || 'Unknown site'}${j.createdAt ? ` — created ${new Date(j.createdAt).toLocaleDateString(cc.locale)}` : ''}`,
          `    Phase: ${phase} | Next: ${NEXT_ACTION_DESC[status] || ''}`,
          `    Client: ${j.clientName || '—'}${j.clientPhone ? ` | Ph: ${j.clientPhone}` : ''}`,
          qt.total > 0 ? `    Total: ${cc.symbol}${qt.total.toFixed(2)} (excl ${cc.taxLabel}: ${cc.symbol}${qt.subtotal.toFixed(2)})${j.invoiceNumber ? ` | Invoice: ${j.invoiceNumber}` : ''}` : '',
          paid > 0 ? `    Paid: ${cc.symbol}${paid.toFixed(2)} | Balance owing: ${cc.symbol}${balance.toFixed(2)}` : '',
          status === 'rejected' ? `    Rejection: ${getRejectionLabel(j.rejectionReason)}${j.rejectionNote ? ` — "${j.rejectionNote.slice(0,140)}"` : ''}` : '',
          j.projectNotes ? `    Notes: ${j.projectNotes.slice(0, 120)}${j.projectNotes.length > 120 ? '...' : ''}` : '',
          taskLines ? `    Tasks:\n${taskLines}` : '    Tasks: none',
        ].filter(Boolean).join('\n');
      }).join('\n\n');

      const now = Date.now();
      const upcomingAppts = (appointments || [])
        .filter(a => { const t = new Date(a.start).getTime(); return t > now && t < now + 7*24*60*60*1000; })
        .sort((a, b) => new Date(a.start) - new Date(b.start))
        .map(a => {
          const j = jobs.find(x => x.id === a.jobId);
          return `  • ${new Date(a.start).toLocaleDateString(cc.locale, { weekday: 'short', day: 'numeric', month: 'short' })} ${new Date(a.start).toLocaleTimeString(cc.locale, { hour: '2-digit', minute: '2-digit' })}: ${a.title}${j ? ` — ${j.address}` : ''}`;
        }).join('\n');

      const weekStart = now - (new Date().getDay() || 7) * 24*60*60*1000;
      const weekSheets = (timesheets || [])
        .filter(t => new Date(t.date).getTime() >= weekStart)
        .map(t => {
          const j = jobs.find(x => x.id === t.jobId);
          const mins = (new Date(`${t.date}T${t.endTime}`) - new Date(`${t.date}T${t.startTime}`)) / 60000;
          return `  • ${t.date}: ${t.category} — ${Math.floor(mins/60)}h${mins % 60 ? ` ${mins % 60}m` : ''}${j ? ` at ${j.address}` : ''}${t.notes ? ` (${t.notes})` : ''}`;
        }).join('\n');

      const activeBlock = (viewMode === 'detail' && activeJob) ? (() => {
        const aqt = getQuoteTotals(activeJob.tasks, activeJob.gstEnabled, extraTaxRate);
        const aStatus = activeJob.status || 'draft';
        return `\nACTIVE CONTEXT: User is currently viewing this job — tailor advice to it unless they explicitly ask about another job.\n  Address: ${activeJob.address || '—'}\n  Client: ${activeJob.clientName || '—'}\n  Status: ${aStatus} (${phaseOf(activeJob)})\n  Total: ${cc.symbol}${aqt.total.toFixed(2)} | Tasks: ${(activeJob.tasks||[]).length}\n`;
      })() : '';

      return `You are JIM, a blunt no-fluff tradie assistant for a ${cc.name} tradie. Never start with "G'day", "Hi", or any greeting — get straight to the answer. 1-2 short sentences max unless more detail is asked for. Be direct, specific, and reference actual job data when relevant. You also know this app inside-out and can walk any new user through it step by step.

GROUND RULES:
- Use ${cc.symbol} for money and refer to tax as "${cc.taxLabel}".
- Never invent client names, addresses, totals, or dates — only use what's in the data below.
- Don't recommend specific dollar amounts for quotes — that's the user's call.
- Trade conventions, materials, tools, and slang should match ${cc.name}.

PER-STAGE GUIDANCE: jobs move quote→work→invoice. Tailor advice to each job's phase:
- Quoting (draft, sent): suggest tools to bring for measure-up — tape, level, laser, notepad, camera. Nudge follow-ups on sent quotes that have gone cold.
- Working (approved, in_progress): suggest a shopping list of materials to pick up and the tools to bring on site.
- Invoicing (completed, invoiced, paid): nudge to send the invoice once completed; chase if invoiced > 30 days.
- Lost (rejected): only analyse patterns when explicitly asked.

APP GUIDE — use this to answer any "how do I…" question:

GETTING STARTED:
- The dashboard is the home screen — it lists all your jobs with a summary from me at the top.
- Two big buttons at the top: "New Quote" (start a job you need to price up) and "Completion" (log a job you've already done and need to invoice).
- Tap any job card to open it and see the full detail.

CREATING A JOB:
- Tap "New Quote" or "Completion" on the dashboard.
- Fill in the address (required), client name, phone, email, due date. The rest is optional at this stage.
- "Ask AI" at the bottom: attach a photo of a scope-of-work text, a message from the client, or a receipt — JIM will read it and pre-fill the job for you.
- Tap "Create" to save it. You can edit everything after.

TASKS (LINE ITEMS):
- Inside a job, tasks are the individual line items that make up the quote or invoice.
- Each task has: a title, time (hours), hourly rate, materials cost, a materials list, a tools list, and a description/notes field.
- Tap "Add Task" to create one manually, or use a saved template from the template library.
- The "Polish" button (wand icon) on a task description rewrites it into professional trade language.
- The "Ask AI to draft this" button fills in a task's details based on its title — just type the task name and let JIM fill the rest.

STATUS FLOW — how a job moves through its life:
- Drafting: you're still building the quote.
- Quoted: you've sent the quote to the client. Follow up if it goes cold after 7 days.
- Approved: client said yes. Time to get materials and schedule the work.
- In Progress: you're on site doing the work.
- Completed: work is done. Time to send the invoice.
- Invoiced: invoice sent. Chase if unpaid after 30 days.
- Paid: money in the bank. Job done.
- Rejected/Lost: quote didn't get up. JIM can analyse your lost pile to find patterns.
- To change a status, tap the status badge inside the job and pick the next step.

FILTER TABS (on the dashboard):
- All: everything except rejected jobs.
- Quotes: jobs still in the quoting phase (Drafting or Quoted).
- Working: jobs you're actively on (Approved or In Progress).
- To Invoice: jobs finished but not yet invoiced (Completed).
- Owed: invoices sent but not paid yet.
- Lost: rejected quotes.
- Clients: a summary view grouped by client name.

PDF / DOCUMENTS:
- Open a job, then tap the "PDF" button in the top-right corner.
- This opens a print preview of the Quotation or Completion Invoice.
- You can edit the document title, notes, and line items directly in the preview.
- "Ask AI" inside the preview will rewrite the whole document professionally based on the job data.
- Share as PDF via the share button — works with WhatsApp, email, AirDrop, etc.
- To print, use your browser's print function from the preview.
- Invoice numbers: tap "Generate invoice number" inside the job to auto-assign one (INV-YEAR-XXX).
- ${cc.taxLabel} toggle: turn it on or off per job. When on, ${cc.taxLabel} is calculated and shown on the document.

SCHEDULE:
- Tap the calendar icon in the header to open Schedule view.
- The weekly calendar shows appointments (client visits, site meetings) and time entries side by side.
- Add an appointment by tapping a time slot or the "+" button. Link it to an existing job.
- Add a time entry (timesheet) to log hours worked — pick a category (Site Work, Travel, Admin, etc.), start/end time, and link to a job.
- Timesheets this week are shown to me so I can summarise your week if you ask.
- You can print a weekly timesheet as a PDF from the schedule view.

SETTINGS (gear icon on the dashboard):
- Business Profile: your business name, ${cc.regLabel}/registration number, address, phone, email, and logo. This appears on every PDF you generate.
- Credentials: store your trade licences, insurance details, and expiry dates. JIM will warn you when they're about to expire.
- Country: sets your currency, tax label (${cc.taxLabel}), and trade conventions. Currently set to ${cc.name}.
- Extra tax rate: add a second tax line (e.g. state levy) on top of ${cc.taxLabel} if needed.
- Dark mode: toggle between light and dark theme.
- AI features are built in — no setup needed. Ask AI, receipt scan, polish, and document generation all work out of the box.
- Templates: save your commonly used tasks as reusable templates. Tap "Templates" in Settings to manage them.
- Materials library: save your go-to materials with prices so you can insert them into jobs quickly.
- Export data: downloads a JSON backup of all your jobs — good for peace of mind.
- Import data: restores from a JSON backup. Warning: this replaces everything.
- Unlock Pro: enter a licence key to remove the job cap and unlock full AI quota.

JIM LIVE (microphone button, top-right of every screen):
- Tap the purple mic button to talk to me by voice. I can hear you and talk back.
- Ask me anything: "what jobs do I have on this week?", "which quotes are going cold?", "what materials do I need for the Smithfield job?", "how do I add a task?"
- Tap the button again (or the stop button) to end the conversation.

OFFLINE USE:
- JIM works without internet. All data is saved on your device.
- You can create jobs, add tasks, and generate PDFs with no signal.
- AI features (Ask AI, Polish, document generation) require an internet connection.

PHOTOS:
- Add photos to a job from the job header (project photos) or to individual tasks.
- Tap a photo to open the drawing/annotation canvas — you can mark up the photo with a pen tool.
- Photos appear in the PDF if included in the task.

BUSINESS: ${biz.name || 'Not set'} | Reg #: ${biz.abn || '—'} | Ph: ${biz.phone || '—'} | Country: ${cc.name}
TODAY: ${new Date().toLocaleDateString(cc.locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
${activeBlock}
REVENUE SNAPSHOT:
  Pipeline: ${cc.symbol}${revenueStats.pipeline.toFixed(2)} (${revenueStats.pipelineCount} quotes) | Booked: ${cc.symbol}${revenueStats.booked.toFixed(2)} (${revenueStats.bookedCount} jobs) | Owed: ${cc.symbol}${revenueStats.owed.toFixed(2)} (overdue ${cc.symbol}${revenueStats.overdueAmt.toFixed(2)}) | Banked: ${cc.symbol}${revenueStats.banked.toFixed(2)} | Lost: ${revenueStats.lostCount} quotes / ${cc.symbol}${revenueStats.lost.toFixed(2)}${revenueStats.winRate != null ? ` | Win rate: ${revenueStats.winRate}%` : ''}

ALL JOBS (${jobs.length} total):
${jobDetails || '  No jobs yet.'}

UPCOMING SCHEDULE (next 7 days):
${upcomingAppts || '  No appointments scheduled.'}

TIMESHEETS THIS WEEK:
${weekSheets || '  No time entries this week.'}`;
    };

    const handleAnalyzeLostPile = async () => {
      const lost = jobs.filter(j => j.status === 'rejected');
      const won = jobs.filter(j => ['approved','in_progress','completed','invoiced','paid'].includes(j.status));
      if (lost.length === 0) { showToast('No lost quotes to analyse yet.', 'info'); return; }
      setIsAnalyzingLost(true);
      const fmt = (j) => {
        const qt = getQuoteTotals(j.tasks, j.gstEnabled, extraTaxRate);
        const tasks = (j.tasks || []).map(t => `${t.title}${t.materials ? ` [${String(t.materials).split('\n').filter(Boolean).join(', ')}]` : ''}`).join('; ');
        return `- ${j.address || 'site'} — total $${qt.total.toFixed(0)} | client: ${j.clientName || '—'} | tasks: ${tasks || 'none'}` +
          (j.status === 'rejected' ? ` | reason: ${getRejectionLabel(j.rejectionReason)}${j.rejectionNote ? ` (${j.rejectionNote})` : ''}` : '');
      };
      const cc = getCC();
      const prompt = `You are JIM, a blunt no-fluff tradie advising a ${cc.name} tradie. Compare these REJECTED quotes against the ones the user has WON. Find concrete patterns that correlate with losing — price ranges (${cc.symbol}), job types, scope, response time, client type. Be specific. 3 to 5 short bullet points. No greeting, no fluff. Currency is ${cc.symbol}; tax is ${cc.taxLabel}.

REJECTED (${lost.length}):
${lost.map(fmt).join('\n')}

WON (${won.length}):
${won.map(fmt).join('\n')}`;
      try {
        const resData = await smartFetchAI('heavy', [{ parts: [{ text: prompt }] }], { temperature: 0.4 }, user, geminiModel, userApiKey);
        const text = resData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
        if (text) setLostAnalysis(text);
        else showToast('No analysis returned — try again.', 'error');
      } catch (err) {
        showToast('Analysis failed: ' + err.message, 'error');
      } finally {
        setIsAnalyzingLost(false);
      }
    };

    const startJimLive = async () => {
      // Prevent multiple instances
      if (jimActiveRef.current) {
        stopJimLive();
        setTimeout(() => startJimLive(), 500);
        return;
      }

      jimActiveRef.current = true;
      jimCancelledRef.current = false;

      setJimLiveOpen(true);
      setJimLiveStatus('connecting');
      setJimLiveTranscript([]);

      // Wait for voices
      const loadVoices = () => {
        return new Promise((resolve) => {
          let voices = window.speechSynthesis.getVoices();
          if (voices.length) resolve(voices);
          else window.speechSynthesis.onvoiceschanged = () => resolve(window.speechSynthesis.getVoices());
        });
      };

      const voices = await loadVoices();

      // Log available voices so user can see what's on their system
      console.log('[JIM voices]', voices.map(v => `${v.name} (${v.lang})`));

      const knownMaleNames = ['daniel', 'james', 'william', 'arthur', 'aaron', 'bruce', 'gordon', 'mark', 'david', 'male', 'guy', 'boy', 'alex', 'fred', 'oliver', 'liam', 'thomas', 'rishi', 'lee'];
      const isMale = (v) => knownMaleNames.some(name => v.name.toLowerCase().includes(name));
      const maleVoice = voices.find(v => v.lang.includes('en-AU') && isMale(v))
        || voices.find(v => v.lang.includes('en-GB') && isMale(v))
        || voices.find(v => v.lang.includes('en-US') && isMale(v))
        || voices.find(v => isMale(v))
        || voices.find(v => v.lang.includes('en-AU'))
        || voices[0];

      setJimLiveStatus('listening');

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        showToast('Speech recognition not supported', 'error');
        setJimLiveOpen(false);
        jimActiveRef.current = false;
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;  // IMPORTANT: false means one utterance per trigger
      recognition.interimResults = false;
      recognition.lang = getCC().locale;

      let isProcessing = false;
      let isSpeaking = false;
      let lastProcessedText = '';
      const active = () => !jimCancelledRef.current;
      const tryRestart = (delay = 300) => setTimeout(() => {
        if (active() && !isProcessing && !isSpeaking) {
          try { recognition.start(); } catch(_) {}
        }
      }, delay);

      recognition.onstart = () => setJimLiveStatus('listening');

      recognition.onresult = async (event) => {
        if (isProcessing) return;
        const userText = event.results[0][0].transcript.trim();
        if (!userText || userText === lastProcessedText) return;
        lastProcessedText = userText;
        isProcessing = true;
        setJimLiveTranscript(prev => [...prev, { role: 'user', text: userText }]);
        setJimLiveStatus('thinking');

        try {
          const response = await smartFetchAI(
            'light',
            [{ parts: [{ text: `${buildJimContext()}\n\nUser said: "${userText}"\n\nReply as JIM. No greeting. Get straight to the point. 1-2 sentences max, use actual job data.` }] }],
            { temperature: 0.7, maxOutputTokens: 150 },
            user,
            geminiModel,
            userApiKey
          );
          if (!active()) { isProcessing = false; return; }

          let jimResponse = response?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry mate, couldn't get an answer.";
          jimResponse = jimResponse.replace(/\[.*?\]/g, '').replace(/\(.*?\)/g, '').trim();
          setJimLiveTranscript(prev => [...prev, { role: 'jim', text: jimResponse }]);

          const utterance = new SpeechSynthesisUtterance(jimResponse);
          utterance.rate = 0.95;
          utterance.pitch = 0.7;
          utterance.volume = 1;
          if (maleVoice) utterance.voice = maleVoice;

          utterance.onstart = () => { isSpeaking = true; setJimLiveStatus('speaking'); };
          utterance.onend = () => {
            isSpeaking = false;
            isProcessing = false;
            lastProcessedText = '';
            if (active()) { setJimLiveStatus('listening'); tryRestart(500); }
            else { jimActiveRef.current = false; }
          };
          utterance.onerror = () => {
            isSpeaking = false;
            isProcessing = false;
            if (active()) { setJimLiveStatus('listening'); tryRestart(500); }
          };

          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utterance);

        } catch (err) {
          setJimLiveTranscript(prev => [...prev, { role: 'jim', text: `Couldn't connect: ${err.message}` }]);
          isProcessing = false;
          if (active()) { setJimLiveStatus('listening'); tryRestart(1000); }
        }
      };

      recognition.onerror = (event) => {
        if (event.error === 'not-allowed') {
          showToast('Microphone access denied', 'error');
          stopJimLive();
        } else if (event.error !== 'no-speech' && event.error !== 'aborted') {
          setJimLiveStatus('error');
          tryRestart(2000);
        } else if (active() && !isProcessing) {
          tryRestart(300);
        }
      };

      recognition.onend = () => {
        if (active() && !isProcessing && !isSpeaking) tryRestart(300);
      };

      jimRecognitionRef.current = recognition;
      recognition.start();
    };

    const stopJimLive = () => {
      jimCancelledRef.current = true;
      jimActiveRef.current = false;

      if (jimRecognitionRef.current) {
        try {
          jimRecognitionRef.current.stop();
        } catch(e) {}
        jimRecognitionRef.current = null;
      }

      window.speechSynthesis.cancel();
      setJimLiveOpen(false);
      setJimLiveStatus('idle');
    };

    const handleMicTap = () => {
          // Always kill current speech
          window.speechSynthesis.cancel();

          if (jimLiveStatus === 'speaking' || jimLiveStatus === 'thinking') {
            // If he's talking/thinking, stop him and go idle
            if (jimRecognitionRef.current) {
              try { jimRecognitionRef.current.stop(); } catch(e) {}
            }
            setJimLiveStatus('idle');
          } else {
            // If he's idle or already listening, force a fresh listen
            if (jimRecognitionRef.current) {
              try { jimRecognitionRef.current.abort(); } catch(e) {}
            }
            setJimLiveStatus('listening');
            setTimeout(() => {
              if (jimRecognitionRef.current) {
                try { jimRecognitionRef.current.start(); } catch(e) {}
              }
            }, 100);
          }
        };

    const showConfirm = (message, onConfirm, confirmLabel = 'Delete', danger = true) => setConfirmDialog({ message, onConfirm, confirmLabel, danger });
    const dismissConfirm = () => setConfirmDialog(null);
    const openAppointmentForJob = (jobId) => { const job = jobs.find(j => j.id === jobId); if (!job) return; setAppointmentFromJob({ id: null, title: `Work: ${job.address}`, jobId, start: formatLocal(new Date(), 'iso-datetime'), end: formatLocal(new Date(Date.now()+2*3600*1000), 'iso-datetime'), notes: '', googleEventId: null }); };
    const openTimeEntryForJob = (jobId) => {
          setTimeEntryModal({
            id: null,
            date: formatLocal(new Date(), 'iso-date'),
            startTime: '08:00',
            endTime: '16:00',
            jobId,
            category: 'Site Work',
            notes: ''
          });
        };

    const handleNewJobClick = (type) => { setNewJobModal(type); };
    const handleUnlockSuccess = () => { setIsUnlocked(true); };

    const handleGenerateDocument = async (customPrompt) => {
      setIsGenerating(true);
      try {
        const job = activeJob;
        const cc = getCC();
        const biz = businessProfile || {};
        const qt = getQuoteTotals(job.tasks, job.gstEnabled, extraTaxRate);
        const docType = isCompletionDoc(job) ? 'Completion Invoice' : 'Quotation';
        const taxLine = job.gstEnabled ? `Total includes ${cc.taxLabel} at ${cc.taxRate}%.` : `${cc.taxLabel} not applied.`;
        const prompt = `You are a professional ${cc.name} trade document writer. Generate a formal ${docType} suitable for a ${cc.name} client. Currency: ${cc.symbol} (${cc.currency}). Tax: ${cc.taxLabel}. ${taxLine}

Business: ${biz.name || 'the contractor'}${biz.abn ? ` (${cc.regLabel} ${biz.abn})` : ''}${biz.phone ? `, ${biz.phone}` : ''}.
Job: Address: ${job.address}, Client: ${job.clientName || 'the client'}.
Total: ${cc.symbol}${qt.total.toFixed(2)}.

Tasks (use these exactly — do not invent items):
${JSON.stringify(job.tasks.map((t,i)=>({index:i+1,title:t.title,time:t.time,rate:t.rate,materialsCost:t.materialsCost,materials:t.materials,desc:t.desc})))}

Rules:
- Use ${cc.name} English, terms, and conventions.
- Do not invent prices, dates, or scope items not in the data above.
- "summary" is a short opening paragraph addressing the client. Use \\n\\n for line breaks.
- "footer" is a short closing paragraph (payment expectations or thanks).

Extra instructions from the tradie: ${customPrompt || 'None'}

Return ONLY a valid JSON object with: "summary", "tasks" (array of {title, desc}), "footer".`;

        const resData = await smartFetchAI(
          'heavy',
          [{ parts: [{ text: prompt }] }],
          { temperature: 0.3, response_mime_type: 'application/json' },
          user,
          geminiModel,
          userApiKey
        );
        const raw = resData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const result = JSON.parse(raw.replace(/```json\n?|```/g, '').trim());

        const updatedTasks = job.tasks.map((t, idx) => ({ ...t, desc: result.tasks?.[idx]?.desc || t.desc, title: result.tasks?.[idx]?.title || t.title }));
        setPrintPreviewJob({ ...job, projectNotes: result.summary + (result.footer ? '\n\n' + result.footer : ''), tasks: updatedTasks });
        setShowAIAssistModal(false);
        showToast(`JIM built your ${docType} — look it over!`, 'success');
      } catch (err) {
        showToast('Failed to generate document: ' + err.message, 'error');
      }
      finally { setIsGenerating(false); }
    };

    const toggleVoice = (fieldKey, setter) => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) return showToast('Voice dictation not supported in this browser.', 'error');
      if (listeningField === fieldKey) { recognitionRef.current?.stop(); setListeningField(null); return; }
      if (listeningField) { recognitionRef.current?.stop(); }
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onstart = () => setListeningField(fieldKey);
      recognition.onresult = (e) => { const t = e.results[0][0].transcript; setter(prev => prev ? prev + ' ' + t : t); };
      recognition.onerror = () => setListeningField(null);
      recognition.onend = () => setListeningField(null);
      recognition.start();
    };

    const [isAiSuggesting, setIsAiSuggesting] = useState(false);
    const handleAiSuggest = async () => {
      if (!taskData.title.trim() && !taskData.desc.trim()) { showToast('Enter at least a title or description first.', 'error'); return; }
      setIsAiSuggesting(true);
      const cc = getCC();
      const prompt = `You are a ${cc.name} construction trade assistant. Suggest realistic values for this task. Currency is ${cc.currency} (${cc.symbol}). Use ${cc.name} trade terminology, supplier names, and material conventions.

Task so far:
  Title: ${taskData.title || 'Not provided'}
  Description: ${taskData.desc || 'Not provided'}

Rules:
- materials and tools must be newline-separated (one item per line). Do NOT separate with commas — items often contain commas (e.g. sizes, colours).
- rate is numeric ${cc.currency}/hr.
- materialsCost is numeric ${cc.currency} (lump-sum estimate).
- desc is a short factual sentence, not a paragraph.

Return ONLY a valid JSON object with keys: "title", "time" (e.g. "2h 30m"), "rate", "materialsCost", "materials" (string with \\n between items), "tools" (string with \\n between items), "desc".`;
      try {
        const resData = await smartFetchAI(
          'light',
          [{ parts: [{ text: prompt }] }],
          { temperature: 0.3, response_mime_type: 'application/json' },
          user,
          geminiModel,
          userApiKey
        );
        const raw = resData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const json = JSON.parse(raw.replace(/```json\n?|```/g, '').trim());
        const toListString = (v) => Array.isArray(v) ? v.filter(Boolean).join('\n') : String(v||'');
        const aiMaterials = toListString(json.materials);
        const aiTools = toListString(json.tools);
        setTaskData(prev => ({ ...prev, title: json.title||prev.title, time: json.time||prev.time, rate: json.rate||prev.rate, materialsCost: json.materialsCost||prev.materialsCost, materials: aiMaterials||prev.materials, tools: aiTools||prev.tools, desc: json.desc||prev.desc }));
        showToast('Suggestions applied!', 'success');
      } catch (err) {
        showToast(`AI suggest failed: ${err.message}`, 'error');
      }
      finally { setIsAiSuggesting(false); }
    };

    const handleProfessionalize = async () => {
      if (!taskData.desc) return showToast('Enter description first', 'error');
      setIsProfessionalizing(true);
      try {
        const cc = getCC();
        const prompt = `Rewrite this rough field note into a professional, concise client-facing description for a ${cc.name} trade quote. Keep the same length range (1-3 sentences). Use ${cc.name} English. Do not add scope, prices, or details that aren't in the original. Return ONLY the rewritten text — no quotes, no intro: "${taskData.desc}"`;
        const resData = await smartFetchAI(
          'light',
          [{ parts: [{ text: prompt }] }],
          { temperature: 0.2 },
          user,
          geminiModel,
          userApiKey
        );
        const text = resData.candidates[0].content.parts[0].text.trim();
        setTaskData(p => ({...p, desc: text}));
        showToast('Text professionalized!', 'success');
      } catch (e) {
        showToast("JIM couldn't polish that one", 'error');
      } finally { setIsProfessionalizing(false); }
    };

    const handleScanReceipt = async (e) => {
      const file = e.target.files[0]; if (!file) return;
      setIsScanningReceipt(true);
      try {
        const base64Data = await compressImage(file);
        const cc = getCC();
        const textPrompt = `You are an OCR JSON extraction tool reading a ${cc.name} trade-supply receipt. Currency: ${cc.currency} (${cc.symbol}). Tax: ${cc.taxLabel}.

Rules:
- "cost" is the FINAL grand total on the receipt (tax-inclusive if ${cc.taxLabel} is shown).
- "items" is a newline-separated list (one item per line). Do NOT separate with commas — product names often contain commas (sizes, colours).
- If a value isn't visible on the receipt, return empty string or 0. Never invent.

Return ONLY a valid JSON object. Format: {"cost": 123.45, "items": "Hammer\\nNails 75mm box of 100"}`;

        const resData = await smartFetchAI(
          'light',
          [{ parts: [{ text: textPrompt }, { inlineData: { mimeType: 'image/webp', data: base64Data.split(',')[1] } }] }],
          { temperature: 0, response_mime_type: 'application/json' },
          user,
          geminiModel,
          userApiKey
        );

        const raw = resData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const json = JSON.parse(raw.replace(/```json\n?|```/g, '').trim());
        const newItems = Array.isArray(json.items) ? json.items.filter(Boolean).join('\n') : String(json.items || '');
        setTaskData(prev => ({ ...prev, materialsCost: json.cost ? String(json.cost) : prev.materialsCost, materials: prev.materials ? prev.materials + (newItems ? '\n' + newItems : '') : newItems }));
        showToast('Receipt scanned successfully!', 'success');
      } catch (err) {
        showToast(`Receipt scan failed: ${err.message}`, 'error');
      }
      finally { setIsScanningReceipt(false); }
      e.target.value = '';
    };

    const [saveTemplateName, setSaveTemplateName] = useState('');
    const [isNamingTemplate, setIsNamingTemplate] = useState(false);
    const handleSaveAsTemplate = () => { if (!taskData.title) return showToast('Task title is required.', 'error'); setIsNamingTemplate(true); setSaveTemplateName(''); };
    const confirmSaveTemplate = () => {
      if (!saveTemplateName.trim()) return;
      const tpl = { name: saveTemplateName.trim(), type: activeJob?.type || 'quote', data: { title: taskData.title, time: taskData.time, rate: taskData.rate, materialsCost: taskData.materialsCost, materials: taskData.materials, tools: taskData.tools, desc: taskData.desc } };
      saveUserTemplates([...userTemplates, tpl]); setIsNamingTemplate(false); showToast('Template Saved!', 'success');
    };
    const handleSaveMaterial = () => {
      const matName = String(taskData.materials || '').trim(); const matCost = String(taskData.materialsCost || '').trim();
      if (!matName || !matCost) return;
      if (userMaterials.find(m => String(m.name)===matName && String(m.price)===matCost)) return;
      saveUserMaterials([...userMaterials, { name: matName, price: matCost }]); showToast('Material Saved!', 'success');
    };
    const exportData = () => { const blob = new Blob([JSON.stringify(jobs, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `jim-backup-${formatLocal(new Date(), 'iso-date')}.json`; a.click(); URL.revokeObjectURL(url); };
    const importData = (e) => {
      const file = e.target.files[0]; if (!file) return; e.target.value = '';
      const reader = new FileReader();
      reader.onload = async (ev) => {
        try {
          const imported = JSON.parse(ev.target.result);
          if (!Array.isArray(imported)) throw new Error('Invalid format');
          showConfirm(`Found ${imported.length} project(s). This will replace ALL current data. Are you sure?`, async () => { const migrated = imported.map(j => { const mj={...j}; if (mj.type==='handover' && mj.showCosts===undefined) mj.showCosts=false; if (mj.type==='quote' && mj.showCosts===undefined) mj.showCosts=true; if (!mj.createdAt) mj.createdAt = mj.date?new Date(mj.date).getTime():Date.now(); return mj; }); await saveToDB(migrated); window.location.reload(); }, 'Replace All');
        } catch { showToast('Invalid backup file.', 'error'); }
      };
      reader.readAsText(file);
    };

    const handleCreateJob = (address, clientName, clientPhone, tasks = [], dueDate = '', clientEmail = '') => {
      const now = Date.now();
      const isHandover = newJobModal === 'handover';
      const newJob = {
        id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : now.toString(),
        date: new Date(now).toISOString(), createdAt: now, type: newJobModal,
        address, clientName, clientPhone, clientEmail, clientRef: '',
        dueDate: dueDate || '', projectNotes: '', projectPhotos: [],
        tasks: tasks.map(t => ({ ...t, id: Date.now() + Math.random() })),
        status: isHandover ? 'completed' : 'draft',
        gstEnabled: false, showCosts: isHandover ? false : true,
        invoiceNumber: '', amountPaid: 0,
        approvedAt: null, startedAt: null,
        completedAt: isHandover ? now : null,
        invoicedAt: null, paidAt: null, rejectedAt: null,
        rejectionReason: null, rejectionNote: ''
      };
      saveToDB([...jobs, newJob]); setNewJobModal(null); showToast('Project Created', 'success');
    };
    const STATUS_TIMESTAMP = { approved:'approvedAt', in_progress:'startedAt', completed:'completedAt', invoiced:'invoicedAt', paid:'paidAt' };
    const nextStatusFor = (status) => {
      const i = HAPPY_PATH.indexOf(status || 'draft');
      if (i === -1 || i === HAPPY_PATH.length - 1) return null;
      return HAPPY_PATH[i+1];
    };
    const advanceStatus = (id) => {
      const j = jobs.find(x=>x.id===id); if (!j) return;
      const next = nextStatusFor(j.status || 'draft');
      if (!next) return;
      const updates = { status: next };
      const tsField = STATUS_TIMESTAMP[next];
      if (tsField && !j[tsField]) updates[tsField] = Date.now();
      if (next === 'invoiced' && !j.invoiceNumber) {
        const count = jobs.filter(x=>x.invoiceNumber).length + 1;
        updates.invoiceNumber = `INV-${new Date().getFullYear()}-${String(count).padStart(3,'0')}`;
      }
      saveToDB(jobs.map(x=>x.id===id?{...x,...updates}:x));
    };
    const revertStatus = (id) => {
      const j = jobs.find(x=>x.id===id); if (!j) return;
      const cur = j.status || 'draft';
      const i = HAPPY_PATH.indexOf(cur);
      if (i <= 0) return;
      const prev = HAPPY_PATH[i-1];
      const updates = { status: prev };
      const tsField = STATUS_TIMESTAMP[cur];
      if (tsField) updates[tsField] = null;
      if (cur === 'invoiced') updates.invoiceNumber = null;
      saveToDB(jobs.map(x=>x.id===id?{...x,...updates}:x));
      showToast(`Reverted to ${getStatus(prev).label}`, 'info');
    };
    const rejectJob = (id, reason, note = '') => {
      const j = jobs.find(x=>x.id===id); if (!j) return;
      if (!['draft','sent','approved'].includes(j.status || 'draft')) return;
      saveToDB(jobs.map(x=>x.id===id?{...x, status:'rejected', rejectedAt:Date.now(), rejectionReason:reason||'other', rejectionNote:note||''}:x));
      showToast('Quote moved to Lost pile', 'info');
    };
    const reopenJob = (id) => {
      const j = jobs.find(x=>x.id===id); if (!j || j.status !== 'rejected') return;
      saveToDB(jobs.map(x=>x.id===id?{...x, status:'sent', rejectedAt:null, rejectionReason:null, rejectionNote:''}:x));
      showToast('Quote reopened', 'success');
    };
    const saveAmountPaid = (id, amount) => saveToDB(jobs.map(j=>j.id===id?{...j,amountPaid:parseFloat(amount)||0}:j));
    const toggleGST = (id) => saveToDB(jobs.map(j=>j.id===id?{...j,gstEnabled:!j.gstEnabled}:j));
    const toggleCosts = (id) => saveToDB(jobs.map(j=>j.id===id?{...j,showCosts:!j.showCosts}:j));
    const startEditHeader = () => { setHeaderDraft({ address: activeJob.address, clientName: activeJob.clientName, clientPhone: activeJob.clientPhone||'', clientEmail: activeJob.clientEmail||'', clientRef: activeJob.clientRef||'', dueDate: activeJob.dueDate||'', projectNotes: activeJob.projectNotes||'', projectPhotos: activeJob.projectPhotos||[] }); setIsEditingHeader(true); };
    const saveHeaderEdit = () => { if (!headerDraft.address.trim()) return; saveToDB(jobs.map(j => j.id===activeJobId ? { ...j, address:headerDraft.address.trim(), clientName:headerDraft.clientName, clientPhone:headerDraft.clientPhone, clientEmail:headerDraft.clientEmail, clientRef:headerDraft.clientRef, dueDate:headerDraft.dueDate, projectNotes:headerDraft.projectNotes, projectPhotos:headerDraft.projectPhotos } : j)); setIsEditingHeader(false); showToast('Details Updated', 'success'); };
    const handleProjectPhotoUpload = async (e) => { try { const c = await Promise.all(Array.from(e.target.files).map(compressImage)); setHeaderDraft(d => ({...d,projectPhotos:[...d.projectPhotos,...c]})); } catch { showToast('One or more images could not be processed.', 'error'); } };

    const handleSaveTask = () => {
      if (!taskData.title) return showToast('Task title is required.', 'error');
      if (!activeJob) return;
      const updated = editingTaskId ? activeJob.tasks.map(t => t.id===editingTaskId ? { ...taskData, id:editingTaskId } : t) : [...activeJob.tasks, { ...taskData, id: Date.now() }];
      saveToDB(jobs.map(j => j.id===activeJobId ? { ...j, tasks:updated } : j));
      closeModal(); showToast('Entry Saved', 'success');
    };
    const closeModal = () => { recognitionRef.current?.stop(); recognitionRef.current = null; setListeningField(null); setIsTaskFormOpen(false); setEditingTaskId(null); setTaskData(EMPTY_TASK); setRateError(false); setMatError(false); setIsNamingTemplate(false); };
    const handleImageUpload = async (e) => { try { const c = await Promise.all(Array.from(e.target.files).map(compressImage)); setTaskData(p=>({...p,images:[...p.images,...c]})); } catch { showToast('One or more images could not be processed.', 'error'); } };
    const validateRate = (val) => { const n = parseFloat(val); setRateError(val !== '' && isNaN(n)); };
    const validateMat = (val) => { const n = parseFloat(val); setMatError(val !== '' && isNaN(n)); };
    const toggleJobSelection = (id) => setSelectedJobs(prev => prev.includes(id) ? prev.filter(x=>x!==id) : prev.length>=MAX_STOPS ? prev : [...prev,id]);
    const clearSelection = () => setSelectedJobs([]);
    const selectAllVisible = () => setSelectedJobs(prev => { const e=new Set(prev); return [...prev,...filteredJobs.map(j=>j.id).filter(id=>!e.has(id))].slice(0,MAX_STOPS); });

    const getMyLocation = () => { if (!navigator.geolocation) { setLocStatus('denied'); return; } setLocStatus('loading'); navigator.geolocation.getCurrentPosition((pos) => { setCurrentCoords({lat:pos.coords.latitude,lng:pos.coords.longitude}); setLocStatus('ok'); }, () => { setLocStatus('denied'); setUseMyLocation(false); }); };
    const handleLocToggle = () => { const next=!useMyLocation; setUseMyLocation(next); if (next && locStatus==='idle') getMyLocation(); };
    const openGoogleMaps = () => {
      const ordered = selectedJobs.map(id=>jobs.find(j=>j.id===id)).filter(Boolean);
      if (!ordered.length) return;
      let origin, stops;
      if (useMyLocation && currentCoords) { origin=`${currentCoords.lat},${currentCoords.lng}`; stops=ordered; }
      else { origin=encodeURIComponent(ordered[0].address); stops=ordered.slice(1); }
      const dest = stops.length>0 ? encodeURIComponent(stops[stops.length-1].address) : origin;
      const wps = stops.slice(0,-1).map(j=>encodeURIComponent(j.address)).join('|');
      let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&travelmode=driving`;
      if (wps) url += `&waypoints=${wps}`;
      window.open(url, '_blank', 'noopener');
    };

    const stopTimer = () => {
      const elapsedMins = Math.floor((Date.now() - activeTimer.startTime) / 60000);
      setActiveJobId(activeTimer.jobId);
      setViewMode('detail');
      setTaskData({ ...EMPTY_TASK, time: fmtMins(elapsedMins) });
      setIsTaskFormOpen(true);
      setActiveTimer(null);
    };

    const atStopLimit = selectedJobs.length >= MAX_STOPS;
    const filteredJobs = jobs
      .filter(j => {
        if (filterType==='all') return j.status !== 'rejected';
        if (filterType==='clients') return true;
        if (filterType==='unpaid') return ['sent','approved','in_progress','completed','invoiced'].includes(j.status);
        if (filterType==='quotes') return ['draft','sent'].includes(j.status);
        if (filterType==='working') return ['approved','in_progress'].includes(j.status);
        if (filterType==='to_invoice') return j.status === 'completed';
        if (filterType==='owed') return j.status === 'invoiced';
        if (filterType==='paid') return j.status === 'paid';
        if (filterType==='lost') return j.status === 'rejected';
        return j.type===filterType;
      })
      .filter(j => !searchQ.trim() || (j.address || '').toLowerCase().includes(searchQ.toLowerCase()) || (j.clientName||'').toLowerCase().includes(searchQ.toLowerCase()))
      .sort((a,b) => {
        if (sortBy === 'created_desc') return (b.createdAt || 0) - (a.createdAt || 0);
        if (sortBy === 'created_asc') return (a.createdAt || 0) - (b.createdAt || 0);
        if (sortBy === 'due_asc') { if (!a.dueDate) return 1; if (!b.dueDate) return -1; return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(); }
        if (sortBy === 'due_desc') { if (!a.dueDate) return 1; if (!b.dueDate) return -1; return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime(); }
        if (sortBy === 'az') return String(a.address || '').localeCompare(String(b.address || ''));
        return 0;
      });

    const handleShare = async () => {
      if (!activeJob) return;
      const qt = getQuoteTotals(activeJob.tasks, activeJob.gstEnabled, extraTaxRate);
      let text = `Project: ${activeJob.address}\nClient: ${activeJob.clientName || 'N/A'}\n`;
      if (qt && qt.total > 0) text += `Total Est: ${fmtAUD(qt.total)}\n`;
      text += `\nSummary of Works:\n` + activeJob.tasks.map(t => `- ${t.title} (${t.time})`).join('\n');
      if (navigator.share) { try { await navigator.share({ title: 'Job Summary', text }); } catch(e) {} }
      else { navigator.clipboard.writeText(text); showToast('Summary copied to clipboard!', 'success'); }
    };

    const handleUpdateJobFromPreview = (updatedJob) => {
      const updatedJobs = jobs.map(j => (j.id === updatedJob.id ? updatedJob : j));
      saveToDB(updatedJobs);
      setPrintPreviewJob(updatedJob);
    };

    // Canvas helpers
    const resetView = () => { setCanvasZoom(1); zoomRef.current=1; setCanvasPan({x:0,y:0}); panRef.current={x:0,y:0}; setCanvasMode('draw'); modeRef.current='draw'; };
    useEffect(() => {
      if (editingImageIdx !== null && canvasRef.current) {
        resetView();
        const cvs = canvasRef.current, ctx = cvs.getContext('2d'), img = new Image();
        img.src = taskData.images[editingImageIdx];
        img.onload = () => { cvs.width=img.width; cvs.height=img.height; ctx.drawImage(img,0,0,img.width,img.height); setUndoStack([cvs.toDataURL('image/webp', 0.8)]); };
      }
    }, [editingImageIdx, taskData.images]);
    const getCoords = (e) => { const cvs=canvasRef.current, r=cvs.getBoundingClientRect(); let cx=e.clientX, cy=e.clientY; if (e.touches?.length>0) { cx=e.touches[0].clientX; cy=e.touches[0].clientY; } return { x:(cx-r.left)*(cvs.width/r.width), y:(cy-r.top)*(cvs.height/r.height) }; };
    const startDraw = (e) => { setIsDrawing(true); drawRef.current=true; const {x,y}=getCoords(e), ctx=canvasRef.current.getContext('2d'); ctx.strokeStyle=penColor; ctx.lineWidth=Math.max(3,canvasRef.current.width/100); ctx.lineCap='round'; ctx.lineJoin='round'; ctx.beginPath(); ctx.moveTo(x,y); };
    const doDraw = (e) => { if (!drawRef.current) return; e.preventDefault(); const {x,y}=getCoords(e), ctx=canvasRef.current.getContext('2d'); ctx.lineTo(x,y); ctx.stroke(); };
    const stopDraw = () => { if (!drawRef.current) return; setIsDrawing(false); drawRef.current=false; setUndoStack(p=>[...p.slice(-4),canvasRef.current.toDataURL('image/webp',0.7)]); };
    const handleUndo = () => { if (undoStack.length<=1) return; const ns=[...undoStack]; ns.pop(); const img=new Image(); img.src=ns[ns.length-1]; img.onload=()=>{ const ctx=canvasRef.current.getContext('2d'); ctx.clearRect(0,0,canvasRef.current.width,canvasRef.current.height); ctx.drawImage(img,0,0,canvasRef.current.width,canvasRef.current.height); setUndoStack(ns); }; };
    const handleClear = () => { if (undoStack.length<=1) return; const img=new Image(); img.src=undoStack[0]; img.onload=()=>{ const ctx=canvasRef.current.getContext('2d'); ctx.clearRect(0,0,canvasRef.current.width,canvasRef.current.height); ctx.drawImage(img,0,0,canvasRef.current.width,canvasRef.current.height); setUndoStack([undoStack[0]]); }; };
    const saveAnnotated = () => { if (!canvasRef.current) return; const imgs=[...taskData.images]; imgs[editingImageIdx]=canvasRef.current.toDataURL('image/webp',0.8); setTaskData(p=>({...p,images:imgs})); setEditingImageIdx(null); };
    const dist2 = (t1,t2) => Math.hypot(t1.clientX-t2.clientX, t1.clientY-t2.clientY);
    const onTouchStart = (e) => { if (e.touches.length===2) { if (drawRef.current) { drawRef.current=false; setIsDrawing(false); setUndoStack(p=>[...p.slice(-4),canvasRef.current.toDataURL('image/webp',0.7)]); } pinchRef.current={ dist:dist2(e.touches[0],e.touches[1]), zoom:zoomRef.current }; } else if (e.touches.length===1) { pinchRef.current=null; if (modeRef.current==='pan') { panStartRef.current={ clientX:e.touches[0].clientX, clientY:e.touches[0].clientY, panX:panRef.current.x, panY:panRef.current.y }; } else startDraw(e); } };
    const onTouchMove = (e) => { e.preventDefault(); if (e.touches.length===2 && pinchRef.current) { const nz=Math.min(Math.max(pinchRef.current.zoom*(dist2(e.touches[0],e.touches[1])/pinchRef.current.dist),1),6); setCanvasZoom(nz); zoomRef.current=nz; } else if (e.touches.length===1) { if (modeRef.current==='pan' && panStartRef.current) { const np={ x:panStartRef.current.panX+(e.touches[0].clientX-panStartRef.current.clientX), y:panStartRef.current.panY+(e.touches[0].clientY-panStartRef.current.clientY) }; setCanvasPan(np); panRef.current=np; } else if (modeRef.current==='draw') doDraw(e); } };
    const onTouchEnd = (e) => { if (e.touches.length<2) pinchRef.current=null; if (e.touches.length===0) { panStartRef.current=null; if (modeRef.current==='draw') stopDraw(); } };
    const toggleMode = () => { const n=modeRef.current==='draw'?'pan':'draw'; setCanvasMode(n); modeRef.current=n; };
    const onMDown = (e) => { if (modeRef.current==='draw') startDraw(e); else panStartRef.current={clientX:e.clientX,clientY:e.clientY,panX:panRef.current.x,panY:panRef.current.y}; };
    const onMMove = (e) => { if (modeRef.current==='draw') doDraw(e); else if (modeRef.current==='pan' && panStartRef.current) { const np={x:panStartRef.current.panX+(e.clientX-panStartRef.current.clientX),y:panStartRef.current.panY+(e.clientY-panStartRef.current.clientY)}; setCanvasPan(np); panRef.current=np; } };
    const onMUp = () => { panStartRef.current=null; stopDraw(); };

    const expiringCreds = (businessProfile?.credentials || []).filter(c => isExpiringSoon(c.expiry) || isExpired(c.expiry));
    const expiringLicences = expiringCreds;
    const insuranceExpiring = false;
    const actionBtnClass = "flex items-center justify-center gap-1.5 h-10 px-3 rounded-lg text-xs font-semibold border transition-all active:scale-95";

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">
          <div className="flex flex-col items-center gap-4">
            <JimMascot size={72} state="wave"/>
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Loading JIM…</p>
          </div>
        </div>
      );
    }

    const jimBusy = jimLiveOpen || isGenerating || isAiSuggesting || isScanningReceipt || isProfessionalizing || isAnalyzingLost;

    return (
      <div className="min-h-screen nav-spacing relative">
        {toast && <ToastMessage message={toast.message} type={toast.type} onClose={() => setToast(null)}/>}
        {confirmDialog && <ConfirmDialog message={confirmDialog.message} confirmLabel={confirmDialog.confirmLabel} danger={confirmDialog.danger} onConfirm={() => { confirmDialog.onConfirm(); dismissConfirm(); }} onCancel={dismissConfirm}/>}
        {jimBusy && <FloatingJimMascot status={jimLiveOpen ? jimLiveStatus : 'thinking'}/>}

        {/* Top Header */}
        <header className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-md text-slate-900 dark:text-white px-4 h-14 sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center no-print overflow-hidden">
          <div className="flex items-center gap-2.5 cursor-pointer min-w-0 flex-1" onClick={() => { setViewMode('dashboard'); setSelectionMode(false); }}>
            {businessProfile?.logo
              ? <img src={businessProfile.logo} className="h-9 w-9 object-contain rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 flex-shrink-0" alt=""/>
              : jimBusy ? <div className="h-9 w-9 flex-shrink-0"/> : <DraggableJim size={36}/>}
            <div className="min-w-0">
              <h1 className="font-extrabold text-lg tracking-tight truncate leading-none">{viewMode === 'detail' ? 'Job Details' : (businessProfile?.name || 'JIM')}</h1>
              {viewMode !== 'detail' && userTier && userTier !== 'free' ? (
                <p className="text-[9px] font-black uppercase tracking-wider mt-0.5 leading-none">
                  <span className={`px-1.5 py-0.5 rounded-full ${userTier === 'tester' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400'}`}>{userTier}</span>
                </p>
              ) : (!businessProfile?.name && viewMode !== 'detail' && (
                <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1 leading-none truncate">Jobs Invoices Manager</p>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {viewMode === 'detail' && activeJob && (
              <>
                <button onClick={handleShare} aria-label="Share" className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 active:scale-95 transition-transform"><Share2 size={16}/></button>
                <button onClick={() => setPrintPreviewJob(activeJob)} className="flex items-center gap-1.5 h-10 px-3.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-bold text-xs active:scale-95 shadow-sm"><Printer size={14}/> PDF</button>
              </>
            )}
            <button onClick={() => startJimLive()} aria-label="Talk to JIM" title="Talk to JIM" className="w-10 h-10 flex items-center justify-center bg-purple-600 hover:bg-purple-500 text-white rounded-full active:scale-95 shadow-sm transition-colors">
              <Mic size={18}/>
            </button>
          </div>
        </header>

        {/* Credential expiry warning */}
        {(expiringLicences.length > 0 || insuranceExpiring) && viewMode === 'dashboard' && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-700/40 px-4 py-2.5 flex items-center gap-2 no-print cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors" onClick={() => setShowSettings(true)}>
            <AlertTriangle size={14} className="text-amber-500 flex-shrink-0"/>
            <p className="text-xs text-amber-700 dark:text-amber-400 font-bold flex-1">{expiringCreds.map(c=>c.label||'Credential').join(', ')} — credential{expiringCreds.length > 1 ? 's' : ''} expiring or expired</p>
            <ChevronRight size={14} className="text-amber-500 flex-shrink-0"/>
          </div>
        )}

        {/* Schedule View */}
        {viewMode==='schedule' && <ScheduleView jobs={jobs} appointments={appointments} timesheets={timesheets} onSaveAppointment={handleSaveAppointment} onDeleteAppointment={handleDeleteAppointment} showConfirm={showConfirm} onScheduleFromJob={openAppointmentForJob} showToast={showToast} onNewTimeEntry={() => setTimeEntryModal({id: null, date: formatLocal(new Date(), 'iso-date'), startTime: '08:00', endTime: '16:00', jobId: '', category: 'Site Work', notes: ''})} onEditTimeEntry={(entry) => setTimeEntryModal(entry)} businessProfile={businessProfile} />}

        {/* Dashboard */}
        {viewMode==='dashboard' && (
          <main className="p-4 max-w-2xl mx-auto animate-slide-down">
            {selectionMode && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0"><Navigation size={15} className="text-orange-400"/></div>
                  <div><p className="text-white font-bold text-sm">Route Planning</p><p className="text-slate-400 text-xs font-medium mt-0.5">Tap jobs in visit order. Numbers show your stop sequence.</p></div>
                </div>
                <div className="flex items-center justify-between bg-slate-800/60 rounded-xl px-3.5 py-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <LocateFixed size={14} className={locStatus==='ok'?'text-emerald-400':locStatus==='denied'?'text-red-400':'text-slate-400'}/>
                    <span className="text-white font-medium text-xs">{locStatus==='loading'?'Getting location…':locStatus==='denied'?'Location denied':locStatus==='ok'?'Using my location':'Start from my location'}</span>
                  </div>
                  <button onClick={handleLocToggle} aria-label="Toggle location" className={`w-10 h-6 rounded-full transition-all flex items-center px-0.5 ${useMyLocation&&locStatus==='ok'?'bg-emerald-500 justify-end':useMyLocation&&locStatus==='loading'?'bg-orange-500 justify-end':'bg-slate-700 justify-start'}`}><div className="w-5 h-5 rounded-full bg-white shadow"/></button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <button onClick={selectAllVisible} disabled={atStopLimit} className={`text-xs font-semibold px-3 h-8 rounded-lg transition-all ${atStopLimit?'text-slate-600 cursor-not-allowed':'text-slate-300 hover:bg-slate-800'}`}>Select all</button>
                    {selectedJobs.length > 0 && <button onClick={clearSelection} className="text-xs font-semibold px-3 h-8 rounded-lg text-red-400 hover:bg-red-900/30">Clear</button>}
                  </div>
                  <span className={`text-xs font-semibold ${atStopLimit?'text-amber-400':'text-slate-400'}`}>{selectedJobs.length}/{MAX_STOPS} stops</span>
                </div>
              </div>
            )}
            {!selectionMode && (
              <>
                {/* JIM Insight — speech bubble from the header mascot */}
                {(
                  <div className={`relative px-4 py-3 rounded-2xl mb-3 border ${jimInsight.state==='error' ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900/60' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
                    <div className={`absolute -top-1.5 left-4 w-3 h-3 rotate-45 border-l border-t ${jimInsight.state==='error' ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900/60' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}/>
                    <p className={`text-sm font-medium leading-snug ${jimInsight.state==='error' ? 'text-red-700 dark:text-red-300' : 'text-slate-700 dark:text-slate-300'}`}>{jimInsight.msg}</p>
                  </div>
                )}

                <div className="flex gap-2 mb-4">
                  <button onClick={() => handleNewJobClick('quote')} className="flex-[2] h-12 bg-orange-500 hover:bg-orange-400 text-white rounded-2xl text-sm font-bold shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all"><Plus size={18}/> New Quote</button>
                  <button onClick={() => handleNewJobClick('handover')} className="flex-1 h-12 bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"><CheckCircle2 size={16}/> Completion</button>
                </div>
              </>
            )}
            <div className="flex items-center gap-2 mb-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                <input className="w-full pl-9 pr-8 h-11 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 outline-none font-medium text-sm dark:text-white dark:placeholder-slate-500 focus:border-orange-400 transition-all" placeholder="Search address or client…" value={searchQ} onChange={e => setSearchQ(e.target.value)}/>
                {searchQ && <button onClick={() => setSearchQ('')} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X size={14}/></button>}
              </div>
              <div className="relative w-24 flex-shrink-0">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-full appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-3 h-11 pr-8 rounded-xl text-xs font-semibold outline-none focus:border-orange-400 cursor-pointer">
                  <option value="created_desc">Newest</option><option value="created_asc">Oldest</option><option value="due_asc">Due Soon</option><option value="due_desc">Due Late</option><option value="az">A-Z</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
              </div>
            </div>

            <div className="flex gap-1.5 overflow-x-auto custom-scrollbar mb-4 pb-1">
              {[
                {key:'all',label:'All'},
                {key:'quotes',label:'Quotes'},
                {key:'working',label:'Working'},
                {key:'to_invoice',label:'To Invoice'},
                {key:'owed',label:'Owed',icon:<Wallet size={12}/>},
                {key:'lost',label:'Lost'},
                {key:'clients',label:'Clients',icon:<Users size={12}/>}
              ].map(f => (
                <button key={f.key} onClick={() => setFilterType(f.key)}
                  className={`flex-shrink-0 px-3.5 h-8 flex items-center gap-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all
                    ${filterType===f.key
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}`}>
                  {f.icon}{f.label}
                </button>
              ))}
            </div>

            {filterType === 'clients' ? (
              <div className="grid gap-2">
                {clientsData.length === 0 && (
                  <div className="flex flex-col items-center py-16 gap-3">
                    <p className="text-slate-600 dark:text-slate-400 font-semibold text-sm">No clients yet</p>
                    <button onClick={startJimLive} className="flex items-center gap-1.5 px-4 h-9 bg-purple-50 dark:bg-purple-950/30 hover:bg-purple-100 dark:hover:bg-purple-950/50 text-purple-600 dark:text-purple-400 rounded-full text-xs font-bold border border-purple-200 dark:border-purple-800 transition-colors active:scale-95">
                      <Mic size={13}/> Voice Mode
                    </button>
                  </div>
                )}
                {clientsData.map((c, i) => {
                  const hasContact = c.phone || c.email;
                  return (
                    <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                      <div onClick={() => { setFilterType('all'); setSearchQ(c.name === '—' ? '' : c.name); }} className="p-3.5 flex items-center gap-3 cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-orange-600 dark:text-orange-400 text-sm">{(c.name || '?')[0].toUpperCase()}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-900 dark:text-white truncate text-[15px] leading-tight">{c.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {c.jobs.length} job{c.jobs.length!==1?'s':''}
                            {c.unpaidCount > 0 && <span className="text-amber-600 dark:text-amber-400 font-semibold"> · {c.unpaidCount} unpaid</span>}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-extrabold text-sm text-slate-900 dark:text-white whitespace-nowrap">{fmtAUD(c.totalValue)}</p>
                        </div>
                      </div>
                      {hasContact && (
                        <div className="flex gap-1 px-3 pb-3 -mt-1">
                          {c.phone && <a href={`tel:${c.phone}`} onClick={e=>e.stopPropagation()} className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 text-xs font-semibold transition-colors"><Phone size={12}/> Call</a>}
                          {c.phone && <a href={`sms:${c.phone}`} onClick={e=>e.stopPropagation()} className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 text-xs font-semibold transition-colors"><MessageSquare size={12}/> SMS</a>}
                          {c.email && <a href={`mailto:${c.email}`} onClick={e=>e.stopPropagation()} className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 text-xs font-semibold transition-colors"><Mail size={12}/> Email</a>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
            <div className="grid gap-2">
              {filterType === 'lost' && revenueStats.lostCount > 0 && (
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-2xl p-4 mb-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">Did not win</p>
                      <p className="font-extrabold text-slate-900 dark:text-white text-sm mt-1">{revenueStats.lostCount} quote{revenueStats.lostCount!==1?'s':''} · {fmtAUD(revenueStats.lost)}</p>
                    </div>
                    <button onClick={handleAnalyzeLostPile} disabled={isAnalyzingLost || revenueStats.lostQuotes < 1} className="h-9 px-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors flex-shrink-0">
                      <Sparkles size={13}/> {isAnalyzingLost ? 'Asking…' : 'Ask AI why'}
                    </button>
                  </div>
                  {lostAnalysis && (
                    <div className="mt-3 pt-3 border-t border-red-200/60 dark:border-red-900/40">
                      <p className="text-[13px] text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{lostAnalysis}</p>
                    </div>
                  )}
                </div>
              )}
              {filteredJobs.map(j => {
                const status = getStatus(j.status||'draft');
                const totals = getQuoteTotals(j.tasks, j.gstEnabled, extraTaxRate);
                const total = totals.total;
                const stopIdx = selectedJobs.indexOf(j.id);
                const isSelected = stopIdx !== -1;
                const canSelect = !atStopLimit || isSelected;
                const dueDate = j.dueDate ? new Date(j.dueDate) : null;
                const isDueSoon = dueDate && (dueDate - Date.now()) < 2 * 24 * 60 * 60 * 1000 && (dueDate - Date.now()) > 0;
                const isOverdue = dueDate && dueDate < Date.now();
                return (
                  <div key={j.id} onClick={() => { if (selectionMode) { if (canSelect) toggleJobSelection(j.id); } else { setActiveJobId(j.id); setViewMode('detail'); setIsEditingHeader(false); }}}
                    className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all cursor-pointer ${selectionMode?(isSelected?'border-orange-500 ring-2 ring-orange-500/20':canSelect?'border-slate-200 dark:border-slate-800 hover:border-slate-300':'border-slate-200 dark:border-slate-800 opacity-40 cursor-not-allowed'):j.status==='rejected'?'border-slate-200 dark:border-slate-800 opacity-70':'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}`}>
                    <div className="p-4 flex items-center gap-3">
                      {selectionMode && (<div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold transition-all ${isSelected?'bg-orange-500 text-white':'border-2 border-slate-300 dark:border-slate-700 text-transparent'}`}>{isSelected ? stopIdx+1 : ''}</div>)}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-900 dark:text-white text-[15px] leading-tight truncate">{j.address}</p>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          {!selectionMode && (
                            <>
                              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${status.cls}`}>{status.label}</span>
                              {j.status==='rejected' && j.rejectionReason && <span className="text-[10px] font-semibold text-red-500/80">{getRejectionLabel(j.rejectionReason)}</span>}
                              {isOverdueInvoice(j) && <span className="text-[10px] font-semibold text-red-500">Overdue</span>}
                              {isOverdue && j.status !== 'invoiced' && <span className="text-[10px] font-semibold text-red-500">Past due</span>}
                              {isDueSoon && !isOverdue && <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">Due soon</span>}
                            </>
                          )}
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{j.clientName||'—'}</p>
                        </div>
                        {!selectionMode && j.status !== 'rejected' && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-500 font-medium mt-0.5 truncate">{getNextActionHint(j)}</p>
                        )}
                      </div>
                      <div className="flex flex-col items-end flex-shrink-0">
                        {total > 0 ? (
                          <span className={`font-extrabold text-sm whitespace-nowrap ${j.status==='rejected' ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-900 dark:text-white'}`}>{fmtAUD(total)}</span>
                        ) : getTotals(j.tasks).mins > 0 ? (
                          <span className="font-bold text-slate-600 dark:text-slate-300 text-sm whitespace-nowrap">{getTotals(j.tasks).str}</span>
                        ) : null}
                        {j.status==='paid' && j.amountPaid>0 && <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">Paid</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredJobs.length===0 && (
                <div className="flex flex-col items-center py-16 gap-3">
                  <p className="text-slate-600 dark:text-slate-400 font-semibold text-sm">{searchQ ? 'No results' : 'No projects yet'}</p>
                  {!searchQ && (
                    <>
                      <p className="text-slate-500 dark:text-slate-500 text-xs text-center font-medium">Tap <span className="font-semibold">New Quote</span> to get started</p>
                      <button onClick={startJimLive} className="flex items-center gap-1.5 mt-1 px-4 h-9 bg-purple-50 dark:bg-purple-950/30 hover:bg-purple-100 dark:hover:bg-purple-950/50 text-purple-600 dark:text-purple-400 rounded-full text-xs font-bold border border-purple-200 dark:border-purple-800 transition-colors active:scale-95">
                        <Mic size={13}/> Voice Mode
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            )}

            {/* Revenue Snapshot — bottom of dashboard */}
            {!selectionMode && (revenueStats.pipeline > 0 || revenueStats.booked > 0 || revenueStats.owed > 0 || revenueStats.banked > 0 || revenueStats.lostCount > 0) && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 mt-6 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-3"><TrendingUp size={13} className="text-slate-400"/><span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Revenue</span></div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3">
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Pipeline</p>
                    <p className="font-extrabold text-slate-900 dark:text-white text-sm whitespace-nowrap">{fmtAUD(revenueStats.pipeline)}</p>
                    {revenueStats.pipelineCount > 0 && <p className="text-[9px] font-medium text-slate-400 mt-0.5">{revenueStats.pipelineCount} quote{revenueStats.pipelineCount!==1?'s':''}</p>}
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3">
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Owed</p>
                    <p className={`font-extrabold text-sm whitespace-nowrap ${revenueStats.overdueCount > 0 ? 'text-red-500' : 'text-amber-600 dark:text-amber-400'}`}>{fmtAUD(revenueStats.owed)}</p>
                    {revenueStats.overdueCount > 0 ? (
                      <p className="text-[9px] font-medium text-red-500 mt-0.5">{fmtAUD(revenueStats.overdueAmt)} overdue</p>
                    ) : revenueStats.owedCount > 0 ? (
                      <p className="text-[9px] font-medium text-slate-400 mt-0.5">{revenueStats.owedCount} invoice{revenueStats.owedCount!==1?'s':''}</p>
                    ) : null}
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3">
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Banked</p>
                    <p className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm whitespace-nowrap">{fmtAUD(revenueStats.banked)}</p>
                  </div>
                </div>
                {(revenueStats.bookedCount > 0 || revenueStats.lostCount > 0) && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {revenueStats.bookedCount > 0 && (
                      <button onClick={() => setFilterType('working')} className="bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl px-3 py-2 text-left transition-colors">
                        <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Booked work</p>
                        <p className="font-bold text-slate-700 dark:text-slate-200 text-xs whitespace-nowrap mt-0.5">{fmtAUD(revenueStats.booked)} · {revenueStats.bookedCount} job{revenueStats.bookedCount!==1?'s':''}</p>
                      </button>
                    )}
                    {revenueStats.lostCount > 0 && (
                      <button onClick={() => setFilterType('lost')} className="bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl px-3 py-2 text-left transition-colors">
                        <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Lost</p>
                        <p className="font-bold text-red-500/80 text-xs whitespace-nowrap mt-0.5">{fmtAUD(revenueStats.lost)} · {revenueStats.lostCount} quote{revenueStats.lostCount!==1?'s':''}</p>
                      </button>
                    )}
                  </div>
                )}
                {revenueStats.winRate != null && (
                  <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-3 text-center">Win rate: <span className="text-slate-900 dark:text-white">{revenueStats.winRate}%</span> ({revenueStats.won} won · {revenueStats.lostQuotes} lost)</p>
                )}
              </div>
            )}
          </main>
        )}

        {/* Detail View */}
        {viewMode === 'detail' && activeJob && (
          <main className="p-4 max-w-2xl mx-auto no-print animate-slide-up pb-32">
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => { setViewMode('dashboard'); setIsEditingHeader(false); }} className="text-slate-400 dark:text-slate-500 font-bold text-xs flex items-center gap-1 uppercase tracking-widest hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 rounded-full transition-colors"><ChevronRight size={14} className="rotate-180"/> Dashboard</button>
              <button onClick={() => showConfirm('Permanently delete this project?', () => { saveToDB(jobs.filter(x=>x.id!==activeJobId)); setViewMode('dashboard'); showToast('Project Deleted','success'); }, 'Delete')} className="text-red-400 hover:text-red-600 flex items-center gap-1 text-[10px] font-black uppercase"><Trash2 size={14}/> Delete</button>
            </div>

            <div className={`p-5 sm:p-8 rounded-[2rem] border shadow-sm mb-4 bg-white dark:bg-slate-800 ${activeJob && isCompletionDoc(activeJob)?'border-emerald-200 dark:border-emerald-900/50':'border-slate-200 dark:border-slate-700'}`}>
              {isEditingHeader ? (
                <div>
                  <div className="flex items-center gap-2 mb-3"><Edit3 size={14} className="text-orange-500"/><span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Editing Job Details</span></div>
                  <input className="w-full text-xl font-black bg-slate-50 dark:bg-slate-700 rounded-xl px-4 py-3 mb-3 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 dark:text-white" placeholder="Job Address" value={headerDraft.address} onChange={e=>setHeaderDraft(d=>({...d,address:e.target.value}))}/>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input className="w-full font-bold bg-slate-50 dark:bg-slate-700 rounded-xl px-4 py-3 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 dark:text-white text-slate-600 dark:text-slate-300 text-sm" placeholder="Client Name" value={headerDraft.clientName} onChange={e=>setHeaderDraft(d=>({...d,clientName:e.target.value}))}/>
                    <input className="w-full font-bold bg-slate-50 dark:bg-slate-700 rounded-xl px-4 py-3 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 dark:text-white text-slate-600 dark:text-slate-300 text-sm" placeholder="Client Phone" value={headerDraft.clientPhone || ''} onChange={e=>setHeaderDraft(d=>({...d,clientPhone:e.target.value}))}/>
                  </div>
                  <input type="email" className="w-full font-bold bg-slate-50 dark:bg-slate-700 rounded-xl px-4 py-3 mb-3 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 dark:text-white text-slate-600 dark:text-slate-300 text-sm" placeholder="Client Email" value={headerDraft.clientEmail || ''} onChange={e=>setHeaderDraft(d=>({...d,clientEmail:e.target.value}))}/>
                  <input className="w-full font-bold bg-slate-50 dark:bg-slate-700 rounded-xl px-4 py-3 mb-3 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 dark:text-white text-slate-600 dark:text-slate-300 text-sm" placeholder="Client Ref / CTS Number" value={headerDraft.clientRef} onChange={e=>setHeaderDraft(d=>({...d,clientRef:e.target.value}))}/>
                  <div className="mb-3"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Due Date</label><input type="date" className="w-full p-3 bg-slate-50 dark:bg-slate-700 rounded-xl outline-none font-medium text-sm dark:text-white" value={headerDraft.dueDate} onChange={e=>setHeaderDraft(d=>({...d,dueDate:e.target.value}))}/></div>
                  <textarea className="w-full p-3 bg-slate-50 dark:bg-slate-700 rounded-xl outline-none text-sm font-medium h-24 resize-none dark:text-white dark:placeholder-slate-400 mb-3 custom-scrollbar" placeholder="Project notes…" value={headerDraft.projectNotes} onChange={e=>setHeaderDraft(d=>({...d,projectNotes:e.target.value}))}/>
                  <label className="flex items-center gap-2 mb-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs font-black uppercase w-fit"><ImageIcon size={14}/> Add Photos<input type="file" multiple accept="image/*" className="hidden" onChange={handleProjectPhotoUpload}/></label>
                  {headerDraft.projectPhotos.length > 0 && (<div className="flex gap-2 overflow-x-auto pb-2 mt-2 custom-scrollbar">{headerDraft.projectPhotos.map((p,i) => (<div key={i} className="relative h-16 w-16 flex-shrink-0"><img src={p} className="w-full h-full object-cover rounded-lg" alt=""/><button onClick={() => setHeaderDraft(d=>({...d,projectPhotos:d.projectPhotos.filter((_,idx)=>idx!==i)}))} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"><X size={10}/></button></div>))}</div>)}
                  <div className="flex gap-3 mt-4">
                    <button onClick={saveHeaderEdit} className="flex-1 bg-orange-500 hover:bg-orange-400 text-white py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2"><Check size={16}/> Save</button>
                    <button onClick={() => setIsEditingHeader(false)} className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 py-3 rounded-xl font-black text-sm">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">{activeJob?.address}</h2>
                    <p className="text-slate-600 dark:text-slate-400 font-semibold text-sm mt-1">{activeJob?.clientName}</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5">
                      {activeJob?.clientPhone && <a href={`tel:${activeJob.clientPhone}`} className="text-slate-500 dark:text-slate-400 hover:text-orange-500 text-xs font-medium flex items-center gap-1 transition-colors"><Phone size={11}/>{activeJob.clientPhone}</a>}
                      {activeJob?.clientEmail && <a href={`mailto:${activeJob.clientEmail}`} className="text-slate-500 dark:text-slate-400 hover:text-orange-500 text-xs font-medium flex items-center gap-1 truncate max-w-[180px] transition-colors"><Mail size={11}/>{activeJob.clientEmail}</a>}
                      {activeJob?.clientRef && <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Ref: {activeJob.clientRef}</p>}
                      {activeJob?.dueDate && <p className="text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-1"><Calendar size={11}/>Due {formatLocal(activeJob.dueDate)}</p>}
                    </div>
                    {activeJob?.projectNotes && <p className="text-slate-600 dark:text-slate-400 italic text-sm mt-3 border-l-2 border-slate-300 dark:border-slate-700 pl-3 whitespace-pre-wrap leading-relaxed">{activeJob.projectNotes}</p>}
                    {activeJob?.projectPhotos?.length > 0 && <div className="flex gap-2 mt-3 overflow-x-auto custom-scrollbar">{activeJob.projectPhotos.map((p,i) => <img key={i} src={p} className="h-16 rounded-lg" alt=""/>)}</div>}
                  </div>

                  {getTotals(activeJob?.tasks||[]).mins > 0 && (
                    <div className="text-slate-600 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 w-fit">
                      <Clock size={13} className="text-orange-500"/> {getTotals(activeJob?.tasks||[]).str} logged
                    </div>
                  )}

                  {/* Stage stepper */}
                  {(() => {
                    const cur = activeJob?.status || 'draft';
                    const isRejected = cur === 'rejected';
                    const curIdx = HAPPY_PATH.indexOf(cur);
                    return (
                      <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar pb-1 -mb-1">
                        {HAPPY_PATH.map((k, i) => {
                          const s = getStatus(k);
                          const isCurrent = !isRejected && cur === k;
                          const isPast = !isRejected && curIdx > i;
                          return (
                            <React.Fragment key={k}>
                              <span className={`flex-shrink-0 text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap border ${isCurrent ? s.cls + ' ring-2 ring-offset-1 dark:ring-offset-slate-800 ring-slate-300 dark:ring-slate-600' : isPast ? 'bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700' : 'bg-transparent text-slate-300 dark:text-slate-600 border-dashed border-slate-200 dark:border-slate-700'}`}>{s.label}</span>
                              {i < HAPPY_PATH.length - 1 && <ChevronRight size={10} className="flex-shrink-0 text-slate-300 dark:text-slate-600"/>}
                            </React.Fragment>
                          );
                        })}
                        {isRejected && <span className={`flex-shrink-0 text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap border ml-2 ${getStatus('rejected').cls} ring-2 ring-offset-1 dark:ring-offset-slate-800 ring-red-300 dark:ring-red-700`}>Rejected</span>}
                      </div>
                    );
                  })()}

                  <div className="flex flex-col gap-1.5">
                  {/* Status row — Advance flex-1 absorbs label-length changes; Undo/Reject stay put */}
                  <div className="flex items-stretch gap-1.5">
                    {(() => {
                      const s = activeJob?.status || 'draft';
                      if (s === 'rejected') return (
                        <button onClick={() => reopenJob(activeJobId)} className={`${actionBtnClass} flex-1 min-w-0 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300`}>
                          ↺ Reopen
                        </button>
                      );
                      const canRevert = HAPPY_PATH.indexOf(s) > 0;
                      return (
                        <>
                          {s === 'paid' ? (
                            <span className={`${actionBtnClass} flex-1 min-w-0 ${getStatus('paid').cls}`}><Check size={13}/> Paid</span>
                          ) : (
                            <button onClick={() => advanceStatus(activeJobId)} className={`${actionBtnClass} flex-1 min-w-0 ${getStatus(s).cls}`}>
                              <span className="truncate">{NEXT_ACTION_BTN[s] || 'Advance'}</span>
                            </button>
                          )}
                          {canRevert && (
                            <button onClick={() => revertStatus(activeJobId)} title={`Revert to ${getStatus(HAPPY_PATH[HAPPY_PATH.indexOf(s)-1]).label}`} aria-label="Undo status" className={`${actionBtnClass} flex-shrink-0 w-10 px-0 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300`}>
                              <Undo size={14}/>
                            </button>
                          )}
                          {['draft','sent','approved'].includes(s) && (
                            <button onClick={() => setRejectingJobId(activeJobId)} title="Reject quote" className={`${actionBtnClass} flex-shrink-0 bg-white dark:bg-slate-900 border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:border-red-300`}>
                              <X size={13}/> Reject
                            </button>
                          )}
                        </>
                      );
                    })()}
                  </div>

                  {/* Doc settings row — Costs always shown, GST conditionally to the right; both flex-1 so widths stay equal */}
                  <div className="flex items-stretch gap-1.5">
                    <button onClick={() => toggleCosts(activeJobId)} className={`${actionBtnClass} flex-1 min-w-0 ${activeJob.showCosts ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-900/60 text-orange-600 dark:text-orange-400' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'}`}>
                      <DollarSign size={13}/> Costs {activeJob.showCosts ? 'on' : 'off'}
                    </button>
                    {getCC().taxRate > 0 && activeJob.showCosts && (
                      <button onClick={() => toggleGST(activeJobId)} className={`${actionBtnClass} flex-1 min-w-0 ${activeJob.gstEnabled ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-900/60 text-orange-600 dark:text-orange-400' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'}`}>
                        <Receipt size={13}/> {getCC().taxLabel} {activeJob.gstEnabled ? 'on' : 'off'}
                      </button>
                    )}
                  </div>

                  {/* Utility grid — 2x2 on mobile, 4x1 on tablet+. Fixed columns so positions never shift. */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    <button onClick={startEditHeader} className="h-12 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"><Pencil size={14}/> Edit</button>
                    <button onClick={() => openAppointmentForJob(activeJobId)} className="h-12 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"><CalendarPlus size={14}/> Schedule</button>
                    <button onClick={() => openTimeEntryForJob(activeJobId)} className="h-12 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"><Timer size={14}/> Log Time</button>
                    <button onClick={() => setShowAIAssistModal(true)} className="h-12 bg-purple-50 dark:bg-purple-950/30 hover:bg-purple-100 dark:hover:bg-purple-950/50 rounded-xl text-xs font-semibold text-purple-700 dark:text-purple-400 flex items-center justify-center gap-1.5 transition-colors"><Sparkles size={14}/> Ask AI</button>
                  </div>

                  {/* SMS ETA — its own row so its absence/presence never shifts other buttons */}
                  {activeJob.clientPhone && (
                    <a href={`sms:${activeJob.clientPhone}?body=${encodeURIComponent(`Hi ${activeJob.clientName||''}, this is ${businessProfile?.name || 'your tradie'}. I'm on my way to ${activeJob.address} now. ETA is about __ mins.`)}`} className={`${actionBtnClass} w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300`}>
                      <Phone size={13}/> SMS ETA to {activeJob.clientName || 'client'}
                    </a>
                  )}
                  </div>
                </div>
              )}
            </div>

            {/* Invoice Panel */}
            {['sent','completed','invoiced','paid'].includes(activeJob?.status) && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 mb-4 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-3"><CreditCard size={14} className="text-slate-400"/><span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Invoice</span></div>
                <div className="space-y-3">
                  {activeJob.invoiceNumber ? (
                    <div className="flex items-center justify-between"><span className="text-xs font-medium text-slate-500 dark:text-slate-400">Invoice no.</span><span className="font-bold text-slate-900 dark:text-white font-mono text-sm">{activeJob.invoiceNumber}</span></div>
                  ) : (
                    <button onClick={() => { const count = jobs.filter(x=>x.invoiceNumber).length + 1; saveToDB(jobs.map(j=>j.id===activeJobId?{...j,invoiceNumber:`INV-${new Date().getFullYear()}-${String(count).padStart(3,'0')}`}:j)); showToast('Invoice number generated','success'); }} className="w-full h-10 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:border-orange-400 hover:text-orange-500 transition-colors">+ Generate invoice number</button>
                  )}
                  {(() => {
                    const total = getQuoteTotals(activeJob.tasks, activeJob.gstEnabled, extraTaxRate).total;
                    const paid = parseFloat(activeJob.amountPaid) || 0;
                    const balance = total - paid;
                    return (
                      <>
                        {total > 0 && <div className="flex items-center justify-between"><span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total due</span><span className="font-bold text-slate-900 dark:text-white text-sm">{fmtAUD(total)}</span></div>}
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex-shrink-0">Amount paid</span>
                          <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 rounded-lg px-3 h-9 flex-1 max-w-[140px] border border-slate-200 dark:border-slate-700">
                            <span className="text-slate-400 font-semibold text-sm">{getCC().symbol}</span>
                            <input type="number" step="0.01" min="0" className="bg-transparent outline-none font-bold text-slate-900 dark:text-white text-sm w-full" placeholder="0.00" value={activeJob.amountPaid || ''} onChange={e => saveAmountPaid(activeJobId, e.target.value)}/>
                          </div>
                        </div>
                        {total > 0 && <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-3"><span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Balance</span><span className={`font-extrabold text-base ${balance <= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>{balance <= 0 ? '✓ Paid' : fmtAUD(balance)}</span></div>}
                      </>
                    );
                  })()}
                </div>
              </div>
            )}

            {activeJob?.showCosts && getQuoteTotals(activeJob.tasks, activeJob.gstEnabled, extraTaxRate).total > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 mb-4 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-3"><DollarSign size={14} className="text-slate-400"/><span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cost Summary</span></div>
                {(() => {
                  const qt = getQuoteTotals(activeJob.tasks, activeJob.gstEnabled, extraTaxRate);
                  return (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm"><span className="text-slate-500 dark:text-slate-400 font-medium">Labour</span><span className="font-semibold text-slate-900 dark:text-white">{fmtAUD(qt.labour)}</span></div>
                      <div className="flex items-center justify-between text-sm"><span className="text-slate-500 dark:text-slate-400 font-medium">Materials</span><span className="font-semibold text-slate-900 dark:text-white">{fmtAUD(qt.mats)}</span></div>
                      {activeJob.gstEnabled && (
                        <>
                          <div className="flex items-center justify-between text-sm border-t border-slate-100 dark:border-slate-800 pt-1.5"><span className="text-slate-500 dark:text-slate-400 font-medium">Subtotal</span><span className="font-semibold text-slate-900 dark:text-white">{fmtAUD(qt.subtotal)}</span></div>
                          <div className="flex items-center justify-between text-sm"><span className="text-slate-500 dark:text-slate-400 font-medium">{getCC().taxLabel} ({getCC().taxRate}%)</span><span className="font-semibold text-slate-900 dark:text-white">{fmtAUD(qt.gst)}</span></div>
                        </>
                      )}
                      {extraTaxRate > 0 && (
                        <div className="flex items-center justify-between text-sm"><span className="text-slate-500 dark:text-slate-400 font-medium">{getCC().markupLabel} ({extraTaxRate}%)</span><span className="font-semibold text-slate-900 dark:text-white">{fmtAUD(qt.extra)}</span></div>
                      )}
                      <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-2 mt-2">
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total{activeJob.gstEnabled ? ` inc. ${getCC().taxLabel}` : ''}</span>
                        <span className="font-extrabold text-orange-500 text-xl">{fmtAUD(qt.total)}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            <div className="space-y-2 mb-6">
              {activeJob?.tasks.map((t, i) => {
                const labour = (parseTimeToMinutes(t.time)/60)*(parseFloat(t.rate)||0);
                const mats = parseFloat(t.materialsCost)||0;
                const subtotal = labour + mats;
                const showCosts = activeJob.showCosts;
                return (
                  <div key={t.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-4 pt-3.5 pb-3">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h3 className="font-bold text-[15px] text-slate-900 dark:text-white leading-tight flex-1">{t.title}</h3>
                        {t.time && <span className="text-orange-600 dark:text-orange-400 text-xs font-semibold flex-shrink-0 mt-0.5">{t.time}</span>}
                      </div>
                      {t.desc && <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-2 whitespace-pre-wrap">{t.desc}</p>}
                      {showCosts && subtotal > 0 && (
                        <div className="flex items-center gap-3 mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                          {labour > 0 && <span>Labour <span className="font-semibold text-slate-700 dark:text-slate-300">{fmtAUD(labour)}</span></span>}
                          {mats > 0 && <span>Mats <span className="font-semibold text-slate-700 dark:text-slate-300">{fmtAUD(mats)}</span></span>}
                          <span className="ml-auto font-bold text-slate-900 dark:text-white">{fmtAUD(subtotal)}</span>
                        </div>
                      )}
                      {t.images?.length > 0 && (<div className="flex gap-2 overflow-x-auto custom-scrollbar mt-3">{t.images.map((img,idx) => <div key={idx} className="h-20 w-28 flex-shrink-0"><img src={img} className="w-full h-full object-cover rounded-lg border border-slate-200 dark:border-slate-700"/></div>)}</div>)}
                      <div className="flex gap-1 mt-3 -mb-1">
                        <button onClick={() => { setEditingTaskId(t.id); setTaskData({rate:'',materialsCost:'',images:[],...t}); setIsTaskFormOpen(true); }} className="flex items-center gap-1 px-2.5 h-7 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-semibold"><Pencil size={11}/> Edit</button>
                        <button onClick={() => showConfirm('Delete this log entry?', () => saveToDB(jobs.map(j=>j.id===activeJobId?{...j,tasks:j.tasks.filter(tk=>tk.id!==t.id)}:j)))} className="flex items-center gap-1 px-2.5 h-7 rounded-md text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-500 transition-colors text-xs font-semibold"><Trash2 size={11}/> Delete</button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {activeJob?.tasks.length===0 && (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Plus size={24} className="text-slate-400"/>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-semibold text-sm">No entries yet</p>
                  <p className="text-slate-500 dark:text-slate-500 text-xs font-medium">Tap <span className="font-semibold">Add Entry</span> below</p>
                </div>
              )}
            </div>

            <div className="flex justify-center mt-6 mb-24">
              <button
                onClick={() => setIsTaskFormOpen(true)}
                className={`flex items-center gap-2 h-12 px-7 rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all text-white ${activeJob && isCompletionDoc(activeJob) ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-orange-500 hover:bg-orange-400'}`}
              >
                <Plus size={18}/> Add Entry
              </button>
            </div>
          </main>
        )}

        {/* Route planning bar */}
        {selectionMode && (
          <div className="fixed left-0 right-0 z-[45] bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-4 py-3 no-print flex justify-between items-center" style={{ bottom: 'calc(4rem + env(safe-area-inset-bottom))' }}>
            <span className="text-white font-semibold text-sm">{selectedJobs.length} stop{selectedJobs.length!==1?'s':''} selected</span>
            <button onClick={openGoogleMaps} disabled={selectedJobs.length===0} className={`h-11 px-5 rounded-xl font-bold text-sm transition-all ${selectedJobs.length>0?'bg-orange-500 hover:bg-orange-400 text-white':'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>Plan Route</button>
          </div>
        )}

        {/* Bottom Nav */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 flex justify-around items-center px-2 pt-1.5 bottom-nav-safe z-50 no-print">
          {[
            { key: 'home', icon: Home, label: 'Home', active: viewMode==='dashboard' && !selectionMode, onClick: () => { setViewMode('dashboard'); setSelectionMode(false); } },
            { key: 'route', icon: Map, label: selectionMode ? 'Done' : 'Route', active: selectionMode, onClick: () => { setViewMode('dashboard'); setSelectionMode(!selectionMode); } },
            { key: 'schedule', icon: Calendar, label: 'Schedule', active: viewMode==='schedule', onClick: () => setViewMode(viewMode==='schedule' ? 'dashboard' : 'schedule') },
            { key: 'settings', icon: Settings, label: 'Settings', active: false, badge: expiringCreds.length > 0, onClick: () => setShowSettings(true) },
          ].map(item => {
            const Icon = item.icon;
            return (
              <button key={item.key} onClick={item.onClick} className={`relative flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-colors ${item.active ? 'text-orange-500' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
                <Icon size={22} strokeWidth={item.active ? 2.4 : 2}/>
                {item.badge && <span className="absolute top-1 right-3 w-2 h-2 bg-amber-400 rounded-full border border-white dark:border-slate-950"/>}
                <span className="text-[10px] font-semibold mt-0.5">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* JIM Live Voice Panel */}
        {jimLiveOpen && <JimLivePanel status={jimLiveStatus} transcript={jimLiveTranscript} onClose={stopJimLive} onMicTap={handleMicTap}/>}

        {/* Modals */}
        {showSettings && <SettingsModal geminiModel={geminiModel} userApiKey={userApiKey} extraTaxRate={extraTaxRate} countryCode={countryCode} isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} exportData={exportData} importData={importData} userTemplates={userTemplates} saveUserTemplates={saveUserTemplates} userMaterials={userMaterials} saveUserMaterials={saveUserMaterials} businessProfile={businessProfile} saveBusinessProfile={saveBusinessProfile} onSave={(m,k,t,cc) => { setGeminiModel(m); setUserApiKey(k); setExtraTaxRate(Number(t)); const c = cc||'AU'; localStorage.setItem('geminiModel',m); localStorage.setItem('userGeminiApiKey',k); localStorage.setItem('joblog-extratax', t); localStorage.setItem('jim-country', c); _cc = c; setCountryCode(c); }} onClose={() => setShowSettings(false)} showToast={showToast} dbSize={dbSize} isPro={isUnlocked} onUnlockPro={handleUnlockSuccess}/>}
        {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} onUnlock={handleUnlockSuccess} showToast={showToast}/>}
        {newJobModal && <NewJobModal type={newJobModal} user={user} geminiModel={geminiModel} userApiKey={userApiKey} onSave={handleCreateJob} onClose={() => setNewJobModal(null)} showToast={showToast} toggleVoice={toggleVoice} listeningField={listeningField} jobs={jobs}/>}

        {showAIAssistModal && activeJob && <AIAssistModal onClose={() => setShowAIAssistModal(false)} onGenerate={handleGenerateDocument} isGenerating={isGenerating} docType={isCompletionDoc(activeJob) ? 'Completion Invoice' : 'Quotation'} toggleVoice={toggleVoice} listeningField={listeningField}/>}
        {rejectingJobId && <RejectSheet job={jobs.find(j => j.id === rejectingJobId)} onCancel={() => setRejectingJobId(null)} onConfirm={(reason, note) => { rejectJob(rejectingJobId, reason, note); setRejectingJobId(null); }}/>}


        {/* Task Form */}
        {isTaskFormOpen && (
          <div className="fixed inset-0 z-[100] bg-slate-900/90 dark:bg-slate-950/95 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-4">
            <div className="bg-white dark:bg-slate-900 rounded-t-[2.5rem] sm:rounded-[2.5rem] w-full max-w-lg p-5 sm:p-8 shadow-2xl border dark:border-slate-800 max-h-[95vh] flex flex-col animate-slide-up sm:animate-none pb-safe">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">{editingTaskId ? 'Edit Entry' : 'New Entry'}</h2>
                <button onClick={closeModal} aria-label="Close" className="w-9 h-9 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-700 dark:hover:text-white"><X size={18}/></button>
              </div>

              <div className="overflow-y-auto flex-1 custom-scrollbar pr-1 -mr-1 space-y-4">

                {/* Template chooser — quiet trigger */}
                {userTemplates.length > 0 && (
                  <div>
                    <button onClick={() => setShowTemplatePop(!showTemplatePop)} className="w-full flex items-center justify-between h-10 px-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <span className="flex items-center gap-2"><Bookmark size={14} className="text-slate-400"/>Use a template</span>
                      <ChevronDown size={14} className={`text-slate-400 transition-transform ${showTemplatePop?'rotate-180':''}`}/>
                    </button>
                    {showTemplatePop && (
                      <div className="mt-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-h-48 overflow-y-auto p-1">
                        {userTemplates.map((t, i) => (
                          <button key={i} onClick={() => { setTaskData(prev=>({...prev,...t.data})); setShowTemplatePop(false); }} className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2.5">
                            <Bookmark size={14} className="text-slate-400 flex-shrink-0"/>
                            <div className="min-w-0 flex-1"><div className="font-semibold text-sm truncate dark:text-white">{t.name}</div>{t.data.title && <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{t.data.title}</div>}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Title — single clean input with mic */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">Title</label>
                  <div className="relative">
                    <input placeholder="What did you do?" className="w-full h-11 pl-3.5 pr-11 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-semibold dark:text-white dark:placeholder-slate-500 text-sm border border-slate-200 dark:border-slate-700 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 transition-all" value={taskData.title} onChange={e=>setTaskData(p=>({...p,title:e.target.value}))}/>
                    <button type="button" onClick={() => toggleVoice('taskTitle', (val) => setTaskData(p => ({...p, title: typeof val === 'function' ? val(p.title) : val})))} aria-label="Dictate title" className={`absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${listeningField==='taskTitle'?'bg-red-500 text-white animate-pulse':'text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'}`}><Mic size={14}/></button>
                  </div>
                </div>

                {/* Time + Photos — paired row */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">Time</label>
                    <input placeholder="2h 30m" className="w-full h-11 px-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-semibold dark:text-white dark:placeholder-slate-500 text-sm border border-slate-200 dark:border-slate-700 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 transition-all" value={taskData.time} onChange={e=>setTaskData(p=>({...p,time:e.target.value}))}/>
                    {taskData.time && parseTimeToMinutes(taskData.time) > 0 && <p className="text-[10px] text-orange-500 font-semibold mt-1 ml-1">= {fmtMins(parseTimeToMinutes(taskData.time))}</p>}
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">Photos {taskData.images.length > 0 && <span className="text-orange-500 normal-case">· {taskData.images.length}</span>}</label>
                    <label className="w-full h-11 bg-slate-50 dark:bg-slate-800 rounded-xl cursor-pointer flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 gap-2 border border-slate-200 dark:border-slate-700 transition-colors text-sm font-semibold text-slate-600 dark:text-slate-300">
                      <ImageIcon size={15}/> Add
                      <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload}/>
                    </label>
                  </div>
                </div>

                {/* Photo grid — right after photos input */}
                {taskData.images.length > 0 && (
                  <div>
                    <div className="img-preview-grid">
                      {taskData.images.map((img,i) => (
                        <div key={i} className="relative w-full aspect-[4/3] group cursor-pointer" onClick={() => setEditingImageIdx(i)}>
                          <img src={img} className="w-full h-full object-cover rounded-xl border border-slate-200 dark:border-slate-700"/>
                          <div className="absolute inset-0 bg-slate-900/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Edit3 className="text-white drop-shadow-md" size={22}/></div>
                          <button onClick={e=>{e.stopPropagation();setTaskData(p=>({...p,images:p.images.filter((_,idx)=>idx!==i)}));}} aria-label="Remove photo" className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-slate-900 hover:bg-red-500 text-white rounded-full flex items-center justify-center shadow-md z-10 transition-colors"><X size={12}/></button>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium mt-1.5 text-center">Tap a photo to annotate</p>
                  </div>
                )}

                {/* Description — primary content area */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">Description</label>
                  <div className="relative">
                    <textarea placeholder="Full details…" className="w-full p-3.5 pr-3.5 pb-11 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none text-sm font-medium h-32 resize-none dark:text-white dark:placeholder-slate-500 custom-scrollbar border border-slate-200 dark:border-slate-700 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 transition-all" value={taskData.desc} onChange={e=>setTaskData(p=>({...p,desc:e.target.value}))}/>
                    <div className="absolute bottom-1.5 right-1.5 flex gap-1">
                      <button type="button" onClick={handleProfessionalize} disabled={isProfessionalizing} aria-label="Let JIM polish this" className="flex items-center gap-1 h-8 px-2.5 rounded-lg text-xs font-semibold text-purple-600 hover:bg-purple-100 dark:text-purple-400 dark:hover:bg-purple-950/40 transition-colors disabled:opacity-50">
                        {isProfessionalizing ? <div className="w-3 h-3 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"/> : <Wand2 size={13}/>} AI Polish
                      </button>
                      <button type="button" onClick={() => toggleVoice('taskDesc', (val) => setTaskData(p => ({...p, desc: typeof val === 'function' ? val(p.desc) : val})))} aria-label="Dictate description" className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${listeningField==='taskDesc'?'bg-red-500 text-white animate-pulse':'text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'}`}><Mic size={14}/></button>
                    </div>
                  </div>
                  <button onClick={handleAiSuggest} disabled={isAiSuggesting} className={`w-full mt-2 flex items-center justify-center gap-2 h-10 rounded-xl font-semibold text-xs transition-all active:scale-95 ${isAiSuggesting ? 'bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 cursor-wait' : 'bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/30 dark:hover:bg-purple-950/50 text-purple-700 dark:text-purple-300'}`}>{isAiSuggesting ? <><JimMascot size={14} state="thinking"/> AI is writing…</> : <><Sparkles size={13}/> AI Write</>}</button>
                </div>

                {/* Materials & Tools — always visible, separate from costs */}
                <div className="space-y-2">
                  <textarea rows={3} placeholder={(activeJob && isCompletionDoc(activeJob) ? 'Materials used' : 'Materials needed') + ' — one per line'} className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none text-sm font-medium border border-slate-200 dark:border-slate-700 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 transition-all dark:text-white dark:placeholder-slate-500 resize-y" value={taskData.materials} onChange={e=>setTaskData(p=>({...p,materials:e.target.value}))}/>
                  <textarea rows={3} placeholder={(activeJob && isCompletionDoc(activeJob) ? 'Tools used' : 'Tools needed') + ' — one per line'} className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none text-sm font-medium border border-slate-200 dark:border-slate-700 focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 transition-all dark:text-white dark:placeholder-slate-500 resize-y" value={taskData.tools} onChange={e=>setTaskData(p=>({...p,tools:e.target.value}))}/>
                </div>

                {/* Costs section — only when enabled */}
                {activeJob?.showCosts && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    <div className="flex items-center gap-2"><DollarSign size={13} className="text-slate-400"/><span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Costs</span></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">{getCC().symbol}</span>
                        <input placeholder="Rate" className={`w-full h-11 pl-7 pr-11 rounded-xl outline-none font-semibold text-sm border focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 transition-all ${rateError?'bg-red-50 dark:bg-red-950/20 border-red-500':'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'} dark:text-white dark:placeholder-slate-500`} value={taskData.rate} onChange={e=>{const v=e.target.value;setTaskData(p=>({...p,rate:v}));validateRate(v);}} onBlur={e=>validateRate(e.target.value)}/>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-semibold">/hr</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="flex-1 relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">{getCC().symbol}</span>
                          <input placeholder="Materials" className={`w-full h-11 pl-7 pr-3 rounded-xl outline-none font-semibold text-sm border focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 transition-all ${matError?'bg-red-50 dark:bg-red-950/20 border-red-500':'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'} dark:text-white dark:placeholder-slate-500`} value={taskData.materialsCost} onChange={e=>{const v=e.target.value;setTaskData(p=>({...p,materialsCost:v}));validateMat(v);}} onBlur={e=>validateMat(e.target.value)}/>
                        </div>
                        <label title="Scan receipt" className={`w-11 h-11 rounded-xl transition-colors cursor-pointer flex items-center justify-center border ${isScanningReceipt ? 'bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:border-amber-900/60 animate-pulse' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                          <Camera size={15}/>
                          <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleScanReceipt}/>
                        </label>
                        {userMaterials.length > 0 && (
                          <button onClick={() => setShowMaterialPop(!showMaterialPop)} aria-label="Pick from saved materials" className={`w-11 h-11 rounded-xl transition-colors flex items-center justify-center border ${showMaterialPop ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/60' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}><Package size={15}/></button>
                        )}
                      </div>
                    </div>
                    {showMaterialPop && userMaterials.length > 0 && (
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-h-48 overflow-y-auto p-1">
                        {userMaterials.map((m, i) => (
                          <button key={i} onClick={() => { setTaskData(p=>({...p, materials: p.materials ? p.materials + '\n' + m.name : m.name, materialsCost: String(((parseFloat(p.materialsCost)||0) + (parseFloat(m.price)||0)).toFixed(2)) })); setShowMaterialPop(false); }} className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left">
                            <span className="font-medium text-sm dark:text-white truncate pr-2">{m.name}</span>
                            <span className="font-semibold text-sm text-slate-700 dark:text-slate-300 flex-shrink-0">{fmtAUD(parseFloat(m.price))}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {(() => { const hrs=parseTimeToMinutes(taskData.time)/60; const labour=hrs*(parseFloat(taskData.rate)||0); const mats=parseFloat(taskData.materialsCost)||0; const total=labour+mats; return total>0 ? (
                      <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 px-1">
                        <div className="flex gap-3">
                          {labour>0 && <span>Labour <span className="font-semibold text-slate-700 dark:text-slate-300">{fmtAUD(labour)}</span></span>}
                          {mats>0 && <span>Mats <span className="font-semibold text-slate-700 dark:text-slate-300">{fmtAUD(mats)}</span></span>}
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{fmtAUD(total)}</span>
                      </div>
                    ) : null; })()}
                  </div>
                )}

                {/* Save as template / material */}
                <div className="flex gap-2 pt-2 pb-1">
                  <button onClick={handleSaveAsTemplate} className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><Bookmark size={13}/> Save as template</button>
                  {String(taskData.materials||'').trim() && String(taskData.materialsCost||'').trim() && !String(taskData.materials||'').includes('\n') && (<button onClick={handleSaveMaterial} title="Save this single material to your library" className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"><Package size={13}/> Save material</button>)}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex-shrink-0">
                <button onClick={handleSaveTask} className={`w-full text-white h-12 rounded-2xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${activeJob && isCompletionDoc(activeJob)?'bg-emerald-600 hover:bg-emerald-500':'bg-orange-500 hover:bg-orange-400'}`}><Save size={16}/> Save Entry</button>
              </div>
            </div>
          </div>
        )}

        {/* Naming Template Modal */}
        {isNamingTemplate && (
          <div className="fixed inset-0 z-[250] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-sm p-6 shadow-2xl border border-slate-800 animate-slide-up sm:animate-none text-center">
              <h3 className="text-slate-900 dark:text-white font-black text-xl mb-4">Name your Template</h3>
              <input autoFocus className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none font-bold mb-4 dark:text-white border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-400" placeholder="e.g. Bathroom Patch" value={saveTemplateName} onChange={e=>setSaveTemplateName(e.target.value)} onKeyDown={e=>e.key==='Enter'&&confirmSaveTemplate()}/>
              <div className="flex gap-3 w-full">
                <button onClick={() => setIsNamingTemplate(false)} className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-3 rounded-2xl font-black">Cancel</button>
                <button onClick={confirmSaveTemplate} className="flex-1 bg-indigo-600 text-white py-3 rounded-2xl font-black shadow-lg shadow-indigo-500/30">Save</button>
              </div>
            </div>
          </div>
        )}

        {/* Time Entry Modal */}
        {timeEntryModal && (
          <TimeEntryModal
            entry={timeEntryModal}
            jobs={jobs}
            onSave={handleSaveTimeEntry}
            onDelete={() => handleDeleteTimeEntry(timeEntryModal.id)}
            onClose={() => setTimeEntryModal(null)}
            showToast={showToast}
          />
        )}

        {/* Canvas annotation editor */}
        {editingImageIdx !== null && (
          <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col pb-safe">
            <div className="flex justify-between items-center p-4 bg-slate-900 border-b border-slate-800 shadow-md z-10 flex-shrink-0">
              <button onClick={() => setEditingImageIdx(null)} className="text-slate-300 hover:text-white font-bold text-sm px-4 py-2">CANCEL</button>
              <div className="flex items-center gap-2 text-white text-xs font-black uppercase tracking-widest"><Edit3 size={14} className="text-orange-500"/> Mark Defects</div>
              <button onClick={saveAnnotated} className="bg-orange-500 text-white font-bold text-sm px-4 py-2 rounded-xl">SAVE</button>
            </div>
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800/50 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${canvasMode==='draw'?'bg-orange-500/20 text-orange-400 border border-orange-500/40':'bg-blue-500/20 text-blue-400 border border-blue-500/40'}`}>{canvasMode==='draw'?<Pencil size={11}/>:<Move size={11}/>}{canvasMode==='draw'?'Draw mode':'Pan mode'}</div>
                {canvasZoom>1 && <div className="text-[10px] font-black text-slate-500 uppercase">{canvasZoom.toFixed(1)}×</div>}
              </div>
              <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Pinch to zoom · 2 fingers</div>
            </div>
            <div className="flex-1 overflow-hidden relative flex items-center justify-center bg-slate-950 canvas-editor-area">
              <div style={{transform:`translate(${canvasPan.x}px,${canvasPan.y}px) scale(${canvasZoom})`,transformOrigin:'center center',willChange:'transform'}}>
                <canvas ref={canvasRef} onMouseDown={onMDown} onMouseMove={onMMove} onMouseUp={onMUp} onMouseLeave={onMUp} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} className="max-w-full max-h-full object-contain shadow-2xl" style={{cursor:canvasMode==='draw'?'crosshair':'grab',display:'block'}}/>
              </div>
            </div>
            <div className="bg-slate-900 border-t border-slate-800 p-4 z-10 flex-shrink-0">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">{COLORS.map(c => <button key={c.name} onClick={() => setPenColor(c.hex)} className={`w-8 h-8 rounded-full shadow-inner transition-transform border-2 ${c.hex==='#ffffff'?'border-slate-500 dark:border-slate-400':'border-transparent'} ${penColor===c.hex?'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-900':'opacity-70 hover:opacity-100'}`} style={{backgroundColor:c.hex}}/>)}</div>
                <div className="flex items-center gap-3">
                  <button onClick={toggleMode} className={`flex flex-col items-center gap-1 text-[10px] font-black uppercase transition-colors px-3 py-2 rounded-xl ${canvasMode==='pan'?'bg-blue-500/20 text-blue-400':'text-slate-400 hover:text-white'}`}>{canvasMode==='draw'?<Move size={20}/>:<Pencil size={20}/>} {canvasMode==='draw'?'Pan':'Draw'}</button>
                  {canvasZoom>1 && <button onClick={() => {setCanvasZoom(1);zoomRef.current=1;setCanvasPan({x:0,y:0});panRef.current={x:0,y:0};}} className="flex flex-col items-center gap-1 text-[10px] font-black uppercase text-slate-400 hover:text-white"><ZoomIn size={20}/>Reset</button>}
                  <button onClick={handleUndo} disabled={undoStack.length<=1} className={`flex flex-col items-center gap-1 text-[10px] font-black uppercase ${undoStack.length<=1?'text-slate-700':'text-slate-300 hover:text-white'}`}><Undo size={20}/>Undo</button>
                  <button onClick={handleClear} disabled={undoStack.length<=1} className={`flex flex-col items-center gap-1 text-[10px] font-black uppercase ${undoStack.length<=1?'text-slate-700':'text-red-400 hover:text-red-300'}`}><RefreshCcw size={20}/>Clear</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {printPreviewJob && <PrintPreview
            job={printPreviewJob}
            extraTaxRate={extraTaxRate}
            businessProfile={businessProfile}
            onClose={() => setPrintPreviewJob(null)}
            onUpdateJob={handleUpdateJobFromPreview}
            showToast={showToast}
        />}

        {appointmentFromJob && <AppointmentFormModal appointment={appointmentFromJob} jobs={jobs} onSave={handleSaveAppointment} onClose={() => setAppointmentFromJob(null)} showToast={showToast}/>}
        <ReloadPrompt />
      </div>
    );
  };

export { ErrorBoundary };
export default App;
