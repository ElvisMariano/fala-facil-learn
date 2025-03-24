import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationItemProps {
  label: string;
  href: string;
  children?: React.ReactNode;
}

const NavigationItem = ({ label, href, children }: NavigationItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href);
  };

  if (children) {
    return (
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          onClick={handleClick}
          className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <span>{label}</span>
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform", 
            isHovered && "rotate-180"
          )} />
        </div>
        
        {isHovered && (
          <div className="absolute top-full left-0 pt-2 z-10 animate-fade-in">
            {children}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div 
      onClick={handleClick}
      className="text-foreground hover:text-primary transition-colors cursor-pointer"
    >
      {label}
    </div>
  );
};

export default NavigationItem; 