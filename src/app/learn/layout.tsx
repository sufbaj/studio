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
  SidebarMenuButton,
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
  Bot,
} from 'lucide-react';
import type { Language, Grade } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const navItems = [
  { href: 'alphabet', icon: CaseUpper, label: 'Alfabet' },
  { href: 'numbers', icon: Hash, label: 'Brojevi' },
  { href: 'vocabulary', icon: BookText, label: 'Riječnik' },
  { href: 'sentences', icon: MessageSquare, label: 'Rečenice' },
  { href: 'grammar', icon: SpellCheck, label: 'Gramatika' },
  { href: 'spelling', icon: FileText, label: 'Pravopis' },
  { href: 'reading', icon: BookOpen, label: 'Čitanje' },
];

const toolItems = [
    { href: 'translation', icon: Languages, label: 'Prevoditelj' },
    { href: 'ai-review', icon: Bot, label: 'AI Lektor' },
]

function getLanguageDisplayName(language: Language) {
    switch (language) {
      case 'bosnian':
        return 'Bosanski';
      case 'croatian':
        return 'Hrvatski';
      case 'serbian':
        return 'Srpski';
      default:
        return '';
    }
}

function LearnLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setSettings, score, maxScore, language, grade } = useAppContext();

  useEffect(() => {
    const lang = searchParams.get('lang') as Language;
    const gr = searchParams.get('grade') as Grade;
    if (lang && gr) {
      setSettings(lang, gr);
    }
  }, [searchParams, setSettings]);

  if (!language || !grade) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-12 w-32 mt-4" />
        </div>
    );
  }

  const getActivePath = (href: string) => {
    return pathname.includes(href) ? 'bg-sidebar-accent text-sidebar-accent-foreground' : '';
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="w-7 h-7 text-white" />
            <h2 className="text-lg font-headline font-semibold text-white">LinguAIbks</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarGroup>
              <SidebarGroupLabel className="text-sidebar-foreground/70">Vježbe</SidebarGroupLabel>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Button asChild variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    <Link href={`/learn/${item.href}?${searchParams.toString()}`}
                      className={getActivePath(item.href)}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Link>
                  </Button>
                </SidebarMenuItem>
              ))}
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
                <SidebarGroupLabel className="text-sidebar-foreground/70">Alati</SidebarGroupLabel>
                {toolItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                    <Button asChild variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                        <Link href={`/learn/${item.href}?${searchParams.toString()}`}
                        className={getActivePath(item.href)}
                        >
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
                {getLanguageDisplayName(language)} - {grade}. razred
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/50">
              <Award className="w-6 h-6 text-yellow-500" />
              <span className="text-lg font-bold">{score}{maxScore > 0 ? ` / ${maxScore}` : ''} poena</span>
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
