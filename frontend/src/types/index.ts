export interface JsonError {
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

export interface ValidationResult {
  isValid: boolean;
  errors: JsonError[];
  formatted?: string;
  minified?: string;
}

export interface ConversionResult {
  success: boolean;
  result?: string;
  error?: string;
}

export interface ComparisonResult {
  areEqual: boolean;
  differences: Difference[];
}

export interface Difference {
  path: string;
  type: 'added' | 'removed' | 'modified';
  oldValue?: any;
  newValue?: any;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'validation' | 'formatting' | 'conversion' | 'comparison' | 'utility';
  path: string;
  icon: string;
}

export interface EditorOptions {
  theme: 'light' | 'dark';
  fontSize: number;
  wordWrap: boolean;
  minimap: boolean;
  lineNumbers: boolean;
}

export interface AppState {
  theme: 'light' | 'dark';
  editorOptions: EditorOptions;
  recentFiles: string[];
}

export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
export interface JsonObject {
  [key: string]: JsonValue;
}
export type JsonArray = JsonValue[];
