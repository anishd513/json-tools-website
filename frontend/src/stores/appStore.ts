import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, EditorOptions } from '../types';

interface AppStore extends AppState {
  // Actions
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  updateEditorOptions: (options: Partial<EditorOptions>) => void;
  addRecentFile: (fileName: string) => void;
  clearRecentFiles: () => void;
}

const defaultEditorOptions: EditorOptions = {
  theme: 'light',
  fontSize: 14,
  wordWrap: true,
  minimap: false,
  lineNumbers: true,
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      theme: 'light',
      editorOptions: defaultEditorOptions,
      recentFiles: [],

      // Actions
      setTheme: (theme) => {
        set({ theme });
        // Update editor theme as well
        const { editorOptions } = get();
        set({
          editorOptions: {
            ...editorOptions,
            theme,
          },
        });
      },

      toggleTheme: () => {
        const { theme } = get();
        const newTheme = theme === 'light' ? 'dark' : 'light';
        get().setTheme(newTheme);
      },

      updateEditorOptions: (options) => {
        const { editorOptions } = get();
        set({
          editorOptions: {
            ...editorOptions,
            ...options,
          },
        });
      },

      addRecentFile: (fileName) => {
        const { recentFiles } = get();
        const updatedFiles = [
          fileName,
          ...recentFiles.filter((file) => file !== fileName),
        ].slice(0, 10); // Keep only last 10 files
        
        set({ recentFiles: updatedFiles });
      },

      clearRecentFiles: () => {
        set({ recentFiles: [] });
      },
    }),
    {
      name: 'json-tools-app-store',
      partialize: (state) => ({
        theme: state.theme,
        editorOptions: state.editorOptions,
        recentFiles: state.recentFiles,
      }),
    }
  )
);

// Tool store for managing current tool state
interface ToolStore {
  currentTool: string;
  inputJson: string;
  outputJson: string;
  secondaryJson: string; // For comparison tools
  isProcessing: boolean;
  error: string | null;
  
  // Actions
  setCurrentTool: (tool: string) => void;
  setInputJson: (json: string) => void;
  setOutputJson: (json: string) => void;
  setSecondaryJson: (json: string) => void;
  setProcessing: (processing: boolean) => void;
  setError: (error: string | null) => void;
  clearAll: () => void;
}

export const useToolStore = create<ToolStore>((set) => ({
  // Initial state
  currentTool: 'validator',
  inputJson: '',
  outputJson: '',
  secondaryJson: '',
  isProcessing: false,
  error: null,

  // Actions
  setCurrentTool: (tool) => set({ currentTool: tool }),
  setInputJson: (json) => set({ inputJson: json }),
  setOutputJson: (json) => set({ outputJson: json }),
  setSecondaryJson: (json) => set({ secondaryJson: json }),
  setProcessing: (processing) => set({ isProcessing: processing }),
  setError: (error) => set({ error }),
  clearAll: () => set({
    inputJson: '',
    outputJson: '',
    secondaryJson: '',
    error: null,
  }),
}));
