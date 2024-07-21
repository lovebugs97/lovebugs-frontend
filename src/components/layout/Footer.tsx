import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="footer flex gap-32 justify-center items-center h-24">
      <aside>
        <p className="text-[20px] font-bold">{import.meta.env.VITE_APP_NAME}</p>
        <p>Copyright ©{new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav className="flex gap-4 underline-offset-2 font-semibold">
        <a
          target="_blank"
          href={`${import.meta.env.VITE_GITHUB_URL}`}
          className="underline text-[16px] hover:text-gray-300"
        >
          Github
        </a>
        <a
          target="_blank"
          href={`mailto:${import.meta.env.VITE_AUTHOR_EMAIL}`}
          className="underline text-[16px] hover:text-gray-300"
        >
          Email
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
