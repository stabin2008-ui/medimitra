/**
 * Time and Notification utilities for MediMitra CareLoop Medicine Alarms
 */

/**
 * Converts a 12-hour AM/PM string (e.g. "08:30 AM", "5:30 PM") into a 24-hour "HH:MM" string for HTML time input.
 */
export function time12To24(timeStr: string): string {
  if (!timeStr) return '08:00';
  const trimmed = timeStr.trim().toUpperCase();

  // If already in 24-hour format HH:MM (without AM/PM)
  if (/^\d{1,2}:\d{2}$/.test(trimmed)) {
    const [h, m] = trimmed.split(':');
    return `${h.padStart(2, '0')}:${m}`;
  }

  const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/);
  if (!match) return '08:00';

  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const modifier = match[3];

  if (modifier === 'PM' && hours < 12) {
    hours += 12;
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, '0')}:${minutes}`;
}

/**
 * Converts a 24-hour "HH:MM" string into a 12-hour AM/PM string (e.g. "08:30 AM", "05:30 PM").
 */
export function time24To12(time24: string): string {
  if (!time24) return '08:00 AM';
  const trimmed = time24.trim();
  const parts = trimmed.split(':');
  if (parts.length < 2) return time24;

  let hours = parseInt(parts[0], 10);
  const minutes = parts[1].slice(0, 2);

  if (isNaN(hours)) return time24;

  const modifier = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;

  return `${String(hours).padStart(2, '0')}:${minutes} ${modifier}`;
}

/**
 * Plays a clean, gentle 2-tone melodic chime using browser Web Audio API
 */
export function playAlarmChime(): void {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // Tone 1: C5 (523.25 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, ctx.currentTime);
    gain1.gain.setValueAtTime(0.25, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.6);

    // Tone 2: E5 (659.25 Hz) starting at 0.22s
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(659.25, ctx.currentTime + 0.22);
    gain2.gain.setValueAtTime(0.3, ctx.currentTime + 0.22);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.1);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.22);
    osc2.stop(ctx.currentTime + 1.1);
  } catch (err) {
    // Audio restriction or unsupported
    console.debug('Web Audio chime playback not available:', err);
  }
}
