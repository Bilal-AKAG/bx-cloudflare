"use client";

import { Link, useLocation } from "@tanstack/react-router";
import {
  IconCircleQuestion,
  IconHouse,
  IconSparkle,
  IconSquareFeather,
} from "nucleo-glass";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/",
    icon: <IconHouse aria-hidden size={18} uniqueId="nav-home" />,
    label: "Home",
  },
  {
    href: "/about",
    icon: <IconCircleQuestion aria-hidden size={18} uniqueId="nav-about" />,
    label: "About",
  },
  {
    href: "/skill",
    icon: <IconSparkle aria-hidden size={18} uniqueId="nav-skill" />,
    label: "Skill",
  },
  {
    href: "/blog",
    icon: <IconSquareFeather aria-hidden size={18} uniqueId="nav-blog" />,
    label: "Blog",
  },
];

/**
 * nucleo-glass icons read `--nc-gradient-1-color-*` instead of currentColor,
 * so tone has to be driven through those custom properties. Keep these as
 * literal strings, Tailwind cannot see classes built by concatenation.
 */
const iconToneActive =
  "[--nc-gradient-1-color-1:var(--foreground)] [--nc-gradient-1-color-2:color-mix(in_oklab,var(--foreground),#000_30%)]";

const iconToneHover =
  "group-hover:[--nc-gradient-1-color-1:var(--foreground)] group-hover:[--nc-gradient-1-color-2:color-mix(in_oklab,var(--foreground),#000_30%)]";

const isActive = (currentPath: string, targetHref: string) => {
  if (targetHref === "/") {
    return currentPath === "/";
  }
  return currentPath === targetHref || currentPath.startsWith(`${targetHref}/`);
};

const CornerBracket = ({
  position,
  colorClass,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  colorClass: string;
}) => {
  const positioning = {
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
  };

  const borderStyles = {
    "bottom-left": "rounded-bl-[1px] border-b-2 border-l-2",
    "bottom-right": "rounded-br-[1px] border-b-2 border-r-2",
    "top-left": "rounded-tl-[1px] border-l-2 border-t-2",
    "top-right": "rounded-tr-[1px] border-r-2 border-t-2",
  };

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute size-2",
        colorClass,
        positioning[position],
        borderStyles[position]
      )}
    />
  );
};

const Navigations = () => {
  const pathname = useLocation({ select: (location) => location.pathname });

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-4 left-1/2 z-40 flex h-fit -translate-x-1/2 flex-col items-center justify-center border border-dashed border-border-tertiary p-1 backdrop-blur-xl sm:p-0.5"
    >
      <div className="bg-bg-base">
        <div className="flex flex-row gap-7 p-2">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    aria-current={active ? "page" : undefined}
                    aria-label={item.label}
                    className="group relative flex size-8 flex-col items-center justify-center outline-none transition-all duration-300 focus-visible:ring-1 focus-visible:ring-ring"
                    preload="intent"
                    to={item.href}
                  >
                    {active ? (
                      <>
                        <CornerBracket
                          colorClass="border-foreground"
                          position="top-left"
                        />
                        <CornerBracket
                          colorClass="border-foreground"
                          position="top-right"
                        />
                        <CornerBracket
                          colorClass="border-foreground"
                          position="bottom-left"
                        />
                        <CornerBracket
                          colorClass="border-foreground"
                          position="bottom-right"
                        />
                      </>
                    ) : (
                      <div className="absolute inset-0 rounded-[1px] border border-muted-foreground/10 transition-colors group-hover:border-border dark:border-border-secondary" />
                    )}

                    <span
                      aria-hidden
                      className={cn(
                        "relative z-10 transition-all duration-300",
                        active
                          ? `${iconToneActive} scale-110 drop-shadow-[0_0_8px_var(--icon-glow)]`
                          : iconToneHover
                      )}
                    >
                      {item.icon}
                    </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="hidden sm:block" side="top">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigations;
