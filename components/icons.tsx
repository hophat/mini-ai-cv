import React from 'react';

export const Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  />
);

export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </Icon>
);

export const MailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </Icon>
);

export const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Icon>
);

export const MapPinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
);

export const LinkedinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </Icon>
);

export const LinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" />
    </Icon>
);

export const PencilIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </Icon>
);

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props} fill="currentColor">
    <path d="M9.9 2.25a.75.75 0 0 1 1.05 0l1.24 1.24a.75.75 0 0 0 1.06 0l1.24-1.24a.75.75 0 1 1 1.06 1.06l-1.24 1.24a.75.75 0 0 0 0 1.06l1.24 1.24a.75.75 0 1 1-1.06 1.06L13.25 7.81a.75.75 0 0 0-1.06 0L10.94 9.06a.75.75 0 1 1-1.06-1.06l1.24-1.24a.75.75 0 0 0 0-1.06L9.88 4.44a.75.75 0 1 1 1.06-1.06l1.24 1.24a.75.75 0 0 0 1.06 0l1.24-1.24a.75.75 0 0 1 1.06-1.05Z M3.25 9.19a.75.75 0 0 1 1.06 0l1.24 1.24a.75.75 0 0 0 1.06 0l1.24-1.24a.75.75 0 1 1 1.06 1.06l-1.24 1.24a.75.75 0 0 0 0 1.06l1.24 1.24a.75.75 0 1 1-1.06 1.06L6.61 13.75a.75.75 0 0 0-1.06 0L4.31 15a.75.75 0 1 1-1.06-1.06l1.24-1.24a.75.75 0 0 0 0-1.06L3.25 10.4a.75.75 0 0 1 0-1.06Z M15 15.69a.75.75 0 0 1 1.06 0l1.24 1.24a.75.75 0 0 0 1.06 0l1.24-1.24a.75.75 0 1 1 1.06 1.06l-1.24 1.24a.75.75 0 0 0 0 1.06l1.24 1.24a.75.75 0 1 1-1.06 1.06l-1.24-1.24a.75.75 0 0 0-1.06 0l-1.24 1.24a.75.75 0 0 1-1.06-1.06l1.24-1.24a.75.75 0 0 0 0-1.06l-1.24-1.24a.75.75 0 0 1 0-1.06Z" />
  </Icon>
);