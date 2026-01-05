import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { JsonValidator } from './components/tools/JsonValidator';
import { JsonFormatter } from './components/tools/JsonFormatter';
import { JsonCompare } from './components/tools/JsonCompare';
import { PrivacyPolicy } from './components/pages/PrivacyPolicy';
import { CookieConsent } from './components/common/CookieConsent';
import { useAppStore } from './stores/appStore';

const JsonConvert: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">JSON Convert</h1>
    <p className="text-gray-600 dark:text-gray-400">Coming soon...</p>
  </div>
);

const Tools: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">All Tools</h1>
    <p className="text-gray-600 dark:text-gray-400">Coming soon...</p>
  </div>
);

const Home: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
        JSON Tools
      </h1>
      <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        A comprehensive suite of JSON validation, formatting, and conversion tools. 
        Fast, reliable, and completely free to use.
      </p>
      <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
        <div className="rounded-md shadow">
          <a
            href="/validator"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>

    {/* Features Grid */}
    <div className="mt-20">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="pt-6">
          <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="-mt-6">
              <div>
                <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </div>
              <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">JSON Validator</h3>
              <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                Validate your JSON with detailed error reporting and real-time feedback.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="-mt-6">
              <div>
                <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </span>
              </div>
              <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">JSON Formatter</h3>
              <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                Format and beautify your JSON with customizable indentation and styling.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="-mt-6">
              <div>
                <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
              </div>
              <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">JSON Compare</h3>
              <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                Compare two JSON objects and highlight the differences with visual diff.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const { theme } = useAppStore();

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="validator" element={<JsonValidator />} />
            <Route path="formatter" element={<JsonFormatter />} />
            <Route path="compare" element={<JsonCompare />} />
            <Route path="convert" element={<JsonConvert />} />
            <Route path="tools" element={<Tools />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;