import React, { useRef } from 'react';
import Editor, { type Monaco } from '@monaco-editor/react';
import { useAppStore } from '../../stores/appStore';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  height?: string;
  placeholder?: string;
  showLineNumbers?: boolean;
  showMinimap?: boolean;
  language?: string;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({
  value,
  onChange,
  readOnly = false,
  height = '400px',
  placeholder = 'Enter JSON here...',
  showLineNumbers = true,
  showMinimap = false,
  language = 'json',
}) => {
  const { theme, editorOptions } = useAppStore();
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Configure JSON language features
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      allowComments: false,
      schemas: [],
      enableSchemaRequest: false,
    });

    // Add custom JSON validation
    editor.onDidChangeModelContent(() => {
      const model = editor.getModel();
      if (model && language === 'json') {
        validateJson(model, monaco);
      }
    });
  };

  const validateJson = (model: any, monaco: Monaco) => {
    const value = model.getValue();
    const markers: any[] = [];

    if (value.trim()) {
      try {
        JSON.parse(value);
      } catch (error: any) {
        const match = error.message.match(/at position (\d+)/);
        const position = match ? parseInt(match[1]) : 0;
        const pos = model.getPositionAt(position);
        
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          startLineNumber: pos.lineNumber,
          startColumn: pos.column,
          endLineNumber: pos.lineNumber,
          endColumn: pos.column + 1,
          message: error.message,
        });
      }
    }

    monaco.editor.setModelMarkers(model, 'json-validation', markers);
  };

  const handleEditorChange = (value: string | undefined) => {
    onChange(value || '');
  };

  const editorTheme = theme === 'dark' ? 'vs-dark' : 'vs';

  return (
    <div className="relative">
      {!value && placeholder && (
        <div className="absolute top-4 left-16 text-gray-400 dark:text-gray-500 pointer-events-none z-10 font-mono text-sm">
          {placeholder}
        </div>
      )}
      <Editor
        height={height}
        language={language}
        theme={editorTheme}
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          readOnly,
          fontSize: editorOptions.fontSize,
          wordWrap: editorOptions.wordWrap ? 'on' : 'off',
          minimap: { enabled: showMinimap || editorOptions.minimap },
          lineNumbers: showLineNumbers && editorOptions.lineNumbers ? 'on' : 'off',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          detectIndentation: false,
          renderWhitespace: 'selection',
          bracketPairColorization: { enabled: true },
          folding: true,
          foldingHighlight: true,
          showFoldingControls: 'always',
          contextmenu: true,
          selectOnLineNumbers: true,
          roundedSelection: false,
          cursorStyle: 'line',
          cursorBlinking: 'blink',
          smoothScrolling: true,
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
      />
    </div>
  );
};
