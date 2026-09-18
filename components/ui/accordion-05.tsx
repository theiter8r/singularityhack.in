"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  id: string;
  title: string;
  content: string;
}

/* ─── Single animated item ─────────────────────────────────────────────────── */

interface FaqItemRowProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FaqItemRow({ item, isOpen, onToggle, index }: FaqItemRowProps) {
  const contentRef   = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const numRef       = useRef<HTMLParagraphElement>(null);
  const iconWrapRef  = useRef<HTMLSpanElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const isFirst      = useRef(true);

  useEffect(() => {
    const content  = contentRef.current;
    const title    = titleRef.current;
    const num      = numRef.current;
    const iconWrap = iconWrapRef.current;
    const line     = lineRef.current;
    if (!content) return;

    /* On first render just set state instantly – no animation */
    if (isFirst.current) {
      isFirst.current = false;
      if (isOpen) {
        gsap.set(content, { height: "auto", opacity: 1 });
        if (title)    gsap.set(title,    { color: "#E3C77E" });
        if (num)      gsap.set(num,      { color: "#E3C77E", opacity: 1 });
        if (iconWrap) gsap.set(iconWrap, { rotation: 45 });
        if (line)     gsap.set(line,     { scaleX: 1, opacity: 1 });
      } else {
        gsap.set(content, { height: 0, opacity: 0 });
        if (title)    gsap.set(title,    { color: "#F2F4F7" });
        if (num)      gsap.set(num,      { color: "#F2F4F7", opacity: 0.35 });
        if (iconWrap) gsap.set(iconWrap, { rotation: 0 });
        if (line)     gsap.set(line,     { scaleX: 0, opacity: 0 });
      }
      return;
    }

    /* ── OPEN ─────────────────────────────────────── */
    if (isOpen) {
      // measure natural height
      gsap.set(content, { height: "auto", opacity: 1 });
      const h = content.scrollHeight;
      gsap.fromTo(
        content,
        { height: 0, opacity: 0 },
        {
          height: h,
          opacity: 1,
          duration: 0.6,
          ease: "expo.out",
          onComplete: () => gsap.set(content, { height: "auto" }),
        }
      );
      if (title)    gsap.to(title,    { color: "#E3C77E", duration: 0.35, ease: "power2.out" });
      if (num)      gsap.to(num,      { color: "#E3C77E", opacity: 1, duration: 0.35, ease: "power2.out" });
      if (iconWrap) gsap.to(iconWrap, { rotation: 45, duration: 0.45, ease: "back.out(1.8)" });
      if (line)     gsap.to(line,     { scaleX: 1, opacity: 1, duration: 0.5, ease: "expo.out", delay: 0.08 });

    /* ── CLOSE ─────────────────────────────────────── */
    } else {
      const h = content.scrollHeight;
      gsap.fromTo(
        content,
        { height: h, opacity: 1 },
        { height: 0, opacity: 0, duration: 0.38, ease: "power3.inOut" }
      );
      if (title)    gsap.to(title,    { color: "#F2F4F7",  duration: 0.25, ease: "power2.out" });
      if (num)      gsap.to(num,      { color: "#F2F4F7", opacity: 0.35, duration: 0.25, ease: "power2.out" });
      if (iconWrap) gsap.to(iconWrap, { rotation: 0, duration: 0.35, ease: "power3.out" });
      if (line)     gsap.to(line,     { scaleX: 0, opacity: 0, duration: 0.25, ease: "power2.in" });
    }
  }, [isOpen]);

  return (
    /* Keep Radix Item + Trigger for full ARIA correctness */
    <AccordionPrimitive.Item
      value={item.id}
      className="border-b border-[#F2F4F7]/10 last:border-b"
    >
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          onClick={onToggle}
          className="w-full text-left flex items-center gap-4 py-5 pl-4 md:pl-10 pr-4 cursor-pointer group focus:outline-none"
        >
          {/* Number */}
          <p
            ref={numRef}
            className="text-xs font-mono leading-none shrink-0 transition-none"
            style={{ color: "#F2F4F7", opacity: 0.35 }}
          >
            {String(index + 1).padStart(2, "0")}
          </p>

          {/* Title */}
          <h3
            ref={titleRef}
            className="font-seasonmix text-[clamp(1.6rem,3.5vw,2.8rem)] font-normal leading-none tracking-tight flex-1 transition-none"
            style={{ color: "#F2F4F7" }}
          >
            {item.title}
          </h3>

          {/* Plus icon */}
          <span ref={iconWrapRef} className="shrink-0 flex items-center justify-center w-6 h-6 transition-none">
            <PlusIcon className="w-5 h-5 text-[#F2F4F7]/30" strokeWidth={1.5} />
          </span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>

      {/* GSAP-controlled content, always mounted, height animated */}
      <div
        ref={contentRef}
        style={{ height: 0, overflow: "hidden", opacity: 0 }}
        aria-hidden={!isOpen}
      >
        <div className="pb-7 pl-4 md:pl-10 pr-4">
          {/* Accent line */}
          <div
            ref={lineRef}
            className="h-px w-10 bg-[#E3C77E] mb-4 origin-left"
            style={{ transform: "scaleX(0)", opacity: 0 }}
          />
          <p className="font-sans text-[clamp(0.88rem,1.3vw,1rem)] text-[#F2F4F7]/60 leading-relaxed max-w-[52rem] pr-4">
            {item.content}
          </p>
        </div>
      </div>
    </AccordionPrimitive.Item>
  );
}

/* ─── Root component ────────────────────────────────────────────────────────── */

interface Accordion05Props {
  items: FaqItem[];
  defaultOpen?: string;
  className?: string;
}

export function Accordion05({ items, defaultOpen, className }: Accordion05Props) {
  const [openId, setOpenId] = useState<string>(defaultOpen ?? items[0]?.id ?? "");

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? "" : id));

  return (
    <div className={cn("w-full mx-auto", className)}>
      <AccordionPrimitive.Root
        type="single"
        value={openId}
        onValueChange={setOpenId}
        collapsible
      >
        {items.map((item, i) => (
          <FaqItemRow
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => toggle(item.id)}
            index={i}
          />
        ))}
      </AccordionPrimitive.Root>
    </div>
  );
}
