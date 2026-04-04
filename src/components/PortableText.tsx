import { PortableText as SanityPortableText } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

const components = {
  types: {
    image: ({ value }: { value: { asset: unknown; alt?: string } }) => {
      if (!value?.asset) return null;
      return (
        <div className="relative w-full aspect-[16/9] my-8 rounded-xl overflow-hidden">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || ""}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-serif text-2xl text-navy mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-serif text-xl text-navy mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-navy/65 text-[15px] leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-3 border-gold pl-5 text-navy/70 italic text-[15px] leading-relaxed my-6">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href: string };
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sea-blue hover:underline"
      >
        {children}
      </a>
    ),
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PortableText({ value }: { value: any[] }) {
  return (
    <SanityPortableText
      value={value}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      components={components as any}
    />
  );
}
