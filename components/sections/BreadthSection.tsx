import React from 'react';
import SectionWrapper from './SectionWrapper';
import SectionTitle from './SectionTitle';
import GlassSurface from '../hero/GlassSurface';

const skills = [
  { name: 'AWS (Lambda, S3, EC2)', category: 'Cloud' },
  { name: 'Generative AI & LLMs', category: 'Gen AI' },
  { name: 'RAG Architectures', category: 'Architecture' },
  { name: 'PostgreSQL & Redis', category: 'Databases' },
  { name: 'Docker & CI/CD', category: 'DevOps' },
  { name: 'Python (PyTest)', category: 'Testing' },
];

export default function BreadthSection() {
  return (
    <SectionWrapper id="breadth">
      <SectionTitle 
        title="Technical Breadth" 
        subtitle="Secondary & Evolving Skills" 
      />
      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill, i) => (
          <GlassSurface 
            key={i} 
            className="px-6 py-4 rounded-2xl flex flex-col items-center justify-center border-white/5 hover:border-white/20 transition-all cursor-default min-w-[160px]"
          >
            <span className="text-[#f4f6ff] font-medium">{skill.name}</span>
            <span className="text-[10px] text-[#b4c4ff]/40 uppercase tracking-widest mt-1 font-mono">
              {skill.category}
            </span>
          </GlassSurface>
        ))}
      </div>
      
      <GlassSurface className="mt-12 p-8 rounded-3xl border-white/5 text-center max-w-2xl mx-auto">
        <p className="text-[#d2dcff]/70 italic">
          &quot;The best way to predict the future is to invent it.&quot;
        </p>
      </GlassSurface>
    </SectionWrapper>
  );
}
