import React from 'react';
import { CVData, Template } from '../types';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';

interface CVPreviewProps {
  cvData: CVData;
  template: Template;
  avatar: string | null;
  isEditable?: boolean;
  onEdit?: (section: keyof CVData) => void;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cvData, template, avatar, isEditable, onEdit }) => {
  const renderTemplate = () => {
    const props = { data: cvData, avatar, isEditable, onEdit };
    switch (template) {
      case Template.Classic:
        return <ClassicTemplate {...props} />;
      case Template.Modern:
        return <ModernTemplate {...props} />;
      default:
        return <ClassicTemplate {...props} />;
    }
  };

  return <div className="p-4 md:p-8 bg-gray-300">{renderTemplate()}</div>;
};
