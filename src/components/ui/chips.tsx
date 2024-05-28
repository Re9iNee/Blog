import Link from "next/link";

type Props = {
  children: string;
};
function Chip({ children }: Props) {
  return (
    <Link
      href={`/tags/${children.toLowerCase()}`}
      className='rounded-[32px] text-xs text-neutral-600 bg-neutral-50 px-4 py-1.5 
      dark:bg-blue-950 dark:text-white
      active:bg-gradient-to-tr active:to-[#9767FE] active:from-[#5F14FF] active:text-neutral-50'
    >
      {children}
    </Link>
  );
}

export default Chip;
