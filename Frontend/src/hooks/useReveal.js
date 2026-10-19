import { useEffect } from 'react';

// adds the "in" class when an element with class "rv" is on screen,
// and removes it when it leaves, so the animation plays in and out
export default function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.target.classList.toggle('in', e.isIntersecting)),
      { threshold: 0.15 }
    );
    document.querySelectorAll('.rv').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}