// Shared GSAP + ScrollTrigger instance
// Import from here to ensure all components use the same GSAP instance
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
