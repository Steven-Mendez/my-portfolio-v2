import { ArrowUpRight } from 'lucide-react';

import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';
import GlassSurface from '../hero/GlassSurface';
import { Badge } from '@/components/ui/badge';
import { portfolioData } from '@/lib/data';

export default function CredentialsSection() {
  const { certifications } = portfolioData;

  return (
    <SectionWrapper id="education">
      <SectionTitle title="Education" eyebrow="& Credentials" />

      <GlassSurface as="div" className="rounded-3xl px-6 py-2 md:px-8">
        <ul>
          {certifications.map((item, i) => (
            <li
              key={item.name}
              className={`flex items-start gap-5 py-5 ${i > 0 ? 'border-t border-white/10' : ''}`}
            >
              <span className="mt-0.5 w-12 shrink-0 font-mono text-[13px] text-fg-muted">
                {item.year}
              </span>

              <div className="min-w-0 flex-1">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[17px] font-semibold tracking-tight text-white transition-colors hover:text-eyebrow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {item.name}
                    <ArrowUpRight className="size-3.5 text-eyebrow" aria-hidden />
                  </a>
                ) : (
                  <div className="text-[17px] font-semibold tracking-tight text-white">
                    {item.name}
                  </div>
                )}
                <div className="mt-1 text-sm leading-snug text-fg-muted">{item.org}</div>
              </div>

              <Badge
                variant="outline"
                className="shrink-0 self-center border-primary/30 bg-primary/[0.06] font-mono tracking-[0.12em] text-eyebrow"
              >
                {item.kind}
              </Badge>
            </li>
          ))}
        </ul>
      </GlassSurface>
    </SectionWrapper>
  );
}
