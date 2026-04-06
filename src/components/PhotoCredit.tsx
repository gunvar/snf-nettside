export default function PhotoCredit({ photographer }: { photographer: string }) {
  return (
    <span className="absolute bottom-2 right-2 text-white/40 text-[10px] tracking-wide z-10">
      Foto: {photographer}
    </span>
  );
}
