import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SidebarMenu.css';

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  children?: MenuItem[];
}

export interface SidebarMenuProps {
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  width?: number;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  items,
  isOpen,
  onClose,
  title = 'Menu',
  width = 320,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (item: MenuItem, e: React.MouseEvent) => {
    if (item.children && item.children.length > 0) {
      e.preventDefault();
      toggleItem(item.id);
    } else if (item.href) {

      console.log('Navigate to:', item.href);
    }
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);

    return (
      <div key={item.id} className="menu-item-wrapper">
        <motion.a
          href={item.href || '#'}
          className={`menu-item menu-item--level-${level}`}
          onClick={(e) => handleItemClick(item, e)}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          {item.icon && <span className="menu-item-icon">{item.icon}</span>}
          <span className="menu-item-label">{item.label}</span>
          {hasChildren && (
            <motion.span
              className="menu-item-chevron"
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </motion.span>
          )}
        </motion.a>
        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              className="menu-submenu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {item.children!.map((child) => renderMenuItem(child, level + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
        
          <motion.div
            className="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.2 }}
          />
          
        
          <motion.aside
            className="sidebar"
            style={{ width }}
            initial={{ x: width }}
            animate={{ x: 0 }}
            exit={{ x: width }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="sidebar-header">
              <h2 className="sidebar-title">{title}</h2>
              <button onClick={onClose} className="sidebar-close" aria-label="Close menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            
            <nav className="sidebar-nav">
              {items.map((item) => renderMenuItem(item))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
