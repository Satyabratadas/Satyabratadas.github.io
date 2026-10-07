import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Application } from '@splinetool/runtime';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS_DICT } from '../data/skillsData';
import { applyAuthenticKeycaps, REPLACED_KEY_MAP, SKILL_TO_PHYSICAL_KEY } from '../utils/customKeycaps';

if (typeof window !== 'undefined') {
  window.THREE = THREE;
}

gsap.registerPlugin(ScrollTrigger);

// Coordinate matrix matching the interactive 3D macro-pad choreography from ojasvamishra.me
const SECTION_CONFIGS = {
  hero: {
    desktop: {
      scale: { x: 0.2, y: 0.2, z: 0.2 },
      position: { x: 225, y: -100, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    mobile: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 0, y: -200, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
  },
  about: {
    desktop: {
      scale: { x: 0.4, y: 0.4, z: 0.4 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: 0, y: Math.PI / 12, z: 0 },
    },
    mobile: {
      scale: { x: 0.4, y: 0.4, z: 0.4 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: 0, y: Math.PI / 6, z: 0 },
    },
  },
  skills: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: 0, y: Math.PI / 12, z: 0 },
    },
    mobile: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: 0, y: Math.PI / 6, z: 0 },
    },
  },
  experience: {
    desktop: {
      scale: { x: 0.16, y: 0.16, z: 0.16 },
      position: { x: -960, y: -120, z: 0 },
      rotation: { x: Math.PI / 12, y: -Math.PI / 4, z: 0 },
    },
    mobile: {
      scale: { x: 0.14, y: 0.14, z: 0.14 },
      position: { x: 0, y: -520, z: 0 },
      rotation: { x: Math.PI / 6, y: -Math.PI / 6, z: 0 },
    },
  },
  projects: {
    desktop: {
      scale: { x: 0.16, y: 0.16, z: 0.16 },
      position: { x: 980, y: -140, z: 0 },
      rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
    mobile: {
      scale: { x: 0.14, y: 0.14, z: 0.14 },
      position: { x: 0, y: -540, z: 0 },
      rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
  },
  contact: {
    desktop: {
      scale: { x: 0.2, y: 0.2, z: 0.2 },
      position: { x: 350, y: -250, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    mobile: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: 150, z: 0 },
      rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
  },
};

function getSectionTransform(section, isMobile) {
  const cfg = (SECTION_CONFIGS[section] || SECTION_CONFIGS.hero)[isMobile ? 'mobile' : 'desktop'];
  const w = typeof window !== 'undefined' ? window.innerWidth : 1280;
  const factor = Math.min(Math.max(isMobile ? w / 390 : w / 1280, 0.5), isMobile ? 0.6 : 1.15);
  return {
    ...cfg,
    scale: {
      x: Math.abs(cfg.scale.x * factor),
      y: Math.abs(cfg.scale.y * factor),
      z: Math.abs(cfg.scale.z * factor),
    },
  };
}

// Keycap float controller for contact section
const floatingController = {
  floatTweens: [],
  resetTweens: [],
  start(spline) {
    if (!spline) return;
    this.floatTweens.forEach((t) => t.kill());
    this.resetTweens.forEach((t) => t.kill());
    this.floatTweens = [];
    this.resetTweens = [];

    const keys = Object.values(SKILLS_DICT).sort(() => Math.random() - 0.5);
    keys.forEach((item, idx) => {
      const objName = SKILL_TO_PHYSICAL_KEY[item.name] || item.physicalKey || item.name;
      const obj = spline.findObjectByName(objName);
      if (obj) {
        this.floatTweens.push(
          gsap.to(obj.position, {
            y: 200 * Math.random() + 200,
            duration: 2 * Math.random() + 2,
            delay: 0.15 * idx,
            repeat: -1,
            yoyo: true,
            yoyoEase: 'none',
            ease: 'elastic.out(1, 0.3)',
          })
        );
      }
    });
  },
  stop(spline) {
    if (!spline) return;
    this.floatTweens.forEach((t) => t.kill());
    this.resetTweens.forEach((t) => t.kill());
    this.floatTweens = [];
    this.resetTweens = [];

    Object.values(SKILLS_DICT).forEach((item) => {
      const objName = SKILL_TO_PHYSICAL_KEY[item.name] || item.physicalKey || item.name;
      const obj = spline.findObjectByName(objName);
      if (obj) {
        this.resetTweens.push(
          gsap.to(obj.position, {
            y: 50,
            duration: 3,
            ease: 'elastic.out(1, 0.7)',
          })
        );
      }
    });
  },
};

// Bongo Cat tapping controller for Projects section
const bongoController = {
  interval: null,
  start(spline) {
    if (!spline) return;
    const bongo = spline.findObjectByName('bongo-cat');
    const frame1 = spline.findObjectByName('frame-1');
    const frame2 = spline.findObjectByName('frame-2');
    if (!bongo || !frame1 || !frame2) return;
    bongo.visible = true;
    let count = 0;
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (count % 2 === 0) {
        frame1.visible = true;
        frame2.visible = false;
      } else {
        frame1.visible = false;
        frame2.visible = true;
      }
      count++;
    }, 100);
  },
  stop(spline) {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
    if (!spline) return;
    const bongo = spline.findObjectByName('bongo-cat');
    const frame1 = spline.findObjectByName('frame-1');
    const frame2 = spline.findObjectByName('frame-2');
    if (bongo) bongo.visible = false;
    if (frame1) frame1.visible = false;
    if (frame2) frame2.visible = false;
  },
};

