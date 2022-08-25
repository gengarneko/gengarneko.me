import { tw } from '@blog/css';

export default function Home() {
  return (
    <div className={tw`flex h-full flex-col justify-center items-center`}>
      <h1 className={tw`text-4xl mb-5 font-bold`}>Home</h1>
      <span className={tw`text-7xl`}>🏡</span>
    </div>
  );
}
