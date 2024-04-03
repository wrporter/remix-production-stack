import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import { Outlet } from '@remix-run/react';

export default function Index() {
    return (
        <>
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
                </NavbarContent>
            </Navbar>

            <div className="p-8">
                <Outlet />
            </div>
        </>
    );
}
