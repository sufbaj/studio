'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { AppContextProvider, useAppContext } from '@/contexts/AppContext';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  BookText,
  MessageSquare,
  SpellCheck,
  FileText,
  Home,
  Award,
  BookOpen,
  CaseUpper,
  Hash,
  Languages,
} from 'lucide-react';
import type { Language, Grade } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const navItems = [
  { href: 'alphabet', label: 'Abeceda', icon: CaseUpper },
  { href: 'numbers', label: 'Brojevi', icon: Hash },
  { href: 'vocabulary', label: 'Rječnik', icon: BookText },
  { href: 'sentences', label: 'Rečenice', icon: MessageSquare },
  { href: 'grammar', label: 'Gramatika', icon: SpellCheck },
  { href: 'spelling', label: 'Pravopis', icon: FileText },
  { href: 'reading', label: 'Razumijevanje pročitanog', icon: BookOpen },
  { href: 'svenska-till-modersmal', label: 'Prevođenje', icon: Languages },
];


function LearnLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setSettings, score, maxScore, language, grade, viewMode } = useAppContext();

  useEffect(() => {
    const lang = searchParams.get('lang') as Language;
    const gr = searchParams.get('grade') as Grade;
    const view = searchParams.get('view') as 'student' | 'teacher' | null;

    if (lang && gr) {
      setSettings(lang, gr, view === 'student' ? 'student' : 'teacher');
    }
  }, [searchParams, setSettings]);

  const getLanguageTitle = (lang: Language | null) => {
    switch(lang) {
      case 'bosnian': return 'Bosanski';
      case 'croatian': return 'Hrvatski';
      case 'serbian': return 'Srpski';
      default: return 'Učitavanje...';
    }
  }

  if (!language || !grade) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-12 w-32 mt-4" />
        </div>
    );
  }

  const isLinkActive = (href: string) => {
    return pathname.includes(`/learn/${href}`);
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="w-7 h-7 text-white" />
            <h2 className="text-lg font-headline font-semibold text-white">LinguaBKS</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarGroup>
              <SidebarGroupLabel className="text-sidebar-foreground/70">Vježbe</SidebarGroupLabel>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Button 
                    asChild 
                    variant="ghost" 
                    className={cn(
                        "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground", 
                        isLinkActive(item.href) && "bg-blue-100 text-blue-900 font-semibold hover:bg-blue-100/90 hover:text-blue-900"
                    )}
                  >
                    <Link href={`/learn/${item.href}?${searchParams.toString()}`}>
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Link>
                  </Button>
                </SidebarMenuItem>
              ))}
            </SidebarGroup>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <div>
              <h1 className="text-xl font-headline font-semibold">
                {getLanguageTitle(language)} - Årskurs {grade}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/50">
              <Award className="w-6 h-6 text-yellow-500" />
              <span className="text-lg font-bold">{score}{maxScore > 0 ? ` / ${maxScore}` : ''} poäng</span>
            </div>
            <Button asChild variant="outline" size="icon">
              <Link href="/">
                <Home className="w-4 h-4" />
                <span className="sr-only">Hem</span>
              </Link>
            </Button>
          </div>
        </header>
        <main className="p-4 sm:p-6 md:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Skeleton className="h-16 w-16 rounded-full" />
        </div>
      }>
      <AppContextProvider>
        <LearnLayoutContent>{children}</LearnLayoutContent>
      </AppContextProvider>
    </Suspense>
  );
}
