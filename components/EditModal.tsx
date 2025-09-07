import React, { useState, useEffect } from 'react';
import { useI18n } from '../hooks/useI18n';
import { CVData } from '../types';

interface EditModalProps {
  sectionKey: keyof CVData;
  data: CVData[keyof CVData];
  onClose: () => void;
  onSave: (sectionKey: keyof CVData, newData: any) => void;
}

const inputClass = "w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500";
const labelClass = "block text-sm font-medium text-gray-600 mb-1 capitalize";
const buttonClass = "px-4 py-2 rounded-md font-semibold text-sm transition-colors";
const primaryButtonClass = `${buttonClass} bg-teal-600 text-white hover:bg-teal-700`;
const secondaryButtonClass = `${buttonClass} bg-gray-200 text-gray-800 hover:bg-gray-300`;
const dangerButtonClass = `${buttonClass} bg-red-500 text-white hover:bg-red-600`;

export const EditModal: React.FC<EditModalProps> = ({ sectionKey, data, onClose, onSave }) => {
  const [formData, setFormData] = useState<any>(data);
  const { t } = useI18n();

  useEffect(() => {
      setFormData(data);
  }, [data]);

  const handleSimpleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(e.target.value);
  };

  const handleArrayStringChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(e.target.value.split('\n'));
  };

  const handleObjectChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setFormData((prev: object) => ({ ...prev, [key]: e.target.value }));
  };

  const handleArrayObjectChange = (index: number, key: string, value: string | string[]) => {
    setFormData((prev: any[]) => {
      const newArr = [...prev];
      newArr[index] = { ...newArr[index], [key]: value };
      return newArr;
    });
  };

  const handleRemoveItem = (index: number) => {
    setFormData((prev: any[]) => prev.filter((_, i) => i !== index));
  };
  
  const handleAddItem = (section: keyof CVData) => {
    let newItem = {};
    if (section === 'workExperience') newItem = { role: '', company: '', period: '', location: '', responsibilities: [] };
    if (section === 'education') newItem = { degree: '', institution: '', year: '' };
    if (section === 'projects') newItem = { name: '', description: '' };
    setFormData((prev: any[]) => [...prev, newItem]);
  };

  const renderForm = () => {
    switch (sectionKey) {
        case 'name':
        case 'title':
            return (
                <div>
                    <label className={labelClass}>{t(`cvSections.${sectionKey}`)}</label>
                    <input type="text" value={formData} onChange={handleSimpleChange} className={inputClass} />
                </div>
            )
        case 'profile':
            return <textarea value={formData} onChange={handleSimpleChange} className={inputClass} rows={8} />;
        case 'skills':
        case 'languages':
        case 'interests':
            return <textarea value={(formData as string[]).join('\n')} onChange={handleArrayStringChange} className={inputClass} rows={8} placeholder="One item per line" />;
        case 'contact':
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(formData).map(key => (
                        <div key={key}>
                            <label className={labelClass}>{key}</label>
                            <input type="text" value={formData[key]} onChange={(e) => handleObjectChange(e, key)} className={inputClass} />
                        </div>
                    ))}
                </div>
            );
        case 'workExperience':
        case 'education':
        case 'projects':
            return (
                <div className="space-y-4">
                    {(formData as any[]).map((item, index) => (
                        <div key={index} className="border p-4 rounded-md bg-gray-50 relative">
                           <button onClick={() => handleRemoveItem(index)} className={`${dangerButtonClass} absolute top-2 right-2 px-2 py-1`}>{t('editModal.remove')}</button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.keys(item).map(key => (
                                    <div key={key} className={key === 'responsibilities' || key === 'description' ? 'md:col-span-2' : ''}>
                                        <label className={labelClass}>{key}</label>
                                        {key === 'responsibilities' ? (
                                             <textarea 
                                                value={Array.isArray(item[key]) ? item[key].join('\n') : ''} 
                                                onChange={(e) => handleArrayObjectChange(index, key, e.target.value.split('\n'))}
                                                className={inputClass}
                                                rows={4}
                                                placeholder="One responsibility per line"
                                             />
                                        ) : (
                                            <input type="text" value={item[key]} onChange={(e) => handleArrayObjectChange(index, key, e.target.value)} className={inputClass} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button onClick={() => handleAddItem(sectionKey)} className={secondaryButtonClass}>{t('editModal.add')}</button>
                </div>
            )
        default:
            return <p>Editing for this section is not implemented.</p>;
    }
  }

  const handleSave = () => {
      onSave(sectionKey, formData);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-xl font-bold text-gray-800">{t('editModal.title')}: {t(`cvSections.${sectionKey}`)}</h2>
        </div>
        <div className="overflow-y-auto flex-grow pr-2">
            {renderForm()}
        </div>
        <div className="mt-6 flex justify-end space-x-3 border-t pt-4">
          <button onClick={onClose} className={secondaryButtonClass}>{t('editModal.cancel')}</button>
          <button onClick={handleSave} className={primaryButtonClass}>{t('editModal.save')}</button>
        </div>
      </div>
    </div>
  );
};
