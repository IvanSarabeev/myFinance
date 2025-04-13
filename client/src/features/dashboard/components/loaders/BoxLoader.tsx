import { memo, FC } from "react";

type BoxLoaderProps = {
  style?: string;
  boxCount: number;
};

const BoxLoader: FC<BoxLoaderProps> = ({ boxCount, style }) => {
  const count = boxCount || 1;

  return (
    <div className="grid auto-rows-min gap-x-4 md:grid-cols-3">
      {count > 0 ? (
        Array.from({ length: count }).map((_, index) => (
          <div key={index} className={`animate-pulse ${style} bg-muted/95`} />
        ))
      ) : (
        <div className={style} />
      )}
    </div>
  );
};

export default memo(BoxLoader);
