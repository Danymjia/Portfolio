'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../utils/supabase';

export default function DashboardOverview() {
  const [projectCount, setProjectCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch projects count
      const { count: projCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });
        
      if (projCount !== null) setProjectCount(projCount);

      // Fetch recent messages
      const { data: recentMessages, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && recentMessages) {
        setMessages(recentMessages);
      }
      
      setLoading(false);
    };

    fetchData();
  }, []);

  const toggleRead = async (id, isRead) => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read: !isRead })
      .eq('id', id);

    if (!error) {
      setMessages(messages.map(m => m.id === id ? { ...m, is_read: !isRead } : m));
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este mensaje?')) return;
    
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (!error) {
      setMessages(messages.filter(m => m.id !== id));
    }
  };

  return (
    <div className="animate-fade-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-8)' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-2)' }}>Resumen del Panel</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Bienvenido al panel de administración de tu portafolio.</p>
        </div>
        <Link href="/" className="btn btn-outline" target="_blank">
          Ver Sitio Web ↗
        </Link>
      </div>
      
      <div className="grid grid-cols-2 gap-6" style={{ marginBottom: 'var(--spacing-8)' }}>
        <div className="card" style={{ padding: 'var(--spacing-6)' }}>
          <h3 style={{ fontSize: '1.125rem', color: 'var(--color-text-muted)' }}>Proyectos Totales</h3>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
            {loading ? '...' : projectCount}
          </p>
        </div>
        
        <div className="card" style={{ padding: 'var(--spacing-6)' }}>
          <h3 style={{ fontSize: '1.125rem', color: 'var(--color-text-muted)' }}>Mensajes Recibidos</h3>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
            {loading ? '...' : messages.length}
          </p>
        </div>
      </div>

      <div className="card" style={{ padding: 'var(--spacing-6)' }}>
        <h3 style={{ fontSize: '1.125rem', color: 'var(--color-text-main)', marginBottom: 'var(--spacing-4)', fontWeight: 'bold' }}>Mensajes Recientes (Contacto)</h3>
        
        {loading ? (
          <p style={{ color: 'var(--color-text-muted)' }}>Cargando mensajes...</p>
        ) : messages.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)' }}>No tienes mensajes nuevos.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ 
                padding: 'var(--spacing-4)', 
                border: '1px solid var(--color-border)', 
                borderRadius: 'var(--radius-md)',
                backgroundColor: msg.is_read ? 'transparent' : 'var(--color-surface-hover)',
                opacity: msg.is_read ? 0.7 : 1,
                transition: 'all 0.3s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <strong style={{ color: 'var(--color-text-main)' }}>{msg.name}</strong>
                    {!msg.is_read && <span style={{ padding: '2px 8px', backgroundColor: 'var(--color-primary)', color: 'white', fontSize: '0.65rem', borderRadius: '10px', fontWeight: 'bold' }}>NUEVO</span>}
                  </div>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-2)' }}>
                  <a href={`mailto:${msg.email}`} style={{ color: 'var(--color-primary)' }}>{msg.email}</a>
                </div>
                <p style={{ margin: 0, color: 'var(--color-text-main)', lineHeight: 1.5, marginBottom: 'var(--spacing-4)' }}>
                  {msg.message}
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    onClick={() => toggleRead(msg.id, msg.is_read)}
                    style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, padding: 0 }}
                  >
                    {msg.is_read ? 'Marcar como no leído' : 'Marcar como leído'}
                  </button>
                  <button 
                    onClick={() => deleteMessage(msg.id)}
                    style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, padding: 0 }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
