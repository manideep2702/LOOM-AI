
import React from 'react';
import { SignIn1 } from './ui/modern-stunning-sign-in';
import { SignUp1 } from './ui/modern-stunning-sign-up';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialView = 'signin' }) => {
  const [view, setView] = React.useState<'signin' | 'signup'>(initialView);

  React.useEffect(() => {
    if (isOpen) {
      setView(initialView);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialView]);

  if (!isOpen) return null;

  const toggleView = () => {
    setView(view === 'signin' ? 'signup' : 'signin');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-md animate-slide-up">
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 md:-right-12 p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
        >
          <X className="w-6 h-6" />
        </button>

        {view === 'signin' ? (
          <SignIn1 onToggleMode={toggleView} onClose={onClose} />
        ) : (
          <SignUp1 onToggleMode={toggleView} onClose={onClose} />
        )}
      </div>
    </div>
  );
};
