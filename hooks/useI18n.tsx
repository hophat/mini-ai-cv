import React, { createContext, useContext, useState, ReactNode } from 'react';

// Basic translations
const translations: { [lang: string]: { [key: string]: any } } = {
  en: {
    cvSections: {
      profile: 'Profile',
      workExperience: 'Work Experience',
      education: 'Education',
      skills: 'Skills',
      projects: 'Projects',
      languages: 'Languages',
      interests: 'Interests',
      contact: 'Contact',
      name: 'Name',
      title: 'Title'
    },
    editModal: {
      title: 'Edit Section',
      save: 'Save Changes',
      cancel: 'Cancel',
      add: 'Add Item',
      remove: 'Remove'
    },
    homePage: {
        title: 'AI CV Builder',
        description: 'Create a professional CV in minutes. Upload an existing resume or start with a template, then let our AI help you refine it.',
        upload: 'Upload CV',
        createTemplate: 'Create from Template',
        parsing: 'Parsing CV...'
    },
    controlPanel: {
        goHome: 'Home',
        translate: 'Translate'
    },
    translationStatus: {
      translating: 'Translating {section}...',
      complete: 'Translation complete!'
    }
  },
  vi: {
    cvSections: {
      profile: 'Hồ sơ',
      workExperience: 'Kinh nghiệm làm việc',
      education: 'Học vấn',
      skills: 'Kỹ năng',
      projects: 'Dự án',
      languages: 'Ngôn ngữ',
      interests: 'Sở thích',
      contact: 'Liên hệ',
      name: 'Họ và tên',
      title: 'Chức danh'
    },
    editModal: {
      title: 'Chỉnh sửa mục',
      save: 'Lưu thay đổi',
      cancel: 'Hủy',
      add: 'Thêm mục',
      remove: 'Xóa'
    },
    homePage: {
        title: 'Trình tạo CV AI',
        description: 'Tạo CV chuyên nghiệp trong vài phút. Tải lên sơ yếu lý lịch hiện có hoặc bắt đầu với một mẫu, sau đó để AI của chúng tôi giúp bạn hoàn thiện nó.',
        upload: 'Tải lên CV',
        createTemplate: 'Tạo CV Mẫu',
        parsing: 'Đang phân tích CV...'
    },
    controlPanel: {
        goHome: 'Trang chủ',
        translate: 'Dịch'
    },
    translationStatus: {
        translating: 'Đang dịch {section}...',
        complete: 'Dịch hoàn tất!'
    }
  },
  ja: {
    cvSections: {
      profile: 'プロフィール',
      workExperience: '職務経歴',
      education: '学歴',
      skills: 'スキル',
      projects: 'プロジェクト',
      languages: '言語',
      interests: '興味',
      contact: '連絡先',
      name: '名前',
      title: '役職'
    },
    editModal: {
      title: 'セクションを編集',
      save: '変更を保存',
      cancel: 'キャンセル',
      add: '項目を追加',
      remove: '削除'
    },
    homePage: {
        title: 'AI CVビルダー',
        description: '数分でプロの履歴書を作成します。既存の履歴書をアップロードするか、テンプレートから始めて、AIにそれを洗練させましょう。',
        upload: '履歴書をアップロード',
        createTemplate: 'テンプレートから作成',
        parsing: '履歴書を解析中...'
    },
    controlPanel: {
        goHome: 'ホーム',
        translate: '翻訳'
    },
    translationStatus: {
        translating: '{section}を翻訳中...',
        complete: '翻訳完了！'
    }
  }
};

interface I18nContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, replacements?: { [key: string]: string }) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string, replacements?: { [key: string]: string }): string => {
    const keys = key.split('.');
    let result = translations[language] as any;
    for (const k of keys) {
      result = result?.[k];
    }
    
    if (!result || typeof result !== 'string') {
        return key;
    }

    if (replacements) {
        Object.keys(replacements).forEach(rKey => {
            result = result.replace(`{${rKey}}`, replacements[rKey]);
        });
    }

    return result;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
