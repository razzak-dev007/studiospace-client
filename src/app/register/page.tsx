'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import {
  Aperture,
  Lock,
  Mail,
  User as UserIcon,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const { register, googleLogin } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Live Password Validation rules
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;
  const isPasswordValid = hasUppercase && hasLowercase && hasMinLength;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError('Please enter your full creator name.');
      toast.error('Please enter your full creator name.');
      return;
    }

    if (!email.trim()) {
      setFormError('Please enter your email address.');
      toast.error('Please enter your email address.');
      return;
    }

    // Strict Password Validation per prompt rules
    if (!hasUppercase) {
      const err = 'Password must contain at least one uppercase letter (A-Z).';
      setFormError(err);
      toast.error(err);
      return;
    }
    if (!hasLowercase) {
      const err = 'Password must contain at least one lowercase letter (a-z).';
      setFormError(err);
      toast.error(err);
      return;
    }
    if (!hasMinLength) {
      const err = 'Password length must be at least 6 characters.';
      setFormError(err);
      toast.error(err);
      return;
    }

    try {
      setLoading(true);
      const res = await register(name, email, password, photoURL);
      toast.success(res.message || 'Registration successful! Please log in.');
      // Requirement: If the user registers successfully, then navigate them to their Login page.
      router.push('/login');
    } catch (err: any) {
      const msg = err.message || 'Failed to complete registration.';
      setFormError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setFormError(null);
      const res = await googleLogin(
        'Google Creator',
        'creator.google@studiospace.io',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      );
      toast.success(res.message || 'Google account linked successfully!');
      // Requirement: On clicking it: The user authenticates with Google Navigate the user to the Home page.
      router.push('/');
    } catch (err: any) {
      const msg = err.message || 'Google authentication failed.';
      setFormError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 sm:p-10 rounded-3xl shadow-2xl">
        
        {/* Title for Registration */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 mb-2">
            <Aperture className="w-7 h-7 stroke-[2.2]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Create Your Creator Account
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Join StudioSpace to discover, book, or list production workspaces.
          </p>
        </div>

        {/* Form Error Toast/Alert in Form */}
        {formError && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2.5 text-xs text-rose-600 dark:text-rose-400">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Maya Lin"
                required
                className="w-full px-4 py-3 pl-10 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <UserIcon className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maya@studiospace.io"
                required
                className="w-full px-4 py-3 pl-10 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Photo URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Photo URL (Optional)
            </label>
            <div className="relative">
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-3 pl-10 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <ImageIcon className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Password with live criteria */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 chars with Uppercase & Lowercase"
                required
                className="w-full px-4 py-3 pl-10 pr-10 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password Validation Criteria Checklist */}
            <div className="pt-2 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                Password Requirements:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-xs">
                <div
                  className={`flex items-center gap-1.5 font-medium ${
                    hasUppercase ? 'text-emerald-500' : 'text-zinc-400'
                  }`}
                >
                  {hasUppercase ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  <span>Uppercase (A-Z)</span>
                </div>

                <div
                  className={`flex items-center gap-1.5 font-medium ${
                    hasLowercase ? 'text-emerald-500' : 'text-zinc-400'
                  }`}
                >
                  {hasLowercase ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  <span>Lowercase (a-z)</span>
                </div>

                <div
                  className={`flex items-center gap-1.5 font-medium ${
                    hasMinLength ? 'text-emerald-500' : 'text-zinc-400'
                  }`}
                >
                  {hasMinLength ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  <span>Min 6 characters</span>
                </div>
              </div>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 shadow-md shadow-orange-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Complete Registration
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-zinc-200 dark:border-zinc-800 w-full" />
          <span className="bg-white dark:bg-zinc-900 px-3 text-xs uppercase tracking-wider text-zinc-400 font-semibold absolute">
            or sign up with
          </span>
        </div>

        {/* Google Social Login Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors flex items-center justify-center gap-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Link for Login */}
        <p className="text-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-bold text-orange-600 dark:text-orange-400 hover:underline"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
