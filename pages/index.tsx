import { useState, useCallback, ChangeEvent } from "react";
import { useRouter } from "next/router";
import makeBundlephobiaUrl from "../util/makeBundlephobiaUrl";

interface WindowProps {
  side: "left" | "right";
  initialModule: string;
}
const Window = ({ side, initialModule }: WindowProps) => {
  const router = useRouter();
  const [module, setModule] = useState<string>(
    (router.query[side] as string) ?? initialModule
  );
  const [src, setSrc] = useState<string>(makeBundlephobiaUrl(module));

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setModule(e.target.value);
      setSrc(makeBundlephobiaUrl(e.target.value));
    },
    [setModule, setSrc]
  );

  return (
    <div className="window">
      <input type="text" value={module} onChange={onChange} />
      <iframe title={`Bundlephobia (${side})`} src={src} />
    </div>
  );
};

export default () => {
  return (
    <div>
      <div className="frame">
        <Window side="left" initialModule="react@latest" />
        <Window side="right" initialModule="vue@latest" />
      </div>

      {/* <style global jsx>{`
        body,
        html {
          margin: 0;
          padding: 0;
          background: #fefefe;
        }
      `}</style> */}
    </div>
  );
};
