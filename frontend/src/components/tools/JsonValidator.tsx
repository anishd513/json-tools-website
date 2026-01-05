import React, { useState, useEffect } from 'react';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon,
  DocumentDuplicateIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { JsonEditor } from '../common/JsonEditor';
import { JsonUtils } from '../../utils/jsonUtils';
import { HeaderAd, InContentAd } from '../common/AdSense';
import type { ValidationResult } from '../../types';

export const JsonValidator: React.FC = () => {
  const [input, setInput] = useState('');
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  // SEO meta updates
  useEffect(() => {
    document.title = 'JSON Validator - Free Online JSON Syntax Validator | JSON Tools';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free online JSON validator. Check JSON syntax, validate JSON format, and get detailed error messages. Fast, secure, and easy to use JSON validation tool.');
    }
  }, []);

  useEffect(() => {
    if (input.trim()) {
      setIsValidating(true);
      const timeoutId = setTimeout(() => {
        const result = JsonUtils.validateJson(input);
        setValidation(result);
        setIsValidating(false);
      }, 300); // Debounce validation

      return () => clearTimeout(timeoutId);
    } else {
      setValidation(null);
      setIsValidating(false);
    }
  }, [input]);

  const handleCopyFormatted = () => {
    if (validation?.formatted) {
      navigator.clipboard.writeText(validation.formatted);
    }
  };

  const handleDownloadFormatted = () => {
    if (validation?.formatted) {
      const blob = new Blob([validation.formatted], { type: 'application/json' });
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

  const sampleJson = `{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "hobbies": ["reading", "swimming", "coding"],
  "address": {
    "street": "123 Main St",
    "zipCode": "10001"
  }
}`;

  const handleLoadSample = () => {
    setInput(sampleJson);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          JSON Validator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Validate your JSON data with detailed error reporting and automatic formatting.
        </p>
      </div>

      {/* Header Ad */}
      <div className="mb-8">
        <HeaderAd className="mb-4" />
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
              placeholder="Paste your JSON here to validate..."
            />
          </div>

          {/* Validation Status */}
          <div className="card p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Validation Status
            </h3>
            
            {isValidating && (
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span>Validating...</span>
              </div>
            )}

            {!isValidating && !validation && (
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <ExclamationTriangleIcon className="h-5 w-5" />
                <span>Enter JSON to validate</span>
              </div>
            )}

            {!isValidating && validation && (
              <div className="space-y-3">
                {validation.isValid ? (
                  <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                    <CheckCircleIcon className="h-5 w-5" />
                    <span className="font-medium">Valid JSON</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                    <XCircleIcon className="h-5 w-5" />
                    <span className="font-medium">Invalid JSON</span>
                  </div>
                )}

                {validation.errors.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">Errors:</h4>
                    {validation.errors.map((error, index) => (
                      <div
                        key={index}
                        className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md"
                      >
                        <div className="text-sm text-red-800 dark:text-red-200">
                          <strong>Line {error.line}, Column {error.column}:</strong> {error.message}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {validation.isValid && (
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                      <div className="text-green-800 dark:text-green-200">
                        <strong>Original Size:</strong> {input.length} characters
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                      <div className="text-blue-800 dark:text-blue-200">
                        <strong>Minified Size:</strong> {validation.minified?.length || 0} characters
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Formatted Output
            </h2>
            {validation?.isValid && (
              <div className="flex space-x-2">
                <button
                  onClick={handleCopyFormatted}
                  className="btn-secondary text-sm flex items-center space-x-1"
                >
                  <DocumentDuplicateIcon className="h-4 w-4" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={handleDownloadFormatted}
                  className="btn-primary text-sm flex items-center space-x-1"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            )}
          </div>
          
          <div className="card p-4">
            <JsonEditor
              value={validation?.formatted || ''}
              onChange={() => {}} // Read-only
              readOnly
              height="500px"
              placeholder="Formatted JSON will appear here..."
            />
          </div>

          {/* JSON Info */}
          {validation?.isValid && (
            <div className="card p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                JSON Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Type:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {(() => {
                      try {
                        const parsed = JSON.parse(input);
                        return Array.isArray(parsed) ? 'Array' : typeof parsed === 'object' ? 'Object' : typeof parsed;
                      } catch {
                        return 'Unknown';
                      }
                    })()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Size Reduction:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {validation.minified ? 
                      `${Math.round((1 - validation.minified.length / input.length) * 100)}%` : 
                      '0%'
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Lines:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {input.split('\n').length}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* In-Content Ad */}
      <div className="my-12">
        <InContentAd />
      </div>

      {/* Features Section */}
      <div className="mt-12 card p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3">
            <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Real-time Validation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Instant validation as you type with detailed error messages
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Auto Formatting</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatically format and beautify valid JSON
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Error Highlighting</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Precise error location with line and column numbers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
