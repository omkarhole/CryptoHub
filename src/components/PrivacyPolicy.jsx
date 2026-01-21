import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-content">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: January 2026</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to <strong>CryptoHub</strong>. Your privacy is very important
            to us. This Privacy Policy explains how we collect, use, and protect
            your information when you use our website and services.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <ul>
            <li>Email address when you sign up or subscribe</li>
            <li>Basic profile information</li>
            <li>Usage data like pages visited and interactions</li>
            <li>Device and browser information</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Personalize your experience</li>
            <li>Send important updates and notifications</li>
            <li>Improve security and prevent fraud</li>
          </ul>
        </section>

        <section>
          <h2>4. Cookies</h2>
          <p>
            We use cookies to improve user experience, analyze traffic, and
            remember user preferences. You can disable cookies from your browser
            settings at any time.
          </p>
        </section>

        <section>
          <h2>5. Data Protection</h2>
          <p>
            We implement strong security measures to protect your personal data.
            However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section>
          <h2>6. Third-Party Services</h2>
          <p>
            We may use third-party services such as analytics tools or payment
            providers. These services have their own privacy policies.
          </p>
        </section>

        <section>
          <h2>7. Your Rights</h2>
          <ul>
            <li>You can request access to your data</li>
            <li>You can request deletion of your data</li>
            <li>You can opt out of emails at any time</li>
          </ul>
        </section>

        <section>
          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will
            be posted on this page.
          </p>
        </section>

        <section>
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p className="email">support@cryptohub.com</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
