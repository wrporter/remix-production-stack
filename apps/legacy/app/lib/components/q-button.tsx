import {
    type ButtonProps as NextButtonProps,
    Spinner,
    type VariantProps,
    forwardRef,
    tv,
    useButton,
} from '@nextui-org/react';
import { focusKeyboardRing } from '~/lib/components/focus-ring.ts';

const buttonVariants = tv({
    base: [
        'flex gap-2 items-center justify-center',
        'rounded text-white cursor-pointer',
        focusKeyboardRing,
    ],
    variants: {
        size: {
            sm: 'p-2 h-8 text-sm',
            md: 'py-2 px-4 h-10',
        },
        variant: {
            neutral: [
                'bg-white text-gray-600',
                'border border-gray-600',
                'hover:bg-gray-100 active:bg-gray-200',
            ],
            primary: [
                'text-white bg-blue-600',
                'border border-blue-600',
                'hover:bg-blue-700 active:bg-blue-800',
                'hover:border-blue-700 active:border-blue-800',
            ],
            secondary: [
                'bg-white text-blue-600',
                'border border-blue-600',
                'hover:bg-blue-100 active:bg-blue-200',
            ],
            tertiary: [
                'bg-white text-blue-600',
                'border border-white',
                'hover:bg-blue-100 active:bg-blue-200',
                'hover:border-blue-100 active:border-blue-200',
            ],
            danger: [
                'bg-white text-red-600',
                'border border-red-600',
                'hover:bg-red-100 active:bg-red-200',
            ],
        },
        disabled: {
            true: 'cursor-not-allowed opacity-50 pointer-events-none',
            false: '',
        },
    },
    defaultVariants: {
        size: 'md',
        variant: 'primary',
        disabled: false,
    },
});

export type QButtonProps = VariantProps<typeof buttonVariants> &
    Omit<NextButtonProps, 'variant' | 'color' | 'size' | 'disabled'>;

export const QButton = forwardRef<'button', QButtonProps>(
    ({ size, variant, disabled, className, ...rest }: QButtonProps, ref) => {
        const classes = buttonVariants({
            size,
            variant,
            disabled,
            className,
        });

        const {
            domRef,
            children,
            spinnerSize,
            spinner = <Spinner color="current" size={spinnerSize} />,
            spinnerPlacement,
            startContent,
            endContent,
            isLoading,
            getButtonProps,
        } = useButton({
            ref,
            disableRipple: true,
            disabled,
            ...rest,
        });

        return (
            <button ref={domRef} className={classes} {...getButtonProps()}>
                {startContent}
                {isLoading && spinnerPlacement === 'start' && spinner}
                {isLoading ? undefined : children}
                {isLoading && spinnerPlacement === 'end' && spinner}
                {endContent}
            </button>
        );
    },
);

QButton.displayName = 'Button';
