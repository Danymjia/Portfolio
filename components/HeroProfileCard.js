"use client";
import ProfileCard from './ProfileCard';
import dev from '../assets/dev.png';
import avatar from '../assets/avatar.png';

export default function HeroProfileCard() {
  return (
    <ProfileCard
      name="Desarrollador Full Stack"
      title=""
      handle="josuemedev"
      status="Disponible"
      contactText="Contacto"
      avatarUrl={avatar.src}
      showUserInfo={true}
      enableTilt={true}
      enableMobileTilt={false}
      behindGlowColor="rgba(125, 190, 255, 0.67)"
      iconUrl={dev.src}
      behindGlowEnabled
      innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
      onContactClick={() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }}
    />
  );
}
