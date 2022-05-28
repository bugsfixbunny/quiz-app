import { useStoreSelector } from '../store/hook';
import { selectLoading, selectError } from '../store/modules/questions';
import Spinner from '../components/Spinner';

interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  const loading = useStoreSelector(selectLoading);
  const error = useStoreSelector(selectError);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-3 h-full">
      <div className="col-span-1 md:col-span-2 md:col-start-2 lg:col-span-1, lg:col-start-2 xl:col-span-1 xl:col-start-2 bg-gray-200 p-2">
        {!loading ? (
          !error ? (
            children
          ) : (
            <div className="text-center text-3xl font-bold mt-8">
              Something went wrong!
            </div>
          )
        ) : (
          <div className="flex items-center justify-center h-full">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
