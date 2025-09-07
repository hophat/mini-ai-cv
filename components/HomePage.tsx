import React, { useState, useRef } from 'react';
import { CVData, Template } from '../types';
import { INITIAL_CV_DATA } from '../constants';
import { parseCV, translateSection } from '../services/geminiService';
import { ControlPanel } from './ControlPanel';
import { CVPreview } from './CVPreview';
import { EditModal } from './EditModal';
import { useI18n } from '../hooks/useI18n';

// Helper function to ensure CV data from the API has a consistent and safe structure
const normalizeCvData = (data: Partial<CVData>): CVData => {
  const defaults: CVData = INITIAL_CV_DATA;

  const normalized = {
    ...defaults,
    ...data,
  };

  // Deep merge for nested objects to prevent partial data from overwriting the whole object
  normalized.contact = {
    ...defaults.contact,
    ...(data.contact || {}),
  };

  // Ensure arrays of objects exist and that each object has a consistent shape
  normalized.workExperience = (data.workExperience || []).map(exp => ({
    role: exp.role || '',
    company: exp.company || '',
    period: exp.period || '',
    location: exp.location || '',
    responsibilities: exp.responsibilities || [],
  }));

  normalized.education = (data.education || []).map(edu => ({
    degree: edu.degree || '',
    institution: edu.institution || '',
    year: edu.year || '',
  }));

  normalized.projects = (data.projects || []).map(proj => ({
    name: proj.name || '',
    description: proj.description || '',
  }));
  
  return normalized;
};


const HomePage: React.FC = () => {
  const [page, setPage] = useState<'home' | 'editor'>('home');
  // `displayCvData` is what the user sees, it can be a translated version.
  const [displayCvData, setDisplayCvData] = useState<CVData>(INITIAL_CV_DATA);
  // `sourceCv` is the source of truth. All translations and major edits originate from here.
  const [sourceCv, setSourceCv] = useState<{ data: CVData; lang: string }>({
    data: INITIAL_CV_DATA,
    lang: 'en',
  });
  const [template, setTemplate] = useState<Template>(Template.Modern);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editModalData, setEditModalData] = useState<{ section: keyof CVData } | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationStatus, setTranslationStatus] = useState('');

  const cvPreviewRef = useRef<HTMLDivElement>(null);
  const cvUploadInputRef = useRef<HTMLInputElement>(null);
  const { language, t } = useI18n();

  const handlePrint = () => {
    window.print();
  };
  
  const handleGoHome = () => {
    setPage('home');
  };

  const handleCreateFromTemplate = () => {
    setDisplayCvData(INITIAL_CV_DATA);
    setSourceCv({ data: INITIAL_CV_DATA, lang: 'en' });
    setAvatar(null);
    setPage('editor');
  };

  const handleCVUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const parsedData = await parseCV(file);
      const normalized = normalizeCvData(parsedData);
      setDisplayCvData(normalized);
      // The newly uploaded CV becomes the new source of truth in the current UI language.
      setSourceCv({ data: normalized, lang: language });
      setPage('editor');
    } catch (error) {
      console.error("Failed to parse CV:", error);
      alert("Failed to parse CV. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCvFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleCVUpload(e.target.files[0]);
    }
    if(e.target) e.target.value = '';
  };

  const handleAvatarUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = (section: keyof CVData) => {
    setEditModalData({ section });
  };
  
  const handleSaveEdit = (sectionKey: keyof CVData, newData: any) => {
    const newDisplayData = { ...displayCvData, [sectionKey]: newData };
    setDisplayCvData(newDisplayData);
    // The manually edited version becomes the new source of truth.
    setSourceCv({ data: newDisplayData, lang: language });
    setEditModalData(null);
  };
  
  const handleProgressiveTranslate = async (targetLang: string) => {
    if (targetLang === sourceCv.lang) {
      setDisplayCvData(sourceCv.data);
      return;
    }

    setIsTranslating(true);
    // Start with a copy of the source data
    const newTranslatedData = { ...sourceCv.data };

    const sectionsToTranslate: (keyof CVData)[] = [
      'name', 'title', 'profile', 'workExperience', 'education', 
      'projects', 'skills', 'languages', 'interests', 'contact'
    ];
      
    try {
      for (const section of sectionsToTranslate) {
        const sectionName = t(`cvSections.${section}`);
        setTranslationStatus(t('translationStatus.translating', { section: sectionName }));
        
        // Always translate from the original source for best quality
        const contentToTranslate = sourceCv.data[section];
        
        // Skip translation if content is empty
        if (!contentToTranslate || (Array.isArray(contentToTranslate) && contentToTranslate.length === 0)) {
            continue;
        }

        const translatedContent = await translateSection(section, contentToTranslate, targetLang);
        
        newTranslatedData[section] = translatedContent;
        // Progressively update the UI
        setDisplayCvData(normalizeCvData({ ...newTranslatedData }));
      }
      setTranslationStatus(t('translationStatus.complete'));
    } catch (error) {
      console.error("Failed to translate CV section-by-section:", error);
      alert("An error occurred during translation. Please check the console for details.");
      // Revert to source data on failure
      setDisplayCvData(sourceCv.data);
    } finally {
      setTimeout(() => {
        setIsTranslating(false);
        setTranslationStatus('');
      }, 2000);
    }
  };


  if (page === 'home') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
        <div className="text-center max-w-3xl bg-white p-10 rounded-xl shadow-lg">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">{t('homePage.title')}</h1>
          <p className="text-xl text-gray-600 mb-10">{t('homePage.description')}</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => cvUploadInputRef.current?.click()}
              className="w-full sm:w-auto bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100"
              disabled={isLoading}
            >
              {isLoading ? t('homePage.parsing') : t('homePage.upload')}
            </button>
            <input type="file" ref={cvUploadInputRef} onChange={handleSelectCvFile} accept=".pdf,.doc,.docx,.txt" className="hidden" />
            <button
              onClick={handleCreateFromTemplate}
              className="w-full sm:w-auto bg-white text-teal-600 border-2 border-teal-600 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-teal-50 transition-all duration-300 transform hover:scale-105"
            >
              {t('homePage.createTemplate')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <ControlPanel
        template={template}
        onTemplateChange={setTemplate}
        onPrint={handlePrint}
        onCVUpload={handleCVUpload}
        onAvatarUpload={handleAvatarUpload}
        isLoading={isLoading}
        onTranslate={handleProgressiveTranslate}
        onGoHome={handleGoHome}
        isTranslating={isTranslating}
        translationStatus={translationStatus}
      />
      <main className="flex-1 overflow-auto">
        <div ref={cvPreviewRef}>
          <CVPreview cvData={displayCvData} template={template} avatar={avatar} isEditable onEdit={handleEdit} />
        </div>
      </main>
      {editModalData && (
        <EditModal 
            sectionKey={editModalData.section} 
            data={displayCvData[editModalData.section]} 
            onClose={() => setEditModalData(null)}
            onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default HomePage;
