'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '../../utils/supabase';
import Link from 'next/link';

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };
    
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          router.push('/login');
        } else {
          setUser(session.user);
        }
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-text-muted)' }}>Cargando panel...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div style={{ marginBottom: 'var(--spacing-8)' }}>
          <Link href="/dashboard" style={{ color: 'inherit' }}>
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', margin: 0 }}>Panel Admin</h2>
          </Link>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', flex: 1 }}>
          <Link 
            href="/dashboard" 
            style={{ 
              padding: '0.75rem 1rem', 
              borderRadius: 'var(--radius-md)', 
              backgroundColor: pathname === '/dashboard' ? 'var(--color-surface-hover)' : 'transparent',
              fontWeight: pathname === '/dashboard' ? '600' : '400',
              color: pathname === '/dashboard' ? 'var(--color-primary)' : 'var(--color-text-main)',
              transition: 'background-color var(--transition-fast)'
            }}
          >
            Resumen
          </Link>
          <Link 
            href="/dashboard/projects" 
            style={{ 
              padding: '0.75rem 1rem', 
              borderRadius: 'var(--radius-md)', 
              backgroundColor: pathname === '/dashboard/projects' ? 'var(--color-surface-hover)' : 'transparent',
              fontWeight: pathname === '/dashboard/projects' ? '600' : '400',
              color: pathname === '/dashboard/projects' ? 'var(--color-primary)' : 'var(--color-text-main)',
              transition: 'background-color var(--transition-fast)'
            }}
          >
            Gestionar Proyectos
          </Link>
        </nav>
        <div style={{ marginTop: 'auto', paddingTop: 'var(--spacing-4)', borderTop: '1px solid var(--color-border)' }}>
          <button 
            onClick={handleLogout} 
            className="btn align-left" 
            style={{ width: '100%', justifyContent: 'flex-start', padding: '0.75rem 1rem', color: 'var(--color-error)', fontWeight: '500' }}
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}
