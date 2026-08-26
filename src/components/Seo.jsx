import { useEffect } from 'react';

const siteUrl = 'https://fitness-exercices.netlify.app';

const setMeta = (attribute, key, content) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const setCanonical = (url) => {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', url);
};

const Seo = ({ title, description, path = '/', structuredData }) => {
  useEffect(() => {
    const url = `${siteUrl}${path}`;
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setCanonical(url);

    const existingStructuredData = document.head.querySelector('script[data-seo-schema="true"]');
    existingStructuredData?.remove();

    if (structuredData) {
      const schema = document.createElement('script');
      schema.type = 'application/ld+json';
      schema.dataset.seoSchema = 'true';
      schema.textContent = JSON.stringify(structuredData);
      document.head.appendChild(schema);
    }

    return () => {
      document.head.querySelector('script[data-seo-schema="true"]')?.remove();
    };
  }, [description, path, structuredData, title]);

  return null;
};

export default Seo;
