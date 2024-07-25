import { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFound: FC = () => {
  return (
    <>
      <main className="grid min-h-full px-6 py-24 bg-white place-items-center sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="font-semibold text-indigo-600 text-4xl">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page Not Found</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="flex items-center justify-center mt-10 gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              홈으로 이동
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;