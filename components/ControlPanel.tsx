import React, { useRef } from 'react';
import { Template } from '../types';
import { useI18n } from '../hooks/useI18n';
import { HomeIcon } from './icons';

interface ControlPanelProps {
  template: Template;
  onTemplateChange: (template: Template) => void;
  onPrint: () => void;
  onCVUpload: (file: File) => void;
  onAvatarUpload: (file: File) => void;
  isLoading: boolean;
  onTranslate: (lang: string) => void;
  onGoHome: () => void;
  isTranslating: boolean;
  translationStatus: string;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  template,
  onTemplateChange,
  onPrint,
  onCVUpload,
  onAvatarUpload,
  isLoading,
  onTranslate,
  onGoHome,
  isTranslating,
  translationStatus,
}) => {
  const { language, setLanguage, t } = useI18n();
  const cvInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleCvFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onCVUpload(e.target.files[0]);
    }
    // Reset input to allow uploading the same file again
    if (e.target) e.target.value = '';
  };

  const handleAvatarFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onAvatarUpload(e.target.files[0]);
    }
    if (e.target) e.target.value = '';
  };
  
  const anyLoading = isLoading || isTranslating;

  return (
    <div className="w-full md:w-96 bg-white p-6 shadow-lg print:hidden flex-shrink-0">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-2xl font-bold text-gray-800">Control Panel</h2>
        <button 
            onClick={onGoHome} 
            className="p-2 rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-colors"
            title={t('controlPanel.goHome')}
            aria-label={t('controlPanel.goHome')}
        >
          <HomeIcon className="w-6 h-6" />
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Template Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
          <div className="flex space-x-2">
            {(Object.keys(Template) as Array<keyof typeof Template>).map((key) => (
              <button
                key={key}
                onClick={() => onTemplateChange(Template[key])}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                  template === Template[key]
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                disabled={anyLoading}
              >
                {Template[key]}
              </button>
            ))}
          </div>
        </div>

        {/* File Uploads */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Files</label>
            <div className="flex space-x-2">
                <button onClick={() => cvInputRef.current?.click()} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md text-sm disabled:bg-gray-300 disabled:cursor-not-allowed" disabled={anyLoading}>
                    { isLoading ? t('homePage.parsing') : 'Upload CV' }
                </button>
                <input type="file" ref={cvInputRef} onChange={handleCvFileSelect} accept=".pdf,.doc,.docx,.txt" className="hidden" />
                
                <button onClick={() => avatarInputRef.current?.click()} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md text-sm disabled:bg-gray-300 disabled:cursor-not-allowed" disabled={anyLoading}>Upload Avatar</button>
                <input type="file" ref={avatarInputRef} onChange={handleAvatarFileSelect} accept="image/*" className="hidden" />
            </div>
        </div>
        
        {/* Language Selector */}
        <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <div className="flex items-center space-x-2">
                <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-teal-500"
                    disabled={anyLoading}
                >
                    <option value="en">English</option>
                    <option value="vi">Vietnamese</option>
                    <option value="ja">Japanese</option>
                </select>
                <button 
                    onClick={() => onTranslate(language)}
                    disabled={anyLoading}
                    className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400"
                >
                    {t('controlPanel.translate')}
                </button>
            </div>
            {isTranslating && <p className="text-sm text-gray-600 mt-2 animate-pulse">{translationStatus}</p>}
        </div>
        
        {/* Actions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Actions</label>
          <button onClick={onPrint} className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400" disabled={anyLoading}>Print / Download PDF</button>
        </div>
      </div>
    </div>
  );
};
