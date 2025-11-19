
"use client"

import * as React from "react"
import { Cpu } from "lucide-react";
import { AnimatedLogo } from "./animated-logo";
import { supabase } from "../../lib/supabase";

interface SignUpProps {
  onToggleMode: () => void;
  onClose: () => void;
}

const SignUp1: React.FC<SignUpProps> = ({ onToggleMode, onClose }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      onClose();
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      });

      if (error) throw error;
    } catch (err) {
      console.error("Error signing up with Google:", err);
      setError("Failed to sign up with Google.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center relative overflow-hidden w-full max-w-sm mx-auto">
      {/* Centered glass card */}
      <div className="relative z-10 w-full rounded-3xl bg-zinc-900/90 border border-white/10 backdrop-blur-xl shadow-2xl p-8 flex flex-col items-center">
        {/* Logo */}
        {/* Logo */}
        <AnimatedLogo showText={false} className="mb-6" logoClassName="w-12 h-12" />

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-2 text-center tracking-tight">
          Create Account
        </h2>
        <p className="text-zinc-400 text-sm mb-8 text-center">
          Join the new era of content creation.
        </p>

        {/* Form */}
        <div className="flex flex-col w-full gap-4">
          <div className="w-full flex flex-col gap-3">
            <input
              placeholder="Full Name"
              type="text"
              value={name}
              className="w-full px-5 py-3 rounded-xl bg-black/40 border border-white/5 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Email"
              type="email"
              value={email}
              className="w-full px-5 py-3 rounded-xl bg-black/40 border border-white/5 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              className="w-full px-5 py-3 rounded-xl bg-black/40 border border-white/5 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <div className="text-xs text-red-400 text-left flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-red-400"></span>
                {error}
              </div>
            )}
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-2"></div>

          <div>
            <button
              onClick={handleSignUp}
              className="w-full bg-white text-black hover:bg-zinc-200 font-semibold px-5 py-3 rounded-xl shadow-lg transition mb-3 text-sm"
            >
              Create Account
            </button>
            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center gap-2 bg-black/40 border border-white/10 hover:bg-white/5 rounded-xl px-5 py-3 font-medium text-zinc-300 transition mb-4 text-sm"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign up with Google
            </button>
            <div className="w-full text-center">
              <span className="text-xs text-zinc-500">
                Already have an account?{" "}
                <button
                  onClick={onToggleMode}
                  className="underline text-zinc-300 hover:text-white transition-colors ml-1"
                >
                  Sign in
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SignUp1 };
