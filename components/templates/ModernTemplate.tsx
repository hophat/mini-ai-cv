import React from 'react';
import { CVData } from '../../types';
import { MailIcon, PhoneIcon, MapPinIcon, LinkedinIcon, LinkIcon, PencilIcon } from '../icons';
import { useI18n } from '../../hooks/useI18n';

interface ModernTemplateProps {
  data: CVData;
  avatar: string | null;
  isEditable?: boolean;
  onEdit?: (section: keyof CVData) => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string; isEditable?: boolean; onEdit?: () => void; }> = ({ title, children, className = '', isEditable, onEdit }) => (
    <section className={`relative group mb-6 ${className}`}>
        <h2 className="text-teal-300 font-bold uppercase tracking-widest text-lg mb-3">{title}</h2>
        {isEditable && onEdit && (
            <button onClick={onEdit} className="absolute top-0 right-0 p-1 rounded-full bg-gray-600 text-white opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity" aria-label={`Edit ${title}`}>
                <PencilIcon className="w-4 h-4" />
            </button>
        )}
        {children}
    </section>
);

const MainSection: React.FC<{ title: string; children: React.ReactNode; isEditable?: boolean; onEdit?: () => void; }> = ({ title, children, isEditable, onEdit }) => (
    <section className="mb-6 relative group">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">{title}</h2>
        {isEditable && onEdit && (
            <button onClick={onEdit} className="absolute top-0 right-0 p-1 rounded-full bg-gray-200 text-gray-600 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity" aria-label={`Edit ${title}`}>
                <PencilIcon className="w-4 h-4" />
            </button>
        )}
        {children}
    </section>
);

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data, avatar, isEditable, onEdit }) => {
  const { t } = useI18n();
  return (
    <div className="bg-white font-sans w-full max-w-4xl mx-auto shadow-lg flex min-h-[29.7cm]">
      {/* Left Sidebar */}
      <aside className="bg-gray-800 text-white w-1/3 p-6">
        <div className="relative group">
            {isEditable && (
              <button onClick={() => onEdit?.('name')} className="absolute top-0 right-0 p-1 rounded-full bg-gray-600 text-white opacity-0 group-hover:opacity-100" aria-label="Edit name and title"><PencilIcon className="w-4 h-4" /></button>
            )}
            {avatar && <img src={avatar} alt="Avatar" className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-teal-400" />}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">{data.name}</h1>
              <p className="text-lg text-teal-300">{data.title}</p>
            </div>
        </div>
        
        <Section title={t('cvSections.contact')} isEditable={isEditable} onEdit={() => onEdit?.('contact')}>
          <div className="space-y-3 text-sm">
            <div className="flex items-start"><MapPinIcon className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-teal-400" /> <span>{data.contact.location}</span></div>
            <div className="flex items-center"><PhoneIcon className="w-4 h-4 mr-3 flex-shrink-0 text-teal-400" /> <span>{data.contact.phone}</span></div>
            <div className="flex items-center"><MailIcon className="w-4 h-4 mr-3 flex-shrink-0 text-teal-400" /> <span className="break-all">{data.contact.email}</span></div>
            <div className="flex items-center"><LinkedinIcon className="w-4 h-4 mr-3 flex-shrink-0 text-teal-400" /> <span className="break-all">{data.contact.linkedin}</span></div>
            <div className="flex items-center"><LinkIcon className="w-4 h-4 mr-3 flex-shrink-0 text-teal-400" /> <span className="break-all">{data.contact.portfolio}</span></div>
          </div>
        </Section>

        <Section title={t('cvSections.skills')} isEditable={isEditable} onEdit={() => onEdit?.('skills')}>
          <ul className="space-y-2 text-sm">
            {data.skills.map((skill, index) => <li key={index} className="flex items-center"><span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>{skill}</li>)}
          </ul>
        </Section>
        
        <Section title={t('cvSections.languages')} isEditable={isEditable} onEdit={() => onEdit?.('languages')}>
            <ul className="space-y-2 text-sm">
                {data.languages.map((lang, index) => <li key={index}>{lang}</li>)}
            </ul>
        </Section>

        <Section title={t('cvSections.interests')} isEditable={isEditable} onEdit={() => onEdit?.('interests')}>
            <ul className="space-y-2 text-sm">
                {data.interests.map((interest, index) => <li key={index}>{interest}</li>)}
            </ul>
        </Section>
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-8 bg-gray-50">
        <MainSection title={t('cvSections.profile')} isEditable={isEditable} onEdit={() => onEdit?.('profile')}>
          <p className="text-gray-700 leading-relaxed">{data.profile}</p>
        </MainSection>

        <MainSection title={t('cvSections.workExperience')} isEditable={isEditable} onEdit={() => onEdit?.('workExperience')}>
          {data.workExperience.map((exp, index) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                <p className="text-sm text-gray-500">{exp.period}</p>
              </div>
              <p className="text-md text-teal-600 font-medium">{exp.company}{exp.location && `, ${exp.location}`}</p>
              <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1 text-sm">
                {exp.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
              </ul>
            </div>
          ))}
        </MainSection>

        <MainSection title={t('cvSections.education')} isEditable={isEditable} onEdit={() => onEdit?.('education')}>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
              <p className="text-md text-gray-700">{edu.institution}</p>
              <p className="text-sm text-gray-500">{edu.year}</p>
            </div>
          ))}
        </MainSection>
        
        <MainSection title={t('cvSections.projects')} isEditable={isEditable} onEdit={() => onEdit?.('projects')}>
            {data.projects.map((proj, index) => (
                <div key={index} className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{proj.name}</h3>
                    <p className="text-md text-gray-700">{proj.description}</p>
                </div>
            ))}
        </MainSection>
      </main>
    </div>
  );
};