export default function Keyboard3DScene({ sounds, theme = 'light' }) {
  const canvasRef = useRef(null);
  const splineRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentKeyRef = useRef(null);
  const activeSectionRef = useRef('hero');
  const heroIdleTweenRef = useRef(null);

  const { playPressSound, playReleaseSound } = sounds;

  // Manage in-scene 3D extruded text visibility & variables based on section and theme
  const updateSectionSplineState = useCallback((section, curTheme) => {
    const s = splineRef.current;
    if (!s) return;
    const isMobile = window.innerWidth < 768;

    const textDesktopDark = s.findObjectByName('text-desktop-dark');
    const textDesktop = s.findObjectByName('text-desktop');
    const textMobileDark = s.findObjectByName('text-mobile-dark');
    const textMobile = s.findObjectByName('text-mobile');
    const textsGroup = s.findObjectByName('texts');
    if (textsGroup) textsGroup.visible = true;

    const setVis = (dDark, dLight, mDark, mLight) => {
      if (textDesktopDark) textDesktopDark.visible = dDark;
      if (textDesktop) textDesktop.visible = dLight;
      if (textMobileDark) textMobileDark.visible = mDark;
      if (textMobile) textMobile.visible = mLight;
    };

    if (section !== 'skills') {
      setVis(false, false, false, false);
      try {
        if (s.getVariable('heading') !== undefined) s.setVariable('heading', '');
        if (s.getVariable('desc') !== undefined) s.setVariable('desc', '');
      } catch {}
    } else {
      if (curTheme === 'dark') {
        isMobile ? setVis(false, false, false, true) : setVis(false, true, false, false);
      } else {
        // Light theme: dark extruded text against light backdrop
        isMobile ? setVis(false, false, true, false) : setVis(true, false, false, false);
      }

      // Default to Satyabrata's core skill 'python' so the 3D text appears immediately when arriving at #skills
      const targetSkill = currentKeyRef.current || SKILLS_DICT['python'] || SKILLS_DICT['nodejs'];
      if (targetSkill) {
        try {
          if (s.getVariable('heading') !== undefined) s.setVariable('heading', targetSkill.label);
          if (s.getVariable('desc') !== undefined) s.setVariable('desc', targetSkill.shortDescription);
        } catch {}
      }
    }
  }, []);

  // Sync with theme changes
  useEffect(() => {
    if (splineRef.current && isLoaded) {
      updateSectionSplineState(activeSectionRef.current, theme);
    }
  }, [theme, isLoaded, updateSectionSplineState]);

  // Activate skill keycap (sound + 3D in-scene text)
  const activateKey = useCallback((skillName) => {
    const skill = SKILLS_DICT[skillName];
    if (!skill) return;

    if (currentKeyRef.current) {
      playReleaseSound();
    }
    playPressSound();
    currentKeyRef.current = skill;

    const s = splineRef.current;
    if (s) {
      try {
        if (s.getVariable('heading') !== undefined) {
          s.setVariable('heading', skill.label);
        }
        if (s.getVariable('desc') !== undefined) {
          s.setVariable('desc', skill.shortDescription);
        }
        const targetObjName = SKILL_TO_PHYSICAL_KEY[skillName] || skill.physicalKey || skillName;
        const targetObj = s.findObjectByName(targetObjName);
        if (targetObj && targetObj.position) {
          gsap.fromTo(targetObj.position, { y: 25 }, { y: 50, duration: 0.35, ease: 'back.out(2)' });
        }
      } catch {}
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('portfolio:skill-activated', { detail: { skillName, skill } })
      );
    }
  }, [playPressSound, playReleaseSound]);

  const deactivateKey = useCallback(() => {
    playReleaseSound();
    currentKeyRef.current = null;
    const s = splineRef.current;
    if (s && activeSectionRef.current !== 'skills') {
      try {
        if (s.getVariable('heading') !== undefined) s.setVariable('heading', '');
        if (s.getVariable('desc') !== undefined) s.setVariable('desc', '');
      } catch {}
    }
  }, [playReleaseSound]);

  // Listen to interactive chip clicks from the UI
  useEffect(() => {
    const handleSkillActivate = (e) => {
      if (e.detail?.skillName) {
        activateKey(e.detail.skillName);
      }
    };
    const handleSkillDeactivate = () => {
      deactivateKey();
    };

    window.addEventListener('portfolio:activate-skill', handleSkillActivate);
    window.addEventListener('portfolio:deactivate-skill', handleSkillDeactivate);

    return () => {
      window.removeEventListener('portfolio:activate-skill', handleSkillActivate);
      window.removeEventListener('portfolio:deactivate-skill', handleSkillDeactivate);
    };
  }, [activateKey, deactivateKey]);

  // Mount Spline runtime
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const spline = new Application(canvas);
    splineRef.current = spline;
    window.__spline = spline;

    let isDisposed = false;
    const localScrollTriggers = [];
    const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

    const tryLoad = async () => {
      try {
        await spline.load(`${base}/assets/skills-keyboard.splinecode`);
      } catch {
        await spline.load(`${base}/assets/skills-keyboard.spline`);
      }
    };

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const revealKeycaps = async () => {
      const keyboard = spline.findObjectByName('keyboard');
      if (!keyboard) return;

      keyboard.visible = false;
      await sleep(300);
      keyboard.visible = true;
      setIsLoaded(true);

      const isMobile = window.innerWidth < 768;
      const initialSection = (window.location.hash ? window.location.hash.replace('#', '') : 'hero');
      const startSection = initialSection in SECTION_CONFIGS ? initialSection : 'hero';
      activeSectionRef.current = startSection;
      const initTransform = getSectionTransform(startSection, isMobile);
      gsap.set(keyboard.position, initTransform.position);
      gsap.set(keyboard.rotation, initTransform.rotation);
      gsap.fromTo(
        keyboard.scale,
        { x: 0.01, y: 0.01, z: 0.01 },
        { ...initTransform.scale, duration: 1.4, ease: 'elastic.out(1, 0.6)' }
      );

      const allObjs = spline.getAllObjects();
      const keycaps = allObjs.filter((obj) => obj.name === 'keycap');

      // Hide the unwanted duplicate "JS" Text mesh objects that sit atop individual keycaps,
      // while ensuring the legitimate 'legend' icon layers and the 3D extruded title Text remain clean and visible.
      allObjs.forEach((obj) => {
        if (!obj.name) return;
        if (obj.name === 'Text') {
          const parent = allObjs.find((p) => p.uuid === obj.parentUuid);
          const is3DSceneTitleText = parent && (
            parent.name === 'text-desktop-dark' ||
            parent.name === 'text-desktop' ||
            parent.name === 'text-mobile-dark' ||
            parent.name === 'text-mobile'
          );
          obj.visible = !!is3DSceneTitleText;
        } else if (obj.name === 'legend' || obj.name?.startsWith('legend-')) {
          obj.visible = true;
        } else if (
          obj.name.startsWith('row ') ||
          SKILLS_DICT[obj.name] ||
          REPLACED_KEY_MAP[obj.name] ||
          obj.name === 'keyboard' ||
          obj.name === 'keycap'
        ) {
          obj.visible = true;
        }
      });

      await sleep(600);

      if (isMobile) {
        allObjs.filter((obj) => obj.name === 'keycap-mobile').forEach((obj) => {
          obj.visible = true;
        });
        allObjs.filter((obj) => obj.name === 'keycap-desktop').forEach((obj) => {
          obj.visible = false;
        });
      } else {
        allObjs.filter((obj) => obj.name === 'keycap-mobile').forEach((obj) => {
          obj.visible = false;
        });
        allObjs
          .filter((obj) => obj.name === 'keycap-desktop')
          .forEach(async (obj, idx) => {
            await sleep(60 * idx);
            obj.visible = true;
          });
      }

      allObjs.filter((obj) => obj.name === 'legend' || obj.name?.startsWith('legend-')).forEach((obj) => {
        obj.visible = true;
      });

      // Attach Satyabrata's authentic top skills directly to the keycaps!
      applyAuthenticKeycaps(spline);

      keycaps.forEach(async (obj, idx) => {
        obj.visible = false;
        await sleep(60 * idx);
        obj.visible = true;
        gsap.fromTo(
          obj.position,
          { y: 200 },
          { y: 50, duration: 0.5, delay: 0.08, ease: 'bounce.out' }
        );
      });

      updateSectionSplineState(activeSectionRef.current, theme);
    };

    tryLoad().then(() => {
      if (isDisposed) return;

      const keyboard = spline.findObjectByName('keyboard');
      if (!keyboard) return;

      revealKeycaps();

      // Hero gentle floating idle animation
      heroIdleTweenRef.current = gsap.to(keyboard.rotation, {
        y: 0.18,
        x: 0.08,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      const resolveSkillName = (target) => {
        if (!target) return null;
        if (target.name?.startsWith('legend-')) {
          return target.name.replace('legend-', '');
        }
        if (REPLACED_KEY_MAP[target.name]) return REPLACED_KEY_MAP[target.name];
        if (SKILLS_DICT[target.name]) return target.name;
        const all = spline.getAllObjects();
        let cur = target;
        for (let i = 0; i < 5; i++) {
          if (cur.name?.startsWith('legend-')) {
            return cur.name.replace('legend-', '');
          }
          if (cur.name && REPLACED_KEY_MAP[cur.name]) {
            return REPLACED_KEY_MAP[cur.name];
          }
          if (cur.name && SKILLS_DICT[cur.name]) return cur.name;
          if (cur.parentUuid) {
            cur = all.find((p) => p.uuid === cur.parentUuid);
          } else if (cur.parent) {
            cur = cur.parent;
          } else {
            break;
          }
        }
        return null;
      };

      // Spline canvas interaction listeners
      spline.addEventListener('keyDown', (e) => {
        const skillName = resolveSkillName(e.target);
        if (skillName) {
          activateKey(skillName);
        }
      });

      spline.addEventListener('keyUp', () => {
        deactivateKey();
      });

      // Mouse hover event on Spline canvas: hover glide over keycaps triggers tactile audio + 3D text
      spline.addEventListener('mouseHover', (e) => {
        const target = e.target;
        if (!target?.name) return;

        if (target.name === 'body' || target.name === 'platform') {
          if (currentKeyRef.current) {
            playReleaseSound();
            currentKeyRef.current = null;
          }
          return;
        }

        const skillName = resolveSkillName(target);
        if (skillName && currentKeyRef.current?.name !== skillName) {
          activateKey(skillName);
        }
      });

      // GSAP ScrollTrigger section choreography
      const sections = [
        { id: '#about', name: 'about', prev: 'hero', start: 'top 70%' },
        { id: '#skills', name: 'skills', prev: 'about', start: 'top 55%' },
        { id: '#experience', name: 'experience', prev: 'skills', start: 'top 70%' },
        { id: '#hackathons', name: 'experience', prev: 'experience', start: 'top 70%' },
        { id: '#projects', name: 'projects', prev: 'experience', start: 'top 70%' },
        { id: '#contact', name: 'contact', prev: 'projects', start: 'top 40%' },
      ];

      sections.forEach(({ id, name, prev, start }) => {
        const el = document.querySelector(id);
        if (!el) return;

        const st = ScrollTrigger.create({
          trigger: el,
          start,
          end: 'bottom bottom',
          scrub: 1,
          onEnter: () => {
            activeSectionRef.current = name;
            const t = getSectionTransform(name, window.innerWidth < 768);
            if (heroIdleTweenRef.current) heroIdleTweenRef.current.pause();
            gsap.to(keyboard.scale, { ...t.scale, duration: 1.2, ease: 'power2.out' });
            gsap.to(keyboard.position, { ...t.position, duration: 1.2, ease: 'power2.out' });
            gsap.to(keyboard.rotation, { ...t.rotation, duration: 1.2, ease: 'power2.out' });

            updateSectionSplineState(name, theme);

            if (name === 'contact') {
              floatingController.start(spline);
            } else {
              floatingController.stop(spline);
            }

            if (name === 'projects') {
              bongoController.start(spline);
            } else {
              bongoController.stop(spline);
            }
          },
          onLeaveBack: () => {
            activeSectionRef.current = prev;
            const t = getSectionTransform(prev, window.innerWidth < 768);
            if (prev === 'hero' && heroIdleTweenRef.current) {
              heroIdleTweenRef.current.resume();
            }
            gsap.to(keyboard.scale, { ...t.scale, duration: 1.2, ease: 'power2.out' });
            gsap.to(keyboard.position, { ...t.position, duration: 1.2, ease: 'power2.out' });
            gsap.to(keyboard.rotation, { ...t.rotation, duration: 1.2, ease: 'power2.out' });

            updateSectionSplineState(prev, theme);

            if (prev === 'contact') {
              floatingController.start(spline);
            } else {
              floatingController.stop(spline);
            }

            if (prev === 'projects') {
              bongoController.start(spline);
            } else {
              bongoController.stop(spline);
            }
          },
        });

        localScrollTriggers.push(st);
      });
    }).catch((err) => {
      console.warn('Spline keyboard scene initialization notice:', err);
    }).finally(() => {
      if (!isDisposed) {
        setIsLoaded(true);
      }
    });

    const fallbackTimer = setTimeout(() => {
      if (!isDisposed) setIsLoaded(true);
    }, 3500);

    // Pause WebGL rendering when tab is hidden to save GPU/battery
    const handleVisibility = () => {
      if (document.hidden) {
        spline.stop();
      } else {
        spline.play();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      isDisposed = true;
      clearTimeout(fallbackTimer);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (heroIdleTweenRef.current) heroIdleTweenRef.current.kill();
      localScrollTriggers.forEach((st) => st.kill());
      floatingController.stop(spline);
      bongoController.stop(spline);
      try {
        spline.dispose();
      } catch {}
    };
  }, [activateKey, deactivateKey, theme, updateSectionSplineState]);

  // Interactive mouse tilt parallax in hero
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!splineRef.current || window.scrollY > 300) return;
      const keyboard = splineRef.current.findObjectByName('keyboard');
      if (!keyboard) return;

      const normX = (e.clientX / window.innerWidth) - 0.5;
      const normY = (e.clientY / window.innerHeight) - 0.5;

      gsap.to(keyboard.rotation, {
        y: normX * 0.35,
        x: -normY * 0.25,
        duration: 0.8,
        ease: 'power1.out',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Physical keyboard listener: typing on your keyboard triggers 3D switch animation!
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
        return;
      }

      const key = e.key.toLowerCase();
      const matchedSkill = Object.values(SKILLS_DICT).find(
        (s) => s.keyTrigger === key || s.name === key || s.name.startsWith(key)
      );

      if (matchedSkill) {
        activateKey(matchedSkill.name);
      }
    };

    const handleKeyUp = () => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
        return;
      }
      deactivateKey();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activateKey, deactivateKey]);

  return (
    <>
      {/* 3D Spline Canvas */}
      <canvas
        ref={canvasRef}
        id="canvas3d"
        className="keyboard-scene-canvas"
        style={{
          opacity: isLoaded ? 1 : 0,
        }}
      />

      {/* Loading state indicator */}
      {!isLoaded && (
        <div className="spline-loading-overlay">
          <div className="spline-loading-box">
            <div className="spline-spinner" />
            <span>Loading 3D Macro-Pad...</span>
          </div>
        </div>
      )}
    </>
  );
}
