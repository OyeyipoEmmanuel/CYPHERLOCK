
export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

export interface PasswordStrength {
  score: number; // 0 to 100
  label: 'WEAK' | 'MEDIUM' | 'STRONG' | 'GODLIKE';
  color: string;
}

export interface HistoryItem {
  id: string;
  value: string;
  timestamp: number;
}
