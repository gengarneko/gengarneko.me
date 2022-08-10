import { tw } from 'twind';

export default function Contact() {
  return (
    <div className={tw`flex h-full flex-col justify-center items-center`}>
      <h1 className={tw`text-4xl mb-5 font-bold`}>Contact</h1>
      <span className={tw`text-7xl`}>📞</span>
    </div>
  );
}
