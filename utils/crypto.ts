
import { PasswordOptions, PasswordStrength } from '../types';

export const generateSecurePassword = (options: PasswordOptions): string => {
  const charset = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
  };

  let chars = '';
  if (options.includeUppercase) chars += charset.uppercase;
  if (options.includeLowercase) chars += charset.lowercase;
  if (options.includeNumbers) chars += charset.numbers;
  if (options.includeSymbols) chars += charset.symbols;

  if (chars === '') chars = charset.lowercase; // Fallback

  const array = new Uint32Array(options.length);
  window.crypto.getRandomValues(array);

  let password = '';
  for (let i = 0; i < options.length; i++) {
    password += chars[array[i] % chars.length];
  }

  return password;
};

export const calculateStrength = (password: string): PasswordStrength => {
  if (!password) return { score: 0, label: 'WEAK', color: 'bg-rose-500' };

  let score = 0;
  
  // Length contribution
  score += Math.min(password.length * 3.5, 50);

  // Character variety contribution
  if (/[A-Z]/.test(password)) score += 10;
  if (/[a-z]/.test(password)) score += 10;
  if (/[0-9]/.test(password)) score += 15;
  if (/[^A-Za-z0-9]/.test(password)) score += 15;

  // Penalty for repetition
  const uniqueChars = new Set(password).size;
  const ratio = uniqueChars / password.length;
  score = score * ratio;

  const finalScore = Math.min(Math.round(score), 100);

  if (finalScore < 40) return { score: finalScore, label: 'WEAK', color: 'bg-rose-500' };
  if (finalScore < 70) return { score: finalScore, label: 'MEDIUM', color: 'bg-amber-500' };
  if (finalScore < 90) return { score: finalScore, label: 'STRONG', color: 'bg-emerald-500' };
  return { score: finalScore, label: 'GODLIKE', color: 'bg-cyan-400' };
};
