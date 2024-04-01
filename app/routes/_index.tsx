import  { type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export default function Index() {
    return (
        <div>
            <h1 className="font-bold text-4xl">Welcome to the Production Stack!</h1>
        </div>
    );
}
