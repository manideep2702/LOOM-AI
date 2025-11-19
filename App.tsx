import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Footer } from './components/Footer';
import { NavBar } from './components/ui/tubelight-navbar';
import { AnimatedLogo } from './components/ui/animated-logo';
import { AuthModal } from './components/AuthModal';
import { Home as HomeIcon, Layers, Zap, FileText } from 'lucide-react';
import { supabase } from './lib/supabase';
import { User } from '@supabase/supabase-js';
import { ProfileModal } from './components/ProfileModal';
import Home from './pages/Home';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { Docs } from './pages/Docs';

export default function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authView, setAuthView] = useState<'signin' | 'signup'>('signin');
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    setProfile(data);
  };

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLoginClick = () => {
    setAuthView('signin');
    setShowAuthModal(true);
  };

  const navItems = [
    { name: 'Home', url: '/', icon: HomeIcon },
    { name: 'Features', url: '/#features', icon: Layers },
    { name: 'Pricing', url: '/#pricing', icon: Zap },
    { name: 'Docs', url: '/docs', icon: FileText }
  ];

  return (
    <Router>
      <div className="min-h-screen text-foreground relative font-sans overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200 flex flex-col">

        {/* Ambient Background Layers */}
        <div className="fixed inset-0 bg-black z-[-50]"></div>

        {/* Spotlight Effect */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-900/20 rounded-[100%] blur-[120px] z-[-40] animate-pulse-slow"></div>

        {/* Grid Pattern */}
        <div className="fixed inset-0 bg-grid-white bg-[size:60px_60px] opacity-[0.15] z-[-30] mask-image-b"></div>

        {/* Noise Overlay */}
        <div className="fixed inset-0 noise-bg z-[-20]"></div>

        {/* Independent Logo Positioned Top-Left */}
        <div className="fixed top-6 left-6 z-50">
          <Link to="/">
            <AnimatedLogo />
          </Link>
        </div>

        {/* New Tubelight Navbar (Centered) */}
        <NavBar
          items={navItems}
          onLoginClick={handleLoginClick}
          user={user}
          profile={profile}
          onProfileClick={() => setShowProfileModal(true)}
        />

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialView={authView}
        />

        {/* Profile Modal */}
        {user && (
          <ProfileModal
            isOpen={showProfileModal}
            onClose={() => setShowProfileModal(false)}
            user={user}
            profile={profile}
            onUpdateUser={() => {
              if (user) fetchProfile(user.id);
            }}
          />
        )}

        <Routes>
          <Route path="/" element={<Home user={user} onShowAuth={handleLoginClick} />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
