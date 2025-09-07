import React from 'react';
import { CVData } from '../../types';
import { MailIcon, PhoneIcon, MapPinIcon, LinkedinIcon, LinkIcon, PencilIcon } from '../icons';
import { useI18n } from '../../hooks/useI18n';

interface ClassicTemplateProps {
  data: CVData;
  avatar: string | null;
  isEditable?: boolean;
  onEdit?: (section: keyof CVData) => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode; isEditable?: boolean; onEdit?: () => void; }> = ({ title, children, isEditable, onEdit }) => (
  <section className="mb-6 relative group">
    <h2 className="text-xl font-bold border-b-2 border-gray-700 pb-1 mb-3 text-gray-800 uppercase tracking-wider">{title}</h2>
    {isEditable && onEdit && (
        <button 
          onClick={onEdit} 
          className="absolute top-0 right-0 p-1 rounded-full bg-gray-200 text-gray-600 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity" 
          aria-label={`Edit ${title}`}
        >
            <PencilIcon className="w-4 h-4" />
        </button>
    )}
    {children}
  </section>
);

export const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data, avatar, isEditable, onEdit }) => {
  const { t } = useI18n();
  return (
    <div className="bg-white p-8 font-serif text-gray-800 w-full max-w-4xl mx-auto shadow-lg">
      <header className="text-center mb-8 border-b-4 border-gray-300 pb-4 relative group">
        {isEditable && (
          <>
            <button onClick={() => onEdit?.('name')} className="absolute top-4 right-12 p-1 rounded-full bg-gray-200 text-gray-600 opacity-0 group-hover:opacity-100" aria-label="Edit name and title"><PencilIcon className="w-4 h-4" /></button>
          </>
        )}
        {avatar && <img src={avatar} alt="Avatar" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />}
        <h1 className="text-4xl font-bold text-gray-900">{data.name}</h1>
        <p className="text-xl text-gray-600 mt-1">{data.title}</p>
      </header>
      
      <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-8 relative group">
        {isEditable && (
            <button onClick={() => onEdit?.('contact')} className="absolute top-0 right-0 p-1 rounded-full bg-gray-200 text-gray-600 opacity-0 group-hover:opacity-100" aria-label="Edit contact info"><PencilIcon className="w-4 h-4" /></button>
        )}
        <div className="flex items-center"><MapPinIcon className="w-4 h-4 mr-2 text-gray-600" /> {data.contact.location}</div>
        <div className="flex items-center"><PhoneIcon className="w-4 h-4 mr-2 text-gray-600" /> {data.contact.phone}</div>
        <div className="flex items-center"><MailIcon className="w-4 h-4 mr-2 text-gray-600" /> {data.contact.email}</div>
        <div className="flex items-center"><LinkedinIcon className="w-4 h-4 mr-2 text-gray-600" /> {data.contact.linkedin}</div>
        <div className="flex items-center"><LinkIcon className="w-4 h-4 mr-2 text-gray-600" /> {data.contact.portfolio}</div>
      </div>

      <main>
        <Section title={t('cvSections.profile')} isEditable={isEditable} onEdit={() => onEdit?.('profile')}>
          <p className="text-base leading-relaxed">{data.profile}</p>
        </Section>

        <Section title={t('cvSections.workExperience')} isEditable={isEditable} onEdit={() => onEdit?.('workExperience')}>
          {data.workExperience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{exp.role}</h3>
              <div className="flex justify-between text-sm text-gray-600">
                <p className="font-medium">{exp.company}{exp.location && `, ${exp.location}`}</p>
                <p>{exp.period}</p>
              </div>
              <ul className="list-disc list-inside mt-2 text-base space-y-1">
                {exp.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
              </ul>
            </div>
          ))}
        </Section>

        <Section title={t('cvSections.skills')} isEditable={isEditable} onEdit={() => onEdit?.('skills')}>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
            ))}
          </div>
        </Section>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Section title={t('cvSections.education')} isEditable={isEditable} onEdit={() => onEdit?.('education')}>
                {data.education.map((edu, index) => (
                    <div key={index} className="mb-3">
                        <h3 className="text-lg font-semibold">{edu.degree}</h3>
                        <p className="text-gray-600">{edu.institution}</p>
                        <p className="text-sm text-gray-500">{edu.year}</p>
                    </div>
                ))}
            </Section>
            
            <Section title={t('cvSections.projects')} isEditable={isEditable} onEdit={() => onEdit?.('projects')}>
                {data.projects.map((proj, index) => (
                    <div key={index} className="mb-3">
                        <h3 className="text-lg font-semibold">{proj.name}</h3>
                        <p className="text-gray-600">{proj.description}</p>
                    </div>
                ))}
            </Section>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Section title={t('cvSections.languages')} isEditable={isEditable} onEdit={() => onEdit?.('languages')}>
                <ul className="list-disc list-inside space-y-1">
                    {data.languages.map((lang, index) => <li key={index}>{lang}</li>)}
                </ul>
            </Section>
            
            <Section title={t('cvSections.interests')} isEditable={isEditable} onEdit={() => onEdit?.('interests')}>
                <ul className="list-disc list-inside space-y-1">
                    {data.interests.map((interest, index) => <li key={index}>{interest}</li>)}
                </ul>
            </Section>
        </div>
      </main>
    </div>
  );
};
