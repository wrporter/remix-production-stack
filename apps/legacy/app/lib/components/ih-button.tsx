import {
    Button as NextButton,
    type ButtonProps as NextButtonProps,
    Spinner,
    type VariantProps,
    extendVariants,
    forwardRef,
    tv,
    useButton,
} from '@nextui-org/react';
import { focusKeyboardRing } from '~/lib/components/focus-ring.ts';

/**
 * Does not allow overriding existing variants. For example, we don't want disableRipple, nor many
 * of the options for the variant prop on NextUI's IhButton.
 */
export const BadButton = extendVariants(NextButton, {
    variants: {
        size: {
            small: [],
            medium: [],
        },
        variant: {
            primary: [],
            secondary: [],
            tertiary: [],
        },
    },
});

// TODO: Define custom Tailwind CSS / NextUI theme colors.
const buttonVariants = tv({
    base: [
        'inline-flex flex-col gap-2 items-center justify-center rounded-3xl border-2',
        focusKeyboardRing,
    ],
    variants: {
        size: {
            small: ['min-h-9 h-9 px-3 py-2', 'text-sm'],
            medium: ['min-h-12 h-12 px-4 py-3', 'text-base'],
        },
        variant: {
            primary: '',
            secondary: '',
            tertiary: 'underline',
        },
        disabled: {
            true: 'cursor-not-allowed',
            false: '',
        },
    },
    defaultVariants: {
        size: 'medium',
        variant: 'primary',
        disabled: false,
    },
    compoundVariants: [
        {
            variant: 'primary',
            disabled: false,
            class: [
                'text-white',
                'bg-[#0012E7] hover:bg-[#0009A6] active:bg-[#0009A6]',
                'border-[#0012E7] hover:border-[#0009A6] active:border-[#0009A6]',
            ],
        },
        {
            variant: 'primary',
            disabled: true,
            class: ['text-[#5D5D69] bg-[#F0F0F0] border-[#F0F0F0]'],
        },
        {
            variant: 'secondary',
            disabled: false,
            class: [
                'text-[#0012E7] hover:text-white active:text-[#0009A6]',
                'bg-transparent hover:bg-[#0009A6] active:bg-transparent',
                'border-[#0012E7] hover:border-[#0009A6] active:border-[#0009A6]',
            ],
        },
        {
            variant: 'secondary',
            disabled: true,
            class: ['text-[#909095] border-[#C5C5C7]'],
        },
        {
            variant: 'tertiary',
            disabled: false,
            class: [
                'text-[#0012E7] hover:text-white active:text-[#0009A6]',
                'bg-transparent hover:bg-[#0009A6] active:bg-transparent',
                'border-transparent hover:border-[#0009A6] active:border-transparent',
            ],
        },
        {
            variant: 'tertiary',
            disabled: true,
            class: ['text-[#909095] border-[#C5C5C7]'],
        },
    ],
});

export type ButtonProps = VariantProps<typeof buttonVariants> &
    Omit<NextButtonProps, 'variant' | 'size' | 'disabled'>;

export const IhButton = forwardRef<'button', ButtonProps>(
    ({ size, variant, disabled, className, ...rest }: ButtonProps, ref) => {
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

IhButton.displayName = 'IhButton';
