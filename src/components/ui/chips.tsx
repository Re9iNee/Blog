import Link from "next/link";

type Props = {
  link: string;
  children: string;
};
function Chip({ link, children }: Props) {
  return (
    <li className='rounded-3xl font-light bg-gray-200 px-4 py-2'>
      <Link href={link}>{children}</Link>
    </li>
  );
}

export default Chip;
