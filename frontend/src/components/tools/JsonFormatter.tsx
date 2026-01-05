import React, { useState, useEffect } from 'react';
import { 
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
  Cog6ToothIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { JsonEditor } from '../common/JsonEditor';
import { JsonUtils } from '../../utils/jsonUtils';

export const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indentSize, setIndentSize] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (input.trim()) {
      setIsProcessing(true);
      const timeoutId = setTimeout(() => {
        try {
          let result = input;
          
          // First validate and format
          const formatResult = JsonUtils.formatJson(input, indentSize);
          if (!formatResult.success) {
            throw new Error(formatResult.error);
          }
          
          result = formatResult.result!;
          
          // Sort keys if requested
          if (sortKeys) {
            const sortResult = JsonUtils.sortJsonKeys(result);
            if (sortResult.success) {
              result = sortResult.result!;
            }
          }
          
          setOutput(result);
          setError(null);
        } catch (err: any) {
          setError(err.message);
          setOutput('');
        } finally {
          setIsProcessing(false);
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setOutput('');
      setError(null);
      setIsProcessing(false);
    }
  }, [input, indentSize, sortKeys]);

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  };

  const handleDownload = () => {
    if (output) {
      const blob = new Blob([output], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'formatted.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleMinify = () => {
    if (input.trim()) {
      const minifyResult = JsonUtils.minifyJson(input);
      if (minifyResult.success) {
        setOutput(minifyResult.result!);
      }
    }
  };

  const sampleJson = `{"users":[{"id":1,"name":"John Doe","email":"john@example.com","address":{"street":"123 Main St","city":"New York","zipCode":"10001"},"hobbies":["reading","swimming"]},{"id":2,"name":"Jane Smith","email":"jane@example.com","address":{"street":"456 Oak Ave","city":"Los Angeles","zipCode":"90210"},"hobbies":["painting","hiking","cooking"]}],"metadata":{"total":2,"page":1,"timestamp":"2024-01-01T00:00:00Z"}}`;

  const handleLoadSample = () => {
    setInput(sampleJson);
  };

  const getCompressionStats = () => {
    if (!input || !output) return null;
    
    const originalSize = input.length;
    const formattedSize = output.length;
    const difference = formattedSize - originalSize;
    const percentChange = Math.round((difference / originalSize) * 100);
    
    return {
      originalSize,
      formattedSize,
      difference,
      percentChange
    };
  };

  const stats = getCompressionStats();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          JSON Formatter
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Format, beautify, and customize your JSON data with advanced formatting options.
        </p>
      </div>

      {/* Formatting Options */}
      <div className="mb-6 card p-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Cog6ToothIcon className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Options:</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <label htmlFor="indent-size" className="text-sm text-gray-600 dark:text-gray-400">
              Indent Size:
            </label>
            <select
              id="indent-size"
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="input-field w-20 py-1 text-sm"
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={8}>8</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="sort-keys"
              checked={sortKeys}
              onChange={(e) => setSortKeys(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="sort-keys" className="text-sm text-gray-600 dark:text-gray-400">
              Sort Keys Alphabetically
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Input JSON
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={handleLoadSample}
                className="btn-secondary text-sm"
              >
                Load Sample
              </button>
              <button
                onClick={() => setInput('')}
                className="btn-secondary text-sm"
              >
                Clear
              </button>
            </div>
          </div>
          
          <div className="card p-4">
            <JsonEditor
              value={input}
              onChange={setInput}
              height="500px"
              placeholder="Paste your JSON here to format..."
            />
          </div>

          {/* Input Stats */}
          {input && (
            <div className="card p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Input Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <div className="text-blue-800 dark:text-blue-200">
                    <strong>Size:</strong> {input.length} characters
                  </div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                  <div className="text-green-800 dark:text-green-200">
                    <strong>Lines:</strong> {input.split('\n').length}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Formatted Output
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={handleMinify}
                disabled={!input || isProcessing}
                className="btn-secondary text-sm flex items-center space-x-1 disabled:opacity-50"
              >
                <ArrowPathIcon className="h-4 w-4" />
                <span>Minify</span>
              </button>
              <button
                onClick={handleCopy}
                disabled={!output}
                className="btn-secondary text-sm flex items-center space-x-1 disabled:opacity-50"
              >
                <DocumentDuplicateIcon className="h-4 w-4" />
                <span>Copy</span>
              </button>
              <button
                onClick={handleDownload}
                disabled={!output}
                className="btn-primary text-sm flex items-center space-x-1 disabled:opacity-50"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
          
          <div className="card p-4">
            {isProcessing ? (
              <div className="flex items-center justify-center h-[500px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <JsonEditor
                value={output}
                onChange={() => {}}
                readOnly
                height="500px"
                placeholder="Formatted JSON will appear here..."
              />
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="card p-4 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">
                Formatting Error
              </h3>
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Output Stats */}
          {stats && (
            <div className="card p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Formatting Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <div className="text-blue-800 dark:text-blue-200">
                    <strong>Original:</strong> {stats.originalSize} chars
                  </div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                  <div className="text-green-800 dark:text-green-200">
                    <strong>Formatted:</strong> {stats.formattedSize} chars
                  </div>
                </div>
                <div className="col-span-2 p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-md">
                  <div className="text-purple-800 dark:text-purple-200">
                    <strong>Size Change:</strong> {stats.difference > 0 ? '+' : ''}{stats.difference} chars ({stats.percentChange > 0 ? '+' : ''}{stats.percentChange}%)
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-12 card p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Formatting Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3">
            <Cog6ToothIcon className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Custom Indentation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose between 2, 4, or 8 spaces for indentation
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <ArrowPathIcon className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Key Sorting</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatically sort object keys alphabetically
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <DocumentDuplicateIcon className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Quick Actions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Copy, download, or minify with one click
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
