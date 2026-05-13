import { Package, LayoutDashboard, Layers, History, BarChart3, Settings } from 'lucide-react';
import NavItem from './ui/NavItem';
import type { TabType } from '../types';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <nav className="fixed left-0 top-0 h-full w-20 md:w-64 bg-white border-r border-[#141414] flex flex-col z-40">
      <div className="p-6 border-b border-[#141414] flex items-center gap-3">
        <div className="w-10 h-10 bg-[#141414] flex items-center justify-center">
          <Package className="text-white w-6 h-6" />
        </div>
        <span className="hidden md:block font-bold text-xl tracking-tight italic font-serif">KardexPro</span>
      </div>

      <div className="flex-1 py-6 flex flex-col gap-2">
        <NavItem
          active={activeTab === 'dashboard'}
          onClick={() => onTabChange('dashboard')}
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
        />
        <NavItem
          active={activeTab === 'products'}
          onClick={() => onTabChange('products')}
          icon={<Layers size={20} />}
          label="Productos"
        />
        <NavItem
          active={activeTab === 'movements'}
          onClick={() => onTabChange('movements')}
          icon={<History size={20} />}
          label="Movimientos"
        />
        <NavItem
          active={activeTab === 'reports'}
          onClick={() => onTabChange('reports')}
          icon={<BarChart3 size={20} />}
          label="Reportes"
        />
      </div>

      <div className="p-6 border-t border-[#141414]">
        <NavItem
          active={activeTab === 'settings'}
          onClick={() => onTabChange('settings')}
          icon={<Settings size={20} />}
          label="Configuración"
        />
      </div>
    </nav>
  );
}
