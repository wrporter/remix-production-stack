import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, Spinner } from '@nextui-org/react';
import { Outlet } from '@remix-run/react';
import { IhButton } from '~/lib/components/ih-button.tsx';
import { QButton } from '~/lib/components/q-button.tsx';

export default function Index() {
    return (
        <>
            <div className="flex gap-4 items-center p-4">
                <IhButton variant="primary">Primary</IhButton>
                <IhButton variant="primary" size="small">
                    Primary
                </IhButton>
                <IhButton variant="primary" disabled>
                    Primary
                </IhButton>
                <IhButton variant="primary" isLoading startContent="test">
                    Primary
                </IhButton>
            </div>

            <div className="flex gap-4 items-center p-4">
                <IhButton variant="secondary">Secondary</IhButton>
                <IhButton variant="secondary" size="small">
                    Secondary
                </IhButton>
                <IhButton variant="secondary" disabled>
                    Secondary
                </IhButton>
            </div>

            <div className="flex gap-4 items-center p-4">
                <QButton variant="neutral">Neutral</QButton>
                <QButton variant="neutral" size="sm">
                    Neutral
                </QButton>
                <QButton variant="neutral" disabled>
                    Neutral
                </QButton>
            </div>

            <div className="flex gap-4 items-center p-4">
                <QButton variant="primary">Primary</QButton>
                <QButton variant="primary" size="sm">
                    Primary
                </QButton>
                <QButton variant="primary" disabled>
                    Primary
                </QButton>
            </div>

            <div className="flex gap-4 items-center p-4">
                <QButton variant="secondary">Secondary</QButton>
                <QButton variant="secondary" size="sm">
                    Secondary
                </QButton>
                <QButton variant="secondary" disabled>
                    Secondary
                </QButton>
            </div>

            <div className="flex gap-4 items-center p-4">
                <QButton variant="tertiary">Tertiary</QButton>
                <QButton variant="tertiary" size="sm">
                    Tertiary
                </QButton>
                <QButton variant="tertiary" disabled>
                    Tertiary
                </QButton>
            </div>

            <div className="flex gap-4 items-center p-4">
                <QButton variant="danger">Danger</QButton>
                <QButton variant="danger" size="sm">
                    Danger
                </QButton>
                <QButton variant="danger" disabled>
                    Danger
                </QButton>
            </div>

            <div className="flex gap-4 items-center p-4">
                <QButton
                    variant="primary"
                    startContent={<Spinner color="default" size="sm" />}
                    disabled
                >
                    Loading...
                </QButton>
            </div>

            <Navbar maxWidth="full">
                <NavbarBrand>
                    <p className="font-bold text-inherit">Playground</p>
                </NavbarBrand>
                <NavbarContent className="gap-4" justify="end">
                    <NavbarItem>
                        <Link href="/">Home</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link href="/todo">Todo</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link href="/planets-and-films">Planets and Films</Link>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>

            <div className="p-8">
                <Outlet />
            </div>
        </>
    );
}
