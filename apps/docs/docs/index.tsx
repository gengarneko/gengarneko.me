import { Button } from '../ui/button';

const LinkSVG = () => {
  return (
    <svg
      width='25'
      height='25'
      viewBox='0 0 25 25'
      fill='none'
      stroke='currentColor'
      role='img'
    >
      <path
        d='M7.73242 17.4224L17.7324 7.42236'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      ></path>
      <path
        d='M7.73242 7.42236H17.7324V17.4224'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      ></path>
    </svg>
  );
};

const Description = () => {
  return (
    <>
      <section className='col-start-2'>
        <p className='text-2xl'>
          <span className='text-text-1 font-bold'>
            Hi 👋🏻 I'm GengarNeko, this is my blog.
          </span>{' '}
          <span className='text-text-2 font-medium'>
            Here, I share through my writing my experience as a frontend
            engineer and everything I'm learning about on React, Shaders, React
            Three Fiber, Framer Motion, and more.
          </span>
        </p>
      </section>

      <div className='col-start-2 flex justify-start my-2'>
        <Button
          onClick={() => (window.location.href = '/about')}
          className='bg-[var(--rp-c-bg-soft)] hover:bg-[var(--rp-c-bg-mute)] text-text-2'
        >
          About me <LinkSVG />
        </Button>
      </div>
    </>
  );
};

const PinnedProjects = () => {
  const projects = [
    {
      name: 'sadim',
      description:
        'ECS-driven point cloud labeling platform for efficient 3D data annotation and visualization.',
    },
    {
      name: 'sadim/ecs',
      description:
        'An archetypal Entity Component System, built entirely in Typescript.',
    },
    {
      name: 'una-pcl',
      description:
        'A web-based point cloud annotation tool built with Vue 3 and Three.js, for labeling and segmentation tasks.',
    },
    {
      name: 'una-ui',
      description:
        'Modular React UI components library makes your application simple.',
    },
  ];
  return (
    <div className='col-start-2 mt-10'>
      <div className='text-text-1 font-bold mb-4'>Pinned Projects</div>
      <div className='flex flex-wrap gap-4'>
        {projects.map((project, index) => (
          <div
            key={index}
            className='
              p-4 rounded-lg transition-colors hover:cursor-pointer
              bg-[var(--rp-c-bg-soft)] hover:bg-[var(--rp-c-bg-mute)]
              flex-[calc(50%-0.5rem)] min-w-[calc(50%-0.5rem)]
            '
          >
            <h3 className='font-medium pointer-events-none'>{project.name}</h3>
            <p className='text-text-2 text-sm pointer-events-none'>
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const PinnedPosts = () => {
  return (
    <div className='col-start-2 mt-10'>
      <div className='text-text-1 font-bold mb-4'>All articles</div>
      <div>2024</div>
      <div>2023</div>
      <div>2022</div>
      <div>2021</div>
      <div>2020</div>
    </div>
  );
};

export default function Home() {
  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='col-start-2 h-[20px]' />
      <Description />
      <PinnedProjects />
      <PinnedPosts />
    </div>
  );
}

export const frontmatter = {
  pageType: 'custom',
};
