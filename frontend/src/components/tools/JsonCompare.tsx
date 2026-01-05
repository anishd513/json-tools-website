import React, { useState, useEffect } from 'react';
import { 
  DocumentDuplicateIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { JsonEditor } from '../common/JsonEditor';
import { JsonUtils } from '../../utils/jsonUtils';
import type { ComparisonResult, Difference } from '../../types';

export const JsonCompare: React.FC = () => {
  const [leftJson, setLeftJson] = useState('');
  const [rightJson, setRightJson] = useState('');
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // SEO meta updates
  useEffect(() => {
    document.title = 'JSON Compare - Free Online JSON Diff Tool & Comparator | JSON Tools';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free online JSON comparison tool. Compare two JSON objects, find differences, and visualize changes with syntax highlighting and detailed diff reports.');
    }
  }, []);

  useEffect(() => {
    if (leftJson.trim() && rightJson.trim()) {
      setIsComparing(true);
      const timeoutId = setTimeout(() => {
        try {
          const result = JsonUtils.compareJson(leftJson, rightJson);
          setComparison(result);
          setError(null);
        } catch (err: any) {
          setError(err.message);
          setComparison(null);
        } finally {
          setIsComparing(false);
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setComparison(null);
      setError(null);
      setIsComparing(false);
    }
  }, [leftJson, rightJson]);

  const handleSwap = () => {
    const temp = leftJson;
    setLeftJson(rightJson);
    setRightJson(temp);
  };

  const handleCopyLeft = () => {
    navigator.clipboard.writeText(leftJson);
  };

  const handleCopyRight = () => {
    navigator.clipboard.writeText(rightJson);
  };

  const sampleJson1 = `{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "hobbies": ["reading", "swimming"],
  "address": {
    "street": "123 Main St",
    "zipCode": "10001"
  }
}`;

  const sampleJson2 = `{
  "name": "John Doe",
  "age": 31,
  "city": "Los Angeles",
  "hobbies": ["reading", "coding"],
  "address": {
    "street": "456 Oak Ave",
    "zipCode": "90210"
  },
  "email": "john@example.com"
}`;

  const handleLoadSample = () => {
    setLeftJson(sampleJson1);
    setRightJson(sampleJson2);
  };

  const getDifferenceTypeColor = (type: Difference['type']) => {
    switch (type) {
      case 'added':
        return 'text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'removed':
        return 'text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'modified':
        return 'text-yellow-700 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      default:
        return 'text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  const getDifferenceIcon = (type: Difference['type']) => {
    switch (type) {
      case 'added':
        return <span className="text-green-600">+</span>;
      case 'removed':
        return <span className="text-red-600">-</span>;
      case 'modified':
        return <span className="text-yellow-600">~</span>;
      default:
        return null;
    }
  };

  const formatValue = (value: any) => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          JSON Compare
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Compare two JSON objects and identify differences with detailed analysis.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mb-6 flex flex-wrap gap-4">
        <button
          onClick={handleLoadSample}
          className="btn-secondary flex items-center space-x-2"
        >
          <DocumentDuplicateIcon className="h-4 w-4" />
          <span>Load Sample Data</span>
        </button>
        <button
          onClick={handleSwap}
          disabled={!leftJson && !rightJson}
          className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
        >
          <ArrowPathIcon className="h-4 w-4" />
          <span>Swap JSONs</span>
        </button>
        <button
          onClick={() => { setLeftJson(''); setRightJson(''); }}
          className="btn-secondary"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left JSON */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              JSON A (Left)
            </h2>
            <button
              onClick={handleCopyLeft}
              disabled={!leftJson}
              className="btn-secondary text-sm flex items-center space-x-1 disabled:opacity-50"
            >
              <DocumentDuplicateIcon className="h-4 w-4" />
              <span>Copy</span>
            </button>
          </div>
          
          <div className="card p-4">
            <JsonEditor
              value={leftJson}
              onChange={setLeftJson}
              height="400px"
              placeholder="Paste first JSON here..."
            />
          </div>
        </div>

        {/* Right JSON */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              JSON B (Right)
            </h2>
            <button
              onClick={handleCopyRight}
              disabled={!rightJson}
              className="btn-secondary text-sm flex items-center space-x-1 disabled:opacity-50"
            >
              <DocumentDuplicateIcon className="h-4 w-4" />
              <span>Copy</span>
            </button>
          </div>
          
          <div className="card p-4">
            <JsonEditor
              value={rightJson}
              onChange={setRightJson}
              height="400px"
              placeholder="Paste second JSON here..."
            />
          </div>
        </div>
      </div>

      {/* Comparison Results */}
      <div className="space-y-6">
        {/* Comparison Status */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Comparison Results
          </h3>
          
          {isComparing && (
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span>Comparing JSONs...</span>
            </div>
          )}

          {!isComparing && !comparison && !error && (
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <ExclamationTriangleIcon className="h-5 w-5" />
              <span>Enter JSON data in both fields to compare</span>
            </div>
          )}

          {error && (
            <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
              <XCircleIcon className="h-5 w-5" />
              <span>Error: {error}</span>
            </div>
          )}

          {!isComparing && comparison && (
            <div className="space-y-4">
              {comparison.areEqual ? (
                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                  <CheckCircleIcon className="h-6 w-6" />
                  <span className="text-lg font-medium">JSONs are identical!</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                  <XCircleIcon className="h-6 w-6" />
                  <span className="text-lg font-medium">
                    JSONs are different ({comparison.differences.length} difference{comparison.differences.length !== 1 ? 's' : ''} found)
                  </span>
                </div>
              )}

              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <div className="text-red-800 dark:text-red-200">
                    <div className="text-2xl font-bold">
                      {comparison.differences.filter(d => d.type === 'removed').length}
                    </div>
                    <div className="text-sm">Removed</div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                  <div className="text-green-800 dark:text-green-200">
                    <div className="text-2xl font-bold">
                      {comparison.differences.filter(d => d.type === 'added').length}
                    </div>
                    <div className="text-sm">Added</div>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                  <div className="text-yellow-800 dark:text-yellow-200">
                    <div className="text-2xl font-bold">
                      {comparison.differences.filter(d => d.type === 'modified').length}
                    </div>
                    <div className="text-sm">Modified</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Differences */}
        {comparison && !comparison.areEqual && comparison.differences.length > 0 && (
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Detailed Differences
            </h3>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {comparison.differences.map((diff, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-md ${getDifferenceTypeColor(diff.type)}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center font-mono font-bold">
                      {getDifferenceIcon(diff.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium font-mono text-sm break-all">
                        {diff.path || '(root)'}
                      </div>
                      <div className="mt-1 text-sm">
                        {diff.type === 'added' && (
                          <div>
                            <span className="font-medium">Added:</span> {formatValue(diff.newValue)}
                          </div>
                        )}
                        {diff.type === 'removed' && (
                          <div>
                            <span className="font-medium">Removed:</span> {formatValue(diff.oldValue)}
                          </div>
                        )}
                        {diff.type === 'modified' && (
                          <div className="space-y-1">
                            <div>
                              <span className="font-medium">Old:</span> {formatValue(diff.oldValue)}
                            </div>
                            <div>
                              <span className="font-medium">New:</span> {formatValue(diff.newValue)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-xs font-medium uppercase tracking-wider">
                      {diff.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="mt-12 card p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Comparison Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3">
            <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Deep Comparison</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Recursively compare nested objects and arrays
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Difference Types</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Identify added, removed, and modified properties
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <DocumentDuplicateIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Path Tracking</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Show exact location of each difference
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
