import { cva } from 'class-variance-authority';

export const headingVariants = cva('font-medium tracking-tight', {
  variants: {
    variant: {
      h2: 'text-3xl lg:text-4xl',
      h3: 'text-xl lg:text-2xl',
    },
  },
});

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-normal tracking-normal transition-colors duration-150',
  {
    variants: {
      variant: {
        primary:
          'border border-[#26251e] bg-[#26251e] text-[#f7f7f4] hover:border-[#3b3a33] hover:bg-[#3b3a33] hover:text-[#f7f7f4] dark:border-[#edecec] dark:bg-[#edecec] dark:text-[#14120b] dark:hover:border-[#d7d6d5] dark:hover:bg-[#d7d6d5]',
        secondary:
          'border border-[#26251e06] bg-[#e6e5e0] text-[#26251e] hover:border-[#26251e06] hover:bg-[#e1e0db] hover:text-[#26251e] dark:border-white/8 dark:bg-[#26241e] dark:text-[#edecec] dark:hover:bg-[#2b2923]',
      },
      size: {
        default: 'h-[43px] rounded-full px-[1.35em] py-0 text-base leading-none',
        compact: 'h-9 rounded-full px-[1.2em] py-0 text-sm leading-none',
      },
      surface: {
        elevated: '',
        flat: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      surface: 'elevated',
    },
  },
);

export const cardVariants = cva('rounded-2xl text-sm p-6 bg-origin-border shadow-lg', {
  variants: {
    variant: {
      secondary: 'bg-brand-secondary text-brand-secondary-foreground',
      default: 'border bg-fd-card',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
