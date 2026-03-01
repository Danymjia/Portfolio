'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../../utils/supabase';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', technologies: '', demo_url: '', repo_url: '' });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (!error && data) setProjects(data);
    setLoading(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    let imageUrl = '';
    
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `public/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, imageFile);
        
      if (uploadError) {
        alert('Error uploading image: ' + uploadError.message);
        setUploading(false);
        return;
      }
      
      const { data: publicData } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath);
        
      imageUrl = publicData.publicUrl;
    }

    const { error } = await supabase.from('projects').insert([
      { ...formData, image_url: imageUrl }
    ]);

    if (error) {
      alert('Error saving project: ' + error.message);
    } else {
      setIsAdding(false);
      setFormData({ title: '', description: '', technologies: '', demo_url: '', repo_url: '' });
      setImageFile(null);
      fetchProjects();
    }
    
    setUploading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await supabase.from('projects').delete().eq('id', id);
      fetchProjects();
    }
  };

  return (
    <div className="animate-fade-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-8)' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-2)' }}>Proyectos</h1>
          <p>Gestiona los elementos de tu portafolio.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancelar' : '+ Añadir Proyecto'}
        </button>
      </div>

      {isAdding && (
        <div className="card" style={{ padding: 'var(--spacing-6)', marginBottom: 'var(--spacing-8)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-4)' }}>Añadir Nuevo Proyecto</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <div className="input-group">
              <label>Título *</label>
              <input type="text" className="form-input" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            
            <div className="input-group">
              <label>Tecnologías (Separadas por comas)</label>
              <input type="text" className="form-input" value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} />
            </div>

            <div className="input-group" style={{ gridColumn: 'span 2' }}>
              <label>Descripción</label>
              <textarea className="form-input" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
            </div>

            <div className="input-group">
              <label>URL Demo</label>
              <input type="url" className="form-input" value={formData.demo_url} onChange={e => setFormData({...formData, demo_url: e.target.value})} />
            </div>

            <div className="input-group">
              <label>URL Repositorio</label>
              <input type="url" className="form-input" value={formData.repo_url} onChange={e => setFormData({...formData, repo_url: e.target.value})} />
            </div>

            <div className="input-group" style={{ gridColumn: 'span 2' }}>
              <label>Imagen de Portada (Requiere bucket "portfolio-images")</label>
              <input type="file" accept="image/*" className="form-input" onChange={handleFileChange} />
            </div>

            <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
              <button type="button" className="btn btn-outline" onClick={() => setIsAdding(false)}>Cancelar</button>
              <button type="submit" className="btn btn-primary" disabled={uploading}>
                {uploading ? 'Guardando...' : 'Guardar Proyecto'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p>Cargando proyectos...</p>
      ) : projects.length === 0 ? (
        <div className="card" style={{ padding: 'var(--spacing-12)', textAlign: 'center', backgroundColor: 'var(--color-surface-hover)' }}>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-4)' }}>No se encontraron proyectos. ¡Añade el primero!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {projects.map(project => (
            <div key={project.id} className="card" style={{ display: 'flex', alignItems: 'center', padding: 'var(--spacing-4)' }}>
              {project.image_url ? (
                <div style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0, marginRight: 'var(--spacing-6)' }}>
                  <img src={project.image_url} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ) : (
                <div style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-border)', flexShrink: 0, marginRight: 'var(--spacing-6)' }}></div>
              )}
              
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-1)' }}>{project.title}</h3>
                <p style={{ fontSize: '0.875rem', marginBottom: 'var(--spacing-2)', color: 'var(--color-text-muted)' }}>{project.description}</p>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)' }}>{project.technologies}</div>
              </div>
              
              <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginLeft: 'var(--spacing-4)' }}>
                <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', borderColor: 'var(--color-error)', color: 'var(--color-error)' }} onClick={() => handleDelete(project.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
