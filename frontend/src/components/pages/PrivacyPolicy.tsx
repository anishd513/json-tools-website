import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Privacy Policy
      </h1>
      
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            1. Information We Collect
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Automatically Collected Information:</strong> We may collect certain information automatically when you visit our website, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address and browser information</li>
              <li>Pages visited and time spent on our site</li>
              <li>Device and operating system information</li>
              <li>Referring website information</li>
            </ul>
            <p>
              <strong>User-Provided Information:</strong> We do not require registration or personal information to use our JSON tools. Any JSON data you input is processed locally in your browser and is not stored on our servers.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            2. How We Use Information
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and improve our JSON tools and services</li>
              <li>Analyze website usage and performance</li>
              <li>Display relevant advertisements through Google AdSense</li>
              <li>Ensure website security and prevent abuse</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            3. Google AdSense and Advertising
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              We use Google AdSense to display advertisements on our website. Google AdSense uses cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Show ads based on your interests and previous visits to our site</li>
              <li>Measure ad performance and effectiveness</li>
              <li>Prevent fraudulent activity</li>
            </ul>
            <p>
              You can opt out of personalized advertising by visiting{' '}
              <a 
                href="https://www.google.com/settings/ads" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline"
              >
                Google's Ad Settings
              </a>.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            4. Cookies and Tracking Technologies
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>We use cookies and similar technologies for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong>Advertising Cookies:</strong> Used by Google AdSense to show relevant ads</li>
              <li><strong>Preference Cookies:</strong> Remember your settings (like dark/light theme)</li>
            </ul>
            <p>
              You can control cookies through your browser settings. However, disabling certain cookies may affect website functionality.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            5. Data Security
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              We implement appropriate security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>HTTPS encryption for all data transmission</li>
              <li>Client-side processing of JSON data (not stored on servers)</li>
              <li>Regular security updates and monitoring</li>
              <li>Limited data collection and retention</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            6. Third-Party Services
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>Our website uses the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google AdSense:</strong> For displaying advertisements</li>
              <li><strong>Google Analytics:</strong> For website analytics (if enabled)</li>
              <li><strong>Google Fonts:</strong> For typography</li>
            </ul>
            <p>
              These services have their own privacy policies and may collect information independently.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            7. Your Rights (GDPR)
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>If you are in the European Union, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate personal data</li>
              <li>Delete your personal data</li>
              <li>Restrict processing of your personal data</li>
              <li>Data portability</li>
              <li>Object to processing</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            8. Children's Privacy
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            9. Changes to This Policy
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibent text-gray-900 dark:text-white mb-4">
            10. Contact Us
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              If you have any questions about this privacy policy or our practices, please contact us at:
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <p><strong>Email:</strong> privacy@jsontools.dev</p>
              <p><strong>Website:</strong> https://jsontools.dev</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};











