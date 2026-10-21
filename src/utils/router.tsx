import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface RouterContextType {
  currentPath: string;
  pathname: string;
  search: string;
  hash: string;
  navigate: (to: string, options?: { replace?: boolean; preserveScroll?: boolean }) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  pathname: '/',
  search: '',
  hash: '',
  navigate: () => {},
});

export const useRouter = () => useContext(RouterContext);

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const getFullLocation = () => {
    if (typeof window !== 'undefined') {
      return (window.location.pathname || '/') + (window.location.search || '') + (window.location.hash || '');
    }
    return '/';
  };

  const [currentUrl, setCurrentUrl] = useState<string>(getFullLocation);

  useEffect(() => {
    const onPopState = () => {
      setCurrentUrl(getFullLocation());
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((to: string, options?: { replace?: boolean; preserveScroll?: boolean }) => {
    if (typeof window === 'undefined') return;

    const dummyBase = 'https://ajithgrowth.local';
    const parsed = new URL(to, dummyBase);
    const targetPath = parsed.pathname || '/';
    const targetSearch = parsed.search || '';
    const targetHash = parsed.hash || '';
    const targetFull = targetPath + targetSearch + targetHash;

    const currentFull = window.location.pathname + window.location.search + window.location.hash;

    if (currentFull !== targetFull) {
      if (options?.replace) {
        window.history.replaceState({}, '', targetFull);
      } else {
        window.history.pushState({}, '', targetFull);
      }
      setCurrentUrl(targetFull);
    }

    if (targetHash) {
      const hashId = targetHash.replace(/^#/, '');
      setTimeout(() => {
        const el = document.getElementById(hashId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else if (!options?.preserveScroll) {
      window.scrollTo(0, 0);
    }
  }, []);

  // Parse currentUrl into constituents
  const { pathname, search, hash } = (() => {
    try {
      const parsed = new URL(currentUrl, 'https://ajithgrowth.local');
      return {
        pathname: parsed.pathname || '/',
        search: parsed.search || '',
        hash: parsed.hash || '',
      };
    } catch {
      return { pathname: '/', search: '', hash: '' };
    }
  })();

  return (
    <RouterContext.Provider value={{ currentPath: currentUrl, pathname, search, hash, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  target?: string;
  rel?: string;
  key?: React.Key;
  'aria-label'?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: any;
}

export function Link({ href, children, onClick, className, target, id, ...props }: LinkProps) {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If user clicked with meta/ctrl or external link, allow default browser behavior
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || target === '_blank') {
      return;
    }

    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return;
    }

    if (href.startsWith('#')) {
      e.preventDefault();
      if (onClick) {
        onClick(e);
      }
      const hashId = href.slice(1);
      const el = document.getElementById(hashId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState({}, '', href);
      }
      return;
    }

    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
    navigate(href);
  };

  return (
    <a id={id} href={href} onClick={handleClick} className={className} target={target} {...props}>
      {children}
    </a>
  );
}
